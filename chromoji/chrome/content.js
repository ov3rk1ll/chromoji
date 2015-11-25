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
    $('*:not(iframe)')
        .contents()
        .filter(function () {
            return this.nodeType === 3;
        })
        .each(function () {
            $this = $(this);
            content = emoji.replace_unified(this.textContent);
            if (content != this.textContent) {
                $parent = $this.parent();
                fontSize = $parent.css('font-size');
                var replacementNode = document.createElement('span');
                replacementNode.className = 'emoji-container';
                replacementNode.innerHTML = emoji.replace_unified(this.textContent);
                this.parentNode.insertBefore(replacementNode, this);
                this.parentNode.removeChild(this);
                if (fontSize != '16px') {
                    $parent.find('.emoji-sizer').css({width: fontSize, height: fontSize});
                }
            }

        });
});



