BrowserAddOn.autoregister();

BrowserAddOn.onload(function () {

    $list = $(".emoji-list");
    $container = $(".emoji-list-container");
    $input = $(".emoji-container-text");
    $search = $(".search-field");

    $search.on('keyup change', function () {
        $this = $(this);
        val = $this.val();
        $container.find('li').css('display', 'inline-block');
        if (val) {
            $container.find('li').each(function () {
                $elem = $(this);
                if (!$elem.attr('title') || $elem.attr('title').indexOf(val) === -1) {
                    $elem.css('display', 'none');
                }
            });
            $container.find('.emoji-list-category').each(function () {
                $curList = $(this);
                $visibleElements = $curList.find("li:visible");
                if (!$visibleElements.length) {
                    $curList.addClass('hidden');
                } else {
                    $curList.removeClass('hidden').addClass('force-display');
                }
            });
            // Hide not matching categories
        } else {
            $container.find('.emoji-list-category').removeClass('hidden force-display');
        }
        // Display everything back again
    });

    $list.on('click', 'li', function () {
        $this = $(this);
        $input.val($input.val() + $this.find('.emoji-inner').html());
        $input.select();
    });

});