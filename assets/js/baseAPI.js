$.ajaxPrefilter((option) => {
    option.url = `http://www.liulongbin.top:3007` + option.url

    //为/my/相关接口注入 token
    if(option.url.includes('/my/')) {
      option.headers =  {
           Authorization: localStorage.getItem('token'),
             }
    }
    //每次发送请求回来校验 token是否存在，是否过期
    option.complete = (res) => {
      // console.log(res);
      if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！')  
      {
        //强制清空token
        localStorage.removeItem('token')
        //强制跳转页面
        location.href = '/login.html'
      }
    }
})