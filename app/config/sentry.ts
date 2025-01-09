import * as Sentry from "@sentry/react"

////NOTE: if you're adding a sentryDNS, run npx @sentry/wizard@latest -i sourcemaps
////to send sourcempas and allow readable error tracing

export const sentryConfig = {
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost"] //add production URL
    }),
    new Sentry.Replay()
  ],
  // Performance Monitoring
  tracesSampleRate: 0.5, // Capture 100% when setted to 1.0 of the transactions, reduce in production! Currently getting 50%
  // Session Replay
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
}
