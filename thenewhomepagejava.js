const reports = [
    {
      lat: -26.2041,
      lng: 28.0473,
      message: "User reported a robbery on 09/04/2025"
    },
    {
      lat: -26.2,
      lng: 28.05,
      message: "User reported a car theft on 08/04/2025"
    }
  ];
  
  let selectedLocation = null;
  let map, panorama;
  
  document.getElementById("backToMapBtn").addEventListener("click", () => {
    document.getElementById("map").style.display = "block";
    document.getElementById("pano").style.display = "none";
    panorama.setVisible(false);
    document.getElementById("backToMapBtn").style.display = "none";
  });
  
  document.getElementById("pinLocationBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        selectedLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        map.setCenter(selectedLocation);
        alert("Location pinned!");
        SuggestionsForLocation(selectedLocation.lat, selectedLocation.lng);
      });
    } else {
      alert("Geolocation not supported.");
    }
  });
  
  document.getElementById("viewStreetBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        showStreetView(lat, lng);
        SuggestionsForLocation(lat, lng);
      });
    } else {
      alert("Geolocation not supported.");
    }
  });
  
  function initMap() {
  
    ///THE FORCE OF THE MAP IS JOHANNESBURG WITH 13 ZOOM INTO THE MAP //START(1)
    const joburg = { lat: -26.2041, lng: 28.0473 };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: joburg
    });
    /////////////////////////////////////////////////////////// //END(1)
  
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById(""),
      { visible: false }
    );
  
    map.setStreetView(panorama);
  
    /// GOES THROUGH THE REPORTS AND ADDS A MAKER ON THE MAP USING THE REPORTS LAT AND LONG //START(2)
    reports.forEach(report => {
      addMarker(report.lat, report.lng, report.message);
    });
    //////////////////////////////////////////////////////////// //END(2)
  
    /// LISTEN FOR A CLICK ON THE MAP AND RETRIVES THE LAT AND LONG //START(3)
    map.addListener("click", (event) => {
      selectedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      showStreetView(selectedLocation.lat, selectedLocation.lng);
      SuggestionsForLocation(selectedLocation.lat, selectedLocation.lng);
      alert(`Your Location Has Been selected`);
    });
    //////////////////////////////////////////////////////////////////// //END(3)
  
    ////// SUBMIT-REPORT IS CLICKED //START(4) 
    document.getElementById("crimeForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      if (!selectedLocation) {
        alert("Please select a location on the map or pin your location.");
        return;
      }
  
      /// INFORMATION THAT WILL BE USED FOR THE MESSAGE THAT WILL BE ON THE MARKER ON THE MAP //START(5)
      const type = document.getElementById("crimeType").value;
      const desc = document.getElementById("crimeDesc").value;
      const time = new Date().toLocaleString();
      const msg = `A User reported a ${type}: ${desc} at ${time}`;
      /////////////////////////////////////////////////////////////// //END(5)
  
      // CALLING addMaker() to ADD A MARKER, showStreetview() FOR STREET VIEW, 
      // SuggestionsForLocation() FOR SUGGESTIONS FOR SAFETY //START(6)
      addMarker(selectedLocation.lat, selectedLocation.lng, msg);
      showStreetView(selectedLocation.lat, selectedLocation.lng);
      SuggestionsForLocation(selectedLocation.lat, selectedLocation.lng);
      ///////////////////////////////////////////////////////////////////// //END(6)
  
      this.reset();
      selectedLocation = null;
  
    });
    //////////////////////////////////////////// //END(4)
  
  }
  
  //// THIS FUNCTION IS FOR ADDING A PIN ON THE MAP| CLICK ON THE ON MAP AND PIN MY LOCATION CALLS 
  /// THIS FUNCTION WITH THEIR LAT AND LONG AS PARAMETERS INCLUDING THE MSG TO PIN ON THE MAP //START(1)
  function addMarker(lat, lng, message) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map
    });
  
   
    /// LISTENS FOR A CLICK ON THE MARKER POPS THE MSG AND IT CALLS ShowStreetView() 
    // AND ShowSuggestionsForLocation() FUNCTIONS WITHE THE LAT AND LONG AS PARAMETERS //START(2)
    const infoWindow = new google.maps.InfoWindow({ content: message });
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
      showStreetView(lat, lng);
      SuggestionsForLocation(lat, lng);
    });
  
    reports.push({ lat, lng, message });
  }
  /////////////////////////////////////////////////////////////////////////////////////////// //END(2)
  
  
  /// THIS FUNCTION OPENS UP THE StreetViewService() USE THE LAT, LNG FROM addMaker() //START(1)
  function showStreetView(lat, lng) {
    alert("click ok")
    const service = new google.maps.StreetViewService();
    const location = { lat, lng };
    const radius = 50;
  
    /// //START(2)
    service.getPanorama({ location, radius }, (data, status) => {
      
      /// CHECKING IN THE STREET HAS STREET VIEW //START(3)
      if (status === google.maps.StreetViewStatus.OK) {
        panorama.setPosition(data.location.latLng);
        panorama.setVisible(true);
        document.getElementById("map").style.display = "none";
        document.getElementById("pano").style.display = "block";
        document.getElementById("backToMapBtn").style.display = "inline";
      } else {
        alert("Street View not available at this location.");
      }
      ////////////////////////////////////// //END(3)
  
    });
    ///////////////////////////////////////// //END(2)
  
  }
  //////////////////////////////////////// //END(1)
  
  
  //SUGGESTION ARE HERE GUYS //START(1)
  function SuggestionsForLocation(lat, lng) {
  
    ///FINDING REPORTS THAT ARE WITHIN 1KM, AND GOES TO getDistanceFromLatLngInKm() FOR CALCULATIONS //START(2)
    const maxDistance = 1; // in km 
    const nearbyReports = reports.filter(report => {
      const distance = getDistanceFromLatLngInKm(lat, lng, report.lat, report.lng);
      return distance <= maxDistance;
    });
    //////////////////////////////////////// END(2)
  
    //THIS HAPPEN AFTER THE LOCATION AROUND WITHIN 1KM HAVE BEEN FOUND OR NOT //START(3)
    const suggestionList = document.getElementById("suggestionList");
    suggestionList.innerHTML = "";
  
    if (nearbyReports.length === 0) {
      suggestionList.innerHTML = "<li>No recent reports nearby.</li>";
    } else {
  
      ///////// ///START(4)
      nearbyReports.forEach(report => {
        const li = document.createElement("li");
        li.textContent = report.message;
        suggestionList.appendChild(li);
  
        //CHECKING FOR SPECIFIC WORD IN THE CRIME TYPE TO PROVIDED TIPS //START(5)
        const Msg = report.message.toLowerCase();
        if (Msg.includes("robbery") || Msg.includes("theft") || Msg.includes("stole")) {
          const tips = [
            "Walk next to open shops",
            "Avoid using your phone",
            "Put your phone on silent",
            "Dont wear lavish jewellery",
            "Leave your ear-pod at home as this could attract a mugger",
            "Carry a pepper spray",
            "Walk along streets that are busy and avoid shortcuts through quiet lanes"
          ];
          tips.forEach(tip => {
            const tipItem = document.createElement("li");
            tipItem.textContent = "!!" + tip;
            suggestionList.appendChild(tipItem);
          });
          
        }
        if (Msg.includes("rape") || Msg.includes("sexual") || Msg.includes("kidnapping")) {
          const tips = [
            "Avoid late-night movement",
            "Avoid walking alone",
            "Share your location with a friend",
            "Carry a pepper spray",
            "Walk along streets that are busy and avoid shortcuts through quiet lanes"
          ];
          tips.forEach(tip => {
            const tipItem = document.createElement("li");
            tipItem.textContent = "NB!" + tip;
            suggestionList.appendChild(tipItem);
          });
      
      }
        //////////////////////////////////////// //END(5)
  
      });
      //////////////////////////////////////// ///END(4)
  
    }
    ///////////////////////////////////////////// //END(3)
  
  }
  ///////////////////////////////////////////////////////// //END(1)
  
  
  //FORMULA TO FIND AREAS AROUND THE LOCATION WITHIN 1 KM //START(1)
  function getDistanceFromLatLngInKm(lat1, lng1, lat2, lng2) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  ////////////////////////////////////////////////////////// //END(1)