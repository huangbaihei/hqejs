$(document).ready(function () {
    $(".go-back").click(function () {
        location.href="task2-4.html";
    });
    $(".close").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href="task2-1.html";
        }
    });
    $(".killer-kill").click(function () {
        location.href="task2-6.html";
    });
    $(".btn-end").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href="task2-1.html";
        }
    });
    $(".btn-log").click(function () {
        location.href="task2-7.html";
    })
});