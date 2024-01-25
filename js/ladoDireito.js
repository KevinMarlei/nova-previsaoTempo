const forecast = 'https://api.openweathermap.org/data/2.5/forecast';
async function apiForecast(local, estado, pais) {
    try {
        const response = await axios.get(forecast, {
            params: {
                q: `${local}${estado ? ',' + estado : ''},${pais}`,
                appid: apiKey,
                lang: 'pt_br',
                units: 'metric',
            }
        });
        const responseData = response.data;
        console.log(responseData);
        datas(responseData);
    } catch (error) {
        console.error('Erro na requisição api', error);
    }
}

function datas(response) {
    let datasSeparadas = [];
    for (let i = 0; i < 5; i++) {
        const diaAtual = response.list[i * 8].dt_txt.slice(0, 10);
        const datas = response.list.filter(item => item.dt_txt.includes(diaAtual));
        console.log(datas);
        
        // Verifica se a data já foi adicionada
        const dataExistente = datasSeparadas.find(item => item[0].dt_txt.includes(diaAtual));
        if (!dataExistente) {
            datasSeparadas.push(datas);
        }
    }
    console.log(datasSeparadas);
    exibirDatas(datasSeparadas);
    minMax(datasSeparadas)
}


function exibirDatas(responseDatas) {
    let datas = document.querySelectorAll(`.datas`);
    if (Array.isArray(responseDatas) && responseDatas.length > 1) {
        const dataZero = responseDatas.slice(1);
        const datasPorDia = [dataZero[0][0], dataZero[1][0], dataZero[2][0], dataZero[3][0]];
        console.log(datasPorDia);
        datas.forEach((element, index) => {
            const dataOriginal = datasPorDia[index].dt_txt.slice(0, 10);
            const [ano, mes, dia] = dataOriginal.split('-');
            const dataFormatada = `${dia}-${mes}-${ano}`;
            element.textContent = dataFormatada;
            renderizarImagensLadoDireito(dataFormatada);
        });
        armazenarIconPorDia(datasPorDia);
    }
}

function renderizarImagensLadoDireito(element){
    console.log(element)
}

const previsaoLocalStorage = apiForecast(localStorage.getItem("localidade"))
if (previsaoLocalStorage) {
    exibirDatas(previsaoLocalStorage);
} else {
    console.error('Sem local armazenado no localStorage');
}
