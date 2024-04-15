//82cc6e6c461baf56a3103178e5838347
//Variáveis e seleção de elementos
const apiKey = "82cc6e6c461baf56a3103178e5838347";
const apiCountryUrl = "https://flagsapi.com/";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");


//Funções
const getWetherData = async(city) => {
    apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    return data;
}

const unsplashAccessKey = 'NgCgcLfRovsR_4FLYrcGpRI3NgjOPgJq3emxl3RjhCc';

const getCityImage = async (city) => {
    const unsplashURL = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashAccessKey}&orientation=landscape`;
    const response = await fetch(unsplashURL);
    const data = await response.json();
    return data.urls.regular;
};

const showWeatherData = async (city) => {
    try {
        const data = await getWetherData(city);

        if (data.cod === "404") {
            throw new Error("Essa cidade não existe. Por favor, verifique o nome da cidade e tente novamente.");
        }

        // Exibe a imagem da cidade como plano de fundo
        const cityImage = await getCityImage(city);
        document.body.style.backgroundImage = `url('${cityImage}')`;

        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute("src", `${apiCountryUrl}${data.sys.country}/flat/64.png`);
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;
        weatherContainer.classList.remove("hide");
    } catch (error) {
        console.error(error);
        alert(error.message); // Exibe uma mensagem de erro para o usuário
    }
}

//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})
