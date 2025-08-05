// JavaScript for Git Trending Explorer
const repoContainer = document.getElementById('repoContainer');
const languageInput = document.getElementById('languageInput');
const sortSelect = document.getElementById('sortSelect');
const searchBar = document.getElementById('searchBar');
const themeToggle = document.getElementById('themeToggle');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');
const favoritesContainer = document.getElementById('favoritesContainer');
const toggleFavoritesBtn = document.getElementById('toggleFavorites');
const lang1Input = document.getElementById('lang1');
const lang2Input = document.getElementById('lang2');
const compareBtn = document.getElementById('compareBtn');
const lang1Results = document.getElementById('lang1Results');
const lang2Results = document.getElementById('lang2Results');

let currentPage = 1;
let allRepos = [];
const perPage = 10;

function fetchTrendingRepos(language = '', page = 1) {
  const langQuery = language ? `+language:${encodeURIComponent(language)}` : '';
  const apiUrl = `https://api.github.com/search/repositories?q=stars:>1000${langQuery}&sort=stars&order=desc&per_page=${perPage}&page=${page}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      allRepos = data.items || [];
      renderFilteredRepos();
      updatePaginationUI();
      renderLanguageChart(allRepos);
    })
    .catch(err => {
      console.error('GitHub API error:', err);
      repoContainer.innerHTML = '<p>Error fetching data.</p>';
    });
}

function generateSummary(repo) {
  let summary = repo.description || '';
  if (repo.topics && repo.topics.length) {
    summary += ' Topics: ' + repo.topics.slice(0, 3).join(', ');
  }
  return summary || 'No summary available.';
}

function renderFilteredRepos() {
  let filtered = [...allRepos];

  const query = searchBar.value.toLowerCase();
  if (query) {
    filtered = filtered.filter(repo =>
      repo.name.toLowerCase().includes(query) ||
      repo.owner.login.toLowerCase().includes(query)
    );
  }

  const sort = sortSelect.value;
  if (sort === 'stars-asc') {
    filtered.sort((a, b) => a.stargazers_count - b.stargazers_count);
  } else if (sort === 'stars-desc') {
    filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderRepos(filtered);
}

function renderRepos(repos) {
  repoContainer.innerHTML = '';
  if (repos.length === 0) {
    repoContainer.innerHTML = '<p>No repositories found.</p>';
    return;
  }

  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p><strong>Author:</strong> ${repo.owner.login}</p>
      <p><strong>Stars:</strong> ⭐ ${repo.stargazers_count}</p>
      <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
      <p><strong>Summary:</strong> ${generateSummary(repo)}</p>
      <button onclick="saveToFavorites('${repo.name}', '${repo.html_url}')">⭐ Save</button>
      <a href="${repo.html_url}" target="_blank"><button>🔗 GitHub</button></a>
    `;
    repoContainer.appendChild(card);
  });
}

function updatePaginationUI() {
  pageIndicator.textContent = `Page ${currentPage}`;
  prevBtn.disabled = currentPage <= 1;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchTrendingRepos(languageInput.value.trim(), currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchTrendingRepos(languageInput.value.trim(), currentPage);
});

languageInput.addEventListener('input', () => {
  currentPage = 1;
  fetchTrendingRepos(languageInput.value.trim(), currentPage);
});
sortSelect.addEventListener('change', renderFilteredRepos);
searchBar.addEventListener('input', renderFilteredRepos);
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

toggleFavoritesBtn.addEventListener('click', () => {
  const favSection = document.querySelector('.favorites-section');
  favSection.style.display = favSection.style.display === 'none' ? 'block' : 'none';
  if (favSection.style.display === 'block') {
    favSection.scrollIntoView({ behavior: 'smooth' });
  }
});

function saveToFavorites(name, url) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favorites.find(f => f.url === url)) {
    favorites.push({ name, url });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
  } else {
    alert('Already in favorites!');
  }
}

function removeFavorite(url) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites = favorites.filter(f => f.url !== url);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  showFavorites();
}

function showFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favoritesContainer.innerHTML = '';
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No favorites yet.</p>';
    return;
  }
  favorites.forEach(fav => {
    const div = document.createElement('div');
    div.className = 'repo-card';
    div.innerHTML = `
      <a href="${fav.url}" target="_blank">${fav.name}</a>
      <button onclick="removeFavorite('${fav.url}')">❌ Remove</button>
    `;
    favoritesContainer.appendChild(div);
  });
}

function renderLanguageChart(repos) {
  const ctx = document.getElementById('languageChart').getContext('2d');
  const langCount = {};
  repos.forEach(repo => {
    const lang = repo.language || 'Unknown';
    langCount[lang] = (langCount[lang] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(langCount),
    datasets: [{
      label: 'Repo Count',
      data: Object.values(langCount),
      backgroundColor: ['#ff6384','#36a2eb','#cc65fe','#ffce56','#2ecc71','#f39c12','#e74c3c','#9b59b6']
    }]
  };

  if (window.languageChartInstance) {
    window.languageChartInstance.destroy();
  }
  window.languageChartInstance = new Chart(ctx, { type: 'pie', data: chartData });
}

compareBtn.addEventListener('click', () => {
  const lang1 = lang1Input.value.trim();
  const lang2 = lang2Input.value.trim();
  if (!lang1 || !lang2) return;

  fetchCompareRepos(lang1, lang1Results);
  fetchCompareRepos(lang2, lang2Results);
});

function fetchCompareRepos(language, container) {
  const apiUrl = `https://api.github.com/search/repositories?q=stars:>1000+language:${encodeURIComponent(language)}&sort=stars&order=desc&per_page=5&page=1`;
  container.innerHTML = `<h3>${language}</h3>`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      (data.items || []).forEach(repo => {
        const div = document.createElement('div');
        div.className = 'repo-card';
        div.innerHTML = `
          <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>
          <p>Author: ${repo.owner.login}</p>
          <p>Stars: ${repo.stargazers_count}</p>
        `;
        container.appendChild(div);
      });
    });
}

// Initial load
fetchTrendingRepos();
showFavorites();
