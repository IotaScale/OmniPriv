"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* Rotating hero backgrounds, a consistent set of clean, bright AI-agent
   imagery, all served through Next's image optimiser. */
const slides = [
    {
        src: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=1920&q=65",
        alt: "AI agent identity verified before privileged access is granted",
    },
    {
        src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1920&q=65",
        alt: "Autonomous AI agent operating within governed policy boundaries",
    },
    {
        src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1920&q=65",
        alt: "AI agent session monitored across the privileged access control plane",
    },
    {
        src: "https://images.unsplash.com/photo-1674544362969-a4269ef0ea69?auto=format&fit=crop&w=1920&q=65",
        alt: "Machine identity holding ephemeral, vault-issued credentials",
    },
    {
        src: "https://images.unsplash.com/photo-1564157212225-38fcc211e977?auto=format&fit=crop&w=1920&q=65",
        alt: "Machine identity authenticated under least-privilege policy",
    },
];

const ROTATE_MS = 7000;

export default function HeroSlideshow() {
    const [index, setIndex] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Respect users who have asked for less motion
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const onChange = () => setReducedMotion(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (reducedMotion) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, ROTATE_MS);
        return () => clearInterval(id);
    }, [reducedMotion]);

    return (
        <div className="absolute inset-0" aria-hidden="true">
            {slides.map((slide, i) => (
                <Image
                    key={slide.src}
                    src={slide.src}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    className={`object-cover transition-opacity duration-[1400ms] ease-in-out ${
                        i === index ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
        </div>
    );
}
