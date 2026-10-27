let cart = [];
const cartCountEl = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const grandTotalEl = document.getElementById('grandTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const confirmModal = document.getElementById('confirmModal');
const checkoutForm = document.getElementById('checkoutForm');
const closeConfirm = document.getElementById('closeConfirm');
const closeBtn = document.querySelector('.close');

// Add to Cart Buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }
    updateCart();
  });
});

function updateCart() {
  cartCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty — start shopping below! 🛍️</p>';
    subtotalEl.textContent = '₱0';
    shippingEl.textContent = '₱0';
    grandTotalEl.textContent = '₱0';
    return;
  }
  
  let html = '';
  let subtotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    html += `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0.8rem 0; border-bottom:1px solid rgba(255,255,255,0.1);">
        <div>
          <strong>${item.name}</strong><br>
          ₱${item.price.toLocaleString()} × ${item.qty}
        </div>
        <div style="text-align:right;">
          ₱${itemTotal.toLocaleString()}<br>
          <button onclick="removeItem('${item.id}')" style="background:none; border:none; color:var(--sand); cursor:pointer; font-size:0.8rem;">Remove</button>
        </div>
      </div>
    `;
  });
  
  cartItemsEl.innerHTML = html;
  const shipping = subtotal >= 2000 ? 0 : 150;
  subtotalEl.textContent = `₱${subtotal.toLocaleString()}`;
  shippingEl.textContent = shipping === 0 ? 'FREE' : `₱${shipping}`;
  grandTotalEl.textContent = `₱${(subtotal + shipping).toLocaleString()}`;
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Checkout Flow
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  checkoutModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  checkoutModal.style.display = 'none';
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkoutModal.style.display = 'none';
  confirmModal.style.display = 'flex';
  cart = [];
  updateCart();
});

closeConfirm.addEventListener('click', () => {
  confirmModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === checkoutModal) checkoutModal.style.display = 'none';
  if (e.target === confirmModal) confirmModal.style.display = 'none';
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
});