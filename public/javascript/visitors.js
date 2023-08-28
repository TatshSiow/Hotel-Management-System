const reloadvisitors = async () => {
  const response = await fetch('/visitors', {
    method: 'GET'
  }).then(async (res) => {
    return await res.json();
  });

  document.querySelector('#visitors-list').innerHTML = visitorsList;
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

document.getElementById('submit-visitors').addEventListener('click', submitVisitors);

reloadvisitors();