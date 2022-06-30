

//---------------------películas con mejor ranking-------------------
const moviesList = document.getElementById('movieList');
let topRanking = []

axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=ad07ae5ca461e095be2eece7283ea5c2&language=en-US&page=1')
.then( (response)=>{
   let movies = response.data.results
 
 movies.forEach(element => {
   topRanking.push(element) 
 });


insert(topRanking, moviesList)

})
.catch( (error)=> console.log(error));

//---------------Se crea array con los géneros disponibles---------------------

let moviesGenres = [] //almacena tipos de géneros
axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=ad07ae5ca461e095be2eece7283ea5c2&language=en-US')
.then(response=> response.data.genres.forEach(element => moviesGenres.push(element.id)))
.catch( (error)=> console.log(error));

//let imagenes = {}
let action=[]
let adventure = []
let animation = []
let comedy = []
let crime = []
let documentary = []
let genres = [topRanking, action, adventure, animation, comedy, crime, documentary]

let actionList = document.getElementById('actionList')
let adventureList = document.getElementById('adventureList')
let animationList = document.getElementById('animationList')
let comedyList = document.getElementById('comedyList')
let crimeList = document.getElementById('crimeList')
let documentaryList = document.getElementById('documentaryList')

axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ad07ae5ca461e095be2eece7283ea5c2&language=en-US&page=1`)
.then(response =>{
  
  let movies = response.data.results
  //console.log(response)
  movies.forEach(element => {
    
    for(let j=0; j<element.genre_ids.length; j++){
      if(element.genre_ids[j]== 28) action.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 12) adventure.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})    
      else if(element.genre_ids[j]== 16) animation.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 35) comedy.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 80) crime.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 99) documentary.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
    }   
  });
})
.catch( (error)=> console.log(error));


axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ad07ae5ca461e095be2eece7283ea5c2&language=en-US&page=2`)
.then(response =>{
  
  let movies = response.data.results
  //console.log(response)
  movies.forEach(element => {
    
     for(let j=0; j<element.genre_ids.length; j++){
      if(element.genre_ids[j]== 28) action.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 12) adventure.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})    
      else if(element.genre_ids[j]== 16) animation.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 35) comedy.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 80) crime.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
      else if(element.genre_ids[j]== 99) documentary.push({'title': element.title, 'overview': element.overview, 'poster_path' : element.poster_path, 'id': element.id})
    }   

  
  });
  

  insert(action, actionList)
  insert(adventure, adventureList)
  insert(animation, animationList)
  insert(comedy, comedyList)
  insert(crime, crimeList)
})
.catch( (error)=> console.log(error));
//console.log(action)



function insert(arr, idDiv) {
  let fragment = document.createDocumentFragment()
  
  for (let movie of arr) {
    let itemList = document.createElement('div')
    itemList.classList.add('col-md-2', 'col-3', 'm-2', 'd-flex');
    itemList.innerHTML = `<a href="info.html?${movie.id}" ><img id="${movie.id}"src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="d-block w-100 rounded-2" alt=""></a>`
    fragment.appendChild(itemList)
    //imagenes[movie.id] = `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  }
  idDiv.appendChild(fragment)
}
function myFunction() {
  let url = window.location.href
  let id = url.split('?')[1]
  let datos = []
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ad07ae5ca461e095be2eece7283ea5c2&language=en-US
  `)
  .then(response =>{
  
    let movie = response.data
   
    datos.push({'title': movie.title, 'overview': movie.overview, 'poster': movie.poster_path})

    //console.log(response)
    document.getElementById('imagenPrint').innerHTML = `
    <h1 class="color text-center my-4">${datos[0].title}</h1>
    <div class="text-center my-3 "><img class="rounded-3" src="https://image.tmdb.org/t/p/w300${datos[0].poster}" alt=""></div>
    <div class="mb-4"><p class="color container">${datos[0].overview}</p></div>`
    })
    .catch( (error)=> console.log(error));
  let actors = []
  axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=ad07ae5ca461e095be2eece7283ea5c2&language=en-US`)
  .then(response =>{
    let actor = response.data.cast
    actor.forEach( person => {
          actors.push(person.original_name)
          });
          let fragment = document.createDocumentFragment()

          for (let actorMovie of actors){
            let item = document.createElement('a')
             // item.classList.add("col-md-2","col-3", "m-2", "d-flex");
              item.innerHTML =`<div class="color">${actorMovie}</div>`
             fragment.appendChild(item)
          }
          cast.appendChild(fragment)
              console.log(actors)

  })
  .catch( (error)=> console.log(error));



}



const inputNombre = document.getElementById('inputNombre')
const formBusqueda = document.getElementById('form-busqueda')
const resultadoBusqueda = document.getElementById('resultadoBusqueda')
let nombreUser='';
formBusqueda.addEventListener('submit', (e)=> {
  e.preventDefault();
 nombreUser = inputNombre.value;

  filtrarPeliculas();
  formBusqueda.reset();
})
function filtrarPeliculas(){
  limpiarPantalla();
  resultado =[];
  for(let i=0; i<genres.length;i++)
    
    for(j=0;j<genres[i].length;j++){
      let nombreLower = genres[i][j].title.toLowerCase();
      let nombreUserLower= nombreUser.toLowerCase();
      if(nombreUserLower === nombreLower){
        resultado.push(genres[i][j].title)        
        break;
      }
    
    }
  if(resultado.length){
    mostrarPantalla(`¡La película ${resultado[0]} está disponible!`)
  }
  else{
    mostrarPantalla(`Lo sentimos, película no disponible`)
  }
}
function mostrarPantalla(mensaje){
   limpiarPantalla();
    const mensajeDeBusqueda = document.createElement('div')
    mensajeDeBusqueda.innerHTML= `${mensaje}`
    resultadoBusqueda.appendChild(mensajeDeBusqueda);
}

function limpiarPantalla(){
  while(resultadoBusqueda.firstChild){
      resultadoBusqueda.firstChild.remove();
  }
}
