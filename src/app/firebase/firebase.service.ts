import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CONSTANT from '../constants/constants.api';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Config } from 'src/app/models/config.model';
import { Auth, getAuth } from 'firebase/auth';
import * as admin from 'firebase-admin';

import {
    CollectionReference,
    Firestore,
    getFirestore,
    collection,
} from 'firebase/firestore';

@Injectable()
export class FirebaseService {
    public app: FirebaseApp;
    public auth: Auth;
    public fireStore: Firestore;

    // Collections
    public usersCollection: CollectionReference;

    constructor(
        private configService: ConfigService<Config>,
        private logger: Logger,
    ) {
        this.app = initializeApp({
            apiKey: configService.get<string>('apiKey'),
            appId: configService.get<string>('appId'),
            authDomain: configService.get<string>('authDomain'),
            measurementId: configService.get<string>('measurementId'),
            messagingSenderId: configService.get<string>('messagingSenderId'),
            projectId: configService.get<string>('projectId'),
            storageBucket: configService.get<string>('storageBucket'),
        });

        this.auth = getAuth(this.app);
        this.fireStore = getFirestore(this.app);

        this._createCollections();
    }

    private _createCollections() {
        this.usersCollection = collection(this.fireStore, 'users');
    }

    private getToken(authToken: string): string {
        const match = authToken.match(/^Bearer (.*)$/);
        if (!match || match.length < 2) {
            throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
        }
        return match[1];
    }

    public async authenticate(authToken: string): Promise<any> {
        const tokenString = this.getToken(authToken);
        try {
            const decodedToken: admin.auth.DecodedIdToken = await admin
                .auth()
                .verifyIdToken(tokenString);
            this.logger.log(`${JSON.stringify(decodedToken)}`);
            console.log(decodedToken);
            const { email, uid, role } = decodedToken;
            return { email, uid, role };
        } catch (err) {
            this.logger.error(
                `error while authenticate request ${err.message}`,
            );
            throw new UnauthorizedException(err.message);
        }
    }
}
