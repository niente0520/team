

document.getElementById('costumerIdForSearch').onKeyUp = function(){
alert("niente");
	 const id = document.getElementById('costumerIdForSearch').value;
	getCustomerData("/getCustomerData/"+id);
}

function searchCusIdKeyUp(){
const id = document.getElementById('costumerIdForSearch').value;
	getCustomerData("/getCustomerData/"+id);
}

function getCustomerData(requestURL){
    // AjaxにてDemoControllerクラスのsearchメソッドを呼び出す
    let request = new XMLHttpRequest();
    request.open("get", requestURL, true);
    request.send(null);
    request.onload = function (event) {
    	let cusList = JSON.parse(request.responseText);
    	alert(cusList);
       // Ajaxが正常終了した場合
       if (request.readyState === 4 && request.status === 200) {
       
       //document.getElementById('costumerIdForSearch')の中身の要素を削除して動的にプルダウンを追加
       //前回のajax課題からコピペして持ってくる
       
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