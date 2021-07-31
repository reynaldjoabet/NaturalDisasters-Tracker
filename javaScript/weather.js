const api={
    key: "61287ba04c30039b265e2c21059064a2",
    base:"http://api.weatherstack.com/"
}
var longs=null;
 var  lats=null;
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const apiKey="9476ad1e5c7f52fb8d9bf31ee8cbddaa"

const now= new Date();
 let date= document.getElementById("date");
 date.innerHTML= dateBuilder(now);


const searchBox=document.querySelector(".search-box");
searchBox.addEventListener('keypress',(event)=>{
    if(event.keyCode==13){
        getResults(searchBox.value);
    
    
    }
});

 function getResults(query){
    fetch(`${api.base}current?access_key=${api.key}&query=${query}&units=m `)
    .then(weatherResponse=>weatherResponse.json())
    .then(jsonData=>{
        console.log(jsonData)
 let location= document.getElementById("location");
 location.innerHTML=`${jsonData.location.name} , ${jsonData.location.country}`;
 let icon=document.getElementById("weather-icon");
 let desc=document.getElementById("description");
 var temp=document.getElementById("temp");
 icon.src=jsonData.current.weather_icons[0];
 const descriptionData=jsonData.current.weather_descriptions[0];
 desc.innerHTML=descriptionData.charAt(0).toUpperCase() + descriptionData.slice(1);
 
 
 const long=jsonData.location.lon
 const lat=jsonData.location.lat
  
  const restOfDays=days.slice(now.getDay()+1)
  const otherDays=days.splice(0,now.getDay()+1)
  const combinedDays=restOfDays.concat(otherDays)
  //console.log(combinedDays);
  //const long=-0.106;
 //const lat=51.517;
 

  function forecasts(query){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`)
    .then(forecastResponse=>forecastResponse.json())
    .then(json=>{
        
        const order=["first","second","third","fourth","fifth","sixth","seventh"];
        console.log(json.daily.filter((ele,index)=>index>0)); 
    
        const weeklyData=json.daily.filter((ele,index)=>index>0);
        
 const iconURL="http://openweathermap.org/img/w/"

        for(var i=0; i<combinedDays.length;i++){
            const icon=weeklyData[i].weather[0].icon;
           const day=`${order[i]}`+"-day";
           const tem=`${order[i]}`+"-temp";
           const hum=`${order[i]}`+"-humidity";
            const pre=`${order[i]}`+"-precip";

 
     
            document.getElementById(day).innerText=combinedDays[i];
           const deg="°C"
           const tempera= document.getElementById(tem)
         
           if(deg=="°C"){
            temp.innerHTML=`${Math.round(jsonData.current.temperature) } <span id="active"> °C  </span><span id="inactive"> °F  </span>`;
            tempera.innerHTML=` ${weeklyData[i].temp.max} <span> ${deg}</span>`;

           }
           else{
            temp.innerHTML=`${Math.round(fahrenheit(Math.round(jsonData.current.temperature))) } <span id="inactive"> °C  </span><span id="active"> °F  </span>`;
            tempera.innerHTML=` ${Math.round(fahrenheit(weeklyData[i].temp.max))} <span> °F</span>`;
           }
           const img = document.createElement('img'); 
           img.src =  `${iconURL+icon}`+ ".png"; 
	       tempera.appendChild(img);
            
            document.getElementById(hum).innerHTML=`${weeklyData[i].humidity} <span> %</span>`;
            document.getElementById(pre).innerHTML=`${jsonData.current.precip} <span> %</span>`;
             
        }



        const active=document.getElementById("active");
        
         const inactive=document.getElementById("inactive");
            
            inactive.addEventListener("click",()=>{
                if(inactive.firstChild==="°C"){
                    
             active.parentNode.removeChild(active);
             inactive.parentNode.removeChild(inactive);
                
                    temp.innerHTML=`${Math.round(jsonData.current.temperature) } <span id="active"> °C  </span><span id="inactive"> °F  </span>`;
                    
                }
                else{
                    
                    
                    active.parentNode.removeChild(active);
             inactive.parentNode.removeChild(inactive);
                    
                    temp.innerHTML=`${Math.round(fahrenheit(Math.round(jsonData.current.temperature))) } <span id="inactive"> °C  </span><span id="active"> °F  </span>`;
                
                }
                
                
                
                //tempera.innerHTML=` ${Math.round(fahrenheit(weeklyData[i].temp.max))}/${Math.round(fahrenheit(weeklyData[i].temp.min))} <span> °F</span>`;
 })
 
      
        switch(json.current.weather[0].main){
            case "Clouds":
                document.body.style.backgroundImage=`url("images/clouds.jpeg")`;
                break;

            case "Thunderstorm":
                document.body.style.backgroundImage=`url("images/storm.jpeg")`;
                break;
                
            case "Drizzle":
            case "Rain":
            case "Mist":
                document.body.style.backgroundImage=`url("images/rainy.jpeg")`;
                    break;

            case "Snow":
                document.body.style.backgroundImage=`url("images/snow.jpeg")`;
                break;
                
                
         case "Clear":
            document.body.style.backgroundImage=`url("images/sunny.jpeg")`;
             break;

        }
    })
 }
 
 forecasts(query);
 
    })
}



function dateBuilder(d){
    let months=["January","Febuary","March","April","May","June",
"July","August","September","October","November","December"];


 let day=days[d.getDay()];
 let date=d.getDate();
 let month= months[d.getMonth()]
 let year=d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}







function fahrenheit(value){
    return (value *(9/5))+32;
}
 window.onload= getResults("london");
 
 
   


 