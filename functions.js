console.log('Script load');
let weatherBtn = document.getElementById("getWeatherBtn");
if(weatherBtn){
    weatherBtn.addEventListener("click", showWeather);
    console.log("Found weather button");
}
let newsBtn = document.getElementById("getNewsBtn");
if(newsBtn){
    newsBtn.addEventListener("click", newsFeed);
    console.log("Found news button");
}
let stockBtn = document.getElementById("getGOOGPriceBtn");
if(stockBtn){
    stockBtn.addEventListener("click", stockPrice);
    console.log("Found stock button");
}
// var HttpClient = function() {
//     this.get = function(url, callBack){
//         let httpReq = new XMLHttpRequest();
//             httpReq.onreadystatechange = function() {
//                 if(httpReq.readyState == 4 && httpReq.status == 200){
//                     callBack(httpReq.responseText);
//                 }
//             }
//         httpReq.open("GET", url, true);
//         httpReq.send(null);
//     }
// }

function HttpClient(url, callBack){
    let httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function() {
            if(httpReq.readyState == 4 && httpReq.status == 200){
                callBack(httpReq.responseText);
            }
        }
    httpReq.open("GET", url, true);
    httpReq.send(null);
}

function showWeather() {
    HttpClient('https://api.openweathermap.org/data/2.5/weather?q=Canberra&appid=63f47cc47fc6c176330d1a88575963c3', function(response){
        console.log(response);
        let res = JSON.parse(response);
        let tempK = res.main["temp"];
        let tempC = tempK - 273.15;
        document.getElementById("currentTemp").innerText = tempC;
        let humidity = res.main["humidity"];
        document.getElementById("humidity").innerText = humidity;
        let wind = res.wind["speed"];
        document.getElementById("windSpeed").innerText = wind;
    })
}

function newsFeed() {
    HttpClient('https://newsapi.org/v2/top-headlines?sources=abc-news-au&apiKey=f4bf6c95d64048a5b1980a0e4881abfc', function(response){
        // check ok status
        var res = JSON.parse(response);
        if(res.status != "ok") {
            console.log('Something is not right with the request');
            windows.alert('Response received from news feed is:', res.status);
        };
        // get number of results
        let resNum = res.totalResults;
        console.log("Results:", resNum);
        let newsItems = res.articles;
        // for each news result create card?
        for(let i = 0; i < resNum; i++){
            let cardDiv = document.createElement("div");
            cardDiv.className = "card";
            let cardBodDiv = document.createElement("div");
            cardBodDiv.className = "card-body";

            let title = document.createElement("h5");
            title.className = "card-title";
            title.appendChild(document.createTextNode(newsItems[i].title));

            let description = document.createElement("p");
            description.className = "card-text";
            description.appendChild(document.createTextNode(newsItems[i].description));

            let link = document.createElement("a");
            link.setAttribute("href", newsItems[i].url)
            // link.href = document.createTextNode((newsItems[i].url).toString());
            console.log(typeof newsItems[i].url);
            let linkName = document.createElement("p");
            linkName.className = "card-text small";
            linkName.appendChild(document.createTextNode("Link here"));
            link.appendChild(linkName);

            cardBodDiv.appendChild(title);
            cardBodDiv.appendChild(description);
            cardBodDiv.appendChild(link);
            cardDiv.appendChild(cardBodDiv);
            document.getElementById("newsFeed").appendChild(cardDiv);
        }




        // function create(htmlStr) {
        //     var frag = document.createDocumentFragment(),
        //         temp = document.createElement('div');
        //     temp.innerHTML = htmlStr;
        //     while (temp.firstChild) {
        //         frag.appendChild(temp.firstChild);
        //       }
        //         return frag;
        // }
        
        //     var fragment = create('<div class="card"><p>some text</p></div>'); 
        
        //     document.body.insertBefore(fragment, document.body.childNodes[0]);
        //     document.getElementById("generate-here").appendChild(fragment); 
    })
}

function stockPrice(){
    // use CORS
    HttpClient('https://financialmodelingprep.com/api/company/price/GOOG', function(response){
        let res = JSON.parse(response);
        console.log("done");
    })
}

//window.onload = showWeather;
//window.onload = newsFeed;