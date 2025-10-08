import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from './Badge.vue';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'sale', 'info', 'stroke'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">On Sale</Badge>',
  }),
};

export const Sale: Story = {
  args: {
    variant: 'sale',
    size: 'md',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">On Sale</Badge>',
  }),
};

export const Info: Story = {
  args: {
    variant: 'info',
    size: 'md',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">New</Badge>',
  }),
};

export const Stroke: Story = {
  args: {
    variant: 'stroke',
    size: 'sm',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Stroke</Badge>',
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <Badge variant="sale" size="sm">On Sale</Badge>
        <Badge variant="sale" size="md">On Sale</Badge>
        <Badge variant="sale" size="lg">On Sale</Badge>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <Badge variant="default">Default</Badge>
        <Badge variant="sale">Sale</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="stroke">Stroke</Badge>
      </div>
    `,
  }),
};
