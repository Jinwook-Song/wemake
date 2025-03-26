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
  authToken:
    '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',
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
