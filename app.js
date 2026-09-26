/* ==================== VOGUE STUDIO LANDING PAGE JAVASCRIPT ==================== */

class VogueLandingApp {
  constructor() {
    this.cartKey = 'vogue_cart_v1';
    this.wishlistKey = 'vogue_wishlist_v1';
    this.cart = JSON.parse(localStorage.getItem(this.cartKey)) || [];
    this.wishlist = JSON.parse(localStorage.getItem(this.wishlistKey)) || [];
    this.appliedDiscount = 0;
    this.selectedSize = 'M';

    this.products = [
      {
        id: 'P-101',
        name: 'Royal Velvet 3-Pc Embroidered Suit',
        category: 'Pret 3-Piece',
        fabric: 'Micro Velvet 9000',
        price: 14500,
        oldPrice: 16500,
        badge: 'HOT SELLER',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop',
        description: 'Opulent deep royal navy velvet kameez with intricate gold tilla & zari embroidery on neckline, organza embroidered dupatta, and raw silk trousers.'
      },
      {
        id: 'P-102',
        name: 'Summer Breeze Digital Print Lawn',
        category: 'Unstitched Lawn',
        fabric: 'Swiss Lawn',
        price: 5800,
        oldPrice: null,
        badge: 'NEW',
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&auto=format&fit=crop',
        description: '3-Piece unstitched premium Swiss lawn featuring digital floral motifs, embroidered schiffli border, and pure digital chiffon dupatta.'
      },
      {
        id: 'P-103',
        name: 'Mirror Work Organza Dupatta Kurti',
        category: 'Embroidered Kurti',
        fabric: 'Organza / Silk',
        price: 7200,
        oldPrice: 8500,
        badge: 'POPULAR',
        image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=600&auto=format&fit=crop',
        description: 'Elegantly hand-embroidered kurti with traditional mirror work details along sleeves and hemline, paired with contrasting crushed dupatta.'
      },
      {
        id: 'P-104',
        name: 'Classic White Raw Silk Mens Kurta Set',
        category: 'Mens Wear',
        fabric: 'Pure Raw Silk',
        price: 8900,
        oldPrice: 10200,
        badge: 'BESTSELLER',
        image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop',
        description: 'Bespoke tailored white raw silk mens kurta with subtle threadwork collar, paired with matching straight trousers.'
      },
      {
        id: 'P-105',
        name: 'Chiffon Zari Work Wedding Wear',
        category: 'Pret 3-Piece',
        fabric: 'Pure Chiffon',
        price: 22500,
        oldPrice: 25000,
        badge: 'BRIDAL COUTURE',
        image: 'https://images.unsplash.com/photo-1583391733975-d28f898398e0?w=600&auto=format&fit=crop',
        description: 'Festive red chiffon maxi with heavy zardozi, sequins, and stone handwork. Includes embroidered dupatta with scalloped borders.'
      },
      {
        id: 'P-106',
        name: 'Pastel Mint Lawn 3-Pc Unstitched',
        category: 'Unstitched Lawn',
        fabric: 'Lawn / Silk Dupatta',
        price: 6400,
        oldPrice: null,
        badge: 'SUMMER 2026',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop',
        description: 'Pastel mint green 3-piece unstitched lawn set with delicate floral embroidery patches and a tissue silk dupatta.'
      },
      {
        id: 'P-107',
        name: 'Embroidered Velvet Shawl & Kurti',
        category: 'Embroidered Kurti',
        fabric: 'Velvet',
        price: 18000,
        oldPrice: 20500,
        badge: 'LIMITED',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop',
        description: 'Heavy maroon velvet shawl with antique gold embroidery borders, accompanied by a minimalist straight velvet kurti.'
      },
      {
        id: 'P-108',
        name: 'Royal Gold Festive Sherwani',
        category: 'Mens Wear',
        fabric: 'Brocade / Jamawar',
        price: 35000,
        oldPrice: 38000,
        badge: 'LUXURY GROOM',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop',
        description: 'Hand-crafted gold jamawar sherwani with royal brass buttons and embroidered mandarin collar for grand wedding receptions.'
      }
    ];

    this.initEventListeners();
    this.renderProducts('ALL');
    this.updateCartUI();
  }

