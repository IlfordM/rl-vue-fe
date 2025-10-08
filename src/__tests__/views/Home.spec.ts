import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

interface HomeComponent {
  cartCount: number;
  favoritesCount: number;
  product: { name: string; price: number };
  handleAddToCart: (product: { id: string; name: string }) => void;
  handleAddToFavorites: (product: { id: string; name: string }) => void;
  handleRemoveFromFavorites: (product: { id: string; name: string }) => void;
}

// Mock all child components
vi.mock('@/components/organisms/Header/Header.vue', () => ({
  default: { name: 'PageHeader', template: '<header>Header</header>' },
}));

vi.mock('@/components/organisms/Footer/Footer.vue', () => ({
  default: { name: 'PageFooter', template: '<footer>Footer</footer>' },
}));

vi.mock('@/components/atoms/Button/Button.vue', () => ({
  default: {
    name: 'Button',
    template: '<button><slot /></button>',
    props: ['variant', 'class', 'style'],
  },
}));

vi.mock('@/components/atoms/Icon/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<span class="icon">{{ name }}</span>',
    props: ['name', 'w', 'h', 'class'],
  },
}));

vi.mock('@/components/organisms/Cart/Cart.vue', () => ({
  default: {
    name: 'Cart',
    template: '<div class="cart">Cart</div>',
    props: ['isOpen', 'cartCount'],
  },
}));

vi.mock('@/components/organisms/Favorites/Favorites.vue', () => ({
  default: {
    name: 'Favorites',
    template: '<div class="favorites">Favorites</div>',
    props: ['isOpen', 'favoritesCount'],
  },
}));

vi.mock('@/components/organisms/Product/Product.vue', () => ({
  default: {
    name: 'Product',
    template: '<div class="product">Product</div>',
    props: ['product', 'variant'],
  },
}));

describe('Home View', () => {
  it('renders main content', () => {
    const wrapper = mount(Home);

    expect(wrapper.find('.home').exists()).toBe(true);
    expect(wrapper.find('.main-content').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('RL shop');
  });

  it('shows cart count badge', () => {
    const wrapper = mount(Home);

    const badge = wrapper.find('.badge');
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toBe('2'); // Initial cart count
  });

  it('handles add to cart event', async () => {
    const wrapper = mount(Home);

    // Mock console.log to avoid noise in tests
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Trigger add to cart (this would normally come from Product component)
    await (wrapper.vm as unknown as HomeComponent).handleAddToCart({
      id: '1',
      name: 'Test Product',
    });

    expect((wrapper.vm as unknown as HomeComponent).cartCount).toBe(3); // Initial 2 + 1
    expect(consoleSpy).toHaveBeenCalledWith('Added to cart:', { id: '1', name: 'Test Product' });

    consoleSpy.mockRestore();
  });

  it('handles add to favorites event', async () => {
    const wrapper = mount(Home);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await (wrapper.vm as unknown as HomeComponent).handleAddToFavorites({
      id: '1',
      name: 'Test Product',
    });

    expect((wrapper.vm as unknown as HomeComponent).favoritesCount).toBe(2); // Initial 1 + 1
    expect(consoleSpy).toHaveBeenCalledWith('Added to favorites:', {
      id: '1',
      name: 'Test Product',
    });

    consoleSpy.mockRestore();
  });

  it('handles remove from favorites event', async () => {
    const wrapper = mount(Home);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await (wrapper.vm as unknown as HomeComponent).handleRemoveFromFavorites({
      id: '1',
      name: 'Test Product',
    });

    expect((wrapper.vm as unknown as HomeComponent).favoritesCount).toBe(0); // Initial 1 - 1
    expect(consoleSpy).toHaveBeenCalledWith('Removed from favorites:', {
      id: '1',
      name: 'Test Product',
    });

    consoleSpy.mockRestore();
  });

  it('displays product information', () => {
    const wrapper = mount(Home);

    expect(wrapper.find('.product').exists()).toBe(true);
    expect((wrapper.vm as unknown as HomeComponent).product.name).toBe(
      'Premium Wireless Headphones'
    );
    expect((wrapper.vm as unknown as HomeComponent).product.price).toBe(199.99);
  });

  it('shows about section', () => {
    const wrapper = mount(Home);

    const aboutSection = wrapper.find('.about');
    expect(aboutSection.exists()).toBe(true);
    expect(aboutSection.find('h2').text()).toBe('About Us');
  });
});
