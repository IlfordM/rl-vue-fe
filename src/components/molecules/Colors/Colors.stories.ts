import type { Meta, StoryObj } from '@storybook/vue3';
import Colors from './Colors.vue';

const meta: Meta<typeof Colors> = {
  title: 'Molecules/Colors',
  component: Colors,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    colors: {
      control: 'object',
      description: 'Array of color options with name, value and availability',
    },
    selectedColor: {
      control: 'text',
      description: 'Currently selected color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all color options',
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

const sampleColors = [
  { name: 'Yellow', value: '#FFD700', available: true },
  { name: 'Red', value: '#FF0000', available: true },
  { name: 'Black', value: '#000000', available: true },
  { name: 'Blue', value: '#0000FF', available: false },
  { name: 'Green', value: '#00FF00', available: true },
  { name: 'White', value: '#FFFFFF', available: true },
];

export const Default: Story = {
  args: {
    colors: sampleColors,
    selectedColor: '',
    disabled: false,
    withInfo: false,
    infoText: '',
  },
};

export const WithSelectedColor: Story = {
  args: {
    colors: sampleColors,
    selectedColor: 'Yellow',
    disabled: false,
    withInfo: false,
    infoText: '',
  },
};
