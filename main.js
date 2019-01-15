
const url = "https://cors-anywhere.herokuapp.com/https://www.trentbarton.co.uk/RTILiveTimings.aspx?m=GetRTI";


(function updateDetails() {
  var now = new Date();

  function pad(int) {
    return int.toString().padStart(2, '0')
  }

  document.querySelector(".time")
    .textContent = `Time is ${pad(now.getHours())}:${pad(now.getMinutes())}`;


  fetch(url + "&service=65&stop=15717",
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

      if (data.result) {
        data.result.forEach((bus) => {
          addRowTo("service", bus.serviceDisplayName)
          addRowTo("duein", bus.dueIn)
        })
      }
      setTimeout(updateDetails, 15000)
    })
})();


function addRowTo(elementId, text) {
  let newRow = document.createElement("div");
  newRow.classList.add("large-text", "row");
  newRow.appendChild(document.createTextNode(text));
  document.getElementById(elementId).appendChild(newRow);
};