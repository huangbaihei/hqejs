Page({
 data:{
   currentTab: 0,
   navbarTitle: ['职业门槛', '难易程度', '成长周期', '求贤企业', '入学基础', '薪资待遇'],
 },
 changeId:function(e){//点击实现切换
this.setData({
  currentTab: e.currentTarget.dataset.id
})
},
 onLoad:function(e){
   //将上个页面传过来的数据取出来
   var finallyRank = JSON.parse(e.finallyRank);
   var that=this;//存一下全局对象
   var jobDetails=[];//声明空数组用来放数据
   wx.request({//向葡萄藤官网发出数据请求,需要先设置不校验合法域名才能成功请求
     url:'http://www.jnshu.com/a/occupation/list',
     header: {'content-type': 'application/json'},//json请求头
     success:function(response){
       if(response.data.code===0){
         //用一个遍历将上个页面选出来的三个序号对应的职业抽出来，并用数组保存相应的信息
         for (var i = 0; i < finallyRank.length;i++){
           jobDetails.push(response.data.data.occupations[finallyRank[i] - 1]);//因为finallyRank数组是从1开始的所以要减1
           jobDetails[i].salary = JSON.parse(jobDetails[i].salary);//将jobDetails里的salary从字符串变回数组，不然后面没法用
         };
         that.setData({//将数据存到data里才能拿来渲染视图
           jobDetails
         });
         //如果用this.setData在外面存将会使data里的jobDetails变成空数组
       }
     }
   });
 }
})