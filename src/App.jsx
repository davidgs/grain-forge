import { useEffect, useState } from "react";
import { ArrowRight, Clock3, Mail } from "lucide-react";
import grainForgeLogoHorizontal from "./assets/grain-forge-horizontal.jpg";
import { usePostHog } from "@posthog/react";
import ContactForm from "./components/ContactForm.jsx";
import CommissionModal from "./components/CommissionModal.jsx";
import Footer from "./components/Footer.jsx";

export default function GrainForgeStudioWebsite() {
  const posthog = usePostHog();
  const [view, setView] = useState(() =>
    window.location.hash === "#commissions" ? "commissions" : "home",
  );
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [commissionForm, setCommissionForm] = useState({
    name: "",
    email: "",
    projectType: "Dining table",
    dimensions: "",
    woodSpecies: "",
    epoxyStyle: "",
    baseStyle: "",
    finish: "",
    budget: "",
    timeline: "",
    delivery: "Pickup",
    notes: "",
  });

  useEffect(() => {
    const syncViewFromHash = () => {
      setView(window.location.hash === "#commissions" ? "commissions" : "home");
    };

    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  useEffect(() => {
    if (!isCommissionModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCommissionModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCommissionModalOpen]);

  const handleContactClicked = () => {
    posthog?.capture("contact_clicked", { method: "email" });
  };

  const handleSocialClicked = (platform) => {
    posthog?.capture("social_link_clicked", { platform });
  };

  const buildMailtoUrl = (subject, lines) => {
    const body = lines.join("\n");
    return `mailto:hello@grainforgestudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const updateContactField = (field, value) => {
    setContactForm((previous) => ({ ...previous, [field]: value }));
  };

  const updateCommissionField = (field, value) => {
    setCommissionForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    posthog?.capture("contact_form_submitted", {
      ...contactForm,
      form: "contact",
    });

    window.location.href = buildMailtoUrl("Grain Forge Studio inquiry", [
      "New contact form submission from Grain Forge Studio site",
      "",
      `Name: ${contactForm.name}`,
      `Email: ${contactForm.email}`,
      "",
      "Message:",
      contactForm.message,
    ]);
  };

  const handleCommissionSubmit = (event) => {
    event.preventDefault();
    posthog?.capture("commission_form_submitted", {
      ...commissionForm,
      form: "commission",
    });

    setIsCommissionModalOpen(false);

    window.location.href = buildMailtoUrl(
      "Grain Forge Studio commission request",
      [
        "New commission intake form submission from Grain Forge Studio site",
        "",
        `Name: ${commissionForm.name}`,
        `Email: ${commissionForm.email}`,
        `Project type: ${commissionForm.projectType}`,
        `Dimensions: ${commissionForm.dimensions}`,
        `Wood species / material: ${commissionForm.woodSpecies}`,
        `Epoxy or resin style: ${commissionForm.epoxyStyle}`,
        `Base style: ${commissionForm.baseStyle}`,
        `Finish preference: ${commissionForm.finish}`,
        `Budget range: ${commissionForm.budget}`,
        `Timeline: ${commissionForm.timeline}`,
        `Delivery / install: ${commissionForm.delivery}`,
        "",
        "Initial specs / notes:",
        commissionForm.notes,
      ],
    );
  };

  const handleOpenCommissionPage = () => {
    posthog?.capture("commission_page_opened");
    window.location.hash = "commissions";
  };

  const handleOpenCommissionModal = () => {
    posthog?.capture("commission_modal_opened");
    setIsCommissionModalOpen(true);
  };

  const handleCloseCommissionModal = () => {
    setIsCommissionModalOpen(false);
  };

  const handleBackHome = () => {
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const HomeView = () => (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-amber-300 selection:text-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-700/25 blur-3xl" />
        <div className="absolute right-[-10rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-orange-800/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[35%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <section className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-sm sm:rounded-[2rem] sm:p-8 md:p-12 lg:p-16">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 sm:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-sm font-semibold tracking-tight text-white">
                GF
              </div>
              <div className="leading-none">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-100">
                  Grain Forge
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.4em] text-zinc-500">
                  Studio
                </p>
              </div>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-black/30 p-2.5 sm:inline-flex">
              <img
                src={grainForgeLogoHorizontal}
                alt="Grain Forge Studio logo"
                width="320"
                height="78"
                className="h-10 w-auto rounded-md object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-amber-100 sm:gap-3 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em] sm:self-auto">
              <Clock3 className="h-3.5 w-3.5" />
              Website in progress
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <h1 className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl sm:tracking-[-0.05em] md:text-7xl">
              Coming soon.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
              We are currently building out our portfolio of custom hardwood and
              epoxy table work. The full site will launch soon with project
              galleries, process details, and commission openings.
            </p>
          </div>

          <div className="mt-8 grid gap-8 sm:gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div>
              <ContactForm
                form={contactForm}
                onChange={updateContactField}
                onSubmit={handleContactSubmit}
                onOpenCommissionPage={handleOpenCommissionPage}
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

          <div className="mt-8 border-t border-white/10 pt-5">
            <Footer
              onContactClick={handleContactClicked}
              onSocialClick={handleSocialClicked}
            />
          </div>
        </section>
      </main>
    </div>
  );

  const CommissionsView = () => (
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
            onClick={handleBackHome}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to home
          </button>
          <button
            type="button"
            onClick={handleOpenCommissionModal}
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
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
            Commission process and pricing guidelines.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
            Every project is quoted individually. These guidelines outline how a
            commission moves from first message to final delivery, and which
            factors shape the price.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                step: "01",
                title: "Initial inquiry",
                body: "Send dimensions, inspiration, wood preferences, epoxy ideas, and your timing goals.",
              },
              {
                step: "02",
                title: "Design direction",
                body: "We review scope, confirm feasibility, and align on proportions, materials, and finish direction.",
              },
              {
                step: "03",
                title: "Quote and deposit",
                body: "You receive a written quote and timeline. Projects begin once the deposit is received and specs are approved.",
              },
              {
                step: "04",
                title: "Build and delivery",
                body: "We craft the piece, share key updates when useful, and coordinate pickup or delivery at completion.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-white/10 bg-black/35 p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/80">
                  Step {item.step}
                </p>
                <h2 className="mt-3 text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-black/35 p-5 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">
                Pricing guidelines
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Size and overall complexity have the biggest impact on price.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Material selection changes cost, especially for rare slabs,
                  color matching, and premium epoxy pours.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Custom bases, inlays, live-edge shaping, and specialized
                  finishes add labor and fabrication time.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Rush timelines may require schedule adjustments and additional
                  fees.
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Delivery distance, white-glove placement, and installation
                  requests are quoted separately.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/35 p-5 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">
                What we quote
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Custom dining tables, coffee tables, consoles, and statement
                  pieces.
                </p>
                <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Single-piece commissions and small matched sets.
                </p>
                <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Material sourcing and design refinement are included in the
                  quoting process.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
                We do not use fixed pricing here because each piece is built to
                fit the space, the materials, and the finish requirements of the
                project.
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleOpenCommissionModal}
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Open commission form
                </button>
                <button
                  type="button"
                  onClick={handleBackHome}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Back to home
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            <Footer
              onContactClick={handleContactClicked}
              onSocialClick={handleSocialClicked}
            />
          </div>
        </section>
      </main>
    </div>
  );

  return (
    <>
      {view === "commissions" ? <CommissionsView /> : <HomeView />}
      <CommissionModal
        isOpen={isCommissionModalOpen}
        form={commissionForm}
        onChange={updateCommissionField}
        onClose={handleCloseCommissionModal}
        onSubmit={handleCommissionSubmit}
      />
    </>
  );
}
