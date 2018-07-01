$(document).ready(function () {
    //取出本地存储
   var players=JSON.parse(sessionStorage.getItem("players"));
   //遍历数组添加身份格子
    for (var i=0;i<players.length;i++){
        $(".main").append(
            "<div class=\"grid\">\n" +
            "        <div class=\"tag\">\n" +
            "            <h1>"+players[i]+"</h1>\n" +
            "            <p>"+(i+1)+"号</p>\n" +
            "        </div>\n" +
            "    </div>"
        )
    }
    $(".go-back").click(function () {
        if (confirm("要回到发牌页面吗？")){
            location.href="task2-3.html";
        }
    });
    $(".close").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href = "task2-1.html";
        }
    });
    $(".btn").click(function () {
        location.href="task2-5.html";
    })
});