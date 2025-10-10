import { ref, watch } from 'vue';
import type { CartItem, FavoriteItem } from '@/types/storage';
import type { IProduct } from '@/components/organisms/Product/Product.vue';

const cartItems = ref<CartItem[]>([]);
const favorites = ref<FavoriteItem[]>([]);

const loadFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  const savedFavorites = localStorage.getItem('favorites');

  if (savedCart) cartItems.value = JSON.parse(savedCart);
  if (savedFavorites) favorites.value = JSON.parse(savedFavorites);
};

const saveToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

loadFromStorage();

watch(cartItems, saveToStorage, { deep: true });
watch(favorites, saveToStorage, { deep: true });

export const useCart = () => {
  const addToCart = (product: IProduct) => {
    const existingItem = cartItems.value.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem: CartItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        addedAt: new Date(),
      };
      cartItems.value.push(cartItem);
    }
  };

  const removeFromCart = (productId: string) => {
    cartItems.value = cartItems.value.filter(item => item.productId !== productId);
  };

  const isInCart = (productId: string) => {
    return cartItems.value.some(item => item.productId === productId);
  };

  const addToFavorites = (product: IProduct) => {
    const favoriteItem: FavoriteItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      addedAt: new Date(),
    };
    favorites.value.push(favoriteItem);
  };

  const removeFromFavorites = (productId: string) => {
    favorites.value = favorites.value.filter(item => item.productId !== productId);
  };

  const isInFavorites = (productId: string) => {
    return favorites.value.some(item => item.productId === productId);
  };

  return {
    cartItems,
    favorites,
    loadFromStorage,
    saveToStorage,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    addToCart,
    removeFromCart,
    isInCart,
  };
};
