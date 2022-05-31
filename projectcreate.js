var projectName = document.getElementById('projectName')
var description = document.getElementById('description')
var priceDiv = document.getElementById('priceDiv')
var lastSubscribeDate = document.getElementById('subscribeDate')
var statusId = document.getElementById('statusSelect')
var typeId = document.getElementById('typeSelect')
var paidId = document.getElementById('paidSelect')
var price = document.getElementById('price')

var validation = document.querySelector('#validation')
var token = JSON.parse(localStorage.getItem('token'))

const createProjectUrl = 'https://qa-platform.severnyded.tech/api/projects';

var createProjectObj = { 
  item: {
   // lastSubscribeDate: '',
    type: '',
    //paidId: '',
    price: null,
    name: '',
    description: ''
  }
}

//************************************************ G E N E R A L ***************************************************
paidId.addEventListener('change', function(){
  // alert('sdfdsa')
   //console.log(userMenu.value)
if (paidId.value != 1){
  priceDiv.innerHTML = ''
}
else{
  priceDiv.innerHTML = '<h1 class="loginLabel">Price</h1><input type="text" class="input" id="price"><br>'
}
})

createProject.addEventListener('click', function () {
    if (true) {
      var priceF = document.getElementById('price')
      if(priceF != null){
        createProjectObj.item.price = priceF.value;
      }
      createProjectObj.item.name = projectName.value;
      createProjectObj.item.type = parseInt(typeId.value);
      createProjectObj.item.description = description.value;
      postData(createProjectUrl, createProjectObj.item, 'POST')
        .then((data) => {
          resp = data
         // console.log(resp.item.id)
          if (resp.message) {
            validation.textContent = resp.message
            validation.style.visibility = 'visible';
          }
          else  
          {
            var editProjectUrl = 'projectedit.html?projectId=' + resp.item.id
            window.location.href = editProjectUrl
          }
        })
    }
    else {
      validation.style.visibility = 'visible';
    }
})

backToProjects.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'projects.html';
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