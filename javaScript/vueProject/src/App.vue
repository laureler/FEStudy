<template>
  <div>
    <el-container id="mainContent">
      <el-aside id="treeContent">Header</el-aside>
      <el-main>
        <el-container>
          <el-header>header</el-header>
          <el-main>main</el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import './assets/index.css'

  export default {
    name: 'App',
    data () {
     return {

     }
    },
    methods: {
       s : function (item) {

      }
    },
    components: {

    }
  }
</script>

<style scoped>

</style>
