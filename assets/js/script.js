var movieName;

//search button listener
$('button').on('click', function(event){
    //stop page refresh when search button is clicked
    event.preventDefault();
  
    //add input field value to variable for fetch later
    movieName = $('input').val();

    fetchData(movieName);

})

//function to make API call
function fetchData(movie){
    return;
}

//function to store needed retrieved data
function storeData(data){
    return;
}

//function to display data
function displayData(toDisplay){
    return;
}