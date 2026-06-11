import { Clock3, ArrowRight } from "lucide-react";
import grainForgeLogoHorizontal from "../assets/grain-forge-horizontal.jpg";
import ContactForm from "../components/ContactForm.jsx";
import Footer from "../components/Footer.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel.jsx";

export default function HomeView({
  contactForm,
  testimonials,
  onContactFieldChange,
  onContactSubmit,
  onOpenCommissionPage,
  onOpenPortfolioPage,
  onOpenPostsPage,
  onOpenSubmitTestimonialPage,
  onContactClick,
  onSocialClick,
  onTestimonialViewed,
  onTestimonialNavigated,
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-amber-300 selection:text-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-700/25 blur-3xl" />
        <div className="absolute right-[-10rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-orange-800/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[35%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <section className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-sm sm:rounded-[2rem] sm:p-8 md:p-12 lg:p-16">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex rounded-2xl border border-white/10 bg-black/30 p-2">
              <img
                src={grainForgeLogoHorizontal}
                alt="Grain Forge Studio logo"
                width="320"
                height="78"
                className="h-9 w-auto rounded-md object-contain sm:h-10"
              />
            </div>

            <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-amber-100 sm:gap-3 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em] sm:self-auto">
              <Clock3 className="h-3.5 w-3.5" />
              Website in progress
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl sm:tracking-[-0.05em] md:text-7xl">
                  Coming soon.
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
                  We are currently building out our portfolio of custom hardwood
                  and epoxy table work. The full site will launch soon with
                  project galleries, process details, and commission openings.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={onOpenPortfolioPage}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenPostsPage}
                  className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-50 transition hover:bg-amber-300/15"
                >
                  Shop updates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div>
              <ContactForm
                form={contactForm}
                onChange={onContactFieldChange}
                onSubmit={onContactSubmit}
                onOpenCommissionPage={onOpenCommissionPage}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-200 sm:text-xs sm:tracking-[0.3em]">
                What to expect
              </p>
              <ul className="mt-4 space-y-3 text-xs text-zinc-300 sm:mt-5 sm:space-y-4 sm:text-sm">
                <li className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3">
                  Signature live-edge and river table builds
                </li>
                <li className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3">
                  Material stories and build process breakdowns
                </li>
                <li className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3">
                  Commission timeline and pricing guidance
                </li>
              </ul>
              <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-zinc-200 sm:mt-6 sm:text-xs sm:tracking-[0.25em]">
                Launching 2026
              </p>
              <p className="mt-2 text-xs text-zinc-300 sm:text-sm">
                Crafted in wood. Finished in resin. Built to last.
              </p>
            </div>
          </div>

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
              onOpenPostsPage={onOpenPostsPage}
              onSocialClick={onSocialClick}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
