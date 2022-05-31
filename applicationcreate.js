
var appName = document.getElementById('appName')
var description = document.getElementById('description')

var validation = document.querySelector('#validation')
var token = JSON.parse(localStorage.getItem('token'))

const createGroupUrl = 'https://qa-platform.severnyded.tech/api//applications';
var validation = document.querySelector('#createApp')

var createAppObj = {
  item: {
   // lastSubscribeDate: '',
    //statusId: '',
    //paidId: '',
    description: '',
    name: '',
    //projectDescription: ''
  }
}
//************************************************ G E N E R A L *************************************************** 

createApp.addEventListener('click', function () {
    if (true) {
        createAppObj.item.name = appName.value;
        createAppObj.item.description = description.value;
      //console.log(createGroupObj.item)
      postData(createGroupUrl, createAppObj.item, 'POST')
        .then((data) => {
          resp = data
         // console.log(resp.item.id)
          if (resp.message) {
            validation.textContent = resp.message
            validation.style.visibility = 'visible';
          }
          else  
          {
            var editAppUrl = 'applicationedit.html?appId=' + resp.item.id
            window.location.href = editAppUrl
          }
        })
    }
    else {
      validation.style.visibility = 'visible';
    }
})

backToApp.addEventListener('click', function () {


  if (confirm("Shure ?")) {
    window.location.href = 'applications.html';
  }
})

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

async function getAndShowData(url) {
  const project =await getData(url, token);
  for(var i=0; i < project.items.length; i++){
      await viewData(project.items[i])
    }
    projectsDivValue.push('</select>')
     var projectData = projectsDivValue.join(' ')
     projectsList.innerHTML = projectData;  
}

async function getData(url = '', token = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: token ? {
      'Authorization': 'Bearer ' + token}:{},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  })
 return await response.json();
}

async function viewData(project){
        projectsDivValue.push('<option value="'+ project.id +'">' + project.name +'</option>')
    } 