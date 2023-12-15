// OMDB apikey=60ccc490
console.log("I work");
// DOM variables
const movieDisplayDiv = document.querySelector("#movieDisplay");
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
const searchMovie = document.querySelector("#search");
const moviePosterDOMEl = document.querySelector("#moviePoster");
const streamIconDOMEl = document.querySelector("a");
const streamIconCpnDOMEl = document.querySelector("#streamIcon");
//other variables
let movieNameTestArray = [];
let optionsToSend;

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
            newMovieDiv.innerHTML = `<button class="w-full text-left px-4 py-2 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-700" data-options="${arrToPost[i].options}">${arrToPost[i].movieNameStored}</button>`;
            previousMovies.append(newMovieDiv);
        }
    } else {
        // if there are between 1 and 9 movies in localStorage all movies will be displayed by using for loop starting at last movie saved
        for(let j = arrToPost.length - 1; j > -1; j--) {
            const newMovieDiv = document.createElement('div');
            //Add attribute class="space-y-s" to containing div
            newMovieDiv.setAttribute('class', 'space-y-s');
            //Add actual button and its classes, data attribute (to store display options) & text content (the title) using inner HTML then append to DOM
            newMovieDiv.innerHTML = `<button class="movieBtn w-full text-left px-4 py-2 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-700" data-options="${arrToPost[j].options}">${arrToPost[j].movieNameStored}</button>`;
            previousMovies.append(newMovieDiv);
        }
    }
}
// function to store movie name, and associated info, in local storage & call new fxn to display last 10 searched movies in DOM. The display fxn to be called each time a new movie is searched for.
const storeMovieName = (movieToStore, domOptions) => {
    let storageObj = {
        movieNameStored: `${movieToStore}`,
        options: `${domOptions}`
    }

    // existingmovieArr will get an array of onjects from local storage, or if empty will give empty array. We can add another movie as only member of the array if we prefer to have a default movie on loading)
    const existingMovieArr = JSON.parse(localStorage.getItem('movieArr')) || [];
    //check if array has > 9 members, and if so pop off last member
    if(existingMovieArr.length > 9) {
        existingMovieArr.shift();
    }
    // check to see if movie already exists in localStorage and if so do not store again.
    if(existingMovieArr.length) {
        for(let i = 0; i < existingMovieArr.length; i++) {
            if(movieToStore === existingMovieArr[i].movieNameStored) {
                previousMovies.innerHTML = "";
                displayPreviousMovies();
                return;
            }
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
//function to serch for a movie input by user from search bar
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
        if(movieNameTestArray.Response === "false") {
            console.log("this is an invalid choice, try again");
            return;
        }
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
    

        storeMovieName(movieTitle, movieSearchParams);
        movieDisplayFxn(movieTitle, moviePoster, movieSearchParams);

        //for loop to iterate through the move name test array using the search parameter array as keys.
        //then it sends the info to the DOM.
        for (let i = 0; i < movieSearchParams.length; i++) {
            console.log(movieNameTestArray[movieSearchParams[i]]);
            document.getElementById(`${movieSearchParams[i]}`).innerHTML = `<span id="${movieSearchParams[i]}span">${movieSearchParams[i]}: </span>${movieNameTestArray[movieSearchParams[i]]}` 
        }
        movieDisplayFxn(movieTitle, moviePoster, movieSearchParams)
        findStreaming(movieTitle); 
    })
}
// function to connect streaming API
function findStreaming(movieTitle) {
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
        let streamId = movieStreamingArray["result"]["0"]["streamingInfo"]["us"]["0"]["link"];
        let streamCpn = movieStreamingArray["result"]["0"]["streamingInfo"]["us"]["0"]["service"]
        console.log(streamCpn)
        console.log(streamId)
        
        const streamingDisplayFxn = (streamId) => {
            streamIconDOMEl.setAttribute("href", streamId)
        }
        switch (streamCpn) {
            case "prime":
                streamIconCpnDOMEl.setAttribute("src", "https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/92/amazon-prime-logo-512.png")
                break;
            case "disney":
                streamIconCpnDOMEl.setAttribute("src", "https://cdn1.iconfinder.com/data/icons/logos-brands-5/512/disney-plus-2-512.png")
                break;
            case "netflix":
                streamIconCpnDOMEl.setAttribute("src", "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png")
                break;
            case "apple":
                streamIconCpnDOMEl.setAttribute("src", "https://cdn.iconscout.com/icon/free/png-512/free-apple-tv-1859952-1575940.png?f=webp&w=256")
                break;
            case "paramount":
                streamIconCpnDOMEl.setAttribute("src", "https://seeklogo.com/images/P/paramount-logo-D0604AF7D3-seeklogo.com.png")
                break;
            case "hbo":
                streamIconCpnDOMEl.setAttribute("src", "https://variety.com/wp-content/uploads/2023/04/Max-Logo-Warner-Bros.-Discovery.png")
                break;
            case "hulu":
                streamIconCpnDOMEl.setAttribute("src", "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/hulu-icon.png")
                break;

        }
        streamingDisplayFxn(streamId);
    }) 
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

//function to serch for a movie clicked on from previous searches
function  searchPreviousMovie (movieInput) {

    document.querySelectorAll("li").forEach(function(liElement) {
    liElement.textContent = "";
});

fetch("http://www.omdbapi.com/?apikey=60ccc490&plot=full&t=" + movieInput)
.then(res => res.json())
.then(data => {
    movieNameTestArray = data;
})

.then(() => {

    let movieTitle = movieNameTestArray.Title;
    let moviePoster = movieNameTestArray.Poster;
   
    let movieSearchParams = optionsToSend;
 

    //for loop to iterate through the move name test array using the search parameter array as keys.
    //then it sends the info to the DOM.
    for (let i = 0; i < movieSearchParams.length; i++) {
        document.getElementById(`${movieSearchParams[i]}`).innerHTML = `<span id="${movieSearchParams[i]}span">${movieSearchParams[i]}: </span>${movieNameTestArray[movieSearchParams[i]]}`
    }
    movieDisplayFxn(movieTitle, moviePoster, movieSearchParams);
    findStreaming(movieTitle); 
    
})
}

// function to insert previously searched movie into DOM when clicked
let fetchPrevious = (event) => {
    let movieToGet = event.target.innerHTML;
    let optionsToGet = event.target.dataset.options;
    optionsToSend = optionsToGet.split(',')
    searchPreviousMovie(movieToGet);
}



const movieDisplayFxn = (movieTitle, moviePoster, movieSearchParams) => {
    movieDisplayDiv.textContent = movieTitle
    moviePosterDOMEl.setAttribute("src", moviePoster)

}

// event listeners
//event listener for submit button of the movie search form element
searchMovie.addEventListener("click", function (event) {

    event.preventDefault();
    let movieTitleChosen = movieTitleDOM.value;
    movieTitleDOM.value = '';
    searchMovies(movieTitleChosen);
  }); 

  // event listener for previously searched movies to lad them back into DOM when requested by user
  previousMovies.addEventListener('click', function (event) {
    event.preventDefault();
    fetchPrevious(event);
  });