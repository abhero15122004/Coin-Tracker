let userIP = '';
let postOfficesData = [];

document.addEventListener('DOMContentLoaded', () => {
  // Step 1: Get IP Address on load
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      userIP = data.ip;
      document.getElementById('landing-ip').textContent = userIP;
      const getStartedBtn = document.getElementById('get-started-btn');
      getStartedBtn.disabled = false;
    })
    .catch(error => {
      console.error('Error fetching IP:', error);
      document.getElementById('landing-ip').textContent = 'Error fetching IP';
    });

  // Step 2: Button Click Event
  document.getElementById('get-started-btn').addEventListener('click', () => {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    document.getElementById('dash-ip').textContent = userIP;
    
    fetchUserInfo();
  });

  // Search Filter
  document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredOffices = postOfficesData.filter(office => {
      const name = office.Name.toLowerCase();
      const branchType = office.BranchType.toLowerCase();
      return name.includes(searchTerm) || branchType.includes(searchTerm);
    });
    renderPostOffices(filteredOffices);
  });
});

function fetchUserInfo() {
  // Use ipapi.co to get info based on IP
  fetch(`https://ipapi.co/${userIP}/json/`)
    .then(response => response.json())
    .then(data => {
      // Step 3: Populate Top Details
      document.getElementById('val-lat').textContent = data.latitude;
      document.getElementById('val-lon').textContent = data.longitude;
      document.getElementById('val-city').textContent = data.city;
      document.getElementById('val-region').textContent = data.region;
      document.getElementById('val-org').textContent = data.org;
      document.getElementById('val-host').textContent = data.asn || "N/A"; // fallback for hostname if not present

      // Step 4: Display Map
      const mapIframe = document.getElementById('map-iframe');
      mapIframe.src = `https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`;

      // Step 5: Display Time
      const timezone = data.timezone;
      document.getElementById('val-timezone').textContent = timezone;
      
      const currentTime = new Date().toLocaleString("en-US", { timeZone: timezone });
      document.getElementById('val-datetime').textContent = currentTime;
      
      document.getElementById('val-pincode').textContent = data.postal;

      // Step 6 & 7: Fetch Post Offices
      fetchPostOffices(data.postal);
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
}

function fetchPostOffices(pincode) {
  fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(response => response.json())
    .then(data => {
      if (data && data[0].Status === "Success") {
        document.getElementById('val-message').textContent = data[0].Message;
        postOfficesData = data[0].PostOffice;
        renderPostOffices(postOfficesData);
      } else {
        document.getElementById('val-message').textContent = "No post offices found.";
        renderPostOffices([]);
      }
    })
    .catch(error => {
      console.error('Error fetching post offices:', error);
      document.getElementById('val-message').textContent = "Error fetching post offices.";
    });
}

function renderPostOffices(offices) {
  const grid = document.getElementById('post-office-grid');
  grid.innerHTML = ''; // Clear previous

  offices.forEach(office => {
    const card = document.createElement('div');
    card.className = 'post-office-card';

    card.innerHTML = `
      <p><span class="label">Name</span> ${office.Name}</p>
      <p><span class="label">Branch Type</span> ${office.BranchType}</p>
      <p><span class="label">Delivery Status</span> ${office.DeliveryStatus}</p>
      <p><span class="label">District</span> ${office.District}</p>
      <p><span class="label">Division</span> ${office.Division}</p>
    `;

    grid.appendChild(card);
  });
}
