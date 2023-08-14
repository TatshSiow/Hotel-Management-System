//message刷新，然後用GET來取得資料，async操作的情況下等待回傳值
const reloadVisitors = async () => {
    const response = await fetch('/visitors', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

//將 visitors的內容寫入 HTML中 id 屬性為 visitors-list 的元素中
    document.querySelector('#visitors').innerHTML = visitorsList;
};

//如果我在頁面點了submit按鈕，我的資料會回傳到資料庫
const submitvisitors = async () => {
  const VDATE = document.getElementById('VDATE').value;
  const VNAME = document.getElementById('VNAME').value;
  const IDCARD = document.getElementById('IDCARD').value;
  const VROOM = document.getElementById('VROOM').value;

//如果回應值有東西，會刷新message，若無將會提示

 if (response.status) {
    reloadVisitors();
  } else {
    alert(response.Visitors);
  }
};

/* 向 /message/submit 發送 POST 請求
將 message 轉換成 string
fetch 用來發送網路請求的函式，
用 await 關鍵字來保證等待，執行完後再繼續執行下一步動作
當伺服器回應時，使用 res.json() 方法將回應的內容解析為 JSON 格式
並將其儲存在 response 變數中，最後回傳 response 變數的值。
設定 content-type 為 application/json，表示請求的內容是 JSON 格式。*/

  const response = await fetch('/visitors/submit', {
    method: 'POST',
    body: JSON.stringify({ VDATE,VNAME,IDCARD,VROOM }),
    headers: {
      'content-type': 'application/json',
      'content-type': 'application/json',
    },
  })
  .then(async (res) => {
    return await res.json();
  });

// //如果回應值有東西，會刷新message，若無將會提示
  if (response.status) {
    reloadVisitors();
  } else {
    alert(response.Visitors);
  };

//添加submit-message的指令，eventListener是待命操作（click是用戶操作，submitmessage是系統動作）
document.getElementById('submit-visitors').addEventListener('click', submitvisitors);

//刷新message
reloadVisitors();