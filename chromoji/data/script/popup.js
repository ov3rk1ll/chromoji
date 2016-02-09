BrowserAddOn.autoregister();

BrowserAddOn.onload(function () {

    listEmoji = emoji.data;
    $list = $(".emoji-list");
    $input = $(".emoji-container-text")
    /*
     for (i in listEmoji) {
     curEmoji = listEmoji[i];
     $item = $("<li/>");
     $item.attr('data-name', curEmoji[3]);
     $item.attr('title', curEmoji[3]);
     codes = curEmoji[0];
     content = $("<div/>").html(codes[0]);
     for (j in codes) {
     content.html(content.html() + codes[j]);
     }
     $item.html(content.html());
     $item.appendTo($list);
     }*/

    $search = $(".search-field");

    $search.on('keyup change', function () {
        $this = $(this);
        val = $this.val();
        $list.each(function () {
            $tmpList = $(this);
            $tmpList.find('li').css('display', 'inline-block');
            if (val) {
                $tmpList.find('li').each(function () {
                    $elem = $(this);
                    if ($elem.attr('title').indexOf(val) === -1) {
                        $elem.css('display', 'none');
                    }
                });
            }
        });
    });

    $list.on('click', 'li', function () {
        $this = $(this);
        $input.val($input.val() + $this.find('.emoji-inner').html());
        $input.select();
    });

    // Replace with content.js when we find out how it works


    url = chrome.extension.getURL("data/images/emoji/");
    emoji.img_path = url;
    emoji.use_sheet = true;

    emoji.img_sets = {
        'apple': {'path': url + 'emoji-data/img-apple-64/', 'sheet': url + 'emoji-data/sheet_apple_64.png', 'mask': 1},
        'google': {
            'path': url + 'emoji-data/img-google-64/',
            'sheet': url + 'emoji-data/sheet_google_64.png',
            'mask': 2
        },
        'twitter': {
            'path': url + 'emoji-data/img-twitter-72/',
            'sheet': url + 'emoji-data/sheet_twitter_64.png',
            'mask': 4
        },
        'emojione': {
            'path': url + 'emoji-data/img-emojione-64/',
            'sheet': url + 'emoji-data/sheet_emojione_64.png',
            'mask': 8
        }
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
                var $this = $(this);
                var self = this;
                content = emoji.replace_unified(self.textContent);

                if (content != this.textContent) {
                    requestAnimationFrame(function () {
                        $parent = $this.parent();
                        fontSize = $parent.css('font-size');
                        var replacementNode = document.createElement('span');
                        replacementNode.className = 'emoji-container';
                        replacementNode.innerHTML = emoji.replace_unified(self.textContent);
                        self.parentNode.insertBefore(replacementNode, self);
                        self.parentNode.removeChild(self);
                        if (fontSize != '16px') {
                            $parent.find('.emoji-sizer').css({width: fontSize, height: fontSize});
                        }
                    });
                }

            });
    });


});