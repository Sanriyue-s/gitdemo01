$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var form = layui.form
    //渲染表格
    listXUanran()
    listCote()
    function listXUanran() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败');
                }
                layui.layer.msg('获取成功');
                // console.log(res);
                var reshtml = template('listbg', res)
                $('tbody').html(reshtml)
                toLaot(res.total)//


            }
        });
    }
    //筛选模块
    function listCote() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败');
                }
                var a = template('classList', res)
                $('#fl').html(a)
                form.render()
            }
        });
    }
    $('#layuiform').on('submit', function (e) {
        e.preventDefault();
        //拿到俩个值
        q.cate_id = $('[name = cate_id]').val()
        q.state = $('[name = state]').val()
        listXUanran()//重新渲染界面

    })
    //分页区
    function toLaot(b) {
        var laypage = layui.laypage;
        // var le = $('#btn-bj').length

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count: b, //数据总数，从服务端得到
            limit: q.pagesize, //每页几条数据
            curr: q.pagenum,//起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj,first) {
                // console.log(obj.curr)
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    listXUanran()//渲染

                    //do something
                }
            }
        });


    }
    //删除区
    $('body').on('click','.btn-sc',function(){
        var id = $(this).attr('index')
        var len = $('.btn-sc').length
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    
                    if(res.status !== 0){
                        layui.layer.msg('删除失败');
                    }
                    layui.layer.msg('删除成功');
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    layer.close(index);
                    listXUanran()
                }
            });

           
        });

    })
    //编辑区
    $('body').on('click','#btn-bj',function(){
        localStorage.setItem('id',$(this).attr('indexid'))
        location.href = '/文章/编辑.html'
    })


})