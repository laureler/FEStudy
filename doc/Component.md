## 组件
----------------
### 组件全局注册
```ecmascript 6
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
// 创建根实例
new Vue({
  el: '#example'
})
```
```html
<div id="app">
    <my-component></my-component>
</div>
<!--渲染结果为-->
<div id="app">
   <div>A custom component!</div>
</div>
```
-----------------
### 组件局部注册
```ecmascript 6
    var child = {
        template:`<div> custom component</div>`
    }
    new Vue({
      //…… 忽略其他的配置
      components:{
        //此模板将只会在父组件模板中才会可用
        'my-component':child,
      }
    })
```
> dom作为模板的时候，由于一些HTML限制，可能不能使用组件。如下
```html
    <table>
        <!--此时m-row组件不能够使用-->
        <m-row></m-row>
        <!--使用 is属性来处理-->
        <tr is="m-row"></tr>
    </table>
```
> 但是当来自于*.vue  <script type='text/x-template'></script> javascript内联模板字符串没有限制
--------------------------
### 组件的data属性

> 构造Vue实例与构造Vue模板的区别基本没有，也就是说大部分选项都可以在组件中使用，但是有一个例外，就是data属性
实际上，data必须是一个函数。为什么呢？使用一个偷鸡的方式来实现一个data是方法，但其实data只是一个get方法，返回的对象就是全局共享的data<br>

```ecmascript 6
var data = {counter: 0}
Vue.component('my-component', {
  template: `<button v-on:click="counter+=1"> {{counter}} </button>`,
  // 从技术角度看 data确实是一个函数，所以不会报错，但是其实data只是一个返回全局共享的变量
  data: function () {
    return data
  }
})

new Vue({
  el: '#app'
})
```
> 由于共享了同一个data对象，所以修改一个会影响所有的组件。其实可以通过给每一个组件返回一个全新的对象来维护<br>
修改如下：
```ecmascript 6
var data = {counter: 0}
Vue.component('my-component', {
  template: `<button v-on:click="counter+=1"> {{counter}} </button>`,
  // 从技术角度看 data确实是一个函数，所以不会报错，但是其实data只是一个返回全局共享的变量
  data: function () {
    // 此时所有的 data被调用的时候 都会返回一个新的对象
    return {
      counter:0
    }
  }
})
new Vue({
  el: '#app'
})
```
### 组件的组合

> 组件的组合 组件初衷就是要配合使用，最常见的就是父子关系。 <br>
        ├─组件A                    <br>
        │  ├─子组件B               <br>
        │  ├─子组件C               <br>
    在vue中，父子关系可以理解为      <br>
    父组件 ---> prop  ---> 子组件  属性向下传递                       <br> 
    父组件 <--- event <--- 子组件  事件向上传递(事件委托相同机制)       <br>
    子组件要显示的使用Prop选项生命他们预期的数据:                       <br>      
```vue
    <script >
        Vue.component('childComponent', {
          // 声明 props 期待从父类模板中继承props属性来使用
          // myMessage可以驼峰，但是在HTML中不可以转换为my-message
          props: ['myMessage'],
          // 就像 data 一样，prop 也可以在模板中使用
          // 同样也可以在 vm 实例中通过 this.message 来使用
          template: '<span>{{ message }}</span>'
        })
    </script>
    <!-- 父类容器在渲染的时候，可以通过自身的属性向子类容器注入值 message是来自于父类容器-->
    <parentComponent>
        <childComponent my-message='hello world!'></childComponent>
    </parentComponent>
    
```    
> 注意： 由于HTML不区分大小写，所以在使用的不是字符串模板的时候,camelCase驼峰命名法的prop需要转换为kebab-case(短横线分隔式命名)
### 动态的prop
> 我们可以使用v-bind来动态的把prop绑定到父组件的容器中，每当父组件的数据变化的时候，也会动态的传递给子组件。
```vue
<div>
    <input v-model="parent-message">
    <br>
    <!--子组件显示的注入属性值 parent-message -->
    <child v-bind:my-message="parent-message"></child>
    <!-- 也可以简略的写-->
    <!--<child :my-message="parent-message"></child>-->
</div>

<script ></script>
```
    
    
        
    
    
        





