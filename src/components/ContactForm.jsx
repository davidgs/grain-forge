import { ArrowRight, Mail } from "lucide-react";

export default function ContactForm({
  form,
  onChange,
  onSubmit,
  onOpenCommissionPage,
}) {
  return (
    <form
      id="contact"
      className="mt-6 rounded-3xl border border-white/10 bg-black/35 p-4 sm:mt-8 sm:p-6"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-300 sm:text-xs sm:tracking-[0.3em]">
          Contact form
        </p>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-200 transition hover:bg-white/10"
          onClick={onOpenCommissionPage}
        >
          Commission form
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-300">
            Name
          </span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => onChange("name", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-amber-300/50 focus:bg-white/[0.06]"
            placeholder="Your name"
            required
          />
        </label>
        <label className="space-y-1.5">
          <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-300">
            Email
          </span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => onChange("email", event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-amber-300/50 focus:bg-white/[0.06]"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <label className="mt-3 block space-y-1.5">
        <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-300">
          Message
        </span>
        <textarea
          rows="4"
          value={form.message}
          onChange={(event) => onChange("message", event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-amber-300/50 focus:bg-white/[0.06]"
          placeholder="Ask a question, give feedback, or just say hi! We aim to respond within 1-2 business days."
          required
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-zinc-300">
          This drafts an email to hello@grainforgestudio.com with your details.
        </p>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-full bg-white/[0.4] px-5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
        >
          <Mail className="mr-2 h-4 w-4" />
          Send
        </button>
      </div>
    </form>
  );
}
