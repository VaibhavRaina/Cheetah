import { LucideProps } from "lucide-react";

const LanguageIcons = {
    // File System icon
    javascript: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#4285F4" />
            <path d="M5 5v14h14V5H5zm12 12H7V7h10v10z" fill="white" />
            <path d="M9 9h6v2H9V9zm0 4h6v2H9v-2z" fill="white" />
        </svg>
    ),
    // Browser Tools icon
    python: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#34A853" />
            <path d="M4 6h16v2H4V6z" fill="white" />
            <path d="M4 9h16v10H4V9z" fill="white" />
            <path d="M6 11h12v6H6v-6z" fill="#34A853" />
        </svg>
    ),
    // Context7 icon
    java: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#9C27B0" />
            <path d="M7 7h10v10H7V7z" fill="white" />
            <path d="M9 9h6v2H9V9zm0 4h6v2H9v-2z" fill="#9C27B0" />
        </svg>
    ),
    // Sequential Thinking icon
    cpp: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#F44336" />
            <path d="M5 12l7-7 7 7-7 7-7-7z" fill="white" />
            <path d="M12 9v6M9 12h6" stroke="#F44336" strokeWidth="2" />
        </svg>
    ),
    // Git Tools icon
    typescript: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#F05032" />
            <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="white" />
        </svg>
    ),
    // Fetch icon
    php: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#00BCD4" />
            <path d="M5 8h14v8H5V8z" fill="white" />
            <path d="M7 10l5 4 5-4" stroke="#00BCD4" strokeWidth="2" />
        </svg>
    ),
    // Playwright icon
    csharp: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#2E7D32" />
            <path d="M5 5l14 7-14 7V5z" fill="white" />
        </svg>
    ),
    // Browser Use icon
    go: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#1976D2" />
            <path d="M4 6h16v12H4V6z" fill="white" />
            <path d="M6 8h12v2H6V8zm0 4h12v2H6v-2z" fill="#1976D2" />
        </svg>
    ),
    // FireCrawl icon
    rust: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#FF5722" />
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" />
            <path d="M8 8l8 8M8 16l8-8" stroke="white" strokeWidth="2" />
        </svg>
    ),
    // Puppeteer icon
    kotlin: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#673AB7" />
            <path d="M5 5v14h14V5H5z" fill="white" />
            <path d="M8 8h8v8H8V8z" fill="#673AB7" />
        </svg>
    ),
    // Brave Search icon
    dart: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#FB8C00" />
            <path d="M12 5l7 7-7 7-7-7 7-7z" fill="white" />
            <circle cx="12" cy="12" r="2" fill="#FB8C00" />
        </svg>
    ),
    // Figma icon
    swift: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#0097A7" />
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="8" cy="16" r="3" fill="white" />
            <circle cx="16" cy="8" r="3" fill="white" />
            <circle cx="16" cy="16" r="3" fill="white" />
        </svg>
    ),
    // Time icon
    ruby: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#607D8B" />
            <circle cx="12" cy="12" r="7" fill="white" />
            <path d="M12 7v5h5" stroke="#607D8B" strokeWidth="2" />
        </svg>
    ),
    // Sequential Thinking icon
    r: (props: LucideProps) => (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#3F51B5" />
            <path d="M5 5h14v6h-7v8h-7V5z" fill="white" />
            <path d="M12 11l7 8" stroke="white" strokeWidth="2" />
        </svg>
    ),
};

export default LanguageIcons;