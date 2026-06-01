import { ArrowLeft } from "lucide-react";
import { usePostHog } from "@posthog/react";
import SubmitTestimonialForm from "../components/SubmitTestimonialForm.jsx";
import Footer from "../components/Footer.jsx";

export default function SubmitTestimonialView({
  onGoHome,
  onContactClick,
  onSocialClick,
}) {
  const posthog = usePostHog();

  const buildMailtoUrl = (subject, lines) => {
    const body = lines.join("\n");
    return `mailto:hello@grainforgestudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleTestimonialSubmit = (formData) => {
    posthog?.capture("testimonial_form_submitted", {
      ...formData,
      form: "submit_testimonial",
    });

    window.location.href = buildMailtoUrl(
      "Grain Forge Studio testimonial submission",
      [
        "New testimonial submission from Grain Forge Studio site",
        "",
        `Name: ${formData.author}`,
        `Project/Connection: ${formData.context}`,
        `Rating: ${formData.rating} / 5`,
        "",
        "Testimonial:",
        formData.quote,
      ]
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-amber-300 selection:text-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-700/25 blur-3xl" />
        <div className="absolute right-[-10rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-orange-800/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[35%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-2xl flex-1 items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <section className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-sm sm:rounded-[2rem] sm:p-8 md:p-12">
          <button
            type="button"
            onClick={onGoHome}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Share Your Experience
            </h1>
            <p className="mt-3 text-base text-zinc-300 sm:text-lg">
              We'd love to hear about your experience with Grain Forge Studio.
              Your feedback helps us improve and inspires potential clients.
            </p>
          </div>

          <SubmitTestimonialForm onSubmit={handleTestimonialSubmit} />
        </section>
      </main>

      <Footer
        onContactClick={onContactClick}
        onSocialClick={onSocialClick}
      />
    </div>
  );
}
