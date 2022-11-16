import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { User } from 'src/app/models/user.model';
import * as bcrypt from 'bcrypt';

import {
    AuthError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';

import {
    setDoc,
    DocumentReference,
    doc,
    getDoc,
    DocumentSnapshot,
    DocumentData,
} from 'firebase/firestore';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private firebaseService: FirebaseService) {}

    public async validateUserNotExist(data: LoginDto) {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
            this.firebaseService.auth,
            data.email,
            data.password,
        );

        if (!userCredential) {
            throw new HttpException(
                'Email or password is incorrect.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return userCredential;
    }

    public async treatmentUser(
        data: LoginDto,
    ): Promise<Omit<User, 'password'>> {
        const userCredential = await this.validateUserNotExist(data);
        const id: string = userCredential.user.uid;

        const docRef: DocumentReference = doc(
            this.firebaseService.usersCollection,
            id,
        );

        const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);

        if (!snapshot) {
            throw new Error();
        }

        const loggedUser: User = {
            id: snapshot.id,
            ...snapshot.data(),
        } as User;

        delete loggedUser.password;
        return loggedUser;
    }

    public async login(data: LoginDto): Promise<Omit<User, 'password'>> {
        const user = await this.treatmentUser(data);
        return user;
    }

    public async register(data: Omit<RegisterDto, 'id'>): Promise<void> {
        try {
            const pass = await bcrypt.hash(data.password, 12);

            const userCredential: UserCredential =
                await createUserWithEmailAndPassword(
                    this.firebaseService.auth,
                    data.email,
                    pass,
                );

            if (userCredential) {
                const id: string = userCredential.user.uid;
                const docRef: DocumentReference = doc(
                    this.firebaseService.usersCollection,
                    id,
                );

                await setDoc(docRef, data);
            }
        } catch (error: unknown) {
            const firebaseAuthError = error as AuthError;

            console.log(
                `[FIREBASE AUTH ERROR CODE]: ${firebaseAuthError.code}`,
            );

            if (firebaseAuthError.code === 'auth/email-already-in-use') {
                throw new HttpException(
                    'Email already exists.',
                    HttpStatus.CONFLICT,
                );
            }
        }
    }
}
