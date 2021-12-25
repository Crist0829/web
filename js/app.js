if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
  }

let words = [ //Array con las palabras que estarán animadas. 
    "cout<<'DESARROLLADOR-DE-SOFTWARE';",
    "<p>-DESARROLLADOR-WEB-FULLSTACK</p>",
    "print('AUTODIDACTA')",
    "{'EMPRENDEDOR'}"]
let charValidate="printcousg()'<>/;{}"//letras que serán de otro color

let dWords = document.getElementById("logo-words")
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

function preloaderAnimation(){
    let wordcontainer = document.getElementById("preloader-c")
    let word = "CARGANDO"
    let arrayWord = word.split("")
    let cont = 0
    let write = setInterval(() => {
        if(cont === arrayWord.length){
            cont = 0
            wordcontainer.innerHTML = ""
        }else{
            wordcontainer.innerHTML += arrayWord[cont]
            cont ++
        }
    }, 150)
}

preloaderAnimation()

function showContent(){
    /*El main y el footer están ocultos (dispaly:none) y cuando el documento está cargado se muestran
    y se oculta el preloader*/
    let main = document.getElementById("main")
    let body = document.getElementById("body")
    let preloader = document.getElementById("preloader")
    let footer = document.getElementById("footer")
    let boton = document.getElementById("icon-responsive")
    let menu = document.getElementById("menuNav")
    let iconMenu = document.getElementById("menu-icon-bars")
    let iconMenuClose = document.getElementById("menu-icon-close")
    let projects = document.getElementById("projects")
    let aboutMe = document.getElementById("about-me")
    let aboutMeBoton = document.getElementById("about-me-boton")
    let projectsBoton = document.getElementById("projects-boton")
    let projectsContent = document.getElementById("projects-content")
    let contactBoton = document.getElementById("contact-boton")
    let contact = document.getElementById("contact")
    let cont = 1
    preloader.style.display = "none" //Se oculta el preloader
    body.style.display = "block"
    body.style.backgroundColor = "rgb(80, 75, 75)"
    aboutMe.style.display = "flex"
    contact.style.display = "none"
    projects.style.display = "none"
    
    boton.addEventListener("click", ()=>{ //Muestra el menu de navegacion cuando la pantalla es pequeña (menor a 768px de ancho)
        if(cont){
            menu.style.display = "flex"
            iconMenu.style.display = "none";
            iconMenuClose.style.display = "block";
            cont = 0
        }else{
            menu.style.display = "none"
            iconMenu.style.display = "block";
            iconMenuClose.style.display = "none";
            cont ++
        }
    })

     projectsBoton.addEventListener("click", ()=>{
        aboutMe.style.display = "none"
        contact.style.display = "none"
        projects.style.display = "flex"

        fetch("json/projects.json")
        .then(data=>data.json())
        .then(data=>{

            let auxContent = ""

            for(i in data.projects){
                auxContent += 
                `<div class="card m-1">                
                    <div class="card-info">
                    <p class="card-title"><a href="${data.projects[i].link}" target="_blank">${data.projects[i].nombre}</a></p>
                        
                        <div class="card-body">
                            <div class="card-img">
                                <img src="assets/img/projects/${data.projects[i].img}" alt="100" width="150">
                            </div>
                            <div class="card-text">
                                <P><span class="value c-primary"><strong>${data.projects[i].descriptionShort}</strong></span></P>
                                <P><span class="value"><strong>${data.projects[i].dev}</strong></span></P>
                            </div>    
                            <div class="card-description">
                                <p><strong>${data.projects[i].descriptionLong}.</strong></p>
                            </div>
                        </div>
                    </div>
                </div>`
            }

            projectsContent.innerHTML = auxContent
        })
        .catch(e => {
            projectsContent.innerHTML = `${e}`
        })
        
    })

    aboutMeBoton.addEventListener("click", ()=>{
        aboutMe.style.display = "flex"
        contact.style.display = "none"
        projects.style.display = "none"
    })

    contactBoton.addEventListener("click", ()=>{
        aboutMe.style.display = "none"
        contact.style.display = "flex"
        projects.style.display = "none"
    })

    

        //Si la pantalla tiene un ancho mayor a 768 px entonces el "main" es una grilla si no es 
    if (window.matchMedia("(min-width: 768px)").matches) {
        main.style.display = "grid"
        main.style.gridTemplateColumns = "20rem auto"
        main.style.gridTemplateRows = "auto auto"
        main.style.gap = "1rem"
        main.style.margin = "1rem"
        
      } else {
        main.style.display = "flex"
        main.style.flexDirection = "column"
        main.style.margin = "0.5rem"
        main.style.padding = "0.5rem"
      }

      footer.style.display = "flex" 
}


window.onload = () => {
    showContent()
    writeWords()
}

window.onresize = () => {
    showContent()
}
    
