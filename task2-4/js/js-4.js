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
    });
    //给下一个页面的状态机设置状态state初始值到本地存储，初始状态为去杀手杀人步骤toKillerStep
    sessionStorage.setItem("state","toKillerStep");
    //开始定义变量并存储到本地存储
    var playersRole = [];//定义准备加三个状态的所有角色的数组
    for (var i = 0; i < players.length; i++) {
        playersRole[i] = {
            role: players[i],//身份
            num: i + 1,//序号
            state: "live"//生死状态
        }
    }
    sessionStorage.setItem("playersRole", JSON.stringify(playersRole));
    //给下一个页面定义初始天数
    sessionStorage.setItem("day", "1");
    //给下一个页面定义一个数组来装每天的两个事件说明
    var words=[];
    sessionStorage.setItem("words",JSON.stringify(words));
});