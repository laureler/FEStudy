/**
 * 定义一个 数据结构对于是否符合 的数据类型来进行类型检查，
 * 通过定义一个借口可以命名一个特殊的变量组合，确保他们一直运行下去。
 * 转义为JavaScript的时候，接口会消失，他们唯一的目的就是在开发阶段起到辅助作用。
 */
interface config{
    name:string,
    age?:number
}
function userInfo(param:config){
    console.log(param)
}
let myObj = {
    age:10,
    name:'long'
}
userInfo(myObj)