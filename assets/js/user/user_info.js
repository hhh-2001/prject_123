$(function () {
    formUserInfo()
    //校验表单规则
    layui.form.verify(function (value) {
        if (value != $("[name=nickname]").val()) {
            pwd: [/^\S{6,12}$/, '用户名长度不能大于6位数']
        }
    })
    var form = layui.form;
    // 自动渲染登录名称
    function formUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('获取信息失败');
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    //提交修改功能
    $("#myform").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('提交修改失败');
                }
                layui.layer.msg("提交修改成功");
                formUserInfo();
            }
        })
    })

    //重按钮
    $("#btnreset").on('click', function (e) {
        //阻止重置按钮默认行为
        e.preventDefault();
        formUserInfo();
    })


})