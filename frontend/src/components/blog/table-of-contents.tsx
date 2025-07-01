"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, ChevronRight } from "lucide-react";

interface TableOfContentsProps {
    content: string;
    className?: string;
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ content, className = "" }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Extract headings from markdown content
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        const extractedHeadings: Heading[] = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

            extractedHeadings.push({
                id,
                text,
                level
            });
        }

        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        // Intersection Observer to track which heading is in view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-100px 0px -80% 0px",
                threshold: 0
            }
        );

        // Observe all headings
        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <List className="w-5 h-5" />
                    Table of Contents
                </CardTitle>
            </CardHeader>
            <CardContent>
                <nav className="space-y-1">
                    {headings.map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => handleClick(heading.id)}
                            className={`
                                w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                                ${activeId === heading.id
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }
                            `}
                            style={{
                                paddingLeft: `${(heading.level - 1) * 12 + 12}px`
                            }}
                        >
                            <div className="flex items-center gap-2">
                                {activeId === heading.id && (
                                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                )}
                                <span className="truncate">{heading.text}</span>
                            </div>
                        </button>
                    ))}
                </nav>
            </CardContent>
        </Card>
    );
}
