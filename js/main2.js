const apiKey = '38f1b1a71474f8940ad30733832dcaea';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

async function apiData(local, estado, pais) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: `${local}${estado ? ',' + estado : ''},${pais}`,
        appid: apiKey,
        lang: 'pt_br',
        units: 'metric',
      }

    });
    const responseData = response.data;
    renderizarLadoEsquerdo(responseData);
  } catch (error) {
    console.error('Erro na requisição api', error)
    alert('Nome do local inválido.\nVocê pode utilizar: 1-Cidade ou bairro, sufixo do estado, sufixo do país;\n2-Estado ou Estado, sufixo do país;\n3-País.');
  }
}

async function localStorageReserv(local, estado, pais) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: `${local}${estado ? ',' + estado : ''},${pais}`,
        appid: apiKey,
        lang: 'pt_br',
        units: 'metric',
      }

    });
    const responseData = response.data;

  } catch (error) {
    console.error('Erro na requisição api', error);
    alert('Nome do local inválido.\nVocê pode utilizar: 1-Cidade ou bairro, sufixo do estado, sufixo do país;\n2-Estado ou Estado, sufixo do país;\n3-País.');
  }
}

let localidade;
//caixa img-clima
const nomeLocal = document.querySelector('.nome-local');
const pais = document.querySelector('.pais');
const imgClima = document.querySelector('.icon-clima');
const descricaoClima = document.querySelector('.descricao-clima');
//caixa de busca
const caixaBusca = document.querySelector('.caixa-busca');
const adicionarLocal = document.querySelector('.img-adicionar');
const inputBusca = document.querySelector('.input-busca');
const btnBusca = document.querySelector('.img-busca');
//caixa temperatura
const imgPositivo = document.querySelector('.positivo');
const imgNegativo = document.querySelector('.negativo');
const temperaturaAtual = document.querySelector('.temperatura-atual');
//caixa min-max que só contém a sensação térmica
const sensacaoTermica = document.querySelector('.sensacao-termica');
//caixa detalhes
const ventos = document.querySelector('.vento');
const humidade = document.querySelector('.humidade');
const visibilidade = document.querySelector('.visibilidade');
const ultiams3Horas = document.querySelector('.ultimas3Horas');
//elementos criados dinâmicamente para favoritar local e renderizar dados ao iniciar seção
const inputCriado = document.createElement('input');
const botaoOK = document.createElement('button');
const cancelarAdd = document.createElement('button');
const imgCancelar = document.createElement('img');
//background geral do lado esquerdo
const ladoEsquerdoBackground = document.querySelector('.lado-esquerdo');

function renderizarAddClick() {
  adicionarLocal.addEventListener('click', (event) => {
    event.preventDefault();
    caixaBusca.appendChild(inputCriado);
    caixaBusca.appendChild(botaoOK);
    cancelarAdd.appendChild(imgCancelar)
    caixaBusca.appendChild(cancelarAdd);
    inputCriado.placeholder = 'Adicione ou modifique o local desejado'
    imgCancelar.src = './icon/cancelar.svg';
    botaoOK.textContent = 'OK'
    inputBusca.style.display = 'none';
    btnBusca.style.display = 'none';
    adicionarLocal.style.display = 'none';
  });
};

function desrenderizarAddClick() {
  cancelarAdd.addEventListener('click', (event) => {
    event.preventDefault();
    caixaBusca.removeChild(inputCriado);
    caixaBusca.removeChild(botaoOK);
    caixaBusca.removeChild(cancelarAdd);
    cancelarAdd.removeChild(imgCancelar);

    inputBusca.style.display = 'flex';
    inputBusca.value = '';
    btnBusca.style.display = 'flex';
    adicionarLocal.style.display = 'flex';
  });
}

