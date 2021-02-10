
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
                    let borderColor = "";
                    debugger;
                    if (isFavoriteSerie(itemsShow.id)){
                        borderColor = "color";
                    } else {
                        borderColor = "";
                    }
                    console.log (borderColor);
                    htmlCode += '<li class="">';
                    htmlCode += `<button class="checked js-clicked ${borderColor}" id="${itemsShow.id}">`;
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
            
            handleSeries();
  }

 //search series

function handleSearch() {
        callToApi(searchElement.value);
        setInLocalStorage(searchElement.value);
}
buttonElement.addEventListener('click',handleSearch);


//listen series

function handleSeries() {
    const clickedElements = document.querySelectorAll('.js-clicked');
            for (const clickedElement of clickedElements) {
                clickedElement.addEventListener('click',handleFavorites);
            }
}

// handle favorites
function handleFavorites(ev) {
    let listen = parseInt(ev.currentTarget.id);   
    const data = seriesShow.find (select => select.show.id === listen);
    const isFavoriteSerie = favoritesSeries.findIndex (fav => fav.show.id === data.show.id);
    //console.log(isFavoriteSerie);
    if (isFavoriteSerie === -1){
        favoritesSeries.push (data); 
    } else {
        favoritesSeries.splice (isFavoriteSerie, 1);
    }
    
       
    paintFavorites();
    handleResetFavorites();
    paintSeries(seriesShow);
    setInLocalStorage();
}

// paint favorites

function paintFavorites() {
    let htmlCode = '';
            htmlCode += '<h2 class="h2">Mis series favoritas</h2>';
            //htmlCode += '<button class="js-reset">reset</button>';                             
            htmlCode += `<ul class = listClass js-listFavorites>`;
            /*for (let index = 0; index < favoritesSeries.length; index++) {
                const elements = favoritesSeries[index]; */                   
                for (const favoriteSerie of favoritesSeries) {
                    //console.log (favoriteSerie); 
                    htmlCode += '<li class="">';
                    htmlCode += `<button class="checked js-clicked" id="${favoriteSerie.id}">`;
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
            //isFavoriteSerie();
}

// resaltando favoritas

function isFavoriteSerie(serieId) {
    const favoriteFound = favoritesSeries.find(favoriteSerie =>{
        return favoriteSerie.show.id === serieId;
    });
    console.log (favoriteFound);
    if (favoriteFound === undefined) {
        return false;
    }else{
        return true;
    }
}
 
 //local storage

 function setInLocalStorage() {
     const stringSeries = JSON.stringify(favoritesSeries);
    localStorage.setItem ('searchvalue', stringSeries);
  };

  function getFromLocalStorage() {
     const localStorageSeries= localStorage.getItem ('searchvalue'); 
     if (localStorageSeries === null){
         callToApi ('friends');
         searchElement.value = 'friends';
     } else {
         const arraySeries = JSON.parse(localStorageSeries);
         favoritesSeries = arraySeries;
         paintFavorites();
    }
  };
/*
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
 };*/

 //reset
 function handleResetFavorites() {
    //listenResetElement.innerHTML= '';
console.log ('borra favoritas...')
    
 }
 resetFavoriteElement.addEventListener('click', handleResetFavorites);

   
 // start app: search by friends
 getFromLocalStorage();