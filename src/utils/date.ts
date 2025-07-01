/**
 * Utility functions for consistent date formatting
 * to prevent hydration mismatches between server and client
 */

export function formatBlogDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        // Use a consistent format that works across all locales
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        // Fallback to the original string if parsing fails
        return dateString;
    }
}

export function formatBlogDateShort(dateString: string): string {
    try {
        const date = new Date(dateString);
        // Use a consistent short format
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        // Fallback to the original string if parsing fails
        return dateString;
    }
}

export function getRelativeTimeString(dateString: string): string {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        } else if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        } else if (diffInDays < 365) {
            const months = Math.floor(diffInDays / 30);
            return months === 1 ? '1 month ago' : `${months} months ago`;
        } else {
            const years = Math.floor(diffInDays / 365);
            return years === 1 ? '1 year ago' : `${years} years ago`;
        }
    } catch (error) {
        return dateString;
    }
}
