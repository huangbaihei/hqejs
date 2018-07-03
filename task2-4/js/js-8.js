$(document).ready(function () {
    //取出活着的杀手和平民数组
    var killers = JSON.parse(sessionStorage.getItem("killers"));
    var civilians = JSON.parse(sessionStorage.getItem("civilians"));
    if (killers.length >= civilians.length) {
        $(".killers-win").show();
        $(".civilians-win").hide()
    }
    else if (killers.length == 0) {
        $(".killers-win").hide();
        $(".civilians-win").show()
    }
    $(".killers-num").text("杀手" + killers.length + "人");
    $(".civilians-num").text("平民" + civilians.length + "人");
    //把天数取出来
    var day = sessionStorage.getItem("day");
    //把装每天的两个事件说明的数组取出来
    var words = JSON.parse(sessionStorage.getItem("words"));
    for (var i = 0; i < parseInt(day) - 1; i++) {
        $(".game-details").append(" <div class=\"row\">\n" +
            "        <ul>\n" +
            "            <li>\n" +
            "                <span class=\"day\">第" + (i + 1) + "天</span>\n" +
            "            </li>\n" +
            "            <li>晚上：" + words[2 * i] + "</li>\n" +
            "            <li>白天：" + words[2 * i + 1] + "</li>\n" +
            "        </ul>\n" +
            "    </div>")
    }
    //添加点击事件
    $(".home").click(function () {
        if (confirm("要回到主页吗？")) {
            location.href = "task2-1.html";
        }
    });
    $(".close").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href = "task2-1.html";
        }
    });
    $(".again").click(function () {
        if (confirm("要再来一局吗？")) {
            location.href = "task2-1.html";
        }
    });
});