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


function showContent(){
    

    //--------------------Sidebar--------------------------------//
    let botonSideRight = document.getElementById("side-icon-right")
    let botonSideLeft = document.getElementById("side-icon-left")
    let textSide = document.getElementById("side-title-text")
    let skills = document.getElementById("skills")
    let qualities = document.getElementById("qualities")
    //botones del side bar para mostrar las habilidades y cualidades
    botonSideRight.addEventListener("click", ()  => {
        if(contSide){
            textSide.innerHTML = "CUALIDADES"
            skills.style.opacity = "0"
            window.setTimeout(() => {
                skills.style.display = "none"
                qualities.style.display = "flex"
            }, 600)
            qualities.style.opacity = "1"
            botonSideLeft.style.display = "block";
            botonSideRight.style.display = "none";
            contSide = 0
        }

        

    })

    botonSideLeft.addEventListener("click", () => {
        if(contSide === 0){
            botonSideRight.style.display = "block";
            textSide.innerHTML = "HABILIDADES"
            qualities.style.opacity = "0"
            window.setTimeout(() => {
                skills.style.display = "flex"
                qualities.style.display = "none"
            }, 600)
            skills.style.opacity = "1";
            botonSideLeft.style.display = "none";
            contSide ++
        }
    })
    //-----------------------------------------------------------//


    let boton = document.getElementById("icon-responsive")
    let menu = document.getElementById("menuNav")
    let botonMenu = document.getElementById("menu-icon-bars")
    let botonMenuClose = document.getElementById("menu-icon-close")
    let contMenu = 1
    let contSide = 1
    

    boton.addEventListener("click", ()=>{ //Muestra el menu de navegacion cuando la pantalla es pequeña (menor a 768px de ancho)

        if(menu.style.maxHeight){
            menu.style.maxHeight = null
        }else{
            menu.style.maxHeight = menu.scrollHeight + "px"
        }

    })

    
//-------Lo muestra las diferentes páginas en la sección de content---------------//
    let projects = document.getElementById("projects")
    let aboutMe = document.getElementById("about-me")
    let aboutMeBoton = document.getElementById("about-me-boton")
    let projectsBoton = document.getElementById("projects-boton")
    let projectsContent = document.getElementById("projects-content")
    let contactBoton = document.getElementById("contact-boton")
    let contact = document.getElementById("contact")

    aboutMe.style.display = "flex" //Es el contenido que al cargar la página es visible
    contact.style.display = "none"
    projects.style.display = "none"

    //Muestra los projectos (Los carga desde el archivo json/projects.json)
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
                `<div class="card-projects m-1">                
                    <div class="card-projects-info">
                    <p class="card-projects-title"><a href="${data.projects[i].link}" target="_blank">${data.projects[i].nombre}</a></p>
                        
                        <div class="card-projects-body">
                            <div class="card-projects-img">
                                <img src="assets/img/projects/${data.projects[i].img}" alt="100" width="150">
                            </div>
                            <div class="card-projects-text">
                                <P><span class="value c-primary"><strong>${data.projects[i].descriptionShort}</strong></span></P>
                                <P><span class="value"><strong>${data.projects[i].dev}</strong></span></P>
                            </div>    
                            <div class="card-projects-description">
                                <p><strong>${data.projects[i].descriptionLong}.</strong></p>
                            </div>
                        </div>
                    </div>
                </div>`
            }

            projectsContent.innerHTML = auxContent
        })
        .catch(e => {
            projectsContent.innerHTML = `Ocurrió un error al cargar los proyectos, intenta recargar la página.`
        })

        projectsContent.innerHTML = `<div class="loader"></div>`
        
    })

    //Muestra "sobre mí"
    aboutMeBoton.addEventListener("click", ()=>{
        aboutMe.style.display = "flex"
        contact.style.display = "none"
        projects.style.display = "none"
    })

    //Muestra el formulario de contacto
    contactBoton.addEventListener("click", ()=>{
        aboutMe.style.display = "none"
        contact.style.display = "flex"
        projects.style.display = "none"
    })
      
}

window.onload = () => {
    showContent()
    writeWords()
}

window.onresize = () => {
    showContent()
}
    
