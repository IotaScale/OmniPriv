"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ComponentProps, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import {
    EMAILJS_DEMO_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_RECIPIENT,
    EMAILJS_SERVICE_ID,
} from "@/lib/emailjs";
import { errorClass, fieldClass, labelClass } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import { EVENT } from "./event";

/*
 * Meeting request for the event page.
 *
 * Sends through the same EmailJS service and template as /demo, so the team
 * receives it in the same inbox with the same variables. The event, the chosen
 * day and the note are folded into `useCase` and `context`, and `companySize`
 * is "Not specified" because this form does not ask for it.
 */

const DAYS = ["Day 1 · 1 December", "Day 2 · 2 December", "Day 3 · 3 December", "Any day"] as const;

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    jobTitle: string;
    phone: string;
    day: (typeof DAYS)[number];
    context: string;
    agree: boolean;
}

const EMPTY_FORM: FormState = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    day: "Any day",
    context: "",
    agree: false,
};

function TextField({
    id,
    label,
    error,
    wide,
    ...rest
}: { id: string; label: string; error?: string; wide?: boolean } & ComponentProps<"input">) {
    return (
        <div className={wide ? "sm:col-span-2" : undefined}>
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            <input
                id={id}
                className={cn(fieldClass, error && "border-rose-400 dark:border-rose-500/60")}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                {...rest}
            />
            {error && (
                <p id={`${id}-error`} className={errorClass}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default function EventForm() {
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [tried, setTried] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const successRef = useRef<HTMLDivElement>(null);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const missing = {
        firstName: !form.firstName.trim(),
        lastName: !form.lastName.trim(),
        email: !emailOk,
        company: !form.company.trim(),
        jobTitle: !form.jobTitle.trim(),
        agree: !form.agree,
    };
    const invalid = (key: keyof typeof missing) => tried && missing[key];

    /* Move focus to the confirmation so the change is announced. */
    useEffect(() => {
        if (submitted) successRef.current?.focus();
    }, [submitted]);

    function update(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (Object.values(missing).some(Boolean)) {
            setTried(true);
            const first = (Object.keys(missing) as (keyof typeof missing)[]).find((k) => missing[k]);
            if (first) document.getElementById(`event-${first}`)?.focus();
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
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    jobTitle: form.jobTitle.trim(),
                    company: form.company.trim(),
                    companySize: "Not specified",
                    useCase: `Black Hat MEA 2026: meeting request (${form.day})`,
                    context: `Event: ${EVENT.name}, ${EVENT.location}, ${EVENT.dates}\nPreferred day: ${form.day}\n\n${form.context.trim() || "No additional context provided."}`,
                    intent: "Black Hat MEA 2026 meeting request",
                },
                EMAILJS_PUBLIC_KEY,
            );
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again, or email info@omnipriv.com.");
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
                className="rounded-3xl border border-[#00B8DB]/25 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(10,22,40,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB]/40 dark:bg-[#15171A] sm:p-10"
            >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00B8DB]">
                    <CheckCircle2 className="h-6 w-6 text-[#03121c]" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.5rem] font-bold tracking-[-0.02em] text-slate-950 dark:text-white">
                    Meeting request sent
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600 dark:text-slate-400">
                    We will reply within one business day to confirm a slot at {EVENT.name} and send the
                    meeting point.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/platform" className="btn-primary justify-center">
                        Explore the Platform
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link href="/demo" className="btn-secondary justify-center">
                        Book a call instead
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-slate-900/[0.08] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(10,22,40,0.35)] dark:border-white/[0.08] dark:bg-[#15171a] sm:p-8"
        >
            <h3 className="op-card-title">Request a meeting</h3>
            <p className="mt-1.5 text-[0.875rem] text-slate-600 dark:text-slate-400">
                We reply within one business day.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <TextField
                    id="event-firstName"
                    name="firstName"
                    label="First name"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={update}
                    error={invalid("firstName") ? "Enter your first name." : undefined}
                />
                <TextField
                    id="event-lastName"
                    name="lastName"
                    label="Last name"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={update}
                    error={invalid("lastName") ? "Enter your last name." : undefined}
                />
                <TextField
                    id="event-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    label="Work email"
                    autoComplete="email"
                    wide
                    value={form.email}
                    onChange={update}
                    error={invalid("email") ? "Enter a valid work email address." : undefined}
                />
                <TextField
                    id="event-company"
                    name="company"
                    label="Company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={update}
                    error={invalid("company") ? "Enter your company." : undefined}
                />
                <TextField
                    id="event-jobTitle"
                    name="jobTitle"
                    label="Job title"
                    autoComplete="organization-title"
                    value={form.jobTitle}
                    onChange={update}
                    error={invalid("jobTitle") ? "Enter your job title." : undefined}
                />
                <TextField
                    id="event-phone"
                    name="phone"
                    type="tel"
                    label="Phone (optional)"
                    autoComplete="tel"
                    wide
                    value={form.phone}
                    onChange={update}
                />

                <fieldset className="sm:col-span-2">
                    <legend className={cn(labelClass, "mb-2")}>Preferred day</legend>
                    <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                            <label
                                key={day}
                                className={cn(
                                    "cursor-pointer rounded-full border px-3.5 py-2 text-[0.8125rem] font-semibold transition-colors duration-200",
                                    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#00B8DB] has-[:focus-visible]:ring-offset-2 dark:has-[:focus-visible]:ring-offset-[#15171a]",
                                    form.day === day
                                        ? "border-[#00B8DB] bg-[#00B8DB]/10 text-[#00667A] dark:text-[#7FE3F2]"
                                        : "border-slate-900/[0.12] text-slate-600 hover:border-[#00B8DB]/50 dark:border-white/[0.12] dark:text-slate-300",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="day"
                                    value={day}
                                    checked={form.day === day}
                                    onChange={() => setForm((prev) => ({ ...prev, day }))}
                                    className="sr-only"
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div className="sm:col-span-2">
                    <label htmlFor="event-context" className={labelClass}>
                        What would you like to cover?{" "}
                        <span className="font-normal text-slate-500">(optional)</span>
                    </label>
                    <textarea
                        id="event-context"
                        name="context"
                        rows={4}
                        value={form.context}
                        onChange={update}
                        placeholder="Systems, compliance requirements, or a question you want answered at the show."
                        className={cn(fieldClass, "resize-y")}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="event-agree"
                        className="flex items-start gap-3 text-[0.8125rem] leading-relaxed text-slate-600 dark:text-slate-400"
                    >
                        <input
                            id="event-agree"
                            name="agree"
                            type="checkbox"
                            checked={form.agree}
                            onChange={update}
                            aria-invalid={invalid("agree") || undefined}
                            aria-describedby={invalid("agree") ? "event-agree-error" : undefined}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#00B8DB]"
                        />
                        <span>
                            I agree to be contacted about this meeting. See the{" "}
                            <Link href="/privacy-policy" className="font-semibold op-link hover:underline">
                                privacy policy
                            </Link>
                            .
                        </span>
                    </label>
                    {invalid("agree") && (
                        <p id="event-agree-error" className={errorClass}>
                            Please confirm we may contact you.
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <p
                    role="status"
                    aria-live="polite"
                    className="min-h-[1.25rem] text-[0.8125rem] font-medium text-rose-600 dark:text-rose-400"
                >
                    {error}
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Sending…" : "Request a meeting"}
                    {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </button>
                <p className="text-center text-[0.75rem] text-slate-500 dark:text-slate-400">
                    No commitment. We use these details only to arrange the meeting.
                </p>
            </div>
        </form>
    );
}
