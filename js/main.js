
'use strict';

const seriesElement = document.querySelector('.js-series');
const buttonElement = document.querySelector('.js-button');
const searchElement = document.querySelector('.js-text');
const favoriteElement = document.querySelector('.js-favorites');
const resetFavoriteElement = document.querySelector('.js-hidden');
const listenResetElement = document.querySelector('.js-reset');

let seriesShow = [];
let favoritesSeries = [];

// api

function callToApi(searchValue) {
    fetch('http://api.tvmaze.com/search/shows?q='+ searchValue)
      .then(response => response.json())
      .then(data => {
          seriesShow = data;
          paintSeries(seriesShow);
        });
}

// paint series

function paintSeries(characteres) {
    let htmlCode = '';
            htmlCode += `<ul class = listClass>`;
            for (let index = 0; index < characteres.length; index++) {
                const elements = characteres[index];
                const showElement = [elements.show];       
            for (let itemsShow of showElement) {
                htmlCode += '<li class="">';
                htmlCode += `<button class="checked js-clicked" id="${itemsShow.id}">`;
                const imageShow = itemsShow.image;
                if (imageShow === null){
                    htmlCode += `<img class="imagen" src="https://via.placeholder.com/210x295/ffffff/666666/?
                    text=TV">`;
                    } else {
                        htmlCode += `<img class="imagen" src="${imageShow.medium}">`;
                    }                                
                htmlCode += `<p class="seriesname"> ${itemsShow.name}</p>`;   
                htmlCode += '</buton>';    
                htmlCode += '</li>';
            }
            }
            htmlCode += `</ul>`;
            seriesElement.innerHTML = htmlCode;
            
            listenFavoritesSeries();
  }

 //search series

function handleSearch() {
        callToApi(searchElement.value);
        setInLocalStorage(searchElement.value);
}
buttonElement.addEventListener('click',handleSearch);


//check favorites

function listenFavoritesSeries() {
    const clickedElements = document.querySelectorAll('.js-clicked');
            for (const clickedElement of clickedElements) {
                clickedElement.addEventListener('click',handleFavorites);
                console.log (clickedElement);
            }
}

// handle favorites
function handleFavorites(ev) {
    let listen = ev.currentTarget;
    //console.log ('escucha', listen.id);   
    const data = seriesShow.find (select => (select.show.id) = parseInt(listen.id));
    //console.log (data);
    favoritesSeries.push (data); 
            let htmlCode = '';
            htmlCode += '<h2 class="h2">Mis series favoritas</h2>';
            //htmlCode += '<button class="js-reset">reset</button>';                             
            htmlCode += `<ul class = listClass js-listFavorites>`;
            /*for (let index = 0; index < favoritesSeries.length; index++) {
                const elements = favoritesSeries[index]; */                      
                for (const favoriteSerie of favoritesSeries) {
                    //console.log (favoriteSerie); 
                    htmlCode += '<li class="">';
                    htmlCode += `<button class="checked color js-clicked" id="${favoriteSerie.id}">`;
                    const showElement = favoriteSerie.show;
                    //console.log(showElement);
                    const imageShow = showElement.image;
                    //console.log(imageShow);
                    if (imageShow === null){
                        htmlCode += `<img class="imagen" src="https://via.placeholder.com/210x295/ffffff/666666/?
                    text=TV">`;
                    } else {
                        htmlCode += `<img class="imagen" src="${imageShow.medium}">`; 
                    }                                
                    htmlCode += `<p class="seriesname"> ${favoriteSerie.show.name}</p><button class="js-reset">reset</button>`;   
                    htmlCode += '</buton>';    
                    htmlCode += '</li>';
                }
            //}
            htmlCode += `</ul>`;    
            favoriteElement.innerHTML = htmlCode;
        
        handleResetFavorites();
}

// resaltando favoritas
/*
function isFavoriteSerie(favoriteSerie) {
    console.log(favoriteSerie)
    return ;
}*/
 
 //local storage

 function setInLocalStorage(searchSeries) {
   localStorage.setItem ('searchvalue', searchSeries);
 };

 function getFromLocalStorage() {
    const searchText= localStorage.getItem ('searchvalue'); 
    if (searchText === null){
        callToApi ('friends');
        searchElement.value = 'friends';
    } else {
        callToApi(searchText);
        searchElement.value = searchText;
    }
 };

 //reset
 function handleResetFavorites() {
    //listenResetElement.innerHTML= '';
console.log ('borra favoritas...')
    
 }
 resetFavoriteElement.addEventListener('click', handleResetFavorites);

   
 // start app: search by friends
 getFromLocalStorage();