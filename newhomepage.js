const reports = [
  {
    lat: -26.2041,
    lng: 28.0473,
    message: "User reported a robbery on 09/04/2025",
    email: "kabumbuyi85@gmail.com",
    user: "Kabu",
    case_number: ""

  },
  {
    lat: -26.2,
    lng: 28.05,
    message: "User reported a car theft on 08/04/2025",
    email: "mdingibulela35@gmail.com",
    user: "Bulela",
    case_number: "c123efgrcr"
  }
];
//THESE ARE THE LONG AND LAT WE ARE GOING TO USE TO STORE ALONG THE USER NAME//START(1)
const longDB = null;
const latDB = null;
/////////////////////////////////////////////////////////////////////////// //END(1)

let selectedLocation = null;
let map, panorama;


/// THE FUNCTION FOR SENDING THE AUTO EMAIL TO REGISTERED USERS EMAILS //START(1)
function sendEmail(emails,users) {
  const templateParams = {
    name: users,
    email: emails,
    cc_email:"siphomvuma@gmail.com"
  };

  emailjs.send("service_wv9py4j", "template_ror4z9z", templateParams)
    .then(response => {
      console.log("SUCCESSFUL", response.status, response.text);
    })
    .catch(error => {
      console.error("UNSUCCESSFUL", error);
    });
}
////////////////////////////////////////////////////////////// //END(1)


//// HIDES THE STREET DIV , SHOWS THE MAP DIV AND HIDES THE BUTTON  //START(2)
document.getElementById("backToMapBtn").addEventListener("click", () => {
  document.getElementById("map").style.display = "block";
  document.getElementById("street").style.display = "none";
  panorama.setVisible(false);
  document.getElementById("backToMapBtn").style.display = "none";
});
/////////////////////////////////////////////////////////////////// //END(2)



document.getElementById("pinLocationBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      selectedLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      // APPENDING THE LONG AND LAT TO THE VARIABLE THAT WILL BE USED FOR THE DATABASE //START(1)
      if(longDB === null && latDB === null){
        longDB=selectedLocation.lng;
        latDB= selectedLocation.lat
      }
      //////////////////////////////////////////////////////////////////////////////// //END(1)

      console.log(selectedLocation.lat,selectedLocation.lng)// CHECK IN INSPECTOR

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

      //THESE ARE THE LONG AND LAT WE ARE GOING TO USE TO STORE ALONG THE USER NAME//START(1)
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      //////////////////////////////////////////////////////////////////////////// //END(1)

      // APPENDING THE LONG AND LAT TO THE VARIABLE THAT WILL BE USED FOR THE DATABASE //START(2)
      if(longDB === null && latDB === null){
        longDB = lng
        latDB = lat
      }
      //////////////////////////////////////////////////////////////////////////////// //END(2)


      console.log(lat,lng)// CHECK IN INSPECTOR

      showStreetView(lat, lng);
      SuggestionsForLocation(lat, lng);
    });
  } else {
    alert("Geolocation not supported.");
  }
});


/// THE VIEW OF THE MAP AT THE START ///START(1)
function initMap() {

  ///THE FORCE OF THE MAP IS JOHANNESBURG WITH 13 ZOOM INTO THE MAP //START(2)
  const joburg = { lat: -26.2041, lng: 28.0473 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: joburg
  });
  /////////////////////////////////////////////////////////// //END(2)

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("street"),
    { visible: false }
  );

  map.setStreetView(panorama);


  reports.forEach(report => {
    const Warning = report.case_number
    if(Warning.length!==10){
      addMarker(report.lat, report.lng, report.message +": Warning");
    }
    addMarker(report.lat, report.lng, report.message +": Verified Crime");
  });

  /// LISTEN FOR A CLICK ON THE MAP AND RETRIVES THE LAT AND LONG //START(1)
  map.addListener("click", (event) => {

    //THESE ARE THE LONG AND LAT WE ARE GOING TO USE TO STORE ALONG THE USER NAME//START(2)
    selectedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    /////////////////////////////////////////////////////////////////////// //END(2)

    // APPENDING THE LONG AND LAT TO THE VARIABLE THAT WILL BE USED FOR THE DATABASE //START(3)
    if(longDB === null && latDB === null){
        longDB=selectedLocation.lng;
        latDB= selectedLocation.lat
      }
      //////////////////////////////////////////////////////////////////////////////// //END(3)
    addMarker(selectedLocation.lat, selectedLocation.lng, msg);
    showStreetView(selectedLocation.lat, selectedLocation.lng);
    SuggestionsForLocation(selectedLocation.lat, selectedLocation.lng);

    alert(`Your Location Has Been selected`);
  });
  //////////////////////////////////////////////////////////////////// //END(1)


  ////// SUBMIT-REPORT IS CLICKED ////////////////////START(1) 
  document.getElementById("crimeForm").addEventListener("submit", function (e) {
    e.preventDefault();


    if (!selectedLocation) {
      alert("Please select a location on the map or pin your location.");
      return;
    }


    /// INFORMATION THAT WILL BE USED FOR THE MESSAGE THAT WILL BE ON THE MARKER ON THE MAP //START(2)
    const type = document.getElementById("crimeType").value;
    const desc = document.getElementById("crimeDesc").value;
    const time = new Date().toLocaleString();
    const msg = `A User reported a ${type}: ${desc} at ${time}`;

    //GOING THROUGH REPORTS AND USING THE LNG AND LAT TO PIN LOCATION ON THE MAP //START(3)
    reports.forEach(report => {
      const Warning = report.case_number
      if(Warning.length!==10){
        addMarker(report.lat, report.lng, report.message +": Warning");
      }
      addMarker(report.lat, report.lng, report.message +": Verified Crime");
    });
    //////////////////////////////////////////////////////////////////////////// //END(3)

    
    /////////////////////////////////////////////////////////////// //END(2)

    // CALLING addMaker() to ADD A MARKER, showStreetview() FOR STREET VIEW, 
    // SuggestionsForLocation() FOR SUGGESTIONS FOR SAFETY ///////////////START(4)
    addMarker(selectedLocation.lat, selectedLocation.lng, msg);
    showStreetView(selectedLocation.lat, selectedLocation.lng);
    SuggestionsForLocation(selectedLocation.lat, selectedLocation.lng);
    ///////////////////////////////////////////////////////////////////// //END(4)

    /// GOING THROUGH THE REPORTS AND CHECK WHETHER THEY HAVE AN EMAIL TO SEND TO AND A USERNAME //START(5) 
    reports.forEach(report => {
      const emails = report.email
      if(emails.includes("@")){
        const users =report.user;
       // sendEmail(emails,users) // >>>>> EMAIL IS HERE <<<<
      }
    ///////////////////////////////////////////////////////////////////////////////////// //END(5)

    });
    
    

    this.reset();
    selectedLocation = null;

  });
  //////////////////////////////////////////// //END(1)

}
/////////////////////////////////////////////////////////////////////////////////////// //END(1)

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
      document.getElementById("street").style.display = "block";
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