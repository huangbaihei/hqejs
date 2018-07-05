//jq文档就绪函数
$(document).ready(function () {

    //将本地存储里的字符串取出来变回对象数组
    var players = JSON.parse(sessionStorage.getItem("players"));

    //给序号累加变量和状态判断变量设初始值
    var label = 1, status = 0;

    //开始给按钮添加点击事件触发函数
    $(".btn").click(function () {
        //点击后判断当前所处状态
        switch (status) {
            case 0://处于皇上翻牌状态（点击去到女孩出现状态）
                $(".emperor").hide();
                $(".girl").show();
                $(".role-word").show();
                status = 1;//实现点击后换状态
                label++;//在此状态下点击序号加1
                $(".role").text(players[label - 2]);
                if (label < players.length + 1) {
                    $(".btn").text("隐藏并传递给" + label + "号");
                }
                else {
                    $(".btn").text("法官查看");
                    status = 2;
                }
                break;
            case 1://处于女孩出现状态（点击去到皇上翻牌状态）
                $(".emperor").show();
                $(".girl").hide();
                $(".role-word").hide();
                status = 0;//实现点击后换状态
                if (label < players.length + 1) {
                    $(".circle").text(label);//在此状态下点击改变圆圈序号
                    $(".btn").text("查看" + label + "号身份");
                }
                break;
            case 2://处于准备法官查看状态（点击去到法官查看页面）
                if (confirm("请把手机交给法官")) {
                    location.href = "task2-4.html";
                }
        }
    });
    $(".go-back").click(function () {
        if (confirm("要回去重新分配人数吗？")) {
            location.href = "task2-2.html";
        }
    })
    $(".close").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href = "task2-1.html";
        }
    })
});
