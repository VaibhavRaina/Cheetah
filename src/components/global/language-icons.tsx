import { LucideProps } from "lucide-react";

const LanguageIcons = {
    javascript: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#F7DF1E" /> {/* Yellow background */}
            <text x="30" y="70" font-size="50" fill="black">JS</text> {/* Simplified JS text */}
        </svg>
    ),
    python: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#FFD43B" /> {/* Yellow background */}
            <path d="M20 20 Q40 10, 60 20 Q80 30, 90 50 Q80 70, 60 80 Q40 90, 20 80 Q10 70, 20 50 Z" fill="#3776AB" /> {/* Blue snake curve */}
        </svg>
    ),
    java: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#ED8B00" /> {/* Orange background */}
            <text x="20" y="60" font-size="30" fill="white">Java</text> {/* Java text */}
            <circle cx="70" cy="70" r="10" fill="black" /> {/* Coffee cup dot */}
        </svg>
    ),
    cpp: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="50" r="15" fill="#00599C" /> {/* Blue circle */}
            <text x="25" y="55" font-size="20" fill="white">+</text>
            <text x="30" y="55" font-size="20" fill="white">+</text>
            <circle cx="65" cy="50" r="15" fill="#00599C" /> {/* Blue circle */}
            <text x="55" y="55" font-size="20" fill="white">+</text>
            <text x="60" y="55" font-size="20" fill="white">+</text>
        </svg>
    ),
    typescript: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#3178C6" /> {/* Blue background */}
            <text x="35" y="70" font-size="50" fill="white">TS</text> {/* TS text */}
        </svg>
    ),
    php: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#777BB4" /> {/* Purple background */}
            <text x="35" y="60" font-size="30" fill="white">PHP</text> {/* PHP text */}
        </svg>
    ),
    csharp: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="50" r="15" fill="#6A1577" /> {/* Purple circle */}
            <text x="25" y="55" font-size="20" fill="white">C</text>
            <text x="40" y="55" font-size="20" fill="white">#</text>
            <circle cx="65" cy="50" r="15" fill="#6A1577" /> {/* Purple circle */}
            <text x="55" y="55" font-size="20" fill="white">C</text>
            <text x="70" y="55" font-size="20" fill="white">#</text>
        </svg>
    ),
    swift: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#F05138" /> {/* Orange background */}
            <path d="M70 30 L50 70 L30 50 L50 30 Z" fill="white" /> {/* Simplified bird silhouette */}
        </svg>
    ),
    go: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#00ADD8" /> {/* Turquoise background */}
            <text x="40" y="70" font-size="50" fill="white">G</text> {/* G text */}
        </svg>
    ),
    ruby: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 10, 90 30, 90 70, 50 90, 10 70, 10 30" fill="#CC342D" /> {/* Red octagon */}
            <polygon points="50 20, 80 40, 80 60, 50 80, 20 60, 20 40" fill="white" /> {/* White inner shape */}
        </svg>
    ),
    rust: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#000000" /> {/* Black background */}
            <path d="M40 40 L60 40 L70 50 L60 60 L40 60 L30 50 Z" fill="#DE3B26" /> {/* Orange gear-like shape */}
        </svg>
    ),
    kotlin: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" fill="#1ABCFE" /> {/* Blue quadrant */}
            <rect x="50" width="50" height="50" fill="#B125EA" /> {/* Purple quadrant */}
            <rect y="50" width="50" height="50" fill="#F0931D" /> {/* Orange quadrant */}
            <text x="35" y="70" font-size="40" fill="white">K</text> {/* K text */}
        </svg>
    ),
    html: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0 L0 90 L45 100 L90 90 L80 0 H10 Z" fill="#E34F26" /> {/* Orange trapezoid */}
            <text x="30" y="60" font-size="30" fill="white">HTML</text> {/* HTML text */}
        </svg>
    ),
    css: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0 L0 90 L45 100 L90 90 L80 0 H10 Z" fill="#264DE4" /> {/* Blue trapezoid */}
            <text x="30" y="60" font-size="30" fill="white">CSS</text> {/* CSS text */}
        </svg>
    ),
    sql: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#00758F" /> {/* Blue background */}
            <text x="35" y="60" font-size="30" fill="white">SQL</text> {/* SQL text */}
        </svg>
    ),
    solidity: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 10, 80 30, 80 70, 50 90, 20 70, 20 30" fill="#363636" /> {/* Black hexagon */}
            <polygon points="50 20, 70 40, 70 60, 50 80, 30 60, 30 40" fill="white" /> {/* White inner shape */}
        </svg>
    ),
    shell: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#4EAA25" /> {/* Green background */}
            <text x="40" y="70" font-size="50" fill="white">&gt;</text> {/* > symbol */}
        </svg>
    ),
    r: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#276DC3" /> {/* Blue background */}
            <text x="40" y="70" font-size="50" fill="white">R</text> {/* R text */}
        </svg>
    ),
    perl: (props: LucideProps) => (
        <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 10, 90 50, 50 90, 10 50" fill="#39457E" /> {/* Blue diamond */}
            <text x="30" y="60" font-size="20" fill="white">Perl</text> {/* Perl text */}
        </svg>
    ),
};

export default LanguageIcons;