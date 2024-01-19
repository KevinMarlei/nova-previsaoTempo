const imagens = [
    {
        descricao: ['nuvens dispersas', 'poucas nuvens', 'nuvens quebradas', 'algumas nuvens'],
        giffDia: 'giff/dia-parcialmente-nublado.gif',
        giffNoite: 'giff/noite-parcialmente-nublado.gif',
        iconDia: './icon/dia-parcialmente-nublado.svg',
        iconNoite: './icon/noite-parcialmente-nublado.svg'
    },
    {
        descricao: 'nublado',
        giffDia: 'giff/dia-nublado.gif',
        giffNoite: 'giff/noite-nublado.gif',
        iconDia: 'icon/nublado.svg',
        iconNoite: 'icon/noite-nublado.svg'
    },
    {
        descricao: 'céu limpo',
        giffDia: './giff/Ensolarado.gif',
        giffNoite: './giff/noite-limpa.gif',
        iconDia: './icon/ensolarado.svg',
        iconNoite: './icon/noite-limpa.svg'
    },
    {
        descricao: ['chuva leve', 'chuva moderada'],
        giffDia: './giff/dia-chuva.gif',
        giffNoite: './giff/noite-chuva.gif',
        iconDia: './icon/dia chuva.svg',
        iconNoite: './icon/noite chuva.svg'
    },
    {
        descricao: 'chuva forte',
        giffDia: './giff/dia-chuva.gif',
        giffNoite: './giff/noite-chuva.gif',
        iconDia: './icon/noite chuvosa.svg',
        iconNoite: './icon/noite chuvosa.svg'
    },
    {
        descricao: ['neve', 'pouca neve'],
        giffDia: './giff/neve-dia.gif',
        giffNoite: './giff/neve-noite.gif',
        iconDia: './icon/neve.svg',
        iconNoite: './icon/neve.svg'
    },
    {
        descricao: 'tempestade',
        giffDia: './giff/tempestade.gif',
        giffNoite: './giff/tempestade.gif',
        iconDia: './icon/dia-tempestade.svg',
        iconNoite: './icon/noite-tempestade.svg'
    },
    {
        descricao: ['neblina', 'névoa'],
        giffDia: './giff/dia-neblina.gif',
        giffNoite: './giff/dia-neblina.gif',
        iconDia: './icon/dia-neblina.svg',
        iconNoite: './icon/noite-neblina.ico'
    },
    {
        backgroundDia: './img/dia.jpg',
        backgroundNoite: './img/noite.jpg'
    }

]

const forecast = 'https://api.openweathermap.org/data/2.5/forecast';
async function apiForecast(local) {
    try {
        const response = await axios.get(forecast, {
            params: {
                q: local,
                appid: apiKey,
                lang: 'pt_br',
                units: 'metric'
            }
        });
        const responseData = response.data;

        if (responseData.city && responseData.list) {
            console.log(responseData);

            renderizarLadoDireito(responseData);
            requisicaoDeDatas(responseData);
            requisicaoMinimoMaximo(responseData);
        } else {
            console.error('Resposta inválida da API');
        }
    } catch (error) {
        console.error('Erro na requisição', error);
        alert('Nome inválido. Favor inserir um nome válido');
    }
}

let proximosdiasBackground = document.querySelectorAll('.proximos-dias');
const exibirDatas = document.querySelectorAll('.datas');


function renderizarLadoDireito(dataAPI) {
    const codigosDias = [dataAPI.list[4].weather[0].description,
    dataAPI.list[16].weather[0].description,
    dataAPI.list[24].weather[0].description,
    dataAPI.list[32].weather[0].description,
    dataAPI.list[39].weather[0].description];
    codigosDias.forEach((codigoDia, index) => {
        const enderecoDireitoImagens = imagens.find(img => img.descricao.includes(codigoDia));
        const dias = document.querySelector(`.d${index + 1}`);
        const previsoes = document.querySelector(`.previsao${index + 1}`);
        if (enderecoDireitoImagens && dias) {
            dias.style.backgroundImage = `url('${enderecoDireitoImagens.giffDia}')`;
            previsoes.src = enderecoDireitoImagens.iconDia;
        }
    });
}

