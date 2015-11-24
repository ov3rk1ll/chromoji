// To implement
console.log('loaded');
url = chrome.extension.getURL("data/images/emoji/");
emoji.img_set = 'emojione';
emoji.img_path = url;
console.log(url);

emoji.img_sets = {
    'apple'   : {'path': url + 'emoji-data/img-apple-64/', 'sheet': '/emoji-data/sheet_apple_64.png', 'mask': 1 },
    'google'  : {'path': url + 'emoji-data/img-google-64/', 'sheet': '/emoji-data/sheet_google_64.png', 'mask': 2 },
    'twitter' : {'path': url + 'emoji-data/img-twitter-64/', 'sheet': '/emoji-data/sheet_twitter_64.png', 'mask': 4 },
    'emojione': {'path': url + 'emoji-data/img-emojione-64/', 'sheet': '/emoji-data/sheet_emojione_64.png', 'mask': 8 }
};

// A very simple jQuery wrapper for js-emoji
$.fn.emoji = function () {
    return this.each(function () {
        $(this).html(function (i, oldHtml) {
            return emoji.replace_unified(oldHtml);
        });
    });
};

$(':not(:has(*))').emoji();

