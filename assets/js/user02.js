$(function () {
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        pwd: function (value) {
            if (value == $('[name = oldPwd]').val()) {
                return '新旧密码不能相同'

            }

        }, pwds: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '输入的两次密码不相同'

            }

        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('提交失败');
                }
                layui.layer.msg(res.message);
                //重置表单
                $('.layui-form')[0].reset()
                
                layer.alert('已经重置密码是否重新登录?',function(index){
                    //do something

                    // window.parent.location.href = '/login.html'
                    localStorage.removeItem('token')
                    //返回登录页
                   window.parent.location.href = '/login.html'
                    
                    layer.close(index);
                  });
               
            }
        });
    })


})