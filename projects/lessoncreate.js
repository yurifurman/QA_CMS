var div = document.querySelector('#lessonData')
var projectsDivValue= ['<select id="parentProject" class="loginInput" disabled="true">']
var projectsListDiv = document.getElementById('projectsList')
var projectUrl = 'https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
var order = document.getElementById('order')
var lessonName = document.getElementById('name')
var description = document.getElementById('description')
var markup = document.getElementById('markup')
var duration = document.getElementById('duration')
var type = document.getElementById('typeSelect')
var assignAppUrl = 'https://qa-platform.severnyded.tech/api/applications/projects/'
var appIds = []
var appsDivValue = ['<select id="versionsList" class="loginInput"> <option value="0"> --Please Select Version--</option>']
var versionsList = document.getElementById('versionsList')
const createLessonUrl = 'https://qa-platform.severnyded.tech/api/lessons';
var validation = document.querySelector('#validation')
var parentProject = document.getElementById('parentProject')
var token = JSON.parse(localStorage.getItem('token'))
const url = window.location.search
const projectUrlId = url.split('=')[1]


var createLessonObj = {
  item: {
    projectId: '',
    //versionId: '',
    order:'',
    name: '',
    description: '',
    markup: '',
    duration: '',
    type: '',
    versionId: '',



  }
}
relationProject(projectUrlId)
relationApplications()

async function relationProject(projectUrlId){
  const project = await getData(projectUrl, token)
  for(var i=0; i < project.items.length; i++){
    await iaddArrayData(project.items[i])
  }
  projectsDivValue.push('</select>')
   var projectData = projectsDivValue.join(' ')
   projectsListDiv.innerHTML = projectData; 
   var projectsListDiv2 = document.getElementById('parentProject') 
   projectsListDiv2.value = projectUrlId
}

async function iaddArrayData(project){
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

createLesson.addEventListener('click', function () {
  var versionsList = document.getElementById('versionsList')
  if (versionsList.value != 0) {
    createLessonObj.item.versionId = parseInt(versionsList.value)
    createLessonObj.item.projectId =  projectUrlId;
    createLessonObj.item.order =  parseInt(order.value);
    createLessonObj.item.name =  lessonName.value;
    createLessonObj.item.description = description.value;
    createLessonObj.item.markup = markup.value;
    createLessonObj.item.duration = parseInt(duration.value);
    createLessonObj.item.type = parseInt(type.value);
    createLessonObj.item.type = parseInt(type.value);
    postData(createLessonUrl, createLessonObj.item, 'POST')
      .then((data) => {
        resp = data
        
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else 
        {
          var editLessonUrl = 'lessonedit.html?lessonId=' + resp.item.id + '?projectid=' + projectUrlId
          window.location.href = editLessonUrl
        }
      })
  }
  else {
    createLessonObj.item.projectId =  projectUrlId;
    createLessonObj.item.order =  parseInt(order.value);
    createLessonObj.item.name =  lessonName.value;
    createLessonObj.item.description = description.value;
    createLessonObj.item.markup = markup.value;
    createLessonObj.item.duration = parseInt(duration.value);
    createLessonObj.item.type = parseInt(type.value);
    createLessonObj.item.type = parseInt(type.value);
    postData(createLessonUrl, createLessonObj.item, 'POST')
      .then((data) => {
        resp = data
        
        if (resp.message) {
          validation.textContent = resp.message
          validation.style.visibility = 'visible';
        }
        else 
        {
          var editLessonUrl = 'lessonedit.html?lessonId=' + resp.item.id + '?projectid=' + projectUrlId
          window.location.href = editLessonUrl
        }
      })
  }
})

backToLessons.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'lessons.html?projectid=' + projectUrlId;
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

//****************************************************** V E R S I O N ****************************************************
async function relationApplications(){
  const applications = await getData(assignAppUrl + projectUrlId, token)
  for(var i=0; i < applications.items.length; i++){
    appIds.push(applications.items[i].id)
    relationVersion(applications.items[i].id)
  }

}

async function relationVersion(app){
  const versions = await getData('https://qa-platform.severnyded.tech/api/versions/applications/' + app + '?search=&onlyDeleted&pageSize&pageNum', token)
  for(var i=0; i < versions.items.length; i++){
    await addArrayData(versions.items[i])
  }
  appsDivValue.push('</select>')
  var appData = appsDivValue.join(' ')
  var versionsList = document.getElementById('versionsList')
  versionsList.innerHTML = appData;  
} 

async function addArrayData(version){
  for(let key in version){
    if(appIds.includes(version.applicationId)){
      appsDivValue.push('<option value="'+ version.id +'">' + version.name +'</option>')
      break;
    }
      }
    }