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

  // 检查表单字段是否为空
  if (!itemcode || !quantity || !price) {
    alert('請填寫完整資料！');
    return;
  }

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