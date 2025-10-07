import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('Contacts');
  });

  it('renders navigation links', () => {
    const wrapper = mount(App);
    expect(wrapper.find('.navigation').exists()).toBe(true);
    expect(wrapper.findAll('.nav-link')).toHaveLength(3);
  });
});
