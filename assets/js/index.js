$(function () {
    getTouxiang()

    //点击右上角退出时间
    $(".login_out").on("click", function () {
        //使用layui里面的内置对象
        layer.confirm('确认退出登陆吗?', { icon: 3, title: '提示' }, function (index) {
            //do something

            layer.close(index);
            localStorage.removeItem("token");
            location.href = '/login.html';
        });
    })
})

function getTouxiang() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);

            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败');
            }

            //1. 如果用户邮昵称就用昵称显示,如果没有昵称就用登录名显示
            if (res.data.nickname == '') {
                //使用登录名显示
                $(".userinfo .welcome").html(res.data.username);
            } else {
                // 使用昵称显示
                $(".userinfo .welcome").html(res.data.nickname);
            }

            //2. 如果用户没有头像则使用名字的首字母设置头像
            if (res.data.user_pic == null) {
                // 等于空则用用户名设置头像
                $(".text-avatar").html(res.data.username[0].toUpperCase()).show();
            } else {
                //有头像则设置头像
                $(".layui-nav-img").attr('src', res.data.user_pic).show();
            }


        },
        //3. 做安全判定,防止用户直接输入index的地址直接进入后台
        complete: function (res) {
            console.log(res);
            if (res.responseJSON.status != 0) {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })
}