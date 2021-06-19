let dWords = document.getElementById("logo-words");
let words = [
    "<p>-DESARROLLADOR-DE-SOFTWARE-</p>",
    "<p>-AUTODIDACTA-</p>",
    "<p>-EMPRENDEDOR-</p>",
    "<p>-AJEDRECISTA-AFICIONADO-</p>"
]
let cont = 0
let long = 0


let createWords = () => {
    let word = words[long].split("")
    if(cont === word.length) {
        if(words.length - long === 1){
            long = 0
            
        }else{
            long ++
            
        }
        cont = 0
        dWords.innerHTML = " "
       
    }else{
        if(word[cont] === "-"){

            dWords.innerHTML += `<p class="letter-logo"><strong>&nbsp</strong></p>`
            
        }else{
            if(word[cont] === "<" || word[cont] === ">" || word[cont] === "/" || word[cont] === "p") {
                dWords.innerHTML += `<p class="letter-logo code">${word[cont]}</p>`
            }else{
                dWords.innerHTML += `<p class="letter-logo"><strong>${word[cont]}</strong></p>`
            }
        }
        cont += 1  
    }
      
}


const excute = setInterval(createWords, 160)

    
