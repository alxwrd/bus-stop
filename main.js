
const url = "https://cors-anywhere.herokuapp.com/https://www.trentbarton.co.uk/RTILiveTimings.aspx?m=GetRtiFull";


(function updateDetails() {
  fetch(url + "&stop=15717",
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
      setTimeout(updateDetails, 15000)
    })
})();


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