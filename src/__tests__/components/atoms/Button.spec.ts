import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '@/components/atoms/Button/Button.vue';

describe('Button Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.classes()).toContain('btn');
    expect(wrapper.classes()).toContain('btn-primary');
    expect(wrapper.classes()).toContain('btn-md');
  });

  it('applies correct variant classes', () => {
    const variants = ['primary', 'secondary', 'ghost', 'selected'] as const;

    variants.forEach(variant => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: 'Test' },
      });
      expect(wrapper.classes()).toContain(`btn-${variant}`);
    });
  });

  it('applies correct size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: 'Test' },
      });
      expect(wrapper.classes()).toContain(`btn-${size}`);
    });
  });

  it('handles disabled state correctly', () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.element.style.opacity).toBe('0.5');
    expect(wrapper.element.style.cursor).toBe('not-allowed');
  });

  it('handles loading state correctly', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading' },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.element.style.opacity).toBe('0.5');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')?.[0]).toBeDefined();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Loading' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('applies custom class', () => {
    const wrapper = mount(Button, {
      props: { class: 'custom-class' },
      slots: { default: 'Test' },
    });

    expect(wrapper.classes()).toContain('custom-class');
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const wrapper = mount(Button, {
      props: { style: customStyle },
      slots: { default: 'Test' },
    });

    expect(wrapper.element.style.backgroundColor).toBe('red');
  });

  it('renders slot content', () => {
    const slotContent = 'Custom Button Text';
    const wrapper = mount(Button, {
      slots: { default: slotContent },
    });

    expect(wrapper.text()).toBe(slotContent);
  });
});
