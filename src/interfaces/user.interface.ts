export interface IUser extends Document {
    _id?: string;
    email?: string;
    password: string;
    fullName?: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: UserRole;
    numberPhone: string;
    isVerified: boolean;
    googleId?: string;
    githubId?: string;
}

export type UserRole = {
    GUEST: 'guest';
    TRAINEE: 'trainee';
    INSTRUCTOR: 'instructor';
    ADMIN: 'admin';
};
