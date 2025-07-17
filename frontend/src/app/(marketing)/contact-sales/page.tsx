"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { contactAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    CheckCircle,
    ArrowRight,
    Users,
    Building2,
    Zap,
    Shield,
    HeadphonesIcon,
    Calendar,
    AlertCircle,
    Loader2
} from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const ContactSalesPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        teamSize: "",
        useCase: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<any[]>([]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setValidationErrors([]);

        const requestData = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
            jobTitle: 'Not specified',
            companySize: formData.teamSize,
            interestLevel: 'Ready to Buy',
            timeline: 'Not specified',
            message: formData.message || `Primary use case: ${formData.useCase || 'Not specified'}`
        };

        // Debug: Log the data being sent
        console.log('Sending data to backend:', requestData);

        try {
            const response = await contactAPI.sendSalesInquiry(requestData);

            if (response.success) {
                setSubmitted(true);
                // Reset form
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    company: "",
                    phone: "",
                    teamSize: "",
                    useCase: "",
                    message: "",
                });
            } else {
                setError(response.message || 'Failed to send message. Please try again.');
                if (response.errors) {
                    setValidationErrors(response.errors);
                }
            }
        } catch (err: any) {
            console.error('API Error:', err);
            const errorData = err.response?.data;

            if (errorData?.errors) {
                setValidationErrors(errorData.errors);
                setError(`Validation failed: ${errorData.errors.map((e: any) => `${e.field}: ${e.message}`).join(', ')}`);
            } else {
                setError(errorData?.message || 'Network error. Please check your connection and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const benefits = [
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "SOC 2 Type II compliance and advanced security features"
        },
        {
            icon: Users,
            title: "Dedicated Support",
            description: "Priority support with dedicated customer success manager"
        },
        {
            icon: Zap,
            title: "Custom Integration",
            description: "Tailored integrations and custom deployment options"
        },
        {
            icon: HeadphonesIcon,
            title: "24/7 Support",
            description: "Round-the-clock technical support and consultation"
        }
    ];

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Sales Team",
            content: "sales@cheetahai.co",
            description: "Get in touch with our sales experts"
        },
        {
            icon: Phone,
            title: "Call Sales",
            content: "+91 9797027481",
            description: "Speak directly with our team"
        },
        {
            icon: Calendar,
            title: "Schedule Demo",
            content: "Book a meeting",
            description: "See CheetahAI in action"
        }
    ];

    if (submitted) {
        return (
            <Wrapper className="py-20">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            We've received your message and our sales team will get back to you within 24 hours.
                        </p>
                        <Button onClick={() => setSubmitted(false)} variant="outline">
                            Send Another Message
                        </Button>
                    </motion.div>
                </Container>
            </Wrapper>
        );
    }

    return (
        <Wrapper className="py-20 relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />

            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-16"
                >
                    {/* Hero Section */}
                    <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
                        <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                            Enterprise Solutions
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Ready to Scale with CheetahAI?
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Get enterprise-grade AI assistance with custom pricing, dedicated support, and advanced features
                            tailored for your organization's needs.
                        </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Card className="h-full border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                                            <benefit.icon className="w-6 h-6 text-accent" />
                                        </div>
                                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <Card className="border-border/50">
                                <CardContent className="p-8">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-2">Let's Discuss Your Needs</h2>
                                        <p className="text-muted-foreground">
                                            Tell us about your team and requirements, and we'll create a custom solution for you.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {error && (
                                            <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                                <AlertCircle className="h-4 w-4 text-destructive" />
                                                <span className="text-sm text-destructive">{error}</span>
                                            </div>
                                        )}

                                        {validationErrors.length > 0 && (
                                            <div className="space-y-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                                <div className="flex items-center space-x-2">
                                                    <AlertCircle className="h-4 w-4 text-destructive" />
                                                    <span className="text-sm font-medium text-destructive">Validation Errors:</span>
                                                </div>
                                                <ul className="list-disc list-inside space-y-1 ml-6">
                                                    {validationErrors.map((error, index) => (
                                                        <li key={index} className="text-sm text-destructive">
                                                            <strong>{error.field}:</strong> {error.message}
                                                            {error.value && <span className="text-muted-foreground"> (received: "{error.value}")</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                    className="border-border/50 focus:border-accent"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                    className="border-border/50 focus:border-accent"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Work Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                    className="border-border/50 focus:border-accent"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="company">Company *</Label>
                                                <Input
                                                    id="company"
                                                    value={formData.company}
                                                    onChange={(e) => handleInputChange("company", e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                    className="border-border/50 focus:border-accent"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <PhoneInput
                                                    value={formData.phone}
                                                    onChange={(value) => handleInputChange("phone", value)}
                                                    disabled={isLoading}
                                                    placeholder="Enter phone number"
                                                    className="border-border/50 focus:border-accent"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="teamSize">Team Size</Label>
                                                <Select onValueChange={(value) => handleInputChange("teamSize", value)} disabled={isLoading}>
                                                    <SelectTrigger className="border-border/50 focus:border-accent">
                                                        <SelectValue placeholder="Select team size" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1-10">1-10 developers</SelectItem>
                                                        <SelectItem value="11-50">11-50 developers</SelectItem>
                                                        <SelectItem value="51-200">51-200 developers</SelectItem>
                                                        <SelectItem value="201-500">201-500 developers</SelectItem>
                                                        <SelectItem value="500+">500+ developers</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="useCase">Primary Use Case</Label>
                                            <Select onValueChange={(value) => handleInputChange("useCase", value)} disabled={isLoading}>
                                                <SelectTrigger className="border-border/50 focus:border-accent">
                                                    <SelectValue placeholder="Select primary use case" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="code-completion">Code Completion & Suggestions</SelectItem>
                                                    <SelectItem value="code-review">Code Review & Analysis</SelectItem>
                                                    <SelectItem value="documentation">Documentation Generation</SelectItem>
                                                    <SelectItem value="testing">Test Generation</SelectItem>
                                                    <SelectItem value="migration">Legacy Code Migration</SelectItem>
                                                    <SelectItem value="training">Developer Training</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Tell us about your requirements</Label>
                                            <Textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={(e) => handleInputChange("message", e.target.value)}
                                                placeholder="Describe your team's needs, current challenges, and what you're looking for in an AI coding assistant..."
                                                rows={4}
                                                disabled={isLoading}
                                                className="border-border/50 focus:border-accent"
                                            />
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                        >
                                            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </motion.div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <Card className="border-border/50">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4 flex items-center">
                                        <Building2 className="w-5 h-5 mr-2 text-accent" />
                                        Contact Information
                                    </h3>
                                    <div className="space-y-4">
                                        {contactInfo.map((info, index) => (
                                            <motion.div
                                                key={info.title}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 + 0.5 }}
                                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                            >
                                                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <info.icon className="w-4 h-4 text-accent" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm">{info.title}</h4>
                                                    <p className="text-sm font-medium text-accent">{info.content}</p>
                                                    <p className="text-xs text-muted-foreground">{info.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4 flex items-center">
                                        <Clock className="w-5 h-5 mr-2 text-accent" />
                                        Response Time
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Sales Inquiries</span>
                                            <span className="text-sm font-medium">&lt; 2 hours</span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Demo Requests</span>
                                            <span className="text-sm font-medium">Same day</span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Custom Quotes</span>
                                            <span className="text-sm font-medium">24-48 hours</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 bg-gradient-to-br from-accent/5 to-primary/5">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Schedule a live demo to see CheetahAI in action and get your questions answered in real-time.
                                    </p>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Schedule Demo
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </Wrapper>
    );
};

export default ContactSalesPage;
