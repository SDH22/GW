// store.js

const STORE = {
  cart: [],
  isCartOpen: false,
  listeners: []
};

// Notify all subscribers
function notify() {
  STORE.listeners.forEach(fn => fn());
}

// Subscribe to store changes
export function subscribe(fn) {
  STORE.listeners.push(fn);
  return () => {
    STORE.listeners = STORE.listeners.filter(l => l !== fn);
  };
}

// Get current cart
export function getCart() {
  return STORE.cart;
}

// Get cart item count
export function getCartCount() {
  return STORE.cart.reduce((sum, item) => sum + item.qty, 0);
}

// Add item to cart
export function addToCart(product, quantity = 1, color = 'Default') {
  const existing = STORE.cart.find(item => item.id === product.id && item.color === color);
  if (existing) {
    existing.qty += quantity;
  } else {
    STORE.cart.push({
      id: product.id,
      name: product.name,
      itemCode: product.itemCode,
      alt: product.alt,
      qty: quantity,
      color
    });
  }
  STORE.isCartOpen = true;
  notify();
}

// Remove item at index
export function removeFromCart(index) {
  STORE.cart.splice(index, 1);
  notify();
}

// Clear cart
export function clearCart() {
  STORE.cart = [];
  notify();
}

// Toggle cart modal
export function toggleCart() {
  STORE.isCartOpen = !STORE.isCartOpen;
  notify();
}

// Get cart open state
export function isCartOpen() {
  return STORE.isCartOpen;
}
