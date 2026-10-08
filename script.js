const API_KEY = "LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a";

document.addEventListener("DOMContentLoaded", () => {
  getCurrentImageOfTheDay();
  addSearchToHistory();

  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const dateInput = document.getElementById("search-input").value;
    if (dateInput) {
      getImageOfTheDay(dateInput);
    }
  });
});

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  fetchAPOD(currentDate);
}

function getImageOfTheDay(date) {
  fetchAPOD(date, true);
}

function fetchAPOD(date, shouldSave = false) {
  const container = document.getElementById("current-image-container");
  container.innerHTML = `<div class="loader">Fetching data from the cosmos...</div>`;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data for the selected date.");
      }
      return response.json();
    })
    .then(data => {
      renderAPOD(data);
      if (shouldSave) {
        saveSearch(date);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      container.innerHTML = `<div class="error-msg">Whoops! ${error.message}</div>`;
    });
}

function renderAPOD(data) {
  const container = document.getElementById("current-image-container");
  let mediaHtml = '';

  if (data.media_type === "video") {
    mediaHtml = `<iframe src="${data.url}" frameborder="0" allowfullscreen height="500" width="100%"></iframe>`;
  } else {
    mediaHtml = `<img src="${data.url}" alt="${data.title}">`;
  }

  container.innerHTML = `
    <div class="apod-content">
      <div class="apod-image-wrapper">
        ${mediaHtml}
      </div>
      <div class="apod-details">
        <h2>${data.title}</h2>
        <p class="apod-date">${data.date}</p>
        <p class="apod-explanation">${data.explanation}</p>
      </div>
    </div>
  `;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  
  if (searches[searches.length - 1] !== date) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
    addSearchToHistory();
  }
}

function addSearchToHistory() {
  const historyList = document.getElementById("search-history");
  historyList.innerHTML = "";

  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  
  searches.forEach(date => {
    const li = document.createElement("li");
    li.textContent = date;
    li.addEventListener("click", () => {
      getImageOfTheDay(date);
    });
    historyList.appendChild(li);
  });
}
