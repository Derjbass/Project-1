var movieName;
var trailerId = [];
var imdbID = [];
var imdbRating = [];
var ytLink = 'https://www.youtube.com/watch?v=';
const ytApiKey = 'AIzaSyAKW-rzHMOU-ibu6PVKf5Swwy0W9cptcEY';
const ottApiKey = '3ddad456f1msh0fd6c81a3fb6472p195307jsn56362d1f8c52'

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
    //filter out movies that don't match the first word or first and second word
    const filteredMovies = ottData.results.filter(function (movie){
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
    for (i = 0; i < filteredMovies.length; i++){
        imdbID[i] = filteredMovies[i].imdbid;
        // console.log(imdbID);
    }
    
    //fetch youtube trailer video ID
    for (i = 0; i < filteredMovies.length; i++){
        const ytUrl = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&type=video&part=snippet&q=${filteredMovies[i].title} + ' trailer'}`;
        const ytResponse = await fetch(ytUrl);
        const ytData = await ytResponse.json();
        trailerId[i] = ytData.items[0].id.videoId
    }

    trailerId = ytData.items[0].id.videoId

    //fetch imdb rating data
    for (let i = 0; i < filteredMovies.length; i++) {
        let imbdIDUrl = `https://ott-details.p.rapidapi.com/gettitleDetails?rapidapi-key=${ottApiKey}&imdbid=${imdbID[i]}`;
        let imdbIDResponse = await fetch(imbdIDUrl);
        let imdbData = await imdbIDResponse.json();

        imdbRating[i] = imdbData.imdbrating;
    }

    // console.log(filteredMovies);

    displayData(filteredMovies, imdbRating, trailerId);
}

//function to display data
function displayData(filteredMovies, rating, id) {
    console.log(filteredMovies);

    for (var i = 0; i < filteredMovies.length; i++) {
        // console.log(i);
        var title = filteredMovies[i].title;
        // var poster = ottData.results[i].imageurl[0];
        var imdb = 'test';

        try {
            var poster = filteredMovies[i].imageurl[0]
        } catch (error) {
            var poster = '#';
        }

        $(".movie-card").append(
        `<div class="text-center">
            <h2>${title}</h2>
            <img src="${poster}" alt="${title}" width="250" height="300">
            <h3>IMDB Rating: ${rating[i]}</h3>
            <iframe width="420" height="315"
            src="https://www.youtube.com/embed/${id[i]}">
            </iframe> 
        </div>`)

        // console.log(title);
        // console.log(poster);
    }
    
}

