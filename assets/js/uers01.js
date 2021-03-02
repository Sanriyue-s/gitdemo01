$(function(){
    //先初始化
    chuShihua()
    var form= layui.form
    function chuShihua(){
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status !== 0){
                    return layui.layer.msg('初始化失败');
                }
               
                layui.layer.msg(res.message);
                //layui自带渲染页面
                form.val('formUserInfo',res.data)
            }
        });
    
    }
    //设置正则
    form.verify({
        pass: [
            /^[\S]{1,6}$/
            , '昵称必须1~6位'
        ] 
    })
   
    //提交信息
    $('#uersinfo').on('submit',function(e){
        //阻止默认行为
        e.preventDefault();
        //获取表单内容
        var data = $(this).serialize()
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: data,
            success: function (res) {
                if(res.status !== 0){
                    return layui.layer.msg('更新失败');
                }
                layui.layer.msg(res.message);
                //调用父元素的函数重新渲染页面
                window.parent.cuShihua()
            }
        });

    })
    //重置信息
    $('#cz').on('click',function(e){
        e.preventDefault();
        chuShihua()
    })

})