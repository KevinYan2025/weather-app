console.log('Client side javascript file is run!')


const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.getElementById('message-1')
const messageTwo=document.getElementById('message-2')
const messageThree=document.getElementById('message-3')
const messageFour=document.getElementById('message-4')
const messageFive=document.getElementById('message-5')
const messageSix=document.getElementById('message-6')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent='Loading......'
    messageTwo.textContent=''
    messageThree.textContent=''
    messageFour.textContent=''
    messageFive.textContent=''
    messageSix.textContent=''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
            messageThree.textContent=''
            messageFour.textContent=''
            messageFive.textContent=''
            messageSix.textContent=''
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.temperature
            messageThree.textContent=data.windspeed
            messageFour.textContent=data.dailyTemperature
            messageFive.textContent=data.likelyrain
            messageSix.textContent=data. uv_index_max
        }
    })
    
})
})