複製代碼

//message刷新，然後用GET來取得資料，async操作的情況下等待回傳值
const reloaditemlist = async () => {
  const response = await fetch('/itemlist/fetch', {
    method: 'GET'
  }).then(async (res) => {
    return await res.json();
  });

  //清空itemlistList
  let itemlist = '';

  //for迴圈，在每次回圈中，從node資料庫裡面得到資料（response.data=回應資料，[i]=筆數，其餘的是SQL內資料的欄位）
  for (let i = 0; i < response.data.length; i++) {
    itemlist += `
      <div class="card">
        <div class="card-header">
          ${response.data[i].id}
        </div>
        <div class="card-body">
          <h5 class="card-title">${response.data[i].itemcode}</h5>
          <p class="card-text">${response.data[i].quantity}</p>
          <p class="card-text">${response.data[i].price}</p>
        </div>
      </div>
    `;
  }

  //將 itemlist 的內容寫入 HTML中 id 屬性為 itemlist 的元素中
  document.querySelector('#itemlist').innerHTML = itemlist;
};

//如果我在頁面點了submit按鈕，我的資料會回傳到資料庫
const submitItemlist = async () => {
  const itemlist = document.getElementById('itemlist').value;
  document.getElementById('itemlist').value = '';

  /* 向 /itemlist/submit 發送 POST 請求
  將 itemlist 轉換成 string
  fetch 用來發送網路請求的函式，
  用 await 關鍵字來保證等待，執行完後再繼續執行下一步動作
  當伺服器回應時，使用 res.json() 方法將回應的內容解析為 JSON 格式
並將其儲存在 response 變數中，最後回傳 response 變數的值。
設定 content-type 為 application/json，表示請求的內容是 JSON 格式。*/

//如果回應值有東西，會刷新message，若無將會提示
  if (response.status) {
    reloaditemlist();
  } else {
    alert(response.itemlist);
  }
};

//刷新message
reloaditemlist();