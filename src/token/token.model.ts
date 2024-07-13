import { Schema, model } from 'mongoose';
import { type IToken } from './token.interface';

const userTokenSchema = new Schema<IToken>({
    createdAt: {
        default: Date.now,
        expires: 30 * 86400, // 30 days
        type: Date,
    },
    token: {
        required: true,
        type: String,
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
});

const UserToken = model<IToken>('UserToken', userTokenSchema);

export default UserToken;
