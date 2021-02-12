
'use strict';

const seriesElement = document.querySelector('.js-series');
const buttonElement = document.querySelector('.js-button');
const searchElement = document.querySelector('.js-text');
const favoriteElement = document.querySelector('.js-favorites');
const buttonConsole = document.querySelector ('.js-console');

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
                        let seriesname = "";
                        if (isFavoriteSerie(itemsShow.id)){
                            borderColor = "background";
                            seriesname = "color";
                        } else {
                            borderColor = "";
                            seriesname = "";
                        }
                        htmlCode += `<li class="">`;
                        htmlCode += `<button class="checked js-clicked ${borderColor} " id="${itemsShow.id}">`;
                        const imageShow = itemsShow.image;
                        if (imageShow === null){
                            htmlCode += `<img class="imagen" src="https://via.placeholder.com/210x295/ffffff/666666/?
                            text=TV">`;
                            } else {
                                htmlCode += `<img class="imagen" src="${imageShow.medium}">`;
                            }                                
                        htmlCode += `<p class="${seriesname}"> ${itemsShow.name}</p>`;
                        const scheduleShow = itemsShow.schedule;
                        console.log (scheduleShow.days);
                        htmlCode += `<p class="${seriesname}"> ${scheduleShow.days}</p>`;   
                        htmlCode += '</buton>';    
                        htmlCode += '</li>';
                    }
                }
                htmlCode += `</ul>`;
                seriesElement.innerHTML = htmlCode;
                
                handleSeries();
    }

    // console series

    function handleConsole() {
        for (const serieShow of seriesShow) {
            console.log (serieShow.show.name);
        }
    }
    buttonConsole.addEventListener('click',handleConsole);

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
        if (isFavoriteSerie === -1){
            favoritesSeries.push (data); 
        } else {
            favoritesSeries.splice (isFavoriteSerie, 1);
        }       
        paintFavorites();
        paintSeries(seriesShow);
        setInLocalStorage();
    }

// paint favorites

    function paintFavorites() {
        let htmlCode = '';
                htmlCode += '<h2 class="h2">Mis series favoritas</h2>';
                htmlCode += `<ul class = listClass js-listFavorites>`;
                    for (const favoriteSerie of favoritesSeries) {
                        let resetFavorite = "";
                        htmlCode += '<li class="changes">';
                        htmlCode += `<button class="checked js-clicked" id="${favoriteSerie.id}">`;
                        const showElement = favoriteSerie.show;
                        const imageShow = showElement.image;
                        if (imageShow === null){
                            htmlCode += `<img class="imagen" src="https://via.placeholder.com/210x295/ffffff/666666/?
                        text=TV">`;
                        } else {
                            htmlCode += `<img class="imagen" src="${imageShow.medium}">`; 
                        }                                
                        htmlCode += `<p class="seriesname"> ${favoriteSerie.show.name}</p>`;   
                        htmlCode += '</buton>';    
                        htmlCode += `</li><button id="${favoriteSerie.show.id}" class=" style js-hidden">X</button>`;
                    }
                htmlCode += `</ul><button class="js-reset">Borra tus favoritos</button>`;    

                favoriteElement.innerHTML = htmlCode;

                const resetFavoriteElement = document.querySelectorAll('.js-hidden');
                for (const buttonFavoriteElement of resetFavoriteElement) {
                    buttonFavoriteElement.addEventListener('click', handleRemoveFavorites);
                }
                const listenResetElement = document.querySelector('.js-reset');
                listenResetElement.addEventListener('click', handleResetFavorites);
    }

// resaltando favoritas

    function isFavoriteSerie(serieId) {
        const favoriteFound = favoritesSeries.find(favoriteSerie =>{
            return favoriteSerie.show.id === serieId;
        });
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
            callToApi ('modern family');
        } else {
            const arraySeries = JSON.parse(localStorageSeries);
            favoritesSeries = arraySeries;
            paintFavorites();
        }
    };

 //reset
 function handleResetFavorites() {
    favoritesSeries = [];
    paintFavorites();
    setInLocalStorage();
    paintSeries(seriesShow);
 }
 
    function handleRemoveFavorites(ev) {
        let listen = parseInt(ev.currentTarget.id);   
        const isFavoriteSerie = favoritesSeries.findIndex (fav => fav.show.id === listen);
        if (isFavoriteSerie !== -1){
            favoritesSeries.splice (isFavoriteSerie, 1);
        }
        paintFavorites();
        paintSeries(seriesShow);
        setInLocalStorage();
    }


   
 // start app: search by friends
 getFromLocalStorage();