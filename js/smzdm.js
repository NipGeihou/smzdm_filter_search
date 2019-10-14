$(function () {
    $('body').append('<div class="ctl_windows">' +
        '<div>最少评论数：<input type="number" id="least_comment_amount"></div>' +
        '<div><input type="button" value="筛选" class="sx" style="width: 100%"></div>' +
        '</div>');

    //从cookie中获取最少评论数
    if (getCookie('least_comment_amount')) {
        $('#least_comment_amount').val(getCookie('least_comment_amount'));
        sx_list();
    }

    //css
    $('.ctl_windows').css({
        'position': 'fixed',
        'right': '10px',
        'top': '50px',
        "background": "#1a59b7",
        "color": "#ffffff",
        "overflow": "hidden",
        "z-index": "9999",
        'position': "fixed",
        "padding": "5px",
        "text-align": "center",
        "width": "175px",
        // "height": "22px"

    });

    $('sx').css({
        'background':"#ddd"
    })

});

function sx_list() {
    //设定最少评论数
    var least_comment_amount = parseFloat($('#least_comment_amount').val());
    //保存进cookie
    setCookie('least_comment_amount', least_comment_amount);

    $('.z-icon-comment').each(function () {
        //获实际评论数
        var real_comment_amount = parseFloat($.trim($(this).parents('a').text()));
        if (real_comment_amount < least_comment_amount) {
            $(this).parents('.feed-row-wide ').remove();
        }
    });
}

$('.sx').on('click', function () {
    sx_list();
});

function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}