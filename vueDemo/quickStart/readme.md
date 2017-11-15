# vue quickStart 快速入门
## vue.js 介绍
------------------
> vue.js是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计(//todo向上增量)<br/>    
Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。 <br>
当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

**Vue.js 不支持 IE8 及其以下版本，因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。Vue.js 支持所有兼容 ECMAScript 5 的浏览器。**
## vue开始使用
    1. <script src="https://unpkg.com/vue"></script>
    2. node.js 使用npm来安装vue并且引入(//todo查看node.js教程)
### 使用
    1. 必须要先有vue.js的引入。无论是什么方式
```ecmascript 6
    var data = {
      message:'yourData',
    }
   var vm = new Vue({
      el:'yourSelector',
      data:data
    })
    // vue中就会存在一个data:{message:'yourData'}的对象实例
```
```html
<span id="app">{{message}}</span>
```
### 属性讲解
vue中声明的vm实例就是一个总的全局的对象，类似于jquery中的$<br/>
data:data其实就是把一个数据的 **引用** 给加到了实例中
```ecmascript 6
    vm.message === data.message
    //修改了data中的定义 vm中的数据也会跟着改变
    vm.message = 'test'
    console.log(data.message); //test
    //反之一样
    data.message = 'test2'
    console.log(vm.message)
```
**若一开始并没有声明对应的数据，则在添加的时候，并不会动态的修改，例如vm.b ='balabala',那么data并不会添加一个b属性，<br/>
也就是说，只有在实例被创建的时候就拥有的对象，才会动态的改变。**<br>
若希望解决上述问题,可以在实例创建开始的时候多声明属性。
------------------
常用的属性和方法,vue中暴露了一些属性，一般都使用了$开头，以便和用户定义的数据区分开。

    1.用户定义了的数据，可以在实例中获取
```ecmascript 6
  vm.$data === data  // true
```   
    2.用户定义绑定的DOM元素，可以在实例中获取
```ecmascript 6
  vm.$el   === document.getElementById('app');
``` 
 3. 用户定义的数据在改变的时候，会被调用
```ecmascript 6
// $watch 是一个实例方法
vm.$watch('a', (newValue, oldValue) =>{
  // 这个回调将在 `vm.a` 改变后调用
})
```
--------------
### 数据绑定
vue已经和DOM数据绑定在了一起，所有的元素都是响应式的。当我们修改了vue实例中的一些属性的时候，就会自动的变化。
```vue
<div id="app">
    <span v-bind:title="message">
        vue绑定属性在 title对象上，即为(实例为错误语法，仅为了体验)：<span title="{{message}}"></span>
    </span>
</div>
```


    
    
    
    
    
    
