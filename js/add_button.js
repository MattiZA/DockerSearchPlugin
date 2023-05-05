console.log("LoadSuccess")
var loadInterval;
window.requestAnimationFrame(function () {
  loadInterval=setInterval(function () { 
    addDom();
  }, 300);
  
  
});
let mainId = 'dockerTagSearch';
function addDom() {
  try {
    // 将查询按钮添加到页面上的镜像元素下方
    var tagDom = document.querySelector(".MuiContainer-root .MuiTabs-root");
    if (tagDom != undefined) {
      clearInterval(loadInterval);
      console.log("Page rendering is complete!");
    } else {
      return;
    }

    
    var container = document.createElement("container");
    container.className = 'mainPanel'; 
    // 创建两个输入框和一个按钮元素
    var imageNameLabel = document.createElement("label");
    imageNameLabel.textContent = "  Image Name:";

    var imageNameInput = document.createElement("input");
    imageNameInput.type = "text";
    imageNameInput.value = getImageName();
    imageNameInput.id = mainId+"ImageName";

    var imageDigestLabel = document.createElement("label");
    imageDigestLabel.textContent = "  Image DIGEST:";

    var imageDigestInput = document.createElement("input");
    imageDigestInput.type = "text";
    imageDigestInput.id = mainId+"ImageDigest";

    var searchBtn = document.createElement("button");
    searchBtn.textContent = "Search";
    searchBtn.id = "searchBtn";

    var searchResult = document.createElement("span");
    searchResult.textContent = "";
    searchResult.className = "searchResult";
    searchResult.id = mainId + "searchResult";

    var tips = document.createElement("h3");
    tips.textContent = "ImageDigest:use cmd [docker image inspect --format '{{.RepoDigests}}' gitlab/gitlab-ee:latest] get Digest";
    // 将元素添加到容器中
    container.appendChild(tips);
    container.appendChild(document.createElement("hr"));
    container.appendChild(imageNameLabel);
    container.appendChild(imageNameInput); 
    container.appendChild(imageDigestLabel);
    container.appendChild(imageDigestInput); 
    container.appendChild(searchBtn);
    container.appendChild(searchResult);
    tagDom.parentElement.insertBefore(container, tagDom);

    searchBtn.addEventListener("click", function () {
      var searchResult = document.getElementById(mainId+"searchResult");
      searchResult.innerText = '';

      query_result(document.getElementById(mainId + "ImageName").value, document.getElementById(mainId + "ImageDigest").value);

    });
  } catch (e) {
    console.log("******");
    console.log(e);
    console.log("******");
  }
 
   
}

function getImageName() {
  try {
    var lastBreadcrumb = document.querySelector("#contextNav div div ").lastElementChild.textContent;
    return lastBreadcrumb;
  }
  catch (e) {
    console.log(e);
    return "";
  }
}
function query_result(image_name, hash_code) { 
  if (!hash_code.startsWith('sha256:')) {
    hash_code = 'sha256:' + hash_code;
  }
  if (hash_code.indexOf('@') > -1) {
    var arr = hash_code.split('@');
    hash_code = arr[1];
  } 
  // 发送 GET 请求
  get_data(image_name, 1).then(obj=> {
    var count = obj.count;
    var page_count = Math.floor(count / 25);

    for (var i = 1; i <= page_count; i++) {
      get_data(image_name, i).then(response=> {
        for (var result of response.results) {
          var digest = '';
          if ('digest' in result) {
            digest = result.digest;
          } 
          for (var image of result.images) {
            if (hash_code == digest || hash_code == image.digest) {
              document.getElementById(mainId + "searchResult").innerText=`Result : ${image_name}.tag[${result.name}]`;
              return;
            }
          }
        } 
      });
      
    }
  }); 
}

function get_data(image_name, page) {
  var url = 'https://hub.docker.com/v2/repositories/' + image_name + '/tags/?page_size=25&page=' + page;
  return fetch(url)
    .then(response => response.json())
    .then(obj => obj);
}