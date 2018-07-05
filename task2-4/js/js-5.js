$(document).ready(function () {
    //添加各种跳转事件
    $(".go-back").click(function () {
        location.href = "task2-4.html";
    });
    $(".close").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href = "task2-1.html";
        }
    });
    $(".btn-end").click(function () {
        if (confirm("嘤嘤嘤，要退出游戏了吗？")) {
            location.href = "task2-1.html";
        }
    });
    $(".btn-log").click(function () {
        location.href = "task2-7.html";
    });
    //取出本地存储
    var playersRole = JSON.parse(sessionStorage.getItem("playersRole"));
    var day = sessionStorage.getItem("day");
    $(".day:last").text("第" + day + "天");//修改活动台本头部天数
    //开始编写有限状态机，fsm.state不用声明，是状态机插件自带的，本来就有。
    var fsm = new StateMachine({
            init: sessionStorage.getItem("state"),//从存储中获取状态
            transitions: [//这个其实是定义了四个函数，如果其中一个函数被触发，就会使fsm.state相应地从预设的from跳到to
                {name: "killerStep", from: "toKillerStep", to: "toGhostStep"},
                {name: "ghostStep", from: "toGhostStep", to: "toPlayerStep"},
                {name: "playerStep", from: "toPlayerStep", to: "toVoteStep"},
                {name: "voteStep", from: "toVoteStep", to: "toKillerStep"},
            ],
            methods: {//这个其实也是预设了函数，事件自己定义，要用的话直接调用就好，比如fsm.onkillerStep();
                onkillerStep: function () {
                    //设置第一步高亮
                    $(".killer-kill").css("background", "#92b7a5");
                    $("head").append("<style>.killer-kill:before{border-right-color: #92b7a5 !important}</style>");
                },
                onghostStep: function () {
                    //第二步高亮
                    $(".ghost-speak").css("background", "#92b7a5");
                    $("head").append("<style>.ghost-speak:before{border-right-color: #92b7a5 !important}</style>");
                },
                onplayerStep: function () {
                    //第三步高亮
                    $(".player-speak").css("background", "#92b7a5");
                    $("head").append("<style>.player-speak:before{border-right-color: #92b7a5 !important}</style>");
                },
                onvoteStep: function () {
                    //第四步高亮
                    $(".vote-kill").css("background", "#92b7a5");
                    $("head").append("<style>.vote-kill:before{border-right-color: #92b7a5 !important}</style>");
                }
            }
        })
    ;
    //点击步骤根据当前状态决定是否触发状态机，其实状态机就是完成fsm.state自动顺序循环跳转
    $("#killer-step").click(function () {
        if (sessionStorage.getItem("state") == "toKillerStep") {
            fsm.killerStep();//触发了状态机，使状态fsm.state变到预设的下一个状态
            sessionStorage.setItem("state", fsm.state);//将状态存到本地
            fsm.onkillerStep();//第一步高亮
            location.href = "task2-6.html";//跳转到杀人页面去杀人
        }
        else if (sessionStorage.getItem("state") == "toGhostStep") {
            alert("请勿重复操作")
        }
        else {
            alert("请按步骤进行")
        }
    });
    $("#ghost-step").click(function () {
        if (sessionStorage.getItem("state") == "toGhostStep") {
            fsm.ghostStep();//触发了状态机，使状态fsm.state变到预设的下一个状态
            sessionStorage.setItem("state", fsm.state);//将状态存到本地
            fsm.onghostStep();//第二步高亮
            alert("请死者亮明身份并发表遗言")
        }
        else if (sessionStorage.getItem("state") == "toPlayerStep") {
            alert("请勿重复操作")
        }
        else {
            alert("请按步骤进行")
        }
    });
    $("#player-step").click(function () {
        if (sessionStorage.getItem("state") == "toPlayerStep") {
            fsm.playerStep();//触发了状态机，使状态fsm.state变到预设的下一个状态
            sessionStorage.setItem("state", fsm.state);//将状态存到本地
            fsm.onplayerStep();//第三步高亮
            alert("请玩家依次发言讨论")
        }
        else if (sessionStorage.getItem("state") == "toVoteStep") {
            alert("请勿重复操作")
        }
        else {
            alert("请按步骤进行")
        }
    });
    $("#vote-step").click(function () {
        if (sessionStorage.getItem("state") == "toVoteStep") {
            fsm.voteStep();//触发了状态机，使状态fsm.state变到预设的下一个状态
            sessionStorage.setItem("state", fsm.state);//将状态存到本地
            fsm.onvoteStep();//第四步高亮
            location.href = "task2-6.html";//跳转到杀人页面去杀人
        }
        else {
            alert("请按步骤进行")
        }
    });
    //每次刷新或者进入页面根据所处状态给做过的步骤设置高亮，并且做一些事件
    switch (sessionStorage.getItem("state")) {
        case "toGhostStep":
            fsm.onkillerStep();//第一步高亮
            //将第一步下面的文字说明显现出来
            var index = sessionStorage.getItem("index");
            if (parseInt(index) == -1) {
                $(".killer-kill-message").text("昨晚没有人被杀死");
            }
            else if (parseInt(index) != -1) {
                $(".killer-kill-message").text((parseInt(index) + 1) + "号被杀手杀死，真实身份是" + playersRole[index].role);
            }
            $(".killer-kill-message").show();
            break;
        case "toPlayerStep":
            fsm.onkillerStep();//第一步高亮
            fsm.onghostStep();//第二步高亮
            //第一步下面的文字还需要显示
            $(".killer-kill-message").show();
            break;
        case "toVoteStep":
            fsm.onkillerStep();//第一步高亮
            fsm.onghostStep();//第二步高亮
            fsm.onplayerStep();//第三步高亮
            //第一步下面的文字还需要显示
            $(".killer-kill-message").show();
            break;
    }
    //当进行的天数大于1的时候，在活动台本前插入静止的法官台本
    if (day > 1) {
        for (var i = 0; i < day - 1; i++) {
            $(".item:last").before("<div class=\"item\">\n" +
                "        <div class=\"day\">第" + (i + 1) + "天</div>\n" +
                "        <div class=\"wrap\">\n" +
                "            <div class=\"night\">\n" +
                "                <ul>\n" +
                "                    <li class=\"killer-kill killer-kill-dead\">杀手杀人</li>\n" +
                "                    <li class=\"kill-message killer-kill-message\">3号被杀手杀死，真实身份是平民</li>\n" +
                "                </ul>\n" +
                "            </div>\n" +
                "            <div class=\"daytime\">\n" +
                "                <ul>\n" +
                "                    <li class=\"ghost-speak ghost-speak-dead\">亡灵发表遗言</li>\n" +
                "                    <li class=\"player-speak player-speak-dead\">玩家依次发言</li>\n" +
                "                    <li class=\"vote-kill vote-kill-dead\">全民投票</li>\n" +
                "                    <li class=\"kill-message vote-kill-message\">5号被投票投死，真实身份是杀手</li>\n" +
                "                </ul>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>")
            //将这一天的信息隐藏
            $(".wrap").eq(i).hide();
            //取出装每天的两个事件说明的数组,分别分配给各个静止法官台本
            var words = JSON.parse(sessionStorage.getItem("words"));
            $(".killer-kill-message").eq(i).text(words[2 * i]);
            $(".killer-kill-message").eq(i).show();
            $(".vote-kill-message").eq(i).text(words[2 * i + 1]);
            $(".vote-kill-message").eq(i).show();
            //将静止台本的每个步骤都设置高亮
            //第一步高亮
            $(".killer-kill").eq(i).css("background", "#92b7a5");
            $("head").append("<style>.killer-kill-dead:before{border-right-color: #92b7a5 !important}</style>");
            //第二步高亮
            $(".ghost-speak").eq(i).css("background", "#92b7a5");
            $("head").append("<style>.ghost-speak-dead:before{border-right-color: #92b7a5 !important}</style>");
            //第三步高亮
            $(".player-speak").eq(i).css("background", "#92b7a5");
            $("head").append("<style>.player-speak-dead:before{border-right-color: #92b7a5 !important}</style>");
            //第四步高亮
            $(".vote-kill").eq(i).css("background", "#92b7a5");
            $("head").append("<style>.vote-kill-dead:before{border-right-color: #92b7a5 !important}</style>");
        }
    }
    //实现点击展示，再次点击隐藏
    $(".day").click(function () {
        $(this).next().toggle("normal")
    });

});