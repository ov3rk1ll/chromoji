var BrowserAddOn = {
    driver          : null,
    register        : function (type) {
        driverName = "BrowserAddOn_" + BrowserAddOn.ucfirst(type);
        BrowserAddOn.driver = window[driverName];
    },
    autoregister    : function () {
        BrowserAddOn.register(BrowserAddOn.detect());
    },
    ucfirst         : function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    detect          : function () {
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
        var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
        return isOpera ? 'opera' : isFirefox ? 'firefox' : isSafari ? 'safari' : isChrome ? 'chrome' : isIE ? 'ie' : '';
    },
    getPage         : function (url, callback, callbackError) {
        return BrowserAddOn.driver.getPage(url, callback, callbackError);
    },
    postPage        : function (url, params, callback, callbackError) {
        return BrowserAddOn.driver.postPage(url, params, callback, callbackError);
    },
    getCurrentTabUrl: function (callback) {
        return BrowserAddOn.driver.getCurrentTabUrl(callback);
    },
    onload          : function (callback) {
        return BrowserAddOn.driver.onload(callback);
    },
    storage         : function () {
        return BrowserAddOn.driver.storage();
    },
    createTab       : function (params) {
        return BrowserAddOn.driver.createTab(params);
    },
    fitPanel        : function () {
        return BrowserAddOn.driver.fitPanel();
    }
}
