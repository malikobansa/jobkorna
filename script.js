const jobs = document.getElementById('jobs')

const url = 'https://jsearch.p.rapidapi.com/search?query=All&page=1&num_pages=10';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ab11d6ea47mshaa5a1960c286d92p141310jsn20556f981e65',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};

async function fetchData() {
  const response = await fetch(url, options);
  const result = await response.json();

  var jobDetails = `
  <div class="grids">
  <ul class="job-list">`;
  result.data.forEach(e => {
      jobDetails += `<li class="job-item">
       <li class="name">${e.employer_name}</li>
       <li class="logo"><img src="${e.employer_logo}" class="imgs"/></li>
       <li class="job-title">${e.job_title}</li>
       <p class="graph">${e.job_description}</p>
       <button class="buttons" data-url="${e.job_apply_link}">Apply for the Job</button>
       </li>`;
  });

  jobDetails += `</ul>
  </div>`;
  document.getElementById("jobs").innerHTML = jobDetails;

  // Attach a click event listener to the "Apply for the Job" buttons.
  const applyButtons = document.querySelectorAll('.buttons');
  applyButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Retrieve the job's URL from the button's data-url attribute and redirect the user.
      const jobURL = button.getAttribute('data-url');
      window.location.href = jobURL;
    });
  });
}

fetchData();
