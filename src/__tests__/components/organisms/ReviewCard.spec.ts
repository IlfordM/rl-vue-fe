import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ReviewCard from '@/components/organisms/ReviewCard/ReviewCard.vue';

// Mock child components
vi.mock('@/components/molecules/Rating/Rating.vue', () => ({
  default: {
    name: 'Rating',
    template: '<div class="rating" :data-rating="rating">{{ rating }}</div>',
    props: ['rating', 'showReviewCount'],
  },
}));

vi.mock('@/components/atoms/Badge/Badge.vue', () => ({
  default: {
    name: 'Badge',
    template: '<span class="badge" :data-variant="variant" :data-size="size"><slot /></span>',
    props: ['variant', 'size'],
  },
}));

describe('ReviewCard Component', () => {
  const mockReview = {
    reviewerName: 'John Doe',
    reviewerInitials: 'JD',
    rating: 4.5,
    reviewText: 'Great product! Highly recommend it.',
    productSize: 'L',
    productColor: 'Blue',
    avatarBackgroundColor: '#5c7995',
  };

  it('renders review information correctly', () => {
    const wrapper = mount(ReviewCard, {
      props: mockReview,
    });

    expect(wrapper.find('.reviewer-name').text()).toBe(mockReview.reviewerName);
    expect(wrapper.find('.avatar').text()).toBe(mockReview.reviewerInitials);
    expect(wrapper.find('.review-text').text()).toBe(mockReview.reviewText);
  });

  it('displays rating component with correct props', () => {
    const wrapper = mount(ReviewCard, {
      props: mockReview,
    });

    const ratingComponent = wrapper.findComponent({ name: 'Rating' });
    expect(ratingComponent.exists()).toBe(true);
    expect(ratingComponent.props('rating')).toBe(mockReview.rating);
    expect(ratingComponent.props('showReviewCount')).toBe(false);
  });

  it('shows product attributes when provided', () => {
    const wrapper = mount(ReviewCard, {
      props: mockReview,
    });

    const badges = wrapper.findAllComponents({ name: 'Badge' });
    expect(badges).toHaveLength(2);
    expect(badges[0].text()).toBe(mockReview.productSize);
    expect(badges[1].text()).toBe(mockReview.productColor);
  });

  it('hides product attributes when not provided', () => {
    const reviewWithoutAttributes = {
      reviewerName: 'Jane Doe',
      reviewerInitials: 'JD',
      rating: 3,
      reviewText: 'Average product.',
    };

    const wrapper = mount(ReviewCard, {
      props: reviewWithoutAttributes,
    });

    expect(wrapper.find('.product-attributes').exists()).toBe(false);
  });

  it('applies custom avatar background color', () => {
    const wrapper = mount(ReviewCard, {
      props: mockReview,
    });

    const avatar = wrapper.find('.avatar');
    const style = avatar.attributes('style');
    expect(style).toContain('background-color');
    expect(style).toMatch(/background-color:\s*rgb\(92,\s*121,\s*149\)/);
  });

  it('uses default avatar background color when not provided', () => {
    const reviewWithoutAvatarColor = {
      reviewerName: 'Jane Doe',
      reviewerInitials: 'JD',
      rating: 3,
      reviewText: 'Average product.',
    };

    const wrapper = mount(ReviewCard, {
      props: reviewWithoutAvatarColor,
    });

    const avatar = wrapper.find('.avatar');
    const style = avatar.attributes('style');
    expect(style).toContain('background-color');
    expect(style).toMatch(/background-color:\s*rgb\(92,\s*121,\s*149\)/);
  });

  it('applies custom class when provided', () => {
    const wrapper = mount(ReviewCard, {
      props: {
        ...mockReview,
        class: 'custom-review-card',
      },
    });

    expect(wrapper.classes()).toContain('custom-review-card');
  });

  it('renders with only required props', () => {
    const minimalReview = {
      reviewerName: 'Test User',
      reviewerInitials: 'TU',
      rating: 5,
      reviewText: 'Excellent!',
    };

    const wrapper = mount(ReviewCard, {
      props: minimalReview,
    });

    expect(wrapper.find('.reviewer-name').text()).toBe(minimalReview.reviewerName);
    expect(wrapper.find('.avatar').text()).toBe(minimalReview.reviewerInitials);
    expect(wrapper.find('.review-text').text()).toBe(minimalReview.reviewText);
    expect(wrapper.find('.product-attributes').exists()).toBe(false);
  });

  it('handles long review text correctly', () => {
    const longReview = {
      ...mockReview,
      reviewText:
        'This is a very long review that should test how the component handles extended text content. The review should wrap properly and maintain good readability even with substantial amounts of text. The layout should remain clean and professional regardless of content length.',
    };

    const wrapper = mount(ReviewCard, {
      props: longReview,
    });

    expect(wrapper.find('.review-text').text()).toBe(longReview.reviewText);
    expect(wrapper.find('.review-card').exists()).toBe(true);
  });

  it('displays only size badge when color is not provided', () => {
    const reviewWithOnlySize = {
      ...mockReview,
      productColor: '',
    };

    const wrapper = mount(ReviewCard, {
      props: reviewWithOnlySize,
    });

    const badges = wrapper.findAllComponents({ name: 'Badge' });
    expect(badges).toHaveLength(1);
    expect(badges[0].text()).toBe(mockReview.productSize);
  });

  it('displays only color badge when size is not provided', () => {
    const reviewWithOnlyColor = {
      ...mockReview,
      productSize: '',
    };

    const wrapper = mount(ReviewCard, {
      props: reviewWithOnlyColor,
    });

    const badges = wrapper.findAllComponents({ name: 'Badge' });
    expect(badges).toHaveLength(1);
    expect(badges[0].text()).toBe(mockReview.productColor);
  });

  it('applies correct badge props', () => {
    const wrapper = mount(ReviewCard, {
      props: mockReview,
    });

    const badges = wrapper.findAllComponents({ name: 'Badge' });
    badges.forEach(badge => {
      expect(badge.props('variant')).toBe('stroke');
      expect(badge.props('size')).toBe('sm');
    });
  });

  it('renders with different rating values', () => {
    const ratings = [1, 2.5, 3, 4.5, 5];

    ratings.forEach(rating => {
      const wrapper = mount(ReviewCard, {
        props: {
          ...mockReview,
          rating,
        },
      });

      const ratingComponent = wrapper.findComponent({ name: 'Rating' });
      expect(ratingComponent.props('rating')).toBe(rating);
    });
  });

  it('maintains proper structure with all elements', () => {
    const wrapper = mount(ReviewCard, {
      props: mockReview,
    });

    // Check main structure
    expect(wrapper.find('.review-card').exists()).toBe(true);
    expect(wrapper.find('.review-header').exists()).toBe(true);
    expect(wrapper.find('.reviewer-info').exists()).toBe(true);
    expect(wrapper.find('.reviewer-details').exists()).toBe(true);
    expect(wrapper.find('.rating-container').exists()).toBe(true);
    expect(wrapper.find('.review-content').exists()).toBe(true);

    // Check specific elements
    expect(wrapper.find('.avatar').exists()).toBe(true);
    expect(wrapper.find('.reviewer-name').exists()).toBe(true);
    expect(wrapper.find('.product-attributes').exists()).toBe(true);
    expect(wrapper.find('.review-text').exists()).toBe(true);
  });
});
