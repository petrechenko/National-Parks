const form = document.querySelector('form');
const parkName = document.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let park = parkName.value;
    park = park.slice(0, 4);

    const url = 'https://developer.nps.gov/api/v1/parks?parkCode=' + park + '&api_key=[YOR KEY]';
    const alerts = 'https://developer.nps.gov/api/v1/alerts?parkCode=' + park + '&api_key=[YOUR KEY]';

    fetch(alerts)
        .then((response) => {
            return response.json();
        })
        .then((obj) => {
            document.querySelector('input').value = "";;
            if (obj.total == "0") {
                document.getElementById("alerts").innerHTML = "None";
            }
            for (elem in obj.data) {
                let li = document.createElement('li');
                let ul = document.getElementById("alerts");
                ul.appendChild(li);
                li.innerHTML += obj.data[elem].title;
            }
        })
        .catch(() => {
            alert("Invalid National Park Name");
        })

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(obj) {
            document.getElementById("name").innerHTML = obj.data[0].fullName;
            document.getElementById("description").innerHTML = obj.data[0].description;

            //show the buttons under
            if (obj) {
                const buttons = document.getElementById('buttons');
                buttons.style.display = 'block';
            }

            const weather = obj.data[0].weatherInfo;
            document.getElementById("weather").innerHTML = weather;

            //assign the links
            const webLink = obj.data[0].url;
            const directions = obj.data[0].directionsUrl;
            const website = document.getElementById('website');
            const dirButton = document.getElementById("Directions");
            website.setAttribute('href', webLink);
            dirButton.setAttribute('href', directions);
        })
        .catch(() => {
            alert("Invalid National Park Name");
        });
})
