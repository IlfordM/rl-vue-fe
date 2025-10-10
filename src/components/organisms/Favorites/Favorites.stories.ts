import type { Meta, StoryObj } from '@storybook/vue3';
import Favorites from './Favorites.vue';

const meta: Meta<typeof Favorites> = {
  title: 'Organisms/Favorites',
  component: Favorites,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the favorites sidebar is open',
    },
    favoritesCount: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Number of items in favorites',
    },
    onClose: { action: 'close' },
    onRemoveFavorite: { action: 'removeFavorite' },
    onAddToCart: { action: 'addToCart' },
  },
};

export default meta;
type Story = StoryObj<typeof Favorites>;

export const Default: Story = {
  args: {
    isOpen: true,
    favoritesCount: 3,
  },
};

export const Empty: Story = {
  args: {
    isOpen: true,
    favoritesCount: 0,
  },
};
