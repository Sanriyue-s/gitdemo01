$(function(){
    //点击去注册页面
    $('.fr').on('click',function(){
        $('.form').hide()
        $('.reg-box').show()
     
    })
    //点击去登录页面
    $('.dl').on('click',function(){
        $('.form').show()
        $('.reg-box').hide()
     
    })
    //设置密码正则表达式
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          //判断两次密码是否相同
         repwd: function(value){
             var pwd = $('.reg-box [name=password]').val()
             if(pwd !== value) {
               return  '请输入两次一样的密码';
             }
         }
    })
   //注册事件
    $('#zhuche').submit(function(e){
        e.preventDefault();
        var data = {
            username:$('.reg-box [name = title]').val(),
            password:$('.reg-box [name = password]').val()
        }
        $.post("/api/reguser", data,
            function (res) {
                if(res.status !== 0){
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('注册成功');
                $('.dl').click()
                $('#zhuche input').val('')
            },
           
        );

    })
    //登录事件
    $('#denglu').submit(function(e){
        e.preventDefault();
        // console.log(2222);
        var data = {
            username:$('.form [name = title]').val(),
            password:$('.form [name = password]').val()
        }
        $.post("/api/login", data,
            function (res) {
                if(res.status !== 0){
                  return  layui.layer.msg(res.message);
                }
                layui.layer.msg('登录成功');
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            },
           
        );

    })
})