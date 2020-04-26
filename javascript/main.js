// 1. Search
var search= document.querySelector('input');
search.addEventListener('keyup',(e)=>{
//    console.log(e.key,e);
    if(e.which==13){
        //e.target.value;
        SoundCloudAPI.clear();
        SoundCloudAPI.get(e.target.value);
    }
})
// 2. sound cloud api
//wrapping everything inside an object
var SoundCloudAPI= {};

SoundCloudAPI.init=function(){    
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}
SoundCloudAPI.init();
//initializes
//consider this as if then function if the response of get is true or success then give the tracks, so that we can load them dynamically
SoundCloudAPI.get=function(input){
    SC.get('/tracks', { //license is optional here
        q:input,// search parameter 'q' takes input from the search
    }).then(function (tracks) {
        console.log(tracks);
        SoundCloudAPI.RenderTracks(tracks); //know that tracks is an array of objects we can cycle using forEach(function)
    });
}

//render Tracks dynamically add cards to the page after search

// 3. ADD cards
SoundCloudAPI.RenderTracks=function(tracks){
    tracks.forEach((track)=>{  //individual object
//        console.log(track);
        var outerCard= document.querySelector('.search-results');
        var card= document.createElement('div');
        card.classList.add('card');
        outerCard.appendChild(card);
    
        var image= document.createElement('div');
        image.classList.add('image');

        var img= document.createElement('img');
        img.classList.add('image_img');
        img.src=track.artwork_url || "http://lorempixel.com/200/200/abstract/";
        image.appendChild(img);

        var content= document.createElement('div');
        content.classList.add('content');
        
        var header=document.createElement('div');
        header.classList.add('header');
        header.innerHTML=`<a href=${track.permalink_url} target="_blank">${track.title}</a>`;
        
        var button= document.createElement('div');
        button.classList.add('ui','bottom','attached','button','js-button');
        button.addEventListener('click',()=>{
            console.log('clicked');
            SoundCloudAPI.embedSidebar(track.permalink_url);
        })
        button.innerHTML=`
            <i class="add icon"></i>
            <span>Add to playlist</span>`;
        card.appendChild(image);
        card.appendChild(content)
        card.appendChild(button);
        content.appendChild(header);

    })
}

// 4. play card on side append to playlist
//embedding the cards on to the left from soundcloud provided sdk
SoundCloudAPI.embedSidebar=function(link){
    SC.oEmbed(link, {
        auto_play: true
    }).then(function(embed){
//        console.log('oEmbed response: ', embed.html);
        const sidebar= document.querySelector('.col-left');
        const box= document.createElement('div');
        box.classList.add('box');
        box.innerHTML=embed.html;
//
        const CloseBar= document.createElement('p');
        CloseBar.classList.add('close');
        CloseBar.innerText='X';
        box.appendChild(CloseBar);

        sidebar.appendChild(box);

        CloseBar.addEventListener('click',()=>{
            console.log('clicked');
            box.innerHTML='';
        })
    });

}   


//5) clear the search whenever the user enters the data
SoundCloudAPI.clear= function(){
    var clear= document.querySelector('.search-results');
    clear.innerHTML='';
}
