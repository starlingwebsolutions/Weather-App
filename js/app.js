window.addEventListener('load', ()=> {
    let log;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {            
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/6c5d019c7cea3480491fd6b2ea0b49d6/${lat},${long}`;
        
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                // Formula for celsius
                let celsius = Math.floor((temperature -32) * (5 / 9));
                // Set DOM Elements from the API
                temperatureDegree.textContent = celsius;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Set Icon
                setIcons(icon, document.querySelector('.icon'));
                
                // Change temperature to Celsius/Ferenheit
                degreeSection.addEventListener("click", ()=>{
                    if(degreeSpan.textContent === "F"){
                        degreeSpan.textContent = "C";
                        temperatureDegree.textContent = celsius;
                    }else{
                        degreeSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });

            });
        });
        
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "pink"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(document.querySelector(".icon"), Skycons[currentIcon]);
    }
});