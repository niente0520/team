window.onload = function(){
	requsetGetData();
}

function requsetGetData(){
	getUserData("/getData");
}

function requsetGetData2(){
	getUserData("/getData2");
}

function getUserData(requestURL){
    // AjaxにてDemoControllerクラスのsearchメソッドを呼び出す
    let request = new XMLHttpRequest();
    request.open("get", requestURL, true);
    request.send(null);
    request.onload = function (event) {
    	let empList = JSON.parse(request.responseText);
    	drawGraph(empList);
       // Ajaxが正常終了した場合
       if (request.readyState === 4 && request.status === 200) {
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

function drawGraph(empList){
  var empNameList = [];
  for(let i=0;i<empList.length;i++){
  	empNameList.push(empList[i].empName);
  }
  
  var priceList = [];
  for(let i=0;i<empList.length;i++){
  	priceList.push(empList[i].price);
  }
	  
  var barChartData = {
    labels : empNameList,
    datasets : [
      {
        fillColor : /*"#d685b0"*/"rgba(214,133,176,0.7)",
        strokeColor : /*"#d685b0"*/"rgba(214,133,176,0.7)",
        highlightFill: /*"#eebdcb"*/"rgba(238,189,203,0.7)",
        highlightStroke: /*"#eebdcb"*/"rgba(238,189,203,0.7)",
        data : priceList
      }
    ]

  }
  
   var ctx = document.getElementById("chart").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
      responsive : true,
      // アニメーションを停止させる場合は下記を追加
      /* animation : false */
    });
    
    const canvas =  document.getElementById( 'chart' );
     const chart = new Chart(ctx).Bar(barChartData);
    
  document.getElementById( 'chart' ).addEventListener('click', (e) => alert(chart.getBarsAtEvent(e)[0].value));
  //https://qiita.com/ledsun/items/c59546fa7e756e2d3bc0 
  document.getElementById( 'chart' ).removeEventListener("click",arguments.callee);
}
