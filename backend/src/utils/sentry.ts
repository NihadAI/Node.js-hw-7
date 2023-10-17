import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";

Sentry.init({
  dsn: "https://d3ce6d56fadd8f6e3fec91bb6661c70a@o4505841111203840.ingest.sentry.io/4505841115987968",
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      root: global.__dirname,
    }),
  ],
});

const sentryLog = (e: any) => {
  Sentry.captureException(e);
};

export default sentryLog;

  