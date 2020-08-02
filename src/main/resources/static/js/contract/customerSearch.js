

function searchCusIdKeyUp(){
const id = document.getElementById('costumerIdForSearch').value;
const selectCustomerPullDown = document.getElementById('selectCustomerPullDown');
removeChildren(selectCustomerPullDown);
	getCustomerData("/getCustomerData/"+id);
}

function getCustomerData(requestURL){
    // AjaxにてDemoControllerクラスのsearchメソッドを呼び出す
    let request = new XMLHttpRequest();
    request.open("get", requestURL, true);
    request.send(null);
    request.onload = function (event) {
    	let cusList = JSON.parse(request.responseText);
       // Ajaxが正常終了した場合
       if (request.readyState === 4 && request.status === 200) {
       
       let month = document.getElementById('selectCustomerPullDown');
document.createElement('option')
for(let i = 0; i < cusList.length; i++){
alert(cusList[i].customerId);
  let option = document.createElement('option');
  option.setAttribute('value', cusList[i].customerId);
  option.innerHTML = cusList[i].customerName;
  month.appendChild(option);
};
       
          // 該当するデータが無かった場合
          if(!request.responseText){
              alert("該当するデータはありませんでした");
              return;
          }
       // Ajaxが異常終了した場合
       }else{
          alert("エラーが発生し、データが取得できませんでした");
       }
    };
    // Ajaxが異常終了した場合
    request.onerror = function (event) {
       alert("エラーが発生し、データが取得できませんでした");
    }
}

function removeChildren(obj){
	for (var i =obj.childNodes.length-1; i>=0; i--) {
	obj.removeChild(obj.childNodes[i]);
}
}
