import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const AUTO_ADVANCE_MS = 6000;

function TestimonialCard({ testimonial, index, total }) {
  return (
    <article
      className="rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-2xl shadow-black/20 sm:p-7"
      role="group"
      aria-roledescription="slide"
      aria-label={
        total > 1 ? `Testimonial ${index + 1} of ${total}` : "Testimonial"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/80 sm:text-xs">
            Client feedback
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
            What clients say after the install.
          </h2>
        </div>
        <Quote className="mt-1 h-6 w-6 text-amber-200/70" aria-hidden="true" />
      </div>

      <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-200 sm:text-lg sm:leading-8">
        {testimonial.quote}
      </p>

      <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            {testimonial.author}
          </p>
          <p className="mt-1 text-sm text-zinc-400">{testimonial.context}</p>
        </div>
        {testimonial.rating ? (
          <div
            className="inline-flex items-center gap-1 text-amber-200"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            {Array.from({ length: testimonial.rating }).map(
              (_, ratingIndex) => (
                <Star
                  key={ratingIndex}
                  className="h-4 w-4 fill-current"
                  aria-hidden="true"
                />
              ),
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function TestimonialCarousel({
  testimonials,
  onTestimonialViewed,
  onTestimonialNavigated,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = testimonials.length;
  const currentIndex = count ? activeIndex % count : 0;

  useEffect(() => {
    if (!count) {
      return undefined;
    }

    onTestimonialViewed?.(testimonials[currentIndex], currentIndex);
  }, [count, currentIndex, onTestimonialViewed, testimonials]);

  useEffect(() => {
    if (count <= 1 || isPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % count);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [count, isPaused]);

  if (!count) {
    return (
      <section
        className="rounded-[2rem] border border-dashed border-white/15 bg-black/35 p-6 sm:p-7"
        aria-label="Testimonials coming soon"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 sm:text-xs">
          Client feedback
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
          Testimonials are ready to rotate once you publish them.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base">
          The carousel is wired for multiple testimonials. Add real client
          quotes to the site content data file and this section will rotate them
          automatically.
        </p>
      </section>
    );
  }

  const activeTestimonial = testimonials[currentIndex];
  const showControls = count > 1;

  const selectIndex = (nextIndex, source) => {
    setActiveIndex(nextIndex);
    onTestimonialNavigated?.(testimonials[nextIndex], nextIndex, source);
  };

  const showPrevious = () => {
    const nextIndex = (activeIndex - 1 + count) % count;
    selectIndex(nextIndex, "previous");
  };

  const showNext = () => {
    const nextIndex = (activeIndex + 1) % count;
    selectIndex(nextIndex, "next");
  };

  return (
    <section
      className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-2xl backdrop-blur-sm"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <TestimonialCard
        testimonial={activeTestimonial}
        index={currentIndex}
        total={count}
      />

      {showControls ? (
        <div className="flex flex-col gap-4 px-4 pb-4 pt-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:pb-5">
          <div
            className="flex items-center gap-2"
            aria-label="Choose testimonial"
          >
            {testimonials.map((testimonial, testimonialIndex) => {
              const isActive = testimonialIndex === currentIndex;

              return (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => selectIndex(testimonialIndex, "indicator")}
                  className={`h-2.5 rounded-full transition ${
                    isActive
                      ? "w-8 bg-amber-300"
                      : "w-2.5 bg-white/30 hover:bg-white/45"
                  }`}
                  aria-label={`Show testimonial ${testimonialIndex + 1}`}
                  aria-pressed={isActive}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={showPrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white/10"
              aria-label="Show previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white/10"
              aria-label="Show next testimonial"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
