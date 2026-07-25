"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupClient() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!acceptedTerms) {
            setError("You must accept the Terms & Conditions");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Account Created Successfully");
                router.push("/login");
            } else {
                setError(data.message || "Failed to create account");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-white font-outfit py-12 px-4 sm:px-6">
            <div className="w-full max-w-md bg-zinc-50/50 border border-zinc-200 shadow-xl rounded-[2.5rem] p-8 sm:p-12">

                <header className="text-center mb-8 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-800 block">
                        Aishwarya Arts Portal
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 font-cinzel">
                        Create Account
                    </h1>
                    <p className="text-zinc-700 text-sm font-medium">
                        Join our gallery to save masterpieces and track orders.
                    </p>
                </header>

                {error && (
                    <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-2xl text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-800">
                            Full Name <span className="text-red-600" aria-hidden="true">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3.5 border border-zinc-300 bg-white rounded-xl text-base text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition-all shadow-2xs"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-800">
                            Email Address <span className="text-red-600" aria-hidden="true">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3.5 border border-zinc-300 bg-white rounded-xl text-base text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition-all shadow-2xs"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2 relative">
                        <label htmlFor="password" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-800">
                            Password <span className="text-red-600" aria-hidden="true">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Create a secure password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3.5 border border-zinc-300 bg-white rounded-xl text-base text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-800 focus:border-amber-800 pr-12 transition-all shadow-2xs"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password text" : "Show password text"}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-900 cursor-pointer p-1"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2 relative">
                        <label htmlFor="confirmPassword" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-800">
                            Confirm Password <span className="text-red-600" aria-hidden="true">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3.5 border border-zinc-300 bg-white rounded-xl text-base text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-amber-800 focus:border-amber-800 pr-12 transition-all shadow-2xs"
                            />
                            <button
                                type="button"
                                aria-label={showConfirmPassword ? "Hide confirm password text" : "Show confirm password text"}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-900 cursor-pointer p-1"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                            </button>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-center pt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="h-4 w-4 rounded border-zinc-300 text-amber-900 focus:ring-amber-800 cursor-pointer"
                        />
                        <label htmlFor="terms" className="ml-2 text-zinc-700 text-xs sm:text-sm font-medium">
                            I accept the{" "}
                            <Link href="/terms" className="text-amber-900 hover:underline font-bold underline-offset-4">
                                Terms &amp; Conditions
                            </Link>
                        </label>
                    </div>

                    {/* Signup button */}
                    <button
                        type="submit"
                        disabled={loading}
                        aria-label="Create your account"
                        className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold uppercase text-xs md:text-sm tracking-[0.2em] shadow-lg hover:bg-amber-950 focus:outline-hidden focus:ring-2 focus:ring-amber-800 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} aria-hidden="true" /> Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                {/* Login link */}
                <p className="mt-8 text-center text-zinc-700 text-sm font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-amber-900 font-bold hover:underline underline-offset-4">
                        Login
                    </Link>
                </p>

            </div>
        </main>
    );
}