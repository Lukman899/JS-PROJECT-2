

// API = "http://www.omdbapi.com/?apikey=676f2cc7&t=avenger" // for particular movie
// API = "http://www.omdbapi.com/?apikey=676f2cc7&s=avenger" // for array of movies


const movieForm = document.querySelector("#movieForm");
const Movieinput = document.querySelector("#movieinput");
const movieHub = document.querySelector("#movieHub");

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = Movieinput.value.trim()

    if(!query){
        return
    }

    console.log(query);
    searchMovie(query)
})

async function searchMovie(movieName){

    movieHub.innerHTML = `<div class="loader"></div>`; 

    let response = await fetch(`https://www.omdbapi.com/?apikey=676f2cc7&s=${movieName}`)
    let data = await response.json()
    console.log(data);


    if(data.Response === "True"){
        displayMovies(data.Search)
    }
    else{
        console.log(data.Error);
        movieHub.innerHTML = `<p>${data.Error}</p>`
    }


    
}

function displayMovies(data){


    movieHub.innerHTML = ""; 

    data.forEach((movie) => {
         const div = document.createElement("div")
         div.dataset.imdbID = movie.imdbID;
         div.setAttribute("class", "movie-card")
    div.innerHTML = `
            
            <div>
                <img src=${movie.Poster} alt="">
            </div>
            
            <div>
                <p>${movie.Title}</p>
                <p>${movie.Year}</p>
            </div>

            `
    movieHub.append(div)
    })
}

movieHub.addEventListener("click", (e) => {
    e.stopPropagation();
    const moviecard = e.target.closest(".movie-card")
    const imdbID = moviecard.dataset.imdbID
    location.href = `movieDetails.html?id=${imdbID}`;
})