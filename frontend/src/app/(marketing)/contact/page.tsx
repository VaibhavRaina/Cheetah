"use client";

import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.target as HTMLFormElement);
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;
        const priority = formData.get('priority') as string || 'Normal';
        const category = formData.get('category') as string || 'General';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`.trim(),
                    email,
                    subject,
                    message,
                    priority,
                    category
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
            } else {
                setError(data.message || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper className="py-20 relative">
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

            <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
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
                                <p className="text-sm text-muted-foreground mt-1">support@cheetahai.co</p>
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
                                <p className="text-sm text-muted-foreground mt-1">+91 9797027481</p>
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
                                <p className="text-sm text-muted-foreground mt-1">6, 7th Main Rd, M S Ramaiah Nagar</p>
                                <p className="text-sm text-muted-foreground">Mathikere, Bengaluru, Karnataka 560054</p>
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
                                {error && (
                                    <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                        <AlertCircle className="h-4 w-4 text-destructive" />
                                        <span className="text-sm text-destructive">{error}</span>
                                    </div>
                                )}

                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <Label htmlFor="grid-first-name" className="block mb-2">
                                            First Name
                                        </Label>
                                        <Input
                                            id="grid-first-name"
                                            name="firstName"
                                            type="text"
                                            placeholder="John"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <Label htmlFor="grid-last-name" className="block mb-2">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="grid-last-name"
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <Label htmlFor="grid-email" className="block mb-2">
                                            Email
                                        </Label>
                                        <Input
                                            id="grid-email"
                                            name="email"
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <Label htmlFor="grid-subject" className="block mb-2">
                                            Subject
                                        </Label>
                                        <Input
                                            id="grid-subject"
                                            name="subject"
                                            type="text"
                                            placeholder="How can we help you?"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <Label htmlFor="grid-priority" className="block mb-2">
                                            Priority
                                        </Label>
                                        <select
                                            id="grid-priority"
                                            name="priority"
                                            defaultValue="Normal"
                                            className="w-full p-2 border border-border rounded-md bg-background"
                                            disabled={isLoading}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Normal">Normal</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <Label htmlFor="grid-category" className="block mb-2">
                                            Category
                                        </Label>
                                        <select
                                            id="grid-category"
                                            name="category"
                                            defaultValue="General"
                                            className="w-full p-2 border border-border rounded-md bg-background"
                                            disabled={isLoading}
                                        >
                                            <option value="General">General</option>
                                            <option value="Technical">Technical</option>
                                            <option value="Billing">Billing</option>
                                            <option value="Feature Request">Feature Request</option>
                                            <option value="Bug Report">Bug Report</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <Label htmlFor="grid-message" className="block mb-2">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="grid-message"
                                            name="message"
                                            placeholder="Your message..."
                                            className="h-32"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="group"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
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
            </motion.div>

            {/* Map Integration */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-24 mb-12"
            >
                <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden border border-border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d77.5946!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17d6b2b5b5b5%3A0x1234567890abcdef!2s6%2C%207th%20Main%20Rd%2C%20M%20S%20Ramaiah%20Nagar%2C%20Mathikere%2C%20Bengaluru%2C%20Karnataka%20560054%2C%20India!5e0!3m2!1sen!2sin!4v1647000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </motion.div>
        </Wrapper>
    );
};

export default ContactPage; 