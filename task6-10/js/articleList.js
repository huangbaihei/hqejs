//控制器和指令
app.controller('articleCtrl', function ($scope, $http, $state, $stateParams) {
    //页面载入后直接向服务器发送get请求，渲染列表
    $http({
        method: 'get',
        url: '/carrots-admin-ajax/a/article/search',
        params: {
            size: $stateParams.size,
            page: $stateParams.page,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt,
            type: $stateParams.type,
            status: $stateParams.status
        }
    }).then(function successCallback(response) {
        $scope.articleList = response.data.data.articleList;
        $scope.total = response.data.data.total //分页用到的项目总数
    });
    //确定搜索请求或确定分页请求后改url参数重新载入页面执行get请求渲染列表
    $scope.refreshList = function () {
        $state.go('home.articleList', {
            size: $scope.size,
            page: ($scope.toPage === undefined) ? $scope.page : $scope.toPage,//page参数优先为toPage
            startAt: isNaN(Date.parse($scope.startAt)) ? undefined : Date.parse($scope.startAt),//转换为数字时间戳
            endAt: isNaN(Date.parse($scope.endAt)) ? undefined : Date.parse($scope.endAt) + 86399999,//转换为数字时间戳
            type: $scope.type,
            status: $scope.status
        }, {reload: true});
    };
    //让分页表单里的数据和url中的参数绑定,实现刷新页面后表单数据保持
    $scope.size = ($stateParams.size === undefined) ? 10 : $stateParams.size;//刚进入页面size默认为10
    $scope.page = ($stateParams.page === undefined) ? 1 : $stateParams.page;//刚进入页面page默认为1
    //选择日期
    $scope.startIsOpen = false;//开始日期日历初始不显示
    $scope.endIsOpen = false;//结束日期日历初始不显示
    $scope.today = new Date();//今天的日期
    $scope.startDate = function () {//点击选开始日期
        $scope.startIsOpen = true;//点击表单显示日历
        $scope.startMaxDate = ($scope.endAt === undefined) ? $scope.today : $scope.endAt;
    };
    $scope.endDate = function () {//点击选结束日期
        $scope.endIsOpen = true;//点击表单显示日历
    };
    //让日期表单里的数据和url中的参数绑定,实现刷新页面后表单数据保持
    //如果url中的参数不是undefined则先将url中的字符串时间戳变为数字格式，然后转化为Date对象，赋值给HTML中绑定的变量
    $scope.startAt = ($stateParams.startAt === undefined) ? undefined : new Date(Number($stateParams.startAt));
    $scope.endAt = ($stateParams.endAt === undefined) ? undefined : new Date(Number($stateParams.endAt) - 86399999);
    //用于ng-repeat渲染多选下拉框内容
    $scope.searchType = [
        {num: '', type: '全部'},
        {num: 0, type: '首页banner'},
        {num: 1, type: '找职位banner'},
        {num: 2, type: '找精英banner'},
        {num: 3, type: '行业大图'}
    ];
    $scope.searchStatus = [
        {num: '', status: '全部'},
        {num: 1, status: '草稿'},
        {num: 2, status: '上线'}
    ];
    //让多选下拉框表单里的value和url中的参数绑定,实现刷新页面后表单value保持
    $scope.type = $stateParams.type;
    $scope.status = $stateParams.status;
    //点击清空，将全部参数重置为服务器默认,重新加载页面
    $scope.clearAll = function () {
        $scope.size = undefined;
        $scope.page = undefined;
        $scope.startAt = undefined;
        $scope.endAt = undefined;
        $scope.type = undefined;
        $scope.status = undefined;
        $scope.refreshList();
    };
    //上下线操作
    $scope.changeLine = function () {
        $scope.thisId = this.x.id;
        $scope.thisStatus = this.x.status;
        //根据状态设置模态框提示语
        switch ($scope.thisStatus) {
            case 1:
                $scope.promptWord = '上线后该图片将在轮播banner中展示，是否执行上线操作？';
                break;
            case 2:
                $scope.promptWord = '下线后该图片将不展示在轮播banner中，是否执行下线操作？';
                break;
        }
        //开始使用bootBox模态框
        bootbox.confirm({
            message: $scope.promptWord,
            buttons: {
                confirm: {
                    label: '确认',
                    className: 'btn-primary'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    $http({
                        method: 'PUT',
                        url: '/carrots-admin-ajax/a/u/article/status',
                        params: {
                            id: $scope.thisId,
                            status: ($scope.thisStatus === 1) ? 2 : 1//改变当前状态发给服务器
                        }
                    }).then(function (response) {
                        if (response.data.code === 0) {
                            $scope.refreshList();
                            bootbox.alert(($scope.thisStatus === 1) ? '上线成功' : '下线成功')
                        }
                        else {
                            bootbox.alert('服务器抛出错误')
                        }
                    }, function () {
                        bootbox.alert('服务器没有反馈')
                    })
                }
            }
        })
    };
    //删除操作
    $scope.deleteItem=function () {
        $scope.thisId = this.x.id;
        bootbox.confirm(
            {
                message:'确认要删除吗？',
                buttons: {
                    confirm: {
                        label: '确认',
                        className: 'btn-primary'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-default'
                    }
                },
                callback:function (result) {
                    if (result){
                        $http({
                            method:'delete',
                            url:'/carrots-admin-ajax/a/u/article/'+$scope.thisId//这个请求格式有点特殊
                        }).then(function (response) {
                            if (response.data.code===0){
                                $scope.refreshList();
                                bootbox.alert('删除成功')
                            }
                            else {
                                bootbox.alert('服务器抛出错误')
                            }
                        }, function () {
                            bootbox.alert('服务器没有反馈')
                        })
                    }
                }
            }
        )
    }
});