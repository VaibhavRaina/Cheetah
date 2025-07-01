"use client";

import { MCP_SERVERS } from "@/constants/languages";
import { Plus } from "lucide-react";
import Container from "../global/container";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const ServerSupport = () => {
    return (
        <div className="relative flex flex-col items-center justify-center max-w-5xl py-20 mx-auto">
            <Container>
                <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug text-foreground">
                        60+ MCP servers <br /> <span className="font-subheading italic">available</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                        Connect to powerful Model Context Protocol servers from industry leaders
                    </p>
                </div>
            </Container>

            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start justify-center max-w-5xl mx-auto px-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {MCP_SERVERS.map((server) => (
                    <motion.div
                        key={server.code}
                        className="group flex flex-col items-center hover:scale-105 transition-all duration-300 p-4 rounded-xl hover:shadow-md"
                        variants={itemVariants}
                    >
                        <div className="relative flex items-center justify-center mb-3 w-16 h-16 rounded-lg bg-muted/5 group-hover:bg-muted/10 overflow-hidden">
                            <Image
                                src={server.image}
                                alt={server.name}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-sm font-medium text-center">{server.name}</span>
                    </motion.div>
                ))}
                <motion.div
                    className="group flex flex-col items-center hover:scale-105 transition-all duration-300 p-4 rounded-xl hover:bg-muted/10 hover:shadow-md cursor-pointer"
                    variants={itemVariants}
                >
                    <div className="relative flex items-center justify-center mb-3 w-16 h-16 rounded-lg bg-muted/5 group-hover:bg-muted/10">
                        <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">More servers</span>
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ServerSupport; 