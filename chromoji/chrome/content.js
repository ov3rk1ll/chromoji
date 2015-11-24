// To implement
url = chrome.extension.getURL("data/images/emoji/");
emoji.img_path = url;

emoji.img_sets = {
    'apple'   : {'path': url + 'emoji-data/img-apple-64/', 'sheet': '/emoji-data/sheet_apple_64.png', 'mask': 1 },
    'google'  : {'path': url + 'emoji-data/img-google-64/', 'sheet': '/emoji-data/sheet_google_64.png', 'mask': 2 },
    'twitter' : {'path': url + 'emoji-data/img-twitter-72/', 'sheet': '/emoji-data/sheet_twitter_64.png', 'mask': 4 },
    'emojione': {'path': url + 'emoji-data/img-emojione-64/', 'sheet': '/emoji-data/sheet_emojione_64.png', 'mask': 8 }
};

var storage = chrome.storage.local;
storage.get('type', function (data) {

    style = 'emojione';
    if (data.type && data.type.style) {
        style = data.type.style;
    }
    emoji.img_set = style;


    $(':not(:has(*))').emoji();
});

// A very simple jQuery wrapper for js-emoji
$.fn.emoji = function () {
    return this.each(function () {
        $this = $(this);
        $this.html(function (i, oldHtml) {
            return emoji.replace_unified(oldHtml);
        });
        $emojiList = $this.find('.emoji-sizer')
        if ($emojiList.length) {
            fontSize = $this.css('font-size');
            if (fontSize != '16px') {
                $emojiList.css({width: fontSize, height: fontSize});
            }
        }
    });
};



