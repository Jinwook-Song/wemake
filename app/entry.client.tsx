import * as Sentry from '@sentry/react-router';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

Sentry.init({
  dsn: 'https://7077b37262e97cd2d9eb4d02bc49a149@o4504225712242688.ingest.us.sentry.io/4509043982991360',
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
