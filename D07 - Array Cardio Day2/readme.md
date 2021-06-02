# Array Cardio Day02 数组方法训练回合二 🏇

> 油管视频：[Array Cardio Day 2](https://www.youtube.com/watch?v=QNmRfyNg1lw&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=7)📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [训练任务](#训练任务)
* [相关知识](#相关知识)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/some" rel="nofollow">some</a> 和 <a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/every" rel="nofollow">every</a>](#some-和-every)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/find" rel="nofollow">find</a> 和 <a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/findIndex" rel="nofollow">fineIndex</a>](#find-和-fineindex)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/slice" rel="nofollow">slice</a> 和 <a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/splice" rel="nofollow">splice</a>](#slice-和-splice)

### 实现效果

---

继续熟悉 Array 的一些基本方法，包括 `some()`、`every()`、`find()`、`splice()`、`slice()`



### 训练任务

---

1. 是否至少有一人年满19周岁？
2. 是否每一个人都年满19周岁？
3. 是否存在id=823423的评论？
4. 找到id=823423的评论的序列号(下标)。
5. 删除id=823423的评论。



### 相关知识

---

#### [some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 和 [every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

`.some(callback)`函数测试数组中的每一项是否满足传入函数，**只要有一项满足**就返回true，否则返回false。 回调函数有三个参数，分别为`currentValue`，`index`，`array`,分别代表<u>待传入的值</u>，当前元素在<u>数组中的下标</u>，<u>传入的数组</u>。

```js
arr.some(callback(element[, index[, array]])[, thisArg])
```

`thisArg`，执行 `callback` 时使用的 `this` 值。[详见MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

`.every(callback)`函数测试数组中的每一项是否满足传入函数，只有**所有的项都满足**才返回true，否则返回false

#### [find](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 和 [fineIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

这两个 ES6 的新特性类似于 `some()` ，但对于符合条件的元素，返回值不是布尔类型。不一样的地方在于，`find()` 返回的是这个元素的值（或 `undefined`），而 `findIndex()` 返回的是这个元素的索引（或 `-1`）。

#### [slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 和 [splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

相同点：参数的第一个都是指的起始位置，且都接受负数，若是负数，代表倒数第几位。

区别：

- `slice()`：**不修改原数组**，按照参数复制一个新数组，参数表述复制的起点和终点索引（省略则代表到末尾），但终点索引位置的元素不包含在内。
- `splice()`：**原数组会被修改**。第二个参数代表要删掉的元素个数，之后可选的参数，表示要替补被删除位置的元素。

`.splice()`方法，是一个十分强大的方法，既可以删除一个数组中的若干项，也可以向数组中某个位置添加若干项，语法如下`array.splice(start, [deleteCount], [item1, item2, ...])`,start代表从什么位置开始改变这个数组，从0开始索引；deleteCount代表要删除的个数，可选的；[item1, item2, ...]代表向数组中添加的元素；若deleteCount=0,又有[item1, item2, ...]存在，就可以实现在指定位置添加元素的效果；如果deleteCount=(some number)，且无[item1, item2, ...]，就可以从数组中删除若干个元素。

<br>

所以想要删除一个元素，有两种实现思路，一是把出它之外的元素给复制下来再合在一起，二是直接把它删除。

```js
	// 删除方法一，splice()
	// comments.splice(index, 1);
	
	// 删除方法二，slice 拼接
	const newComments = [
		...comments.slice(0, index),
		...comments.slice(index + 1)
	];
```

上面的三个点（`...`）是 [ES6 中的扩展语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)，可以展开这个数组并方便的拼接。