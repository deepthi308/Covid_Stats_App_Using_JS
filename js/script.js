const tbodyEl = document.getElementById("tbody");
const countEl = document.getElementById("count");
const searchFieldEl = document.getElementById("search-field");
const countryDesc = document.getElementById("country-desc");
const countryAsc = document.getElementById("country-asc");
const confirmedDesc = document.getElementById("confirmed-desc");
const confirmedAsc = document.getElementById("confirmed-asc");
const activeDesc = document.getElementById("active-desc");
const activeAsc = document.getElementById("active-asc");
const recoveredDesc = document.getElementById("recovered-desc");
const recoveredAsc = document.getElementById("recovered-asc");
const deathsDesc = document.getElementById("deaths-desc");
const deathsAsc = document.getElementById("deaths-asc");

// Global variable to store the countries data
let data = [];

function handleLoadData() {
  $.ajax({
    type: "get",
    url: "https://api.rootnet.in/covid19-in/stats/latest",
    success: function (response) {
      data = response.data.regional;
      data = data.filter((region) => {
        return region.loc.length < 20;
      });

      displayDataOnUI(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function displayDataOnUI(data) {
  result = "";
  if (data.length < 1) {
    result = `
        <tr>
        <td style="text-align: center" colspan="5">
        No Countries Match The Search Criteria
        </td>
        </tr>
        `;
  } else {
    data.forEach((region) => {
      result += `
         <tr>
      <td>${region.loc}</td>
      <td>${region.totalConfirmed}</td>
      <td>${region.totalConfirmed - (region.discharged + region.deaths)}</td>
      <td>${region.discharged}</td>
      <td>${region.deaths}</td>
    </tr>
        `;
    });
  }

  tbodyEl.innerHTML = result;
  countEl.innerText = `Countries Count ( ${data.length} )`;
}

function handleChange(e) {
  let filteredData = filterData(e.target.value);
  displayDataOnUI(filteredData);
}

function filterData(searchCountry) {
  searchCountry = searchCountry.toUpperCase();
  let filteredData = data.filter((country) => {
    return country.loc.toUpperCase().includes(searchCountry);
  });
  return filteredData;
}

function handleCountryDesc() {
  let newData = data.sort((country1, country2) => {
    if (country1.loc < country2.loc) {
      return -1;
    }
    if (country1.loc > country2.loc) {
      return 1;
    }
    return 0;
  });
  displayDataOnUI(newData);
}

function handleCountryAsc() {
  let newData = data.sort((country1, country2) => {
    if (country2.loc < country1.loc) {
      return -1;
    }
    if (country2.loc > country1.loc) {
      return 1;
    }
    return 0;
  });
  displayDataOnUI(newData);
}

function handleConfirmedDesc() {
  let newData = data.sort((country1, country2) => {
    if (country1.discharged < country2.discharged) {
      return -1;
    }
    if (country1.discharged > country2.discharged) {
      return 1;
    }
    return 0;
  });
  displayDataOnUI(newData);
}

function handleConfirmedAsc() {
  let newData = data.sort((country1, country2) => {
    if (country2.discharged < country1.discharged) {
      return -1;
    }
    if (country2.discharged > country1.discharged) {
      return 1;
    }
    return 0;
  });
  displayDataOnUI(newData);
}

function handleActiveDesc() {
  let newData = data.sort((country1, country2) => {
    return country2.discharged - country1.discharged;
  });
  displayDataOnUI(newData);
}

function handleActiveAsc() {
  let newData = data.sort((country1, country2) => {
    return country1.discharged - country2.discharged;
  });
  displayDataOnUI(newData);
}

function handleRecoveredDesc() {
  let newData = data.sort((country1, country2) => {
    return country1.discharged - country2.discharged;
  });
  displayDataOnUI(newData);
}

function handleRecoveredAsc() {
  let newData = data.sort((country1, country2) => {
    return country2.discharged - country1.discharged;
  });
  displayDataOnUI(newData);
}

function handleDeathsDesc() {
  let newData = data.sort((country1, country2) => {
    return country1.deaths - country2.deaths;
  });
  displayDataOnUI(newData);
}

function handleDeathsAsc() {
  let newData = data.sort((country1, country2) => {
    return country2.deaths - country1.deaths;
  });
  displayDataOnUI(newData);
}

window.addEventListener("DOMContentLoaded", handleLoadData);

searchFieldEl.addEventListener("keyup", handleChange);

countryDesc.addEventListener("click", handleCountryDesc);

countryAsc.addEventListener("click", handleCountryAsc);

confirmedDesc.addEventListener("click", handleConfirmedDesc);

confirmedAsc.addEventListener("click", handleConfirmedAsc);

activeDesc.addEventListener("click", handleActiveDesc);

activeAsc.addEventListener("click", handleActiveAsc);

recoveredDesc.addEventListener("click", handleRecoveredDesc);

recoveredAsc.addEventListener("click", handleRecoveredAsc);

deathsDesc.addEventListener("click", handleDeathsDesc);

deathsAsc.addEventListener("click", handleDeathsAsc);
