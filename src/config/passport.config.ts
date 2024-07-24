import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '@models/user.model';
import AuthService from '@services/auth.service';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './index';

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'identifier', // Change to 'identifier' to handle both email and username
        },
        async (identifier: string, password: string, done: any) => {
            try {
                const user = await AuthService.validateUser(identifier, password);
                if (!user) {
                    return done(null, false, { message: 'Incorrect email/username or password.' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_SECRET as string,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);

passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID as string,
            clientSecret: GITHUB_CLIENT_SECRET as string,
            callbackURL: '/auth/github/callback',
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = await User.create({
                        githubId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);
