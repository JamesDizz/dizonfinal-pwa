document.getElementById('fetchDataBtn').addEventListener('click', fetchData);
document.getElementById('backToSearchBtn').addEventListener('click', backToSearch);

let allMemes = []; // Store all memes to filter later

function fetchData() {
  const query = document.getElementById('searchInput').value.toLowerCase(); // Get the search query

  if (!query) {
    document.getElementById('dataDisplay').innerText = 'Please enter a search term.';
    return;
  }

  const filteredMemes = allMemes.filter(meme => meme.name.toLowerCase().includes(query));

  if (filteredMemes.length > 0) {
    displayMemes(filteredMemes);
  } else {
    document.getElementById('dataDisplay').innerText = 'No memes found for your search.';
  }
}

// Fetch all memes from the API
function fetchMemes() {
  fetch('https://api.imgflip.com/get_memes')
    .then(response => response.json())
    .then(data => {
      allMemes = data.data.memes; // Store all memes in the global variable
    })
    .catch(error => {
      console.error('Error fetching memes:', error);
      document.getElementById('dataDisplay').innerText = 'Failed to fetch memes';
    });
}

// Display memes on the page
function displayMemes(memes) {
  const dataDisplay = document.getElementById('dataDisplay');
  dataDisplay.innerHTML = ''; // Clear previous results

  memes.forEach(meme => {
    const memeElement = document.createElement('div');
    memeElement.classList.add('meme');
    memeElement.innerHTML = `
      <img src="${meme.url}" alt="${meme.name}" style="max-width: 100%; height: auto; border-radius: 8px;">
      <p><strong>${meme.name}</strong></p>
    `;
    dataDisplay.appendChild(memeElement);
  });

  // Hide search form and show "Back to Search" button
  document.getElementById('searchForm').style.display = 'none';
  document.getElementById('backToSearchBtn').style.display = 'block';
}

// Go back to the search form
function backToSearch() {
  // Show search form and hide meme display
  document.getElementById('searchForm').style.display = 'block';
  document.getElementById('dataDisplay').innerHTML = ''; // Clear meme display
  document.getElementById('backToSearchBtn').style.display = 'none';
}

// Initially fetch all memes
fetchMemes();

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }
  