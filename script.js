// OMDB apikey=60ccc490
console.log("I work");
// DOM variables
const movieDisplayDiv = document.querySelector("#movieDisplay");
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


function  searchMovies (movieInput) {

// let moviePoster;

fetch("http://www.omdbapi.com/?apikey=60ccc490&plot=full&t=" + movieInput)
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
            movieSearchParams.push("Actors");
        }
        if (inputPlot.checked) {
            movieSearchParams.push("Plot");
        }
        if (inputRating.checked) {
            movieSearchParams.push("Rated");
        }
        if (inputYear.checked) {
            movieSearchParams.push("Year");
        }
        if (inputRuntime.checked) {
            movieSearchParams.push("Runtime");
        }
        if (inputDirector.checked) {
            movieSearchParams.push("Director");
        }
        if (inputWriters.checked) {
            movieSearchParams.push("Writer");
        }
        if (inputAwards.checked) {
            movieSearchParams.push("Awards");
        }
        console.log(movieSearchParams);


        //for loop to iterate through the move name test array using the search parameter array as keys.
        //then it sends the info to the DOM.
        for (let i = 0; i < movieSearchParams.length; i++) {
            console.log(movieNameTestArray[movieSearchParams[i]]);
            document.getElementById(`${movieSearchParams[i]}`).textContent = movieNameTestArray[movieSearchParams[i]]

        }
        movieDisplayFxn(movieTitle, moviePoster, movieSearchParams)

        
    })
   
}

const movieDisplayFxn = (movieTitle, moviePoster, movieSearchParams) => {
    movieDisplayDiv.textContent = movieTitle
    moviePosterDOMEl.setAttribute("src", moviePoster)
    console.log(movieSearchParams);
}

searchMovie.addEventListener("click",
 // event listener for searchBtn
 function (event) {
    event.preventDefault();
    let movieTitleChosen = movieTitleDOM.value;
    movieTitleDOM.value = '';
    searchMovies(movieTitleChosen);
  }); 

