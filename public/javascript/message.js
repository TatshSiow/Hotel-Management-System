//message刷新，然後用GET來取得資料，async操作的情況下等待回傳值
const reloadMessage = async () => {
    const response = await fetch('/message/fetch', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    //清空messageList
    let messageList = ''; 

    //for迴圈，在每次回圈中，從node資料庫裡面得到資料（response.data=回應資料，[i]=筆數，其餘的是SQL內資料的欄位）
    for (let i = 0; i < response.data.length ; i++) { 
        messageList += `
        <br>
        <div class="card">
            <div class="card-header">
                ${response.data[i].ID}
            </div>
            <div class="card-body">
                <h5 class="card-text">${response.data[i].ROOM}</h5>
                <p class="card-text">${response.data[i].REPORTDATE}</p>
                <p class="card-text">${response.data[i].DEVICE}</p>
                <p class="card-text">${response.data[i].PROBLEM}</p>
            </div>
        </div>`;
    }
//將 messageList 的內容寫入 HTML中 id 屬性為 message-list 的元素中
    document.querySelector('#message-list').innerHTML = messageList;
};

//如果我在頁面點了submit按鈕，我的資料會回傳到資料庫
const submitMessage = async () => {
  document.getElementById('ROOM,REPORTDATE,DEVICE,PROBLEM').value = '';
  const ROOM = document.getElementById('ROOM').value;
  const REPORTDATE = document.getElementById('REPORTDATE').value;
  const DEVICE = document.getElementById('DEVICE').value;
  const PROBLEM = document.getElementById('PROBLEM').value;
 

/* 向 /message/submit 發送 POST 請求
將 message 轉換成 string
fetch 用來發送網路請求的函式，
用 await 關鍵字來保證等待，執行完後再繼續執行下一步動作
當伺服器回應時，使用 res.json() 方法將回應的內容解析為 JSON 格式
並將其儲存在 response 變數中，最後回傳 response 變數的值。
設定 content-type 為 application/json，表示請求的內容是 JSON 格式。*/
  const response = await fetch('/message/submit', {
    method: 'POST',
    body: JSON.stringify({ ROOM,REPORTDATE,DEVICE,PROBLEM }),
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(async (res) => {
    return await res.json();
  });

//如果回應值有東西，會刷新message，若無將會提示
  if (response.status) {
    reloadMessage();
  } else {
    alert(response.message);
  }
};

//添加submit-message的指令，eventListener是待命操作（click是用戶操作，submitmessage是系統動作）
document.getElementById('submit-message').addEventListener('click', submitMessage);

//刷新message
reloadMessage();
