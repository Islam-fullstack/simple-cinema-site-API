window.addEventListener('DOMContentLoaded', () => {
    const filmsEl = document.querySelector('.films');
    const API_KEY = '45265e39-3505-4b1c-9bda-91fc0afd39a0';
    const API_POPULAR_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
    const API_SEARCH_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';


    getResFilm(API_POPULAR_URL);

    async function getResFilm(url) {
        const resp = await fetch(url, {
            headers: {
                "Content_Type": "application/json",
                "X-API-KEY": API_KEY
            }
        });
        const respData = await resp.json();
        console.log(respData);
        getFilm(respData);
    }

    function getFilm(respData) {
        filmsEl.innerHTML = "";
        respData.films.forEach((filmData) => {
            const filmEl = document.createElement('div');

            filmEl.classList.add('film-card');
            filmEl.innerHTML = `
                <div class="film-img-box">
                <img src="${filmData.posterUrlPreview}" alt="film" class="film-img">
                    <div class="dark"></div>
                    <div class="film-rate ${returnRateColor(filmData.rating)}">${percentRate(filmData.rating)}</div>
                    </div>
                <div class="film-name">${filmData.nameEn}</div>
                <div class="film-genre">${filmData.genres.map((genre) => ` ${genre.genre}`)}</div>
            `
            filmsEl.appendChild(filmEl);
        });
    }


    function returnRateColor(voice) {
        percentRate(voice);
        if (voice >= '7' || voice >= '70%') {
            // console.log('green ', voice)s;
            return 'green'
        }
        else if (voice >= '5') {
            // console.log('orange', voice);
            return 'orange'
        }
        // console.log('red', voice);
        return 'red';
    }

    function percentRate(voice) {
        if (voice && voice.substr(voice.length - 1) === '%') {
            voice = voice.substr(0, voice.length - 1);
            voice /= 10;
            return voice;
        }
        else if (voice && voice.length > 3) {
            console.log(parseFloat(voice).toFixed(1))
            return parseFloat(voice).toFixed(1);
        }
        else if (!voice) {
            return '0';
        }
        else {
            return voice;
        }
    }


    const form = document.querySelector('form'),
        inputSearch = document.querySelector('#search');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(inputSearch.value);
        const searchByKey = API_SEARCH_URL + inputSearch.value;
        getResFilm(searchByKey);
    })
})