
'use strict';

const seriesElement = document.querySelector('.js-series');

// api

//function callToApi() {
    fetch('http://api.tvmaze.com/search/shows?q=girlmore')
      .then(response => response.json())
      .then(data => {
          //console.log (data[0].show);
          paintSeries(data);
        });
//}

// paint

function paintSeries(characteres) {
    let htmlCode = '';
          htmlCode += `<ul class = listClass>`;
            for (let index = 0; index < characteres.length; index++) {
                const elements = characteres[index];
                const showElement = [elements.show];
                //console.log (showElement);            
            for (const itemsShow of showElement) {
                //console.log (itemsShow.name);
                //console.log (itemsShow.image);
                htmlCode += '<li>';
                htmlCode += `<img class="imagen" src="${itemsShow.image}">`;
                htmlCode += `<p class="seriesname"> ${itemsShow.name}</p>`;        
                htmlCode += '</li>';
            }
            }
            htmlCode += `</ul>`;
            seriesElement.innerHTML = htmlCode;
  }
console.log (seriesElement);


  