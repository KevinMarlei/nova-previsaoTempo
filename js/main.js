const apiKey = '38f1b1a71474f8940ad30733832dcaea';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function apiData(local) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: local,
        appid: apiKey,
        lang: 'pt_br',
        units: 'metric'
      }
    });
    const responseData = response.data;
    if (responseData.name.toLowerCase() === local.toLowerCase()) {
      console.log(responseData);
      renderizarImagens(responseData);
      descricoesClima(responseData);
      apiForecast(local)
    }
  } catch (error) {
    console.error('Erro na requisição', error);
    alert('Nome inválido. Favor insira um nome válido')
  }
}

function fetchLocalPesquisa(value) {
  if (!value) {
    console.error('Campo de busca vazio');
    return;
  }
  apiData(value);
}

function pesquisarLocal() {
  const botaoBusca = document.querySelector('.img-busca');
  const inputBusca = document.querySelector('.input-busca');

  botaoBusca.addEventListener('click', () => {
    if (inputBusca.value === '') return alert('Campo de busca vazio. Informe um nome de País, Cidade ou Bairro');
    fetchLocalPesquisa(inputBusca.value.trim());
    inputBusca.value = '';
  });

  inputBusca.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (inputBusca.value === '') return alert('Campo de busca vazio. Informe um nome de País, Cidade ou Bairro');
      fetchLocalPesquisa(inputBusca.value.trim());
      inputBusca.value = '';
    }
  })
}

const nomeLocal = document.querySelector('.nome-local');
const nomePais = document.querySelector('.pais');
const descricaoClima = document.querySelector('.descricao-clima');
const iconClima = document.querySelector('.icon-clima');
const ladoEsquerdoBackground = document.querySelector('.lado-esquerdo');
const imgPositivo = document.querySelector('.positivo');
const imgNegativo = document.querySelector('.negativo');

function renderizarImagens(render) {
  const responseData = render;
  const descricaoClimaAPI = responseData.weather[0].description;
  const enderecoImagens = imagens.find(img => img.descricao.includes(descricaoClimaAPI));
  const codigoIcon = responseData.weather[0].icon;
  const dia = codigoIcon.includes('d');
  const tempAPI = responseData.main.temp;

  nomeLocal.textContent = responseData.name;
  nomePais.textContent = responseData.sys.country;
  descricaoClima.textContent = letraMaiuscula(descricaoClimaAPI);

  if (dia && tempAPI >= '0') {
    iconClima.src = enderecoImagens.iconDia;
    ladoEsquerdoBackground.style.backgroundImage = `url('${enderecoImagens.giffDia}')`;
  } else {
    iconClima.src = enderecoImagens.iconNoite;
    ladoEsquerdoBackground.style.backgroundImage = `url('${enderecoImagens.giffNoite}')`;
  }
  if(tempAPI >= 0){
    imgPositivo.style.display = 'flex';
    imgNegativo.style.display = 'none';
  }else{
    imgPositivo.style.display = 'none';
    imgNegativo.style.display = 'flex';
  }
}

function letraMaiuscula (letra1){
  return letra1.charAt(0).toUpperCase()+letra1.slice(1);
}

let temperaturaAtual = document.querySelector('.temperatura-atual');
let sensacaoTermica = document.querySelector('.sensacao-termica');
let ventos = document.querySelector('.vento');
let humidade = document.querySelector('.humidade');
let visibilidade = document.querySelector('.visibilidade');
function descricoesClima(response) {
  temperaturaAtual.textContent = response.main.temp.toFixed(1) + '°C';
  sensacaoTermica.textContent = `Sensação Térmica: ${response.main.feels_like.toFixed(1)}°C`;
  ventos.textContent = `Ventos: ${response.wind.speed} Km/h`;
  humidade.textContent = `Humidade do ar: ${response.main.humidity}%`;
  visibilidade.textContent = `Visibilidade: ${(response.visibility / 1000).toFixed(1)} Km`;
}
pesquisarLocal();