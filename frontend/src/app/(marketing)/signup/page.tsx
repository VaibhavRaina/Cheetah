import { Metadata } from "next";
import SignUpClient from "./signup-client";

export const metadata: Metadata = {
    title: "Sign Up - Cheetah",
    description: "Create an account to start your Developer Journey",
};

export default function SignUpPage() {
    return <SignUpClient />;
} 