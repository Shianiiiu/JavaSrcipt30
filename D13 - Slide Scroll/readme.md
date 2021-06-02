# Slide in on Scroll 图片随屏幕滚动而滑入滑出 📲

> 油管视频： [JavaScript Slide In on Scroll  ](https://www.youtube.com/watch?v=uzRsENVD3W8&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=15) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥

 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [解决思路](#解决思路)
  * [过程指南](#过程指南)
  * [难点思考](#难点思考)
  * [问题疑惑](#问题疑惑)
  * [延伸阅读](#延伸阅读)

## 实现效果

![slide  scroll](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210508112836_D13_SlideScroll.gif)

(图片大小限制，可在文件中查看)

页面中的文章有几张配图，随着页面上下滚动，图片位置划过图片一半时，图片从两侧滑入；图片位置离开可见区域时，图片向两侧滑出。



## 涉及语法

涉及控制图片的 CSS 属性：

- `translateX` 来控制左右移动
- `scale` 来控制缩放

涉及页面尺寸的属性：

- `window.scrollY` 文档从顶部开始滚动过的像素值
- `window.innerHeight viewport` 部分的高度
- `ele.height` 元素的高度
- `ele.offsetTop` 当前元素顶部相对于其 offsetParent 元素的顶部的距离。

`debounce` 的作用： 降低事件监听的频率，使用了 Lodash 中的 debounce 方法。

```js
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
```

## 解决思路

1. 获取页面中的所有图片元素
2. 滚动事件监听
3. 尺寸获取及处理
4. 滚动至指定区域的条件判断



## 过程指南

1. 获取所有涉及到的图片

   ```js
   const slideImages = document.querySelectorAll('.slide-in');
   ```

2. 滚动事件监听

   ```js
       function checkSlide(e) {
           console.log(e);
           console.count(e);
       }
   
       window.addEventListener('scroll', debounce(checkSlide));
   ```

   针对页面的滚动事件进行监听，可以先打出事件对象来看看。同时在接下来的调试过程中也能利用这打出各个尺寸的值，来帮助我们感受每个尺寸的含义。 此外由于每次滚动都触发监听事件，会降低 JavaScript 运行性能，所以用`debounce`函数来降低触发的次数。

3. 针对每次监听到的滚动事件，遍历所有图片元素，判断是否显示或隐藏图片。

4. 对于满足显示条件的，给此图片添加 `.active` 类，不满足的则去掉。

   ```js
   if (isHalfShow && isNotScrollPast) {
       img.classList.add('active');
   } else {
       img.classList.remove('active');
   }
   ```



## 难点思考

该练习中涉及到很多距离的计算，在定义图片滑入滑出标志时需要使用不同距离的判断：

```js
// 滑动页面的底部距离扣除图片一半的高
const slideInAt = (window.scrollY + window.innerHeight) - img.height / 2;
// 图片底部距离顶端的距离
const imgBottom = img.offsetTop + img.height;
```

```js
// 已滑过了图片的一半
const isHalfShow = slideInAt > img.offsetTop;
// 未完全滑过图片
const isNotScrollPast = window.scrollY < imgBottom;
```

两个临界点，一个是下滑到图片的一半处，另一个是完全滑过图片使图片已不再视窗之内，分别决定了图片的显示和隐藏。

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210508113714.png" style="zoom:50%;" />

- 首先获取触发动画的位置，在滚动到图片一半的位置时触发。`const slideAt = window.innerHeight + window.scrollY - sliderimage.height/2;`
  - `window.innerHeight`表示浏览器的内部视图窗口的高度值
  - `window.scrollY`表示浏览器当前的在Y轴上滚动的距离（未滚动时值为0），也可通过采用`window.scroll(X,Y)`方法，设置页面在X轴和Y轴上面的滚动值
- 再获取图片底部到页面文档顶端的距离，采用`const imageBottom = sliderimage.offsetTop + sliderimage.height;`
  - `sliderimage.offsetTop`表示该图片最上面的值，到页面文档顶端的距离，再加上该图片的高度，就是图片底部到页面文档顶端的距离
- 设置两个flag，分别表示图片是否显示了一半和图片是否已经被完全滚动出去了，分别为`const isHalfShown = slideAt > sliderimage.offsetTop;`，`const isNotScrolledPast = window.scrollY < imageBottom;`
- 只有当图片已经显示了一半并且没有被图片没有被滚动出窗口是，图片才会显示出来。

## 问题疑惑

在设置图片滑入时，本意是当图片显示`1/2`高度时触发动画效果，但是实际操作时发现当图片将近全部滚动出现后才会触发。即`const slideAt = window.innerHeight + window.scrollY - sliderimage.height/2;` 失效，经过不同浏览器测试均发现此结果。具体原因不得而知ಥ_ಥ。

```js
const slideInAt = (window.scrollY + window.innerHeight) + sliderImage.height / 3;
```

经过调整为以上语句，基本能达到尽人意的阅读效果。



## 延伸阅读

[JS offsetTop、clientTop、scrollTop、offsetTop各属性介绍](https://www.jianshu.com/p/39f4730d3815)

[html中offsetTop、clientTop、scrollTop、offsetTop各属性介绍](https://blog.csdn.net/u013795673/article/details/52171411)

[Stackoverflow difference between screenX/Y, clientX/Y and pageX/Y](https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y)