const jobs = document.getElementById('jobs');
const searchBtn = document.getElementById('searchBtn');
const searchQueryInput = document.getElementById('searchQuery');

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ab11d6ea47mshaa5a1960c286d92p141310jsn20556f981e65',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};

// Function to fetch job data based on query
async function fetchData(query = 'Developer') {
  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=1&num_pages=10`;

  try {
    const response = await fetch(url, options);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const result = await response.json();

    // Ensure we have job data
    if (result.data && result.data.length > 0) {
      let jobDetails = `
      <div class="grids">
      <ul class="job-list">`;

      result.data.forEach(e => {
        jobDetails += `
        <li class="job-item">
        <div class="job-title">${e.job_title}</div>
          <div class="job-grid">
          <div class="logo"><img src="${e.employer_logo}" class="imgs" alt="Logo"/></div>
          <div class="name">
          <h1>${e.employer_name}</h1>
          <div class="icon">
          <i class="fa-solid fa-location-crosshairs"></i>
          <p>${e.job_city}, ${e.job_country}</p>
          </div>
          </div>
          </div>
          <button class="buttons" data-url="${e.job_apply_link}">Apply for the Job</button>
          </li>`;
      });

      jobDetails += `</ul>
      </div>`;

      // Insert job details into the DOM
      jobs.innerHTML = jobDetails;

      // Attach event listeners to the "Apply for the Job" buttons
      const applyButtons = document.querySelectorAll('.buttons');
      applyButtons.forEach(button => {
        button.addEventListener('click', function () {
          const jobURL = button.getAttribute('data-url');
          window.location.href = jobURL;
        });
      });
    } else {
      // If no job data, display a message
      jobs.innerHTML = '<p>No jobs found.</p>';
    }

  } catch (error) {
    console.error('Error:', error);
    jobs.innerHTML = '<p>Failed to load job listings. Please try again later.</p>';
  }
}

// Fetch initial data
fetchData();

// Add event listener for the search button
searchBtn.addEventListener('click', () => {
  const searchQuery = searchQueryInput.value.trim();
  
  // Fetch data based on search query
  if (searchQuery) {
    fetchData(searchQuery);
  } else {
    alert('Please enter a search term');
  }
});
