const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const axios=require('axios')
const port =process.env.PORT || 3000

//define oaths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) //point to the templates file if we dont use the views as name of the directory
hbs.registerPartials(partialsPath)


//set up the static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kevin Yan'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Kevin Yan'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Kevin Yan',
        helperText:'I here to help!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide an address!' })
    }
    const address=req.query.address
    axios.get(`https://geocode.maps.co/search?q=${req.query.address}`)
        .then(response => {
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${response.data[0].lat}&longitude=${response.data[0].lon}&current_weather=true&temperature_unit=fahrenheit&daily=sunrise&timezone=America/New_York&daily=apparent_temperature_max&daily=apparent_temperature_min&forecast_days=1&daily=precipitation_probability_mean&daily=uv_index_max&windspeed_unit=mph`)
                .then(response => {
                    res.send({
                        location: 'Location is : '+address,
                        temperature: `Current temperature is: ${response.data.current_weather.temperature} F.`,
                        windspeed:`Current windspeed is : ${response.data.current_weather.windspeed} mph.`,
                        dailyTemperature:`Today's temperature is hign at ${response.data.daily.apparent_temperature_max}F and low at ${response.data.daily.apparent_temperature_min}F.`,
                        likelyrain:`There are ${response.data.daily.precipitation_probability_mean}% chance rain.`,
                        uv_index_max:`Today UV index is ${response.data.daily.uv_index_max}.`
                    })
                })
                .catch(error => {
                    res.send({
                        error: 'Oops! Unable to fectch location data! Try another search.'
                    })
                })
        })
        .catch(error => {
            res.send({
                error: 'Oops! unable to access location! Try another search.'
            })
        })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help',
        name:'Kevin Yan',
        error:'Help article not found!'
    })
}) 

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Help',
        name:'Kevin Yan',
        error:'Page not found!'
    })
})
const greet=(name='kevin')=>{
    console.log(name)
}
greet()

app.listen(port,()=>{
    console.log(`The server is running on port ${port}!`)
})