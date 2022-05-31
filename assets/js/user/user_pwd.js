$(function() {
    const form = layui.form;
    //校验验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        samePwd : (val) => {
            if(val === $('[name=oldPwd]').val())  return '新旧密码不能一致'
        },
        rePwd : (val) => {
            if(val !== $('[name=newPwd]').val()) return '两次密码输入不一致'
        }
    })

    //更新密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault(),
        $.ajax({
            type: 'POST',
            url : "/my/updatepwd",
            data : $(this).serialize(),
            success: function(res) { 
                if(res.status !== 0) return layer.msg('更新密码失败！')
                localStorage.removeItem('token')
              window.parent.location.href = '/login.html'
            }
        })
    })
})