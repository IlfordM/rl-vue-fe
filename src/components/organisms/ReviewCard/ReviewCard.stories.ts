import type { Meta, StoryObj } from '@storybook/vue3';
import ReviewCard from './ReviewCard.vue';

const meta: Meta<typeof ReviewCard> = {
  title: 'Organisms/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    reviewerName: {
      control: 'text',
    },
    reviewerInitials: {
      control: 'text',
    },
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
    },
    reviewText: {
      control: 'text',
    },
    productSize: {
      control: 'text',
    },
    productColor: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reviewerName: 'Ed Sheeran',
    reviewerInitials: 'Ed',
    rating: 4.5,
    reviewText:
      'Drop top designer clothes. Front row at fashion shows. "What d\'you do?" and "Who d\'you know?". Inside the world of beautiful people.',
    productSize: 'XL',
    productColor: 'Yellow',
  },
};

export const WithoutAttributes: Story = {
  args: {
    reviewerName: 'John Doe',
    reviewerInitials: 'JD',
    rating: 5,
    reviewText: 'Amazing product! Highly recommend it to everyone.',
    productSize: '',
    productColor: '',
  },
};

export const LongReview: Story = {
  args: {
    reviewerName: 'Sarah Wilson',
    reviewerInitials: 'SW',
    rating: 4,
    reviewText:
      'This is a much longer review that demonstrates how the component handles extended text content. The review should wrap properly and maintain good readability even with substantial amounts of text. The layout should remain clean and professional regardless of content length.',
    productSize: 'M',
    productColor: 'Blue',
  },
};

export const LowRating: Story = {
  args: {
    reviewerName: 'Mike Johnson',
    reviewerInitials: 'MJ',
    rating: 2.5,
    reviewText: 'Not quite what I expected. The quality could be better.',
    productSize: 'L',
    productColor: 'Red',
  },
};
