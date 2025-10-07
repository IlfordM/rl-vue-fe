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

export const WithActiveOffer: Story = {
  args: {
    price: 199.99,
    discount: 20,
    currency: '$',
    offerEndDate: '2035-12-31',
    offerDescriptionLink: '/offers/wireless-headphones-sale',
  },
};
