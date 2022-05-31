var div = document.querySelector('#versionData')
var appDivValue= ['<select id="parentApp" class="loginInput" disabled="true">']
    var appList = document.getElementById('appsList')
    var appUrl = 'https://qa-platform.severnyded.tech/api/applications?search=&pageSize&pageNum&onlyDeleted=&includeDeleted=false'
    var id = document.getElementById('id')
    var versionName = document.getElementById('name')
    var description = document.getElementById('description')
    var markup = document.getElementById('markup')
    var versionUrl = document.getElementById('url')
    var backBtn = document.querySelector('#backVersions')
const createVersionUrl = 'https://qa-platform.severnyded.tech/api/versions';
var validation = document.querySelector('#validation')
var token = JSON.parse(localStorage.getItem('token'))
const url = window.location.search
const appId = url.split('=')[1]


var createVersionObj = {
  item: {
    applicationId: '',
    //versionId: '',
    name: '',
    description: '',
    url: '',



  }
}
applicationList(appId)

async function applicationList(appId)
{
  await relationApp(appId)
  var parentApp = document.getElementById('parentApp')
  parentApp.value = parseInt(appId)

}

async function relationApp(appId){
  const app = await getData(appUrl, token)
  for(var i=0; i < app.items.length; i++){
    await viewData(app.items[i])
  }
  appDivValue.push('</select>')
   var appData = appDivValue.join(' ')
   appList.innerHTML = appData;  
}

async function viewData(app){
    appDivValue.push('<option value="'+ app.id +'">' + app.name +'</option>')
} 

async function getData(url = '', token = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: token ? {
      'Authorization': 'Bearer ' + token
    } : {},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  })
  return await response.json();
}

createVersion.addEventListener('click', function () {
  if (true) {
    createVersionObj.item.applicationId =  parseInt(parentApp.value);
    createVersionObj.item.url =  versionUrl.value;
    createVersionObj.item.name =  versionName.value;
    createVersionObj.item.description = description.value;
    postData(createVersionUrl, createVersionObj.item, 'POST')
      .then((data) => {
        resp = data
        
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else 
        {
          var editVersionUrl = 'versionedit.html?versionId=' + resp.item.id + '?appid=' + appId
          window.location.href = editVersionUrl
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backBtn.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'versions.html?appid=' + appId;
  }
})


async function postData(url, data, methodType) {
  const response = await fetch(url, {
    method: methodType, 
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}
