import { lazy, Suspense, useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import grainForgeLogoHorizontal from "./assets/grain-forge-horizontal.jpg";
import { usePostHog } from "@posthog/react";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";

const CommissionsView = lazy(() => import("./views/CommissionsView.jsx"));
const CommissionModal = lazy(() => import("./components/CommissionModal.jsx"));

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

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-zinc-950" aria-hidden="true" />
        }
      >
        {view === "commissions" ? (
          <CommissionsView
            onBackHome={handleBackHome}
            onOpenCommissionModal={handleOpenCommissionModal}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
          />
        ) : (
          <HomeView />
        )}
      </Suspense>
      {isCommissionModalOpen ? (
        <Suspense fallback={null}>
          <CommissionModal
            isOpen={isCommissionModalOpen}
            form={commissionForm}
            onChange={updateCommissionField}
            onClose={handleCloseCommissionModal}
            onSubmit={handleCommissionSubmit}
          />
        </Suspense>
      ) : null}
    </>
  );
}
