"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

/*
 * Route-level error boundary. If a component throws while rendering, the
 * header and footer stay on screen and the visitor can retry or move on,
 * instead of facing a blank page.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="aip">
            <section className="relative overflow-hidden">
                <div className="aip-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="container-xl relative pt-16 pb-20 lg:pt-24 lg:pb-28">
                    <div className="max-w-3xl">
                        <p className="font-mono text-[0.8125rem] font-semibold tracking-[0.08em] text-[#00667A] dark:text-[#7FE3F2]">Something went wrong</p>
                        <h1 className="op-h1 aip-h1 mt-4">This page did not load.</h1>
                        <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-slate-600 dark:text-slate-400">
                            A part of the page failed to load. Trying again usually fixes it. If it keeps happening, let us know at{" "}
                            <a href="mailto:support@omnipriv.com" className="op-link font-semibold">support@omnipriv.com</a>
                            {error.digest ? (
                                <>
                                    {" "}and quote reference <code className="font-mono text-[0.9375rem]">{error.digest}</code>
                                </>
                            ) : null}
                            .
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <button type="button" onClick={reset} className="hp-btn-primary group">
                                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                                Try again
                            </button>
                            <Link href="/" className="hp-btn-secondary group">
                                Back to the homepage
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
