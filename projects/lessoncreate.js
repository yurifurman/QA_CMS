var div = document.querySelector('#lessonData')
var projectsDivValue= ['<select id="parentProject" class="loginInput" disabled="true">']
    var projectsList = document.getElementById('projectsList')
    var projectUrl = 'https://qa-platform.severnyded.tech/api/projects?search=&pageSize=&pageNum=&onlyDeleted=&includeDeleted=false'
    var versionId = document.getElementById('version')
    var order = document.getElementById('order')
    var lessonName = document.getElementById('name')
    var description = document.getElementById('description')
    var markup = document.getElementById('markup')
    var duration = document.getElementById('duration')
    var type = document.getElementById('typeSelect')
const createLessonUrl = 'https://qa-platform.severnyded.tech/api/lessons';
var validation = document.querySelector('#validation')
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



  }
}
projectList(projectUrlId)

async function projectList(projectUrlId)
{
  await relationProject(projectUrlId)
  var parentProject = document.getElementById('parentProject')
  parentProject.value = parseInt(projectUrlId)

}

async function relationProject(projectId){
  const project = await getData(projectUrl, token)
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

createLesson.addEventListener('click', function () {
  if (true) {
    createLessonObj.item.projectId =  parseInt(parentProject.value);
    createLessonObj.item.order =  parseInt(order.value);
    createLessonObj.item.name =  lessonName.value;
    createLessonObj.item.description = description.value;
    createLessonObj.item.markup = markup.value;
    createLessonObj.item.duration = parseInt(duration.value);
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
    validation.style.visibility = 'visible';
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
