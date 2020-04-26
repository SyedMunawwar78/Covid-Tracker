/*1. search */
const url='https://api.thevirustracker.com/free-api?countryTotals=ALL';
var CovidAPI={};
CovidAPI.init=()=>{
    const search= document.querySelector('#search');
    search.addEventListener('submit',(e)=>{
       e.preventDefault();
        console.log(search.search.value);
        CovidAPI.ScrollTOcountry(search.search.value);
   })  
/*        function capitalizeFLetter() { 
          var input = document.getElementById("input"); 
          var x = document.getElementById("div"); 
          var string = input.value; 
          x.innerHTML = string.charAt(0).toUpperCase() + 
           string.slice(1); 
        } */  
}
CovidAPI.init();

/*2. virustracker api */

const GetResults= async ()=>{
    console.log('inside')
    const response = await fetch(url);
    const datajson= await response.json();
//    console.log(datajson.countryitems[0]);
    const data = datajson.countryitems[0];
    console.log(data);
    const count=Object.keys(data).length;
    var arr=[];
    for(let i=1; i<count; i++){
        arr[i]=data[i];
    }     
    console.log(arr);
    CovidAPI.renderCountries(arr);
}
GetResults();

/*3. add cards */
CovidAPI.renderCountries= (countries)=>{
    countries.forEach((country)=>{
        console.log(country.title);
        const divcontainer= document.querySelector('.search-results');
        const htmll=`
        <div class="card">
                    <div class="image">
                        
                    </div>
                    <image id="img" src="https://www.countryflags.io/${country.code}/shiny/64.png" width="100" height="100" style="margin:auto;">
                    <h1  style="text-align: center;">${country.title}</h1>
                    <div class="content">
                        <div class="headers">
                        <h3 style="color:red" class="deaths">Deaths: ${country.total_deaths}</h3>
                        <h3>Cases: ${country.total_cases}</h3>
                        <h3 style="color:blue" class="newcases">New Cases: ${country.total_new_cases_today}</h3>
                        </div>
                    </div>
        </div>`;
        const html=`
        <div class="image">
                        
        </div>
        <image id="img" src="https://www.countryflags.io/${country.code}/shiny/64.png" width="100" height="100" style="margin:auto;">
        <div class="card" style="width: 18rem;">
        <h1 class="target" style="text-align: center;">${country.title}</h1>
  <div class="card-body">
  <h3 style="color:red" class="deaths">Deaths: ${country.total_deaths}</h3>
  <h3>Cases: ${country.total_cases}</h3>
  <h3 style="color:blue" class="newcases">New Cases: ${country.total_new_cases_today}</h3>
  </div>
</div>`
  
        divcontainer.innerHTML+=html;
    })

    
}
/* SCROLL TO COUNTRY */
CovidAPI.ScrollTOcountry=(string)=>{
//    var string =window.prompt();
    function capitalizeFLetter() {  
        var capitalFletter = string.charAt(0).toUpperCase() + string.slice(1);
        return capitalFletter; 
    }
    var givenString = capitalizeFLetter();
    var matches = $('body, body *').
                addBack().
                contents().
                filter(function(){                     
                    return this.nodeType === 3;
                }).
                filter(function(){
                // Only match when contains given string anywhere in the text               
                     if(this.nodeValue.indexOf(givenString) != -1)
                       return true;
                }).first();
    
    if(matches.length > 0){
        var offset = $(matches).wrap('<span>').parent().offset().top;
        console.log(offset);
        $('html, body').animate({scrollTop: offset}, 'slow');
       // $(".target").effect( "highlight", {color:"#669966"},3000 );
    }    
}


/*4. clear search */

