const axios=require('axios')
const command=process.argv[2]
axios.get(`https://geocode.maps.co/search?q=${command}`)
.then(response=>{

    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${response.data[0].lat}&longitude=${response.data[0].lon}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`)
    .then(response=>{
        console.log(`Location: ${command}  current temperature is :`+response.data.current_weather.temperature+' F')
    })
    .catch(error=>{
        console.log(error)
         console.log('Something went wrong please try again!')
    })

})
.catch(error=>{
    console.log(error)
    console.log('Something went wrong please try again!')
})