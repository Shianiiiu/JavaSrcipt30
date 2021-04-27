# Ajax Type Ahead 匹配搜索 🔎

> 油管视频：[Ajax Type Ahead with fetch()](https://www.youtube.com/watch?v=y4gZMJKAeWs&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=6)📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [涉及语法](#涉及语法)
* [过程指南](#过程指南)
    * [1、数据请求](#1数据请求)
    * [2、数据处理](#2数据处理)
    * [3、数据展示](#3数据展示)
    * [4、监听事件](#4监听事件)
* [其他知识点](#其他知识点)
    * [<a href="https://www\.w3school\.com\.cn/js/js\_function\_apply\.asp" rel="nofollow">Apply函数</a>](#apply函数)
    * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/push" rel="nofollow">Array\.prototype\.push()</a>](#arrayprototypepush)
    * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Guide/Regular\_Expressions" rel="nofollow">正则表达式</a>](#正则表达式)

### 实现效果

---

![image-20210427154716482](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210427154716_JS06_INDEX.png)

在输入框中输入一个词，迅速匹配，展示含有这个词的诗句，诗句的来源 json 数据是加载页面时从网络中异步获得。70 多首唐诗的  [JSON数据](https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json)

### 涉及语法

---

- Promise
  - `fetch()`
  - `then()`
  - `json()`
- Array
  - `filter()`
  - `map()`
  - `push()`
  - `join()`
  - Spread syntax 扩展语句
- RegExp
  - `match()`
  - `replace()`



### 过程指南

---

##### 1、数据请求

```js
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
```

之前，在做数据请求的时候，`XMLHttpRequest`一直倍受Web开发者的青睐，无论是直接或者是间接，我们通常使用的Ajax技术就是基于XMLHttpRequest的，而`Fetch API`是一种新的致力于替代XMLHttpRequest的技术。

Fetch API 提供了获取资源（包括通过网络获取资源）的接口。Fetch API提供了一个`fetch(`)方法，它被定义在BOM的window对象中，你可以用它来**发起对远程资源的请求**。

Fetch API 提供一个全局的方法 `fetch()`，这个方法（至少）需要接受 `资源的路径` 作为参数，无论请求成功与否，它都返回一个 promise 对象。若请求成功，这个对象包含了（对应 Request 的）Response，但这只是一个 HTTP 响应。也可以传一个可选的第二个参数—— init（参考[Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)）

```js
fetch(input, init).then(function(response) { ... });
```

更详细的Fetch API的相关内容，请参考[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)。

本挑战中，利用 `.json()`，以使用 JSON 对象来读取 Response 流中的数据，读取之后，Body 的 body.Uesd 属性值会变为已读。

---

通过请求获取到数据后，将其存在`poetrys[]`数组中，以便后续使用。由于我们在`.then(dta)`中获取到的`data`已经是一个数组，我们想要把他存储在`poetrys[]`数组中,使用了[ES6 中的数组扩展语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)。

基本语法如下：`myfunc(...iterableObj)`,也可用于数组字面量，用法如下：`[...iterableObj,4,5,6]`

利用扩展运算符可以[替代 ES5 中的 `push` 方法添加一个数组到另一个数组末尾](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator#更好的_push_方法)

```js
// 将arr2中的所有元素添加到arr1中

// ES5
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```

##### 2、数据处理

```js
function findMatches(wordToMatch, poetrys) {
    return poetrys.filter(poet => {
        const regex = new RegExp(wordToMatch, 'gi');
        const author = poet.detail_author.join('');
        return poet.detail_text.match(regex) || poet.title.match(regex) || author.match(regex);
    })
}
```



##### 3、数据展示

```js
function displayMatches() {
    // console.log(this.value)
    const matchArray = findMatches(this.value, poetrys);
    // console.log(matchArray)
    const regex = new RegExp(this.value, 'gi');

    const html = matchArray.map(poet => {
        const text = poet.detail_text.replace(regex, `<span class="hl">${ this.value }</span>`);
        const title = poet.title.replace(regex, `<span class="hl">${ this.value }</span>`);
        return `<li>
            <span class="poet">${ text }</span>
            <span class="title">《${ title }》- ${ poet.detail_author[0] }</span>
            </li>`;
    }).join('');
    // console.log(html)
    suggestions.innerHTML = html
}
```

通过`findMatches(wordToMatch, poetrys)`方法返回满足条件的字符串数组，并对查找字符串进行格式化，添加`.hl`类，此处使用正则表达式进行替换，`.replace(RegExp,newString)`,可以将满足正则表达式的字符串替换为新的字符串，此处也使用了ES6的模版字符串。

使用数组的`.join('')`方法可以将数组的每一项连接为一个字符串，`.join('')`需要一个连接符，默认是','(逗号),如果想要平滑连接的话，其参数不能省略不填，应填'',否则按默认处理。

##### 4、监听事件

```js
const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
```

监听`input`框的`change`事件和`keyup`事件

### 其他知识点

##### [Apply函数](https://www.w3school.com.cn/js/js_function_apply.asp)

##### [Array.prototype.push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

##### [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)