async function getlocation() {
    if(navigator.geolocation){
    try {
        const response = await fetch("https://ipapi.co/json/");
        
        // Ensure response is valid
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        let city = data.city
        let region = data.region 
        let country = data.country_name

        let divr = document.getElementsByClassName("printlocation")
        
        divr[0].innerHTML = `<p class="city">${city}, ${region}, ${country}</p>`;
        
    } catch (error) {
        console.error("Error fetching location:", error);
    }
}
}
