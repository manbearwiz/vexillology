import type { UserConfig } from 'vitest/config';

export default {
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      name: 'vexillology',
    },
    rollupOptions: {
      external: [
        'unleash-proxy-client',
        '@splitsoftware/splitio',
        '@optimizely/optimizely-sdk',
        'launchdarkly-js-client-sdk',
      ],
    },
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom',
  },
} satisfies UserConfig;
