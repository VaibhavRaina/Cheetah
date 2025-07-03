export type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    annuallyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "community",
        title: "Free",
        desc: "Perfect for getting started with essential features.",
        monthlyPrice: 0,
        annuallyPrice: 0,
        buttonText: "Download",
        features: [
            "Up to 50 user messages",
            "Context Engine",
            "MCP & Native Tools",
            "Unlimited Next Edits & Completions",
            "Community support",
            "Additional user messages $10/100",
            "AI training allowed"
        ],
        link: "#"
    },
    {
        id: "developer",
        title: "$50",
        desc: "For individuals or small teams that want to ship to production, fast.",
        monthlyPrice: 50,
        annuallyPrice: 500,
        buttonText: "Start free trial",
        features: [
            "Everything in community",
            "Up to 600 user messages",
            "Team management, up to 100 users",
            "SOC 2 type II",
            "Additional user messages $10/100",
            "No AI training allowed"
        ],
        link: "/dashboard"
    },
    {
        id: "enterprise",
        title: "Enterprise",
        desc: "For enterprise teams with high volume, security, or support needs.",
        monthlyPrice: 0,
        annuallyPrice: 0,
        buttonText: "Contact sales",
        features: [
            "Custom user pricing",
            "Bespoke user message limit",
            "Slack integration",
            "Volume based annual discounts",
            "SSO, OIDC, & SCIM support",
            "SOC 2 & Security Reports",
            "Dedicated support",
            "No AI training allowed"
        ],
        link: "/contact-sales"
    },
];

export const PLANS_FAQ = [
    {
        id: 1,
        question: "How does the Context Engine work?",
        answer: "Our Context Engine continuously tracks your workspace changes, file edits, and codebase structure to provide real-time context for smarter code completions and suggestions."
    },
    {
        id: 2,
        question: "Can I use Cheetah AI with multiple projects?",
        answer: "Yes! The Pro plan supports unlimited workspaces, while Starter is limited to a single workspace."
    },
    {
        id: 3,
        question: "Is there a discount for annual billing?",
        answer: "Yes, you can save approximately 15% by choosing annual billing over monthly billing for any of our plans."
    },
    {
        id: 4,
        question: "Do you offer special pricing for open source projects?",
        answer: "Yes, we offer special rates for open source maintainers and contributors. Contact our team for more information."
    },
    {
        id: 5,
        question: "How does the IDE integration work?",
        answer: "Cheetah AI integrates with popular IDEs like VS Code, JetBrains, and more through extensions that connect to our Context Engine."
    },
    {
        id: 6,
        question: "What kind of support do you provide?",
        answer: "We offer community support for Starter plans, priority support for Pro plans, and 24/7 dedicated support with a personal success engineer for Enterprise plans."
    },
    {
        id: 7,
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your plan at any time. If you upgrade, you'll be prorated for the remainder of your billing period. Downgrades take effect at the next billing cycle."
    },
    {
        id: 8,
        question: "Is offline mode available?",
        answer: "Yes, Pro and Enterprise plans include offline capabilities that allow you to work with cached context when disconnected from the internet."
    },
    {
        id: 9,
        question: "What security measures do you have in place?",
        answer: "We offer industry-standard security for all plans, with additional features like SSO, RBAC, audit logs, and on-premises deployment available in the Enterprise plan."
    }
];

export const PLANS_TABLE = [
    {
        id: 1,
        title: 'Growth Starter',
        priceMonthly: '$29',
        priceYearly: "$290",
        buttonText: 'Start free trial',
        usage: {
            members: '2 members',
            contentGeneration: '1,000 words/mo',
            socialChannels: '3 channels',
            brands: '1 brand',
        },
        features: [
            'Basic AI content generation',
            'Social media scheduling',
            'Content calendar',
            'Basic analytics',
            'Email marketing templates',
            'Basic automation',
            'Mobile app access',
            'Community support',
        ],
    },
    {
        id: 2,
        title: 'Scale Pro',
        priceMonthly: '$79',
        priceYearly: "$790",
        buttonText: 'Scale now',
        usage: {
            members: '5 members',
            contentGeneration: '10,000 words/mo',
            socialChannels: 'All platforms',
            brands: '5 brands',
        },
        features: [
            'Advanced AI content generation',
            'Custom AI training',
            'Advanced automation',
            'Campaign tracking',
            'Performance analytics',
            'A/B testing',
            'Priority support',
            'API access',
            'Advanced reporting',
        ],
    },
    {
        id: 3,
        title: 'Enterprise AI',
        priceMonthly: '$199',
        priceYearly: "$1990",
        buttonText: 'Contact sales',
        link: '/contact-sales',
        usage: {
            members: 'Unlimited',
            contentGeneration: 'Unlimited',
            socialChannels: 'Unlimited',
            brands: 'Unlimited',
        },
        features: [
            'Custom AI solutions',
            'Enterprise automation',
            'Multi-brand management',
            'Advanced security',
            'Custom integrations',
            'Dedicated support',
            'Custom training',
            'Enterprise analytics',
            'Custom workflows',
        ],
    },
];
