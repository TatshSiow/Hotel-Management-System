const reloaditemlist = async () => {
  const response = await fetch('/itemlist', {
    method: 'GET'
  }).then(async (res) => {
    return await res.json();
  });

  document.querySelector('#itemlist-list').innerHTML = itemlistList;
};

const submitItemlist = async () => {
  const itemcode = document.getElementById('itemcode').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;

  const response = await fetch('/itemlist/submit', {
    method: 'POST',
    body: JSON.stringify({ itemcode, quantity, price }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (res) => {
      return await res.json();
    });

  if (response.status) {
    reloaditemlist();
  } else {
    alert(response.message);
  }
};

document.getElementById('submit-itemlist').addEventListener('click', submitItemlist);

reloaditemlist();

// var deleteButtons = document.getElementsByClassName('delete-item-button');
// for (var i = 0; i < deleteButtons.length; i++) {
//   deleteButtons[i].addEventListener('click', function(event) {
//     var itemId = event.target.getAttribute('data-itemid');
//     // 執行刪除動作
//     deleteItem(itemId);
//   });
// }

// // 刪除資料的函式
// function deleteItem(itemId) {
//   // 發送刪除請求給後端
//   fetch('/itemlist/deleteButtons', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ itemId: itemId })
//   })
//     .then(response => response.json())
//     .then(data => {
//       // 處理刪除後的回應   
//       console.log(data); // 在這裡可以根據後端回傳的資料做相應的處理
//       // 重新載入 itemlist
//       reloaditemlist();
//     })
//     .catch(error => {
//       // 處理錯誤
//       console.error('刪除資料時發生錯誤:', error);
//     });
// }
