let map;
let selectedLocation = null;
emailjs.init("ZfrdBBrSpcFvuZ7jc");

// Initializing the map and center on user's location
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: -26.2041, lng: 28.0473 }, // Default: Johannesburg
  });

  //Security points
  const securityPoints = [
  { lat: -26.2041, lng: 28.0473, name: "Bree Street Taxi Rank" },
  { lat: -26.1952, lng: 28.0341, name: "Gandhi Square" },
  { lat: -26.1898, lng: 28.0456, name: "Park Station" },
  { lat: -26.1982, lng: 28.0557, name: "MTN Taxi Rank" },
  { lat: -26.2100, lng: 28.0371, name: "Carlton Centre" },
  { lat: -26.2028, lng: 28.0427, name: "Joburg Central Police" },
  { lat: -26.2135, lng: 28.0519, name: "Library Gardens" }
];

securityPoints.forEach((point) => {
  const marker = new google.maps.Marker({
    position: { lat: point.lat, lng: point.lng },
    map: map,
    title: point.name,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `<strong>Security Point:</strong> ${point.name}`
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
});

  // Allow user to click on map to select a location
  map.addListener("click", function (event) {
    selectedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    addMarker(selectedLocation.lat, selectedLocation.lng, "Selected Location");
  });

  // Fetch existing reports and display them
  fetchReports();

  // Form submission
  document.getElementById("crimeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const crimeType = document.getElementById("crimeType").value.trim();
    const crimeDesc = document.getElementById("crimeDesc").value.trim();

    if (!crimeType || !crimeDesc) {
      alert("Please fill in both crime type and description.");
      return;
    }

    if (!selectedLocation) {
      alert("Please click on the map or use 'Pin My Location' to select a location.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("crimeType", crimeType);
    formData.append("crimeDesc", crimeDesc);
    formData.append("latitude", selectedLocation.lat);
    formData.append("longitude", selectedLocation.lng);

    fetch("../INCLUDES/submit_report.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);

        if (data.success) {
           emailjs.send("service_6i0o1z3", "template_siezwvd", {
            to_email: "neighbourguard@gmail.com",
            message: `New crime report: ${crimeType} - ${crimeDesc} at coordinates ${selectedLocation.lat}, ${selectedLocation.lng}`})
            .then(function(response) {
        console.log("EMAIL SENT SUCCESSFULLY:", response);
        alert("Report has been submitted and emergency officials have been notified");
        })
        .catch(function(error) {
        console.error("EMAIL SENDING FAILED:", error);
        alert("Report submitted, but there was an issue notifying emergency officials.");
        });

          fetchReports();
          selectedLocation = null;

          document.getElementById("crimeForm").reset();
        }
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
        alert("An error occurred while submitting the report.");
      });
  });

  // Pin user's current location
  document.getElementById("pinLocationBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          selectedLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(selectedLocation);
          addMarker(selectedLocation.lat, selectedLocation.lng, "Your Location");
        },
        function () {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });
}

// Add marker to the map
function addMarker(lat, lng, title) {
  new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: title,
  });
}

// Fetch and display all reports from the DB
function fetchReports() {
  fetch("../INCLUDES/fetch_reports.php")
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        console.error("Expected an array from fetch_reports.php", data);
        return;
      }

      const allReportsDiv = document.getElementById("allReportsContainer");
      allReportsDiv.innerHTML = "";

      data.forEach((report) => {
        const lat = parseFloat(report.latitude);
        const lng = parseFloat(report.longitude);
        const msg = `${report.fullname} ${report.lastname} submitted a report: ${report.crimeType} - ${report.crimeDesc}`;
        addMarker(lat, lng, msg);

        const p = document.createElement("p");
        p.textContent = msg;
        allReportsDiv.appendChild(p);
      });
    })
    .catch((error) => {
      console.error("Error fetching reports:", error);
    });
}

// Make initMap globally available for Google Maps callback
window.initMap = initMap;


