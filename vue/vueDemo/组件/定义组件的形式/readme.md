# vue中定义模板组件
1. 字符串 string
2. 模板字符串 template literal

3. x-templates
4. 内联 inline
5. render函数（render functions)
6. jsx
7. 单文件组件（single page components）

## 字符串/模板字符串
---------------
> 字符串 ''  模板字符串 `` 区别都不大
```ecmascript 6
Vue.component('my-checkbox',{
	template:`<div @click="check"></div>`,
	data:function(){
		return {
			checked:false,
			title:'click me'
		}
	},
	methods:{
		check(){
			this.checked = !this.checked;
		}
	}
})
```

## x-templates
```html
<script type="text/x-template" id="checkbox-template">
  <div class="checkbox-wrapper" @click="check">
    <div :class="{ checkbox: true, checked: checked }"></div>
    <div class="title">{{ title }}</div>
   </div>
</script>
<script>
Vue.component('my-checkbox', {
  template: '#checkbox-template',
  data() {
    return { checked: false, title: 'Check me' }
  },
  methods: {
    check() { this.checked = !this.checked; }
  }
});
</script>
```
## 渲染函数
--------------
> 渲染函数要求你把模板当做 JavaScript对象来定义，他们是一些复杂且抽象的模板选项
然而，他们的优点就是你定义的模板更加接近编译器。

```ecmascript 6
Vue.component('my-checkbox',{
	data:function(){
		return {
			check:false,
			title:'check me'
		}
	},
	methods:{
    check:function() {
      this.checked = !this.checked;
    }
  },
  render(createElement){
		return createElement(
		  'div',
		  {
		  	attrs:{
		  		'class':'checkbox-warpper'
		  	},
		  	on:{
		  		click:this.check
		  	}
		  }
		)
  }
})
```

## JSX
```jsx harmony

Vue.component('my-checkbox', { 
	data() { 
		return { checked: false, title: 'Check me' } 
  }, 
  methods: { 
		check() { 
			this.checked = !this.checked; 
		} 
  }, 
  render() { 
		return 
		    <div class="checkbox-wrapper" onClick={ this.check }> 
		        <div class={{ checkbox: true, checked: this.checked }}></div> 
		        <div class="title">{ this.title }</div> 
        </div> 
	} 
});
```
## 单文件组件

略
