const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Ensure environment variables are loaded
require('dotenv').config();

// Google OAuth Strategy - only initialize if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists with this Google ID
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                return done(null, user);
            }

            // Check if user exists with the same email
            user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                user.avatar = user.avatar || profile.photos[0].value;
                user.isEmailVerified = true; // Google emails are verified
                await user.save();
                return done(null, user);
            }

            // Create new user
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                avatar: profile.photos[0].value,
                isEmailVerified: true // Google emails are verified
            });

            await user.save();
            done(null, user);
        } catch (error) {
            console.error('Google OAuth error:', error);
            done(error, null);
        }
    }));
} else {
    console.log('Google OAuth credentials not provided. Google authentication will be disabled.');
}

// GitHub OAuth Strategy - only initialize if credentials are provided
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/api/auth/github/callback",
        scope: ['user:email'] // Request email access
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists with this GitHub ID
            let user = await User.findOne({ githubId: profile.id });

            if (user) {
                return done(null, user);
            }

            // Check if user exists with the same email
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

            if (email) {
                user = await User.findOne({ email: email });

                if (user) {
                    // Link GitHub account to existing user
                    user.githubId = profile.id;
                    user.avatar = user.avatar || profile.photos[0].value;
                    user.isEmailVerified = true; // GitHub emails are verified
                    await user.save();
                    return done(null, user);
                }
            }

            // Create new user
            const userData = {
                name: profile.displayName || profile.username,
                githubId: profile.id,
                avatar: profile.photos[0] ? profile.photos[0].value : null,
                isEmailVerified: !!email // Only verified if email is provided
            };

            // Only add email if it exists (to avoid validation error)
            if (email) {
                userData.email = email;
            } else {
                // Generate a placeholder email for GitHub users without public email
                userData.email = `github_${profile.id}@placeholder.local`;
                userData.isEmailVerified = false;
            }

            user = new User(userData);

            await user.save();
            done(null, user);
        } catch (error) {
            console.error('GitHub OAuth error:', error);
            done(error, null);
        }
    }));
} else {
    console.log('GitHub OAuth credentials not provided. GitHub authentication will be disabled.');
}

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
