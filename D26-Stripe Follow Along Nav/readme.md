# Strip Follow Along Nav 导航栏动作下拉菜单 ⬇

> 油管视频：[Stripe Follow Along Dropdown Navigation](https://www.youtube.com/watch?v=GvuWJSXYQDU&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=29) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥





## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210528093436_D26.gif" alt="D26 nav dropdown" style="zoom:80%;" />

当鼠标悬停于导航按钮时，显示对应下拉菜单的内容。



## 涉及语法

- CSS
  - [perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective) （似乎没看到用处——）
  - [CSS Selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) 
    - [Child combinator](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators#child_combinator) — `ele > ele` 
    - [Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) — `[attr *= value]`
  - [translate3D(x,y,z)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translate3d())
- JS
  - setTimeout()
  - getBoundingClientRect()
  - style.setProperty()
  - `&&` 条件判断（短路规则）
  - 鼠标事件
    - mouseenter
    - mouseleave



## 总体思路

- 下拉菜单的内容和白色背景已经定义好，需要根据鼠标事件显示或动态改变样式。

  > 之所以格外用`div`块设置白色背景，而不是直接为下拉菜单设置白色背景，是因为在视觉呈现上有滑块的移动效果。

- 鼠标移入后，下拉菜单和背景已经显示，但是此时菜单内容还是`opacity: 0` 。为了有过渡效果，设置定时器`settimeout(fn,150)` ，来延迟添加下拉菜单的`trigger-enter-active`类名。



## 过程指南

1. 导航栏选项添加鼠标监听事件——注意：笔者认为Wes把监听事件设置在`li`标签而不是`a`标签上，是采用了**事件委托**机制。如果监听a标签，在一个下拉菜单弹出后，移动到菜单内容上时，则监听器会判断鼠标此时移出了。

   - HTML 导航栏选项结构：

       ```html
       <li>
           <a href="#">About Me</a>
           <div class="dropdown dropdown1">
               <div class="bio">
                   <img src="https://logo.clearbit.com/wesbos.com">
                   <p>Wes Bos sure does love web development. He teaches things like JavaScript, CSS and BBQ. Wait. BBQ isn't
                   part of web development. It should be though!</p>
               </div>
           </div>
       </li>
       ```

   - JS 鼠标事件监听：

       ```js
       const triggers = document.querySelectorAll('.cool > li');

       triggers.forEach(trigger => {
           trigger.addEventListener('mouseenter', mouseEnter);
           trigger.addEventListener('mouseleave', mouseLeave)
       })
       ```

2. 鼠标移入添加类名，显示下拉菜单  /  鼠标移出

   ```js
   function mouseEnter() {
       this.classList.add('trigger-enter');
       //&&判断，短路
       setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
       background.classList.add('open');
   }
   
   function mouseLeave() {
       // console.log('leave!')
       this.classList.remove('trigger-enter', 'trigger-enter-active');
       background.classList.remove('open')
   }
   ```

   ```css
   .trigger-enter .dropdown {
       display: block;
   }
   
   .trigger-enter-active .dropdown {
       opacity: 1;
   }
   
   .dropdownBackground.open {
       opacity: 1;
   }
   ```

   - 根据添加的类名，复写选择器样式属性，主要改变`display: none` 和`opacity: 0` 
   - setTimeout()定时器，间隔150ms后才显示下拉菜单内容 `opacity: 1`，有一个时间差，动画更生动👾

3. 白色背景的位置移动，和下拉菜单组合在一起，这就要根据不同的导航栏选项获取宽高

   ```js
   //针对不同的nav项选择不同的dropdown内容
   const dropdown = this.querySelector('.dropdown');
   
   const dropdownCoords = dropdown.getBoundingClientRect();
   const navCoords = nav.getBoundingClientRect();
   
   const coords = {
   height: dropdownCoords.height,
   width: dropdownCoords.width,
   top: navCoords.height,
   left: dropdownCoords.left
   }
   ```

   ```js
   //设置dropdown的白色背景的宽高和位置
   background.style.setProperty("width", `${coords.width}px`);
   background.style.setProperty("height", `${coords.height}px`);
   background.style.setProperty("transform",`translate(${coords.left}px,${coords.top}px)`)
   ```
   
   🤡Tips: 移动白色背景块时，如果使用`translate3D`，会触发硬件加速，开启了硬件加速的`transform`是不会触发界面`repaint`的，拥有更好的性能。
   
   

## 问题解决

我们设置了150ms延迟之后添加`trigger-enter-active`类，那么有可能会发生这样的情况：当我们以飞快的速度在各个选项之间切换的时候，有可能还没有到150ms鼠标就已经移出了选项了，这时在150ms之后，就会多添加了`trigger-enter-active`类在每一个选项里面，造成意想不到的错误。 

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210528104501.gif" alt="nav dropdown bug" style="zoom:50%;" />

因此我们加了一句判断，150ms后只有当该鼠标还悬停在这个选项之中的时候，我们才添加`trigger-enter-active`类。

```js
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```

