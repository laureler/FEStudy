HTML5拖拽事件
# html Drag and Drop API events
## drag
> 当元素或者选择的文本被拖动时触发 <strong>drag</strong>事件(每几百毫秒)

基本信息
>参考地址： https://developer.mozilla.org/zh-CN/docs/Web/Events/drag

|属性|属性值|
|-----|-----|
|是否冒泡|是|
|是否可以取消|是|
|目标对象|Document,Element|
|接口|DragEvent|
|默认行为|Continue the drag & drop operation；继续拖拽操作|

## dragend
> 当拖动操作结束时(通过释放鼠标按钮或按下escape键)，将触发dragend事件。

|属性|属性值|
|-----|-----|
|是否冒泡|是|
|是否可以取消|否|
|目标对象|Document,Element|
|接口|DragEvent|
|默认行为|Varies|

## dragenter
> 当拖动的元素或文本选择进入有效的放置目标时， dragenter 事件被触发。

基本信息
> 参考地址: https://developer.mozilla.org/zh-CN/docs/Web/Events/dragenter

注意：默认动作为 取消拖动，所以一般不禁止当前的默认动作

|属性|属性值|
|-----|-----|
|是否冒泡|是|
|是否可以取消|是|
|目标对象|用户指定的元素 或者 body 元素|
|接口|DragEvent|
|默认行为|取消拖动|

## dragexit
> 当元素不再是拖动操作的选择目标时，会立即触发dragexit事件

基本信息
> 参考地址：https://developer.mozilla.org/zh-CN/docs/Web/Events/dragexit

|属性|属性值|
|---|---|
|是否冒泡|是|
|是否可以取消|否|
|目标对象|预先定义的目标元素对象|
|接口|DragEvent|
|默认行为|None|
## dragleave
> 当拖动的元素或文本选择离开有效的目标元素范围时，会触发dragleave事件。
 
基本信息
> 参考地址：https://developer.mozilla.org/en-US/docs/Web/Events/dragleave

|属性|属性值|
|---|---|
|是否冒泡|是|
|是否可以取消|否|
|目标对象|Document,Element|
|接口|DragEvent|
|默认行为|None|
## **dragover**
> 当一个元素或文本选择被拖拽到一个有效的放置目标上时（每几百毫秒），
    dragover事件就会被触发。

基本信息

> 参考地址：https://developer.mozilla.org/en-US/docs/Web/Events/dragover
由于 默认行为是自动的吧拖拽的对象给变成None了，所以要 event.preventDefault()；来阻止默认行为。

|属性|属性值|
|---|---|
|是否冒泡|是|
|是否可以取消|是|
|目标对象|Document，Element|
|接口|DragEvent|
|默认行为|重置当前拖拽操作的对象为none|
## dragstart
> dragstart事件在用户开始拖动元素或文本选择时触发（只会触发一次)。
 
基本信息
> 参考地址：https://developer.mozilla.org/en-US/docs/Web/Events/dragstart

|属性|属性值|
|---|---|
|是否冒泡|是|
|是否可以取消|是|
|目标对象|Document，Element|
|接口|DragEvent|
|默认行为|开始拖放操作|

## drop
> 当元素或文本选择被放置在有效目标元素上时，将触发放置事件。 

基本信息
> 参考地址：https://developer.mozilla.org/en-US/docs/Web/Events/drop
若drop事件没有效果，请注意查看dragover事件是否没有禁用掉默认的浏览器事件(event.preventDefault())

|属性|属性值|
|---|---|
|是否冒泡|是|
|是否可以取消|是|
|目标对象|Document，Element|
|接口|DragEvent|
|默认行为|Varies|
