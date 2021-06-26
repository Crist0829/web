let dWords = document.getElementById("logo-words");
let words = [
    "cout<<'DESARROLLADOR-DE-SOFTWARE';",
    "<p>-DISEÑADOR-WEB-</p>",
    "print('AUTODIDACTA')",
    "{'EMPRENDEDOR'}"
]
let charValidate="printcoutsg()'<>/;{}"
let cont = 0
let long = 0

function haveChar(str){
    for(i=0; i<str.length; i++){
       if (charValidate.indexOf(str.charAt(i),0)!=-1){
          return 1;
       }
    }
    return 0;
 }


function deleteWords(a){
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
                dWords.innerHTML += `<p class="letter-logo"><strong>&nbsp</strong></p>`
            }else{
                if(haveChar(word[cont])) {
                    dWords.innerHTML += `<p class="letter-logo code">${word[cont]}</p>`
                }else{
                    dWords.innerHTML += `<p class="letter-logo"><strong>${word[cont]}</strong></p>`
                }
            }
            cont += 1  
        }
          
    }, 150)
}
window.onload = () => {
    writeWords()
}
    
