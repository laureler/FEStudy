# TypeScript 简介
    1. typescript 是JavaScript的超集，也就是说所有的已有JavaScript语法，typeScript都理论上（如果不兼容，就是Bug)完美兼容。
    
## 为什么要用TypeScript语法？
    JavaScript语法是动态语法，对于没有接触过动态语法的同学，可能会觉得对于动态语法有疑惑。<br>
    请自行查阅资料 →_→
## typescript使用
    1. 最基本的 转码器 tsc
        语法： tsc [options] [file ....]
        examples:   tsc --outFile file.js file.ts
    2.  与webpack结合使用
        npm install ts-loader source-map-loader
# 结构
```
    文件目录结构：
    projectRoot
    ├── src
    │   ├── file1.js
    │   └── file2.js
    ├── built          编译输入目录
    ├── test           测试文件夹
    └── tsconfig.json
```

TypeScript 使用tsconfig.json文件配置来管理工程。

```json
// 注意 json文件不能够写注释（json文件在定义的时候就是数据格式，并非文档格式。)
{
  //
  "compilerOptions": {
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "jsx": "react",
    "allownJS":true,        //接受JavaScript文件作为输入源
    "outDir": "./dist/",    //生成的所有的配置文件放置在dist/文件夹下
    "target": "es5"        //编译目标格式为 MCMAScript5格式
  },
  
  "include": [  //读取所有可识别的src目录下的文件
    "./src/**/*"
  ]
}
```