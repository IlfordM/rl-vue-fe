import type { Meta, StoryObj } from '@storybook/vue3';
import Rating from './Rating.vue';

const meta: Meta<typeof Rating> = {
  title: 'Molecules/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
    },
    reviewCount: {
      control: { type: 'number' },
    },
    showReviewCount: {
      control: { type: 'boolean' },
    },
    showReviewsLink: {
      control: { type: 'boolean' },
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
    rating: 4.5,
    reviewCount: 128,
    showReviewCount: true,
    showReviewsLink: false,
    size: 'md',
  },
};

export const WithReviewsLink: Story = {
  args: {
    rating: 4.2,
    reviewCount: 89,
    showReviewCount: true,
    showReviewsLink: true,
    reviewsLink: '/products/1/reviews',
    size: 'md',
  },
};

export const HalfStar: Story = {
  args: {
    rating: 3.5,
    reviewCount: 45,
    showReviewCount: true,
    showReviewsLink: false,
    size: 'md',
  },
};

export const NoReviews: Story = {
  args: {
    rating: 4.0,
    reviewCount: 0,
    showReviewCount: true,
    showReviewsLink: false,
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <Rating rating="4.5" review-count="128" size="sm" />
        <Rating rating="4.5" review-count="128" size="md" />
        <Rating rating="4.5" review-count="128" size="lg" />
      </div>
    `,
  }),
};

export const DifferentRatings: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <Rating rating="1" review-count="5" />
        <Rating rating="2.5" review-count="12" />
        <Rating rating="3" review-count="25" />
        <Rating rating="4.2" review-count="89" />
        <Rating rating="5" review-count="256" />
      </div>
    `,
  }),
};

export const WithAndWithoutLink: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <Rating rating="4.5" review-count="128" :show-reviews-link="false" />
        <Rating rating="4.5" review-count="128" :show-reviews-link="true" reviews-link="/products/1/reviews" />
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    rating: 4.5,
    reviewCount: 128,
    showReviewCount: true,
    showReviewsLink: true,
    reviewsLink: '/products/1/reviews',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive rating component with all controls available.',
      },
    },
  },
};
