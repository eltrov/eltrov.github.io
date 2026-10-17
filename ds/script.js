// Images are expected locally in ./images/ (filenames below).
// Add or remove categories here.
const IMG = "img/";
const CATEGORIES = [
  { name: "Daggers",            img: "daggers.avif",                tags: ["melee"] },
  { name: "Straight swords",    img: "straight-swords.avif",        tags: ["melee"] },
  { name: "Greatswords",        img: "greatswords.avif",            tags: ["melee"] },
  { name: "Ultra Greatswords",  img: "ugs.avif",                    tags: ["melee"] },
  { name: "Curved Swords",      img: "curved-swords.avif",          tags: ["melee"] },
  { name: "Katanas",            img: "katanas.avif",                tags: ["melee"] },
  { name: "Curved Greatswords", img: "curved-greatswords.avif",     tags: ["melee"] },
  { name: "Piercing Swords",    img: "piercing-swords.avif",        tags: ["melee"] },
  { name: "Axes",               img: "axes.avif",                   tags: ["melee"] },
  { name: "Great Axes",         img: "great-axes.avif",             tags: ["melee"] },
  { name: "Hammers",            img: "hammers.avif",                tags: ["melee"] },
  { name: "Great Hammers",      img: "great-hammers.avif",          tags: ["melee"] },
  { name: "Fist & Claws",       img: "fist-claw.avif",              tags: ["melee"] },
  { name: "Spears",             img: "spears.avif",                 tags: ["melee"] },
  { name: "Halberds",           img: "Halberds.avif",               tags: ["melee"] },
  { name: "Whips",              img: "Whips.avif",                  tags: ["melee"] },
  { name: "Bows",               img: "bows.avif",                   tags: ["ranged"] },
  { name: "Greatbows",          img: "greatbows.avif",              tags: ["ranged"] },
  { name: "Crossbows",          img: "crossbows.avif",              tags: ["ranged"] },
  { name: "Catalysts",          img: "catalysts.avif",              tags: ["magic"] },
  { name: "Talismans",          img: "talismans.avif",              tags: ["magic"] },
  { name: "Flames",             img: "flames.avif",                 tags: ["magic"] },
];
// Tag buttons are generated from whatever tags appear above (a category can have several).
const TAGS = [...new Set(CATEGORIES.flatMap(c => c.tags))];

const SVGNS = "http://www.w3.org/2000/svg";
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const resultEl = document.getElementById("result");
const poolEl = document.getElementById("pool");
const tagsEl = document.getElementById("tags");
const historyEl = document.getElementById("history");

const enabled = new Set(CATEGORIES.map((_, i) => i));
let active = [];       // categories currently on the wheel
let rotation = 0;      // cumulative wheel rotation in degrees
let spinning = false;
const history = [];

function el(tag, attrs = {}, parent) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}
const pt = (r, deg) => {
  const t = deg * Math.PI / 180;
  return [r * Math.sin(t), -r * Math.cos(t)];
};

function buildWheel() {
  active = CATEGORIES.filter((_, i) => enabled.has(i));
  wheel.innerHTML = "";
  const n = active.length, a = 360 / n, R = 240;

  el("circle", { r: 247, fill: "#120e0a", stroke: "#c9a24a", "stroke-width": 4 }, wheel);

  active.forEach((c, i) => {
    const a0 = i * a, a1 = (i + 1) * a, mid = a0 + a / 2;
    const [x0, y0] = pt(R, a0), [x1, y1] = pt(R, a1);
    el("path", {
      d: `M0 0 L${x0} ${y0} A${R} ${R} 0 ${a > 180 ? 1 : 0} 1 ${x1} ${y1} Z`,
      fill: i % 2 ? "#2a2218" : "#1d170f", stroke: "#4a3d2a", "stroke-width": 1.5
    }, wheel);

    const g = el("g", { transform: `rotate(${mid})` }, wheel);
    const size = Math.min(64, 2 * Math.PI * 170 / n * 0.7);
    el("image", {
      href: IMG + c.img, x: -size / 2, y: -190, width: size, height: size * 1.13,
      preserveAspectRatio: "xMidYMid meet"
    }, g);
    const t = el("text", {
      x: 0, y: -118, "text-anchor": "middle", fill: "#e8dcc0",
      "font-family": "Georgia, serif", "font-size": n > 12 ? 11 : 15, "letter-spacing": ".5"
    }, g);
    /*t.textContent = c.name;*/
  });
  wheel.style.transition = "none";
  rotation = 0;
  wheel.style.transform = "rotate(0deg)";
}

