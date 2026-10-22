"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Lock, Mail, MonitorPlay, PhoneCall } from "lucide-react";

import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_DEMO_TEMPLATE_ID,
    EMAILJS_RECIPIENT,
} from "@/lib/emailjs";
import { fieldClass, labelClass } from "@/lib/form-styles";

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
 *
 * The form is split into two steps (about you, your environment) with
 * per-field validation before moving on. Use case and company size are radio
 * chips instead of selects; the values sent are unchanged.
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

/*
 * Why the visitor came to /demo. Links elsewhere on the site add
 * `?intent=<key>` (for example /demo?intent=security from the Security
 * Center), so the form can say what it is for and the email tells the team
 * where the lead came from. Unknown or missing values are ignored.
 */
export const INTENTS: Record<string, { label: string; useCase?: string }> = {
    sales: { label: "Pricing and plans" },
    security: { label: "Security briefing" },
    integration: { label: "Integration walkthrough", useCase: "Other / Not Sure Yet" },
    ai: { label: "AI agent governance" },
    compliance: { label: "Compliance and audit", useCase: "Compliance & Audit Reporting" },
    partner: { label: "Partner enquiry" },
};

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
    const [intent, setIntent] = useState<string | null>(null);
    useEffect(() => {
        const key = new URLSearchParams(window.location.search).get("intent");
        if (key && INTENTS[key]) {
            setIntent(key);
            const preset = INTENTS[key].useCase;
            if (preset) setFormData((f) => (f.useCase ? f : { ...f, useCase: preset }));
        }
    }, []);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const successRef = useRef<HTMLDivElement>(null);
    const stepRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [step, setStep] = useState<1 | 2>(1);
    const [tried, setTried] = useState(false);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const step1Missing = {
        firstName: !formData.firstName.trim(),
        lastName: !formData.lastName.trim(),
        email: !emailOk,
        company: !formData.company.trim(),
        jobTitle: !formData.jobTitle.trim(),
    };
    const step2Missing = {
        companySize: !formData.companySize,
        useCase: !formData.useCase,
        agree: !formData.agree,
    };
    const bad = (k: keyof typeof step1Missing | keyof typeof step2Missing) =>
        tried && ((step1Missing as Record<string, boolean>)[k] ?? (step2Missing as Record<string, boolean>)[k]);

    function next() {
        if (Object.values(step1Missing).some(Boolean)) {
            setTried(true);
            const first = (Object.keys(step1Missing) as (keyof typeof step1Missing)[]).find((k) => step1Missing[k]);
            if (first) document.getElementById(`demo-${first}`)?.focus();
            return;
        }
        setTried(false);
        setStep(2);
        window.setTimeout(() => stepRef.current?.querySelector<HTMLElement>("button, input, select, textarea")?.focus(), 50);
    }

    function pick(name: "useCase" | "companySize", value: string) {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

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
        if (step === 1) {
            next();
            return;
        }
        if (Object.values(step2Missing).some(Boolean)) {
            setTried(true);
            return;
        }
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
                    context: `${intent ? `Enquiry: ${INTENTS[intent].label}\n` : ""}${formData.context || "No additional context provided."}`,
                    intent: intent ? INTENTS[intent].label : "General demo request",
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
        const nextSteps = [
            { t: "We read what you sent", d: "so the call starts from your systems, not a script", i: Mail },
            { t: "We contact you within one business day", d: "to schedule your walkthrough", i: PhoneCall },
            { t: "A 30-minute introductory call", d: "then a tailored walkthrough if it is useful", i: MonitorPlay },
        ];
        return (
            <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="p-8 sm:p-10 rounded-3xl border border-[#00B8DB]/25 bg-white dark:bg-[#15171A] shadow-[0_30px_60px_-30px_rgba(10,22,40,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB]/40"
            >
                <motion.div initial={reduce ? false : { scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="w-14 h-14 rounded-2xl bg-[#00B8DB] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-[#03121c]" aria-hidden="true" />
                </motion.div>
                <h2 className="mt-5 text-[1.75rem] font-bold tracking-[-0.02em] text-slate-950 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                    Demo Request Received!
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    A member of our team will contact you within one business day to schedule your walkthrough.
                </p>
                <ol className="mt-7 space-y-2.5">
                    {nextSteps.map((n, k) => (
                        <motion.li key={n.t} initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: reduce ? 0 : 0.2 + k * 0.12 }} className="flex items-start gap-3 rounded-2xl border border-slate-900/[0.07] dark:border-white/[0.07] px-4 py-3">
                            <span className="inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-[#00B8DB]/10 text-[#00667A] dark:text-[#7FE3F2]">
                                <n.i className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <span>
                                <span className="block text-[0.9375rem] font-semibold text-slate-800 dark:text-white">{n.t}</span>
                                <span className="block text-[0.8125rem] text-slate-500">{n.d}</span>
                            </span>
                        </motion.li>
                    ))}
                </ol>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Link href="/platform" className="hp-btn-primary">
                        Explore the Platform <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link href="/" className="hp-btn-secondary">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const err = "!border-rose-400/80 focus:!border-rose-400 focus:!ring-rose-400/20";
    const hint = (show: boolean | undefined, text: string, id: string) =>
        show ? (
            <p id={id} className="mt-1.5 text-[0.75rem] font-medium text-rose-600 dark:text-rose-300">
                {text}
            </p>
        ) : null;
    const chip = (on: boolean) =>
        `rounded-xl border px-3 py-2.5 text-left text-[0.8125rem] font-semibold transition-colors duration-150 ${on ? "border-[#00B8DB] bg-[#00B8DB]/[0.1] text-[#00667A] dark:text-[#7FE3F2]" : "border-slate-900/[0.1] dark:border-white/[0.1] text-slate-700 dark:text-slate-300 hover:border-[#00B8DB]/45"}`;

    return (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171A] shadow-[0_30px_60px_-30px_rgba(10,22,40,0.35)]">
            {/* progress */}
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-[1.25rem] font-bold text-slate-950 dark:text-white">Tell Us About Your Needs</h2>
                <span className="text-[0.75rem] font-semibold text-slate-500 shrink-0" aria-live="polite">
                    Step {step} of 2
                </span>
            </div>
            {intent && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-3.5 py-2.5 text-[0.8125rem]">
                    <span className="text-slate-600 dark:text-slate-400">You&apos;re asking about:</span>
                    <span className="font-semibold text-[#00667A] dark:text-[#7FE3F2]">{INTENTS[intent].label}</span>
                    <button type="button" onClick={() => setIntent(null)} className="ml-auto text-[0.75rem] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white" aria-label="Clear the enquiry type">
                        Change
                    </button>
                </div>
            )}
            <ol className="mt-4 grid grid-cols-2 gap-2" aria-hidden="true">
                {["About you", "Your environment"].map((t, k) => {
                    const on = step >= k + 1;
                    return (
                        <li key={t}>
                            <span className="block h-1 rounded-full bg-slate-900/[0.07] dark:bg-white/[0.08] overflow-hidden">
                                <motion.span className="block h-full w-full origin-left bg-[#00B8DB]" initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.4, ease: [0.23, 1, 0.32, 1] }} />
                            </span>
                            <span className={`mt-1.5 flex items-center gap-1 text-[0.75rem] font-semibold ${on ? "text-slate-800 dark:text-white" : "text-slate-400"}`}>
                                {step > k + 1 && <Check className="w-3 h-3 text-[#00B8DB]" strokeWidth={3} />}
                                {t}
                            </span>
                        </li>
                    );
                })}
            </ol>

            <form onSubmit={handleSubmit} className="mt-6" noValidate>
                <AnimatePresence mode="wait" initial={false}>
                    {step === 1 ? (
                        <motion.div key="s1" initial={reduce ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12, transition: { duration: 0.15 } }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="demo-firstName" className={labelClass}>
                                        First Name *
                                    </label>
                                    <input required type="text" id="demo-firstName" name="firstName" autoComplete="given-name" value={formData.firstName} onChange={handleChange} placeholder="Alexandra" aria-invalid={!!bad("firstName")} aria-describedby={bad("firstName") ? "e-firstName" : undefined} className={`${fieldClass} ${bad("firstName") ? err : ""}`} />
                                    {hint(bad("firstName"), "Enter your first name", "e-firstName")}
                                </div>
                                <div>
                                    <label htmlFor="demo-lastName" className={labelClass}>
                                        Last Name *
                                    </label>
                                    <input required type="text" id="demo-lastName" name="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleChange} placeholder="Mercer" aria-invalid={!!bad("lastName")} aria-describedby={bad("lastName") ? "e-lastName" : undefined} className={`${fieldClass} ${bad("lastName") ? err : ""}`} />
                                    {hint(bad("lastName"), "Enter your last name", "e-lastName")}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="demo-email" className={labelClass}>
                                    Work Email *
                                </label>
                                <input required type="email" id="demo-email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" aria-invalid={!!bad("email")} aria-describedby={bad("email") ? "e-email" : undefined} className={`${fieldClass} ${bad("email") ? err : ""}`} />
                                {hint(bad("email"), "Enter a valid work email, like you@company.com", "e-email")}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="demo-phone" className={labelClass}>
                                        Phone Number <span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span>
                                    </label>
                                    <input type="tel" id="demo-phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={fieldClass} />
                                </div>
                                <div>
                                    <label htmlFor="demo-company" className={labelClass}>
                                        Company *
                                    </label>
                                    <input required type="text" id="demo-company" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} placeholder="Acme Corporation" aria-invalid={!!bad("company")} aria-describedby={bad("company") ? "e-company" : undefined} className={`${fieldClass} ${bad("company") ? err : ""}`} />
                                    {hint(bad("company"), "Enter your company", "e-company")}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="demo-jobTitle" className={labelClass}>
                                    Job Title *
                                </label>
                                <input required type="text" id="demo-jobTitle" name="jobTitle" autoComplete="organization-title" value={formData.jobTitle} onChange={handleChange} placeholder="CISO / IT Director / VP Engineering" aria-invalid={!!bad("jobTitle")} aria-describedby={bad("jobTitle") ? "e-jobTitle" : undefined} className={`${fieldClass} ${bad("jobTitle") ? err : ""}`} />
                                {hint(bad("jobTitle"), "Enter your job title", "e-jobTitle")}
                            </div>
                            <button type="submit" className="hp-btn-primary w-full group">
                                Continue <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div key="s2" ref={stepRef} initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12, transition: { duration: 0.15 } }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} className="space-y-6">
                            <fieldset>
                                <legend className={labelClass}>Primary Use Case *</legend>
                                <div role="radiogroup" aria-invalid={!!bad("useCase")} className="grid sm:grid-cols-2 gap-2">
                                    {useCases.map((u) => (
                                        <button key={u} type="button" role="radio" aria-checked={formData.useCase === u} onClick={() => pick("useCase", u)} className={chip(formData.useCase === u)}>
                                            <span className="flex items-center gap-2">
                                                <span className={`inline-flex w-4 h-4 shrink-0 items-center justify-center rounded-full border ${formData.useCase === u ? "border-[#00B8DB] bg-[#00B8DB] text-[#03121c]" : "border-slate-300 dark:border-white/20"}`}>
                                                    {formData.useCase === u && <Check className="w-2.5 h-2.5" strokeWidth={4} />}
                                                </span>
                                                {u}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {hint(bad("useCase"), "Pick the use case closest to yours", "e-useCase")}
                            </fieldset>
                            <fieldset>
                                <legend className={labelClass}>Company Size *</legend>
                                <div role="radiogroup" aria-invalid={!!bad("companySize")} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {companySizes.map((c) => (
                                        <button key={c} type="button" role="radio" aria-checked={formData.companySize === c} onClick={() => pick("companySize", c)} className={`${chip(formData.companySize === c)} text-center`}>
                                            {c.replace(" employees", "")}
                                            <span className="block text-[0.6875rem] font-medium text-slate-500">employees</span>
                                        </button>
                                    ))}
                                </div>
                                {hint(bad("companySize"), "Pick a company size", "e-companySize")}
                            </fieldset>
                            <div>
                                <label htmlFor="demo-context" className={labelClass}>
                                    Additional Context
                                </label>
                                <textarea rows={3} id="demo-context" name="context" aria-describedby="demo-context-hint" value={formData.context} onChange={handleChange} placeholder="Describe your current environment, key challenges, timeline, or anything else we should know to make the demo as relevant as possible." className={`${fieldClass} resize-none`} />
                                <p id="demo-context-hint" className="mt-1.5 text-xs text-slate-500">
                                    Optional. Helps us skip the generic tour.
                                </p>
                            </div>
                            <div>
                                <div className="flex items-start gap-3">
                                    <input required type="checkbox" id="demo-agree" name="agree" checked={formData.agree} onChange={handleChange} aria-invalid={!!bad("agree")} className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-white/20 bg-slate-200 dark:bg-[#15171A] accent-[#00B8DB]" />
                                    <label htmlFor="demo-agree" className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
                                {hint(bad("agree"), "Please accept to continue", "e-agree")}
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row gap-3">
                                <button type="button" onClick={() => { setTried(false); setStep(1); }} className="hp-btn-secondary sm:w-auto">
                                    <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
                                </button>
                                <button type="submit" disabled={loading} className="hp-btn-primary flex-1 group disabled:opacity-60 disabled:cursor-not-allowed">
                                    {loading ? (
                                        <span className="flex items-center gap-2 justify-center">
                                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        <>
                                            Request Your Demo <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <p role="alert" aria-live="assertive" className="mt-5 text-sm text-red-600 dark:text-red-400 text-center border border-red-500/20 bg-red-500/10 rounded-xl px-4 py-3">
                        {error}
                    </p>
                )}

                <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
                    <Lock className="w-3 h-3" aria-hidden="true" /> No credit card required &bull; No commitment &bull; Respond within 1 business day
                </p>
            </form>
        </div>
    );
}
