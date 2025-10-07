import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Product from '@/components/organisms/Product/Product.vue';

// Mock child components
vi.mock('@/components/atoms/Button/Button.vue', () => ({
  default: {
    name: 'Button',
    template: '<button :class="$attrs.class" v-bind="$attrs"><slot /></button>',
    props: ['variant', 'size', 'disabled'],
    inheritAttrs: false,
  },
}));

vi.mock('@/components/atoms/Icon/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<span class="icon">{{ name }}</span>',
    props: ['name', 'w', 'h'],
  },
}));

vi.mock('@/components/molecules/PriceWithDiscount/PriceWithDiscount.vue', () => ({
  default: {
    name: 'PriceWithDiscount',
    template: '<div class="price">{{ price }}</div>',
    props: ['price', 'originalPrice', 'discount'],
  },
}));

vi.mock('@/components/molecules/Rating/Rating.vue', () => ({
  default: {
    name: 'Rating',
    template: '<div class="rating">{{ rating }}</div>',
    props: ['rating', 'reviewCount'],
  },
}));

vi.mock('@/components/organisms/Carousel/ImageCarousel.vue', () => ({
  default: {
    name: 'ImageCarousel',
    template: '<div class="carousel">Carousel</div>',
    props: ['images', 'autoplay', 'showNavigation'],
  },
}));

vi.mock('@/components/organisms/Breadcrumb/Breadcrumb.vue', () => ({
  default: {
    name: 'Breadcrumb',
    template: '<nav class="breadcrumb">Breadcrumb</nav>',
    props: ['items'],
  },
}));

describe('Product Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    image: 'test-image.jpg',
    description: 'Test product description',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    tags: ['New', 'Popular'],
    colors: [
      { name: 'Red', value: '#ff0000', available: true },
      { name: 'Blue', value: '#0000ff', available: true },
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: false },
    ],
  };

  it('renders product information correctly', () => {
    const wrapper = mount(Product, {
      props: { product: mockProduct },
    });

    expect(wrapper.find('.product-name').text()).toBe(mockProduct.name);
    expect(wrapper.find('.product').exists()).toBe(true);
  });

  // it('emits addToCart event when add to cart button is clicked', async () => {
  //   const wrapper = mount(Product, {
  //     props: { product: mockProduct },
  //   });

  //   const addToCartBtn = wrapper.find('.add-to-cart-btn');
  //   expect(addToCartBtn.exists()).toBe(true);

  //   await addToCartBtn.trigger('click');
  //   expect(wrapper.emitted('addToCart')).toBeTruthy();
  // });

  it('emits buyNow event when buy now button is clicked', async () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct,
        showAddToCart: true,
        showFavorites: true,
        showSizes: true,
        showColors: true,
      },
    });

    const buyNowBtn = wrapper.find('.buy-now-btn');
    await buyNowBtn.trigger('click');

    expect(wrapper.emitted('buyNow')).toBeTruthy();
    expect(wrapper.emitted('buyNow')?.[0]).toEqual([mockProduct]);
  });

  // it('toggles favorites and emits correct events', async () => {
  //   const wrapper = mount(Product, {
  //     props: { product: mockProduct },
  //   });

  //   const favoritesBtn = wrapper.find('.add-to-wishlist-btn');

  //   // First click - add to favorites
  //   await favoritesBtn.trigger('click');
  //   expect(wrapper.emitted('addToFavorites')).toBeTruthy();

  //   // Second click - remove from favorites
  //   await favoritesBtn.trigger('click');
  //   expect(wrapper.emitted('removeFromFavorites')).toBeTruthy();
  // });

  it('handles color selection', async () => {
    const wrapper = mount(Product, {
      props: { product: mockProduct },
    });

    const colorButtons = wrapper.findAll('.color-option');
    await colorButtons[0].trigger('click');

    expect(wrapper.emitted('selectColor')).toBeTruthy();
    expect(wrapper.emitted('selectColor')?.[0]).toEqual(['Red']);
  });

  it('handles size selection', async () => {
    const wrapper = mount(Product, {
      props: { product: mockProduct },
    });

    const sizeButtons = wrapper.findAll('.size-option');
    await sizeButtons[0].trigger('click');

    expect(wrapper.emitted('selectSize')).toBeTruthy();
    expect(wrapper.emitted('selectSize')?.[0]).toEqual(['S']);
  });

  it('disables unavailable sizes', () => {
    const wrapper = mount(Product, {
      props: { product: mockProduct },
    });

    const sizeButtons = wrapper.findAll('.size-option');
    const unavailableSize = sizeButtons.find((btn: { text: () => string }) => btn.text() === 'L');

    expect(unavailableSize?.attributes('disabled')).toBeDefined();
    expect(unavailableSize?.classes()).toContain('unavailable');
  });

  it('disables unavailable colors', () => {
    const productWithUnavailableColor = {
      ...mockProduct,
      colors: [
        { name: 'Red', value: '#ff0000', available: true },
        { name: 'Blue', value: '#0000ff', available: false },
      ],
    };

    const wrapper = mount(Product, {
      props: { product: productWithUnavailableColor },
    });

    const colorButtons = wrapper.findAll('.color-option');
    const unavailableColor = colorButtons.find(btn => btn.attributes('title') === 'Blue');

    expect(unavailableColor?.attributes('disabled')).toBeDefined();
    expect(unavailableColor?.classes()).toContain('unavailable');
  });

  // it('applies correct variant class', () => {
  //   const wrapper = mount(Product, {
  //     props: {
  //       product: mockProduct,
  //       variant: 'compact',
  //     },
  //   });

  //   expect(wrapper.classes()).toContain('product--compact');
  // });

  it('shows description only in detailed variant', () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct,
        variant: 'detailed',
      },
    });

    expect(wrapper.find('.product-description').exists()).toBe(true);
    expect(wrapper.find('.product-description').text()).toBe(mockProduct.description);
  });

  it('hides description in default variant', () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct,
        variant: 'default',
      },
    });

    expect(wrapper.find('.product-description').exists()).toBe(false);
  });

  // it('disables buttons when product is out of stock', () => {
  //   const outOfStockProduct = { ...mockProduct, inStock: false };
  //   const wrapper = mount(Product, {
  //     props: {
  //       product: outOfStockProduct,
  //       showAddToCart: true,
  //       showFavorites: true,
  //     },
  //   });

  //   const addToCartBtn = wrapper.find('.add-to-cart-btn');
  //   const buyNowBtn = wrapper.find('.buy-now-btn');

  //   expect(addToCartBtn.exists()).toBe(true);
  //   expect(buyNowBtn.exists()).toBe(true);
  //   expect(addToCartBtn.attributes('disabled')).toBeDefined();
  //   expect(buyNowBtn.attributes('disabled')).toBeDefined();
  // });
});
