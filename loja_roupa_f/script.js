const API = '/api';
const getToken = () => localStorage.getItem('floratta_token');
const getUser = () => {
  try { return JSON.parse(localStorage.getItem('floratta_user') || 'null'); }
  catch(e) { return null; }
};

const fmt = p => 'R$ ' + parseFloat(p).toFixed(2).replace('.', ',');

function notify(msg, type = 'success') {
  const n = document.createElement('div');
  n.className = 'notification ' + type;
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

function productCard(p) {
  const price = p.sale_price || p.price;
  const disc = p.sale_price && p.sale_price < p.price;
  return '<div class="product-card">' +
    '<div class="product-image">' +
      '<img src="' + (p.main_image || '') + '" alt="' + p.name + '" onerror="this.style.display=\'none\'">' +
      '<div class="product-badges">' +
        (disc ? '<span class="product-badge sale">Promocao</span>' : '') +
        (p.is_new && !disc ? '<span class="product-badge new">Novo</span>' : '') +
      '</div>' +
      '<button class="product-favorite" onclick="event.stopPropagation();toggleFav(' + p.id + ',this)">+</button>' +
    '</div>' +
    '<div class="product-info">' +
      '<div class="product-category">' + (p.category_name || '') + '</div>' +
      '<h3 class="product-name">' + p.name + '</h3>' +
      '<div class="product-price">' +
        '<span class="price-current">' + fmt(price) + '</span>' +
        (disc ? '<span class="price-original">' + fmt(p.price) + '</span>' : '') +
      '</div>' +
    '</div>' +
    '<a href="/produto/' + p.id + '" class="product-link"></a>' +
  '</div>';
}

async function loadList(containerId, endpoint) {
  const c = document.getElementById(containerId);
  if (!c) return;
  try {
    const r = await fetch(API + '/products/' + endpoint);
    const d = await r.json();
    c.innerHTML = d.length ? d.map(productCard).join('') : '<div class="empty-state"><p>Nenhum produto encontrado</p></div>';
  } catch(e) {
    c.innerHTML = '<div class="empty-state"><p>Erro ao carregar</p></div>';
  }
}

async function loadAll() {
  const c = document.getElementById('all-products');
  if (!c) return;
  const params = new URLSearchParams();
  const size = document.querySelector('.size-filter-btn.active');
  if (size) params.set('size', size.dataset.size);
  const color = document.querySelector('.color-filter-btn.active');
  if (color) params.set('color', color.dataset.color);
  const minP = document.getElementById('min-price');
  const maxP = document.getElementById('max-price');
  if (minP && minP.value) params.set('min_price', minP.value);
  if (maxP && maxP.value) params.set('max_price', maxP.value);
  const occ = document.querySelector('.filter-btn[data-occasion].active');
  if (occ) params.set('occasion', occ.dataset.occasion);
  const type = document.querySelector('.filter-btn[data-type].active');
  if (type) params.set('type', type.dataset.type);
  const category = document.querySelector('.filter-btn[data-category].active');
  if (category) params.set('category', category.dataset.category);
  try {
    const r = await fetch(API + '/products?' + params.toString());
    const d = await r.json();
    c.innerHTML = d.products.length ? d.products.map(productCard).join('') : '<div class="empty-state"><p>Nenhum produto encontrado com esses filtros</p></div>';
  } catch(e) {
    c.innerHTML = '<div class="empty-state"><p>Erro ao carregar</p></div>';
  }
}

function applyFilters() { loadAll(); }
function clearFilters() {
  document.querySelectorAll('.active').forEach(b => b.classList.remove('active'));
  const minP = document.getElementById('min-price');
  const maxP = document.getElementById('max-price');
  if (minP) minP.value = '';
  if (maxP) maxP.value = '';
  loadAll();
}

function filterCat(cat) {
  const el = document.getElementById('produtos');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('.filter-btn[data-category]').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector('.filter-btn[data-category="' + cat + '"]');
  if (btn) btn.classList.add('active');
  loadAll();
}

async function toggleFav(id, btn) {
  const token = getToken();
  if (!token) { notify('Faca login para favoritar', 'info'); setTimeout(() => window.location.href = '/login', 1000); return; }
  try {
    const r = await fetch(API + '/favorites/' + id, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const d = await r.json();
    if (btn) {
      btn.classList.toggle('active');
      btn.textContent = d.added ? 'x' : '+';
    }
    notify(d.added ? 'Adicionado aos favoritos' : 'Removido dos favoritos');
  } catch(e) { notify('Erro', 'error'); }
}

async function updateCartCount() {
  const token = getToken();
  if (!token) return;
  try {
    const r = await fetch(API + '/cart', { headers: { 'Authorization': 'Bearer ' + token } });
    const d = await r.json();
    const b = document.getElementById('cart-count');
    if (b) b.textContent = d.count;
  } catch(e) {}
}

// Hero Carousel
let currentSlide = 0;
let slides = [];
let dots = [];

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  currentSlide = index;
}

function changeSlide(direction) {
  if (!slides.length) return;
  const newIndex = (currentSlide + direction + slides.length) % slides.length;
  showSlide(newIndex);
}

function goToSlide(index) { showSlide(index); }

async function loadBanners() {
  try {
    const r = await fetch(API + '/banners');
    const banners = await r.json();
    const container = document.getElementById('carousel-container');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!container || !banners.length) return;
    slides = [];
    dots = [];
    container.innerHTML = banners.map((b, i) =>
      '<div class="carousel-slide ' + (i === 0 ? 'active' : '') + '" style="background-image: url(\'' + b.image_url + '\')">' +
        '<div class="carousel-content">' +
          '<h1>' + (b.title || '') + '</h1>' +
          '<p>' + (b.subtitle || '') + '</p>' +
          (b.link ? '<a href="' + b.link + '" class="btn btn-primary">Ver Colecao</a>' : '') +
        '</div>' +
      '</div>'
    ).join('');
    dotsContainer.innerHTML = banners.map((_, i) =>
      '<span class="carousel-dot ' + (i === 0 ? 'active' : '') + '" onclick="goToSlide(' + i + ')"></span>'
    ).join('');
    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.carousel-dot');
    setInterval(() => changeSlide(1), 5000);
  } catch(e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search-input');
  if (search) {
    let t;
    search.addEventListener('input', e => {
      clearTimeout(t);
      t = setTimeout(() => {
        const q = e.target.value.trim();
        if (q.length >= 2) {
          fetch(API + '/products?search=' + encodeURIComponent(q))
            .then(r => r.json())
            .then(d => {
              const c = document.getElementById('all-products');
              if (c) c.innerHTML = d.products.length ? d.products.map(productCard).join('') : '<div class="empty-state"><p>Nenhum resultado</p></div>';
            });
        }
      }, 500);
    });
  }

  document.querySelectorAll('.size-filter-btn, .filter-btn').forEach(b =>
    b.addEventListener('click', function() { this.classList.toggle('active'); })
  );
  document.querySelectorAll('.color-filter-btn').forEach(b =>
    b.addEventListener('click', function() {
      document.querySelectorAll('.color-filter-btn').forEach(x => x.classList.remove('active'));
      this.classList.add('active');
    })
  );

  if (document.getElementById('carousel-container')) loadBanners();
  if (document.getElementById('featured-products')) loadList('featured-products', 'featured');
  if (document.getElementById('new-products')) loadList('new-products', 'new');
  if (document.getElementById('promotion-products')) loadList('promotion-products', 'promotions');
  if (document.getElementById('all-products')) loadAll();

  updateCartCount();
});