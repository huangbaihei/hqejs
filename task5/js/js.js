//使用原生js实现
//设置点击事件
document.getElementById("btn").onclick = function () {
    //取出输入框的值
    var name = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    //做出判断，显示用户名或密码为空的提示
    if (name == "") {
        document.getElementsByClassName("prompt")[0].innerHTML = "请输入用户名";
        return;//设置断点，没有这个会直接顺序进行下一步，导致请输入用户名被后面的请输入密码覆盖掉
    }
    if (password == "") {
        document.getElementsByClassName("prompt")[0].innerHTML = "请输入密码";
    }
    //用户名和密码都输入后，开始发送请求
    if (name != "" && password != "") {
        //新建请求对象
        var xhr = new XMLHttpRequest();
        //开启一个异步post请求,注意url的写法，这里的url省略了头部,/carrots-admin-ajax/为后台拦截名,拦截名后面为文件位置
        xhr.open("post", "/carrots-admin-ajax/a/login", true);
        // 设置数据类型为发送表单数据
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
        //开始发送异步请求,注意书写格式，根据接口文档预设的post字段来写
        xhr.send("name=" + name + "&pwd=" + password);
        //设置监听事件，根据请求后返回的数据渲染页面
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {//服务器返回的数据已经完全接收（也有可能接受提示错误的信息）
                if (xhr.status == 200) {//通信成功,访问正常
                    //取出服务器返回的json字符串并转换成对象数组，返回参数都是在接口文档里预设好的
                    var response = JSON.parse(xhr.responseText);
                    //根据接口文档的返回的字段参数来写进一步判断
                    if (response.message == "success") {//表示信息提示为成功
                        location.href = "http://dev.admin.carrots.ptteng.com"
                    }
                    else {//表示信息提示不是成功而是错误提示
                        document.getElementsByClassName("prompt")[0].innerHTML = response.message;//显示错误提示
                    }
                }
            }
        }
    }
};

//使用jq实现
$(document).ready(function () {
    $("#btn").click(function () {
        var name = $("#user").val();
        var password = $("#password").val();
        if (name == "") {
            $(".prompt").text("请输入用户名");
            return;
        }
        if (password == "") {
            $(".prompt").text("请输入密码");
        }
        if (name != "" && password != "") {
            $.ajax({
                type: "post",
                url: "/carrots-admin-ajax/a/login",
                async: true,
                data: {
                    name: name,
                    pwd: password
                },
                dataType: "json",
                success: function (response) {
                    if (response.message == "success") {
                        location.href = "http://dev.admin.carrots.ptteng.com"
                    }
                    else {
                        $(".prompt").text(response.message);
                    }
                }
            })
        }
    })
});

