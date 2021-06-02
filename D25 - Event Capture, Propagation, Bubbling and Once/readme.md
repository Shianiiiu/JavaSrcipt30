# Event Related 事件捕获、冒泡等 ⛓

> 油管视频：[JavaScript Event Capture, Propagation and Bubbling](https://www.youtube.com/watch?v=F1anRyL37lE&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=26) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [涉及语法](#涉及语法)
  * [代码示例](#代码示例)
  * [相关知识](#相关知识)
  * [总结](#总结)
  * [延伸阅读](#延伸阅读)



## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210526105208_D25.png" alt="image-20210526105200796" style="zoom:50%;" />

了解学习DOM的事件机制，包括事件捕获，事件冒泡，单次触发等。



## 涉及语法

- forEach()
- [EventTarget.addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)



## 代码示例

```js
const divs = document.querySelectorAll('div');

function logtext(e){
    //停止事件的传播，不单单只是冒泡
    // e.stopPropagation();

    console.log(this.classList.value);
}

divs.forEach(div => {
    div.addEventListener('click',logtext,{
        capture: false,
        //once 只触发一次
        // once: true
    })
})

document.body.addEventListener('click',logtext,{
    capture: false,
    //once 只触发一次
    // once: true
});
```



## 相关知识

1. `EventTarget.addEventListener('eventName',callback,option)`

   元素的事件注册方法，接收三个参数，第一个参数为事件的名称（点击`click`、双击`dbclick`、改变`change`等），第二个参数是该事件的回调函数，也称为监听器，第三个参数为事件注册的选项对象，通常会包含两个配置项（是否事件捕获`capture`以及单次执行`once`事件，它们两个的默认值都是`false`）。

2. **Event Flow 事件流**

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210526110001_eventflow.png" alt="eventflow" style="zoom:50%;" />

- 在本例中，点击任何一个div，默认都要从顶层window沿着doms树向下遍历（因为不管你点击哪个div，肯定都会点击到window），直到点击事件的target的父元素，这个向下的过程叫做**捕获**。

- 在捕获的遍历过程中，遇到的元素如果绑定了listener监听器，监听经过的click事件，那本来是要执行handler函数的。但默认情况下捕获阶段不会执行，也就是**capture默认为false**。
- 找到目标之后，运行相应的监听事件（handler函数），但默认会进入到下一阶段也就是**冒泡**。
- 默认事件在冒泡阶段执行，冒泡是由内向外的，即dom树从下向上。你点击了div，如果父元素也有click事件的监听器。那么先执行子元素的click事件handler，然后执行父元素的handler。

3. 如何**阻止事件冒泡**？

   按照事件流的顺序，阻止事件冒泡那就打破或截断事件流的进程：`e.stopPropagation()` 

   如果handler函数中调用了`stopPropagation()` ，那么三个阶段遇到此语句的时候就停止。冒泡阶段只是一个阶段，所以使用该语句不仅仅停止冒泡，哪个阶段遇到了都会停止传播。

   ```js
   function logtext(e){
       //停止事件的传播，不单单只是冒泡
       e.stopPropagation();
   
       console.log(this.classList.value);
   }
   ```

   <img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210526112358.png" alt="image-20210526112358168" style="zoom:50%;" />



## 总结

事件冒泡和事件捕获只是**事件监听器的执行顺序不同**：事件捕获在由外到内将监听器入栈的过程中，只要有注册事件入栈，就直接执行并出栈；事件冒泡意为当由外到内所有事件入栈完毕后，事件由内向外执行执行。

通过给元素对象绑定事件的方法addEventlistener()第三个参数决定事件的执行阶段是在冒泡阶段还是捕获阶段，当 第三个参数capture为false时，为冒泡阶段，通常省略该参数是默认的是冒泡，如果为true则是捕获阶段。



## 延伸阅读

[DOM事件流和 event的三个阶段（冒泡，捕捉，目标）详解（一）理论部分（精华）](https://blog.csdn.net/kouryoushine/article/details/100019632?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242)

[JS中的事件冒泡（Bubble）和事件捕获（capture）以及如何阻止事件的冒泡](https://www.cnblogs.com/heshan1992/p/5470748.html)

[Bubbling and capturing](https://javascript.info/bubbling-and-capturing#:~:text=There%E2%80%99s%20another%20phase%20of%20event%20processing%20called%20%E2%80%9Ccapturing%E2%80%9D.,%E2%80%93%20the%20event%20bubbles%20up%20from%20the%20element.)