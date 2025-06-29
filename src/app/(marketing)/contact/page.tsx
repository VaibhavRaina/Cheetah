"use client";

import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock form submission
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen py-20">
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Get in Touch
                    </motion.h1>
                    <Separator className="my-8 w-24 bg-primary/40" />
                    <motion.p
                        className="text-xl text-center max-w-2xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        We'd love to hear from you. Whether you have a question about our product, need help,
                        or want to share feedback, our team is ready to assist.
                    </motion.p>
                </div>
            </Container>

            <Container delay={0.1} className="mt-16">
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <motion.div
                            className="flex items-start space-x-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Mail className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium">Email</h3>
                                <p className="text-sm text-muted-foreground mt-1">contact@cheetah.ai</p>
                                <p className="text-sm text-muted-foreground">support@cheetah.ai</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-start space-x-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Phone className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium">Phone</h3>
                                <p className="text-sm text-muted-foreground mt-1">+1 (555) 123-4567</p>
                                <p className="text-sm text-muted-foreground">Mon-Fri from 8am to 5pm</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-start space-x-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <div className="bg-primary/10 p-3 rounded-full">
                                <MapPin className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium">Location</h3>
                                <p className="text-sm text-muted-foreground mt-1">123 Innovation Drive</p>
                                <p className="text-sm text-muted-foreground">San Francisco, CA 94103</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-start space-x-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Clock className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium">Working Hours</h3>
                                <p className="text-sm text-muted-foreground mt-1">Monday - Friday: 9am - 6pm</p>
                                <p className="text-sm text-muted-foreground">Saturday - Sunday: Closed</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        className="md:col-span-2 bg-card border border-border p-8 rounded-xl shadow-sm"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        {!submitted ? (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <Label htmlFor="grid-first-name" className="block mb-2">
                                            First Name
                                        </Label>
                                        <Input id="grid-first-name" type="text" placeholder="John" required />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <Label htmlFor="grid-last-name" className="block mb-2">
                                            Last Name
                                        </Label>
                                        <Input id="grid-last-name" type="text" placeholder="Doe" required />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <Label htmlFor="grid-email" className="block mb-2">
                                            Email
                                        </Label>
                                        <Input id="grid-email" type="email" placeholder="john.doe@example.com" required />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <Label htmlFor="grid-subject" className="block mb-2">
                                            Subject
                                        </Label>
                                        <Input id="grid-subject" type="text" placeholder="How can we help you?" required />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <Label htmlFor="grid-message" className="block mb-2">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="grid-message"
                                            placeholder="Your message..."
                                            className="h-32"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="group"
                                    >
                                        Send Message
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <motion.div
                                className="flex flex-col items-center justify-center h-64"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground text-center">
                                    Thank you for contacting us. We'll get back to you shortly.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={() => setSubmitted(false)}
                                >
                                    Send another message
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </Container>

            {/* Map Integration */}
            <Container delay={0.4} className="mt-24 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-full h-64 md:h-96 rounded-xl overflow-hidden border border-border"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.56851978834!2d-122.43130174684274!3d37.75890275569452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1718971941633!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>
            </Container>
        </div>
    );
};

export default ContactPage; 