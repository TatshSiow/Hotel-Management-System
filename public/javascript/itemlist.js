//message刷新，然後用GET來取得資料，async操作的情況下等待回傳值
const reloaditemlist = async () => {
  const response = await fetch('itemlist/fetch', {
    method: 'GET'
  }).then(async (res) => {
    return await res.json();
  });


  //將 itemlist 的內容寫入 HTML中 id 屬性為 itemlist 的元素中
  document.querySelector('#itemlist').innerHTML = itemlist;
};

//如果我在頁面點了submit按鈕，我的資料會回傳到資料庫
const submitItemlist = async () => {
  const itemlist = document.getElementById('itemlist').value;
  document.getElementById('itemlist').value = '';

//如果回應值有東西，會刷新message，若無將會提示
  if (response.status) {
    reloaditemlist();
  } else {
    alert(response.itemlist);
  }
};

//刷新itemlist
reloaditemlist();

var deleteButtons = document.getElementsByClassName('delete-item-button');
for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', function(event) {
    var itemId = event.target.getAttribute('data-itemid');
    // 執行刪除動作
    deleteItem(itemId);
  });
}

// 刪除資料的函式
function deleteItem(itemId) {
  // 發送刪除請求給後端
  fetch('/itemlist/deleteButtons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId: itemId })
  })
    .then(response => response.json())
    .then(data => {
      // 處理刪除後的回應   
      console.log(data); // 在這裡可以根據後端回傳的資料做相應的處理
      // 重新載入 itemlist
      reloaditemlist();
    })
    .catch(error => {
      // 處理錯誤
      console.error('刪除資料時發生錯誤:', error);
    });
}