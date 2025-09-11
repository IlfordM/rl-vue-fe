import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin) => {
        if (typeof plugin === 'object' && plugin && 'name' in plugin) {
          // Remove problematic plugins
          return !['vite-plugin-vue-devtools', 'vite-plugin-inspect', 'vue-devtools'].includes(
            plugin.name,
          )
        }
        return true
      })
    }
    return config
  },
}
export default config
