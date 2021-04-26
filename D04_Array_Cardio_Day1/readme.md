# Array Cardio Day01 数组方法训练回合一 🚴‍♂️

> 油管视频：[Array Cardio Practice - Day 1 ](https://www.youtube.com/watch?v=HB1ZC7czKRs&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=5)📺
> 本知识总结摘自：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [训练任务](#训练任务)
* [相关知识](#相关知识)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/filter" rel="nofollow">filter</a>](#filter)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/map" rel="nofollow">map</a>](#map)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/sort" rel="nofollow">sort</a>](#sort)
  * [<a href="https://developer\.mozilla\.org/zh\-CN/docs/Web/JavaScript/Reference/Global\_Objects/Array/Reduce" rel="nofollow">reduce</a>](#reduce)
* [解决难点](#解决难点)



### 实现效果

---

这一部分主要是熟悉 Array 的几个基本方法，其中有两个（filter、map）是 ES5 定义的迭代方法，这些**迭代方法**都有一个特点，就是<u>对数组的每一项都运行给定函数</u>，根据使用的迭代方法的不同，有不同的返回结果。

<br>

### 训练任务

---

1. 筛选出出生在16世纪（1500-1599年）的发明家。
2. 列出发明家的名和姓的数组。
3. 根据发明家的出生日期，按照从大到小的顺序进行排序。
4. 所有的发明家一共活了多少岁。
5. 按照发明家的年龄大小排序
6. 列出巴黎所有街道名字中包含'de'的路名。在以下网站提供的信息来做。（https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris）
7. 按照字母表的顺序，将人们的姓氏进行排序。
8. 分别计算出数据中包含每一个交通工具的个数。

<br>

### 相关知识

---

#### [filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

过滤操作，有点像 SQL 里面的 select 语句。筛出运行结果是 true 的组成数组返回。

```js
const __fifteen = inventors.filter(function(inventor) {
  if (inventor.year >= 1500 && inventor.year < 1600 ) {
	  return true;
  } else {
      return false;
  }
});
console.table(__fifteen);
```

前面几篇已经提到过箭头函数，这里可以简化一下，用箭头函数来写，而且由于 if 语句的存在并不是必要的，可以写成下面这样：

```js
const fifteen = inventors.filter(inventor =>(inventor.year >= 1500 && inventor.year < 1600));
console.table(fifteen);
```

#### [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

map 形象的理解就是，把数组中的每个元素进行处理后，返回一个新的数组。

例子如下：

```js
// 展示数组对象  inventors 里发明家的姓名  
const fullNames = inventors.map(inventor => inventor.first + ' ' + inventor.last);
```

#### [sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

默认情况下，`Array.prototype.sort()` 会将数组以字符串的形式进行升序排列（10 会排在 2 之前），但 sort 也可以接受一个函数作为参数。所以需要对数字大小排序时需要自己设定一个比较函数，例子如下：

```js
const __ordered = inventors.sort((a, b) => (a > b) ? 1 : -1);
console.table(__ordered);
```

#### [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

这是一个归并数组的方法，它接受一个函数作为参数（这个函数可以理解成累加器），它会遍历数组的所有项，然后构建一个最终的返回值，这个值就是这个累加器的第一个参数。例子如下：

```js
[0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
});
```

而此处我们需要统计一个给定数组中各个项的值，恰好可以用到这个方法，在累加器之中，将统计信息存入一个新的对象，最后返回统计值。

```js
  const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
  const reduce = data.reduce( (obj, item) => {
	  if( !obj[item]  ) {
		  obj[item] = 0;
	  }
		  obj[item]++;
		  return obj;
  }, {});
  console.log(reduce);
```



### 解决难点

---

在任务06中，获取街道的名称通过DOM节点获取，但是由 `querySelectorAll()` 获取到的是一个 `NodeList` ，它并非是 `Array` 类型的数据，所以并不具有 `map` 和 `filter` 这样的方法，所以如果要进行筛选操作则需要把它转化成 Array 类型，使用 `Array.from()` 来转化。

```js
var total = Array.from(document.querySelectorAll('.mw-category .mw-category-group ul li a'));
```

获取街道的名称文本时，首先得到DOM节点元素，使用显示文本的属性即可：

![image-20210425163528163](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210425163535.png)

![image-20210425163607065](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210425163607.png)

```js
item.innerText
item.textContent
……
```

