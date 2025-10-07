import type { Meta, StoryObj } from '@storybook/vue3';
import Icon from './Icon.vue';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible icon component that uses SVG sprites from the icons.svg file.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'home',
        'user',
        'mail',
        'phone',
        'search',
        'trash',
        'coupon',
        'menu',
        'close',
        'arrow',
        'star',
        'rl',
        'lock',
        'logo',
        'bag',
        'bag-plus',
        'heart-plus',
        'dropdown',
        'cart',
        'cart-plus',
        'info',
        'heart',
        'search',
        'star-fill',
        'star-half',
        'star-empty',
      ],
      description: 'The name of the icon to display',
    },
    size: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: 'Size of the icon (applies to both width and height)',
    },
    w: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: 'Custom width (overrides size)',
    },
    h: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: 'Custom height (overrides size)',
    },
    fill: {
      control: 'color',
      description: 'Fill color of the icon',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
    fill: 'currentColor',
  },
};

export const Large: Story = {
  args: {
    name: 'star',
    size: 48,
    fill: '#ffd700',
  },
};

export const CustomDimensions: Story = {
  args: {
    name: 'heart',
    w: 32,
    h: 24,
    fill: '#ff6b6b',
  },
};

export const WithAriaLabel: Story = {
  args: {
    name: 'search',
    size: 24,
    fill: '#333',
    ariaLabel: 'Search for content',
  },
};

export const CustomClass: Story = {
  args: {
    name: 'mail',
    size: 24,
    fill: '#007bff',
    class: 'fill-current hover:fill-blue-600 transition-colors',
  },
};

export const AllIcons: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; padding: 20px; max-width: 800px;">
        <div v-for="iconName in iconNames" :key="iconName" style="text-align: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <Icon :name="iconName" :size="24" style="margin-bottom: 8px;" />
          <div style="font-size: 12px; color: #6b7280; word-break: break-all;">{{ iconName }}</div>
        </div>
      </div>
    `,
    data() {
      return {
        iconNames: [
          'home',
          'user',
          'mail',
          'phone',
          'search',
          'trash',
          'coupon',
          'menu',
          'close',
          'arrow',
          'star',
          'rl',
          'lock',
          'logo',
          'bag',
          'bag-plus',
          'heart-plus',
          'dropdown',
          'cart',
          'cart-plus',
          'info',
          'heart',
          'search',
          'star-fill',
          'star-half',
          'star-empty',
        ],
      };
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of all available icons in the system.',
      },
    },
  },
};

export const SizeVariations: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div style="display: flex; align-items: center; gap: 24px; padding: 20px;">
        <div v-for="size in sizes" :key="size" style="text-align: center;">
          <Icon name="star" :size="size" fill="#ffd700" style="margin-bottom: 8px;" />
          <div style="font-size: 12px; color: #6b7280;">{{ size }}px</div>
        </div>
      </div>
    `,
    data() {
      return {
        sizes: [16, 20, 24, 32, 40, 48],
      };
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different size variations of the same icon.',
      },
    },
  },
};

export const ColorVariations: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div style="display: flex; align-items: center; gap: 24px; padding: 20px;">
        <div v-for="color in colors" :key="color.name" style="text-align: center;">
          <div :style="{ color: color.value }">
            <Icon name="heart" :size="32" style="margin-bottom: 8px;" />
          </div>
          <div style="font-size: 12px; color: #6b7280;">{{ color.name }}</div>
        </div>
      </div>
    `,
    data() {
      return {
        colors: [
          { name: 'Red', value: '#ef4444' },
          { name: 'Blue', value: '#3b82f6' },
          { name: 'Green', value: '#10b981' },
          { name: 'Yellow', value: '#f59e0b' },
          { name: 'Purple', value: '#8b5cf6' },
          { name: 'Pink', value: '#ec4899' },
        ],
      };
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'The same icon in different colors using CSS color property.',
      },
    },
  },
};
