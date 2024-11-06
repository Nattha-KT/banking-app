import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.json': ['prettier --write'],
  '*.md': ['prettier --write'],
  '*.{css,yaml,yml}': ['prettier --write'],
};
