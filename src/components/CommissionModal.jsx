import { Mail } from "lucide-react";

export default function CommissionModal({
  isOpen,
  form,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <button
        type="button"
        aria-label="Close commission form"
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92vh] w-[min(100%,76rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">
              Commission intake form
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Tell us what you want to build.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
              Share the rough specs you have in mind and we’ll turn that into a
              first quote and a realistic build timeline.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/10"
            aria-label="Close"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid flex-1 gap-6 overflow-y-auto px-5 py-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">
              Quick details
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Name
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => onChange("name", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Email
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => onChange("email", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="space-y-1.5 sm:col-span-2">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Project type
                </span>
                <select
                  value={form.projectType}
                  onChange={(event) =>
                    onChange("projectType", event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/50 focus:bg-zinc-900"
                >
                  <option>Dining table</option>
                  <option>Coffee table</option>
                  <option>Console table</option>
                  <option>Desk</option>
                  <option>Custom piece</option>
                </select>
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Approx. dimensions
                </span>
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={(event) =>
                    onChange("dimensions", event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                  placeholder='72" x 36" x 30"'
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Wood species / material
                </span>
                <input
                  type="text"
                  value={form.woodSpecies}
                  onChange={(event) =>
                    onChange("woodSpecies", event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                  placeholder="Walnut, oak, maple, etc."
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Epoxy / resin style
                </span>
                <input
                  type="text"
                  value={form.epoxyStyle}
                  onChange={(event) =>
                    onChange("epoxyStyle", event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                  placeholder="River pour, tinted fill, clear resin"
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Base style
                </span>
                <input
                  type="text"
                  value={form.baseStyle}
                  onChange={(event) =>
                    onChange("baseStyle", event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                  placeholder="Steel, wood, pedestal, etc."
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Finish preference
                </span>
                <input
                  type="text"
                  value={form.finish}
                  onChange={(event) => onChange("finish", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                  placeholder="Matte, satin, high gloss, etc."
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Budget range
                </span>
                <select
                  value={form.budget}
                  onChange={(event) => onChange("budget", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/50 focus:bg-zinc-900"
                >
                  <option value="">Select a range</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000 - $8,000</option>
                  <option>$8,000 - $12,000</option>
                  <option>$12,000+</option>
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Timeline
                </span>
                <select
                  value={form.timeline}
                  onChange={(event) => onChange("timeline", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/50 focus:bg-zinc-900"
                >
                  <option value="">Select timeline</option>
                  <option>As soon as possible</option>
                  <option>1-2 months</option>
                  <option>2-3 months</option>
                  <option>Flexible</option>
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Delivery / install
                </span>
                <select
                  value={form.delivery}
                  onChange={(event) => onChange("delivery", event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/50 focus:bg-zinc-900"
                >
                  <option>Pickup</option>
                  <option>Local delivery</option>
                  <option>White-glove delivery</option>
                  <option>Installation needed</option>
                </select>
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Initial specs and notes
              </span>
              <textarea
                rows="7"
                value={form.notes}
                onChange={(event) => onChange("notes", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/50 focus:bg-zinc-900"
                placeholder="Share the room, styling goals, inspiration links, edge style, color palette, or anything else that would help us quote accurately."
                required
              />
            </label>
          </div>

          <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-xs">
              What we need to know
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                Exact dimensions or the closest estimate you have.
              </p>
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                Preferred wood or resin direction, plus any inspiration links.
              </p>
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                Target budget and timing so we can confirm fit before we quote.
              </p>
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                Delivery or installation expectations for your space.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
              This drafts an email to hello@grainforgestudio.com with the specs
              you enter here.
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:mt-auto sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Close
              </button>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
