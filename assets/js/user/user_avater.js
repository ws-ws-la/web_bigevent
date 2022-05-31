$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
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

//模拟点击上传
$('#btnChooseImage').on('click', function() {
    $('#file').click();
})
$('#file').change((e) => {
    const fileLength = e.target.files.length
    if(fileLength === 0) return;
    //拿到用户上传的图像
    const file = e.target.files[0]
    //将图片转为路径
    const imgUrl = URL.createObjectURL(file)
      // 3. 重新初始化裁剪区域
      $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
})

//上传图像
$('#btnUpload').click(() => {
      // 1、拿到用户裁切之后的头像
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png");
    $.ajax({
        type: "POST",
        url : "/my/update/avatar",
        data : {
            avatar: dataURL,
        },
        success : (res) => {
            if(res.status !== 0) return layer.msg('更换图像失败！')
            layer.msg('更换图像成功！')
            window.parent.getUserInfo()
        }
    })
})
})