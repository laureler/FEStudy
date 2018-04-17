<template>
  <div id="app">
    <div id="section">
      <div class="layui-table-cell laytable-cell-11-sex"> <!-- 这里的 checked 的状态只是演示 -->
        <input type="checkbox" name="sex"
               lay-skin="switch"
               lay-text="女|男"
               lay-filter="test-table-sexDemo"
               value="10003"
               data-json="%7B%22LAY_INDEX%22%3A4%2C%22id%22%3A10003%2C%22username%22%3A%22user-3%22%2C%22sex%22%3A%22%E5%A5%B3%22%2C%22city%22%3A%22%E5%9F%8E%E5%B8%82-3%22%2C%22sign%22%3A%22%E7%AD%BE%E5%90%8D-3%22%2C%22experience%22%3A362%2C%22logins%22%3A157%2C%22wealth%22%3A37117017%2C%22classify%22%3A%22%E8%AF%97%E4%BA%BA%22%2C%22score%22%3A68%2C%22LAY_TABLE_INDEX%22%3A3%7D"
               checked="">
        <div class="layui-unselect layui-form-switch layui-form-onswitch" lay-skin="_switch"><em>女</em><i></i></div>
      </div>
    </div>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import './assets/index.css'

  export default {
    name: 'App',
    data () {
      return {
        editableTabsValue2: '2',
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: `<button>test</button>`
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      handleTabsEdit (targetName, action) {

        if (action === 'add') {
          let newTabName = ++this.tabIndex + ''
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          })
          this.editableTabsValue = newTabName
        }
        if (action === 'remove') {
          debugger
          let tabs = this.editableTabs
          let activeName = this.editableTabsValue
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
              }
            })
          }

          this.editableTabsValue = activeName
          this.editableTabs = tabs.filter(tab => {
              tab.name !== targetName
            }
          )
        }
      },
      addTab (targetName) {
        let newTabName = ++this.tabIndex + ''
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        this.editableTabsValue2 = newTabName
      },
      removeTab (targetName) {
        //当前所有逇tabs选项数据
        let tabs = this.editableTabs2
        //当前获得焦点的tab
        let activeName = this.editableTabsValue2
        //若是当前焦点
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        //若不是当前脚垫 则设置为当前焦点
        this.editableTabsValue2 = activeName
        //并且过滤 targetName与tab的name属性不一致
        this.editableTabs2 = tabs.filter(tab => {
          debugger
          tab.name !== targetName
        })
      }
    },
    components: {
      HelloWorld
    }
  }
</script>

<style>
  .layui-form-onswitch{
    border-color: #5FB878;
    background-color: #5FB878;
  }
  .layui-table-cell {
    height: 28px;
    line-height: 28px;
    padding: 0 15px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
  }
  .laytable-cell-11-sex {
    width: 85px;
  }
  #section {
    position: relative;
    margin: 100px auto;
    width: 500px;
    height: 300px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .el-row {
    margin-bottom: 20px;
    height: 500px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 300px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
