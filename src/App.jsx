import { lazy, Suspense, useEffect, useState } from "react";
import { usePostHog } from "@posthog/react";
import { portfolioItems, testimonials } from "./content/siteContent.js";
import { getPostBySlug, publishedPosts } from "./content/posts.js";
import HomeView from "./views/HomeView.jsx";

const CommissionsView = lazy(() => import("./views/CommissionsView.jsx"));
const CommissionModal = lazy(() => import("./components/CommissionModal.jsx"));
const PortfolioView = lazy(() => import("./views/PortfolioView.jsx"));
const PostsView = lazy(() => import("./views/PostsView.jsx"));
const PostDetailView = lazy(() => import("./views/PostDetailView.jsx"));
const SubmitTestimonialView = lazy(() => import("./views/SubmitTestimonialView.jsx"));

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, "");

  if (hash === "commissions") {
    return { view: "commissions", slug: null };
  }

  if (hash === "portfolio") {
    return { view: "portfolio", slug: null };
  }

  if (hash === "posts") {
    return { view: "posts", slug: null };
  }

  if (hash.startsWith("posts/")) {
    const slug = decodeURIComponent(hash.slice("posts/".length));

    return {
      view: slug ? "post-detail" : "posts",
      slug: slug || null,
    };
  }

  if (hash === "submit-testimonial") {
    return { view: "submit-testimonial", slug: null };
  }

  return { view: "home", slug: null };
}

export default function GrainForgeStudioWebsite() {
  const posthog = usePostHog();
  const [route, setRoute] = useState(getRouteFromHash);
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
  const currentPost =
    route.view === "post-detail" && route.slug
      ? getPostBySlug(route.slug)
      : null;

  useEffect(() => {
    const syncViewFromHash = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener("hashchange", syncViewFromHash);
    return () => window.removeEventListener("hashchange", syncViewFromHash);
  }, []);

  useEffect(() => {
    if (route.view === "commissions") {
      posthog?.capture("commission_page_opened");
    }

    if (route.view === "portfolio") {
      posthog?.capture("portfolio_page_opened", {
        projectCount: portfolioItems.length,
      });
    }

    if (route.view === "posts") {
      posthog?.capture("posts_page_opened", {
        postCount: publishedPosts.length,
      });
    }

    if (route.view === "post-detail" && currentPost) {
      posthog?.capture("post_detail_opened", {
        slug: currentPost.slug,
        type: currentPost.type,
      });
    }
  }, [currentPost, posthog, route.view]);

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

  const handleOpenPostsPage = () => {
    window.location.hash = "posts";
  };

  const handleOpenPostDetailPage = (slug) => {
    window.location.hash = `posts/${encodeURIComponent(slug)}`;
  };

  const handleOpenSubmitTestimonialPage = () => {
    posthog?.capture("submit_testimonial_page_opened");
    window.location.hash = "submit-testimonial";
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
        {route.view === "commissions" ? (
          <CommissionsView
            onBackHome={handleBackHome}
            onOpenCommissionModal={handleOpenCommissionModal}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
            onOpenPostsPage={handleOpenPostsPage}
          />
        ) : route.view === "portfolio" ? (
          <PortfolioView
            items={portfolioItems}
            testimonials={testimonials}
            onBackHome={handleBackHome}
            onOpenCommissionModal={handleOpenCommissionModal}
            onOpenSubmitTestimonialPage={handleOpenSubmitTestimonialPage}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
            onOpenPostsPage={handleOpenPostsPage}
            onPortfolioViewed={() => {
              posthog?.capture("portfolio_gallery_viewed", {
                projectCount: portfolioItems.length,
              });
            }}
            onPortfolioItemOpened={handlePortfolioItemOpened}
            onTestimonialViewed={handleTestimonialViewed}
            onTestimonialNavigated={handleTestimonialNavigated}
          />
        ) : route.view === "posts" ? (
          <PostsView
            posts={publishedPosts}
            onBackHome={handleBackHome}
            onOpenCommissionModal={handleOpenCommissionModal}
            onOpenPost={handleOpenPostDetailPage}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
          />
        ) : route.view === "post-detail" ? (
          <PostDetailView
            post={currentPost}
            posts={publishedPosts}
            onBackHome={handleBackHome}
            onBackToPosts={handleOpenPostsPage}
            onOpenCommissionModal={handleOpenCommissionModal}
            onOpenPost={handleOpenPostDetailPage}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
          />
        ) : route.view === "submit-testimonial" ? (
          <SubmitTestimonialView
            onGoHome={handleBackHome}
            onContactClick={handleContactClicked}
            onSocialClick={handleSocialClicked}
            onOpenPostsPage={handleOpenPostsPage}
          />
        ) : (
          <HomeView
            contactForm={contactForm}
            testimonials={testimonials}
            onContactFieldChange={updateContactField}
            onContactSubmit={handleContactSubmit}
            onOpenCommissionPage={handleOpenCommissionPage}
            onOpenPortfolioPage={handleOpenPortfolioPage}
            onOpenPostsPage={handleOpenPostsPage}
            onOpenSubmitTestimonialPage={handleOpenSubmitTestimonialPage}
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
