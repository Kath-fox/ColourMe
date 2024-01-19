let seedColourInput = document.getElementById('seed-colour')
let modeInput = document.getElementById('mode')
const colourPicker = document.getElementById('colour-picker')
let coloursArr = []


renderPage()

function renderPage() {
    const seedColour = seedColourInput.value.slice(1)
    const mode = modeInput.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColour}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            coloursArr = data.colors
            renderScheme()
        })
}


// handle colour picker form submit
colourPicker.addEventListener('submit', (e) => {
    e.preventDefault()
    const seedColour = seedColourInput.value.slice(1)
    const mode = modeInput.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColour}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            coloursArr = data.colors
            renderScheme()
        })
})


// render colour scheme from colours array
function renderScheme() {
    // console.log(coloursArr[0].name.value)
    for (let [index, colour] of coloursArr.entries()) {
        document.getElementById(`colour${index}`).style.background = `${colour.hex.value}`
        document.getElementById(`colour${index}`).innerHTML = `
            <button class="hex-val-btn" id="hex-val${index}">${colour.hex.value}</button>
            <p class="colour-name" id="colour-name${index}">${colour.name.value}</p>
        `
        if (colour.hsl.l < 50) {
            document.getElementById(`hex-val${index}`).style.color = "white"
            document.getElementById(`colour-name${index}`).style.color = "rgba(255, 255, 255, 50%)"
        }
    }
}


// Copy hex value to cipboard
document.addEventListener('click', function(e){
    if(e.target.id === 'hex-val0'){
        copyHexToClipboard(e.target.innerText)
    }
    if(e.target.id === 'hex-val1'){
        copyHexToClipboard(e.target.innerText)
    }
    if(e.target.id === 'hex-val2'){
        copyHexToClipboard(e.target.innerText)
    }
    if(e.target.id === 'hex-val3'){
        copyHexToClipboard(e.target.innerText)
    }
    if(e.target.id === 'hex-val4'){
        copyHexToClipboard(e.target.innerText)
    }
})

function copyHexToClipboard(hexCode){
    navigator.clipboard.writeText(hexCode)
        .then(() => {
            alert("Hex value copied to clipboard")
        })
}