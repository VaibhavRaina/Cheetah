"use client";

import { motion } from "framer-motion";
import Container from "@/components/global/container";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import Icons from "@/components/global/icons";

const ProductHero = () => {
    return (
        <section className="relative flex flex-col items-center justify-center w-full py-20 lg:py-32">
            {/* Background blur effect for mobile */}
            <div className="absolute flex lg:hidden size-40 rounded-full bg-accent blur-[10rem] top-0 left-1/2 -translate-x-1/2 -z-10"></div>

            {/* Orbiting circles for desktop */}
            <Container className="hidden lg:flex absolute inset-0 top-0 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
                <OrbitingCircles speed={0.3} radius={250}>
                    <Icons.circle1 className="size-3 text-accent/70" />
                    <Icons.circle2 className="size-1 text-accent/80" />
                </OrbitingCircles>
                <OrbitingCircles speed={0.15} radius={350}>
                    <Icons.circle2 className="size-1 text-accent/50" />
                    <Icons.circle1 className="size-3 text-accent/60" />
                    <Icons.circle2 className="size-1 text-accent/90" />
                </OrbitingCircles>
            </Container>

            <div className="flex flex-col items-center justify-center text-center gap-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center !leading-tight text-foreground mb-6">
                        Powerful AI for the way you{" "}
                        <span className="text-accent">code</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Get lightning fast, complete codebase context in every keystroke.
                        All of your code, documentation, and dependencies are embedded in every change, automatically.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductHero;