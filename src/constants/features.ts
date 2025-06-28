import {
    ChartColumnBigIcon,
    DatabaseIcon,
    TrendingUpIcon,
    WandSparklesIcon,
    ZapIcon
} from "lucide-react";

export const FEATURES = [
    {
        title: "Context Engine",
        description: "Real-time, persistent awareness of your workspace, edits and frameworks.",
        icon: DatabaseIcon,
        image: "/images/feature-one.svg",
    },
    {
        title: "Semantic Memories",
        description: "Deep code understanding & lightning-fast retrieval for intelligent editing.",
        icon: WandSparklesIcon,
        image: "/images/feature-two.svg",
    },
    {
        title: "Framework Detection",
        description: "Automatic scanning to detect frameworks, dependencies and usage patterns.",
        icon: ChartColumnBigIcon,
        image: "/images/feature-three.svg",
    },
    {
        title: "Knowledge Graph",
        description: "Links files, symbols and configs into an always up-to-date knowledge graph.",
        icon: TrendingUpIcon,
        image: "/images/feature-four.svg",
    },
    {
        title: "Incremental Updates",
        description: "Only changed files are re-analyzed, keeping context and search blazing fast.",
        icon: ZapIcon,
        image: "/images/feature-five.svg",
    }
]