# 🚀 GitTrendX

Explore, compare, and save trending GitHub repositories by programming language — with AI-like summaries, favorites, and charts.

## ✨ Features

- 🔥 Explore trending GitHub repositories
- 🔍 Search, sort, and filter by language or stars
- 🧠 Auto summaries based on description + topics
- 📊 Language distribution pie chart (Chart.js)
- ⚔️ Compare two languages side-by-side
- ⭐ Save your favorite repositories (localStorage)
- 🌙 Dark mode toggle

## 📦 Live Demo

Check out the live version of the project here:  
👉 [GitTrendX Live Demo](https://Thakare07.github.io/gittrendx/)

## 🛠️ Built With

- HTML, CSS, JavaScript
- GitHub REST API
- Chart.js

## 👤 Author

**Tejas Thakare**  
📧 tejasthakare221@gmail.com 
🔗 [LinkedIn](https://www.linkedin.com/in/tejas-thakare-9b9793345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app )

## 📄 License

MIT License
# 🚀 GitTrendX: Explore, Compare & Save Trending GitHub Repos

GitTrendX is a modern web-based GitHub trending explorer that allows you to explore popular repositories by programming language, compare trends between two languages, visualize language distribution, and save your favorite repositories — all in a responsive and dark-mode enabled UI.

![Screenshot](https://raw.githubusercontent.com/Thakare07/gittrendx/main/screenshots/ss1 (2).png) <!-- Replace with actual GitHub path if needed -->

---

## ✨ Features

- 🔍 **Explore Trending Repos** by any language (e.g., Python, Java, etc.)
- 🎯 **Search & Sort** repos by name, author, or star count
- 🌓 **Dark/Light Mode** toggle
- 📈 **Pie Chart** visualization of language distribution using Chart.js
- ⭐ **Save Favorites** locally (stored using `localStorage`)
- ❌ **Remove Favorites** feature
- 🧠 **AI-like Summary** for each repo using description & topics
- 🤝 **Trending Comparison Mode** — Compare two languages side-by-side

---

## 📸 Screenshots

| Explore View | Language Distribution | Comparison Mode |
|--------------|-----------------------|-----------------|
| ![Explore](https://raw.githubusercontent.com/Thakare07/gittrendx/main/screenshots/ss1 (2).png) | ![Chart](https://raw.githubusercontent.com/Thakare07/gittrendx/main/screenshots/ss2.png) | ![Compare](https://raw.githubusercontent.com/Thakare07/gittrendx/main/screenshots/ss3.png) |

> Replace the image URLs with your actual GitHub image paths after uploading.

---

## 💡 How It Works

- Uses the [GitHub REST API](https://docs.github.com/en/rest/search#search-repositories) to fetch trending repositories with `stars:>1000`.
- Filters and sorts data on the frontend using JavaScript.
- Stores favorites locally using browser `localStorage`.

---

## 🛠️ Tech Stack

- **HTML**, **CSS**, **JavaScript**
- **Chart.js** (for pie charts)
- **GitHub REST API**

---

## 📁 Folder Structure

```bash
gittrendx/
│
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # All functionality
├── README.md           # You're reading it!
└── /screenshots/       # (Optional) Project screenshots
