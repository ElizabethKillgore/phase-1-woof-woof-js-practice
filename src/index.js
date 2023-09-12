document.addEventListener("DOMContentLoaded", () => {
    console.log('The DOM has loaded')

function renderOnePup(pup) {
    let pupSpan = document.createElement('span')
    pupSpan.innerText = pup.name
       
    document.querySelector("#dog-bar").append(pupSpan)
    pupSpan.addEventListener('click', () => addMorePupInfo(pup))
}


function addMorePupInfo(pup) {
    let morePupInfo = document.querySelector("#dog-info")
    let pupImage = document.createElement("img")
    pupImage.src = pup.image
    
    let pupName = document.createElement("h2")
    pupName.innerText = pup.name
    let pupButton = document.createElement("button")
    
    if (pup.isGoodDog === true) {
    pupButton.innerText = "Good Dog!" }
    else {
        pupButton.innerText = "Bad Dog!"
    }
    
 
document.querySelector("#dog-info").append(pupImage)
document.querySelector("#dog-info").append(pupName)
document.querySelector("#dog-info").append(pupButton)
pupButton.addEventListener('click', () => toggleDogButton(pup))

function toggleDogButton(pup) {
    if (pup.isGoodDog === true) {
    pupButton.innerText = "Bad Dog!" }
    else {
        pupButton.innerText = "Good Dog!"
    }
}
}
let goodDogFilter = document.querySelector("#good-dog-filter")
goodDogFilter.addEventListener('click', () => filterGoodDogs())
function filterGoodDogs() { 
    if (goodDogFilter.innerText === "Filter good dogs: OFF") { 
        goodDogFilter.innerText = "Filter good dogs: ON"
        document.querySelector("#dog-bar").innerHTML = ""
        fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(pupsData => {
            pupsData.forEach(pup => {
                if (pup.isGoodDog === true){
                    renderOnePup(pup)
                }
            })
        })
    }
    else {
        goodDogFilter.innerText = "Filter good dogs: OFF"
        document.querySelector("#dog-bar").innerHTML = ""
        fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(pupsData => {
            pupsData.forEach(pup => {
                renderOnePup(pup)
            })
        })
    }
}

fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(pupsData => {
       pupsData.forEach(pup => {
         renderOnePup(pup)
       }) 
    })

})
