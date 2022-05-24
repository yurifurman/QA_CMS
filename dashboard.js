
if(localStorage.getItem('token')){
}
else{
    window.location.href = 'login.html';
}


var cardUser = document.querySelector('#cardUser')
var cardProject = document.querySelector('#cardProject')
var cardCompany = document.querySelector('#cardCompany')
var cardGroup = document.querySelector('#cardGroup')

var card1 = document.querySelector('#card1')
var card2 = document.querySelector('#card2')
var card3 = document.querySelector('#card3')
var card4 = document.querySelector('#card4')

var chartImage = document.getElementById('chart')

if(chartImage.attributes.src.value == 'img/chartDashboard.jpg')
{
    card1.style.background = "#7394c1";
}
else
{
    card1.style.background = "#FAE3E3";
}

cardUser.addEventListener('click', function(){
    chartImage.attributes.src.value = 'img/chartDashboard.jpg'
    card1.style.background = "#7394c1";
    card2.style.background = "#FAE3E3";
    card3.style.background = "#FAE3E3";
    card4.style.background = "#FAE3E3";

}) 

cardProject.addEventListener('click', function(){
    chartImage.attributes.src.value = 'img/chartProjects.jpg'
    card2.style.background = "#7394c1";
    card1.style.background = "#FAE3E3";
    card3.style.background = "#FAE3E3";
    card4.style.background = "#FAE3E3";

}) 

cardCompany.addEventListener('click', function(){
    chartImage.attributes.src.value = 'img/chartCompany.jpg'
    card3.style.background = "#7394c1";
    card1.style.background = "#FAE3E3";
    card2.style.background = "#FAE3E3";
    card4.style.background = "#FAE3E3";

}) 

cardGroup.addEventListener('click', function(){
    chartImage.attributes.src.value = 'img/chartGroup.jpg'
    card4.style.background = "#7394c1";
    card1.style.background = "#FAE3E3";
    card2.style.background = "#FAE3E3";
    card3.style.background = "#FAE3E3";
}) 


card1.addEventListener('mouseenter', function(){
    if(chartImage.attributes.src.value != 'img/chartDashboard.jpg')
    {
        card1.style.background = "#d4def2";
    }
     
 })
         
 card1.addEventListener('mouseleave', function(){
    if(chartImage.attributes.src.value == 'img/chartDashboard.jpg')
    {

    }
    else
    {
        this.style.background = "#FAE3E3";
    }
    
 }) 

 card2.addEventListener('mouseenter', function(){
    if(chartImage.attributes.src.value != 'img/chartProjects.jpg')
    {
        card2.style.background = "#d4def2";
    }
     
 })
         
 card2.addEventListener('mouseleave', function(){
    if(chartImage.attributes.src.value == 'img/chartProjects.jpg')
    {

    }
    else
    {
        this.style.background = "#FAE3E3";
    }
    
 }) 

 card3.addEventListener('mouseenter', function(){
    if(chartImage.attributes.src.value != 'img/chartCompany.jpg')
    {
        card3.style.background = "#d4def2";
    }
     
 })
         
 card3.addEventListener('mouseleave', function(){
    if(chartImage.attributes.src.value == 'img/chartCompany.jpg')
    {

    }
    else
    {
        this.style.background = "#FAE3E3";
    }
    
 }) 

 card4.addEventListener('mouseenter', function(){
    if(chartImage.attributes.src.value != 'img/chartGroup.jpg')
    {
        card4.style.background = "#d4def2";
    }
     
 })
         
 card4.addEventListener('mouseleave', function(){
    if(chartImage.attributes.src.value == 'img/chartGroup.jpg')
    {

    }
    else
    {
        this.style.background = "#FAE3E3";
    }
    
 }) 
