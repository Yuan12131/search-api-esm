const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('resultsDiv');

const client_id = '9e_Z7STmxYIcQkv6gSSD';
const client_secret = 'WFiNunUoAn';

searchButton.addEventListener('click', function () {
  searchNews();
});

function searchNews() {
  const query = searchInput.value;
  if (query) {
    fetch(`/search/news?query=${query}`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('404 Not Found');
      }
      return response.json();
    })
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
}

function displayResults(data) {
  resultsDiv.innerHTML = '';

  if (data.items) {
    data.items.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a><p>${item.description}</p>`;
      resultsDiv.appendChild(newsItem);
    });
  } else {
    resultsDiv.innerHTML = '검색 결과가 없습니다.';
  }
}
