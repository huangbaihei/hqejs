$(document).ready(function () {
    $(".btn").click(function () {
        location.href="task2-5.html";
    });
    $(".close").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href="task2-1.html";
        }
    });
});