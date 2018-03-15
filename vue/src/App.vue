<template>
  <div id="app">
    <div style="height: 100px;background-color: salmon"></div>
    <div style="background-color: #a7ff34; height: 100%" class="flexbox_row">
      <div style="background-color: #6f7180;width: 100px;height: 100%"></div>
      <div class="flexbox_reverserow" style="width: 100%;height:100%;border: #0C0C0C 1px solid">
        <div style="background-color: #00F7DE;width:300px;height: 100%;"></div>
        <div style="background-color: #d7dce2;height: 100%;width: 400px"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import './assets/index.css'

  export default {
    name: 'App',
    components: {
      HelloWorld
    }
  }
</script>

<style>
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
