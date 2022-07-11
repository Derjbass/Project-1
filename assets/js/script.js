var movieName;

//search button listener
$('button').on('click', function(event){
    //stop page refresh when search button is clicked
    event.preventDefault();
  
    //add input field value to variable for fetch later
    movieName = $('input').val();

    fetchData(movieName);

})

function fetchData(movie){
    return;
}