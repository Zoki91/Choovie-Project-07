
var myMoviesArray = [];
var details =[];
var movieListEl = $('#myListPage')
var emptyPage = $('#emptyPage')

function init (){
    var emptyCheck = JSON.parse(localStorage.getItem("Movie-Details"));
    console.log(emptyCheck.length)
    if(emptyCheck.length == 0){
        var emptyListEl = $('<h2>');
        emptyListEl.attr('class','emptyList')
        emptyListEl.text('Looks like your List is empty! Head back to the search and find some movies to add here!');
        emptyPage.append(emptyListEl);
        return
    } else{
    var myListMovies = JSON.parse(localStorage.getItem("Movie-Details"));
    // console.log(myListMovies)
    // console.log(myListMovies.length);

    for(var i = 0; i < myListMovies.length; i++){
        //creating a div for each movies details to be saved
        var movieDiv = $('<div>');
        movieDiv.attr('id', myListMovies[i].id)
        movieDiv.attr('class',"movie-div-mylist move-down movies")

        //creating element to store movie title
        var movieTitleEl = $('<h3>');
        var movieTitle = myListMovies[i].name;
        movieTitleEl.attr('class','title movie-title movie-child')
        movieTitleEl.text(movieTitle);

        //creating a poster element
        var posterEl = $('<img>');
        posterEl.attr('class','poster');
        posterEl.attr('data-poster',i);

        //creating a year element
        var yearEl = $('<p>');
        yearEl.attr('class','year');
        yearEl.attr('data-year',i);

        //creating plot element
        var plotEl = $('<p>');
        plotEl.attr('class','plot');
        plotEl.attr('data-plot',i)



        //creating button that will remove movie from list
        var deleteBtn = $('<button>');
        deleteBtn.text('Seen it?');
        deleteBtn.attr('class','delete-mylist-element')

        //appending elements to the page
        movieListEl.append(movieDiv);
        movieDiv.append(posterEl);
        movieDiv.append(movieTitleEl);
        // movieDiv.append(plotEl);
        // movieDiv.append(yearEl);
        movieDiv.append(deleteBtn);

    }}
    movieDetailRequest();
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

function movieDetailRequest(){
    movies = $(".movies");
    var ids = [];
    movies.each(function(){
        var movieIds = $(this).attr("id");
        ids.push(movieIds)
    })
    // console.log(ids)

    for(i=0; i < ids.length; i++){
        var plotUrl = 'https://www.omdbapi.com/?apikey=4cf0dfc5&i=' + ids[i];
        console.log(plotUrl)
        fetch(plotUrl)
        .then(function (response) {
            //storing data as an json object
            return response.json();
          })
            .then(function(plotdata){
                details.push(plotdata) ;       
            })   
 
    }

    applyingDetailsRun = setTimeout(function(){
        details.sort(function (a,b){
            return ids.indexOf(a.imdbID) - ids.indexOf(b.imdbID)
        })
        for(x=0; x < details.length; x++){
            var y = x;
            stringX = y.toString();
            //Adding Poster to elements
            posterTarget = $('.poster[data-poster=' + stringX + ']')
            posterTarget.attr('src', details[x].Poster)
            posterTarget.attr("style","width:200px; height:300px; margin-left:-4px; margin-top: 80px; border: 2px solid black")

            plotTarget = $('.plot[data-plot=' + stringX + ']')
            plotTarget.text(details[x].Plot)

            yearTarget = $('.year[data-year=' + stringX + ']')
            yearTarget.text(details[x].Year)
            // dataTarget = $('.plotDescription[data-plot=' + stringX +']')
            // imdbTarget = $('.imdbRating[data-imdb=' + stringX +']')
            // boxOfficeTarget = $('.boxOffice[data-boxoffice=' + stringX +']')
            // dataTarget.text(details[x].Plot)
            // imdbTarget.text(details[x].imdbRating)
            // boxOfficeTarget.text(details[x].BoxOffice)
        }
    },2000);


}

