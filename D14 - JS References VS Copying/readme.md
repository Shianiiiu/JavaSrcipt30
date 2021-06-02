# References VS Copying 引用和复制 👯‍♂️

> 油管视频： [JavaScript Fundamentals: Reference VS Copy](https://www.youtube.com/watch?v=YnfwDQ5XYF4&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=14) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



* [实现效果](#实现效果)
* [过程指南](#过程指南)
  * [按值操作](#按值操作)
  * [按引用操作](#按引用操作)
    * [1、Array 数组](#1array-数组)
    * [2、Object 对象](#2object-对象)
* [延伸阅读](#延伸阅读)

## 实现效果

对不同类型数据的引用（Reference）和复制（Copy）的区别：**基本类型按值操作，而对象类型由引用操作**



## 过程指南

### 按值操作

基本类型由值操作。以下类型在JavaScript中被视为基本类型：

`String`
`Number`
`Boolean`
`Null`
`Undefined`

这意味着如果我们将变量定义为基本类型，然后将另一个变量定义为之前定义的那个变量。 则第二个变量将复制第一个变量的当前值。对第一个变量的任何更改都不会影响第二个变量，反之亦然。

```js
let age = 100;
let age2 = age;
console.log(age, age2); // 100 100
age = 200;
console.log(age, age2); // 200 100
```

### 按引用操作

#### 1、Array 数组

```js
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
team[3] = 'Lux';
console.log(players, team); 
// ["Wes", "Sarah", "Ryan", "Lux"] ["Wes", "Sarah", "Ryan", "Lux"]
```

原数组 `plaryers` 也被修改了。为什么会这样？因为 `team` 只是这个数组的引用，并不是它的复制。`team` 和 `players` 这两个变量指向的是同一个数组。

解决引用复制，实现真正的拷贝：

- **方法一 [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)**

  由于运行 `slice` 得到的结果是一个对原数组的浅拷贝，原数组不会被修改。所以如果修改这两个数组中任意 一个，另一个都不会受到影响。

  ```js
  const team2 = players.slice();
  team2[3] = 'Lux2';
  console.log(players, team2); 
  ```

- **方法二 [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)**

  `concat()` 方法是用来合并数组的，它也不会更改原有的数组，而是返回一个新数组，所以可以将 `players` 数组与一个空数组合并，得到的结果就符合预期了。

  ```js
  const team3 = [].concat(players);
  team3[3] = 'Lux3';
  console.log(players, team3); 
  ```

- **方法三 ES6 [扩展语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)**

  扩展语法可以像扩展参数列表一样来扩展数组，效果与上述方法类似，但比较简洁。

  ```js
  const team4 = [...players];
  team4[3] = 'Lux4';
  console.log(players, team4);
  ```

- **方法四 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)**

  此外使用 Array 创建新的数组实例的方法也是可行的。

  ```js
  const team5 = Array.from(players);
  team5[3] = 'Lux5';
  console.log(players, team5);
  ```

#### 2、Object 对象

- **方法一 [`Object.assign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)**

  使用 `Object.assign(target, ...sources)` 时，后来的源对象的属性值，将会覆盖它之前的对象的属性。所以可以先复制 `person` 之后，再赋给属性新的值。

  需要注意的是：这个例子里面，我们用的数组和对象都**只是一层嵌套**，只是一种浅层复制

  **如果我们复制的对象也包含对象，那么我们只能复制到第一层。 任何比第一层更深的值仍然是原对象的引用**

  Lodash 有一个深度复制的方法，但使用之前需要多考虑一下。

  ```js
  const cap2 = Object.assign({}, person, { number: 99, age: 12 });
  console.log(cap2); // Object {name: "Wes Bos", age: 12, number: 99}
  ```

  [Lodash中文文档](https://www.lodashjs.com/) ：*Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。*



- **采用深拷贝**

  来自于[StackOverflow](http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object) 

  ```js
  function clone(obj) {
      var copy;
      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" != typeof obj) return obj;
      // Handle Date
      if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }
      // Handle Array
      if (obj instanceof Array) {
          copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = clone(obj[i]);
          }
          return copy;
      }
      // Handle Object
      if (obj instanceof Object) {
          copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
          }
          return copy;
      }
      throw new Error("Unable to copy obj! Its type isn't supported.");
  }
  ```

- **方法二 JSON 转换**

  利用 JSON 可以先将对象转成字符串的格式，然后再把它转成 JSON，从而实现复制。

  ```js
  const wes = {
    name: 'Wes',
    age: 100,
    social: {
      twitter: '@wesbos',
      facebook: 'wesbos.developer'
    }
  };
  
  const dev = Object.assign({}, wes);
  const dev2 = JSON.parse(JSON.stringify(wes));
  console.log(wes);
  console.log(dev);
  console.log(dev2);
  ```

## 延伸阅读

[4种复制对象的方法](http://heyjavascript.com/4-creative-ways-to-clone-objects/) 

[终于弄清楚JS的深拷贝和浅拷贝了-读这一篇就够了](https://blog.csdn.net/weixin_37719279/article/details/81240658?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.vipsorttest&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.vipsorttest)

[JS DeepCopy深复制的两种方式，并解决循环引用、Date、RegExp对象的深复制](https://blog.csdn.net/qq_31201781/article/details/83817527)

[JavaScript 深拷贝（deep copy）和浅拷贝（shallow copy）](https://www.cnblogs.com/xiyouchen/p/10366236.html)