  initEventListeners() {
    // Cart Drawer Toggle
    const cartBtn = document.getElementById('cart-drawer-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawerOverlay = document.getElementById('cart-drawer-overlay');

    if (cartBtn && drawerOverlay) {
      cartBtn.addEventListener('click', () => drawerOverlay.classList.add('show'));
    }
    if (closeDrawerBtn && drawerOverlay) {
      closeDrawerBtn.addEventListener('click', () => drawerOverlay.classList.remove('show'));
    }
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) drawerOverlay.classList.remove('show');
      });
    }

    // Search Overlay Toggle
    const searchBtn = document.getElementById('search-btn');
    const closeSearch = document.getElementById('close-search');
    const searchOverlay = document.getElementById('search-overlay');

    if (searchBtn && searchOverlay) {
      searchBtn.addEventListener('click', () => searchOverlay.classList.add('show'));
    }
    if (closeSearch && searchOverlay) {
      closeSearch.addEventListener('click', () => searchOverlay.classList.remove('show'));
    }

    // Wishlist Toggle
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        this.showToast('❤️ Wishlist saved! (2 items saved)');
      });
    }
  }

  /* Render Products Grid */
  renderProducts(categoryFilter = 'ALL') {
    const container = document.getElementById('products-grid-container');
    if (!container) return;

    const list = categoryFilter === 'ALL' ? this.products : this.products.filter(p => p.category === categoryFilter);

    container.innerHTML = list.map(p => `
      <div class="product-card">
        <div class="product-img-wrapper">
          ${p.badge ? `<span class="badge-tag">${p.badge}</span>` : ''}
          <img src="${p.image}" class="product-img" alt="${p.name}">
          <button class="quick-view-overlay-btn" onclick="landingApp.openQuickView('${p.id}')">
            <i class="fa-solid fa-eye"></i> QUICK VIEW
          </button>
        </div>
        <div class="product-info">
          <span class="product-cat">${p.category}</span>
          <h3 class="product-title" title="${p.name}">${p.name}</h3>
          <p class="small text-muted">${p.fabric}</p>
          <div class="product-price-row">
            <div>
              <span class="price-tag">PKR ${p.price.toLocaleString()}</span>
              ${p.oldPrice ? `<small class="text-muted text-through" style="text-decoration:line-through; margin-left:6px;">PKR ${p.oldPrice.toLocaleString()}</small>` : ''}
            </div>
            <button class="add-bag-btn" onclick="landingApp.addToCart('${p.id}')" title="Add to Bag">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterProducts(cat, btnEl) {
    document.querySelectorAll('.product-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    this.renderProducts(cat);
  }

  filterByCategory(cat) {
    const section = document.getElementById('products');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    const targetTab = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.textContent.trim().includes(cat) || (cat === 'Pret 3-Piece' && b.textContent.includes('Pret')));
    this.filterProducts(cat, targetTab);
  }

  /* Quick View Modal */
  openQuickView(prodId) {
    const p = this.products.find(item => item.id === prodId);
    if (!p) return;

    this.selectedSize = 'M';
    const content = document.getElementById('quick-view-content');
    if (content) {
      content.innerHTML = `
        <div>
          <img src="${p.image}" class="qv-img" alt="${p.name}">
        </div>
        <div>
          <span class="product-cat">${p.category}</span>
          <h2 style="font-family:var(--font-serif); margin:6px 0;">${p.name}</h2>
          <div class="price-tag text-lg mb-md">PKR ${p.price.toLocaleString()}</div>
          <p class="text-sub small mb-md">${p.description}</p>
          <p class="small text-muted"><strong>Fabric:</strong> ${p.fabric}</p>
          
          <div class="my-md">
            <label class="small font-bold">Select Size:</label>
            <div class="size-selector">
              <button class="size-btn" onclick="landingApp.selectSize('S', this)">S</button>
              <button class="size-btn active" onclick="landingApp.selectSize('M', this)">M</button>
              <button class="size-btn" onclick="landingApp.selectSize('L', this)">L</button>
              <button class="size-btn" onclick="landingApp.selectSize('XL', this)">XL</button>
            </div>
          </div>

          <button class="btn btn-gold btn-block btn-lg mt-md" onclick="landingApp.addToCart('${p.id}', '${this.selectedSize}')">
            <i class="fa-solid fa-bag-shopping"></i> ADD TO SHOPPING BAG
          </button>
        </div>
      `;
    }
    this.openModal('quick-view-modal');
  }

  selectSize(size, btnEl) {
    this.selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  }

  /* Cart Operations */
  addToCart(prodId, size = 'M') {
    const prod = this.products.find(p => p.id === prodId);
    if (!prod) return;

    const existing = this.cart.find(item => item.id === prodId && item.size === size);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        size: size,
        qty: 1
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showToast(`Added "${prod.name} (${size})" to bag!`);
    this.closeModal('quick-view-modal');

    // Auto open drawer
    document.getElementById('cart-drawer-overlay')?.classList.add('show');
  }

  updateCartQty(idx, delta) {
    this.cart[idx].qty += delta;
    if (this.cart[idx].qty <= 0) {
      this.cart.splice(idx, 1);
    }
    this.saveCart();
    this.updateCartUI();
  }

  saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  updateCartUI() {
    const countBadge = document.getElementById('cart-count');
    const drawerCount = document.getElementById('drawer-cart-count');
    const itemsContainer = document.getElementById('cart-items-container');

    const totalCount = this.cart.reduce((acc, item) => acc + item.qty, 0);
    if (countBadge) countBadge.textContent = totalCount;
    if (drawerCount) drawerCount.textContent = totalCount;

    if (!itemsContainer) return;

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="text-center py-lg text-muted">
          <i class="fa-solid fa-bag-shopping" style="font-size:3rem; margin-bottom:12px;"></i>
          <p>Your shopping bag is empty.</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = this.cart.map((item, idx) => `
        <div class="drawer-item">
          <img src="${item.image}" class="drawer-item-img" alt="${item.name}">
          <div class="drawer-item-details">
            <div class="drawer-item-name">${item.name}</div>
            <div class="drawer-item-size">Size: ${item.size}</div>
            <div class="drawer-item-price">PKR ${item.price.toLocaleString()}</div>
            <div class="flex-between mt-xs">
              <div class="cart-qty-ctrl">
                <button class="cart-qty-btn" onclick="landingApp.updateCartQty(${idx}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="cart-qty-btn" onclick="landingApp.updateCartQty(${idx}, 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Totals Calculation
    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmt = Math.round(subtotal * this.appliedDiscount);
    const grandTotal = subtotal - discountAmt;

    document.getElementById('drawer-subtotal').textContent = `PKR ${subtotal.toLocaleString()}`;
    document.getElementById('drawer-discount').textContent = `PKR ${discountAmt.toLocaleString()}`;
    document.getElementById('drawer-total').textContent = `PKR ${grandTotal.toLocaleString()}`;

    // Free Shipping Progress
    const threshold = 10000;
    const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
    const fill = document.getElementById('shipping-fill');
    const msg = document.getElementById('shipping-msg');

    if (fill) fill.style.width = `${progress}%`;
    if (msg) {
      if (subtotal >= threshold) {
        msg.innerHTML = `🎉 Congratulations! You unlocked <strong>FREE Express Shipping</strong>!`;
      } else {
        const remaining = threshold - subtotal;
        msg.innerHTML = `Add <strong>PKR ${remaining.toLocaleString()}</strong> more for FREE Express Shipping!`;
      }
    }
  }

  applyPromo() {
    const code = document.getElementById('promo-input')?.value.trim().toUpperCase();
    if (code === 'VOGUE10') {
      this.appliedDiscount = 0.10; // 10% OFF
      this.showToast('🎉 Promo code VOGUE10 applied! 10% discount subtracted.');
    } else {
      alert('Invalid promo code! Try VOGUE10 for 10% off.');
    }
    this.updateCartUI();
  }

  openCheckoutModal() {
    if (this.cart.length === 0) {
      alert('Your shopping bag is empty!');
      return;
    }
    document.getElementById('cart-drawer-overlay')?.classList.remove('show');

    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmt = Math.round(subtotal * this.appliedDiscount);
    const grandTotal = subtotal - discountAmt;

    document.getElementById('chk-payable-amount').textContent = `PKR ${grandTotal.toLocaleString()}`;
    this.openModal('checkout-modal');
  }

  completeOrder(e) {
    e.preventDefault();
    const name = document.getElementById('chk-name').value;
    const phone = document.getElementById('chk-phone').value;
    const city = document.getElementById('chk-city').value;
    const address = document.getElementById('chk-address').value;

    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmt = Math.round(subtotal * this.appliedDiscount);
    const grandTotal = subtotal - discountAmt;

    const orderObj = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName: name,
      phone: phone,
      city: city,
      channel: 'Website',
      items: this.cart.map(i => `${i.name} (${i.size}) x${i.qty}`).join(', '),
      totalAmount: grandTotal,
      paymentStatus: 'COD (Pending)',
      orderStatus: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    // Save to Vogue Brand Management System local storage so management ERP receives order!
    const erpSaved = localStorage.getItem('vogue_studio_data_v1');
    if (erpSaved) {
      const erpData = JSON.parse(erpSaved);
      erpData.orders.unshift(orderObj);
      localStorage.setItem('vogue_studio_data_v1', JSON.stringify(erpData));
    }

    this.cart = [];
    this.saveCart();
    this.updateCartUI();
    this.closeModal('checkout-modal');

    alert(`🎉 THANK YOU ${name.toUpperCase()}!\nYour order #${orderObj.id} has been placed successfully!\n\nOur team will confirm your order via WhatsApp (${phone}) and dispatch via Express Courier to ${city}.`);
  }

  /* Search Overlay Filtering */
  searchProducts() {
    const q = document.getElementById('site-search-input')?.value.toLowerCase() || '';
    const container = document.getElementById('search-results-container');
    if (!container) return;

    if (q.length < 2) {
      container.innerHTML = `<p class="text-muted text-center py-md">Type at least 2 letters to search...</p>`;
      return;
    }

    const matches = this.products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q));

    if (matches.length === 0) {
      container.innerHTML = `<p class="text-muted text-center py-md">No luxury apparel matching "${q}".</p>`;
    } else {
      container.innerHTML = `
        <div class="products-grid mt-md">
          ${matches.map(p => `
            <div class="product-card" onclick="landingApp.openQuickView('${p.id}'); document.getElementById('search-overlay').classList.remove('show');">
              <div class="product-img-wrapper" style="height:200px;">
                <img src="${p.image}" class="product-img" alt="${p.name}">
              </div>
              <div class="product-info">
                <span class="product-cat">${p.category}</span>
                <h4 class="product-title">${p.name}</h4>
                <span class="price-tag">PKR ${p.price.toLocaleString()}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  /* Toast Notification */
  showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  /* Modal Utilities */
  openModal(modalId) { document.getElementById(modalId)?.classList.add('show'); }
  closeModal(modalId) { document.getElementById(modalId)?.classList.remove('show'); }
}

// Instantiate Landing App
let landingApp;
document.addEventListener('DOMContentLoaded', () => {
  landingApp = new VogueLandingApp();
});
