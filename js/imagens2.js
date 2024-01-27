const imagens = [
    {
        descricao: ['nuvens dispersas', 'poucas nuvens', 'nuvens quebradas', 'algumas nuvens'],
        giffDia: './giff/dia-parcialmente-nublado.gif',
        giffNoite: './giff/noite-parcialmente-nublado.gif',
        iconDia: './icon/dia-parcialmente-nublado.svg',
        iconNoite: './icon/noite-parcialmente-nublado.svg'
    },
    {
        descricao: 'nublado',
        giffDia: './giff/dia-nublado.gif',
        giffNoite: './giff/noite-nublado.gif',
        iconDia: './icon/nublado.svg',
        iconNoite: './icon/noite-nublado.svg'
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

function armazenarIconPorDia(response) {
    let passarParaARray = [];
    response.forEach((element, index) => {
        const iconDoDia = element.weather[0];
        console.log(`${index}: ${iconDoDia}`);
        passarParaARray.push(iconDoDia);
    });
    console.log(passarParaARray);
    renderizarImgPorDia(passarParaARray)
}

function renderizarImgPorDia(response) {
    console.log(response, ' AQUIIIIIIIIIIII')
    response.forEach((element, index) => {
        const descricaoClimaDia = element.description;
        const enderecoDireitoImagens = imagens.find(img => img.descricao.includes(descricaoClimaDia));
        const taDia = element;
        const dias = document.querySelector(`.d${index + 1}`);
        const previsoes = document.querySelector(`.previsao${index + 1}`);
        const prev = document.querySelector(`.prev${index + 1}`);
        if (enderecoDireitoImagens && taDia) {
            dias.style.backgroundImage = `url('${enderecoDireitoImagens.giffDia}')`;
            previsoes.src = enderecoDireitoImagens.iconDia;
            prev.textContent = letraMaiuscula(descricaoClimaDia);
            console.log(`Imagem para o dia ${index}: ${enderecoDireitoImagens.iconDia}`);
        } else {
            console.log(`Não foi encontrada uma imagem correspondente para o dia ${index}`);
        }
    });
}

function minMax(response) {
    const diasSeguintes = response.slice(1);

    for (let i = 0; i < 4; i++) {
        // Verifica se o subarray atual existe
        if (!diasSeguintes[i] || !diasSeguintes[i][0]) {
            console.log('Subarray ou elemento [0] não encontrado. Pulando para a próxima iteração.');
            continue; // Pule para a próxima iteração do loop
        }

        const diaAdia = diasSeguintes[i][0].dt_txt.slice(0, 10);
        const temperaturasDoDia = diasSeguintes[i]
            .filter(item => item.dt_txt.includes(diaAdia))
            .map(item => item.main.temp);

        const temperaturaMinima = Math.min(...temperaturasDoDia);
        const temperaturaMaxima = Math.max(...temperaturasDoDia);

        console.log(`Para o dia ${diaAdia}: Temperatura Mínima: ${temperaturaMinima}°C, Temperatura Máxima: ${temperaturaMaxima}°C`);
        minimo(temperaturaMinima, i);
        maximo(temperaturaMaxima, i);
    }
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