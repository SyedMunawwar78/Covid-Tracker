const url='https://api.thevirustracker.com/free-api?countryTotals=ALL';
const search= document.querySelector('#search');
search.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(search.search.value);
    getResults(search.search.value)
})

const getResults= async (match)=>{
    console.log('inside')
    const response = await fetch(url);
    const datajson= await response.json();
//    console.log(datajson.countryitems[0]);
    const data = datajson.countryitems[0];
    console.log(data);
    const count=Object.keys(data).length;
    var arr=[];
    arr[0]=["Countries", "Cases","deaths" ,{ role: "style" } ];
/*    for(let i=1; i<50; i++){
//        console.log(data[i].title)   
        arr[i]=[data[i].title,data[i].total_cases,data[i].total_deaths,"#b87333"];
    }
*/for(let i=1; i<count;i++){
    if(data[i].title==match)
        {
            arr[1]=[data[i].title,data[i].total_cases,data[i].total_deaths,"#b87333"];
        }
    }      
    console.log(arr);
    DrawHistorgram(arr);
}


/*
total_cases: 299
total_recovered: 10
total_unresolved: 0
total_deaths: 7
total_new_cases_today: 18
total_new_deaths_today: 1
total_active_cases: 282
total_serious_cases: 0*/