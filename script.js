// OMDB apikey=60ccc490
console.log("I work");
// DOM variables
const movieDisplayDiv = document.querySelector("#movieDisplay");
// New DOM element
const previousMovies = document.querySelector("#previousSearches");
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


//2 New Functions lines 27 to ~92
// #1
// function to get all movie names previously selected by user and then display the most recent 10 in the DOM
let displayPreviousMovies = () => {
    // When 1st called on loading website there will be no movies in local storage so no change will be made to DOM
    if(!localStorage.movieArr) {
        return;
    } 
    // if movieArr exists in localStorage 1st add back the h2 for "Previous Searches", then parse the localStorage.movieArr into an array of objects

    const prevMovieH2 = document.createElement('h2');
    //Add attribute class="space-y-s" to containing div, then add text content, then append
    prevMovieH2.setAttribute('class', 'font-semibold text-3xl font-bold mb-4');
    prevMovieH2.textContent = 'Previous Searches';
    previousMovies.append(prevMovieH2);

// now parse
    arrToPost = JSON.parse(localStorage.getItem('movieArr'));   
    //if length is 10 or more only post the most recent 10 movies saved by using for loop starting at last movie saved
    if (arrToPost.length > 9) {
        for(let i = arrToPost.length - 1; i > arrToPost.length - 11; i--) {
            const newMovieDiv = document.createElement('div');
            //Add attribute class="space-y-s"
            newMovieDiv.setAttribute('class', 'space-y-s');
            //Add actual button using inner HTML
            newMovieDiv.innerHTML = `<button class="w-full text-left px-4 py-2 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-700">${arrToPost[i].movieNameStored}</button>`;
            previousMovies.append(newMovieDiv);
        }
    } else {
        // if there are between 1 and 9 movies in localStorage all movies will be displayed by using for loop starting at last movie saved
        for(let j = arrToPost.length - 1; j > -1; j--) {
            const newMovieDiv = document.createElement('div');
            //Add attribute class="space-y-s" to containing div
            newMovieDiv.setAttribute('class', 'space-y-s');
            //Add actual button and its classes/content using inner HTML then append to DOM
            newMovieDiv.innerHTML = `<button class="w-full text-left px-4 py-2 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-700">${arrToPost[j].movieNameStored}</button>`;
            previousMovies.append(newMovieDiv);
        }
    }
}
// #2
// function to store movie name, and associated info, in local storage & call new fxn to display last 10 searched movies in DOM. The display fxn to be called each time a new movie is searched for.
const storeMovieName = (movieToStore, poster, domOptions) => {
    let storageObj = {
        movieNameStored: `${movieToStore}`,
        options: `${domOptions}`,
        posterUrl: `${poster}`
    }
    console.log(storageObj);
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
    // clear previousMovies of current contents to avoid duplicates, then call displayPreviousMovies() to fill this DIV with all movies in localStorage (most recently stored movie will be last).

    previousMovies.innerHTML = "";

    // Call fxn to display previous movies in DOM
    displayPreviousMovies();
}

function  searchMovies (movieInput) {

    document.querySelectorAll("li").forEach(function(liElement) {
        liElement.textContent = "";
    });

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

        storeMovieName(movieTitle, moviePoster, movieSearchParams);
        movieDisplayFxn(movieTitle, moviePoster, movieSearchParams);

        //for loop to iterate through the move name test array using the search parameter array as keys.
        //then it sends the info to the DOM.
        for (let i = 0; i < movieSearchParams.length; i++) {
            console.log(movieNameTestArray[movieSearchParams[i]]);
            document.getElementById(`${movieSearchParams[i]}`).innerHTML = `<span id="${movieSearchParams[i]}span">${movieSearchParams[i]}: </span>${movieNameTestArray[movieSearchParams[i]]}`
            console.log(`${movieSearchParams[i]}span`)
     
        }
        movieDisplayFxn(movieTitle, moviePoster, movieSearchParams)
        
        const url = 'https://streaming-availability.p.rapidapi.com/search/title?title=' + movieTitle + '&country=us&show_type=all&output_language=en'
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd48595d92dmshbcd5f97df8dd50ep1c9f92jsnf437b45ada40',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }};
        fetch(url, options)
        .then(res => res.json())
        .then(data => {
            movieStreamingArray = data;
        })
    
        .then(() => {
            console.log(movieStreamingArray);
        }) 
    })
  
}

const movieDisplayFxn = (movieTitle, moviePoster, movieSearchParams) => {
    movieDisplayDiv.textContent = movieTitle
    moviePosterDOMEl.setAttribute("src", moviePoster)
    console.log(movieSearchParams);
}


searchMovie.addEventListener("click", function (event) {

    event.preventDefault();
    let movieTitleChosen = movieTitleDOM.value;
    movieTitleDOM.value = '';
    searchMovies(movieTitleChosen);
  }); 

