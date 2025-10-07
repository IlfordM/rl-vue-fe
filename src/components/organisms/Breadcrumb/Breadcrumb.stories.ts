import type { Meta, StoryObj } from '@storybook/vue3';
import Breadcrumb from './Breadcrumb.vue';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Organisms/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
    },
    separator: {
      control: 'text',
      description: 'Separator character between items',
    },
    showHome: {
      control: 'boolean',
      description: 'Whether to show home link',
    },
    homeLabel: {
      control: 'text',
      description: 'Label for home link',
    },
    homeHref: {
      control: 'text',
      description: 'URL for home link',
    },
  },
  args: {
    items: [
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/subcategory' },
      { label: 'Product', active: true },
    ],
    separator: '/',
    showHome: true,
    homeLabel: 'Home',
    homeHref: '/',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHome: Story = {
  args: {
    showHome: false,
    items: [
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones', active: true },
    ],
  },
};

export const LongBreadcrumb: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Computers', href: '/products/electronics/computers' },
      { label: 'Laptops', href: '/products/electronics/computers/laptops' },
      { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
      { label: 'ASUS ROG Strix', active: true },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Current Page', active: true }],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: '>',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current', active: true },
    ],
  },
};
