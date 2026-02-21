// app.js

import { products, categories, collections } from './data.js';
import * as store from './store.js';

// ----- Routing -----
const routes = {
  '/': 'home',
  '/shop/:category': 'shop',
  '/product/:id': 'product',
  '/collection/:name': 'collection',
  '/about': 'about',
  '/design-philosophy': 'design',
  '/contact': 'contact',
  '/enquiry': 'enquiry',
  '/enquiry-confirmation': 'enquiryConfirmation'
};

function getRoute() {
  let path = window.location.pathname;
  if (path === '/') return { name: 'home', params: {} };
  // simple matching (for demo, we'll handle only basic routes)
  if (path.startsWith('/shop/')) {
    const category = path.replace('/shop/', '');
    return { name: 'shop', params: { category } };
  }
  if (path.startsWith('/product/')) {
    const id = path.replace('/product/', '');
    return { name: 'product', params: { id: parseInt(id) } };
  }
  if (path.startsWith('/collection/')) {
    const name = path.replace('/collection/', '');
    return { name: 'collection', params: { name } };
  }
  // static pages
  if (path === '/about') return { name: 'about', params: {} };
  if (path === '/design-philosophy') return { name: 'design', params: {} };
  if (path === '/contact') return { name: 'contact', params: {} };
  if (path === '/enquiry') return { name: 'enquiry', params: {} };
  if (path === '/enquiry-confirmation') return { name: 'enquiryConfirmation', params: {} };
  return { name: 'home', params: {} }; // fallback
}

function navigateTo(path) {
  window.history.pushState({}, '', path);
  renderPage();
}

// ----- Render Functions -----
function renderHome() {
  const featured = products.slice(0, 4);
  return `
    <section class="hero">
      <div class="hero-content">
        <h1>Timeless Handcrafted Excellence</h1>
        <p>Discover museum-quality furniture and sculpture cast in solid brass...</p>
        <a href="/shop/all" class="btn" data-link>Explore Collection</a>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Pieces</h2>
          <p class="section-subtitle">Handpicked selections from our latest collections</p>
        </div>
        <div class="product-grid">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>
        <div style="text-align: center; margin-top: 40px;">
          <a href="/shop/all" class="btn btn-outline" data-link>View All Products</a>
        </div>
      </div>
    </section>
    <!-- Additional sections (collections, about) can be added similarly -->
  `;
}

function renderProductCard(product) {
  return `
    <article class="product-card" data-id="${product.id}" data-link>
      <div class="product-image-container">
        <img src="${product.images[0]}" alt="${product.alt}" class="product-image" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div style="font-size:12px; color:var(--gray-text); background:var(--gray-light); padding:2px 6px; border-radius:3px; display:inline-block;">
          Item: ${product.itemCode}
        </div>
      </div>
    </article>
  `;
}

