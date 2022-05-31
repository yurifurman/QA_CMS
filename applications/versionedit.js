var id = document.getElementById('id')
var parentApp = document.getElementById('parentApp')
var appsList = document.getElementById('appsList')
var appsDivValue= ['<select id="parentApp" class="loginInput"  disabled="true">']
var backToVersionList = document.getElementById('backToVersions')
var backToVersionBtn = document.getElementById('backToVersions2')
var versionName = document.getElementById('name')
var description = document.getElementById('description')
var url = document.getElementById('url')
var statusId = document.getElementById('statusSelect')

const getVersionUrl = 'https://qa-platform.severnyded.tech/api/versions/'
const getAppUrl = 'https://qa-platform.severnyded.tech/api/applications/'

var validation = document.querySelector('#validation')
var labelPage = document.querySelector('#pageTitleWithVersionName')
var token = JSON.parse(localStorage.getItem('token'))

const urlAdd = window.location.search
const verId = urlAdd.split('=')[1]
const appId = urlAdd.split('=')[2]

var changeVerObj = {
    item: {
      applicationId: '',
      //versionId: '',
      name: '',
      description: '',
      url: '',
      status: '',
  
  
  
    }
  }

getAndShowVersionData();

// *********************************************************** G E N E R A L *********************************************************

async function getAndShowVersionData() {
  const version = await getData(getVersionUrl + verId, token);
  for(let key in version.item){
    switch(key){
      case 'id':
        id.value = version.item[key]
        break;
      case 'type':
        type.value = version.item[key]
        break;
      case 'status':
          statusId.value = version.item[key]
        break;
      case 'lastActivityAt':
        datetrim = version.item[key];
        let date = new Date(datetrim);
        activity.value = date.toLocaleString();
        break;
      case 'name':
        versionName.value = version.item[key]
        break;
      case 'description':
        description.value = version.item[key]
        break;
      case 'markup':
        markup.value = version.item[key]
        break;
      case 'order':
        order.value = version.item[key]
            break;
      case 'url':
        url.value = version.item[key]
        break
      case 'applicationId':
        await relationApp(version.item[key])
        var parentApp2 = document.getElementById('parentApp')
        parentApp2.value = version.item[key]
        break
      case 'deletedAt':
        if(version.item[key] == null){
          active.checked = true
          }
        else{
          active.checked = false
          }
        break
      default:
        break;
    }
    }
    
}

async function relationApp(applId){
    const app = await getData('https://qa-platform.severnyded.tech/api/applications?search=&pageSize&pageNum&onlyDeleted=&includeDeleted=false' , token)
    for(var i=0; i < app.items.length; i++){
      await viewData(app.items[i])
    }
    appsDivValue.push('</select>')
     var appData = appsDivValue.join(' ')
     appsList.innerHTML = appData;  
  }
  
  async function viewData(app){
    appsDivValue.push('<option value="'+ app.id +'">' + app.name +'</option>')
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

saveVersion.addEventListener('click', function () {
  if (true) {
    var parentApp3 = document.getElementById('parentApp')
    changeVerObj.item.applicationId =  parseInt(parentApp3.value);
    changeVerObj.item.name =  versionName.value;
    changeVerObj.item.description = description.value;
    changeVerObj.item.url = url.value;
    changeVerObj.item.status = parseInt(statusId.value);
    postData(getVersionUrl + verId, changeVerObj.item, 'PUT')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else{
          window.location.href = 'versions.html?appid=' + appId;
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backToVersionList.addEventListener('click', function () {

    window.location.href = 'versions.html?appid=' + appId;
})

backToVersionBtn.addEventListener('click', function () {

    window.location.href = 'versions.html?appid=' + appId;
})
active.addEventListener('change', function () {

    switch(active.checked){
      case true:
        //recoverUser()
        
        //location.reload();
        break;
      case false:
        //console.log("false")
       //deleteUser()
        //window.location.href = 'users.html';
        
        //location.reload();
        break;
      default:
        break;
}
})

async function deleteOrRecoverVersion(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

async function recoverVersion() {
  await deleteOrRecoverVersion(getVersionUrl + verId +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      location.reload();
    })
}

async function deleteVersion() {
    await deleteOrRecoverVersion(getVersionUrl + verId, token, 'DELETE')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        } 
        location.reload();
      })
}

async function postData(url, data, methodType) {
  const response = await fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
