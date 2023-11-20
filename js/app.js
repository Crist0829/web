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

const iconsClassToprojects = {
    "LARAVEL" : "fab fa-laravel c-laravel",
    "PHP" : "fab fa-php c-php",
    "HTML" : "fab fa-html5 c-html",
    "CSS" : "fab fab fa-css3-alt c-css",
    "JAVA" : "fab fa-java c-java",
    "KOTLIN" : "fas fa-file-code c-java",
    "ANDROID" : "fab fa-android c-android",
    "JAVASCRIPT" : "fab fa-js-square c-js",
    "C++" : "fas fa-file-code c-java",
    "PYTHON" : "fab fa-python c-python",
    "REACT" : "fab fa-react c-react",
}

//-------Lo muestra las diferentes páginas en la sección de content---------------//
let projects = document.getElementById("projects")
let aboutMe = document.getElementById("about-me")
let aboutMeBoton = document.getElementById("about-me-boton")
let projectsBoton = document.getElementById("projects-boton")
let projectsContentButtons = document.getElementById("projects-content-buttons")
let projectsContent = document.getElementById("projects-content")
let contactBoton = document.getElementById("contact-boton")
let contact = document.getElementById("contact")
let arrayProjects = [] // Proyectos a mostrar

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


// Muestra los iconos de las tecnologías de los proyectos
function getIcons(listItems){


    let icons = listItems.split(',')
    console.log(icons)
    let iconElemnts = ""
    let auxIconElemnts = ""

    icons.forEach(icon => {
        let classIcon = iconsClassToprojects[icon]
        auxIconElemnts += `<i class="${classIcon}"></i>`
    });

    iconElemnts = `<div class="icons-projects-container">${auxIconElemnts}</div>`
    return iconElemnts


}


// Carga las cards de los proyectos
function getCardProjects(projects){
    let content = ""
    for(i in projects){
        content += 
        `<div class="card-projects m-1">                
            <div class="card-projects-info">
            <p class="card-projects-title">${projects[i].nombre}</p>
                <div class="card-projects-body">
                    <div class="card-projects-img">
                        <img src="assets/img/projects/${projects[i].img}" alt="100" width="400">
                    </div>
                    <div class="card-projects-text">
                        <P><span class="value c-primary"><strong>${projects[i].descriptionShort}</strong></span></P>
                    </div>
                    ${getIcons(projects[i].dev)}    
                    <div class="card-projects-description">
                        <p><strong>${projects[i].descriptionLong}.</strong></p>
                        <div class="visit-button-container">
                            <a href="${projects[i].link}" target="_blank">Visitar <i class="fas fa-eye"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    return content
}

function getButtonsProjectsContent(nButtons){
    let buttons = ""
    for(let i = 0; i < nButtons; i++){
        buttons += `<p class="projects-content-button" onClick="getArrayProjects(${i})">${i+1}</p>`
    }
    return buttons
}

function getArrayProjects(i){
    let projectsToShow = arrayProjects.slice(i*3, i*3+3)  
    let auxContent = getCardProjects(projectsToShow)
    projectsContent.innerHTML = auxContent
}


function showContent(){
    

    //--------------------Sidebar--------------------------------//
    let buttonSide = document.getElementById('icon-side')
    let textSide = document.getElementById("side-title-text")
    let skills = document.getElementById("skills")
    let qualities = document.getElementById("qualities")
    let contSide = 0
    let rotation = 0

    //botones del side bar para mostrar las habilidades y cualidades
    buttonSide.addEventListener("click", ()  => {
        let botonSideRight = document.getElementById("side-icon-right")
        rotation += 180
        botonSideRight.style.transform = `rotate(${rotation}deg)`
            if(contSide === 0){
                textSide.innerHTML = "CUALIDADES"
                skills.style.opacity = "0"
                window.setTimeout(() => {
                    skills.style.display = "none"
                    qualities.style.display = "flex"
                }, 500)
                qualities.style.opacity = "1"
                contSide = 1
            }else{
                textSide.innerHTML = "HABILIDADES"
                qualities.style.opacity = "0"
                window.setTimeout(() => {
                    skills.style.display = "flex"
                    qualities.style.display = "none"
                }, 500)
                skills.style.opacity = "1";
                contSide = 0
            }
            
    })
    //-----------------------------------------------------------//


    let boton = document.getElementById("icon-responsive")
    let menu = document.getElementById("menuNav")
    let botonMenu = document.getElementById("menu-icon-bars")
    let botonMenuClose = document.getElementById("menu-icon-close")
    let contMenu = 1
    

    boton.addEventListener("click", ()=>{ //Muestra el menu de navegacion cuando la pantalla es pequeña (menor a 768px de ancho)

        if(menu.style.maxHeight){
            menu.style.maxHeight = null
        }else{
            menu.style.maxHeight = menu.scrollHeight + "px"
        }

    })

    


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
            let nProjectsContentButtons = 0
            let projectTotake = data.projects
            if(data.projects.length / 3 > 1){
                nProjectsContentButtons = parseInt((data.projects.length / 3) + 1)
                projectsContentButtons.innerHTML = getButtonsProjectsContent(nProjectsContentButtons)
                projectTotake = data.projects.slice(0, 3)
            }
            arrayProjects = data.projects
            auxContent = getCardProjects(projectTotake)
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




showContent()
writeWords()
