# Local Storage 本地存储 💾

> 油管视频： [How LocalStorage and Event Delegation work.](https://www.youtube.com/watch?v=YL1F4dCUlLc&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=16) 📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [解决思路](#解决思路)
* [过程指南](#过程指南)
  * [1、添加item事件](#1添加item事件)
  * [2、切换状态保存事件](#2切换状态保存事件)
  * [3、列表显示函数（更新HTML）](#3列表显示函数更新html)
* [延伸阅读](#延伸阅读)

## 实现效果

<img src="https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210511110935_D15.png" alt="image-20210511110927593" style="zoom:50%;" />

我们的目的是使网页模拟菜单的效果，在页面中添加新的菜品，而且在页面刷新之后也不清空。

## 涉及语法

- Event
  - [event.preventDefault](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
  - [eventTarget.addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
  - [event.target](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target)
- [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/LocalStorage)
  - `localStorage.setItem()`
  - `localStorage.getItem()`
- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
  - `JSON.stringify()`
  - `JSON.parse()`
- [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)

## 解决思路

- 提前预定义好所有用到的变量；

  ```js
  const addItems = document.querySelector('.add-items'); // 添加item的表单
  const itemsList = document.querySelector('.plates'); // todolist列表
  const items = JSON.parse(localStorage.getItem('items')) || []; // 本地缓存的所有todoitem
  ```

- 为addItems按钮添加事件函数，添加一个新的todo item并存储到本地缓存；
- 监听itemList下面的子元素input的点击事件，切换是否完成的状态，并更新本地存储，保证刷新本页面是数据不会丢失；
- 分别设置两个监听器，监听addItems的submit事件，和itemsList的点击事件；

## 过程指南

### 1、添加item事件

默认情况下，在表单空间拥有焦点时按下 `Enter` 键或者点击提交按钮，会提交表单，提交时，浏览器会在发送请求给服务器之前触发 `submit` 事件。触发后会<u>刷新整个页面</u>，这是 `submit` 的默认行为，造成闪屏，影响体验。**所以我们需要先去除此事件的默认行为。**

```js
function addItem(e) {
  e.preventDefault();
}
```

在事件监听中，`this` 可以获取当前 form 即我们为其添加事件监听的 `addItem` 元素，所以可以借此方便的获取输入框中的值。在 `addItem()` 方法中获取输入，并构造一个对象 `item` 来存储这个信息:

整体代码：

```js
function addItem(e) {
  e.preventDefault(); // 阻止默认事件的触发，防止在提交后页面自己刷新
  const text = this.querySelector('[name=item]').value;
  const item = {
    text, // ES6的简写形式 => text = text;
    done: false
  };
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  this.reset(); // 添加完数据后，重置输入框      
}
addItems.addEventListener('submit', addItem);
```

- 监听addItems的submit事件，当用户点击`enter`或者点击右侧的submit按钮的时候触发；
- `text,`是ES6的缩写形式，即代表`text = text,`
- `localStorage`的常用API：
  - localStorage.setItem(‘key’,value); -> 设置本地缓存，以key-value的形式
  - localStorage.getItem(‘key’); -> 根据参数key取得本地缓存中对应的值
  - localStorage.clear(); -> 清空本地的缓存
  - localStorage.removeItem(‘key’); -> 删除key所对应的那一条本地缓存
- ‼ localStorage中只能存储字符串，所以我们经常会用到： `JSON.stringify(object)`将一个对象转换为字符串，再使用`JSON.parse(objSting)`将一个对象字符串转换为对象
- `this.reset();`代表将表单重置，清空表单中的值，在我们进行了一次submit之后，如果不重置表单的话，表单中的值将不会消失，这将大大影响用户体验

### 2、切换状态保存事件

在checkbox点击之后，checked的状态在刷新之后会失效，所以也要将此状态信息存储在本地缓存中。

```js
function toggleDone(e) {
  if (!e.target.matches('input')) return; // 跳过所有的label，只处理input
  const node = e.target;
  const index = node.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}
itemsList.addEventListener('click', toggleDone);
```

在这里的监听事件在设置在item的父元素上，也就是itemList。因为列表中的item在刷新之后，定义在item上的监听事件将无法继续作用。这里就引入了**事件委托**的概念：[参考StackOverflow](https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation) 、[另一篇文章](https://dmitripavlutin.com/javascript-event-delegation/)

- 假设我们队一个input列表进行了时间监听，但我们如法保证，此列表在接下来的状态下是否进行了更新，刷新等改变原来节点的操作，如果有这样的操作出现，那么我们之前的事件监听器就无法再起到监听的作用；
- 但我们可以对input列表的父元素进行事件监听，让它们的父元素处于监听状态，当我们所点击的元素是其子元素的话，就告诉它的子元素，执行相应的事件；
- 相当于委托父元素帮我们监听所有子元素，这样无论子元素列表进行怎么样的更新，改变，只要父元素节点不发生改变就可以持续起到监听的 作用。
- 通过`e.target.matches('input')`可以判断所点击的元素是不是input元素，`e.target`返回所点击的宿主元素。



### 3、列表显示函数（更新HTML）

声明一个 `populateList` 方法来更新页面的内容。接收需要更新的数组作为参数，根据数组里的内容构造一组 `<li>` 组成的列表，并且加上一些标识信息，以助于之后需要实现的选中功能。

```js
function populateList(populates = [], place) { // 设置默认值，防止传参数出错的时候crash
  place.innerHTML = populates.map((populate, index) => {
    return `
      <li>
        <input type="checkbox" id=item${index} data-index=${index} ${populate.done ? 'checked' : ''}>
        <label for="item${index}">${(populate.text)}</label>
      </li>
    `; //之所以用‘’空字符是因为如果用null的话，会出现在html中
  }).join(''); // join()之后一定要加''，表示空字符，否则会加入逗号，造成错误  
}
```



## 延伸阅读

[A Simple Explanation of Event Delegation in JavaScript](https://dmitripavlutin.com/javascript-event-delegation/)

[JavaScript中textContent、innerText和innerHTML的用法以及区别](https://blog.csdn.net/tswc_byy/article/details/82711093)

[阮一峰 SVG 图像入门教程](https://www.ruanyifeng.com/blog/2018/08/svg.html)