//控制器和指令
app.controller('loginCtrl', function ($scope, $http, $state) {
    $scope.submitForm = function (formValid) {
        $scope.message='';//将错误提示信息清空
        if (formValid) {//判断表单是否已填
            // 开始post请求
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/login',
                data: $.param({name: $scope.name, pwd: $scope.pwd}),//序列化
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}//请求头
            }).then(function successCallback(response) {
                if (response.data.code == 0) {
                    $state.go('home');
                }
                else {
                    $scope.message = response.data.message;//data中包含data、code、message
                }
            })
        }
    };
});