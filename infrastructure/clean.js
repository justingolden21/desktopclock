import fs from 'fs';

const paths = ['.netlify', '.svelte-kit', 'build'];
for (const path of paths) {
	if (fs.existsSync(path)) {
		fs.rmSync(path, { recursive: true });
		console.log(`deleted ${path}`);
	}
}
