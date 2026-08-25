const express = require('express');
const Database = require('better-sqlite3');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const seedData = require('./database.json');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'floratta_secret_key_2026_production';
const MASTER_PASSWORD = 'floratta2026'; // Senha mestra para criar admin

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads', { recursive: true });
if (!fs.existsSync('uploads/products')) fs.mkdirSync('uploads/products', { recursive: true });
if (!fs.existsSync('uploads/banners')) fs.mkdirSync('uploads/banners', { recursive: true });

const db = new Database('floratta.db');
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    phone TEXT,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id INTEGER,
    type TEXT,
    price REAL NOT NULL,
    sale_price REAL,
    description TEXT,
    composition TEXT,
    occasion TEXT,
    status TEXT DEFAULT 'active',
    is_featured INTEGER DEFAULT 0,
    is_new INTEGER DEFAULT 1,
    is_promotion INTEGER DEFAULT 0,
    quantity INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS product_sizes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    size TEXT,
    quantity INTEGER DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS product_colors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    color_name TEXT,
    color_hex TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    image_url TEXT,
    is_main INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS product_measurements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    size TEXT,
    bust REAL,
    waist REAL,
    hips REAL,
    length REAL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    subtitle TEXT,
    image_url TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    size TEXT,
    color TEXT,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    order_number TEXT UNIQUE,
    status TEXT DEFAULT 'pending',
    total REAL,
    address TEXT,
    payment_method TEXT DEFAULT 'credit_card',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    size TEXT,
    color TEXT,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

seedData.categories.forEach(c => {
  try { db.prepare('INSERT OR IGNORE INTO categories (name, slug) VALUES (?, ?)').run(c.name, c.slug); } catch(e){}
});

const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get(seedData.admin.email);
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync(seedData.admin.password, 10);
  db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(
    seedData.admin.name, seedData.admin.email, hashedPassword, 'admin'
  );
  console.log('Admin padrão criado: ' + seedData.admin.email + ' / ' + seedData.admin.password);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = req.body && req.body.dest === 'banner' ? 'uploads/banners/' : 'uploads/products/';
    cb(null, dest);
  },
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname))
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(/jpeg|jpg|png|gif|webp/.test(file.mimetype) ? null : new Error('Apenas imagens'), true)
});

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Nao autorizado' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch(e) { res.status(403).json({ error: 'Token invalido' }); }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Acesso restrito a administradores' });
  next();
};

// AUTH
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Email ou senha incorretos' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, master_password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Campos obrigatorios' });
  if (db.prepare('SELECT id FROM users WHERE email = ?').get(email)) {
    return res.status(400).json({ error: 'Email ja cadastrado' });
  }
  
  // Verificar se é admin pela senha mestra
  let role = 'customer';
  if (master_password === MASTER_PASSWORD) {
    role = 'admin';
  }
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)').run(
    name, email, hashedPassword, phone || null, role
  );
  const token = jwt.sign({ id: result.lastInsertRowid, email, role: role }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({
    token,
    user: { id: result.lastInsertRowid, name, email, role: role }
  });
});

// Rota para promover usuário a admin (apenas para admins existentes)
app.put('/api/admin/users/:id/promote', auth, requireAdmin, (req, res) => {
  db.prepare('UPDATE users SET role = ? WHERE id = ?').run('admin', req.params.id);
  res.json({ message: 'Usuario promovido a admin' });
});

// Rota para listar todos os usuários (apenas admin)
app.get('/api/admin/users', auth, requireAdmin, (req, res) => {
  const users = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC').all();
  res.json(users);
});

