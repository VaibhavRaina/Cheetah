"use client";

import Container from "@/components/global/container";
import { MagicCard } from "@/components/ui/magic-card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { GraduationCap, Users, Rocket, Code } from "lucide-react";

const teamMembers = [
    {
        name: "Vaibhav Raina",
        role: "Co-Founder",
        image: "https://res.cloudinary.com/dtemmbo4i/image/upload/v1747122503/WhatsApp_Image_2024-12-23_at_22.24.42_0d25d9ec_kuzgn8.jpg"
    },
    {
        name: "Yash Budhia",
        role: "Co-Founder",
        image: "https://res.cloudinary.com/dtemmbo4i/image/upload/v1747122534/budhia_acuvrv.jpg"
    },
];

function AboutComponent() {
    return (
        <div className="min-h-screen py-20">
            {/* Hero Section */}
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-amber-500 to-orange-700 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        About Cheetah
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-amber-500" />
                    <motion.p
                        className="text-xl text-center max-w-3xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Redefining the way developers analyze, understand, and improve their code.
                    </motion.p>
                </div>
            </Container>

            {/* Mission Section */}
            <Container delay={0.2} className="mt-24">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-lg text-muted-foreground">
                            At Cheetah, our mission is to provide developers with the most powerful and intuitive tools to enhance their productivity and code quality. We're obsessed with creating technology that feels like a natural extension of the developer's mind.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            We believe that by combining cutting-edge AI with deep understanding of developers' workflows, we can create tools that not only automate tedious tasks but also enhance creativity and innovation.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <motion.div
                            className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <GraduationCap className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="text-lg font-medium">Learning</h3>
                            <p className="text-sm text-center text-muted-foreground mt-2">Continuous improvement through innovation</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <Users className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="text-lg font-medium">Community</h3>
                            <p className="text-sm text-center text-muted-foreground mt-2">Building tools for developers, by developers</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <Rocket className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="text-lg font-medium">Innovation</h3>
                            <p className="text-sm text-center text-muted-foreground mt-2">Pushing the boundaries of what's possible</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-all"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <Code className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="text-lg font-medium">Excellence</h3>
                            <p className="text-sm text-center text-muted-foreground mt-2">Crafting high-quality tools developers love</p>
                        </motion.div>
                    </div>
                </div>
            </Container>

            {/* Team Section */}
            <Container delay={0.4} className="mt-32 mb-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold mb-4">Our Team</h2>
                    <p className="text-lg text-muted-foreground">
                        Our team is composed of passionate engineers, designers, and data scientists who are dedicated to solving the challenges that developers face every day.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            variants={fadeInAnimationVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{
                                once: true,
                            }}
                            custom={index}
                            className="w-full sm:w-80 max-w-sm"
                        >
                            <MagicCard className="h-full">
                                <div className="relative flex flex-col h-full overflow-hidden rounded-xl p-6">
                                    <div className="aspect-[4/5] w-full overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="h-full w-full object-cover object-center transition-all duration-300 hover:scale-105"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index,
        }
    })
}

export default function AboutPage() {
    return <AboutComponent />
}; 