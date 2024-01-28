const searchInput = document.getElementById('search-input'); // Obtem o item do campo de pesquisa
const cards = document.getElementById('card__container'); // Obtem a seção de cards das músicas
const resultArtist = document.getElementById('result-artist'); // Obter o resultado de artistas

function resquestApi(searchContent) {
    const url = `http://localhost:3000/artists?name_like=${searchContent}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result));
}

function displayResults(result) {
    cards.classList.add('hidden');
    var artistName = document.getElementById('artist-name');
    var artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName = element.name;
        artistImage = element.urlImg;
        resultArtist.innerHTML += `
            <a class="artist-card cards" href="#">
            <div class="card-img">
                <img id="artist-img" src="${artistImage}">
                <span class="play-spotify"></span>
            </div>
            <div class="card-desc">
                <h3 class="artist-name" id="artist-name">${artistName}</h3>
                <span>Artista</span>
            </div>
            </a>    
        `
        resultArtist.classList.remove('hidden');
    });
}

document.addEventListener('input', () => {
    resultArtist.innerHTML = ``;
    const searchContent = searchInput.value.toLowerCase();
    if (searchContent === '') {
        cards.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    resquestApi(searchContent);
}); 