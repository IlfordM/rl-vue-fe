<script setup lang="ts">
import PageHeader from '@/components/organisms/Header/Header.vue';
import PageFooter from '@/components/organisms/Footer/Footer.vue';
import Button from '@/components/atoms/Button/Button.vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import Cart from '@/components/organisms/Cart/Cart.vue';
import Favorites from '@/components/organisms/Favorites/Favorites.vue';
import { ref, computed } from 'vue';
import Product from '@/components/organisms/Product/Product.vue';

defineOptions({
  name: "HomePage"
})

enum SidebarType {
  CART = 'cart',
  FAVORITES = 'favorites'
}

// Mock data for cart and favorites count
const cartCount = ref(2);
const favoritesCount = ref(1);

// Sidebar state
const sidebarType = ref<SidebarType | null>(null);

// Computed properties
const isSidebarOpen = computed(() => sidebarType.value !== null);
const currentCount = computed(() => {
  return sidebarType.value === SidebarType.CART ? cartCount.value : favoritesCount.value;
});



// Sidebar handlers
const openCart = () => {
  sidebarType.value = SidebarType.CART;
};

const openFavorites = () => {
  sidebarType.value = SidebarType.FAVORITES;
};

const closeSidebar = () => {
  sidebarType.value = null;
};

const removeFromCart = (id: string) => {
  cartCount.value = Math.max(0, cartCount.value - 1);
  // Here you would remove the item from cart
};

const removeFromFavorites = (id: string) => {
  favoritesCount.value = Math.max(0, favoritesCount.value - 1);
  // Here you would remove the item from favorites
};

const addToCart = (id: string) => {
  cartCount.value += 1;
  // Here you would add the item to cart
};

const product = ref({
  id: '1',
  name: 'Premium Wireless Headphones',
  price: 199.99,
  originalPrice: 249.99,
  discount: 20,
  image: 'https://picsum.photos/seed/product/400/400',
  description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
  rating: 4.5,
  reviewCount: 128,
  inStock: true,
  tags: ['Wireless', 'Noise Cancelling', 'Premium'],
  colors: [
    { name: 'Black', value: '#000000', available: true },
    { name: 'White', value: '#ffffff', available: true },
    { name: 'Blue', value: '#3b82f6', available: false }
  ],
  sizes: [
    { name: 'S', available: true },
    { name: 'M', available: true },
    { name: 'L', available: false },
    { name: 'XL', available: true }
  ]
});

const handleAddToCart = (product: any) => {
  cartCount.value += 1;
  console.log('Added to cart:', product);
};

const handleAddToFavorites = (product: any) => {
  favoritesCount.value += 1;
  console.log('Added to favorites:', product);
};

const handleRemoveFromFavorites = (product: any) => {
  favoritesCount.value = Math.max(0, favoritesCount.value - 1);
  console.log('Removed from favorites:', product);
};
</script>

