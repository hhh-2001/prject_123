$(function () {
    // 密码验证规则
    var { layer } = layui;
    layui.form.verify({
        pwd: [/^\S{6,12}$/, '密码不能有空格,且是6到12位数'],
        repwd: function (value) {
            var pwd = $("[name=newPwd]").val();
            if (value != pwd) {
                return '密码不一致';
            }
        }
    })


    // 密码验证过关可以发起ajax请求
    $("#myform").on("submit", function (e) {
        // 阻止默认行为
        e.preventDefault();
        console.log(11);

        $.ajax({
            method: "post",
            url: '/my/updatepwd',
            data: $('#myform').serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('修改密码失败')
                }

                layer.msg('修改密码成功,请重新登录');
                //跳转到登录页面,并清空token
                localStorage.removeItem('token');

                // 注意这里的跳转链接是在iframe里面跳转,所以不能直接location.href
                window.parent.location.href = '/login.html'
            }
        })
    })
})