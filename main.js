
const corsProxy = "https://cors-anywhere.herokuapp.com/";
const rootUrl = "https://www.trentbarton.co.uk/RTILiveTimings.aspx";

const getAllStops = "?m=GetStopsForMap&isService=false";
const getStop = "?m=GetRtiFull&stop=";


function getStoreageItem(name, defaultValue) {
    var result = JSON.parse(window.localStorage.getItem(name));
    if (result) {
        return result
    } else {
        return defaultValue;
    }
};


function setStoreageItem(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
};


(function getStops() {
  const urlParams = new URLSearchParams(window.location.search);
  const lastStopData = getStoreageItem("lastStopData", {})
  var stopCode = (urlParams.get('stop') || "").toLowerCase();

  if (stopCode === lastStopData.C) {
    updateDetails(lastStopData.Id);
    return;
  };

  if (!stopCode && lastStopData.Id) {
    updateDetails(lastStopData.Id);
    return;
  }

  fetch(corsProxy + rootUrl + getAllStops,
    {
      method: "GET"
    })
    .then(resp => resp.json())
    .then(data => {
      data = data.filter(stopData => stopData.C === stopCode);

      if (data.length) {
        var stopDetails = data[0];
      } else {
        var stopDetails = {C: "ntmatjtp", Id: 15717}
      };

      updateDetails(stopDetails.Id);
      setStoreageItem("lastStopData", stopDetails);
    })
})();


function updateDetails(forStopId) {
  fetch(corsProxy + rootUrl + getStop + forStopId,
    {
      method: "GET"
    })
    .then((resp) => resp.json())
    .then((data) => {
      let rows = document.querySelectorAll(".row")

      if (rows) {
        rows.forEach((row) => {
          row.parentNode.removeChild(row);
        })
      }

      if (data && data[0] && data[0].result) {
        document.title = data[0].stopName
        data[0].result.forEach((bus) => {
          addRowTo("service", bus.serviceDisplayName)
          addRowTo("destination", bus.destination)
          addRowTo("duein", bus.dueIn)
        })
      }
      setTimeout(() => {updateDetails(forStopId)}, 15000)
    })
};


(function updateTime() {
  var now = new Date();

  function pad(int) {
    return int.toString().padStart(2, '0')
  }

  var colon = ":";

  if (now.getSeconds() % 2) {
    colon = " ";
  };

  document.querySelector(".time")
    .textContent = `Time is ${pad(now.getHours())}${colon}${pad(now.getMinutes())}`;
  setTimeout(updateTime, 1000)
})();


function addRowTo(elementId, text) {
  let newRow = document.createElement("div");
  newRow.classList.add("large-text", "row");
  newRow.appendChild(document.createTextNode(text));
  document.getElementById(elementId).appendChild(newRow);
};