function requisicaoDeDatas(datas) {
    let primeiroDia = datas.list[8].dt_txt.slice(0, 10);
    let segundoDia = datas.list[16].dt_txt.slice(0, 10);
    let terceiroDia = datas.list[24].dt_txt.slice(0, 10);
    let quartoDia = datas.list[32].dt_txt.slice(0, 10);
    datasFormatadas([primeiroDia, segundoDia, terceiroDia, quartoDia]);
}

function datasFormatadas(valores) {
    valores.forEach((element, index) => {
        let cortado = element.split('-');
        let reverso = cortado.reverse().join('-');
        exibirDatas[index].textContent = reverso;
    });
}

// function requisicaoMinimoMaximo(data){
//    let primeiroDiaMin = data.list[5].main.temp_min;
//    let segundoDiaMin = data.list[13].main.temp_min;
//    let terceiroDiaMin = data.list[21].main.temp_min;
//    let quartoDiaMin = data.list[29].main.temp_min;
//    minimo([primeiroDiaMin, segundoDiaMin, terceiroDiaMin, quartoDiaMin]);

//    let primeiroDiaMax = data.list[8].main.temp_max;
//    let segundoDiaMax = data.list[16].main.temp_max;
//    let terceiroDiaMax = data.list[24].main.temp_max;
//    let quartoDiaMax = data.list[32].main.temp_max;
//    maximo([primeiroDiaMax, segundoDiaMax, terceiroDiaMax, quartoDiaMax]);
// }

// function minimo(tempMin){
//     let previsaoMin = document.querySelectorAll('.previsaoMin');
//     tempMin.forEach((element, index) =>{
//         const converterNumber = parseFloat(element);
//         const array = [converterNumber.toFixed(1)]
//         previsaoMin[index].textContent = `Min: ${array}°C`;
//     });
// }

// function maximo(tempMax){
//     let previsaoMax = document.querySelectorAll('.previsaoMax');
//     tempMax.forEach((element, index) =>{
//         const converterNumber = parseFloat(element);
//         const array = [converterNumber.toFixed(1)];
//         previsaoMax[index].textContent = `Max: ${array}°C`;
//     });
// }

function requisicaoMinimoMaximo(data) {
    const temperaturasDiarias = [];

    // Iterar sobre os dias desejados (5 dias)
    for (let i = 0; i < 5; i++) {
        const diaAtual = data.list[i * 8].dt_txt.slice(0, 10);

        // Filtrar as temperaturas do dia atual
        const temperaturasDoDia = data.list.filter(item => item.dt_txt.includes(diaAtual));

        // Encontrar a menor e a maior temperatura do dia
        const tempMinima = Math.min(...temperaturasDoDia.map(item => item.main.temp_min));
        const tempMaxima = Math.max(...temperaturasDoDia.map(item => item.main.temp_max));
        const dataHora = temperaturasDoDia.length > 0 ? temperaturasDoDia[0].dt_txt : '';

        // Armazenar as temperaturas do dia atual
        temperaturasDiarias.push({ tempMinima, tempMaxima, dataHora });
        minimo(tempMinima, i);
        maximo(tempMaxima, i);
    }
    temperaturasDiarias.shift(1);
    console.log(temperaturasDiarias)
    // return temperaturasDiarias;
}
function minimo(tempMin, index) {
    const exibirTempMin = document.querySelectorAll(`.previsaoMin${index + 1}`);
    const converterNumber = parseFloat(tempMin);
    const temperaturaFormatada = converterNumber.toFixed(1);
    exibirTempMin.forEach((element) => {
        element.textContent = `Min: ${temperaturaFormatada}°C`
    })
}

function maximo(tempMax, index) {
    const exibirTempMax = document.querySelectorAll(`.previsaoMax${index + 1}`);
    const converterNumber = parseFloat(tempMax);
    const temperaturaFormatada = converterNumber.toFixed(1);
    exibirTempMax.forEach((element) => {
        element.textContent = `Max: ${temperaturaFormatada}°C`
    })
}

