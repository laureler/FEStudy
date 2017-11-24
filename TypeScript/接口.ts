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