import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async config => {
    // Remove all problematic plugins that cause Storybook issues
    if (config.plugins) {
      config.plugins = config.plugins.filter(plugin => {
        if (typeof plugin === 'object' && plugin && 'name' in plugin) {
          return ![
            'vite-plugin-vue-devtools',
            'vite-plugin-inspect',
            'vue-devtools',
            'inspect',
          ].includes(plugin.name);
        }
        return true;
      });
    }

    // Also ensure no inspect plugin is in the array
    config.plugins =
      config.plugins?.filter(plugin => {
        if (typeof plugin === 'function') {
          return !plugin.toString().includes('inspect');
        }
        return true;
      }) || [];

    return config;
  },
};
export default config;
