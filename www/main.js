// WHOIS LOOKUP FUNCTIONALITY
let resultDiv = document.getElementById("result-div");
let resultCont = document.getElementById("result-cont");
let mainDiv = document.getElementById("main");
let prefooter = document.getElementById("prefooter");
let loaderSpin = document.getElementById("loader");
const inputForm = document.getElementById("input-form");

inputForm.addEventListener('submit', function(event){
    event.preventDefault(); 
    loaderSpin.classList.replace("hidden", "flex");
    const formData = new FormData(this);
    let domainName = formData.get('domaininput');
    var dotCom = domainName.slice(-3);
    console.log(domainName);
    fetch("https://whois-seeker.onrender.com/getwhois", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(Object.fromEntries(formData)) 
        })
        .then(function(resp){
            return resp.text()
             })
             .then(function(data){
                    var divElements = "";
                    var responseArr = data.split("\n");

                    if (dotCom === "com"){
                        var newArr1 = responseArr.slice(-34, -28);
                        var newArr2 = responseArr.slice(-27, -3);
                        var newArr3 = responseArr.slice(-3);
                        var newArr4 = responseArr.slice(0, -35)
                        
                        var termsFn = `
                        <div class="text-gray-900 px-1 py-2 xs:px-2 text-lg break-words">${newArr1.join("\n")}</div>
                        <div class="text-gray-900 px-1 py-2 xs:px-2 text-lg break-words">${newArr2.join("\n")}</div>
                        <div class="text-gray-900 px-1 py-2 xs:px-2 text-lg break-words">${newArr3.join("\n")}</div>
                        `

                        for (var w = 0; w < newArr4.length; w++) {
                            divElements += `<div class="text-gray-900 px-1 py-2 xs:px-2 text-lg break-words">${newArr4[w]}</div>`;
                        }

                        divElements += termsFn; 
                    } else {
                        for (var i = 0; i < responseArr.length; i++) {
                            divElements += `<div class="text-gray-900 px-1 py-2 xs:px-2 text-lg break-words">${responseArr[i]}</div>`;
                        }
                    }
                    
                    // console.log(divElements);
                    resultDiv.innerHTML = divElements;
                    resultCont.style.display = "block";
                    mainDiv.classList.remove("hidden");
                    prefooter.classList.remove("hidden");
                    loaderSpin.classList.replace("flex", "hidden");                    
                })
                .catch(function(error) {
                            console.log(error);
                            resultDiv.innerHTML = "There was a connection error. Please check your internet settings."
                            mainDiv.classList.remove("hidden");
                            prefooter.classList.remove("hidden");
                            loaderSpin.classList.replace("flex", "hidden")
                             })     
})


// INITIATE ALL EVENT LISTENERS
function onLoad() {
    document.addEventListener('deviceready', function () {
        onDeviceReady();
    }, false);
}
function onDeviceReady() {
    // Add event listener to the back button
    document.addEventListener('backbutton', backBtn, false);
    // Make text overlying statusbar dark in color
    statusBar.styleDefault();
    // Make links open with system browser
    window.open = cordova.InAppBrowser.open;

}


// NAVIGATION AND BACK BUTTON MANAGEMENT
var closeapp1 = document.getElementById("close-app1");
closeapp1.addEventListener('click', backBtn, false);
var closeapp2 = document.getElementById("close-app2");
closeapp2.addEventListener('click', backBtn, false);
var menuIcon = document.getElementById("menu-reveal");
menuIcon.addEventListener('click', openNav, false);
var menuCloseIcon = document.getElementById("menu-close");
menuCloseIcon.addEventListener('click', closeNav, false);
var navDiv = document.getElementById("nav");
var menuIconsDiv = document.getElementById("menu-icons");
var aboutText = document.getElementById("about-text");
var clickAbout = document.getElementById("click-about");
var mainContent = document.getElementById("hero-content");
mainContent.addEventListener('click', closeNav, false);


function backBtn(e) {
    e.preventDefault();
    var message = "Do you really want to close WHOIS Seeker?";
    var title = "Exit Confirmation";
    var buttonLabels = "No,Yes";
    navigator.notification.confirm(message, exitConfirm, title, buttonLabels);

    function exitConfirm(buttonIndex) {
        if (buttonIndex == 2) {
            navigator.app.exitApp();
        } else {
            navigator.notification.dismissPrevious();
        }
    }
}

function openNav() {
    navDiv.classList.remove("w-0");
    navDiv.classList.add("w-4/5", "xs:w-48");
    menuIconsDiv.style.display = "none";
    clickAbout.classList.remove("hidden");
    clickAbout.classList.add("flex");
    closeapp2.classList.remove("hidden");
    closeapp2.classList.add("flex");
}

function closeNav() {
    navDiv.classList.remove("w-4/5", "xs:w-48");  
    navDiv.classList.add("w-0");
    menuIconsDiv.style.display = "flex";
    clickAbout.classList.remove("flex");
    clickAbout.classList.add("hidden");
    closeapp2.classList.remove("flex");
    closeapp2.classList.add("hidden");
    aboutText.classList.add("hidden");
}

// Swipe left & right navigation by swiped-events.js
document.addEventListener('swiped-left', closeNav);
document.addEventListener('swiped-right', openNav);


// SHOW ABOUT
clickAbout.addEventListener('click', showAbout, false);
function showAbout() {
    aboutText.classList.toggle("hidden");
}


// SOME UNI EDIT
var inputField = document.getElementById("input-field");
inputField.addEventListener("focus", hideOutput, false);
function hideOutput() {
    resultCont.style.display = "none";
}


// GOOGLE ANALYTICS INTEGRATION
// the default GA code, nothing to change
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

var fields = {
    // note: you can use a single tracking id for both the app and the website,
    // don't worry it won't mix the data. More about this in the 3rd section
    trackingId: 'G-DQMDLX86PH'
};

// if we are in the app (the protocol will be file://)
if (document.URL.indexOf('http://') !== 0) {

    // we store and provide the clientId ourselves in localstorage since there are no
    // cookies in Cordova
    fields.clientId = localStorage.getItem('ga:clientId');
    // disable GA's cookie storage functions
    fields.storage = 'none';

    ga('create', fields);

    // prevent tasks that would abort tracking
    ga('set', {
        // don't abort if the protocol is not http(s)
        checkProtocolTask: null,
        // don't expect cookies to be enabled
        checkStorageTask: null
    });

    // a callback function to get the clientId and store it ourselves
    ga(function (tracker) {
        localStorage.setItem('ga:clientId', tracker.get('clientId'));
    });

    // send a screenview event
    ga('send', {
        // these are the three required properties, check GA's doc for the optional ones
        hitType: 'screenview',
        // you can edit these two values as you wish
        screenName: '/index.html',
        appName: 'WHOIS Seeker'
    });
}


