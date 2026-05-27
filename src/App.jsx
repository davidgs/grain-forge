import { lazy, Suspense, useEffect, useState } from "react";
import { usePostHog } from "@posthog/react";
import { portfolioItems, testimonials } from "./content/siteContent.js";
import HomeView from "./views/HomeView.jsx";

const CommissionsView = lazy(() => import("./views/CommissionsView.jsx"));
const CommissionModal = lazy(() => import("./components/CommissionModal.jsx"));
const PortfolioView = lazy(() => import("./views/PortfolioView.jsx"));

function getViewFromHash() {
  if (window.location.hash === "#commissions") {
    return "commissions";
  }

  if (window.location.hash === "#portfolio") {
    return "portfolio";
  }

  return "home";
}

export default function GrainForgeStudioWebsite() {
  const posthog = usePostHog();
  const [view, setView] = useState(getViewFromHash);
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
      setView(getViewFromHash());
    };

    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  useEffect(() => {
    if (view === "commissions") {
      posthog?.capture("commission_page_opened");
    }

    if (view === "portfolio") {
      posthog?.capture("portfolio_page_opened", {
        projectCount: portfolioItems.length,
      });
    }
  }, [posthog, view]);

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
    window.location.hash = "commissions";
  };

  const handleOpenPortfolioPage = () => {
    window.location.hash = "portfolio";
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

  const handleTestimonialViewed = (testimonial, index) => {
    posthog?.capture("testimonial_viewed", {
      testimonialId: testimonial.id,
      position: index,
    });
  };

  const handleTestimonialNavigated = (testimonial, index, source) => {
    posthog?.capture("testimonial_navigated", {
      testimonialId: testimonial.id,
      position: index,
      source,
    });
  };

  const handlePortfolioItemOpened = (item, index) => {
    posthog?.capture("portfolio_item_opened", {
      projectId: item.id,
      position: index,
    });
  };

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
        ) : view === "portfolio" ? (
          <PortfolioView
            items={portfolioItems}
            testimonials={testimonials}
            onBackHome={handleBackHome}
            onOpenCommissionModal={handleOpenCommissionModal}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
            onPortfolioViewed={() => {
              posthog?.capture("portfolio_gallery_viewed", {
                projectCount: portfolioItems.length,
              });
            }}
            onPortfolioItemOpened={handlePortfolioItemOpened}
            onTestimonialViewed={handleTestimonialViewed}
            onTestimonialNavigated={handleTestimonialNavigated}
          />
        ) : (
          <HomeView
            contactForm={contactForm}
            testimonials={testimonials}
            onContactFieldChange={updateContactField}
            onContactSubmit={handleContactSubmit}
            onOpenCommissionPage={handleOpenCommissionPage}
            onOpenPortfolioPage={handleOpenPortfolioPage}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
            onTestimonialViewed={handleTestimonialViewed}
            onTestimonialNavigated={handleTestimonialNavigated}
          />
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
