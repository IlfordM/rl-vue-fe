import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contacts from '../views/Contacts.vue';
// Remove: import Profile from '../views/Profile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, isEmailVerified, loading } = useAuth();

  // Wait for auth state to be determined
  while (loading.value) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/');
  } else if (to.meta.requiresAuth && isAuthenticated.value && !isEmailVerified.value) {
    // Redirect to email verification page or show message
    next('/');
  } else {
    next();
  }
});

export default router;
