var BrowserAddOn_Chrome = {
    getPage         : function (url, callback, callbackError) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(xhr.responseText, url);
                } else {
                    callbackError(url);
                }
            }
        }
        xhr.onerror = function (error) {
            renderStatus("xhr error: " + JSON.stringify(error));
        }
        xhr.send();
    },
    postPage        : function (url, params, callback, callbackError) {
        serialize = function (obj) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");
        }

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        params = serialize(params);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", params.length);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback(xhr.responseText, url, xhr);
                } else {
                    callbackError(url);
                }
            }
        }
        xhr.onerror = function (error) {
            renderStatus("xhr error: " + JSON.stringify(error));
        }
        xhr.send(params);
    },
    getCurrentTabUrl: function (callback) {
        var queryInfo = {
            active       : true,
            currentWindow: true
        };

        chrome.tabs.query(queryInfo, function (tabs) {
            var tab = tabs[0];
            var url = tab.url;
            callback(url);
        });
    },
    onload          : function (callback) {
        document.addEventListener('DOMContentLoaded', callback);
    },
    storage         : function () {
        return chrome.storage.local;
    },
    createTab       : function (params) {
        chrome.tabs.create(params);
    },
    fitPanel        : function () {

    }
};