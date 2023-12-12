// OMDB apikey=60ccc490
console.log("I work");
// DOM variables
const movieDisplayDiv = document.querySelector("#movieDisplay");
const movieName = document.querySelector("#movie-name");
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

// other variables
const actors = ".Actors";
const plot = ".Plot";
const rating = ".Rating";
const year = ".Year";
const runTime = ".Runtime";
const director = ".Director"
const writers = ".Writers";
const awards = ".Awards";


// function to store movie name and asociated  in local storage & display it in DOM. THIS FUNCTUON WILL BE CALLED WHEN A NEW MOVIE IS SUBMITTED
const storeMovieName = (movieToStore) => {
    let storageObj = {
        movieName: `${movieToStore}`
    }
    // existingmovieArr will get an array of onjects from local storage, or if empty will add Django as only member of the array (if we prefer not to have a default movie on loading we can take this out)
    const existingMovieArr = JSON.parse(localStorage.getItem('movieArr')) || [{ "movieName": "Django" }];
    // check to see if movie already exists in localStorage and if so do not store again.
    for (let i = 0; i < existingMovieArr.length; i++) {
        if (movieToStore === existingMovieArr[i].movieName) {
            return;
        }
    }
    // if current movie is a new movie add it as an object to current array and set that array as the new localStorage array
    const newMovieArr = [...existingMovieArr, storageObj];
    localStorage.setItem('movieArr', JSON.stringify(newMovieArr));
    // clear movieDiv of current contents to avoid duplicates, then call displayPreviousMovies() to fill this DIV with all movies in localStorage (most recently stored movie will be last).
    movieDiv.innerHTML = "";

    // THIS FUNCTIN NEEDS TO BE WRITEN AND IF WE WANT TO HAVE A DEFAULT MOVIE IT NEEDS TO ALSO BE CALLED IN THE GLOBAL SPACE
    displayPreviousMovies();
}

function  searchMovies (movieTitle) {
var movieNameTest = "Star Wars"
var movieSearchParams = [];
var movieNameTestArray = [];
fetch("http://www.omdbapi.com/?apikey=60ccc490&t=" + movieNameTest)
    .then(res => res.json())
    .then(data => {
        movieNameTestArray = data;
    })

    .then(() => {
        console.log(movieNameTestArray);
        let movieTitle = movieNameTestArray.Title;
        movieDisplayFxn(movieTitle);
    })

const movieDisplayFxn = (movieTitle) => {
    movieDisplayDiv.textContent = movieTitle
}


if (inputActors.checked) {
    movieSearchParams += actors;
}
if (inputPlot.checked) {
    movieSearchParams += plot;
}
if (inputRating.checked) {
    movieSearchParams += rating;
}
if (inputYear.checked) {
    movieSearchParams += year;
}
if (inputRuntime.checked) {
    movieSearchParams += runTime;
}
if (inputDirector.checked) {
    movieSearchParams += director;
}
if (inputWriters.checked) {
    movieSearchParams += writers;
}
if (inputAwards.checked) {
    movieSearchParams += awards;
}
console.log(movieSearchParams);

console.log(inputPlot);

}

searchMovie.addEventListener("click", searchMovies)