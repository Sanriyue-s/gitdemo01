$(function () {
    var Id = localStorage.getItem('id')
    var form = layui.form
    $.ajax({
        type: "get",
        url: "/my/article/" + Id,
        success: function (res) {
            console.log(res);
            if(res.status !== 0){
                layui.layer.msg('获取失败');
            }
            form.val('formlist',res.data)
            
        }
    });
    //渲染文章类别
    listXuanran()
    //富文本
    initEditor()
   
    function listXuanran() {

        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败');
                }
                var a = template('classList', res)
                $('[name = cate_id]').html(a)
                form.render()
            }
        });

    }


    //头像区
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btn-yl').on('click', function (e) {
        e.preventDefault();
        $('#ipt').click()

    })
    $('#ipt').on('change', function (e) {
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })
    //上传区域
    
    var tast = '已发布'
    $('#btn-cg').on('click', function () {
        tast = '草稿'
    })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0])
        // console.log(fd);
        fd.append('state', tast)//状态
        fd.append('Id',Id)

        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img',  blob)
                // console.log(blob);
                console.log(fd);
               
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })
    //发送ajax请求
    
    function publishArticle(fd) {
        $.ajax({
            type: "POST",
            url: "/my/article/edit",
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,

            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('发布失败');

                }
                layui.layer.msg(res.message);
                //点击
                window.parent.$('#lnc').attr('class', 'layui-this')
                window.parent.$('#lnc-o').attr('class', '')
                location.href = '/文章/文章列表.html'
            }
        });


    }
})