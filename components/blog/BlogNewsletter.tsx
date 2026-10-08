"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_NEWSLETTER_TEMPLATE_ID,
    EMAILJS_RECIPIENT,
} from "@/lib/emailjs";

/*
 * Blog newsletter signup.
 *
 * Split out of app/blog/page.tsx so the index page can be a server component.
 *
 * Behaviour is unchanged, it still posts to EmailJS with the same payload.
 * Two things were removed or fixed:
 *
 * - The line "~4,200 security professionals subscribed" was deleted. It was
 *   an invented number with nothing behind it.
 * - The email field had no label and the status messages were not announced.
 *   The field now has a real label (visually hidden, so the design is
 *   untouched) and the outcome is a live region.
 *
 * NOTE: EMAILJS_NEWSLETTER_TEMPLATE_ID is still the literal placeholder
 * string "YOUR_NEWSLETTER_TEMPLATE_ID" in lib/emailjs.ts, so this submit will
 * fail until a real template id is configured and the error branch fires.
 */

export default function BlogNewsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_NEWSLETTER_TEMPLATE_ID,
                {
                    to_email: EMAILJS_RECIPIENT,
                    subscriber_email: email,
                },
                EMAILJS_PUBLIC_KEY,
            );
            setStatus("success");
            setEmail("");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div
                role="status"
                aria-live="polite"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.08] text-[#00667A] dark:text-[#00B8DB] text-sm font-medium"
            >
                ✓ You&apos;re subscribed! Welcome aboard.
            </div>
        );
    }

    return (
        <>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="blog-newsletter-email" className="sr-only">
                    Work email address
                </label>
                <input
                    type="email"
                    id="blog-newsletter-email"
                    required
                    autoComplete="email"
                    placeholder="Work email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-dark flex-1"
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary whitespace-nowrap disabled:opacity-60"
                >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
            </form>

            {status === "error" && (
                <p role="alert" aria-live="assertive" className="text-xs text-red-500 dark:text-red-400 mt-2">
                    Something went wrong. Please try again, or email info@omnipriv.com.
                </p>
            )}
        </>
    );
}