app.get('/api/profile', auth, (req, res) => {
  const user = db.prepare('SELECT id, name, email, phone, avatar, role, created_at FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

app.put('/api/profile', auth, (req, res) => {
  const { name, phone } = req.body;
  db.prepare('UPDATE users SET name = ?, phone = ? WHERE id = ?').run(name, phone, req.user.id);
  res.json({ message: 'Perfil atualizado' });
});

// BANNERS
app.get('/api/banners', (req, res) => {
  const banners = db.prepare('SELECT * FROM banners WHERE active = 1 ORDER BY sort_order').all();
  res.json(banners);
});

app.get('/api/admin/banners', auth, requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM banners ORDER BY sort_order').all());
});

app.post('/api/admin/banners', auth, requireAdmin, upload.single('image'), (req, res) => {
  const { title, subtitle, link, sort_order } = req.body;
  const imageUrl = req.file ? `/uploads/banners/${req.file.filename}` : null;
  const result = db.prepare('INSERT INTO banners (title, subtitle, image_url, link, sort_order) VALUES (?, ?, ?, ?, ?)').run(
    title, subtitle, imageUrl, link, parseInt(sort_order) || 0
  );
  res.status(201).json({ id: result.lastInsertRowid, message: 'Banner criado' });
});

app.delete('/api/admin/banners/:id', auth, requireAdmin, (req, res) => {
  db.prepare('DELETE FROM banners WHERE id = ?').run(req.params.id);
  res.json({ message: 'Banner excluido' });
});

// PRODUTOS PUBLICOS
app.get('/api/products', (req, res) => {
  const { category, search, min_price, max_price, size, color, occasion, type } = req.query;
  let q = `SELECT p.*, c.name as category_name,
    (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
    FROM products p JOIN categories c ON p.category_id = c.id WHERE p.status = 'active'`;
  const params = [];
  if (category) { q += ' AND c.slug = ?'; params.push(category); }
  if (search) { q += ' AND (p.name LIKE ? OR p.description LIKE ?)'; params.push('%' + search + '%', '%' + search + '%'); }
  if (min_price) { q += ' AND p.price >= ?'; params.push(parseFloat(min_price)); }
  if (max_price) { q += ' AND p.price <= ?'; params.push(parseFloat(max_price)); }
  if (size) { q += ' AND p.id IN (SELECT product_id FROM product_sizes WHERE size = ?)'; params.push(size); }
  if (color) { q += ' AND p.id IN (SELECT product_id FROM product_colors WHERE color_name = ?)'; params.push(color); }
  if (occasion) { q += ' AND p.occasion = ?'; params.push(occasion); }
  if (type) { q += ' AND p.type = ?'; params.push(type); }
  q += ' ORDER BY p.created_at DESC';
  res.json({ products: db.prepare(q).all(...params) });
});

app.get('/api/products/featured', (req, res) => {
  res.json(db.prepare(`SELECT p.*, c.name as category_name,
    (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
    FROM products p JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'active' AND p.is_featured = 1`).all());
});

app.get('/api/products/new', (req, res) => {
  res.json(db.prepare(`SELECT p.*, c.name as category_name,
    (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
    FROM products p JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'active' AND p.is_new = 1 ORDER BY p.created_at DESC`).all());
});

app.get('/api/products/promotions', (req, res) => {
  res.json(db.prepare(`SELECT p.*, c.name as category_name,
    (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
    FROM products p JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'active' AND p.is_promotion = 1`).all());
});

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare(`SELECT p.*, c.name as category_name
    FROM products p JOIN categories c ON p.category_id = c.id
    WHERE p.id = ? AND p.status = 'active'`).get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Produto nao encontrado' });
  res.json({
    product,
    images: db.prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order').all(req.params.id),
    sizes: db.prepare('SELECT * FROM product_sizes WHERE product_id = ?').all(req.params.id),
    colors: db.prepare('SELECT * FROM product_colors WHERE product_id = ?').all(req.params.id),
    measurements: db.prepare('SELECT * FROM product_measurements WHERE product_id = ?').all(req.params.id),
    related: db.prepare(`SELECT p.*, c.name as category_name,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
      FROM products p JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.id != ? AND p.status = 'active' LIMIT 4`).all(product.category_id, req.params.id)
  });
});

app.get('/api/categories', (req, res) => res.json(db.prepare('SELECT * FROM categories').all()));

// CARRINHO
app.get('/api/cart', auth, (req, res) => {
  const items = db.prepare(`SELECT ci.*, p.name, p.price, p.sale_price,
    (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as image
    FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?`).all(req.user.id);
  const total = items.reduce((s, i) => s + ((i.sale_price || i.price) * i.quantity), 0);
  res.json({ items, total, count: items.length });
});

app.post('/api/cart', auth, (req, res) => {
  const { product_id, size, color, quantity = 1 } = req.body;
  const existing = db.prepare('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?')
    .get(req.user.id, product_id, size, color);
  if (existing) db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity, existing.id);
  else db.prepare('INSERT INTO cart_items (user_id, product_id, size, color, quantity) VALUES (?, ?, ?, ?, ?)')
    .run(req.user.id, product_id, size, color, quantity);
  res.json({ message: 'Adicionado' });
});

app.put('/api/cart/:id', auth, (req, res) => {
  db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?').run(req.body.quantity, req.params.id, req.user.id);
  res.json({ message: 'Atualizado' });
});

