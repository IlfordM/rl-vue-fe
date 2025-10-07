import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Rating from '@/components/molecules/Rating/Rating.vue';

// Mock the Icon component
vi.mock('@/components/atoms/Icon/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<span class="icon" :class="name">{{ name }}</span>',
    props: ['name', 'w', 'h', 'class'],
  },
}));

describe('Rating Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
      },
    });

    expect(wrapper.find('.rating').exists()).toBe(true);
    expect(wrapper.find('.rating-stars').exists()).toBe(true);
    expect(wrapper.find('.rating-text').exists()).toBe(true);
  });

  it('displays correct rating number', () => {
    const rating = 4.2;
    const wrapper = mount(Rating, {
      props: { rating },
    });

    expect(wrapper.text()).toContain(rating.toString());
  });

  it('shows review count when provided', () => {
    const reviewCount = 128;
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
        reviewCount,
      },
    });

    expect(wrapper.text()).toContain(`(${reviewCount})`);
  });

  it('shows reviews link when enabled', () => {
    const reviewsLink = '/products/1/reviews';
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
        showReviewsLink: true,
        reviewsLink,
      },
    });

    const link = wrapper.find('.reviews-link');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe(reviewsLink);
  });

  it('applies correct size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const wrapper = mount(Rating, {
        props: {
          rating: 4.5,
          size,
        },
      });

      expect(wrapper.classes()).toContain(`rating--${size}`);
    });
  });

  it('renders 5 stars', () => {
    const wrapper = mount(Rating, {
      props: { rating: 4.5 },
    });

    const stars = wrapper.findAll('.icon');
    expect(stars).toHaveLength(5);
  });

  it('applies custom class', () => {
    const customClass = 'custom-rating';
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
        class: customClass,
      },
    });

    expect(wrapper.classes()).toContain(customClass);
  });

  it('hides review count when showReviewCount is false', () => {
    const wrapper = mount(Rating, {
      props: {
        rating: 4.5,
        showReviewCount: false,
      },
    });

    expect(wrapper.find('.rating-text').exists()).toBe(false);
  });
});