function spin() {
  if (spinning || active.length < 2) return;
  spinning = true;
  spinBtn.disabled = true;
  resultEl.classList.remove("pop");

  const n = active.length, a = 360 / n;
  const winner = Math.floor(Math.random() * n);
  const jitter = (Math.random() - 0.5) * a * 0.7;       // land anywhere inside the wedge
  const mid = winner * a + a / 2 + jitter;
  const current = ((rotation % 360) + 360) % 360;
  const needed = ((360 - mid - current) % 360 + 360) % 360;
  rotation += 360 * (5 + Math.floor(Math.random() * 3)) + needed;

  wheel.style.transition = "transform 5s cubic-bezier(.12,.6,.1,1)";
  wheel.style.transform = `rotate(${rotation}deg)`;

  const done = () => {
    wheel.removeEventListener("transitionend", done);
    spinning = false;
    spinBtn.disabled = false;
    show(active[winner]);
  };
  wheel.addEventListener("transitionend", done);
}

function show(c) {
  resultEl.innerHTML = `<img src="${IMG + c.img}" alt=""><div class="name">${c.name}</div>`;
  void resultEl.offsetWidth;
  resultEl.classList.add("pop");
  history.unshift(c.name);
  historyEl.textContent = "Recent: " + history.slice(0, 8).join(" \u2022 ");
}

const boxes = [];      // checkbox per category
const tagBtns = [];    // { tag, btn } per tag

const indicesFor = tag => CATEGORIES.reduce((a, c, i) => (c.tags.includes(tag) && a.push(i), a), []);

// Apply a new enabled set, refusing anything that would leave fewer than 2 on the wheel.
function applyEnabled(next) {
  if (spinning || next.size < 2) { refreshUI(); return; }
  enabled.clear();
  next.forEach(i => enabled.add(i));
  buildWheel();
  refreshUI();
}

function refreshUI() {
  boxes.forEach((b, i) => { b.checked = enabled.has(i); });
  tagBtns.forEach(({ tag, btn }) => {
    const idx = indicesFor(tag);
    const on = idx.filter(i => enabled.has(i)).length;
    btn.classList.toggle("on", on === idx.length);
    btn.classList.toggle("partial", on > 0 && on < idx.length);
  });
}

function buildPool() {
  CATEGORIES.forEach((c, i) => {
    const label = document.createElement("label");
    label.className = "chip";
    label.innerHTML = `<input type="checkbox" checked><img src="${IMG + c.img}" alt=""><span>${c.name}</span>`;
    const box = label.querySelector("input");
    box.addEventListener("change", () => {
      const next = new Set(enabled);
      box.checked ? next.add(i) : next.delete(i);
      applyEnabled(next);
    });
    boxes.push(box);
    poolEl.appendChild(label);
  });

  TAGS.forEach(tag => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tag";
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      const idx = indicesFor(tag);
      const allOn = idx.every(i => enabled.has(i));
      const next = new Set(enabled);
      idx.forEach(i => allOn ? next.delete(i) : next.add(i));   // all on -> remove tag, otherwise add tag
      applyEnabled(next);
    });
    tagBtns.push({ tag, btn });
    tagsEl.appendChild(btn);
  });
  refreshUI();
}

wheel.addEventListener("click", spin);
spinBtn.addEventListener("click", spin);
buildPool();
buildWheel();
