//启动严格模式
'use strict'
// chalk插件 控制台输出不同的颜色的字体，能够改变 命令行中的字体颜色
const chalk = require('chalk')

// 下面这个是semver插件，是用来对特定的版本号做判断的，比如
// semver.gt('1.2.3','9.8.7') false 1.2.3版本比9.8.7版本低
// semver.satisfies('1.2.3','1.x || >=2.5.0 || 5.0.0 - 7.2.3') true 1.2.3的版本符合后面的规则
const semver = require('semver')
// 引入package.json配置文件，需要的是里面的engines选项。要注意require是可以直接引入json文件的。 require返回的就是json对象
const packageConfig = require('../package.json')
// shelljs 用来执行unix系统命令
const shell = require('shelljs')
// 下面涉及了很多unix命令
function exec (cmd) {
  //脚本可以通过child_process 模块来新建子进程，从而执行unix命令
  //把cmd这个参数传递的值转换成前后没有空格的字符串也就是 版本号
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),  // semver插件把版本信息转换成规定格式 也就是    =v1.2.3  ' ->  '1.2.3' 这种 清除掉无用的类似于beta之类的信息
    versionRequirement: packageConfig.engines.node  //查找Package.json中的engines选项信息
  }
]
// 当时用的是npm命令的时候后 todo 弄清楚是做什么的
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),        //自动调用 npm --version命令，并且把参数返回给exec函数。从而获取纯净的版本号？？？？？
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
