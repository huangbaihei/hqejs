//自定义过滤器，根据接口约定字段转换类型

//type转换
app.filter('type',function () {
    return function (type) {
        switch (type)
        {
            case 0:
                return '首页banner';
                break;
            case 1:
                return '找职位banner';
                break;
            case 2:
                return '找精英banner';
                break;
            case 3:
                return '行业大图';
                break;
        }
    }
});

//状态转换
app.filter('status',function () {
    return function (status) {
        switch (status)
        {
            case 1:
                return '草稿';
                break;
            case 2:
                return '上线';
                break;
        }
    }
});

//编辑状态转换
app.filter('line',function () {
    return function (status) {
        switch (status)
        {
            case 1:
                return '上线';
                break;
            case 2:
                return '下线';
                break;
        }
    }
});

//文件大小单位转换
app.filter('KB',function () {
    return function (fileSize) {
        return (fileSize/1024).toFixed(2)+'KB';
    }
});

