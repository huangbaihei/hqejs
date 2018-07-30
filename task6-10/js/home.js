//控制器和指令
app.controller('homeCtrl', function ($scope, $state, $http) {
    //初始化手风琴内容
    $scope.listFather = [
        {
            num: 0,
            name: '信息管理',
            listChild: [
                {
                    num: 0,
                    name: '公司列表',
                    select: false,
                    url:'home.articleList'
                },
                {
                    num: 1,
                    name: '职位列表',
                    select: false,
                    url:'home.articleList'
                }
            ],
            select: false,
            highlightReset:false
        },
        {
            num: 1,
            name: '后台管理',
            listChild: [
                {
                    num: 0,
                    name: '账号管理',
                    select: false,
                    url:'home.articleList'
                },
                {
                    num: 1,
                    name: '角色管理',
                    select: false,
                    url:'home.articleList'
                },
                {
                    num: 2,
                    name: '修改密码',
                    select: false,
                    url:'home.articleList'
                },
                {
                    num: 3,
                    name: '模块管理',
                    select: false,
                    url:'home.articleList'
                },
                {
                    num: 4,
                    name: 'article列表',
                    select: false,
                    url:'home.articleList'
                }
            ],
            select: false,
            highlightReset:false
        }
    ];
    //一级列表点击事件
    $scope.oneSelect = function () {
        if (this.x.select === false) {
            //先将全部重置为没有选中状态
            angular.forEach($scope.listFather, function (x) {
                x.select = false
            });
            //将此选项状态改为选中
            this.x.select =true;
        }
        else {
            //将此选项状态改为没有选中
            this.x.select = false
        }
    };
    //二级列表点击事件
    $scope.twoSelect = function () {
        //先将全部重置为没有选中状态
        angular.forEach($scope.listFather, function (x) {
            x. highlightReset=false;
            angular.forEach(x.listChild,function (y) {
                y.select=false
            })
            // x.listChild.some(function (y) {
            //     y.select=false
            // })
        });
        //将此选项状态改为选中
        this.y.select = true;
        this.x. highlightReset=true;//设置对应的一级列表头失去高亮

        //将改变后的整个对象数组的状态保存到本地存储
        sessionStorage.setItem('listFather',JSON.stringify($scope.listFather))
    };
    //防止刷新后$scope.listFather对象数组的状态改变
     if (JSON.parse(sessionStorage.getItem('listFather'))!=null){
         $scope.listFather=JSON.parse(sessionStorage.getItem('listFather'))
     }
     //设置点击退出登录
    $scope.loginOut=function () {
        bootbox.confirm(
            {
                message:'确认要退出吗？',
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
                            method:'post',
                            url:'/carrots-admin-ajax/a/logout',
                        }).then(function (response) {
                            if (response.data.code===0){
                                sessionStorage.clear();
                                $state.go('login');
                            }
                        })
                    }
                }
            }
        )
    }
});