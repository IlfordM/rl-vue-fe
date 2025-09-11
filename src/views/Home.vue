<script setup lang="ts">
import PageHeader from '@/components/organisms/Header/Header.vue';

defineOptions({
  name: "HomePage"
})
</script>


<template>
  <div class="home">
    <PageHeader />
    <section class="hero">
      <h1>Welcome to Our Website</h1>
      <p>Discover amazing content and explore everything we have to offer.</p>
    </section>

    <section class="about">
      <h2>About Us</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.</p>
      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    </section>

    <section class="services">
      <h2>Our Services</h2>
      <div class="service-grid">
        <div class="service-item">
          <h3>Web Development</h3>
          <p>We create modern, responsive websites that deliver exceptional user experiences. Our team uses cutting-edge
            technologies to build scalable web applications that meet your business needs.</p>
        </div>
        <div class="service-item">
          <h3>Mobile Apps</h3>
          <p>From iOS to Android, we develop mobile applications that engage users and drive business growth. Our mobile
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
          "Working with this team has been an absolute pleasure. They delivered exactly what we needed and exceeded our
          expectations in every way. The attention to detail and professionalism was outstanding."
        </blockquote>
        <cite>- Sarah Johnson, CEO of TechCorp</cite>
      </div>
      <div class="testimonial">
        <blockquote>
          "The project was completed on time and within budget. The team was responsive, creative, and really understood
          our vision. We couldn't be happier with the results."
        </blockquote>
        <cite>- Michael Chen, Founder of StartupXYZ</cite>
      </div>
      <div class="testimonial">
        <blockquote>
          "Exceptional quality and service. They transformed our outdated website into a modern, engaging platform that
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
      <p>Ready to start your next project? We'd love to hear from you. Contact us today to discuss how we can help bring
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
  </div>
</template>


<style scoped>
.home {
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0 auto;
}
</style>
