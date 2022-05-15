// for testing
module.exports = {
	transform: {
		// '^.+\\.svelte$': ['svelte-jester', { preprocess: './svelte.config.test.cjs' }],
		'^.+\\.svelte$': ['svelte-jester'],
		'^.+\\.js$': 'babel-jest'
	},
	moduleFileExtensions: ['js', 'svelte'],
	moduleNameMapper: {
		'^\\$lib(.*)$': '<rootDir>/src/lib$1',
		'^\\$app(.*)$': [
			'<rootDir>/.svelte-kit/dev/runtime/app$1',
			'<rootDir>/.svelte-kit/build/runtime/app$1'
		]
	},
	// setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
	collectCoverageFrom: ['src/**/*.{svelte,js}']
};
