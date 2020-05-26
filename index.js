window.addEventListener('load', ()=>{
    let api = 'https://api.covid19india.org/state_district_wise.json';
    let apiKar = 'https://api.covid19india.org/data.json';
    let apiIndia = 'https://api.covid19api.com/summary';
    fetch(apiIndia)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const {Countries} = data;
            console.log(Countries[76].Country);
            document.getElementById("india-confirmed-new-case").innerHTML = "[+"+indianNumSystem(Countries[76].NewConfirmed)+"]";
            document.getElementById("india-confirmed-total").innerHTML = indianNumSystem(Countries[76].TotalConfirmed);
            document.getElementById("india-active-new-case").innerHTML = "[+" + indianNumSystem(Countries[76].NewConfirmed) + "]";
            document.getElementById("india-active-total").innerHTML = indianNumSystem(Countries[76].TotalConfirmed - (Countries[76].TotalRecovered + Countries[76].TotalDeaths));
            document.getElementById("india-recovered-new-case").innerHTML = "[+" + indianNumSystem(Countries[76].NewRecovered) + "]";
            document.getElementById("india-recovered-total").innerHTML = indianNumSystem(Countries[76].TotalRecovered);
            document.getElementById("india-deaths-new-case").innerHTML = "[+" + indianNumSystem(Countries[76].NewDeaths) + "]";
            document.getElementById("india-deaths-total").innerHTML = indianNumSystem(Countries[76].TotalDeaths);
        }
        );
    fetch(apiKar)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const {statewise} = data;    
            document.getElementById("kar-confirmed-new-case").innerHTML = "[+" + indianNumSystem(statewise[12].deltaconfirmed) + "]";
            document.getElementById("kar-confirmed-total").innerHTML = indianNumSystem(statewise[12].confirmed);
            document.getElementById("kar-active-new-case").innerHTML = "[+" + indianNumSystem(statewise[12].deltaconfirmed) + "]";
            document.getElementById("kar-active-total").innerHTML = indianNumSystem(statewise[12].active);
            document.getElementById("kar-recovered-new-case").innerHTML = "[+" + indianNumSystem(statewise[12].deltarecovered) + "]";
            document.getElementById("kar-recovered-total").innerHTML = indianNumSystem(statewise[12].recovered);
            document.getElementById("kar-deaths-new-case").innerHTML = "[+" + indianNumSystem(statewise[12].deltadeaths) + "]";
            document.getElementById("kar-deaths-total").innerHTML = indianNumSystem(statewise[12].deaths);
        }
        );


        // installation... setup...... start.......black-muted
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    let deferredPrompt;
    var div = document.querySelector('.add-to');
    var button = document.querySelector('.add-to-btn');
    div.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        div.style.display = 'block';

        button.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            div.style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
        });
    });
        // installation..... setup..... end ....black-muted


        // All functions here...........................black-muted
        function indianNumSystem(x){
            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            return res
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
        }
    }    

});
