// OMDB apikey=60ccc490
console.log("I work");
// DOM variables
const movieDisplayDiv = document.querySelector("#movieDisplay");

// NEW DOM variables
const searchBtn = document.querySelector("#searchBtn");
const optionsCheckbox = document.querySelectorAll(".form-checkbox");
const movieDiv = document.querySelector("#previousSearches");


const movieTitleDOM = document.querySelector("#movie-name");
//commented these out because we will instead use the array on line 7

// const inputPoster = document.querySelector("#poster");
// const inputActors = document.querySelector("#actors");
// const inputPlot = document.querySelector("#plot");
// const inputRating = document.querySelector("#rating");
// const inputYear = document.querySelector("#year");
// const inputRuntime = document.querySelector("#run-time");
// const inputDirector = document.querySelector("#director");
// const inputWriters = document.querySelector("#writers");
// const inputAwards = document.querySelector("#awards");

// other variables

//NEW
let optionsArr = [];
let movieTitleChosen;


// function to store movie name and asociated  in local storage & display it in DOM. THIS FUNCTUON WILL BE CALLED WHEN A NEW MOVIE IS SUBMITTED
const storeMovieName = (movieToStore, domOptions, poster) => {
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
    movieDiv.innerHTML = "";

    // THIS FUNCTIN NEEDS TO BE WRITEN AND IF WE WANT TO HAVE A DEFAULT MOVIE IT NEEDS TO ALSO BE CALLED IN THE GLOBAL SPACE
    displayPreviousMovies();
}
// NEW This will be the displayPreviousMovies function
let displayPreviousMovies = () => {
    console.log('placeholder for a function');
}
// var movieNameTest = "Star Wars"
var movieNameTestArray = [];
let movieFetchFxn = (movieName) => {
    fetch("http://www.omdbapi.com/?apikey=60ccc490&t=" + movieName)
        .then(res => res.json())
        .then(data => {
            movieNameTestArray = data;
        })
        
        .then(() => { 
            console.log(movieNameTestArray);
            let movieTitle = movieNameTestArray.Title;
            //NEW
            // variable for poster url to be added to src="" in movieDisplayFxn
            let moviePosterUrl = movieNameTestArray.Poster;
            //for loop will establish an array of booleans stating whether user wants each of the 8 optional peices of info or not in same order as written in html (which we might want to switch around)
            for(let i =0; i < optionsCheckbox.length; i++) {
                if(optionsCheckbox[i].checked) {
                    optionsArr.push(true);
                } else {
                    optionsArr.push(false);
                }
            }
            storeMovieName(movieTitle, optionsArr, moviePosterUrl);
            movieDisplayFxn(movieTitle, optionsArr, moviePosterUrl);
        })
}
   // need to add optionsArr to movie title in parameter and then do something with this array
    const movieDisplayFxn =  (movieTitle) =>
{
    movieDisplayDiv.textContent = movieTitle
    console.log(optionsArr);
}    
   
 // event listener for searchBtn
 searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    movieTitleChosen = movieTitleDOM.value;
    movieTitleDOM.value = '';
    movieFetchFxn(movieTitleChosen);
  });