botaoOK.addEventListener('click', async (event) => {
  event.preventDefault();
  localidade = inputCriado.value;
  if (!localidade) {
    alert('Campo vazio ou local inexistente. Favor inserir um nome de local válido!');
    return;
  }
  const response = await localStorageReserv(localidade);
  if (!response) {
    localStorage.setItem("localidade", localidade);

    inputCriado.value = '';
    caixaBusca.removeChild(inputCriado);
    caixaBusca.removeChild(botaoOK);
    caixaBusca.removeChild(cancelarAdd);
    cancelarAdd.removeChild(imgCancelar);
    inputBusca.style.display = 'flex';
    btnBusca.style.display = 'flex';
    adicionarLocal.style.display = 'flex';
    return;
  }
});

inputCriado.addEventListener('keyup', async (e) => {
  if (e.key === 'Enter') {
    localidade = inputCriado.value;
    if (!localidade) {
      alert('Campo vazio ou local inexistente. Favor inserir um nome de local válido!');
      return;
    }
    const response = await localStorageReserv(localidade);
    if (!response) {
      localStorage.setItem("localidade", localidade);
      inputCriado.value = '';
      caixaBusca.removeChild(inputCriado);
      caixaBusca.removeChild(botaoOK);
      caixaBusca.removeChild(cancelarAdd);
      cancelarAdd.removeChild(imgCancelar);
      inputBusca.style.display = 'flex';
      btnBusca.style.display = 'flex';
      adicionarLocal.style.display = 'flex';
      return;
    }
  }
});

function fetchLocalPesquisa(value) {
  if (!value) {
    console.error('Campo de busca vazio');
    alert("Campo de busca vazio!")
    return;
  }
  apiData(value);
  apiForecast(value);
}

btnBusca.addEventListener('click', (e) => {
  e.preventDefault();
  fetchLocalPesquisa(inputBusca.value.trim());
  inputBusca.value = '';
});

inputBusca.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    fetchLocalPesquisa(inputBusca.value.trim());
    inputBusca.value = '';
  }
});

function renderizarLadoEsquerdo(response) {
  const tempAPI = response.list[0].main.temp;

  function renderTextosLadoEsquerdo() {
    nomeLocal.textContent = response.city.name
    pais.textContent = response.city.country;
    descricaoClima.textContent = letraMaiuscula(response.list[0].weather[0].description);
    temperaturaAtual.textContent = `${tempAPI.toFixed(1)}°C`;
    ventos.textContent = `Ventos: ${response.list[0].wind.speed.toFixed(1)}Km/h ~ ${response.list[0].wind.deg}°`;
    humidade.textContent = `Humidade: ${response.list[0].main.humidity.toFixed(1)}%`;
    visibilidade.textContent = `Visibilidade: ${(response.list[0].visibility / 1000).toFixed(1)}Km`;
    sensacaoTermica.textContent = `Sensação térmica: ${response.list[0].main.feels_like.toFixed(1)}°C`;
    ultiams3Horas.textContent = `Chuvas nas últimas 3 horas: ${response.list[0].rain ? response.list[0].rain['3h'] + ' mm' : '0 mm'}`;

  }
  function imagensClima() {
    const descricaoClimaAPI = response.list[0].weather[0].description;
    const urlImagens = imagens.find(img => img.descricao.includes(descricaoClimaAPI));
    const dia = response.list[0].sys.pod.includes('d');

  if (dia) {
    imgClima.src = urlImagens.iconDia;
    ladoEsquerdoBackground.style.backgroundImage = `url('${urlImagens.giffDia}')`;
  } else {
    imgClima.src = urlImagens.iconNoite;
    ladoEsquerdoBackground.style.backgroundImage = `url('${urlImagens.giffNoite}')`;
  }
  if (tempAPI >= 0) {
    imgPositivo.style.display = 'flex';
    imgNegativo.style.display = 'none';
  } else {
    imgPositivo.style.display = 'none';
    imgNegativo.style.display = 'flex';
  }
  }
  renderTextosLadoEsquerdo();
  imagensClima();
  const lat = response.city.coord.lat;
  const lon = response.city.coord.lon;
  exibirMapa(lat, lon)
}

function letraMaiuscula(letra1) {
  return letra1.charAt(0).toUpperCase() + letra1.slice(1);
}

apiData(localStorage.getItem("localidade"));
renderizarAddClick();
desrenderizarAddClick();