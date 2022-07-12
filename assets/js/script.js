var movieName, trailerId;
var ytLink = 'https://www.youtube.com/watch?v=';
const ytApiKey = 'AIzaSyAKW-rzHMOU-ibu6PVKf5Swwy0W9cptcEY';

//search button listener
$('#btn').on('click', function(event){
    //stop page refresh when search button is clicked
    event.preventDefault();

    //loadClient().then(fetchData(movieName));
  
    //add input field value to variable for fetch later
    movieName = $('input').val();
    console.log(movieName);

    fetchData(movieName);

})

//function to make API call
async function fetchData(movie){
    console.log("Ready to get Youtube data!");
  const url = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&type=video&part=snippet&q=${movie + ' trailer'}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  storeData(data);

  return data;
}


//function to store needed retrieved data
function storeData(data){
    trailerId = data.items[0].id.videoId
    console.log(ytLink + trailerId);
    return console.log(data.items[0].id.videoId);
}

//function to display data
function displayData(toDisplay){
    return;
}



