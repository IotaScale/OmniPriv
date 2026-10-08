"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_DEMO_TEMPLATE_ID,
    EMAILJS_RECIPIENT,
} from "@/lib/emailjs";

/*
 * The interactive half of /demo.
 *
 * Split out of app/demo/page.tsx so that page can be a server component and
 * use the shared section library: SplitHero, Section and FaqSection cannot
 * be rendered from a "use client" module.
 *
 * The EmailJS payload is unchanged, field for field.
 *
 * Accessibility fixes over the previous inline version:
 * - all nine previously unlabelled controls now have an `id`, and every label
 *   a matching `htmlFor`, so screen readers announce the visible label
 * - the submit failure message is a live region, so it is announced rather
 *   than silently appearing
 * - the success panel is `role="status"` and receives focus on submit, so a
 *   keyboard or screen-reader user is told the form was replaced
 * - the "Additional Context" field is described by its hint text
 */

export const companySizes = [
    "1-50 employees",
    "51-200 employees",
    "201-1,000 employees",
    "1,001-5,000 employees",
    "5,001-10,000 employees",
    "10,000+ employees",
];

export const useCases = [
    "Privileged Session Management",
    "Just-in-Time (JIT) Access",
    "MFA & Identity Governance",
    "Cloud Secrets Management",
    "DevOps / CI-CD Pipeline Security",
    "Compliance & Audit Reporting",
    "Third-Party & Vendor Access",
    "Other / Not Sure Yet",
];

const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

export default function DemoForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        companySize: "",
        useCase: "",
        context: "",
        agree: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const successRef = useRef<HTMLDivElement>(null);

    /* Move focus to the confirmation so the change is announced. */
    useEffect(() => {
        if (submitted) successRef.current?.focus();
    }, [submitted]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_DEMO_TEMPLATE_ID,
                {
                    to_email: EMAILJS_RECIPIENT,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    jobTitle: formData.jobTitle,
                    company: formData.company,
                    companySize: formData.companySize,
                    useCase: formData.useCase,
                    context: formData.context || "No additional context provided.",
                },
                EMAILJS_PUBLIC_KEY,
            );
            setSubmitted(true);
        } catch {
            setError(
                "Something went wrong. Please try again or email us at info@omnipriv.com",
            );
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="p-12 rounded-3xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.04] text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB]/40"
            >
                <div className="w-16 h-16 rounded-full bg-[#00B8DB]/15 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white mb-2">
                    Demo Request Received!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                    A member of our team will contact you within one business day to schedule your
                    walkthrough.
                </p>
                <Link href="/" className="btn-secondary">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-white dark:bg-[#0F2140]">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
                Tell Us About Your Needs
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="demo-firstName" className={labelClass}>
                            First Name *
                        </label>
                        <input
                            required
                            type="text"
                            id="demo-firstName"
                            name="firstName"
                            autoComplete="given-name"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Alexandra"
                            className="input-dark"
                        />
                    </div>
                    <div>
                        <label htmlFor="demo-lastName" className={labelClass}>
                            Last Name *
                        </label>
                        <input
                            required
                            type="text"
                            id="demo-lastName"
                            name="lastName"
                            autoComplete="family-name"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Mercer"
                            className="input-dark"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="demo-email" className={labelClass}>
                        Work Email *
                    </label>
                    <input
                        required
                        type="email"
                        id="demo-email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="input-dark"
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="demo-phone" className={labelClass}>
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="demo-phone"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="input-dark"
                        />
                    </div>
                    <div>
                        <label htmlFor="demo-company" className={labelClass}>
                            Company *
                        </label>
                        <input
                            required
                            type="text"
                            id="demo-company"
                            name="company"
                            autoComplete="organization"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Corporation"
                            className="input-dark"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="demo-jobTitle" className={labelClass}>
                        Job Title *
                    </label>
                    <input
                        required
                        type="text"
                        id="demo-jobTitle"
                        name="jobTitle"
                        autoComplete="organization-title"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="CISO / IT Director / VP Engineering"
                        className="input-dark"
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="demo-companySize" className={labelClass}>
                            Company Size *
                        </label>
                        <select
                            required
                            id="demo-companySize"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            className="select-dark"
                        >
                            <option value="">Select a range</option>
                            {companySizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="demo-useCase" className={labelClass}>
                            Primary Use Case *
                        </label>
                        <select
                            required
                            id="demo-useCase"
                            name="useCase"
                            value={formData.useCase}
                            onChange={handleChange}
                            className="select-dark"
                        >
                            <option value="">Select a use case</option>
                            {useCases.map((useCase) => (
                                <option key={useCase} value={useCase}>
                                    {useCase}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="demo-context" className={labelClass}>
                        Additional Context
                    </label>
                    <textarea
                        rows={4}
                        id="demo-context"
                        name="context"
                        aria-describedby="demo-context-hint"
                        value={formData.context}
                        onChange={handleChange}
                        placeholder="Describe your current environment, key challenges, timeline, or anything else we should know to make the demo as relevant as possible."
                        className="input-dark resize-none"
                    />
                    <p id="demo-context-hint" className="mt-1.5 text-xs text-slate-500">
                        Optional. Helps us skip the generic tour.
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <input
                        required
                        type="checkbox"
                        id="demo-agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-white/20 bg-slate-200 dark:bg-[#0F1E35] accent-[#00B8DB]"
                    />
                    <label
                        htmlFor="demo-agree"
                        className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                        I agree to OmniPriv&apos;s{" "}
                        <Link href="/privacy-policy" className="text-[#00667A] dark:text-[#00B8DB] hover:underline">
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms" className="text-[#00667A] dark:text-[#00B8DB] hover:underline">
                            Terms of Service
                        </Link>
                        . I agree to receive communications from OmniPriv about products and services.
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center gap-2 justify-center">
                            <svg
                                className="animate-spin w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                />
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        <>
                            Request Your Demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                    )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                    No credit card required &bull; No commitment &bull; Respond within 1 business day
                </p>

                {error && (
                    <p
                        role="alert"
                        aria-live="assertive"
                        className="text-sm text-red-500 dark:text-red-400 text-center border border-red-500/20 bg-red-500/10 rounded-xl px-4 py-3"
                    >
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
