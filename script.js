function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "a19af51faae547c58081d9b4929b8da2"; // Your API Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("error").innerText = "City not found!";
        document.getElementById("weather-box").classList.add("hide");
        return;
      }

      document.getElementById("error").innerText = "";
      document.getElementById("weather-box").classList.remove("hide");

      document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
      document.getElementById("temp").innerText = data.main.temp;
      document.getElementById("feels").innerText = data.main.feels_like;
      document.getElementById("humidity").innerText = data.main.humidity;
      document.getElementById("wind").innerText = data.wind.speed;
      document.getElementById("description").innerText = data.weather[0].description;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("flag").src = `https://flagcdn.com/48x36/${data.sys.country.toLowerCase()}.png`;

      // ✅ Fix: define the condition
      const condition = data.weather[0].main.toLowerCase();

      // Clear previous animations
      document.getElementById("sun").classList.add("hide");
      document.querySelector(".rain")?.classList.add("hide");
      document.querySelector(".umbrella-man")?.classList.add("hide");

      if (condition.includes("clear")) {
        document.getElementById("sun").classList.remove("hide");
      } else if (condition.includes("rain")) {
        document.querySelector(".rain").classList.remove("hide");
      } else if (condition.includes("wind")) {
        document.querySelector(".umbrella-man").classList.remove("hide");
      }

      const date = new Date();
      document.getElementById("time").innerText = date.toLocaleTimeString();
    })
    .catch(err => {
      document.getElementById("error").innerText = "Something went wrong!";
      document.getElementById("weather-box").classList.add("hide");
    });
}
