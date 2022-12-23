const login = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/user/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'content-type': 'application/json',
    },
  }).then(async (res) => {
    return await res.json();
  });

  if (response.status) {
    location = '/user';
  } else {
    alert(response.message);
  }
};

document.getElementById('login').addEventListener('click', login);
