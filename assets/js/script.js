var movieName;
var trailerId = [];
var imdbID = [];
var imdbRating = [];
var searchHistory = [];
var ytLink = 'https://www.youtube.com/watch?v=';
const ytApiKey = 'AIzaSyBZ4n5tgZISeBzztKLEue0Ap8w8lAl5XE8';
const ottApiKey = 'bcf969b618msh00f834b35745ea6p1b0e5djsnf105dedaa30c'
let filteredMovies;

//search button listener
$('#btn').on('click', function (event) {
    //stop page refresh when search button is clicked
    event.preventDefault();

    //loadClient().then(fetchData(movieName));

    //add input field value to variable for fetch later
    movieName = $('input').val();
    fetchMovieData(movieName);

})

//function to make API call
async function fetchMovieData(movie) {
    const ottUrl = `https://ott-details.p.rapidapi.com/search?rapidapi-key=${ottApiKey}&title=${movie}`;
    const ottResponse = await fetch(ottUrl);
    const ottData = await ottResponse.json();

    //reset arrays
    imdbRating = [];
    imdbID = [];
    trailerId = [];

    //filter out movies that don't match the first word or first and second word
    filteredMovies = ottData.results.filter(function (movie){
        // console.log(movieName.split(' ').length - 1);
        //console.log(movieName.split(' ')[movie.title.split(' ').length - 1].toLowerCase());
        if(movie.title.split(' ')[0].toLowerCase() === movieName.split(' ')[0].toLowerCase() && movie.title.split(' ')[movieName.split(' ').length - 1].toLowerCase() === movieName.split(' ')[movieName.split(' ').length - 1].toLowerCase()){
            // console.log('movie.title.length', movie.title.split(' ').length - 1);
            return movie;
        }else if(movie.title.split(' ')[0].toLowerCase() === movieName.split(' ')[0].toLowerCase()){
            return movie;
        }
    }).slice(0,3);

    //get IDs for full array
    for (var i = 0; i < filteredMovies.length; i++){
        imdbID[i] = filteredMovies[i].imdbid;
        // console.log(imdbID);
    }
    
    //fetch youtube trailer video ID
    for (var i = 0; i < filteredMovies.length; i++){
        const ytUrl = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&type=video&part=snippet&q=${filteredMovies[i].title} + ' trailer'}`;
        const ytResponse = await fetch(ytUrl);
        const ytData = await ytResponse.json();
        trailerId.push(ytData.items[0].id.videoId);
    }

    //fetch imdb rating data
    async function fetchImdbRating(index)
    {
        var imbdIDUrl = `https://ott-details.p.rapidapi.com/gettitleDetails?rapidapi-key=${ottApiKey}&imdbid=${imdbID[index]}`;
        var imdbIDResponse = await fetch(imbdIDUrl);
        var imdbData = await imdbIDResponse.json();
        imdbRating.push(imdbData.imdbrating);
        console.log(imdbData.imdbrating);

        if(imdbData.imdbrating){
            displayData(index, imdbRating[index], trailerId[index]);
        }


         
    }

    const delay = (time) => new Promise(res => setTimeout(res, time)); 
    $("#display-results-here").empty();
    for (let i = 0; i < filteredMovies.length; i++) {
        await delay(1500);
        fetchImdbRating(i);
    // console.log(filteredMovies);
    }
}

//function to display data
function displayData(index, rating, id) {
    console.log('index: ' + index, rating, id);

    var title = filteredMovies[index].title;
    

        // var poster = ottData.results[i].imageurl[0];

        try {
            var poster = filteredMovies[index].imageurl[0]
        } catch (error) {
            var poster = './assets/images/no-image-icon-23500.jpg';
        }

        $("#display-results-here").append(
        `<div class="text-center movie-card">
            <h2>${title}</h2>
            <img src="${poster}" alt="${title}" width="250" height="300">
            <h3>IMDB Rating: ${rating}</h3>
            <iframe width="420" height="315"
            src="https://www.youtube.com/embed/${id}">
            </iframe> 

        </div>`)

        var storageObj = {
            title: title,
            poster: poster,
            rating: rating,
            trailer: `https://www.youtube.com/embed/${id}`
        }
        window.localStorage.clear();
        searchHistory.push(storageObj);
        localStorage.setItem("Search History", JSON.stringify(searchHistory));
}

function showLastSearch() {
    var lastSearch = JSON.parse(localStorage.getItem("Search History"));
    console.log(lastSearch);
    for (var i = 0; i < lastSearch.length; i++){
        $("#display-results-here").append(
        `<div class="text-center movie-card">
            <h2>${lastSearch[i].title}</h2>
            <img src="${lastSearch[i].poster}" alt="${lastSearch[i].title}" width="250" height="300">
            <h3>IMDB Rating: ${lastSearch[i].rating}</h3>
            <iframe width="420" height="315"
            src="${lastSearch[i].trailer}">
            </iframe> 

        </div>`)}
}

showLastSearch();
