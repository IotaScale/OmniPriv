"use client";

import Image from "next/image";
import { useState } from "react";

/*
 * Blog card artwork, shown whole and never cropped.
 *
 * The pieces come in different shapes (16:9 and 3:1), so a cover crop cut
 * the icons off the sides of the wide ones. Here the picture keeps its own
 * shape, centred in the card's media box, with its edges feathered into a
 * soft blurred copy of itself. The spare space reads as the artwork's own
 * background instead of a letterbox.
 *
 * The media box is a size container, so the frame is fitted with cq units
 * from the picture's real ratio (read once it loads).
 */
export default function InsightImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [ratio, setRatio] = useState(16 / 9);
  return (
    <div className="ins-img absolute inset-0">
      <Image src={src} alt="" aria-hidden="true" fill sizes="240px" className="ins-img-bg object-cover" />
      <div className="ins-img-frame" style={{ ["--r" as string]: ratio }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          onLoad={(e) => {
            const im = e.currentTarget;
            if (im.naturalWidth && im.naturalHeight) setRatio(im.naturalWidth / im.naturalHeight);
          }}
        />
      </div>
    </div>
  );
}
