import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from '@sentry/react-router';
import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const sentryConfig: SentryReactRouterBuildOptions = {
  org: 'jinwook',
  project: 'wemake',
  // An auth token is required for uploading source maps.
  authToken: import.meta.env.SENTRY_AUTH_TOKEN,
  // ...
};

export default defineConfig((config) => ({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    sentryReactRouter(sentryConfig, config),
  ],
}));
