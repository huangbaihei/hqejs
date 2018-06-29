var num = document.getElementById("num");
var range = document.getElementById("range");
var subBtn = document.getElementById("subtract");
var addBtn = document.getElementById("add");
var killer = document.getElementById("killer-num");
var civilians = document.getElementById("civilians-num");
//输入人数后，滑块跟着变化
num.onblur = numChange;

function numChange() {
    if (num.value >= 4 && num.value <= 18) {
        range.value = num.value;
    }
    else {
        alert("请输入4~18之间的整数");
        num.value = 4;
        range.value = 4;
    }
}

//添加键盘事件
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        numChange();
    }
};
//滑块变化后人数跟着变化
range.onchange = function () {
    num.value = range.value;
};
//点击减号实现人数自减
subBtn.onclick = function () {
    num.value--;
    range.value--;
    if (num.value < 4) {
        alert("人数最少为4");
        num.value = 4;
        range.value = 4;
    }
};
//点击加号实现人数自加
addBtn.onclick = function () {
    num.value++;
    range.value++;
    if (num.value > 18) {
        alert("人数最多为18");
        num.value = 18;
        range.value = 18;
    }
};

//点击设置实现根据总人数分配杀手和平民
function separate() {
    if (num.value >= 4 && num.value <= 18) {
        if (num.value == 15) {
            killer.value = 4;
        }
        else if (num.value == 18) {
            killer.value = 5;
        }
        else {
            killer.value = Math.floor(num.value / 3);
        }
        civilians.value = num.value - killer.value;
        killer.innerHTML = killer.value;
        civilians.innerHTML = civilians.value;
        //将所有杀手和平民放到一个空数组中，用洗牌算法打乱，然后将数组存储到浏览器
        var players = [];
        for (var i = 0; i < killer.value; i++) {
            players.push("杀手");
        }

        for (var i = 0; i < civilians.value; i++) {
            players.push("平民");
        }
        (function () {
            var i, j = players.length, k;
            while (j) {
                i = Math.floor(Math.random() * j--);
                k = players[i];
                players[i] = players[j];
                players[j] = k;
            }
        })();
        //以字符串形式存到本地存储
        sessionStorage.setItem("players",JSON.stringify(players));
    }
}

//给去发牌添加事件
var btnBottom = document.getElementById("btnBottom");
btnBottom.onclick = function () {
    if (num.value == parseInt(killer.innerHTML) + parseInt(civilians.innerHTML)) {
        location.href = "task2-2.html";
    }
    else {
        alert("请设置好玩家配比再玩")
    }
};




