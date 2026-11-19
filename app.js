const products = [
  {name:"iPhone 17 Pro",type:"iPhone",price:"18 999 000 so‘m",specs:"A19 Pro chip · Pro kamera tizimi · 256 GB",image:"https://images.apple.com/v/homepage/images/iphone-family/a/hero_iphone_family__be5jkzxszb1e_large.jpg"},
  {name:"MacBook Air M5",type:"Mac",price:"16 499 000 so‘m",specs:"Apple M5 chip · Liquid Retina · 13 dyuym",image:"https://images.apple.com/v/homepage/images/macbook-air-m5/a/hero_macbook_air_m5__eb1idggd120y_large.jpg"},
  {name:"iPad Air M4",type:"iPad",price:"8 499 000 so‘m",specs:"M4 chip · Apple Pencil qo‘llovi · 11 dyuym",image:"https://images.apple.com/v/homepage/images/ipad-air-m4/a/hero_ipad_air_m4__gc1zddfs5tiu_large.jpg"},
  {name:"Apple Watch Series 11",type:"Watch",price:"5 299 000 so‘m",specs:"Sog‘liq kuzatuvi · Always-On Retina · GPS",image:"https://images.apple.com/v/homepage/images/apple-watch-series-11/a/promo_apple_watch_series_11__gnlwqxe1jlu2_large.jpg"},
  {name:"AirPods Pro 3",type:"AirPods",price:"3 299 000 so‘m",specs:"Faol shovqin kamaytirish · Spatial Audio",image:"https://images.apple.com/v/homepage/images/airpods-pro-3/a/promo_airpods_pro_3__e4755qofhnyq_large.jpg"},
  {name:"MacBook Pro",type:"Mac",price:"24 999 000 so‘m",specs:"M5 chip · XDR displey · Pro darajadagi unumdorlik",image:"https://images.apple.com/v/homepage/images/macbook-air-m5/a/hero_macbook_air_m5__eb1idggd120y_large.jpg"}
];

const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
let activeFilter = "all";
let selectedProduct = "";
let bagCount = 0;

function renderProducts() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const filtered = products.filter(p =>
    (activeFilter === "all" || p.type === activeFilter) &&
    (p.name.toLowerCase().includes(query) || p.type.toLowerCase().includes(query))
  );
  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <p class="product-type">${p.type}</p>
      <h3>${p.name}</h3>
      <p class="specs">${p.specs}</p>
      <div class="product-bottom">
        <span class="price">${p.price}</span>
        <button class="buy-small" data-buy="${p.name}">Sotib olish</button>
      </div>
    </article>`).join("");
  emptyState.hidden = filtered.length !== 0;
}

function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll("[data-filter]").forEach(el =>
    el.classList.toggle("active", el.dataset.filter === filter)
  );
  renderProducts();
}

document.querySelectorAll(".category").forEach(btn =>
  btn.addEventListener("click", () => setFilter(btn.dataset.filter))
);
document.querySelectorAll(".nav-links [data-filter]").forEach(link =>
  link.addEventListener("click", () => {
    setFilter(link.dataset.filter);
    document.getElementById("navLinks").classList.remove("open");
  })
);
document.querySelectorAll("[data-filter-link]").forEach(link =>
  link.addEventListener("click", () => setFilter(link.dataset.filterLink))
);
searchInput.addEventListener("input", renderProducts);

document.getElementById("searchToggle").addEventListener("click", () => {
  document.getElementById("searchPanel").classList.toggle("open");
  if (document.getElementById("searchPanel").classList.contains("open")) searchInput.focus();
});
document.getElementById("menuToggle").addEventListener("click", () =>
  document.getElementById("navLinks").classList.toggle("open")
);

const slides = [
  {title:"iPhone 17 Pro",subtitle:"Kuch. Tezlik. Mukammal kamera.",image:"https://images.apple.com/v/homepage/images/iphone-family/a/hero_iphone_family__be5jkzxszb1e_large.jpg",product:"iPhone 17 Pro"},
  {title:"MacBook Air",subtitle:"Yengil. Kuchli. Cheksiz imkoniyat.",image:"https://images.apple.com/v/homepage/images/macbook-air-m5/a/hero_macbook_air_m5__eb1idggd120y_large.jpg",product:"MacBook Air M5"},
  {title:"iPad Air",subtitle:"Ijod va imkoniyatlar bir ekranda.",image:"https://images.apple.com/v/homepage/images/ipad-air-m4/a/hero_ipad_air_m4__gc1zddfs5tiu_large.jpg",product:"iPad Air M4"}
];
let currentSlide = 0;
function showSlide(index) {
  currentSlide = index;
  const slide = slides[index];
  document.querySelector(".hero h1").textContent = slide.title;
  document.querySelector(".hero-subtitle").textContent = slide.subtitle;
  document.querySelector(".hero-visual img").src = slide.image;
  document.querySelector(".hero-visual img").alt = slide.title;
  document.querySelectorAll(".dot").forEach((dot,i) => dot.classList.toggle("active",i===index));
  document.querySelector(".hero .button-outline").dataset.buy = slide.product;
}
document.querySelectorAll(".dot").forEach(dot =>
  dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)))
);

const modal = document.getElementById("registerModal");
const modalProduct = document.getElementById("modalProduct");
function openRegister(productName) {
  selectedProduct = productName || "Apple mahsuloti";
  modalProduct.textContent = `Tanlangan mahsulot: ${selectedProduct}`;
  document.getElementById("registerNote").textContent = "";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeRegister() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
document.addEventListener("click", e => {
  const buy = e.target.closest("[data-buy]");
  if (buy) openRegister(buy.dataset.buy);
});
document.getElementById("modalClose").addEventListener("click", closeRegister);
modal.addEventListener("click", e => { if (e.target === modal) closeRegister(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeRegister(); });

document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("registerNote").textContent =
    `Rahmat! ${selectedProduct} bo‘yicha demo so‘rovingiz qabul qilindi.`;
  e.target.reset();
  bagCount++;
  document.getElementById("bagCount").textContent = bagCount;
});
document.getElementById("bagButton").addEventListener("click", () => {
  showToast(bagCount ? `Ro‘yxatdan o‘tgan so‘rovlar: ${bagCount}` : "Hozircha tanlangan mahsulot yo‘q.");
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("contactNote").textContent = "Xabaringiz demo tarzda qabul qilindi. Rahmat!";
  e.target.reset();
});

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

renderProducts();
