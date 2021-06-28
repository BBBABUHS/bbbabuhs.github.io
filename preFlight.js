var isMobilePlatform = function() {
    return (
        window.navigator.userAgent.toLowerCase().indexOf("iphone") >= 0 ||
        window.navigator.userAgent.toLowerCase().indexOf("ipad") >= 0 ||
        window.navigator.userAgent.toLowerCase().indexOf("android") >= 0
    );
};
var isSmartTVPlatform = function() {
    return (
        window.navigator.userAgent.toLowerCase().indexOf("smart-tv") >= 0 ||
        window.navigator.userAgent.toLowerCase().indexOf("tizen") >= 0 ||
        window.navigator.userAgent.toLowerCase().indexOf("smarttv") >= 0 ||
        window.navigator.userAgent.toLowerCase().indexOf("webos") >= 0 
        
    );
};

var getBrowserInfo = function() {
    var ua = window.navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)getBrowser/g.exec(ua) || [];
        return { name: "IE ", version: tem[1] || "" };
    }

    /* For Opera Browser*/
    if (M[1] === "Chrome") {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return { name: "Opera", version: tem[1] };
        }
    }

    /* For Old Edge Browser
     * User Agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362"
     */
    if (window.navigator.userAgent.indexOf("Edge")) {
        tem = ua.match(/\Edge\/(\d+)/);
        if (tem != null) {
            return { name: "Edge", version: tem[1] };
        }
    }

    /* For New Edge Browser (Chromium based)
     * User Agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36 Edg/80.0.361.51"
     */
    if (window.navigator.userAgent.indexOf("Edg")) {
        tem = ua.match(/\Edg\/(\d+)/);
        if (tem != null) {
            return { name: "Edge", version: tem[1] };
        }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1],
    };
};


window.$_CONFIGURE_$["browserInfo"] = getBrowserInfo();


//        if (window.navigator.userAgent.toLowerCase().indexOf("iphone")>=0 || window.navigator.userAgent.toLowerCase().indexOf("ipad")>=0 || window.navigator.userAgent.toLowerCase().indexOf("android")>=0) {

if (isSmartTVPlatform()) {
    window.open("./staticFiles/config/unsupportedBrowser.html", "_self");
    window.$_CONFIGURE_$.mobilePlayer = true;
    window.$_CONFIGURE_$.htmlVideoPlayer = false;
} else {
    window.$_CONFIGURE_$.htmlVideoPlayer = true;
}

//Project does not support mobile browser + user access from mobile browser -> unsupportedBrowser.html
if (isMobilePlatform() && !window.$_CONFIGURE_$.mobileSupport) {
    window.open("./staticFiles/config/unsupportedBrowser.html", "_self");
}

const isBrowserCheckRequiredFromOauth = window.$_CONFIGURE_$.supportBrowserCheckFromOauth; // true: Oauth false:Preflight
const isLandingPageRequired = window.$_CONFIGURE_$.isLandingPageRequired; //True : Misr
window.$_CONFIGURE_$.mobileBrowser = isMobilePlatform();

const checkIfCurrentBrowserIsSupported = () => {
    if (isBrowserCheckRequiredFromOauth) {
        return;
    }
    const currentBrowser = getBrowserInfo();
    if (supportedBrowsers && supportedBrowsers.indexOf(currentBrowser.name) < 0) {
        // removed not of supportedBrowsers
        //not a valid supported browser - take to unsupportedBrowser.html
        window.open("./staticFiles/config/unsupportedBrowser.html", "_self");
        return false;
    }
    return true;
};

//Show Landing Page (if required) or Unsupported Browser page (if browser is not supported)
if (!isBrowserCheckRequiredFromOauth) {
    checkIfCurrentBrowserIsSupported();
}

window.$_CONFIGURE_$.htmlVideoPlayer = true;
window.$_CONFIGURE_$.mobilePlayer = undefined;

//Function create script type javascript and set src
function createScriptTag(scriptFile) {
    const timeStamp = "1622724841011";
    let body = document.body;
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "build/" + scriptFile + "?v=" + timeStamp;
    body.appendChild(script);
}

function downloadFiles() {
    const bundleFile = "bundle.js";
    const vendorMain = "vendors.main.js";
    const reactvendor = "reactVendor.js";
    const reactDomVendor = "reactDomVendor.js";
    const reduxVendor = "reduxVendor.js";
    const utilityVendor = "utilityVendor.js";
    const jqueryVendor = "jqueryVendor.js";
    const reactOtherVendor = "reactOtherVendor.js";

    try {
        /* Doesn't work on Android (TV) web view (MSN docs say requires at least v.49 of Android web view */
        var searchParams = new URLSearchParams(window.location.search);
        var extractedURLParam = undefined;

        if (searchParams) {
            extractedURLParam = searchParams.get("vf");
        }

        console.log("vf = ", extractedURLParam);

        if (extractedURLParam === "true") {
            bundleFile = "bundle-vf.js";
        }
    } catch (e) {}

    let timeStamp = "1622724841011";

    var body = document.body;
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", "./staticFiles/css/styles.min.css?v=" + timeStamp);
    body.appendChild(fileref);

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "./staticFiles/config/cloudws/uiVersion.js?v=" + timeStamp;
    body.appendChild(script);

    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "./staticFiles/config/uiBranding.js?v=" + timeStamp;
    body.appendChild(script);

    createScriptTag(bundleFile);
    createScriptTag(vendorMain);
    createScriptTag(reactvendor);
    createScriptTag(reactDomVendor);
    createScriptTag(reduxVendor);
    createScriptTag(utilityVendor);
    createScriptTag(jqueryVendor);
    createScriptTag(reactOtherVendor);
}

function getHash(locationHrefString) {
    let hashParams = [],
        hash;
    let locationHref = locationHrefString ? locationHrefString : window.location.href;
    let hashes = locationHref.slice(locationHref.indexOf("#") + 1).split("&");
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        hashParams.push(hash[0]);
        hashParams[hash[0]] = hash[1];
    }
    return hashParams;
}

function addProjectBundle() {
    let hashString = getHash(window.location.hash);
    let bearerToken = hashString.access_token;

    let authorizationHeader = undefined;
    if (bearerToken != undefined) authorizationHeader = "Bearer " + bearerToken;

    let headers = authorizationHeader ? authorizationHeader : null;

    if (headers) {
        let cUrl = "/bb2f53f1-6103-4381-843c-9f938f784e77";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let reloadInvoked = false;
                try {
                    var response = JSON.parse(this.responseText);

                    if (response.reload) {
                        //new community cookie is set by server. reload the window so that the resources get downloaded based on the new cookie/community.
                        reloadInvoked = true;
                        location.reload(true);
                    } else {
                        downloadFiles();
                    }
                } catch (error) {
                    console.error("Parsing failed", error);
                } finally {
                    if(!reloadInvoked) { //After window.location.reload() is invoked, do not continue to download old resources.
                        downloadFiles();
                    }
                }
            } else if (this.readyState == 4 && this.status === 404) {
                // should work against sg w/o community based routing
                downloadFiles();
            }
        };
        xhttp.open("GET", cUrl, true);
        xhttp.setRequestHeader("Authorization", headers);
        xhttp.send();
    } else {
        //initial load
        downloadFiles();
    }
}

//to make CustomEvent work in IE
(function() {
    if (typeof CustomEvent === "function") {
        return;
    }

    function customEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    customEvent.prototype = window.Event.prototype;
    window.CustomEvent = customEvent;
})();