app.delete('/api/cart/:id', auth, (req, res) => {
  db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ message: 'Removido' });
});

app.delete('/api/cart', auth, (req, res) => {
  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
  res.json({ message: 'Limpo' });
});

// FAVORITOS
app.get('/api/favorites', auth, (req, res) => {
  res.json(db.prepare(`SELECT p.*, c.name as category_name,
    (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
    FROM products p JOIN categories c ON p.category_id = c.id
    JOIN favorites f ON p.id = f.product_id WHERE f.user_id = ? AND p.status = 'active'`).all(req.user.id));
});

app.post('/api/favorites/:productId', auth, (req, res) => {
  try {
    db.prepare('INSERT INTO favorites (user_id, product_id) VALUES (?, ?)').run(req.user.id, req.params.productId);
    res.json({ added: true });
  } catch(e) {
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND product_id = ?').run(req.user.id, req.params.productId);
    res.json({ added: false });
  }
});

// PEDIDOS
app.post('/api/orders', auth, (req, res) => {
  const cartItems = db.prepare(`SELECT ci.*, p.price, p.sale_price
    FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?`).all(req.user.id);
  if (cartItems.length === 0) return res.status(400).json({ error: 'Carrinho vazio' });
  const total = cartItems.reduce((s, i) => s + ((i.sale_price || i.price) * i.quantity), 0);
  const orderNumber = 'ORD-' + Date.now();
  const result = db.prepare('INSERT INTO orders (user_id, order_number, total, address, payment_method) VALUES (?, ?, ?, ?, ?)')
    .run(req.user.id, orderNumber, total, req.body.address || '', req.body.payment_method || 'credit_card');
  const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, size, color, quantity, price) VALUES (?, ?, ?, ?, ?, ?)');
  cartItems.forEach(i => stmt.run(result.lastInsertRowid, i.product_id, i.size, i.color, i.quantity, i.sale_price || i.price));
  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
  res.status(201).json({ message: 'Pedido criado', order_number: orderNumber });
});

app.get('/api/orders', auth, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json(orders.map(o => ({
    ...o,
    items: db.prepare(`SELECT oi.*, p.name,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as image
      FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`).all(o.id)
  })));
});

app.get('/api/orders/:id', auth, (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
  if (!order) return res.status(404).json({ error: 'Pedido nao encontrado' });
  res.json({
    ...order,
    items: db.prepare(`SELECT oi.*, p.name,
      (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as image
      FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`).all(req.params.id)
  });
});

// ADMIN
app.get('/api/admin/dashboard', auth, requireAdmin, (req, res) => {
  res.json({
    totalProducts: db.prepare('SELECT COUNT(*) as count FROM products').get().count,
    totalOrders: db.prepare('SELECT COUNT(*) as count FROM orders').get().count,
    totalRevenue: db.prepare('SELECT COALESCE(SUM(total), 0) as total FROM orders').get().total,
    totalUsers: db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'customer'").get().count
  });
});

app.get('/api/admin/products', auth, requireAdmin, (req, res) => {
  res.json(db.prepare(`SELECT p.*, c.name as category_name,
    (SELECT image_url FROM product_images WHERE product_id = p.id AND is_main = 1 LIMIT 1) as main_image
    FROM products p JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC`).all());
});

app.get('/api/admin/products/:id', auth, requireAdmin, (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Produto nao encontrado' });
  res.json({
    product,
    images: db.prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order').all(req.params.id),
    sizes: db.prepare('SELECT * FROM product_sizes WHERE product_id = ?').all(req.params.id),
    colors: db.prepare('SELECT * FROM product_colors WHERE product_id = ?').all(req.params.id),
    measurements: db.prepare('SELECT * FROM product_measurements WHERE product_id = ?').all(req.params.id)
  });
});

