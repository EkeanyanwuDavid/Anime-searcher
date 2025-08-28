const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("section button");

const resultsGrid = document.querySelector(".grid");

async function fetchAnime(query) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
  const data = await res.json();

  localStorage.setItem("lastResults", JSON.stringify(data.data));
  renderResults(data.data);
}
function renderResults(animeList) {
  resultsGrid.innerHTML = "";
  animeList.forEach((anime) => {
    const card = `
    
        <div class="bg-slate-800 rounded-xl shadow-md overflow-hidden">
          <img
            src="${anime.images.jpg.image_url}"
            class="w-full h-200 object-cover"
            alt=""
          />
          <div class="p-4 space-y-2">
            <h2 class="text-lg font-semibold">${anime.title}</h2>
            <p class="text-sm text-slate-400">
              ${anime.year || ""} &centerdot; ⭐ ${anime.score || "?"}
            </p>
            <p class="text-sm line-clamp-3">
${anime.synopsis || "No description available."}
            </p>
          </div>
        </div>
    `;

    resultsGrid.innerHTML += card;
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchAnime(query);
    localStorage.setItem("lastSearch", query);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const lastSearch = localStorage.getItem("lastSearch");
  if (lastSearch) {
    searchInput.value = lastSearch;
    fetchAnime(lastSearch);
  }
});

// Dark mode

const darkToggle = document.querySelector("#toggle-dark");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    darkToggle.textContent = "🌞";
  } else {
    localStorage.setItem("theme", "light");
    darkToggle.textContent = "🌙";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    darkToggle.textContent = "🌞";
  }
});
