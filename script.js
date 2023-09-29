async function fetchJobs() {
  try {
    const response = await fetch(
      'https://jsearch.p.rapidapi.com/search?query=Python%20developer%20in%20Texas%2C%20USA&page=1&num_pages=1',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ab11d6ea47mshaa5a1960c286d92p141310jsn20556f981e65',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}



fetchJobs().then(data => {
  // Check if data.results exists and is an array
  const jobs = Array.isArray(data.results) ? data.results : [];

  const container = document.getElementById('jobs-container');

  jobs.forEach(job => {
      const card = document.createElement('div');
      card.classList = 'job-card';

      const title = document.createTextNode('Title: ' + job.title);
      card.appendChild(title);

      const description = document.createTextNode('Description: ' + job.description);
      card.appendChild(description);

      const location = document.createTextNode('Location: ' + job.location);
      card.appendChild(location);

      container.appendChild(card);
  });
}).catch(error => {
  console.error('Error:', error);
});


fetchJobs();