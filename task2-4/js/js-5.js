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
    var players = JSON.parse(sessionStorage.getItem("players"));
    var playersRole = JSON.parse(sessionStorage.getItem("playersRole"));
    var day = sessionStorage.getItem("day");
    $(".day:last").text("第" + day + "天");//修改活动台本头部天数
    //开始编写状态机(和编写多状态数组差不多)
    var fsm = {//分为状态和步骤两部分编写,步骤中嵌套状态判断，点击事件触发步骤
        step: sessionStorage.getItem("step"),//每次执行先获取状态
        killerStep: function () {
            switch (fsm.step) {
                case "killerStep":
                    location.href = "task2-6.html";//跳转到杀人页面去杀人
                    break;
                case "ghostStep":
                    alert("请勿重复操作");//在杀人页面已经将步骤保存到ghostStep
                    break;
                case "playerStep":
                case "voteStep":
                    alert("请按步骤进行");
                    break;
            }
        },
        ghostStep: function () {
            switch (fsm.step) {
                case "killerStep":
                    alert("请按步骤进行");
                    break;
                case "ghostStep":
                    alert("请死者亮明身份并发表遗言");
                    fsm.step = "playerStep";
                    sessionStorage.setItem("step", "playerStep");
                    //由于页面不会自动刷新所以设置第二步点击高亮
                    $(".ghost-speak").css("background", "#92b7a5");
                    $("head").append("<style>.ghost-speak:before{border-right-color: #92b7a5 !important}</style>");
                    break;
                case "playerStep":
                    alert("请勿重复操作");
                    break;
                case "voteStep":
                    alert("请按步骤进行");
                    break;
            }
        },
        playerStep: function () {
            switch (fsm.step) {
                case "killerStep":
                    alert("请按步骤进行");
                    break;
                case "ghostStep":
                    alert("请按步骤进行");
                    break;
                case "playerStep":
                    alert("请玩家依次发言讨论");
                    fsm.step = "voteStep";
                    sessionStorage.setItem("step", "voteStep");
                    //由于页面不会自动刷新所以第三步设置点击高亮
                    $(".player-speak").css("background", "#92b7a5");
                    $("head").append("<style>.player-speak:before{border-right-color: #92b7a5 !important}</style>");
                    break;
                case "voteStep":
                    alert("请勿重复操作");
                    break;
            }
        },
        voteStep: function () {
            switch (fsm.step) {
                case "killerStep":
                    alert("请按步骤进行");
                    break;
                case "ghostStep":
                    alert("请按步骤进行");
                    break;
                case "playerStep":
                    alert("请按步骤进行");
                    break;
                case "voteStep":
                    location.href = "task2-6.html";//跳转到杀人页面去杀人
                    break;
            }
        }
    };
    //开始为操作台本各个步骤添加点击事件
    $("#killer-step").click(function () {
        fsm.killerStep();
    });
    $("#ghost-step").click(function () {
        fsm.ghostStep();
    });
    $("#player-step").click(function () {
        fsm.playerStep()
    });
    $("#vote-step").click(function () {
        fsm.voteStep()
    });
    //给做过的步骤设置高亮(根据步骤判断,只能解决刷新以后还能保留高亮的问题，但是页面不会自动刷新，所以还需要在相应步骤添加高亮)
    switch (sessionStorage.getItem("step")) {
        case "ghostStep":
            //第一步高亮
            $(".killer-kill").css("background", "#92b7a5");
            $("head").append("<style>.killer-kill:before{border-right-color: #92b7a5 !important}</style>");
            //将第一步下面的文字说明显现出来
            var index = sessionStorage.getItem("index");
            if (parseInt(index) == -1) {
                $(".killer-kill-message").text("昨晚没有人被杀死");
            }
            else if (parseInt(index) != -1) {
                $(".killer-kill-message").text((parseInt(index) + 1) + "号被杀手杀死，真实身份是" + playersRole[index].role);
            }
            $(".killer-kill-message").show();
            //取出装每天的两个事件说明的数组,将今天的杀手事件说明装进去
            var words = JSON.parse(sessionStorage.getItem("words"));
            words.push($(".killer-kill-message").text());
            sessionStorage.setItem("words", JSON.stringify(words));
            break;
        case "playerStep":
            //第一步高亮
            $(".killer-kill").css("background", "#92b7a5");
            $("head").append("<style>.killer-kill:before{border-right-color: #92b7a5 !important}</style>");
            //第二步高亮
            $(".ghost-speak").css("background", "#92b7a5");
            $("head").append("<style>.ghost-speak:before{border-right-color: #92b7a5 !important}</style>");
            //第一步下面的文字还需要显示
            $(".killer-kill-message").show();
            break;
        case "voteStep":
            //第一步高亮
            $(".killer-kill").css("background", "#92b7a5");
            $("head").append("<style>.killer-kill:before{border-right-color: #92b7a5 !important}</style>");
            //第二步高亮
            $(".ghost-speak").css("background", "#92b7a5");
            $("head").append("<style>.ghost-speak:before{border-right-color: #92b7a5 !important}</style>");
            //第三步高亮
            $(".player-speak").css("background", "#92b7a5");
            $("head").append("<style>.player-speak:before{border-right-color: #92b7a5 !important}</style>");
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
                "                    <li class=\"killer-kill\">杀手杀人</li>\n" +
                "                    <li class=\"kill-message killer-kill-message\">3号被杀手杀死，真实身份是平民</li>\n" +
                "                </ul>\n" +
                "            </div>\n" +
                "            <div class=\"daytime\">\n" +
                "                <ul>\n" +
                "                    <li class=\"ghost-speak\">亡灵发表遗言</li>\n" +
                "                    <li class=\"player-speak\">玩家依次发言</li>\n" +
                "                    <li class=\"vote-kill\">全民投票</li>\n" +
                "                    <li class=\"kill-message vote-kill-message\">5号被投票投死，真实身份是杀手</li>\n" +
                "                </ul>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>")
            //将这一天的信息隐藏
            $(".wrap").eq(i).hide();
            //取出装每天的两个事件说明的数组,分别分配给各个静止法官台本
            var words=JSON.parse(sessionStorage.getItem("words"));
            $(".killer-kill-message").eq(i).text(words[2*i]);
            $(".killer-kill-message").eq(i).show();
            $(".vote-kill-message").eq(i).text(words[2*i+1]);
            $(".vote-kill-message").eq(i).show();
            //将静止台本的每个步骤都设置高亮
            //第一步高亮
            $(".killer-kill").eq(i).css("background", "#92b7a5");
            $("head").append("<style>.killer-kill:before{border-right-color: #92b7a5 !important}</style>");
            //第二步高亮
            $(".ghost-speak").eq(i).css("background", "#92b7a5");
            $("head").append("<style>.ghost-speak:before{border-right-color: #92b7a5 !important}</style>");
            //第三步高亮
            $(".player-speak").eq(i).css("background", "#92b7a5");
            $("head").append("<style>.player-speak:before{border-right-color: #92b7a5 !important}</style>");
            //第四步高亮
            $(".vote-kill").eq(i).css("background","#92b7a5");
            $("head").append("<style>.vote-kill:before{border-right-color: #92b7a5 !important}</style>");
        }
    }
    //实现点击展示，再次点击隐藏
    $(".day").click(function () {
        $(this).next().toggle("normal")
    });

});