importScripts('https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js');
const VERSION = "VERSION_1";

self.addEventListener("install", function (event) {
    /* If there is a new version of service worker available,
     * activate the new version right away, rather than putting
     * it into waiting state.
     */
    self.skipWaiting();
    console.debug("Service Worker installed");
});

self.addEventListener("activate", function (event) {
    console.debug("Service Worker activated");
    try {
        /* Invoking clients.claim() to immediately pass control to the Service Worker after the first page load.
         * If not, then only the subsequent page loads will be controlled by the Service Worker.
         * Since ours is a SPA (Single Page Application) we cannot afford this, as we would like to have DAI functionality
         * as soon as the page is loaded first time.
         *
         * TODO: When we start using SW for caching, in future, please keep this in mind:
         * https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
         */
        if (self.clients) {
            self.clients.claim();
        }
    } catch (error) {
        console.warn("Service Worker activate() -> Error in invoking clients.claim()");
        console.error(error);
    }
});

self.addEventListener('message', event => {
    console.debug("event received", event)
    if (event && event.data) {
        const type = event.data['message_type'];
        if (type === "app_features") {
            this.appFeatures = event.data['features'];
            this.logDebug = event.data['debug'];
        } else if (type === "start_intercepting_hls") {
            this.interceptHls = true;
        } else if (type === "stop_intercepting_hls") {
            this.interceptHls = false;
        }
    }
});

/* Monitor for '.m3u8' manifest requests.
 * Intercept the manifest response and pass it on to the App.
 */
self.addEventListener("fetch", function (event) {
    if (this.appFeatures && this.appFeatures['dai'] === true && this.interceptHls === true) {
        interceptHlsManifestEvents(event);
    }
});

function interceptHlsManifestEvents(event) {
    if (event.request.url.indexOf(".m3u8") > 0) {
        //debug("sw intercepting url - " + event.request.url);
        event.respondWith(
            fetch(event.request.url)
                .then(response => {
                    let response2 = response.clone();
                    response2.text()
                        .then(data => {
                            postMessage(data, event);
                        })
                        .catch(error => {
                            logError("Error in manifest Response", error);
                        })
                    return response;
                })
                .catch(err => {
                    logError(err);
                })
        );
    }
}

/* Pass on the manifest response to the App */
function postMessage(data, event) {
    if (!event.clientId) {
        return;
    }
    try {
        console.debug("sw sending manifest response to App, for url - ", event.request.url);
        //debug("sw manifest response", data);
        clients.get(event.clientId).then(client => {
            client.postMessage({
                event_type: "hls_manifest_response",
                manifest_url: event.request.url,
                manifest_response: data
            });
        });
    } catch (error) {
        logError(error);
    }
}

function logError(error) {
    console.error("Service Worker [" + VERSION + "] ", error);
}