<template>
  <div class="home">
    <PageHeader />
    <Button class="sidebar-button" variant="ghost" :style="{ top: '140px' }" @click="openCart">
      <div class="icon-with-badge">
        <Icon name="cart" w="27" h="24" class="icon-cart" />
        <span v-if="cartCount > 0" class="badge" :aria-label="`${cartCount} items in cart`">
          {{ cartCount > 99 ? '99+' : cartCount }}
        </span>
      </div>
    </Button>
    <Button class="sidebar-button" variant="ghost" :style="{ top: '240px' }" @click="openFavorites">
      <div class="icon-with-badge">
        <Icon name="heart" w="27" h="24" class="icon-heart" />
        <span v-if="favoritesCount > 0" class="badge" :aria-label="`${favoritesCount} items in favorites`">
          {{ favoritesCount > 99 ? '99+' : favoritesCount }}
        </span>
      </div>
    </Button>

    <!-- Single Sidebar Container -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar">
      <div class="sidebar-container" @click.stop>
        <Cart v-if="sidebarType === SidebarType.CART" :is-open="true" :cart-count="currentCount" @close="closeSidebar"
          @remove-item="removeFromCart" />

        <Favorites v-if="sidebarType === SidebarType.FAVORITES" :is-open="true" :favorites-count="currentCount"
          @close="closeSidebar" @remove-favorite="removeFromFavorites" @add-to-cart="addToCart" />
      </div>
    </div>

    <main class="main-content">

      <section class="hero">
        <h1>RL shop</h1>
      </section>
      <section class="item-section">

        <div class="item-details">
          <Product :product="product" variant="detailed" @add-to-cart="handleAddToCart"
            @add-to-favorites="handleAddToFavorites" @remove-from-favorites="handleRemoveFromFavorites" />
        </div>
      </section>

      <section class="about">
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </section>

      <section class="services">
        <h2>Our Services</h2>
        <div class="service-grid">
          <div class="service-item">
            <h3>Web Development</h3>
            <p>We create modern, responsive websites that deliver exceptional user experiences. Our team uses
              cutting-edge
              technologies to build scalable web applications that meet your business needs.</p>
          </div>
          <div class="service-item">
            <h3>Mobile Apps</h3>
            <p>From iOS to Android, we develop mobile applications that engage users and drive business growth. Our
              mobile
              solutions are designed with user experience at the forefront.</p>
          </div>
          <div class="service-item">
            <h3>Digital Marketing</h3>
            <p>Grow your online presence with our comprehensive digital marketing strategies. We help businesses reach
              their target audience through various digital channels.</p>
          </div>
        </div>
      </section>

      <section class="features">
        <h2>Key Features</h2>
        <ul>
          <li>Responsive Design - Works perfectly on all devices</li>
          <li>Fast Performance - Optimized for speed and efficiency</li>
          <li>SEO Friendly - Built with search engine optimization in mind</li>
          <li>Modern Technologies - Using the latest web standards</li>
          <li>User-Centric Design - Focused on user experience</li>
          <li>Scalable Architecture - Grows with your business</li>
          <li>Security First - Built with security best practices</li>
          <li>Cross-Browser Compatible - Works on all modern browsers</li>
        </ul>
      </section>

      <section class="testimonials">
        <h2>What Our Clients Say</h2>
        <div class="testimonial">
          <blockquote>
            "Working with this team has been an absolute pleasure. They delivered exactly what we needed and exceeded
            our
            expectations in every way. The attention to detail and professionalism was outstanding."
          </blockquote>
          <cite>- Sarah Johnson, CEO of TechCorp</cite>
        </div>
        <div class="testimonial">
          <blockquote>
            "The project was completed on time and within budget. The team was responsive, creative, and really
            understood
            our vision. We couldn't be happier with the results."
          </blockquote>
          <cite>- Michael Chen, Founder of StartupXYZ</cite>
        </div>
        <div class="testimonial">
          <blockquote>
            "Exceptional quality and service. They transformed our outdated website into a modern, engaging platform
            that
            our customers love. Highly recommended!"
          </blockquote>
          <cite>- Emily Rodriguez, Marketing Director</cite>
        </div>
      </section>

      <section class="blog-preview">
        <h2>Latest Blog Posts</h2>
        <article class="blog-post">
          <h3>The Future of Web Development</h3>
          <p>Explore the latest trends and technologies shaping the future of web development. From AI integration to
            progressive web apps, discover what's coming next in the digital landscape.</p>
          <p>Published on March 15, 2024</p>
        </article>
        <article class="blog-post">
          <h3>Building Better User Experiences</h3>
          <p>Learn how to create user interfaces that not only look great but also provide intuitive and engaging
            experiences for your users. We cover design principles, usability testing, and more.</p>
          <p>Published on March 10, 2024</p>
        </article>
        <article class="blog-post">
          <h3>Mobile-First Design Strategies</h3>
          <p>With mobile traffic continuing to grow, it's more important than ever to design with mobile users in mind.
            Discover strategies for creating mobile-first designs that work across all devices.</p>
          <p>Published on March 5, 2024</p>
        </article>
      </section>

      <section class="contact-info">
        <h2>Get In Touch</h2>
        <p>Ready to start your next project? We'd love to hear from you. Contact us today to discuss how we can help
          bring
          your vision to life.</p>
        <div class="contact-details">
          <p><strong>Email:</strong> hello@example.com</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Address:</strong> 123 Business Street, Suite 100, City, State 12345</p>
        </div>
      </section>

      <section class="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers who have transformed their digital presence with our help. Let's build
          something amazing together.</p>
        <button class="cta-button">Get Started Today</button>
      </section>
    </main>
  </div>
  <PageFooter />
</template>

<style scoped>
.home {
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0 auto;
}

.main-content {
  padding: 0 60px;
}

.sidebar-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px 0 0 6px;
  position: fixed;
  height: 84px;
  width: 80px;
  right: 0;
  background-color: var(--color-white);
  box-shadow: 0 0 10px 0 var(--color-gray);
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
  display: flex;
  justify-content: flex-end;
}

.sidebar-container {
  width: 400px;
  height: 100vh;
  background: var(--color-white);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.icon-with-badge {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--color-red);
  color: var(--color-white);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  border: 1px solid var(--color-white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, var(--color-gray-3));
  transition: all 0.2s ease;
  animation: badgePulse 0.3s ease-out;
}

.badge:hover {
  transform: scale(1.1);
}

.item-section {
  display: flex;
  gap: 20px;
  height: 467px;

  .item-details {
    flex: 1;
    width: 100%;
    background-color: var(--color-gray-1);
  }
}




@keyframes badgePulse {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
