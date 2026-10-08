"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

/*
 * Scroll-reveal motion for the whole site.
 *
 * AOS is initialised once, here, from the root layout. The `data-aos`
 * attributes that actually drive the animations are plain HTML, so every
 * section stays a server component, this is the only client component the
 * site adds in order to animate.
 *
 * Worth knowing before changing anything here:
 *
 * - The <noscript> rule in app/layout.tsx is load-bearing. AOS ships
 *   `[data-aos] { opacity: 0 }`, so without JavaScript everything carrying a
 *   data-aos attribute would stay invisible. The noscript rule forces those
 *   elements back to visible.
 * - `once: true` means an element animates in and then stays put, so content
 *   never disappears again when scrolling back up.
 * - AOS only scans the DOM when it initialises, so a client-side route change
 *   needs refreshHard() or the new page's elements never animate at all.
 * - Reduced motion is handled in CSS (see globals.css), NOT with AOS's `disable`
 *   option. `disable` switches the whole library off, so a visitor whose OS asks
 *   for reduced motion gets no reveal whatsoever, which both wastes the feature
 *   and reads as "AOS is broken". The CSS keeps the fade and drops only the
 *   movement, which is what the preference is actually about.
 */
export default function AosProvider() {
    const pathname = usePathname();

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-out-cubic",
            offset: 60,
            once: true,
            mirror: false,
        });
    }, []);

    useEffect(() => {
        AOS.refreshHard();
    }, [pathname]);

    return null;
}
