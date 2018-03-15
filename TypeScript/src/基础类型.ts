let isDone:boolean = true;
let isDone2:boolean = false;

// 所有的数字都是浮点数，浮点数都是number 10/16进制都支持， 以及二进制，八进制
let number:number =6;               //10
let hexLiteral:number = 0x00d;      //16
let binaryLiteral:number = 0b1010; //2
let octalLiteral:number = 0o744;  //8

let names:string = 'name';
names = 'lucas';

// 字符串模板
let str = `${names}`;

// 数组
let list:number[] = [1,2,3];
let lista:[number,string] = [1,"2",3,"4",'5',6]
let lists:number[] = [1,2,3];
//泛型数组
let arrayNum:Array<number> = [1,2,3]
//let arrayNums:Array<number> = ['1','2','3']

//枚举类型
enum Color {red,blue,green}
let c:Color = Color.blue;
console.log(c)


let noType:any = 4;

// never 存在永远不存在得知
function error(message:string):never{
    throw  new Error(message);
}
