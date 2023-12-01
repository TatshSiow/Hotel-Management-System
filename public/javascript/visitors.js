const reloadvisitors = async () => {
  const response = await fetch('/visitors', {
    method: 'GET'
  }).then(async (res) => {
    return await res.json();
  });

  document.querySelector('#visitors-list').innerHTML = response;
};

const submitVisitors = async () => {
  const VDATE = document.getElementById('VDATE').value;
  const VNAME = document.getElementById('VNAME').value;
  const IDCARD = document.getElementById('IDCARD').value;
  const VROOM = document.getElementById('VROOM').value;

  if (!VDATE || !VNAME || !IDCARD || !VROOM) {
    return;
  }

  const response = await fetch('/visitors/submit', {
    method: 'POST',
    body: JSON.stringify({ VDATE, VNAME, IDCARD, VROOM }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (res) => {
      return await res.json();
    });

  if (response.status) {
    reloadvisitors();
  } else {
    alert(response.message);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // 在按钮点击事件中获取data-id属性的值
  document.querySelectorAll('.btn-danger').forEach(button => {
    button.addEventListener('click', function () {
      const itemId = this.getAttribute('data-id'); // 获取按钮的data-id属性
      deleteItem(itemId); // 调用删除函数
    });
  });

  // 可以添加一个 console.log 来确认在绑定时是否获取到了正确的按钮和 ID
  console.log('Delete buttons:', document.querySelectorAll('.btn-danger'));
});

const deleteItem = async (itemId) => {
  const response = await fetch('/visitors/delete', {
    method: 'POST',
    body: JSON.stringify({ ID: itemId }), // 传递要删除的项的ID
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

document.getElementById('submit-visitors').addEventListener('click', submitVisitors);

reloadvisitors();