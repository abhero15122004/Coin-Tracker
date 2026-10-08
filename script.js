let cryptoData = [];
const apiEndpoint = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

document.addEventListener("DOMContentLoaded", () => {
  // Using async/await as the primary fetch mechanism as requested by instructions (both are implemented).
  fetchDataWithAsyncAwait();
  // Alternatively, you can call fetchDataWithThen();

  // Search functionality
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = cryptoData.filter(coin => 
      coin.name.toLowerCase().includes(searchTerm) || 
      coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
  });

  // Sort by Market Cap
  const sortMktCapBtn = document.getElementById("sort-mkt-cap");
  sortMktCapBtn.addEventListener("click", () => {
    // Sorting in descending order as per typical market cap displays
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
  });

  // Sort by Percentage Change
  const sortPercentageBtn = document.getElementById("sort-percentage");
  sortPercentageBtn.addEventListener("click", () => {
    // Sorting in descending order
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
  });
});

// Part 1 & 5: Implementation of async await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cryptoData = data;
    renderTable(cryptoData);
  } catch (error) {
    console.error("Error fetching data using async/await:", error);
  }
}

// Part 1 & 5: Implementation of .then
function fetchDataWithThen() {
  fetch(apiEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      cryptoData = data;
      renderTable(cryptoData);
    })
    .catch(error => {
      console.error("Error fetching data using .then:", error);
    });
}

// Part 3 & 4: Render Data
function renderTable(data) {
  const tableBody = document.getElementById("coin-table-body");
  tableBody.innerHTML = "";

  data.forEach(coin => {
    const row = document.createElement("tr");

    // Format numbers
    const currentPrice = `$${coin.current_price.toLocaleString()}`;
    const totalVolume = `$${coin.total_volume.toLocaleString()}`;
    const marketCap = `Mkt Cap : $${coin.market_cap.toLocaleString()}`;
    
    // Format percentage and determine color
    const percentageChange = coin.price_change_percentage_24h.toFixed(2);
    const percentageClass = percentageChange >= 0 ? "percentage-green" : "percentage-red";
    const percentageText = `${percentageChange}%`;

    row.innerHTML = `
      <td>
        <div class="coin-info">
          <img src="${coin.image}" alt="${coin.name}" class="coin-logo">
          <span>${coin.name}</span>
        </div>
      </td>
      <td class="coin-symbol">${coin.symbol}</td>
      <td>${currentPrice}</td>
      <td>${totalVolume}</td>
      <td class="${percentageClass}">${percentageText}</td>
      <td>${marketCap}</td>
    `;

    tableBody.appendChild(row);
  });
}
