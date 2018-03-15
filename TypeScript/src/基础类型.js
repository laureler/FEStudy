var isDone = true;
var isDone2 = false;
// 所有的数字都是浮点数，浮点数都是number 10/16进制都支持， 以及二进制，八进制
var number = 6; //10
var hexLiteral = 0x00d; //16
var binaryLiteral = 10; //2
var octalLiteral = 484; //8
var names = 'name';
names = 'lucas';
// 字符串模板
var str = "" + names;
// 数组
var list = [1, 2, 3];
var lista = [1, "2", 3, "4", '5', 6];
var lists = [1, 2, 3];
//泛型数组
var arrayNum = [1, 2, 3];
//let arrayNums:Array<number> = ['1','2','3']
//枚举类型
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["green"] = 2] = "green";
})(Color || (Color = {}));
var c = Color.blue;
console.log(c);
var noType = 4;
// never 存在永远不存在得知
function error(message) {
    throw new Error(message);
}
