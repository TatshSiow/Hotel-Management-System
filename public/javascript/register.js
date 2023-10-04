const register = async () => {
  const username = document.getElementById('password').value;
  const password = document.getElementById('confirmPassword').value;

  if (password != confirmPassword) {
    alert('請重新確認密碼！');
    return;
  }