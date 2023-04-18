import { Schema, model } from 'mongoose';

interface IUser {
    username: string;
    password: string;
    role: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

//const User = 

export default model<IUser>('User', userSchema);