/*async操作的情況下等待回傳值
getElementByID是代表通過ID來得到屬性值
這裡定義的是username和password，分別就代表這兩個欄位，value這是欄位內的數值*/
const login = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

/*如果response值是有的話，則會前往/user/login的網頁
前往方式使用POST，body會用JSON內建的Stringify功能，這個功能可以將所有值轉為字串
headers=標頭，'content-type': 'application/json'這行是代表使用json內件程式的功能
*/
  const response = await fetch('/user/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'content-type': 'application/json',
    },
  })
//將網路請求的回應解析為 JSON 格式後回傳結果，以便後續程式碼進行處理
  .then(async (res) => {
    return await res.json();
  });

//如果有response值，將會帶到/user，若無則會提示
  if (response.status) {
    location = '/user';
  } else {
    alert(response.message);
  }
};

//添加login的指令，eventListener是待命操作（click是用戶操作，login是系統動作）
document.getElementById('login').addEventListener('click', login);

// Get the login button
var loginButton = document.getElementById("login");

// Add a click event listener to the login button
loginButton.addEventListener("click", login);

// Get the input field
var input = document.getElementById("login-input");

// Execute a function when the user presses the enter key
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Call the login function
    login();
  }
});

// The login function
function login() {
  // Your login code here
}