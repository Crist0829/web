
let dWords = document.getElementById("logo-words")

let words = [ //Array con las palabras que estarán animadas. 
    "cout<<'DESARROLLADOR-DE-SOFTWARE';",
    "<p>-DISEÑADOR-WEB-</p>",
    "print('AUTODIDACTA')",
    "{'EMPRENDEDOR'}"]

let charValidate="printcoutsg()'<>/;{}"//letras que serán de otro color
let cont = 0
let long = 0

function haveChar(char){//Recibe como parametro una letra y será comparada con "charValidate" si son las mismas devuelve 1 (true)
    for(i=0; i<char.length; i++){
       if (charValidate.indexOf(char.charAt(i),0)!=-1){
          return 1;
       }
    }
    return 0;
 }


function deleteWords(a){//Elimina (oculta) las letras una por una empezando desde la derecha
    let words = document.getElementsByClassName('letter-logo')
    cont = words.length - 1
    let deleteW = setInterval(() => {
        if(cont < 0){
            clearInterval(deleteW)
            cont = 0
            dWords.innerHTML = ""
            return a()
        }else{
            words[cont].style.display = "none"
            cont --
        }
        
    }, 50)
}
function writeWords(){
    let write = setInterval(() => {
        let word = words[long].split("")
        if(cont === word.length) {
            clearInterval(write)
            if((words.length - long) === 1){
                long = 0
            }else{
                long ++
            }
            setTimeout(()=>{
                deleteWords(writeWords)
            }, 2000)
        }else{
            if(word[cont] === "-"){
                dWords.innerHTML += `<p class="letter-logo"><strong>&nbsp</strong></p>`//Reemplaza los guiones con espacios en blanco.
            }else{
                if(haveChar(word[cont])) {
                    dWords.innerHTML += `<p class="letter-logo code">${word[cont]}</p>`//'El css (con la clase code) le cambia de color a las letras'
                }else{
                    dWords.innerHTML += `<p class="letter-logo"><strong>${word[cont]}</strong></p>`
                }
            }
            cont += 1  
        }
          
    }, 150)
}
window.onload = () => {

    if (window.matchMedia("(min-width: 768px)").matches) {
        let main = document.getElementById("main")
        let body = document.getElementById("body")
        let preloader = document.getElementById("preloader")
        let footer = document.getElementById("footer")
        footer.style.display = "flex"
        body.style.display = "block"
        body.style.backgroundColor = "rgb(80, 75, 75)"
        preloader.style.display = "none"
        main.style.display = "grid"
        main.style.gridTemplateColumns = "20rem auto"
        main.style.gridTemplateRows = "auto auto"
        main.style.gap = "2rem"
        main.style.margin = "1rem"
      } else {
        /* La pantalla tiene menos de 400 píxeles de ancho */
        let main = document.getElementById("main")
        let body = document.getElementById("body")
        let preloader = document.getElementById("preloader")
        let footer = document.getElementById("footer")
        footer.style.display = "flex"
        body.style.display = "block"
        body.style.backgroundColor = "rgb(80, 75, 75)"
        preloader.style.display = "none"
        main.style.display = "flex"
        main.style.flexDirection = "column"
        main.style.margin = "1rem"
      }
    
    
    writeWords()
}
    
