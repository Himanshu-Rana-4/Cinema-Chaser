const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const tagsEl = document.getElementById('tags');
const main = document.getElementById('main');
const searchForm = document.getElementById('form');
const searchInput = document.getElementById('search');

getMovies(API_URL);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
});

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/1080x1580'}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}