function renderShop(category) {
  const filtered = category === 'all' ? products : products.filter(p => p.cat === category);
  const title = categories[category] || 'All Products';
  return `
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h1 class="section-title">${title}</h1>
          <p class="section-subtitle">
            ${category === 'all' ? 'Browse our complete collection...' : `Explore our curated selection of ${title.toLowerCase()}`}
          </p>
        </div>
        <div class="product-grid">
          ${filtered.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return '<p>Product not found</p>';
  // You'll need to handle image thumbnails, color swatches, quantity, and add-to-cart button.
  // For brevity, a simplified version:
  return `
    <section class="section">
      <div class="container">
        <nav class="breadcrumb">
          <a href="/" data-link>Home</a> / <a href="/shop/all" data-link>Shop</a> / <span>${product.name}</span>
        </nav>
        <div class="product-detail-grid">
          <div class="product-gallery">
            <img src="${product.images[0]}" alt="${product.alt}" class="product-main-image">
            <div class="product-thumbnails">
              ${product.images.map((img, i) => `
                <img src="${img}" alt="thumb" class="product-thumbnail" data-index="${i}">
              `).join('')}
            </div>
          </div>
          <div class="product-detail-info">
            <h1 class="product-detail-name">${product.name}</h1>
            <p class="product-subtitle">${product.subtitle}</p>
            <p class="product-designer">${product.designer}</p>
            <div style="display:flex; gap:12px; margin-bottom:20px;">
              <div style="font-size:14px; background:var(--gray-light); padding:6px 12px; border-radius:4px;">
                Item Code: <strong>${product.itemCode}</strong>
              </div>
              <div style="font-size:14px; color:var(--brass); border:1px solid var(--brass); padding:6px 12px; border-radius:4px;">
                Price on Request
              </div>
            </div>
            <div class="product-options">
              ${product.colors.length > 1 ? `
                <div class="option-group">
                  <label class="option-label">Finish Options</label>
                  <div class="swatches">
                    ${product.colors.map(color => `
                      <div class="swatch" style="background:${color};" data-color="${color}"></div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              <div class="option-group">
                <label class="option-label">Quantity</label>
                <input type="number" class="quantity-input" id="pdp-quantity" value="1" min="1">
              </div>
              <button class="btn btn-brass" id="add-to-cart-btn" style="width:100%; margin-top:24px;" data-product-id="${product.id}">Add to Cart</button>
              <div style="font-size:13px; color:var(--gray-text); text-align:center; margin-top:12px; padding:12px; background:var(--gray-ultralight); border-radius:6px;">
                <strong>Note:</strong> This item requires a custom quote. Our sales team will provide pricing after reviewing your enquiry.
              </div>
            </div>
            <!-- Specifications can be added as accordions -->
          </div>
        </div>
      </div>
    </section>
  `;
}

// Other page renders: about, design, contact, enquiry, enquiryConfirmation.
function renderAbout() { /* similar to About.jsx content */ }
function renderDesign() { /* similar to DesignPhilosophy.jsx */ }
function renderContact() { /* similar to Contact.jsx */ }
function renderEnquiry() { /* cart summary + email form */ }
function renderEnquiryConfirmation() { /* thank you page */ }

// ----- Main render function -----
function renderPage() {
  const route = getRoute();
  let html = '';
  switch (route.name) {
    case 'home': html = renderHome(); break;
    case 'shop': html = renderShop(route.params.category); break;
    case 'product': html = renderProductDetail(route.params.id); break;
    // ... other cases
    default: html = renderHome();
  }
  document.querySelector('#app').innerHTML = html;
  attachPageEvents(); // attach events specific to the page (e.g., add to cart)
}

// ----- Event Attachment -----
function attachPageEvents() {
  // Handle "Add to Cart" button
  document.querySelectorAll('#add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.productId);
      const product = products.find(p => p.id === productId);
      const quantity = parseInt(document.querySelector('#pdp-quantity')?.value || 1);
      const selectedColor = document.querySelector('.swatch.selected')?.style.background || product.colors[0];
      store.addToCart(product, quantity, selectedColor);
      updateCartUI();
    });
  });

  // Swatch selection
  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach(s => s.classList.remove('selected'));
      swatch.classList.add('selected');
    });
  });

  // Thumbnail click
  document.querySelectorAll('.product-thumbnail').forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      const main = document.querySelector('.product-main-image');
      main.src = thumb.src;
    });
  });

  // Any other dynamic interactions
}

// ----- Cart Modal Rendering and UI Updates -----
function renderCartModal() {
  const isOpen = store.isCartOpen() ? 'active' : '';
  const cart = store.getCart();
  return `
    <div class="cart-overlay ${isOpen}" id="cart-overlay"></div>
    <div class="cart-modal ${isOpen}" id="cart-modal">
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button class="cart-close" id="cart-close">×</button>
      </div>
      <div class="cart-body" id="cart-items">
        ${cart.length === 0 ? '<p style="text-align:center; color:#999; margin-top:20px;">Your cart is empty</p>' : ''}
        ${cart.map((item, index) => `
          <div class="cart-item">
            <div style="width:60px; height:60px; background:#f4f4f4; border-radius:var(--border-radius);"></div>
            <div style="flex:1;">
              <div style="font-weight:bold; font-size:13px;">${item.name}</div>
              <div style="font-size:12px; color:var(--gray-text);">Item: ${item.itemCode}<br> Qty: ${item.qty}</div>
              <button class="remove-item" data-index="${index}" style="font-size:11px; text-decoration:underline; cursor:pointer; color:#666; background:none; border:none; padding:4px 0; margin-top:4px;">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
      ${cart.length > 0 ? `
        <div class="cart-footer">
          <div style="font-size:14px; color:var(--gray-text); text-align:center; padding:16px; background:var(--gray-light); border-radius:6px; margin-bottom:16px;">
            <strong>Note:</strong> All prices are available upon request. Submit your enquiry for a detailed quote.
          </div>
          <button class="btn btn-brass" id="proceed-enquiry" style="width:100%;">Submit Enquiry</button>
        </div>
      ` : ''}
    </div>
  `;
}

function updateCartUI() {
  document.querySelector('#cart-modal-container').innerHTML = renderCartModal();
  document.querySelector('#cart-count').textContent = store.getCartCount();
  attachCartEvents();
}

function attachCartEvents() {
  document.querySelector('#cart-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.toggleCart();
    updateCartUI();
  });
  document.querySelector('#cart-close')?.addEventListener('click', () => {
    store.toggleCart();
    updateCartUI();
  });
  document.querySelector('#cart-overlay')?.addEventListener('click', () => {
    store.toggleCart();
    updateCartUI();
  });
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (window.confirm('Are you sure?')) {
        store.removeFromCart(index);
        updateCartUI();
      }
    });
  });
  document.querySelector('#proceed-enquiry')?.addEventListener('click', () => {
    if (store.getCart().length === 0) {
      alert('Cart is empty');
      return;
    }
    store.toggleCart();
    navigateTo('/enquiry');
  });
}

// ----- Initialize -----
window.addEventListener('popstate', renderPage);
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  renderPage();
  // Insert cart modal container
  const cartContainer = document.createElement('div');
  cartContainer.id = 'cart-modal-container';
  document.body.appendChild(cartContainer);
  updateCartUI();

  // Global navigation: handle all clicks on [data-link]
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (link && link.getAttribute('href')) {
      e.preventDefault();
      navigateTo(link.getAttribute('href'));
    }
  });

  // Subscribe to store changes
  store.subscribe(() => {
    updateCartUI();
  });
});
