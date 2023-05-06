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
        <div class="card">
            <div class="card-header">
                ${response.data[i].create_at}
            </div>
            <div class="card-body">
                <h5 class="card-title">${response.data[i].username}</h5>
                <p class="card-text">${response.data[i].message}</p>
            </div>
        </div>`;
    }

    document.querySelector('#message-list').innerHTML = messageList;
};

const submitMessage = async () => {
  const message = document.getElementById('message').value;
  document.getElementById('message').value = '';

  const response = await fetch('/message/submit', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'content-type': 'application/json',
    },
  }).then(async (res) => {
    return await res.json();
  });

  if (response.status) {
    reloadMessage();
  } else {
    alert(response.message);
  }
};

document.getElementById('submit-message').addEventListener('click', submitMessage);

reloadMessage();
