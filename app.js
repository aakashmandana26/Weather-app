const { json } = require('body-parser');
const { Console } = require('console');
const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get('/',(req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/', (req, res)=>{
    const query = req.body.cityName;
    const apiKey = "5f66dd5d3bcc05aafc8ccb7854b1659a";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    
    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const weatherTemp = weatherData.main.temp;
            // const imageURL=
            const image = weatherData.weather[0].icon;
            // console.log(weatherData.main.temp);
            res.write("<p>The weather is in "+query+" is "+weatherDescription+"</p>");
            res.write("<h1>The temp in "+query+" is "+weatherTemp+" degrees Celcius</h1>");
            res.write("<img src=http://openweathermap.org/img/wn/"+image+"@2x.png>");
            res.send();
        })
    })
    
})

app.listen(3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})