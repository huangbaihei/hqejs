$(document).ready(function () {
    //添加各种跳转
    $(".close").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href = "task2-1.html";
        }
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
            "        <img src=\"../images/dao.png\" alt=\"\" class=\"knife\">\n" +
            "    </div>"
        );
        //为死掉的格子改背景色
        if (playersRole[i].state == "dead") {
            $(".tag>h1").eq(i).css("background", "#83b09a")
        }
    }
    //取出状态机步骤
    var step = sessionStorage.getItem("step");
    //小刀全部隐藏
    $(".knife").hide();
    var index = -1;//定义格子下标为全局变量,初始值定为-1
    sessionStorage.setItem("index",-1);//先存初始值
    //判断是否是杀手杀人跳转过来
    if (step == "killerStep") {
        //实现点击出现小刀选中
        $(".grid").click(function () {
            $(".knife").hide();
            index = $(".grid").index(this);
            $(".knife").eq(index).show();
        });
        //给确定按钮添加点击事件
        $(".btn").click(function () {
            if (index == -1) {
                if (confirm("确定本轮不杀人吗")) {
                    location.href = "task2-5.html";
                    //将状态机的状态设为下一步
                    sessionStorage.setItem("step", "ghostStep");
                }
            }
            else if (playersRole[index].state == "dead") {
                alert("不能重复击杀")
            }
            else if (playersRole[index].role == "杀手") {
                alert("不能杀自己人")
            }
            else {
                if (confirm("确定要干掉它吗？")) {
                    playersRole[index].state = "dead";
                    //重新存一下数组
                    sessionStorage.setItem("playersRole", JSON.stringify(playersRole));
                    location.href = "task2-5.html";
                    //将状态机的状态设为下一步
                    sessionStorage.setItem("step", "ghostStep");
                    //存一下此时的下标
                    sessionStorage.setItem("index",index);
                }
            }
        });
    }
    //判断是否是全民投票跳转过来
    else if (step == "voteStep") {
        $("header>h1").text("投票");
        $(".speak>span").text("发言讨论结束，大家请投票");
        $(".statement>p").text("点击得票数最多的人的头像");
        //实现点击出现小刀选中
        $(".grid").click(function () {
            $(".knife").hide();
            index = $(".grid").index(this);
            $(".knife").eq(index).show();
        });
        //给确定按钮添加点击事件
        $(".btn").click(function () {
            if (index == -1) {
                alert("这轮必须要死一个");
            }
            else if (playersRole[index].state == "dead") {
                alert("不能重复击杀")
            }
            else {
                if (confirm("确定要干掉它吗？")) {
                    playersRole[index].state = "dead";
                    //重新存一下数组
                    sessionStorage.setItem("playersRole", JSON.stringify(playersRole));
                    //将状态机的状态设为下一步
                    sessionStorage.setItem("step", "killerStep");
                    //天数加1
                    var day=sessionStorage.getItem("day");
                    day++;
                    sessionStorage.setItem("day",day);
                    //取出装每天的两个事件说明的数组,将今天的投票事件说明装进去
                    var words=JSON.parse(sessionStorage.getItem("words"));
                    words.push((parseInt(index) + 1) + "号被杀手杀死，真实身份是" + playersRole[index].role);
                    sessionStorage.setItem("words",JSON.stringify(words));
                    //声明两个空数组来存放活着的杀手和平民
                    var killers=[],civilians=[];
                    for (var i=0;i<playersRole.length;i++){
                        if (playersRole[i].state=="live"&&playersRole[i].role=="杀手"){
                            killers.push(playersRole[i])
                        }
                        else if (playersRole[i].state=="live"&&playersRole[i].role=="平民") {
                            civilians.push(playersRole[i])
                        }
                    }
                    //活着的杀手和平民数组放到本地存储
                    sessionStorage.setItem("killers",JSON.stringify(killers));
                    sessionStorage.setItem("civilians",JSON.stringify(civilians));
                    if (killers.length>=civilians.length){
                        alert("杀手胜利");
                        location.href="task2-8.html"
                    } 
                    else if (killers.length==0){
                        alert("平民胜利");
                        location.href="task2-8.html"
                    }
                    else {
                        location.href = "task2-5.html";
                    }
                }
            }
        })
    }
});