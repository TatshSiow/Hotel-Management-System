const reloaditemlist = async () => {
  const response = await fetch('/itemlist', {
    method: 'GET'
  }).then(async (res) => {
    return await res.json();
  });

  document.querySelector('#itemlist-list').innerHTML = response;
};

const submitItemlist = async () => {
  const itemcode = document.getElementById('itemcode').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;

  // 检查表单字段是否为空
  if (!itemcode || !quantity || !price) {
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

const deleteItem = async (itemId) => {
  const response = await fetch('/itemlist/delete', {
    method: 'POST',
    body: JSON.stringify({ id: itemId }), // 传递要删除的项的ID
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (res) => {
      return await res.json();
    });

    if (response.status) {
    alert('刪除成功'); // 显示删除成功的 alert

    // 1.5秒后刷新页面
    setTimeout(() => {
      window.location.reload(); // 刷新页面
      }, 1500);
    } else {
    alert(response.message);
  }
};

document.getElementById('submit-itemlist').addEventListener('click', submitItemlist);

// 在按钮点击事件中获取data-id属性的值
document.querySelectorAll('.btn-danger').forEach(button => {
  button.addEventListener('click', function () {
    const itemId = this.getAttribute('data-id'); // 获取按钮的data-id属性
    deleteItem(itemId); // 调用删除函数
  });
});

reloaditemlist();
