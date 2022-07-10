
var myMoviesArray = [];

var movieListEl = $('#myList')

function init (){
    if(localStorage.getItem("Movie-Details")===null){
        window.alert("Oops! It looks like you don't have anything saved");
        return
    } else{
    var myListMovies = JSON.parse(localStorage.getItem("Movie-Details"));
    console.log(myListMovies)
    console.log(myListMovies.length);

    for(var i = 0; i < myListMovies.length; i++){
        //creating a div for each movies details to be saved
        var movieDiv = $('<div>');
        movieDiv.attr('id',i)
        movieDiv.attr('class',"movie-div move-down")

        //creating element to store movie title
        var movieTitleEl = $('<h3>');
        var movieTitle = myListMovies[i].name;
        movieTitleEl.attr('class','title')
        movieTitleEl.text(movieTitle);

        //creating button that will remove movie from list
        var deleteBtn = $('<button>');
        deleteBtn.text('Seen it?');
        deleteBtn.attr('class','delete-mylist-element')






        //appending elements to the page
        movieListEl.append(movieDiv);
        movieDiv.append(movieTitleEl);
        movieDiv.append(deleteBtn);

        
    }}
}

init();

$(document).on('click','.delete-mylist-element', function(event){
    event.preventDefault();
    $(this).parent().remove();

    var myListMovies = JSON.parse(localStorage.getItem("Movie-Details"));
    var titleCheck = $(this).siblings('.title').text();

    for(i=0; i < myListMovies.length; i++){
        var currentText = myListMovies[i].name;
        
        console.log(currentText)
        console.log(titleCheck)
        if(currentText === titleCheck){
            // console.log('matched')
            // console.log("This is array position " + myListMovies.indexOf(myListMovies[i]))

            var deleteIndex = myListMovies.indexOf(myListMovies[i]); 
        }


    }

    myListMovies.splice(deleteIndex,1);
    console.log(myListMovies)
    localStorage.setItem("Movie-Details",JSON.stringify(myListMovies));






    
})

