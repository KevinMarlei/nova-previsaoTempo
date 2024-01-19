const apiKey = '38f1b1a71474f8940ad30733832dcaea';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const local = pos.coords;
  console.log('Latitude JS:', local.latitude);
  console.log('Longitude JS:', local.longitude);
  const latitude = local.latitude;
  const longitude = local.longitude;
  apiData(latitude, longitude)
}

navigator.geolocation.watchPosition(success, error, options);
function error(){

}
async function apiData(lat, lon){
  const response = await axios.get(API_URL, {
    params:{
      lat: lat,
      lon: lon,
      appid: apiKey,
      lang: 'pt_br',
      units: 'metrics',
    }
  });
  const responseData = response.data;
  console.log(responseData)
}

