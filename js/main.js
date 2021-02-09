
'use strict';

const seriesElement = document.querySelector('.js-series');
const buttonElement = document.querySelector('.js-button');
const searchElement = document.querySelector('.js-text');
const favoriteElement = document.querySelector('.js-favorites');

let seriesShow = [];
let favoritesSeries = [];

// api

function callToApi(searchValue) {
    fetch('http://api.tvmaze.com/search/shows?q='+ searchValue)
      .then(response => response.json())
      .then(data => {
          seriesShow = data;
          paintSeries(seriesShow);
          //console.log (seriesShow);
        });
}

// paint

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
                //console.log (clickedElement);
            }
}

function handleFavorites(ev) {
    let listen = ev.currentTarget;
    console.log ('escucha', listen.id);
    
    const data = seriesShow.find (select => (select.show.id) = parseInt(listen.id));
    console.log (data);
    favoritesSeries.push (data);
        //htmlFavoriteCode += `<ul class = listFavoriteClass>`;     
            for (const favoriteSerie of favoritesSeries) {
                console.log (favoriteSerie);
            }
                //console.log (itemsShow.name);
                //console.log (itemsShow.image);
                /*htmlFavoriteCode += '<li class="">';
                htmlFavoriteCode += `<button class="checked js-clicked id="${itemsShow.id}">`;
                const imageShow = [itemsShow.image];
                for (const image  of imageShow ) {
                    //console.log(image.medium)
                
                //if (imageShow == null){
                    htmlFavoriteCode += `<img class="imagen" src="https://via.placeholder.com/210x295/ffffff/666666/?
                    text=TV">`;
                    /*} else {
                        htmlCode += `<img class="imagen" src="./logo-adalab.png">`;
                    }  
                }                              
                htmlFavoriteCode += `<p class="seriesname"> ${itemsShow.name}</p>`;   
                htmlFavoriteCode += '</buton>';    
                htmlFavoriteCode += '</li>';
            }
            }
            htmlFavoriteCode += `</ul>`;*/

    //favoriteElement.innerHTML = htmlFavoriteCode;*/
}
 
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

 // start app: search by friends
 getFromLocalStorage();