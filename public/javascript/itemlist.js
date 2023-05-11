//message刷新，然後用GET來取得資料，async操作的情況下等待回傳值
const reloaditemlist = async () => {
  const response = await fetch('itemlist/fetch', {
    method: 'GET'
  }).then(async (res) => {
    return await res.json();
  });


  //將 itemlist 的內容寫入 HTML中 id 屬性為 itemlist 的元素中
  document.querySelector('#itemlist').innerHTML = itemlist;
};

//如果我在頁面點了submit按鈕，我的資料會回傳到資料庫
const submitItemlist = async () => {
  const itemlist = document.getElementById('itemlist').value;
  document.getElementById('itemlist').value = '';

//如果回應值有東西，會刷新message，若無將會提示
  if (response.status) {
    reloaditemlist();
  } else {
    alert(response.itemlist);
  }
};

//刷新itemlist
reloaditemlist();