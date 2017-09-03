var trackEvent = function (eventCategory, eventAction, eventLabel, eventValue) {
    if (window.ga) {
        window.ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
    }
};