# Hold SHIFT Checkboxes 按住 Shift 的多选🔲

> 油管视频： [JS Checkbox Challenge](https://www.youtube.com/watch?v=RIPYsKx1iiU&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=10) 📺
>
> 本知识总结参考：[soyainiJavaScript-30 中文练习指南](https://github.com/soyaine/JavaScript30) 、[winar-jin/JavaScript30-Challenge](https://github.com/winar-jin/JavaScript30-Challenge) 🦥



 * [实现效果](#实现效果)
  * [过程指南](#过程指南)
  * [解决思路](#解决思路)
    * [方法一](#方法一)
    * [方法二](#方法二)



## 实现效果

![shift checkbox](https://picgo-bed-1305701422.cos.ap-shanghai.myqcloud.com/picgo/20210503153431_D10_SHIFT-CHECK.gif)

**按住shift键对checkbox的多选功能（或取消多选）**



## 过程指南

- 首先应该获取到页面的checkbox元素，并对其中的每一个checkbox进行单击事件监听，并触发handleCheck函数。

  ```js
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  // 对每一个checkbox进行点击事件监听
  checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click',handleCheck);
  });
  ```

- handleCheck 函数逻辑实现



## 解决思路

1. 选中 A 项
2. 按下 Shift
3. 再选中 B 项
4. A-B 之间的所有项都被选中

依据划定范围的方法不同来进行区分：

### 方法一

**用一个变量**，来标记这个范围： `inBetween`

变量初始值为 `false`，当按下 `Shift` 键且同时选中了某个元素的时候，遍历所有项，遍历过程中，若遇到 A 或 B，则将标记值取反。同时，将所有标记为 `true` 的项设置为选中。

```js
 //方法一
  function handleCheck(e) {
    let inBetween = false;

    if(e.shiftKey && this.checked && lastCheck && lastCheck.checked) {
      checkboxes.forEach(checkbox => {
        // console.log(checkbox)
        if(checkbox === lastCheck || checkbox === this) {
          inBetween = !inBetween;
        }
        if(inBetween) {
          checkbox.checked = true;
        }
      });  
    }
    if(this.checked){
      lastCheck = this;
    }
  }
```

- 若要想知道哪些元素在两个元素中间，可以通过是指一个flag标识，此例为`inbetween `，默认为false，表示不在两元素中间。遍历所有的checkbox，当遇到`lastone`和`this`时，将`inbetween `的值取反，这样就可标出哪些在两元素中间，哪些不在。

- 当直接按住`shift`键点击页面上的一个元素的时候，该元素以下的所有元素都会被选中，因为没有lastCheck，只将`inbetween `的值取反一次，所以该元素以下的所有元素全部会被选中。修改if判断：

  ```js
   if(e.shiftKey && this.checked && lastCheck && lastCheck.checked)
  ```

- 已经筛选出了哪些元素在所选两元素中间，哪些元素不在，就可以设置选中状态了，当`inbetween `为`true`时，将checkbox设置为选中状态。

### 方法二

**用数组保存范围**：`boxArr` （且可以批量取消选中）

参考：[How can I shift-select multiple checkboxes like GMail?](http://stackoverflow.com/a/659571/6820726) 

首先将获取到的 `<input>` 组转化为数组，针对每次操作，获取 A 和 B，利用 `indexOf()` 来获得 A 和 B 在数组中的索引值，由此即可确定范围，并能通过 `slice()` 来直接截取 A-B 的所有 DOM 元素，并进行状态改变的操作，而变量 `onOff` 表示 A-B 范围内的状态，`true` 表示选中，`false` 表示取消选中。

```js
const boxArr = Array.from(boxs);
let lastChecked;
let onOff = false;

// 处理方法二：利用数组索引获取需要选中的范围
function handleCheck1(e) {
	if(!lastChecked) lastChecked = this;
	onOff = lastChecked.checked ? true : false;
	if(e.shiftKey) {
		let start = boxArr.indexOf(this);
		let end = boxArr.indexOf(lastChecked);
		boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
		           .forEach(input => input.checked = onOff);
		console.log(start + "+" + end);
	}
	lastChecked = this;
}
```