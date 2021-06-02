# Sticky Nav 固定导航栏设计 📌

> 油管视频：[Vanilla JavaScript Sticky Nav](https://www.youtube.com/watch?v=5FLOBCGH3_U&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=25) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [总体思路](#总体思路)
  * [过程指南](#过程指南)
  * [问题解决](#问题解决)
  * [延伸阅读](#延伸阅读)



## 实现效果

![sticky nav](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210525105331_D24.gif)

页面向下滚动至导航栏从可视区消失时，将之固定于页面顶部，并显示页面LOGO，方便用户进行页面导航。



## 涉及语法

- CSS
  - position: fixed
  - transform: scale()
  - max-width
  - flex: 1
- JS
  - window.addEventListener('scroll', func)
  - Element.offsetHeight
  - Element.offsetTop



## 总体思路

- 获取导航栏到document顶部的距离；
- 监听页面的滚动事件
- 当页面滚动距离大于或等于导航栏顶部距离时，为`body`添加新的类名`fixed-nav` 
- 添加上`.fixed-nav`的类的相关样式



## 过程指南

1. 获取导航栏相对于整个文档的位置，作为后续切换比较的标志；再对window监听滚动事件

   ```js
   const navTop = nav.offsetTop;
   window.addEventListener('scroll',fixNav)
   ```

2. 实现动态改变导航栏样式的函数`fixNav`，即为body元素添加或移除类`fixed-nav`

   ```js
   function fixNav(){
       // console.log(nav.offsetTop,window.scrollY)
       if(navTop <= window.scrollY){
           document.body.style.paddingTop = nav.offsetHeight + 'px'
           document.body.classList.add('fixed-nav');
       }else{
           document.body.style.paddingTop = 0;
           document.body.classList.remove('fixed-nav');
       }
   }
   ```

3. 在CSS样式表中复写样式，添加类`fixed-nav`选择器，覆盖初始样式，实现动态改变

   ```css
   .fixed-nav nav {
     position: fixed;
     box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1);
   }
   
   .fixed-nav li.logo {
     max-width: 200px;
   }
   
   .fixed-nav .site-wrap {
     transform: scale(1);
     -webkit-transform: scale(1);
     -moz-transform: scale(1);
     -ms-transform: scale(1);
     -o-transform: scale(1);
   }
   ```



## 问题解决

1. 当修改nav为fixed布局后，底下的内容会占据之前nav的位置，此时nav是脱离文档流的。为了防止内容的抖动，则填充该空间：为页面`body`添加`padding-top`的值为导航栏的高度(`nav.offsetHeight`)

   ```js
   document.body.style.paddingTop = nav.offsetHeight + 'px'
   document.body.style.paddingTop = 0;
   ```

2. 在显示logo前，对应的`li`标签设置`max-width: 0`，所以默认没有显示。因为设置了`flex: 1`，所有的`li`标签会平均分配`ul`的长度，而忽视自定义`width`的值 。则在显示logo时，也需要同样定义`max-width`。

   ```css
   .fixed-nav li.logo {
     max-width: 200px;
   }
   ```



## 延伸阅读

[一文看懂js中元素偏移量（offsetLeft,offsetTop,offsetWidth,offsetHeight）](https://www.cnblogs.com/jsydb/p/12341035.html)

[js中的各种“位置”——“top、clientTop、scrollTop、offsetTop……”](https://www.cnblogs.com/youziclub/p/4811069.html)