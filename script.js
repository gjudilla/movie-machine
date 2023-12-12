// OMDB apikey=60ccc490
console.log("I work");
// DOM variables
const movieDisplayDiv = document.querySelector("#movieDisplay");
// New DOM element
const previousMovies = document.querySelector("previousSearches");
const movieTitleDOM = document.querySelector("#movie-title");
const inputPoster = document.querySelector("#poster");
const inputActors = document.querySelector("#actors");
const inputPlot = document.querySelector("#plot");
const inputRating = document.querySelector("#rating");
const inputYear = document.querySelector("#year");
const inputRuntime = document.querySelector("#run-time");
const inputDirector = document.querySelector("#director");
const inputWriters = document.querySelector("#writers");
const inputAwards = document.querySelector("#awards");
const searchMovie = document.querySelector("#search")
const moviePosterDOMEl = document.querySelector("#moviePoster")
// let movieTitle;
// let moviePoster;
// let movieSearchParams = [];
let movieNameTestArray = [];
// other variables


//New Function
// function to store movie name, and associated info, in local storage & call new fxn to display last 10 searched movies in DOM. The display fxn to be called each time a new movie is searched for.
const storeMovieName = (movieToStore, poster, domOptions) => {
    let storageObj = {
        movieNameStored: `${movieToStore}`,
        options: `${domOptions}`,
        posterUrl: `${poster}`
    }
    // existingmovieArr will get an array of onjects from local storage, or if empty will give empty array. We can add another movie as only member of the array if we prefer to have a default movie on loading)
    const existingMovieArr = JSON.parse(localStorage.getItem('movieArr')) || [];
    // check to see if movie already exists in localStorage and if so do not store again.
    for(let i = 0; i < existingMovieArr.length; i++) {
        if(movieToStore === existingMovieArr[i].movieNameStored) {
            return;
        }
    }
    // if current movie is a new movie add it as an object to current array and set that array as the new localStorage array
    const newMovieArr = [...existingMovieArr, storageObj];
    localStorage.setItem('movieArr', JSON.stringify(newMovieArr));
    // clear movieDiv of current contents to avoid duplicates, then call displayPreviousMovies() to fill this DIV with all movies in localStorage (most recently stored movie will be last).
    // THIS DIV NO LONGER EXISTS
    // movieDiv.innerHTML = "";

    displayPreviousMovies();
}
// NEW FXN This will be the displayPreviousMovies function
let displayPreviousMovies = () => {
    console.log('placeholder for a function');
}

function  searchMovies (movieInput) {

// let moviePoster;

fetch("http://www.omdbapi.com/?apikey=60ccc490&t=" + movieInput)
    .then(res => res.json())
    .then(data => {
        movieNameTestArray = data;
    })

    .then(() => {
        console.log(movieNameTestArray);
        let movieTitle = movieNameTestArray.Title;
        let moviePoster = movieNameTestArray.Poster;
        let movieSearchParams = [];
        if (inputActors.checked) {
            movieSearchParams.push(".Actors");
        }
        if (inputPlot.checked) {
            movieSearchParams.push(".Plot");
        }
        if (inputRating.checked) {
            movieSearchParams.push(".Rated");
        }
        if (inputYear.checked) {
            movieSearchParams.push(".Year");
        }
        if (inputRuntime.checked) {
            movieSearchParams.push(".Runtime");
        }
        if (inputDirector.checked) {
            movieSearchParams.push(".Director");
        }
        if (inputWriters.checked) {
            movieSearchParams.push(".Writer");
        }
        if (inputAwards.checked) {
            movieSearchParams.push(".Awards");
        }
        console.log(movieSearchParams);
        storeMovieName(movieTitle, moviePoster, movieSearchParams);
        movieDisplayFxn(movieTitle, moviePoster, movieSearchParams);

        
    })

   
    




}

const movieDisplayFxn = (movieTitle, moviePoster, movieSearchParams) => {
    movieDisplayDiv.textContent = movieTitle
    moviePosterDOMEl.setAttribute("src", moviePoster)
    console.log(movieSearchParams);
}

// event listener for searchBtn
searchMovie.addEventListener("click", function (event) {
    event.preventDefault();
    let movieTitleChosen = movieTitleDOM.value;
    movieTitleDOM.value = '';
    searchMovies(movieTitleChosen);
  }); 

