import type { Meta, StoryObj } from '@storybook/vue3';
import PriceWithDiscount from './PriceWithDiscount.vue';

const meta: Meta<typeof PriceWithDiscount> = {
  title: 'Molecules/PriceWithDiscount',
  component: PriceWithDiscount,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    price: {
      control: { type: 'number' },
    },
    discount: {
      control: { type: 'number', min: 0, max: 100 },
    },
    currency: {
      control: { type: 'text' },
    },
    offerEndDate: {
      control: { type: 'date' },
    },
    offerDescriptionLink: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 199.99,
    discount: 0,
    currency: '$',
  },
};

export const WithDiscount: Story = {
  args: {
    price: 199.99,
    discount: 20,
    currency: '$',
  },
};

export const WithActiveOffer: Story = {
  args: {
    price: 199.99,
    discount: 20,
    currency: '$',
    offerEndDate: '2024-12-31',
    offerDescriptionLink: '/offers/wireless-headphones-sale',
  },
};

export const ExpiredOffer: Story = {
  args: {
    price: 199.99,
    discount: 20,
    currency: '$',
    offerEndDate: '2023-01-01',
    offerDescriptionLink: '/offers/wireless-headphones-sale',
  },
};

export const DifferentCurrencies: Story = {
  render: () => ({
    components: { PriceWithDiscount },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <PriceWithDiscount price="199.99" discount="20" currency="$" />
        <PriceWithDiscount price="199.99" discount="20" currency="€" />
        <PriceWithDiscount price="199.99" discount="20" currency="£" />
        <PriceWithDiscount price="199.99" discount="20" currency="¥" />
      </div>
    `,
  }),
};

export const DifferentDiscounts: Story = {
  render: () => ({
    components: { PriceWithDiscount },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <PriceWithDiscount price="199.99" discount="10" currency="$" />
        <PriceWithDiscount price="199.99" discount="25" currency="$" />
        <PriceWithDiscount price="199.99" discount="50" currency="$" />
        <PriceWithDiscount price="199.99" discount="75" currency="$" />
      </div>
    `,
  }),
};

export const WithAndWithoutOffer: Story = {
  render: () => ({
    components: { PriceWithDiscount },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <PriceWithDiscount price="199.99" discount="20" currency="$" />
        <PriceWithDiscount price="199.99" discount="20" currency="$"
          offer-end-date="2024-12-31"
          offer-description-link="/offers/wireless-headphones-sale" />
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    price: 199.99,
    discount: 20,
    currency: '$',
    offerEndDate: '2024-12-31',
    offerDescriptionLink: '/offers/wireless-headphones-sale',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive price component with all controls available.',
      },
    },
  },
};
