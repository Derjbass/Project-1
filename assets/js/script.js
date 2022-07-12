var movieName, trailerId;
var imdbID = [];
var ytLink = 'https://www.youtube.com/watch?v=';
const ytApiKey = 'AIzaSyAKW-rzHMOU-ibu6PVKf5Swwy0W9cptcEY';
const ottApiKey = '7c8e1ebcafmsh714464ccf2b4b99p19981bjsnbf6b11fcce3e'

//search button listener
$('#btn').on('click', function (event) {
    //stop page refresh when search button is clicked
    event.preventDefault();

    //loadClient().then(fetchData(movieName));

    //add input field value to variable for fetch later
    movieName = $('input').val();

    fetchMovieData(movieName);
    // fetchYtData(movieName);


})

//function to make API call
async function fetchMovieData(movie) {
    const ottUrl = `https://ott-details.p.rapidapi.com/search?rapidapi-key=${ottApiKey}&title=${movie}`;

    const ottResponse = await fetch(ottUrl);
    const ottData = await ottResponse.json();
    //filter out movies that don't match the first word or first and second word
    const filteredMovies = ottData.results.filter(function (movie){
        console.log(movieName.split(' ').length - 1);
        //console.log(movieName.split(' ')[movie.title.split(' ').length - 1].toLowerCase());
        if(movie.title.split(' ')[0].toLowerCase() === movieName.split(' ')[0].toLowerCase() && movie.title.split(' ')[movieName.split(' ').length - 1].toLowerCase() === movieName.split(' ')[movieName.split(' ').length - 1].toLowerCase()){
            console.log('movie.title.length', movie.title.split(' ').length - 1);
            return movie;
        }else if(movie.title.split(' ')[0].toLowerCase() === movieName.split(' ')[0].toLowerCase()){
            return movie;
        }
    }).slice(0,10);

    //get IDs for full array
    for (i = 0; i < filteredMovies.length; i++){
        imdbID[i] = filteredMovies[i].imdbid;
        console.log(imdbID);
    }
    

    console.log(filteredMovies);

    storeOttData(ottData);
}
async function fetchYtData(movie) {
    const ytUrl = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&type=video&part=snippet&q=${movie + ' trailer'}`;

    const ytResponse = await fetch(ytUrl);
    const ytData = await ytResponse.json();

    storeYtData(ytData);

    return ytData;
}





//function to store needed retrieved data
function storeOttData(ottData) {
    displayData(ottData);
}

function storeYtData(ytData) {
    trailerId = ytData.items[0].id.videoId
    // console.log('https://www.youtube.com/watch?v=' + trailerId);
    // return console.log(ytData.items[0].id.videoId);
}

//function to display data
function displayData(ottData) {
    console.log(ottData);

    for (var i = 0; i < ottData.results.length; i++) {
        console.log(i);
        var title = ottData.results[i].title;
        // var poster = ottData.results[i].imageurl[0];
        var imdb = 'test';

        try {
            var poster = ottData.results[i].imageurl[0]
        } catch (error) {
            var poster = './assets/images/no-image-icon-23500.jpg';
        }

        $("#display-results-here").append(
        `<div class="text-center movie-card">
            <h2>${title}</h2>
            <img src="${poster}" alt="${title}" width="250" height="300">
            <h3>IMDB Rating: ${imdb}</h3>
        </div>`)

    }
    
}

