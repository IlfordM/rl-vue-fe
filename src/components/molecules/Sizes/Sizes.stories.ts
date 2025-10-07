import type { Meta, StoryObj } from '@storybook/vue3';
import Sizes from './Sizes.vue';

const meta: Meta<typeof Sizes> = {
  title: 'Molecules/Sizes',
  component: Sizes,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sizes: {
      control: 'object',
      description: 'Array of size options with name and availability',
    },
    selectedSize: {
      control: 'text',
      description: 'Currently selected size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all size options',
    },
    withInfo: {
      control: 'boolean',
      description: 'Show info icon with popover',
    },
    infoText: {
      control: 'text',
      description: 'Text to display in info popover',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSizes = [
  { name: 'XS', available: true },
  { name: 'S', available: true },
  { name: 'M', available: true },
  { name: 'L', available: false },
  { name: 'XL', available: true },
  { name: 'XXL', available: true },
];

export const Default: Story = {
  args: {
    sizes: sampleSizes,
    selectedSize: '',
    disabled: false,
    withInfo: false,
    infoText: '',
  },
};

export const WithSelectedSize: Story = {
  args: {
    sizes: sampleSizes,
    selectedSize: 'M',
    disabled: false,
    withInfo: false,
    infoText: '',
  },
};

export const WithInfo: Story = {
  args: {
    sizes: sampleSizes,
    selectedSize: '',
    disabled: false,
    withInfo: true,
    infoText:
      'Please refer to our size guide to find your perfect fit. Measurements are in inches.',
  },
};
