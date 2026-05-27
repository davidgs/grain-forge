<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Grain Forge Studio React + Vite landing page.

**Changes made:**

- Installed `posthog-js` and `@posthog/react` packages
- Added PostHog initialization and `PostHogProvider` wrapper in `src/main.jsx`
- Added `usePostHog` hook and two capture calls in `src/App.jsx` — one on the "Contact us" email link and one on the "Get launch updates" button
- Set PostHog credentials in `.env.local` via `VITE_PUBLIC_POSTHOG_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` environment variables

| Event name | Description | File |
|---|---|---|
| `contact_clicked` | User clicked the "Contact us" email link on the coming soon page | `src/App.jsx` |
| `launch_updates_clicked` | User clicked the "Get launch updates" button on the coming soon page | `src/App.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1613782)
- [Contact clicks over time](/insights/vxnCpwI0) — daily trend of contact email link clicks
- [Launch update clicks over time](/insights/k49Hjpvo) — daily trend of launch updates button clicks
- [CTA clicks comparison](/insights/p1cbEJVf) — both CTAs side-by-side on one chart
- [Total contact clicks](/insights/4cEBgghU) — single bold number for total contact clicks
- [Total launch update clicks](/insights/p7WbYZDB) — single bold number for total launch update clicks

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
