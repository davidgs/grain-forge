import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PortfolioLightbox({
  item,
  initialImageIndex = 0,
  onClose,
}) {
  const images = useMemo(() => {
    if (!item) {
      return [];
    }

    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images;
    }

    return [{ src: item.image, alt: item.alt }];
  }, [item]);

  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  const imageCount = images.length;

  const currentImage = images[imageIndex] ?? images[0];

  const showPreviousImage = () => {
    setImageIndex((current) => (current - 1 + imageCount) % imageCount);
  };

  const showNextImage = () => {
    setImageIndex((current) => (current + 1) % imageCount);
  };

  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && imageCount > 1) {
        setImageIndex((current) => (current - 1 + imageCount) % imageCount);
      }

      if (event.key === "ArrowRight" && imageCount > 1) {
        setImageIndex((current) => (current + 1) % imageCount);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageCount, item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden">
        <div
          className="relative flex h-full w-full items-center justify-center"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <img
            src={currentImage?.src}
            alt={currentImage?.alt ?? item.alt}
            className="max-h-[96vh] max-w-[96vw] object-contain"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-black/75"
            aria-label="Close"
          >
            <span className="text-xl leading-none">×</span>
          </button>

          {imageCount > 1 ? (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
              <button
                type="button"
                onClick={showPreviousImage}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-black/75"
                aria-label="Show previous image"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-black/75"
                aria-label="Show next image"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          ) : null}

          {imageCount > 1 ? (
            <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
              {images.map((image, indicatorIndex) => {
                const isActive = indicatorIndex === imageIndex;
                return (
                  <button
                    key={`${image.src}-${indicatorIndex}`}
                    type="button"
                    onClick={() => setImageIndex(indicatorIndex)}
                    className={`h-2.5 rounded-full transition ${
                      isActive
                        ? "w-8 bg-amber-300"
                        : "w-2.5 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Show image ${indicatorIndex + 1}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
