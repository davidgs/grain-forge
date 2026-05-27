import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";

function loadStatcounter() {
  if (document.querySelector('script[data-statcounter="grain-forge"]')) {
    return;
  }

  window.sc_project = 13244648;
  window.sc_invisible = 1;
  window.sc_security = "2fc12722";

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://www.statcounter.com/counter/counter.js";
  script.async = true;
  script.dataset.statcounter = "grain-forge";
  document.body.appendChild(script);
}

function AnalyticsBootstrap() {
  useEffect(() => {
    let cancelled = false;
    let idleCallbackId = null;
    let timeoutId = null;

    const initAnalytics = () => {
      if (cancelled) {
        return;
      }

      const token = import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN;
      const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

      if (token && host && !posthog.__loaded) {
        posthog.init(token, {
          api_host: host,
          defaults: "2026-01-30",
        });
      }

      loadStatcounter();
    };

    const startAfterPaint = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(initAnalytics, {
          timeout: 2000,
        });
        return;
      }

      timeoutId = window.setTimeout(initAnalytics, 1200);
    };

    const rafId = window.requestAnimationFrame(startAfterPaint);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);

      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <AnalyticsBootstrap />
      <App />
    </PostHogProvider>
  </StrictMode>,
);
