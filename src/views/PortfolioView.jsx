import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Mail,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import PortfolioLightbox from "../components/PortfolioLightbox.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel.jsx";

export default function PortfolioView({
  items,
  testimonials,
  onBackHome,
  onOpenCommissionModal,
  onOpenSubmitTestimonialPage,
  onContactClick,
  onSocialClick,
  onPortfolioViewed,
  onPortfolioItemOpened,
  onTestimonialViewed,
  onTestimonialNavigated,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectImageIndex, setProjectImageIndex] = useState(0);
  const triggerRef = useRef(null);

  useEffect(() => {
    onPortfolioViewed?.();
  }, [onPortfolioViewed]);

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const projectCount = items.length;
  const currentProjectIndex = projectCount ? projectIndex % projectCount : 0;
  const currentProject = items[currentProjectIndex] ?? null;
  const hasMultipleProjects = projectCount > 1;
  const feedbackTestimonial =
    currentProject?.feedback && Array.isArray(testimonials)
      ? testimonials.find(
          (testimonial) => testimonial.id === currentProject.feedback,
        )
      : null;
  const currentProjectImages =
    currentProject?.images?.length > 0
      ? currentProject.images
      : currentProject
        ? [{ src: currentProject.image, alt: currentProject.alt }]
        : [];
  const currentProjectImageCount = currentProjectImages.length;
  const currentProjectImageSafeIndex = currentProjectImageCount
    ? projectImageIndex % currentProjectImageCount
    : 0;
  const currentProjectImage =
    currentProjectImages[currentProjectImageSafeIndex];

  const handleOpenItem = (index, imageIndex = 0) => {
    setActiveIndex(index);
    setActiveImageIndex(imageIndex);
    onPortfolioItemOpened?.(items[index], index);
  };

  const handleClose = () => {
    setActiveIndex(null);

    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const showPreviousProject = () => {
    if (!hasMultipleProjects) {
      return;
    }

    setProjectImageIndex(0);
    setProjectIndex((current) => (current - 1 + projectCount) % projectCount);
  };

  const showNextProject = () => {
    if (!hasMultipleProjects) {
      return;
    }

    setProjectImageIndex(0);
    setProjectIndex((current) => (current + 1) % projectCount);
  };

  const showPreviousProjectImage = () => {
    if (currentProjectImageCount <= 1) {
      return;
    }

    setProjectImageIndex(
      (current) =>
        (current - 1 + currentProjectImageCount) % currentProjectImageCount,
    );
  };

  const showNextProjectImage = () => {
    if (currentProjectImageCount <= 1) {
      return;
    }

    setProjectImageIndex((current) => (current + 1) % currentProjectImageCount);
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-amber-300 selection:text-zinc-950">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-700/25 blur-3xl" />
          <div className="absolute right-[-10rem] top-[22%] h-[30rem] w-[30rem] rounded-full bg-orange-800/20 blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[32%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to home
            </button>
            <button
              type="button"
              onClick={onOpenCommissionModal}
              className="inline-flex items-center rounded-full bg-white/[0.5] px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
            >
              <Mail className="mr-2 h-4 w-4" />
              Start a commission
            </button>
          </div>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-sm sm:p-8 md:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.34em] text-zinc-400">
              Grain Forge Studio
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
              Portfolio gallery.
            </h1>
            {/* <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
              This route is wired for a growing body of published work. The card
              layout, lightbox, and navigation are live now, and the placeholder
              project entries can be replaced as soon as final photography is
              ready.
            </p> */}

            {currentProject ? (
              <div className="mt-8 space-y-4">
                <div className="group w-full overflow-hidden rounded-3xl border border-white/10 bg-black/35 text-left transition hover:border-white/20 hover:bg-black/45">
                  <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900 lg:aspect-auto lg:min-h-[24rem] lg:border-b-0 lg:border-r">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenItem(
                            currentProjectIndex,
                            currentProjectImageSafeIndex,
                          )
                        }
                        ref={triggerRef}
                        className="h-full w-full"
                        aria-label="Open large view of current project image"
                      >
                        <img
                          src={currentProjectImage?.src}
                          alt={currentProjectImage?.alt ?? currentProject.alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                      </button>
                      <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white">
                        <Expand className="h-4 w-4" aria-hidden="true" />
                      </div>

                      {currentProjectImageCount > 1 ? (
                        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
                          <button
                            type="button"
                            onClick={showPreviousProjectImage}
                            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white transition hover:bg-black/70"
                            aria-label="Show previous project image"
                          >
                            <ChevronLeft
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={showNextProjectImage}
                            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white transition hover:bg-black/70"
                            aria-label="Show next project image"
                          >
                            <ChevronRight
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      ) : null}

                      {currentProjectImageCount > 1 ? (
                        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                          {currentProjectImages.map((image, index) => {
                            const isActive =
                              index === currentProjectImageSafeIndex;

                            return (
                              <button
                                key={`${image.src}-${index}`}
                                type="button"
                                onClick={() => setProjectImageIndex(index)}
                                className={`h-2.5 rounded-full transition ${
                                  isActive
                                    ? "w-8 bg-amber-300"
                                    : "w-2.5 bg-white/50 hover:bg-white/70"
                                }`}
                                aria-label={`Show project image ${index + 1}`}
                                aria-pressed={isActive}
                              />
                            );
                          })}
                        </div>
                      ) : null}
                    </div>

                    <div className="p-6 sm:p-8">
                      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                        {currentProject.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                        {currentProject.summary}
                      </p>
                      <div className="mt-6 grid gap-3 text-sm text-zinc-300">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-xs">
                            Materials
                          </p>
                          <p className="mt-1 whitespace-pre-line text-zinc-200">
                            {currentProject.materials}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-xs">
                            Dimensions
                          </p>
                          <p className="mt-1 text-zinc-200">
                            {currentProject.dimensions}
                          </p>
                        </div>
                        {feedbackTestimonial ? (
                          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-amber-100/80 sm:text-xs">
                              Client feedback
                            </p>
                            <p className="mt-2 text-sm leading-7 text-amber-50">
                              {feedbackTestimonial.quote}
                            </p>
                            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-amber-100/80">
                              {feedbackTestimonial.author}
                              {feedbackTestimonial.context
                                ? ` · ${feedbackTestimonial.context}`
                                : ""}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {hasMultipleProjects ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div
                      className="flex items-center gap-2"
                      aria-label="Choose project"
                    >
                      {items.map((item, index) => {
                        const isActive = index === currentProjectIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setProjectImageIndex(0);
                              setProjectIndex(index);
                            }}
                            className={`h-2.5 rounded-full transition ${
                              isActive
                                ? "w-8 bg-amber-300"
                                : "w-2.5 bg-white/40 hover:bg-white/60"
                            }`}
                            aria-label={`Show project ${index + 1}`}
                            aria-pressed={isActive}
                          />
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={showPreviousProject}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white/10"
                        aria-label="Show previous project"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextProject}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white/10"
                        aria-label="Show next project"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-dashed border-white/20 bg-black/35 p-6 text-sm text-zinc-300">
                No portfolio items yet. Add one in site content to populate this
                section.
              </div>
            )}

            <div className="mt-8">
              <TestimonialCarousel
                testimonials={testimonials}
                onTestimonialViewed={onTestimonialViewed}
                onTestimonialNavigated={onTestimonialNavigated}
                onOpenSubmitTestimonialPage={onOpenSubmitTestimonialPage}
              />
            </div>

            <div className="mt-8 border-t border-white/10 pt-5">
              <Footer
                onContactClick={onContactClick}
                onSocialClick={onSocialClick}
              />
            </div>
          </section>
        </main>
      </div>

      <PortfolioLightbox
        key={`${activeItem?.id ?? "portfolio-lightbox-empty"}-${activeImageIndex}`}
        item={activeItem}
        initialImageIndex={activeImageIndex}
        onClose={handleClose}
      />
    </>
  );
}
