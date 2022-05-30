$(function() {
    $('#link_reg').click(() => {
       $('.login-box').hide()
       $('.reg-box').show()
    })
    $('#link_login').click(() => {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    const form = layui.form
    const layer = layui.layer
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        repwd : (value) => {
            const pwd = $('#form_reg [name = password]').val();
            if (pwd !== value) return '两次密码输入不一致'
        }
    })
    //baseURL接口
    // const baseurl = 'http://www.liulongbin.top:3007'
//注册功能
    $('#form_reg').on('submit', e => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'/api/reguser',
             data : {
                 username :$('#form_reg [name = username]').val(),
                 password :$('#form_reg [name = password]').val(),
             },
             success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败')
                layer.msg('注册成功')
                //模拟点击跳转登陆
                $('#link_login').click()
             }
        })
    })

    //登陆功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'/api/login',
            data : $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('注册失败');
                layer.msg('注册成功')
                //跳转成功后把token存储到本地
               localStorage.setItem('token', res.token);
               //跳转到主页
               location.href = '/index.html';
            }
        })
    })
})