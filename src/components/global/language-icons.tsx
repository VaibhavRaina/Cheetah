import { LucideProps } from "lucide-react";

const LanguageIcons = {
    javascript: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#F7DF1E" />
            <text x="30" y="70" font-size="50" fill="black">JS</text>
        </svg>
    ),
    python: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#FFD43B" />
            <path d="M20 20 Q40 10, 60 20 Q80 30, 90 50 Q80 70, 60 80 Q40 90, 20 80 Q10 70, 20 50 Z" fill="#3776AB" />
        </svg>
    ),
    java: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#ED8B00" />
            <text x="20" y="60" font-size="30" fill="white">Java</text>
            <circle cx="70" cy="70" r="10" fill="black" />
        </svg>
    ),
    cpp: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#00599C" />
            <text x="35" y="60" font-size="30" fill="white">C++</text>
        </svg>
    ),
    typescript: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#3178C6" />
            <text x="35" y="70" font-size="50" fill="white">TS</text>
        </svg>
    ),
    php: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#777BB4" />
            <text x="35" y="60" font-size="30" fill="white">PHP</text>
        </svg>
    ),
    csharp: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#68217A" />
            <path d="M30 40 L40 60 L30 80 M60 40 L70 60 L60 80" stroke="#FFFFFF" stroke-width="10" />
        </svg>
    ),
    swift: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#F05138" />
            <path d="M70 30 L50 70 L30 50 L50 30 Z" fill="white" />
        </svg>
    ),
    go: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#00ADD8" />
            <path d="M30 30 Q40 20, 50 30 Q60 20, 70 30 Q80 40, 70 50 Q80 60, 70 70 Q60 80, 50 70 Q40 80, 30 70 Q20 60, 30 50 Z" fill="white" /> {/* Simplified gopher silhouette */}
        </svg>
    ),
    ruby: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 10, 90 30, 90 70, 50 90, 10 70, 10 30" fill="#CC342D" />
            <polygon points="50 20, 80 40, 80 60, 50 80, 20 60, 20 40" fill="white" />
        </svg>
    ),
    rust: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#000000" />
            <path d="M40 40 L60 40 L70 50 L60 60 L40 60 L30 50 Z" fill="#DE3B26" />
        </svg>
    ),
    kotlin: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" fill="#1ABCFE" />
            <rect x="50" width="50" height="50" fill="#B125EA" />
            <rect y="50" width="50" height="50" fill="#F0931D" />
            <text x="35" y="70" font-size="40" fill="white">K</text>
        </svg>
    ),
    html: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0 L0 90 L45 100 L90 90 L80 0 H10 Z" fill="#E34F26" />
            <text x="30" y="60" font-size="30" fill="white">HTML</text>
        </svg>
    ),
    css: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0 L0 90 L45 100 L90 90 L80 0 H10 Z" fill="#264DE4" />
            <text x="30" y="60" font-size="30" fill="white">CSS</text>
        </svg>
    ),
    sql: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="60" height="60" rx="10" fill="#00758F" />
            <rect x="30" y="30" width="40" height="40" rx="5" fill="#FFFFFF" />
        </svg>
    ),
    solidity: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 10, 80 30, 80 70, 50 90, 20 70, 20 30" fill="#363636" />
            <polygon points="50 20, 70 40, 70 60, 50 80, 30 60, 30 40" fill="white" />
        </svg>
    ),
    shell: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#4EAA25" />
            <text x="40" y="70" font-size="50" fill="white">></text>
        </svg>
    ),
    r: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#276DC3" />
            <text x="40" y="70" font-size="50" fill="white">R</text>
        </svg>
    ),
    perl: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 10, 90 50, 50 90, 10 50" fill="#39457E" />
            <text x="30" y="60" font-size="20" fill="white">Perl</text>
        </svg>
    ),
};

export default LanguageIcons;