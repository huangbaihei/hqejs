var app = angular.module("myApp", ['ui.router','ui.bootstrap','ng.ueditor']);
app.config([
    "$stateProvider",//路由状态
    "$urlRouterProvider",//路由重定向
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider//配置路由重定向
            .when('', '/login');
        $stateProvider//定义路由状态
            .state('login', {url: '/login', templateUrl: 'login.html'})//登录页面
            .state('home', {url: '/home', templateUrl: 'home.html'})//后台首页
            .state('home.articleList',{url:'/articleList?size&page&startAt&endAt&type&status',templateUrl:'articleList.html'})//文章列表页
            .state('home.articleDetails',{url:'/articleDetails?id',templateUrl: 'articleDetails.html'})
    }]);