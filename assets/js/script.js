var movieName, trailerId;
const ytApiKey = 'AIzaSyAKW-rzHMOU-ibu6PVKf5Swwy0W9cptcEY';
const ottApiKey = '7c8e1ebcafmsh714464ccf2b4b99p19981bjsnbf6b11fcce3e'

//search button listener
$('#btn').on('click', function (event) {
    //stop page refresh when search button is clicked
    event.preventDefault();

    //loadClient().then(fetchData(movieName));

    //add input field value to variable for fetch later
    movieName = $('input').val();
    console.log(movieName);

    fetchMovieData(movieName);
    fetchYtData(movieName);


})

//function to make API call
async function fetchMovieData(movie) {
    const ottUrl = `https://ott-details.p.rapidapi.com/search?rapidapi-key=${ottApiKey}&title=${movie}&page=1`;

    const ottResponse = await fetch(ottUrl);
    const ottData = await ottResponse.json();

    storeOttData(ottData);

    return ottData;
}
async function fetchYtData(movie) {
    const ytUrl = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&type=video&part=snippet&q=${movie + ' trailer'}`;

    const ytResponse = await fetch(ytUrl);
    const ytData = await ytResponse.json();
    console.log(ytData);

    storeYtData(ytData);

    return ytData;
}





//function to store needed retrieved data
function storeOttData(ottData) {
    console.log(ottData);
}

function storeYtData(ytData) {
    trailerId = ytData.items[0].id.videoId
    console.log('https://www.youtube.com/watch?v=' + trailerId);
    return console.log(ytData.items[0].id.videoId);
}

//function to display data
function displayData(toDisplay) {
    return;
}



