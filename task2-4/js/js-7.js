$(document).ready(function () {
    $(".btn").click(function () {
        location.href="task2-5.html";
    });
    //取出本地存储
    var playersRole = JSON.parse(sessionStorage.getItem("playersRole"));
    //遍历数组添加身份格子
    for (var i = 0; i < playersRole.length; i++) {
        $(".main").append("<div class=\"grid\">\n" +
            "        <div class=\"tag\">\n" +
            "            <h1>" + playersRole[i].role + "</h1>\n" +
            "            <p>" + playersRole[i].num + "号</p>\n" +
            "        </div>\n" +
            "    </div>"
        );
        //为死掉的格子改背景色
        if (playersRole[i].state == "dead") {
            $(".tag>h1").eq(i).css("background", "#83b09a")
        }
    }
});