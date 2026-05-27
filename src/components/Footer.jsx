export default function Footer({ onContactClick, onSocialClick }) {
  return (
    <footer className="border-t border-white/10 pt-5 sm:pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500 sm:text-sm">© Grain Forge Studio</p>

        <a
          href="mailto:hello@grainforgestudio.com"
          onClick={onContactClick}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white sm:text-sm"
          aria-label="hello@grainforgestudio.com"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.1-.6 5.4 4.2c.3.2.7.2 1 0l5.4-4.2H6.1ZM6 17.5c0 .3.2.5.5.5h11c.3 0 .5-.2.5-.5V8.2l-5.3 4.1a2.2 2.2 0 0 1-2.7 0L6 8.2v9.3Z" />
          </svg>
          <span>hello@grainforgestudio.com</span>
        </a>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href="https://www.instagram.com/grainforgestudio"
            target="_blank"
            rel="noreferrer"
            onClick={() => onSocialClick?.("instagram")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white sm:text-sm"
            aria-label="@grainforgestudio on Instagram"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.9A3.9 3.9 0 0 0 3.9 7.8v8.4A3.9 3.9 0 0 0 7.8 20h8.4a3.9 3.9 0 0 0 3.9-3.8V7.8a3.9 3.9 0 0 0-3.9-3.9H7.8Zm8.9 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Z" />
            </svg>
            <span>@grainforgestudio</span>
          </a>
          <a
            href="https://www.facebook.com/grainforgestudio"
            target="_blank"
            rel="noreferrer"
            onClick={() => onSocialClick?.("facebook")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white sm:text-sm"
            aria-label="@grainforgestudio on Facebook"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M13.5 21v-7.2h2.4l.36-2.8H13.5V9.2c0-.8.22-1.35 1.37-1.35H16.4V5.34c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.8 1.37-3.8 3.9V11H7.8v2.8h2.52V21h3.18Z" />
            </svg>
            <span>@grainforgestudio</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
