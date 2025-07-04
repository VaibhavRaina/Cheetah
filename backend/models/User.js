const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: function () {
            // Email is required only for non-OAuth users or OAuth users with real emails
            return !this.googleId && !this.githubId;
        },
        unique: true,
        sparse: true, // Allow multiple null/undefined values
        lowercase: true,
        trim: true,
        validate: {
            validator: function (email) {
                // Skip validation for placeholder emails
                if (email && email.includes('@placeholder.local')) {
                    return true;
                }
                return !email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.githubId; // Password required only if no OAuth
        },
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false // Don't include password in queries by default
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String,
        select: false
    },
    emailVerificationExpires: {
        type: Date,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    plan: {
        type: String,
        enum: ['community', 'developer', 'pro', 'max', 'enterprise'],
        default: 'community'
    },
    subscription: {
        status: {
            type: String,
            enum: ['active', 'inactive', 'cancelled', 'past_due'],
            default: 'active'
        },
        plan: {
            type: String,
            enum: ['community', 'developer', 'pro', 'max', 'enterprise'],
            default: 'community'
        },
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        currentPeriodStart: Date,
        currentPeriodEnd: Date,
        endDate: {
            type: Date,
            default: () => {
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            }
        },
        billingCycle: {
            type: String,
            enum: ['monthly', 'yearly'],
            default: 'monthly'
        },
        messagesRemaining: {
            type: Number,
            default: 50
        },
        cancelAtPeriodEnd: {
            type: Boolean,
            default: false
        }
    },
    usage: {
        messagesUsed: {
            type: Number,
            default: 0
        },
        messagesLimit: {
            type: Number,
            default: 50 // Free plan default
        },
        resetDate: {
            type: Date,
            default: () => {
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            }
        }
    },
    usageHistory: [{
        date: {
            type: Date,
            required: true
        },
        messages: {
            type: Number,
            default: 0
        }
    }],
    invoices: [{
        id: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['paid', 'pending', 'overdue'],
            default: 'pending'
        },
        downloadUrl: String,
        stripeInvoiceId: String
    }],
    transactions: [{
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['subscription', 'upgrade', 'downgrade', 'cancellation', 'reactivation'],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: 'USD'
        },
        fromPlan: String,
        toPlan: String,
        date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['completed', 'pending', 'failed', 'refunded'],
            default: 'completed'
        },
        billingCycle: {
            type: String,
            enum: ['monthly', 'yearly'],
            default: 'monthly'
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    }],
    preferences: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        marketingEmails: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            enum: ['light', 'dark', 'system'],
            default: 'system'
        }
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ emailVerificationToken: 1 });
userSchema.index({ passwordResetToken: 1 });
userSchema.index({ 'subscription.stripeCustomerId': 1 });

// Virtual for checking if account is locked
userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
        // Hash password with cost of 12
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to increment login attempts
userSchema.methods.incLoginAttempts = function () {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: { loginAttempts: 1 }
        });
    }

    const updates = { $inc: { loginAttempts: 1 } };

    // If we have reached max attempts and it's not locked already, lock the account
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // Lock for 2 hours
    }

    return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 }
    });
};

// Method to get user's plan limits
userSchema.methods.getPlanLimits = function () {
    const planLimits = {
        community: { messages: 50, features: ['basic'] },
        developer: { messages: 600, features: ['basic', 'team', 'soc2'] },
        pro: { messages: 1500, features: ['basic', 'team', 'soc2', 'advanced', 'priority'] },
        max: { messages: 4500, features: ['basic', 'team', 'soc2', 'advanced', 'priority', 'custom'] },
        enterprise: { messages: -1, features: ['all'] } // -1 means unlimited
    };
    return planLimits[this.plan] || planLimits.community;
};

// Method to check if user can use a feature
userSchema.methods.canUseFeature = function (feature) {
    const limits = this.getPlanLimits();
    return limits.features.includes('all') || limits.features.includes(feature);
};

// Method to check if user has messages remaining
userSchema.methods.hasMessagesRemaining = function () {
    const limits = this.getPlanLimits();
    if (limits.messages === -1) return true; // Unlimited
    return this.usage.messagesUsed < limits.messages;
};

// Method to increment message usage
userSchema.methods.incrementMessageUsage = function () {
    // Reset usage if it's a new month
    const now = new Date();
    if (now > this.usage.resetDate) {
        this.usage.messagesUsed = 0;
        this.usage.resetDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }

    this.usage.messagesUsed += 1;
    return this.save();
};

// Remove sensitive fields before sending to client
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.emailVerificationToken;
    delete user.emailVerificationExpires;
    delete user.passwordResetToken;
    delete user.passwordResetExpires;
    delete user.loginAttempts;
    delete user.lockUntil;
    return user;
};

module.exports = mongoose.model('User', userSchema);
