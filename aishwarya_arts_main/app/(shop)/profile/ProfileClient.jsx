"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AccountSidebar from "../../components/profile/AccountSidebar";
import toast from "react-hot-toast";

export default function ProfileClient() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [initialData, setInitialData] = useState({});

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        primaryPhone: "",
        alternatePhone: "",
        city: "",
        pincode: "",
        landmark: "",
        addressLine1: "",
        addressLine2: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/users/profile");
                const data = await res.json();

                const sessionName = session?.user?.name?.split(" ") || ["", ""];
                const sessionEmail = session?.user?.email || "";

                if (data.success && data.data) {
                    const user = data.data;

                    const mappedData = {
                        firstName: (user.firstName && user.firstName.trim() !== "")
                            ? user.firstName
                            : (sessionName[0] || ""),

                        lastName: (user.lastName && user.lastName.trim() !== "")
                            ? user.lastName
                            : (sessionName.slice(1).join(" ") || ""),

                        email: user.email || sessionEmail,
                        primaryPhone: user.primaryPhone?.trim() || "",
                        alternatePhone: user.alternatePhone || "",
                        city: user.address?.city || "",
                        pincode: user.address?.pincode || "",
                        landmark: user.address?.landmark || "",
                        addressLine1: user.address?.houseNo || "",
                        addressLine2: user.address?.street || "",
                    };

                    setFormData(mappedData);
                    setInitialData(mappedData);
                } else {
                    setFormData(prev => ({
                        ...prev,
                        firstName: sessionName[0],
                        lastName: sessionName.slice(1).join(" "),
                        email: sessionEmail
                    }));
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (status === "authenticated") fetchProfile();
    }, [status, session?.user?.email]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setFormData(initialData);
        toast.error("Changes discarded");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.primaryPhone || formData.primaryPhone.length < 10) {
            return toast.error("A valid 10-digit Phone Number is required for shipping updates!");
        }
        setShowModal(true);
    };

    const confirmSave = async () => {
        const phoneValue = formData.primaryPhone?.trim();
        setShowModal(false);
        const loadingToast = toast.loading("Updating your masterpiece profile...");
        try {
            const res = await fetch("/api/users/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    primaryPhone: phoneValue === "" ? null : phoneValue,
                    alternatePhone: formData.alternatePhone?.trim() || "",
                    address: {
                        houseNo: formData.addressLine1,
                        street: formData.addressLine2,
                        city: formData.city,
                        pincode: formData.pincode,
                        landmark: formData.landmark,
                    },
                }),
            });

            const result = await res.json();

            if (result.success) {
                setInitialData(formData);
                toast.success("Details updated successfully!", { id: loadingToast });
            } else {
                toast.error(result.message || "Update failed", { id: loadingToast });
            }
        } catch (err) {
            toast.error("Network error. Please try again.", { id: loadingToast });
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="p-20 text-center font-bold text-amber-900 italic uppercase tracking-widest bg-white min-h-screen flex items-center justify-center">
                Syncing Art Signal...
            </div>
        );
    }

    return (
        <main className="bg-zinc-50 min-h-screen py-10 relative font-outfit">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <AccountSidebar />

                    <section className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-xl p-6 sm:p-10 border border-zinc-200">
                        <header className="mb-8 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-900 italic block">
                                Customer Dashboard
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-cinzel">
                                Account Details
                            </h1>
                            <p className="text-sm sm:text-base text-zinc-700 font-medium">
                                Provide your details for authenticated shipping and real-time order tracking.
                            </p>
                        </header>

                        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
                            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                            <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} disabled />

                            <Input
                                label="Primary Phone (Required for Delivery)"
                                name="primaryPhone"
                                value={formData.primaryPhone}
                                onChange={handleChange}
                                disabled={initialData.primaryPhone && initialData.primaryPhone.length >= 10}
                            />

                            <Input label="Alternate Phone" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
                            <Input label="City" name="city" value={formData.city} onChange={handleChange} />
                            <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                            <Input label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
                            <Input label="Address Line 1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} full />
                            <Input label="Address Line 2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} full />

                            <div className="md:col-span-2 pt-6 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    aria-label="Save profile changes"
                                    className="rounded-2xl bg-zinc-900 px-8 py-4 text-white text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-amber-950 focus:outline-hidden focus:ring-2 focus:ring-amber-800 transition-all cursor-pointer shadow-md"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    aria-label="Discard changes"
                                    className="rounded-2xl border-2 border-zinc-300 px-8 py-4 text-zinc-800 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:bg-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

            {showModal && (
                <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-4xl shadow-2xl max-w-sm w-full p-8 text-center animate-in fade-in zoom-in duration-200 border border-zinc-200">
                        <h2 id="modal-title" className="text-xl font-bold text-zinc-900 mb-2 font-cinzel">Update Profile?</h2>
                        <p className="text-zinc-700 mb-6 text-sm font-medium">This information will be used for shipping and tracking your orders.</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={confirmSave}
                                aria-label="Confirm and save profile details"
                                className="w-full bg-amber-900 text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-amber-950 transition-all cursor-pointer shadow-md"
                            >
                                Yes, Save Details
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                aria-label="Go back without saving"
                                className="w-full text-zinc-500 py-2 text-xs font-bold uppercase tracking-widest hover:text-zinc-900 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

/* ================= ACCESSIBLE INPUT COMPONENT ================= */

const Input = ({ label, full, name, value, onChange, disabled }) => {
    const inputId = `input-${name}`;
    return (
        <div className={full ? "md:col-span-2 space-y-2" : "space-y-2"}>
            <label htmlFor={inputId} className="block text-xs font-bold text-zinc-800 uppercase tracking-widest">
                {label}
            </label>
            <input
                id={inputId}
                type="text"
                name={name}
                value={value || ""}
                onChange={onChange}
                disabled={disabled}
                aria-disabled={disabled}
                className={`w-full rounded-xl border px-4 py-3.5 text-base outline-none transition-all shadow-2xs ${disabled
                    ? "bg-zinc-100 border-zinc-200 text-zinc-500 cursor-not-allowed"
                    : "bg-white border-zinc-300 text-zinc-900 focus:border-amber-900 focus:ring-2 focus:ring-amber-900/20"
                    }`}
            />
        </div>
    );
};