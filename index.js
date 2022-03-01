//variables
 var GeneralBtn = document.getElementById("General");
 var BusinessBtn = document.getElementById("Business");
 const SportsBtn = document.getElementById("Sports");
 const TechnologyBtn = document.getElementById("Technology");
 const EntertainmentBtn = document.getElementById("Entertainment");
 const searchBtn = document.getElementById("searchBtn");

 const newsQuery = document.getElementById("newsQuery");
 const newstype = document.getElementById("newstype");
 const newsdetails = document.getElementById("newsdetails");
 
 //array
 var newsDataArr= [];

 //apis

 const API_KEY = "cacaa73a9f5d494aaa7ad15709acce89" //
 const Headlines=" https://newsapi.org/v2/top-headlines?country=in&apiKey=";
 const General="  https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
 const Business="  https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
 const Technology=" https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
 const Entertainment=" https://newsapi.org/v2/top-headlines?country=us&apiKey=";
 const Sports="GET https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
 const search="GET https://newsapi.org/v2/everything?q=";


 const registerSW = async () => {
	// this line checks wether the browser supports serviceWorker or not.
	if ("serviceWorker" in navigator) {
		try {
			await navigator.serviceWorker.register("./sw.js");
		} catch (e) {
			console.log(`SW registration failed`);
		}
	}
};



 GeneralBtn.addEventListener("click",function(){
     fetchGeneral();
 });

 BusinessBtn.addEventListener("click",function(){
    fetchBusiness();

});

SportsBtn.addEventListener("click",function(){
    fetchSports();

});

TechnologyBtn.addEventListener("click",function(){
    fetchEntertainment();

});


EntertainmentBtn.addEventListener("click",function(){
    fetchTechnology();

});

searchBtn.addEventListener("click",function(){
    fetchQuery();

});

const fetchGeneral = async () => {
    console.log("#")
    const response = await fetch(General+API_KEY);
    
    if(response.status >=200 && response.status  < 300) {               //to check is response is succesful or not
         const myJson = await response.json();
         newsDataArr = myJson.articles;
         console.log (newsDataArr)
    }else {
        //hanlde errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchBusiness = async () => {
    console.log("#")
    const response = await fetch(Business+API_KEY);
    
    if(response.status >=200 && response.status  < 300) {               //to check is response is succesful or not
         const myJson = await response.json();
         newsDataArr = myJson.articles;
         console.log(newsDataArr)
    }else {
        //hanlde errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchSports = async () => {
    console.log("#")
    
    const response = await fetch(Sports+API_KEY);
    
    if(response.status >=200 && response.status  < 300) {               //to check is response is succesful or not
         const myJson = await response.json();
         newsDataArr = myJson.articles;
         console.log(newsDataArr)
    }else {
        //hanlde errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchTechnology = async () => {
    console.log("#")
    const response = await fetch(Technology+API_KEY);
    
    if(response.status >=200 && response.status  < 300) {               //to check is response is succesful or not
         const myJson = await response.json();
         newsDataArr = myJson.articles;
         console.log(myJson);
         console.log(newsDataArr)
    }else {
        //hanlde errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}


const fetchEntertainment = async () => {
    console.log("#")
    const response = await fetch(Entertainment+API_KEY);
    
    if(response.status >=200 && response.status  < 300) {               //to check is response is succesful or not
         const myJson = await response.json();
         newsDataArr = myJson;
         console.log(newsDataArr)
    }else {
        //hanlde errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}
    


const fetchQuery = async () => {
    console.log("#")

    if(newsQuery.value==null)
         return;

    const response = await fetch(search+emcodeURIComponent(newsQuery.value)+"apikey="+API_KEY);
    
    if(response.status >=200 && response.status  < 300) {               //to check is response is succesful or not
         const myJson = await response.json();
         newsDataArr = myJson;
         console.log(newsDataArr)
    }else {
        //hanlde errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

function displayNews() {

newsdetails.innerHTML = "";
    if(newsDataArr.length==0){
        newsdetails.innerHTML = "<h5>No data was found</h5>"
        return;
    }else{
        newsDataArr.forEach(news => {

            var date =  news.publishedAt.split("T")
    
            var col = document.createElement('div');
            col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";
    
            var card = document.createElement('div');
            card.className = "p-2";
    
            var image = document.createElement('img');
            image.setAttribute("height","matchparnt");
            image.setAttribute("width","100%");
            image.src=news.urlToImage;
    
    
            var cardbody = document.createElement('div');
    
            var newsHeading = document.createElement('h5');
            newsHeading.className = "card-title";
            newsHeading.innerHTML = news.title;
    
            var dateHeading = document.createElement('h6');
            dateHeading,className= 'text-primary';
           
            var discription = document.createElement('p');
            discription.classname="text-muted";
            discription.innerHTML = news.discription;
    
            var link = document.createElement('a');
            link.className="btn btn-dark";
            link.setAttribute("target","_blank");
            link.href=news.url;
            link.innerHTML="Read more";
    
            cardbody.appendChild(newsHeading);
            cardbody.appendChild(dateHeading);
            cardbody.appendChild(discription);
            cardbody.appendChild(link);
    
            card.appendChild(image);
            card.appendChild(cardbody);
    
            col.appendChild(card);
    
            newsdetails.appendChild(col);
    
    

    

});
}
}

