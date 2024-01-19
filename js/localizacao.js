// autoSearch.js

// const apiKey = '38f1b1a71474f8940ad30733832dcaea';
const API_URL2 = 'https://api.openweathermap.org/data/2.5/weather';
const AUTO_SEARCH_LOCATION = 'local'; // Valor especial para indicar busca automática

async function obterCoordenadas() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function apiDataPorCoordenadas(lat, lon) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                lat: lat,
                lon: lon,
                appid: apiKey,
                lang: 'pt_br',
                units: 'metric'
            }
        });

        const responseData = response.data;
        console.log(responseData);

        // Aqui, você pode chamar funções ou manipular o DOM conforme necessário
        // Exemplo: renderizarImagens(responseData);

    } catch (error) {
        console.error('Erro na requisição', error);
        alert('Não foi possível obter a previsão do tempo para sua localização atual');
    }
}

function iniciarAutoBusca() {
    if (AUTO_SEARCH_LOCATION.toLowerCase() === 'local') {
        obterCoordenadas()
            .then((coordenadas) => {
                apiDataPorCoordenadas(coordenadas.coords.latitude, coordenadas.coords.longitude);
            })
            .catch((error) => {
                console.error('Erro ao obter coordenadas', error);
                alert('Não foi possível obter sua localização');
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarAutoBusca();
});
