const reports = [
    {
      lat: -26.2041,
      lng: 28.0473,
      message: "User123 logged in a mugging on this location at 09/04/2025"
    },
    {
      lat: -26.2,
      lng: 28.05,
      message: "User456 reported a car theft here at 08/04/2025"
    }
  ];
  
  let selectedLocation = null;
  let map; // make map globally accessible
  
  function initMap() {
    const joburg = { lat: -26.2041, lng: 28.0473 };
  
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: joburg
    });
  
    // Add dummy markers
    reports.forEach(report => {
      addMarker(report.lat, report.lng, report.message);
    });
  
    // Handle user click to select crime location
    map.addListener('click', (event) => {
      selectedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
  
      alert(`Selected location at: ${selectedLocation.lat}, ${selectedLocation.lng}`);
    });
  
    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
  
          new google.maps.Marker({
            position: userPos,
            map: map,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            },
            title: "Your Location"
          });
  
          map.setCenter(userPos);
        },
        () => {
          alert("Geolocation failed or was denied.");
        }
      );
    } else {
      alert("Your browser doesn't support geolocation.");
    }
  
    // Handle form submission
    document.getElementById("crimeForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      if (!selectedLocation) {
        alert("Please click on the map to select the crime location.");
        return;
      }
  
      const crimeType = document.getElementById("crimeType").value;
      const crimeDesc = document.getElementById("crimeDesc").value;
  
      const timestamp = new Date().toLocaleString();
      const message = `UserXYZ reported a ${crimeType}: ${crimeDesc} at ${timestamp}`;
  
      addMarker(selectedLocation.lat, selectedLocation.lng, message);
  
      // Reset form & selection
      this.reset();
      selectedLocation = null;
    });
  }
  
  // Helper function to add markers
  function addMarker(lat, lng, message) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  
    const infoWindow = new google.maps.InfoWindow({
      content: message
    });
  
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }
  