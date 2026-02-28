const items = [
  { name: "BURNING SPICE", file: "burning_spice.jpg", weight: 1 },
  { name: "SILENT SALT", file: "silent_salt.jpg", weight: 1 },
  { name: "ETERNAL SUGAR", file: "eternal_sugar.jpg", weight: 1 },
  { name: "MYSTIC FLOUR", file: "mystic_flour.jpg", weight: 1 },
  { name: "SHADOW MILK", file: "shadow_milk.jpg", weight: 1 },
];

// weighted random pick
function pick(items) {
  const total = items.reduce((s, it) => s + (it.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const it of items) {
    r -= (it.weight ?? 1);
    if (r <= 0) return it;
  }
  return items[items.length - 1];
}

const openBtn = document.getElementById("openBtn");
const resetBtn = document.getElementById("resetBtn");
const resultImg = document.getElementById("resultImg");
const resultName = document.getElementById("resultName");
const placeholder = document.getElementById("placeholder");
const historyList = document.getElementById("historyList");

function addHistory(name) {
  const li = document.createElement("li");
  const left = document.createElement("span");
  left.textContent = name;

  const right = document.createElement("span");
  right.textContent = new Date().toLocaleTimeString();

  li.appendChild(left);
  li.appendChild(right);
  historyList.prepend(li);
}

async function tryLoadImage(file) {
  // This checks that the file exists by attempting to fetch it.
  // Works when opened via a local web server; may be blocked if you open the HTML directly in some browsers.
  try {
    const res = await fetch(file, { cache: "no-store" });
    return res.ok;
  } catch {
    // If fetch fails (e.g., file:// restrictions), we still attempt to display it.
    return true;
  }
}

openBtn.addEventListener("click", async () => {
  const it = pick(items);

  const ok = await tryLoadImage(it.file);

  resultName.textContent = it.name;
  addHistory(it.name);

  placeholder.style.display = "none";
  resultImg.style.display = "block";
  resultImg.src = it.file;

  if (!ok) {
    alert("Could not find: " + it.file + "\nPut the photo in the same folder or update script.js");
  }
});

resetBtn.addEventListener("click", () => {
  resultName.textContent = "—";
  resultImg.src = "";
  resultImg.style.display = "none";
  placeholder.style.display = "flex";
  historyList.innerHTML = "";
});
