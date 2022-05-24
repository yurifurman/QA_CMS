var companyName = document.getElementById('companyName')
var description = document.getElementById('description')
var websiteUrl = document.getElementById('site')

var validation = document.querySelector('#validation')
var token = JSON.parse(localStorage.getItem('token'))

const createCompanyUrl = 'https://qa-platform.severnyded.tech/api/companies';

var createCompanyObj = {
  item: {
   // lastSubscribeDate: '',
    //statusId: '',
    //typeId: '',
    //paidId: '',
    websiteUrl: '',
    name: '',
    description: ''
  }
}

//************************************************ G E N E R A L ***************************************************

createCompany.addEventListener('click', function () {
    if (true) {
      
      createCompanyObj.item.name = companyName.value;
      createCompanyObj.item.websiteUrl = websiteUrl.value;
      createCompanyObj.item.description = description.value;
      console.log(createCompanyObj.item)
      postData(createCompanyUrl, createCompanyObj.item, 'POST')
        .then((data) => {
          resp = data
         // console.log(resp.item.id)
          if (resp.message) {
            validation.textContent = resp.message
            validation.style.visibility = 'visible';
          }
          else 
          {
            var editCompanyUrl = 'companyedit.html?companyId=' + resp.item.id
            window.location.href = editCompanyUrl
          }
        })
    }
    else {
      validation.style.visibility = 'visible';
    }
})

backToCompanies.addEventListener('click', function () {
  if (confirm("Shure ?")) {
    window.location.href = 'companies.html';
  }
  /*
  var urlVadim = 'https://188.166.113.128/bookkeeping/api.php'
var dataVadim = {
  item: {
      "name": "Project22"
  }
}
*/
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