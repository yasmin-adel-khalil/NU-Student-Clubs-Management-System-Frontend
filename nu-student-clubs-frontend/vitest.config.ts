import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vitest-angular';
import { getVitestConfig } from 'ng-vitest-helper';

export default defineConfig(
  getVitestConfig(
    {
      plugins: [angular()],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [],
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
          include: ['src/app/**/*.ts'],
          exclude: [
            'src/app/**/*.spec.ts',
            'src/app/**/*.module.ts'
          ]
        }
      }
    }
  )
);
