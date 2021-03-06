在使用组件时，我们常常要像这样组合它们：
```html
  <app>
    <app-header></app-header>
    <app-footer></app-footer>
  </app>
```
注意两点：
1. `<app>` 组件不知道它会收到什么内容。这是由使用 <app> 的父组件决定的。
2. `<app>` 组件很可能有它自己的模板。
---------------------
> 为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。
这个过程被称为内容分发 (即 Angular 用户熟知的“transclusion”)。
Vue.js 实现了一个内容分发 API，参照了当前 Web Components 规范草案，
使用特殊的 <slot> 元素作为原始内容的插槽。

---------------------
# 编辑作用域

在深入内容分发 API 之前，我们先明确内容在哪个作用域里编译。假定模板为：
```html
<child-component>
  {{ message }}
</child-component>
```
message 应该绑定到父组件的数据，还是绑定到子组件的数据？
<strong>答案是父组件</strong>

组件作用域简单地说是：
>父组件模板的内容在父组件作用域内编译，子组件模板的内容在子组件作用域内编译。

# 单个插槽
除非子组件中包含了至少有一个`<slot>`插口，否则父组件的内容将会被丢弃
```html
    <el-template></el-template>
    当前组件没有slot插口，在被转换的过程中就会被抛弃掉，替换为模板的内容。
```
当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的DOM位置。
并替换插槽标签内容。

最初在`<slot>`标签中的任何内容都被视为备用内容，备用内容在子组件的作用域内编译，
并且只有在宿主元素为空，且没有要插入的内容时才会显示备用内容。
------
假定`my-component` 组件有如下模板
```html
<el-template>
    <h2>我是子组件的标题，由于我有了slot插槽，所以我不必担心我会被替换掉</h2>
    <slot>
        只有在没有要分发的内容的时候，我才会显示出来（默认值）
    </slot>
</el-template>
```
父组件的模板
```html
<div>
    <h1>我是父组件的标题</h1>
    <my-component>
      <p>内容1</p>
      <p>内容2</p>
    </my-component>
</div>
```
渲染结果
```html
  <div>
    <h1>我是父组件的标题</h1>
    <div>
        <h2>我是子组件的标题</h2>
        <p>内容1</p>
        <p>内容2</p>
        <!-- slot 内部的内容不会被渲染 -->
    </div>
</div>
```