app.post('/api/admin/products', auth, requireAdmin, upload.array('images', 10), (req, res) => {
  const { name, category_id, type, price, sale_price, description, composition, occasion, quantity,
    is_featured, is_new, is_promotion, sizes, colors } = req.body;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const result = db.prepare(`INSERT INTO products (name, slug, category_id, type, price, sale_price,
    description, composition, occasion, quantity, is_featured, is_new, is_promotion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    name, slug, category_id, type, price, sale_price || null, description, composition,
    occasion, quantity || 0, is_featured ? 1 : 0, is_new ? 1 : 0, is_promotion ? 1 : 0
  );
  const productId = result.lastInsertRowid;
  if (req.files && req.files.length) {
    const stmt = db.prepare('INSERT INTO product_images (product_id, image_url, is_main, sort_order) VALUES (?, ?, ?, ?)');
    req.files.forEach((f, i) => stmt.run(productId, '/uploads/products/' + f.filename, i === 0 ? 1 : 0, i));
  }
  if (sizes) JSON.parse(sizes).forEach(s => db.prepare('INSERT INTO product_sizes (product_id, size, quantity) VALUES (?, ?, ?)').run(productId, s.size, s.quantity || 0));
  if (colors) JSON.parse(colors).forEach(c => db.prepare('INSERT INTO product_colors (product_id, color_name, color_hex) VALUES (?, ?, ?)').run(productId, c.name, c.hex));
  res.status(201).json({ message: 'Produto criado', id: productId });
});

app.put('/api/admin/products/:id', auth, requireAdmin, upload.array('images', 10), (req, res) => {
  const { name, category_id, type, price, sale_price, description, composition, occasion, quantity,
    is_featured, is_new, is_promotion, status, sizes, colors, existingImages } = req.body;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  db.prepare(`UPDATE products SET name = ?, slug = ?, category_id = ?, type = ?, price = ?,
    sale_price = ?, description = ?, composition = ?, occasion = ?, quantity = ?,
    is_featured = ?, is_new = ?, is_promotion = ?, status = ? WHERE id = ?`).run(
    name, slug, category_id, type, price, sale_price || null, description, composition,
    occasion, quantity || 0, is_featured ? 1 : 0, is_new ? 1 : 0, is_promotion ? 1 : 0,
    status || 'active', req.params.id
  );
  db.prepare('DELETE FROM product_images WHERE product_id = ?').run(req.params.id);
  if (existingImages) JSON.parse(existingImages).forEach((img, i) =>
    db.prepare('INSERT INTO product_images (product_id, image_url, is_main, sort_order) VALUES (?, ?, ?, ?)').run(req.params.id, img.url, img.is_main || 0, i));
  if (req.files && req.files.length) {
    const count = db.prepare('SELECT COUNT(*) as count FROM product_images WHERE product_id = ?').get(req.params.id).count;
    req.files.forEach((f, i) => db.prepare('INSERT INTO product_images (product_id, image_url, is_main, sort_order) VALUES (?, ?, ?, ?)').run(req.params.id, '/uploads/products/' + f.filename, count === 0 && i === 0 ? 1 : 0, count + i));
  }
  if (sizes) {
    db.prepare('DELETE FROM product_sizes WHERE product_id = ?').run(req.params.id);
    JSON.parse(sizes).forEach(s => db.prepare('INSERT INTO product_sizes (product_id, size, quantity) VALUES (?, ?, ?)').run(req.params.id, s.size, s.quantity || 0));
  }
  if (colors) {
    db.prepare('DELETE FROM product_colors WHERE product_id = ?').run(req.params.id);
    JSON.parse(colors).forEach(c => db.prepare('INSERT INTO product_colors (product_id, color_name, color_hex) VALUES (?, ?, ?)').run(req.params.id, c.name, c.hex));
  }
  res.json({ message: 'Produto atualizado' });
});

app.delete('/api/admin/products/:id', auth, requireAdmin, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ message: 'Produto excluido' });
});

app.get('/api/admin/orders', auth, requireAdmin, (req, res) => {
  const orders = db.prepare('SELECT o.*, u.name as customer_name, u.email as customer_email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC').all();
  res.json(orders.map(o => ({
    ...o,
    items: db.prepare(`SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`).all(o.id)
  })));
});

app.put('/api/admin/orders/:id/status', auth, requireAdmin, (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, req.params.id);
  res.json({ message: 'Status atualizado' });
});

// Paginas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/produto/:id', (req, res) => res.sendFile(path.join(__dirname, 'produto.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/carrinho', (req, res) => res.sendFile(path.join(__dirname, 'carrinho.html')));
app.get('/wishlist', (req, res) => res.sendFile(path.join(__dirname, 'wishlist.html')));
app.get('/pedidos', (req, res) => res.sendFile(path.join(__dirname, 'pedidos.html')));
app.get('/perfil', (req, res) => res.sendFile(path.join(__dirname, 'perfil.html')));

app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('   FLORATTA 2026 - ONLINE');
  console.log('========================================');
  console.log('Site: http://localhost:' + PORT);
  console.log('Admin: http://localhost:' + PORT + '/admin');
  console.log('Login: admin@floratta.com / admin123');
  console.log('Senha mestra para criar admin: ' + MASTER_PASSWORD);
  console.log('========================================');
  console.log('');
});