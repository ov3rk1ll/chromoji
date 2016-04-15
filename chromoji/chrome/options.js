var storage = chrome.storage.local;
var list = $('#password-list');
var inputSelector = 'input,select';

$(".storage-list").on('keyup', inputSelector, function () {
    save();
});
$(".storage-list").on('change', inputSelector, function () {
    save();
});


var listFields = {};

function save() {
    $(".storage-list").each(function () {
        var $list = $(this);
        var storagekey = $list.data('storage');
        var values = {};

        $list.find(inputSelector).each(function () {
            var $this = $(this);
            values[$this.attr('class')] = $this.val();
        });
        dataStorage = {};
        dataStorage[storagekey] = values;
        storage.set(dataStorage, function () {
        });
    });

}


$(".storage-list").each(function () {
    var $list = $(this);
    var storagekey = $list.data('storage');
    storage.get(storagekey, function (items) {
        if (items[storagekey]) {
            console.log(items[storagekey]);
            for (i in items[storagekey]) {
                item = items[storagekey][i];
                $list.find('.' + i).val(item);
            }
        }
    });
});