var id = document.getElementById('id')
var parentProject = document.getElementById('parentProject')
var projectsList = document.getElementById('projectsList')
var projectsDivValue= ['<select id="parentProject" class="loginInput"  disabled="true">']
var versionId = document.getElementById('versions')
var versionsList = document.getElementById('verList')
var versionsDivValue= ['<select id="versions" class="loginInput">']
var backToLessonsList = document.getElementById('backToLessonsList')
var order = document.getElementById('order')
var lessonName = document.getElementById('name')
var description = document.getElementById('description') 
var markup = document.getElementById('markup')
var duration = document.getElementById('duration')
var type = document.getElementById('typeSelect')
var statusId = document.getElementById('statusSelect')

const getLessonUrl = 'https://qa-platform.severnyded.tech/api/lessons/'
const getProjectUrl = 'https://qa-platform.severnyded.tech/api/projects/'

var validation = document.querySelector('#validation')
var labelPage = document.querySelector('#pageTitleWithLessonName')
var token = JSON.parse(localStorage.getItem('token'))

const url = window.location.search
const lessonId = url.split('=')[1]
const projectId = url.split('=')[2]

var changeLessonObj = {
    item: {
      projectId: '',
      //versionId: '',
      order:'',
      name: '',
      description: '',
      markup: '',
      duration: '',
      type: '',
  
  
  
    }
  }

getAndShowUserData();

// *********************************************************** G E N E R A L *********************************************************

async function getAndShowUserData() {
  const lesson = await getData(getLessonUrl + lessonId, token);
  for(let key in lesson.item){
    switch(key){
      case 'id':
        id.value = lesson.item[key]
        break;
      case 'type':
        type.value = lesson.item[key]
        break;
      case 'status':
          statusId.value = lesson.item[key]
        break;
      case 'lastActivityAt':
        datetrim = lesson.item[key];
        let date = new Date(datetrim);
        activity.value = date.toLocaleString();
        break;
      case 'name':
        lessonName.value = lesson.item[key]
        break;
      case 'description':
        description.value = lesson.item[key]
        break;
      case 'markup':
        markup.value = lesson.item[key]
        break;
      case 'order':
        order.value = lesson.item[key]
            break;
      case 'duration':
        duration.value = lesson.item[key]
        break
      case 'projectId':
        await relationProject(lesson.item[key])
        var parentProject2 = document.getElementById('parentProject')
        parentProject2.value =lesson.item[key]
        break
      case 'deletedAt':
        if(lesson.item[key] == null){
          active.checked = true
          }
        else{
          changeUserObj.user.active = 2
          active.checked = false
          }
        break
      default:
        break;
    }
    }
    
}
async function relationApp(projectId){
  const project = await getData('https://qa-platform.severnyded.tech/api/applications/projects/' + projectId, token)
  for(var i=0; i < project.items.length; i++){
    await viewData(project.items[i])
  }
  projectsDivValue.push('</select>')
   var projectData = projectsDivValue.join(' ')
   projectsList.innerHTML = projectData;  
}

async function viewData(project){
  projectsDivValue.push('<option value="'+ project.id +'">' + project.name +'</option>')
} 

async function relationProject(projectId){
    const project = await getData('https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false', token)
    for(var i=0; i < project.items.length; i++){
      await viewData(project.items[i])
    }
    projectsDivValue.push('</select>')
     var projectData = projectsDivValue.join(' ')
     projectsList.innerHTML = projectData;  
  }
  
  async function viewData(project){
    projectsDivValue.push('<option value="'+ project.id +'">' + project.name +'</option>')
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

saveLesson.addEventListener('click', function () {
  if (true) {
    changeLessonObj.item.id = parseInt(id.value)
    changeLessonObj.item.projectId =  parseInt(projectsList.value);
    changeLessonObj.item.order =  parseInt(order.value);
    changeLessonObj.item.name =  lessonName.value;
    changeLessonObj.item.description = description.value;
    changeLessonObj.item.markup = markup.value;
    changeLessonObj.item.duration = parseInt(duration.value);
    changeLessonObj.item.type = parseInt(type.value);
    postData(getLessonUrl + lessonId, changeLessonObj.item, 'PUT')
      .then((data) => {
        resp = data
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else{
          window.location.href = 'lessons.html?projectid=' + projectId;
        }
      })
  }
  else {
    validation.style.visibility = 'visible';
  }
})

backToLessonsList.addEventListener('click', function () {

    window.location.href = 'lessons.html?projectid=' + projectId;
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

async function deleteOrRecoverUser(url, token, methodType) {
  return fetch(url, {
    method: methodType,
    headers: token ? {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    } : { 'Content-Type': 'application/json' }
  });
}

async function recoverUser() {
  await deleteOrRecoverUser(getUserUrl + userId +'/recover', token, 'PUT')
    .then((data) => {
      resp = data
      if (resp.message) {
        validation.textContent = resp.message
        validation.style.visibility = 'visible';
      }
      location.reload();
    })
}

async function deleteUser() {
    await deleteOrRecoverUser(getUserUrl + userId, token, 'DELETE')
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

async function assignOrUnassignRelationsForUser(url, assignItemId = '', unassignItemId = '', methodType){
  if (confirm("Shure ?")) {
    var data = {
      "assign": assignItemId!==null? [assignItemId] : [],
      "unassign": unassignItemId!==null? [unassignItemId] : [],
    }
    await postData(url + userId + assignUrlPartTwo, data, methodType);
    window.location.href = 'useredit.html?userId='+ userId;
  }
}

