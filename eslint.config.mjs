import nextConfig from 'eslint-config-next/core-web-vitals';
import nextTsConfig from 'eslint-config-next/typescript';

const eslintConfig = [...nextConfig, ...nextTsConfig, { ignores: ['.next/**', 'node_modules/**'] }];

export default eslintConfig;
