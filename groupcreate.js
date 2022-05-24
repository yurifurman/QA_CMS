
var groupName = document.getElementById('groupName')
var description = document.getElementById('description')
var typeId = document.getElementById('typeSelect')
var projectsDropDown = document.getElementById('projectSelect')
var projectsList = document.getElementById('projectsList')

var validation = document.querySelector('#validation')
var token = JSON.parse(localStorage.getItem('token'))

const createGroupUrl = 'https://qa-platform.severnyded.tech/api/groups';

var projectsDivValue= ['<select id="projectSelect" class="input"> <option value="">--Please choose Project--</option>']
const insertProjectsData = []
var activeProjectsUrl = 'https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=false&includeDeleted=false'

var createGroupObj = {
  item: {
   // lastSubscribeDate: '',
    //statusId: '',
    type: '',
    //paidId: '',
    description: '',
    name: '',
    projectId: 1,
    //projectDescription: ''
  }
}

getAndShowData(activeProjectsUrl, false)

//************************************************ G E N E R A L *************************************************** 

createGroup.addEventListener('click', function () {
    if (true) {
      var projectsDropDown2 = document.getElementById('projectSelect')
        createGroupObj.item.name = groupName.value;
        createGroupObj.item.projectId = parseInt(projectsDropDown2.value);
        createGroupObj.item.type = parseInt(typeId.value);
        createGroupObj.item.description = description.value;
      //console.log(createGroupObj.item)
      postData(createGroupUrl, createGroupObj.item, 'POST')
        .then((data) => {
          resp = data
         // console.log(resp.item.id)
          if (resp.message) {
            validation.textContent = resp.message
            validation.style.visibility = 'visible';
          }
          else  
          {
            var editGroupUrl = 'groupedit.html?groupId=' + resp.item.id
            window.location.href = editGroupUrl
          }
        })
    }
    else {
      validation.style.visibility = 'visible';
    }
})

backToGroups.addEventListener('click', function () {


 /* if (confirm("Shure ?")) {
    window.location.href = 'groups.html';
  }*/
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