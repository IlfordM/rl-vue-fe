import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'withIcon', 'outline'],
      description: 'Visual variant of the input',
    },
    icon: {
      control: 'text',
      description: 'Icon name for withIcon variant',
    },
    iconSize: {
      control: { type: 'number', min: 12, max: 24, step: 2 },
      description: 'Size of the icon',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    value: '',
    size: 'md',
    variant: 'default',
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.value || '')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model:value="value" style="width: 300px;" />',
  }),
}

export const WithIcon: Story = {
  args: {
    type: 'search',
    placeholder: 'Search',
    variant: 'withIcon',
    icon: 'search',
    iconSize: 16,
    size: 'md',
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model:value="value" style="width: 300px;" />',
  }),
}

export const Outline: Story = {
  args: {
    type: 'text',
    placeholder: 'Outline input...',
    variant: 'outline',
    size: 'md',
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model:value="value" style="width: 300px;" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <Input placeholder="Small input" size="sm" />
        <Input placeholder="Medium input" size="md" />
        <Input placeholder="Large input" size="lg" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the input component.',
      },
    },
  },
}

export const States: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <Input placeholder="Normal input" />
        <Input placeholder="Disabled input" disabled />
        <Input placeholder="Readonly input" readonly value="Readonly value" />
        <Input placeholder="Required input" required />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different states of the input component.',
      },
    },
  },
}

export const Types: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password input" />
        <Input type="search" placeholder="Search input" variant="withIcon" icon="search" />
        <Input type="tel" placeholder="Phone input" />
        <Input type="url" placeholder="URL input" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different input types.',
      },
    },
  },
}
