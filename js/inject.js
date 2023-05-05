// 创建一个查询按钮元素
var queryButton = document.createElement("button");
queryButton.textContent = "查询";

// 将查询按钮添加到页面上的镜像元素下方
var image = document.querySelector(".MuiBox-root .dChip");
image.parentElement.appendChild(queryButton);

// 注册点击查询按钮后的事件处理函数
queryButton.addEventListener("click", function () {
  // 在此处添加查询逻辑和显示查询结果的代码
});
console.log("加载插件成功")