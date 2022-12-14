// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { IUserService } from 'src/user/interfaces/user';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateConversationParams } from 'src/types/types';
// import { UserNotFoundException } from 'src/user/exceptions/UserNotFound';
// import { CreateConversationException } from './exceptions/CreateConversation';

// @Injectable()
// export class ConversationService {
//     constructor(
//         private readonly prisma: PrismaService,
//         private readonly userService: IUserService,
//         private readonly jwtService: JwtService,
//     ) {}

//     async createConversation(creator: User, params: CreateConversationParams) {
//         const { username, message: content } = params;
//         const recipient = await this.userService.findUser({ username });
//         if (!recipient) throw new UserNotFoundException();
//         if (creator.id === recipient.id)
//             throw new CreateConversationException(
//                 'Cannot create Conversation with yourself',
//             );
//         const isFriends = await this.friendsService.isFriends(
//             creator.id,
//             recipient.id,
//         );
//         if (!isFriends) throw new FriendNotFoundException();
//         const exists = await this.isCreated(creator.id, recipient.id);
//         if (exists) throw new ConversationExistsException();
//         const newConversation = this.conversationRepository.create({
//             creator,
//             recipient,
//         });
//         const conversation = await this.conversationRepository.save(
//             newConversation,
//         );
//         const newMessage = this.messageRepository.create({
//             content,
//             conversation,
//             author: creator,
//         });
//         await this.messageRepository.save(newMessage);
//         return conversation;
//     }
// }
