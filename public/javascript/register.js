const register = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const name = document.getElementById('name').value;

  if (!username || !password || !confirmPassword || !name) {
    alert('請填寫完整資料！');
    return;
  }

  const response = await fetch('/user/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, confirmPassword, name }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(async (res) => {
      return await res.json();
    });

  if (response.status) {
    // 注册成功，可以重定向到其他页面或采取其他操作
    location = '/';
  } else {
    alert(response.message);
  }
  
};

document.getElementById('register').addEventListener('click', register);