"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { useAuthStore } from "../../../store/useAuthStore";

export default function LoginClient() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError(res.error);
                toast.error(res.error);
            } else {
                login({ email });
                toast.success("Login successful");
                router.push("/");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthLogin = async (provider) => {
        await signIn(provider, { callbackUrl: "/collections" });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-white font-outfit py-12 px-4 sm:px-6">
            <div className="w-full max-w-md bg-zinc-50/50 border border-zinc-200 shadow-xl rounded-[2.5rem] p-8 sm:p-12">

                <header className="text-center mb-8 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-800  block">
                        Aishwarya Arts Portal
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 font-cinzel">
                        Welcome Back
                    </h1>

                </header>

                {error && (
                    <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-2xl text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

                    <div className="space-y-2 relative">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-800">
                                Password <span className="text-red-600" aria-hidden="true">*</span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-amber-900 hover:text-amber-700 text-xs font-bold uppercase tracking-wider underline underline-offset-4"
                            >
                                Forgot?
                            </Link>
                        </div>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
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

                    <button
                        type="submit"
                        disabled={loading}
                        aria-label="Sign in to your account"
                        className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold uppercase text-xs md:text-sm tracking-[0.2em] shadow-lg hover:bg-amber-950 focus:outline-hidden focus:ring-2 focus:ring-amber-800 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>
                </form>

                <div className="mt-8 relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200" /></div>
                    <span className="relative bg-zinc-50 px-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Or continue with</span>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => handleOAuthLogin("google")}
                        aria-label="Sign in securely with your Google account"
                        className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-zinc-300 bg-white rounded-2xl text-zinc-800 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 hover:border-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-amber-800 transition-all cursor-pointer shadow-2xs"
                    >
                        <Image
                            src="/assets/auth/google-icon-logo-svgrepo-com.png"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5 shrink-0"
                        />
                        Sign in with Google
                    </button>
                </div>

                <p className="mt-8 text-center text-zinc-700 text-sm font-medium">
                    New here?{" "}
                    <Link
                        href="/signup"
                        className="text-amber-900 font-bold hover:underline underline-offset-4"
                    >
                        Create an account
                    </Link>
                </p>

            </div>
        </main>
    );
}