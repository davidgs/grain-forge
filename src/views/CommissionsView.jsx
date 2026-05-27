import { ArrowRight, Mail } from "lucide-react";
import Footer from "../components/Footer.jsx";

export default function CommissionsView({
  onBackHome,
  onOpenCommissionModal,
  onContactClick,
  onSocialClick,
}) {
  return (
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
                  onClick={onOpenCommissionModal}
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Open commission form
                </button>
                <button
                  type="button"
                  onClick={onBackHome}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Back to home
                </button>
              </div>
            </div>
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
  );
}
