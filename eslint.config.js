import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['main/'] },
	js.configs.recommended,
	...ts.configs.strictTypeChecked,
	{
		files: ['**/*.{ts,tsx,mts,cts}'],
		languageOptions: {
			parserOptions: {
				projectService: true
			}
		}
	},
	{
		files: ['**/*.{js,mjs,cjs}'],
		extends: [ts.configs.disableTypeChecked]
	},
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint recommends leaving undefined-variable checks to the TypeScript compiler.
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	}
);
