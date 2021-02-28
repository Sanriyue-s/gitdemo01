$(function(){
    $('.fr').on('click',function(){
        $('.form').hide()
        $('.reg-box').show()
     
    })
    $('.dl').on('click',function(){
        $('.form').show()
        $('.reg-box').hide()
     
    })
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] 
    })
})