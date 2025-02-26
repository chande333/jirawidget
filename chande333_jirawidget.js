window.CHND_JIRA_WIDGET = (function (){
    // MAKES SURE all necessary libraries are loaded

    let timestamp = Date.now();

    function init(){
        // Load JIRA widget
        // loadJiraWidget();
        loadLibraries(loadJiraWidget);
    }


    function loadLibraries(callbackFn) {
        // Check if jQuery is loaded
        if (typeof jQuery === 'undefined') {
            let script = document.createElement('script');
            script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            script.onload = function() {
                loadBootstrapAndPopper(callbackFn);
            };
            document.head.appendChild(script);
        } else {
            loadBootstrapAndPopper(callbackFn);
        }

        function loadBootstrapAndPopper(callbackFn) {
            let scriptsToLoad = 0;
            let scriptsLoaded = 0;

            function scriptLoadHandler() {
                scriptsLoaded++;
                if (scriptsLoaded === scriptsToLoad && typeof callbackFn === 'function') {
                    callbackFn();
                }
            }

            // Check if Popper.js is loaded
            if (typeof Popper === 'undefined') {
                scriptsToLoad++;
                let script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';
                script.onload = scriptLoadHandler;
                document.head.appendChild(script);
            }

            // Check if Bootstrap is loaded
            if (typeof bootstrap === 'undefined') {
                scriptsToLoad++;
                let link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
                document.head.appendChild(link);

                let script = document.createElement('script');
                script.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js';
                script.onload = scriptLoadHandler;
                document.head.appendChild(script);
            }

            // If no scripts need to be loaded, call the callback immediately
            if (scriptsToLoad === 0 && typeof callbackFn === 'function') {
                callbackFn();
            }
        }
    }


    return{
        init:init
    }
})();