$(function () {
    var form = layui.form
    listXuanran()
    function listXuanran() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res); 
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章信息失败');
                }
                layui.layer.msg(res.message);
                var a = template('aritlce', res)
                $('tbody').html(a)
            }
        });
    }
    //添加类别
    var layer = layui.layer
    // var indexOpen = null
    $('#btn-add').on('click', function () {
        //先开启一个弹窗
        var indexOpen = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#btnAdd').html()
        });
        $('body').on('submit', '#btnadd', function (e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/my/article/addcates",
                data: $('#btnadd').serialize(),

                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('添加失败');

                    }
                    layui.layer.msg('添加成功');
                    layer.close(indexOpen);//关闭弹框
                    listXuanran()

                }
            });
        })
    })
    //编辑区
    $('tbody').on('click', '.bianj', function () {
        // console.log('a');
        var indexid = $(this).attr('indexid')
        // console.log(indexid);
        var indexBj = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#btnBj').html()
        });
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + indexid,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败');
                }
                layui.layer.msg('获取成功');
                // console.log(res.data);
                form.val('form-edit', res.data)
            }
        });
        $('body').on('submit', '#form-b', function (e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('编辑失败');
                    }
                    layui.layer.msg('更新数据成功');
                    layer.close(indexBj);//关闭弹框
                    listXuanran()
                }
            });

        })
    })
    //删除区
    $('body').on('click', '.btn-sc', function () {
        var id = $(this).attr('index')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if(res.status !== 0){
                        layui.layer.msg('删除失败');
                    }
                    layui.layer.msg('删除成功');
                    layer.close(index);
                    listXuanran()
                }
            });

           
        });
    })

})