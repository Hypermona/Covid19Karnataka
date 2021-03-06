window.addEventListener("load", () => {
  let api = "https://api.covid19india.org/state_district_wise.json";
  let apiKar = "https://api.covid19india.org/data.json";
  let apiIndia = "https://api.covid19api.com/summary";
  fetch(apiIndia)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const { Countries } = data;
      // console.log(data);
      document.getElementById("india-confirmed-new-case").innerHTML =
        "[+" + indianNumSystem(Countries[76].NewConfirmed) + "]";
      document.getElementById(
        "india-confirmed-total"
      ).innerHTML = indianNumSystem(Countries[76].TotalConfirmed);
      document.getElementById("india-active-new-case").innerHTML =
        "[+" + indianNumSystem(Countries[76].NewConfirmed) + "]";
      document.getElementById("india-active-total").innerHTML = indianNumSystem(
        Countries[76].TotalConfirmed -
          (Countries[76].TotalRecovered + Countries[76].TotalDeaths)
      );
      document.getElementById("india-recovered-new-case").innerHTML =
        "[+" + indianNumSystem(Countries[76].NewRecovered) + "]";
      document.getElementById(
        "india-recovered-total"
      ).innerHTML = indianNumSystem(Countries[76].TotalRecovered);
      document.getElementById("india-deaths-new-case").innerHTML =
        "[+" + indianNumSystem(Countries[76].NewDeaths) + "]";
      document.getElementById("india-deaths-total").innerHTML = indianNumSystem(
        Countries[76].TotalDeaths
      );
    });
  fetch(apiKar)
    .then((response) => response.json())
    .then((data) => {
      const { statewise } = data;
      const stateCode = 4;
      console.log("karnataka", statewise[stateCode].state, data);
      document.getElementById("note").innerHTML =
        '"' + statewise[stateCode].statenotes + '..."';
      document.getElementById("kar-confirmed-new-case").innerHTML =
        "[+" + indianNumSystem(statewise[stateCode].deltaconfirmed) + "]";
      document.getElementById(
        "kar-confirmed-total"
      ).innerHTML = indianNumSystem(statewise[stateCode].confirmed);
      document.getElementById("kar-active-new-case").innerHTML =
        "[+" + indianNumSystem(statewise[stateCode].deltaconfirmed) + "]";
      document.getElementById("kar-active-total").innerHTML = indianNumSystem(
        statewise[stateCode].active
      );
      document.getElementById("kar-recovered-new-case").innerHTML =
        "[+" + indianNumSystem(statewise[stateCode].deltarecovered) + "]";
      document.getElementById(
        "kar-recovered-total"
      ).innerHTML = indianNumSystem(statewise[stateCode].recovered);
      document.getElementById("kar-deaths-new-case").innerHTML =
        "[+" + indianNumSystem(statewise[stateCode].deltadeaths) + "]";
      document.getElementById("kar-deaths-total").innerHTML = indianNumSystem(
        statewise[stateCode].deaths
      );
    });

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      // console.log("hello world");
      // console.log(data);
      // console.log("after ittiration");
      const { Karnataka } = data;
      let obj = Karnataka.districtData;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var val = obj[key];
          // console.log(val);
          // console.log(
          // key,
          // val.confirmed,
          // val.delta.confirmed,
          // val.active,
          // val.recovered,
          // val.delta.recovered,
          // val.deceased,
          // val.delta.deceased
          // );

          addDistrict(
            key,
            val.confirmed,
            val.delta.confirmed,
            val.active,
            val.recovered,
            val.delta.recovered,
            val.deceased,
            val.delta.deceased
          );
        }
      }
    });
  // All click eventes...........................................red-muted

  let button = document.getElementById("bt");
  let displayData = document.getElementById("case-district-wise");
  button.onclick = () => {
    if (displayData.style.display == "none") {
      displayData.style.display = "initial";
      whyThisIs.style.display = "none";
      whoIam.style.display = "none";
      aboutData.style.display = "none";
      bt.textContent = "Show less";
    } else {
      displayData.style.display = "none";
      whyThisIs.style.display = "none";
      whoIam.style.display = "none";
      aboutData.style.display = "none";
      bt.textContent = "Cases in karnataka district wise";
    }
  };

  let whyThisIsButton = document.getElementById("nav1");
  let whyThisIs = document.getElementById("why-this-is");

  let whoIamButton = document.getElementById("nav2");
  let whoIam = document.getElementById("who-iam");

  let aboutDataButton = document.getElementById("nav3");
  let aboutData = document.getElementById("about-data");

  whyThisIsButton.onclick = () => {
    if (!(displayData.style.display = "none")) {
      displayData.style.display = "none";
    }
    whyThisIs.style.display = "inherit";
    whoIam.style.display = "none";
    aboutData.style.display = "none";
  };
  whoIamButton.onclick = () => {
    if (!(displayData.style.display = "none")) {
      displayData.style.display = "none";
    }
    whyThisIs.style.display = "none";
    whoIam.style.display = "inherit";
    aboutData.style.display = "none";
  };
  aboutDataButton.onclick = () => {
    if (!(displayData.style.display = "none")) {
      displayData.style.display = "none";
    }
    whyThisIs.style.display = "none";
    whoIam.style.display = "none";
    aboutData.style.display = "inherit";
  };

  let a1 = document.getElementById("a1");
  let a2 = document.getElementById("a2");
  let a3 = document.getElementById("a3");

  a1.onclick = () => {
    if (whyThisIs.style.display == "none") {
      whyThisIs.style.display = "inherit";
    }
    whoIam.style.display = "none";
    aboutData.style.display = "none";
  };
  a2.onclick = () => {
    if ((whoIam.style.display = "none")) {
      whoIam.style.display = "inherit";
    }
    whyThisIs.style.display = "none";
    aboutData.style.display = "none";
  };
  a3.onclick = () => {
    if ((aboutData.style.display = "none")) {
      aboutData.style.display = "inherit";
    }
    whyThisIs.style.display = "none";
    whoIam.style.display = "none";
  };
  // All functions here...........................black-muted
  function indianNumSystem(x) {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }
  //Comparer Function
  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
  // adding district
  function addDistrict(n, c, nc, a, r, nr, d, nd) {
    let caseDistrictWise = document.getElementById("case-district-wise");
    // console.log(caseDistrictWise);
    let details = document.createElement("div");
    details.classList.add(
      "details",
      "animate__animated",
      "animate__slideInRight"
    );
    let name = document.createElement("div");
    name.classList.add("name", "common", "n1");
    name.innerHTML = n;

    let confirmedDist = document.createElement("div");
    confirmedDist.classList.add(
      "confirmed-dist",
      "common",
      "align-dist",
      "common1",
      "n2"
    );

    let newCaseDist1 = document.createElement("p");
    newCaseDist1.classList.add("new-case-dist-1", "text-danger", "cent");
    newCaseDist1.innerHTML = "&uarr;" + nc;
    let totalDist1 = document.createElement("p");
    totalDist1.classList.add("total-dist-1", "cent");
    totalDist1.innerHTML = c;

    let activeDist = document.createElement("div");
    activeDist.classList.add(
      "active-dist",
      "common",
      "align-dist",
      "common1",
      "n3"
    );

    let newCaseDist2 = document.createElement("p");
    newCaseDist2.classList.add("new-case-dist-2", "text-primary", "cent");
    newCaseDist2.innerHTML = "&uarr;" + nc;
    let totalDist2 = document.createElement("p");
    totalDist2.classList.add("total-dist-2", "cent");
    totalDist2.innerHTML = a;

    let recoveredDist = document.createElement("div");
    recoveredDist.classList.add(
      "recovered-dist",
      "common",
      "align-dist",
      "common1",
      "n4"
    );

    let newCaseDist3 = document.createElement("p");
    newCaseDist3.classList.add("new-case-dist-3", "text-success", "cent");
    newCaseDist3.innerHTML = "&uarr;" + nr;
    let totalDist3 = document.createElement("p");
    totalDist3.classList.add("total-dist-3", "cent");
    totalDist3.innerHTML = r;

    let deathsDist = document.createElement("div");
    deathsDist.classList.add(
      "deaths-dist",
      "common",
      "align-dist",
      "common1",
      "n5"
    );

    let newCaseDist4 = document.createElement("p");
    newCaseDist4.classList.add("new-case-dist-4", "text-secondary", "cent");
    newCaseDist4.innerHTML = "&uarr;" + nd;
    let totalDist4 = document.createElement("p");
    totalDist4.classList.add("total-dist-4", "cent");
    totalDist4.innerHTML = d;

    // appending everything..............
    if (caseDistrictWise != null) {
      confirmedDist.appendChild(newCaseDist1);
      confirmedDist.appendChild(totalDist1);

      activeDist.appendChild(newCaseDist2);
      activeDist.appendChild(totalDist2);

      recoveredDist.appendChild(newCaseDist3);
      recoveredDist.appendChild(totalDist3);

      deathsDist.appendChild(newCaseDist4);
      deathsDist.appendChild(totalDist4);

      details.appendChild(name);
      details.appendChild(confirmedDist);
      details.appendChild(activeDist);
      details.appendChild(recoveredDist);
      details.appendChild(deathsDist);

      caseDistrictWise.appendChild(details);
    } else {
      // console.log("gertgh");
    }
  }
  // removing css property
  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      var element = document.getElementById("noanim1");
      element.classList.remove("animate__bounceInRight");
      var element1 = document.getElementById("noanim2");
      element1.classList.remove("animate__bounceInLeft");
      element1.classList.add("w3-animate-opacity");
      var element2 = document.getElementById("noanim3");
      element2.classList.remove("animate__bounceInLeft");
      var element3 = document.getElementById("noanim4");
      element3.classList.remove("animate__bounceInRight");
      element3.classList.add("w3-animate-opacity");
      var element4 = document.getElementById("noanim5");
      element4.classList.remove("animate__bounceInRight");
      var element5 = document.getElementById("noanim6");
      element5.classList.remove("animate__bounceInLeft");
      element5.classList.add("w3-animate-opacity");
    }
  }

  var x = window.matchMedia("(max-width: 480px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes
});
