$(function () {
    // 点击注册事件
    $("#link_reg,#link_login").on('click', function () {
        $(this).parents("form").hide().siblings("form").show();
    })

    // 自定义校验规则
    layui.form.verify({
        pwd: [/^\S{6,12}$/, '密码不能有空格,且6到12位'],
        repwd: function (value) {
            var pwd = $("#reg_form [name=password]").val();
            if (pwd != value) {
                return '密码不一致'
            }
        }
    })
    var { layer } = layui;
    //注册功能
    $("#reg_form").on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $("#reg_form [name=username]").val(),
            password: $("#reg_form [name=password]").val()
        }
        console.log(data);

        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) return layer.msg(res.message)
            //切换到登录
            layer.msg(res.message)
            $("#link_login").click();
            console.log(res);

        })
    })

    //登录功能
    $("#login_form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                localStorage.setItem("token", res.token);
                location.href = '/index.html';
            }
        })
    })
})