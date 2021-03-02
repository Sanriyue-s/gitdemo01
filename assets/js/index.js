$(function(){
    //一开始就调用
    cuShihua()
    //退出模块
    $('#tuichu').on('click',function(){
        var layer = layui.layer
        layer.confirm('是否退出页面?', {icon: 3, title:'提示'}, function(index){
            //do something
            //先清除 再退出
            localStorage.removeItem('token') 
            //跳转到登录页面
           location.href = '/login.html'
            layer.close(index);
          });
          
    })

})
//页面初始化
function cuShihua(){
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        data: "data",
        success: function (res) {
            if(res.status !== 0){
                return layui.layer.msg('初始化失败');
            }
           
            layui.layer.msg(res.message);
            xuanran(res.data)    
        }
    });

}
//渲染初始化
function xuanran(ues){
    //有昵称就用昵称 没有就用用户名
    var name = ues.nickname || ues.username
    //渲染到界面
    $('.uers').html('欢迎&nbsp;' + name)
    //判断头像有没有图片
    if(ues.user_pic !== null){
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src',ues.user_pic).show()
    }else{
        $('.layui-nav-img').hide()
        //把用户名的第一个字符传入
        $('.text-avatar').html(name[0]).show()
    }


}