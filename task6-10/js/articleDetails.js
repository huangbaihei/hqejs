//控制器和指令
app.controller('detailsCtrl', function ($scope, $http, $stateParams, $state) {
    //上传图片模块开始
    $scope.reader = new FileReader();//异步读取用户计算机文件
    $scope.progress = 0;//给进度条赋初始值0
    // $scope.reader.onprogress = function (e) {//上传到浏览器的进度条
    //     $scope.progress = Math.floor(e.lengthComputable ? e.loaded / e.total * 100 : 0);
    // };
    $scope.readFile = function (e) {//选择好文件后表单变化而触发函数
        $scope.$apply(function () {//告诉angular里面将要进行数据模型改变,需要进行脏检查
            $scope.file = e.files[0];//将选择的第一个文件保存
            $scope.fileName = $scope.file.name;//数据绑定此文件名
            $scope.fileSize = $scope.file.size;//数据绑定此文件大小
            $scope.showTbody = true;//展示文件信息，之前没有定义默认是false
            $scope.fileValue = e;//保存表单获取的文件参数
            //本地预览图片
            // $scope.reader.readAsDataURL($scope.file);//读取文件信息
            // $scope.reader.onload = function () {//文件上传到浏览器成功后执行函数
            //     $scope.$apply(function () {
            //         $scope.imgSrc = $scope.reader.result;//数据绑定readAsDataURL解析出来的图片地址实现本地图片预览
            //         $scope.imgShow = true;//展示图片预览
            //     });
            // };
        })
    };
    //点击上传图片
    $scope.fileUpload = function () {
        $scope.formData = new FormData();//定义一个FormData对象
        $scope.formData.append('file', $scope.file);//将文件信息存放在formData
        $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/u/img/task',
            data: $scope.formData,
            headers: {'Content-Type': undefined} //不限制格式
        }).then(function (response) {
            if (response.data.code === 0) {
                $scope.statusIcon = 'glyphicon glyphicon-ok';//改状态图标
                $scope.progress = 100;//进度条满100%，这个是上传到服务器的进度条
                $scope.imgSrc = response.data.data.url;//取服务器图片地址
                $scope.imgShow = true;//展示图片预览
            }
            else {
                bootbox.alert('服务器抛出错误');
                $scope.statusIcon = 'glyphicon glyphicon-remove'
            }
        }, function () {
            bootbox.alert('服务器没有反馈，上传失败');
            $scope.statusIcon = 'glyphicon glyphicon-remove'
        })
    };
    //点击删除图片
    $scope.fileDelete = function () {
        $scope.reader.abort();//中断上传
        $scope.progress = 0;//给进度条赋值0
        $scope.imgSrc = '';//将预览图片src赋空值
        $scope.imgShow = false;//隐藏图片预览
        $scope.fileValue.value = '';//将之前获取的文件value值设为空值
        $scope.statusIcon = '';//去掉状态图标
        $scope.showTbody = false;//隐藏文件信息展示
    };
    //上传图片模块结束
    //重定制富文本编辑器开始
    window.UEDITOR_CONFIG.toolbars = [//重定制工具栏
        ['undo', 'redo', '|', 'bold', 'italic',
            'underline', 'strikethrough', '|',
            'forecolor ', 'backcolor', '|',
            'removeformat', '|', 'insertorderedlist',
            'insertunorderedlist', '|', 'selectall',
            'cleardoc', 'paragraph', 'fontfamily',
            'fontsize', '|', 'justifyleft', 'justifycenter',
            'justifyright', '|', 'link', 'unlink', '|',
            'emotion', 'simpleupload', 'fullscreen']
    ];
    window.UEDITOR_CONFIG.elementPathEnabled = false;//关闭元素路径显示
    window.UEDITOR_CONFIG.wordCount = true;//开启字数统计
    window.UEDITOR_CONFIG.maximumWords = 800;//允许的最大字符数
    //重定制富文本编辑器结束
    //用于ng-repeat渲染多选下拉框内容
    $scope.selectType = [
        {num: '', type: '请选择'},
        {num: 0, type: '首页banner'},
        {num: 1, type: '找职位banner'},
        {num: 2, type: '找精英banner'},
        {num: 3, type: '行业大图'}
    ];
    $scope.selectIndustry = [
        {num: '', industry: '请选择'},
        {num: 0, industry: '移动互联网'},
        {num: 1, industry: '电子商务'},
        {num: 2, industry: '企业服务'},
        {num: 3, industry: 'O2O'},
        {num: 4, industry: '教育'},
        {num: 5, industry: '金融'},
        {num: 6, industry: '游戏'}
    ];
    //根据新增或编辑渲染文章详情页
    if ($stateParams.id) {//确认为编辑页
        $scope.detailsTitle = '编辑Article';//改标题
        $http({//请求数据渲染编辑页
            method: 'get',
            url: '/carrots-admin-ajax/a/article/' + $stateParams.id,
        }).then(function (response) {
            $scope.article = response.data.data.article;
            $scope.title = $scope.article.title;
            $scope.type = $scope.article.type.toString();//这里转字符串是由于html中的value经过{{}}表达式后数据类型变成了字符串
            $scope.industry = $scope.article.industry.toString();
            $scope.content = $scope.article.content;
            $scope.url = $scope.article.url;
            $scope.imgSrc = $scope.article.img;
            $scope.imgShow = true;//展示图片
        })
    }
    else {//确认是新增页
        $scope.detailsTitle = '新增Article';
    }
    //用于ng-repeat渲染button内容
    $scope.statusBtn = [
        {num: 1, btnContent: '立即上线'},
        {num: 2, btnContent: '存为草稿'},
    ];
    //为上线和草稿两个btn设置点击事件
    $scope.submitChange = function () {
        $scope.thisNum = this.x.num;//将此按钮的序号记下来用来判断点击的是哪个按钮
        if ($stateParams.id) {//确认为编辑页
            $http({
                method: 'put',
                url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                params: {//根据接口设置参数
                    title: $scope.title,
                    type: $scope.type,
                    industry: (Number($scope.type) === 3) ? Number($scope.industry) : undefined,
                    content: $scope.content,
                    url: $scope.url,
                    img: $scope.imgSrc,
                    status: ($scope.thisNum === 1) ? 2 : 1,//根据按钮类型改状态
                    // updateAt: Number(new Date())//获取当前时间并转为时间戳
                    createAt: Number(new Date()),//获取当前时间并转为时间戳,后端的参数问题，我觉得这里应该是updateAt
                }
            }).then(function (response) {
                if (response.data.code === 0) {
                    bootbox.alert(($scope.thisNum === 1) ? '上线成功' : '存稿成功');
                    $state.go('home.articleList', {reload: true})
                }
                else {
                    bootbox.alert('服务器抛回错误')
                }
            }, function () {
                bootbox.alert('服务器没有反馈')
            })
        }
        else {//确认为新增页面
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article',
                params: {
                    title: $scope.title,
                    type: $scope.type,
                    industry: (Number($scope.type) === 3) ? Number($scope.industry) : undefined,
                    content: $scope.content,
                    url: $scope.url,
                    img: $scope.imgSrc,
                    status: ($scope.thisNum === 1) ? 2 : 1,//根据按钮类型改状态
                    createAt: Number(new Date()),//获取当前时间并转为时间戳，这个参数可以不要
                }
            }).then(function (response) {
                if (response.data.code === 0) {
                    bootbox.alert(($scope.thisNum === 1) ? '上线成功' : '存稿成功');
                    $state.go('home.articleList', {reload: true})
                }
                else {
                    bootbox.alert('服务器抛回错误')
                }
            }, function () {
                bootbox.alert('服务器没有反馈')
            })
        }
    }
});