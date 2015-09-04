## html5AvatarCrop

利用HTML5的File API和Canvas实现本地的图片裁剪

![Image](http://images.helloarron.com/html5AvatarCrop.gif)

## CSS
```
<link rel="stylesheet" href="./html5AvatarCrop.css">
```

## JavasCript
```
<script type="text/javascript" src="./html5AvatarCrop.js"></script>
<script type="text/javascript">
  html5AvatarCrop.init();
</script>
```

## HTML
```
<input type="file" name="file" id="js_hac_post_file">
<div id="js_hac" class="hac-avatar-box">
  <div id="js_hac_label" class="hac-label">
    <canvas id="js_hac_get_image" class="hac-get-image"></canvas>
    <div>
      <canvas id="js_hac_cover_box" class="hac-cover-box"></canvas>
      <canvas id="js_hac_edit_pic" class="hac-edit-pic"></canvas>
    </div>
  </div>
  <div class="hac-croped-box">
    <span id="js_hac_show_edit" class="hac-show-edit"></span>
    <button id="js_hac_save_button" class="hac-save-button">确定</button>
    <span id="js_hac_show_pic" class="hac-show-pic"><img src=""></span>
  </div>
</div>
```

### About

个人首页：[http://helloarron.com](http://helloarron.com)

个人博客：[http://blog.helloarron.com ](http://blog.helloarron.com )
