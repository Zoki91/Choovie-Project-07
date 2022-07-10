

button = $('.searchButton');

myListBtn = $('.myListButton')

movieList = $('#list');

myListAdd =$('.myList');

var details =[];

var storageDetails = JSON.parse(localStorage.getItem("Movie-Details")) || [];

myListBtn = $('.myListButton')




myListBtn.on('click', function(event){
    event.preventDefault();
    window.location.replace('./moviePage.html')
})

//function around what happens when the button is clicked
button.on('click', function(event){

    //stops default button actions
    event.preventDefault();

    

    var movie = $('#movie_title').val();

    if(movie){
        console.log(movie)

        // document.location.replace('./moviePage.html');
    
        //clears list
        movieList.empty();
    
        //stores the title of the movie from the element with the class .movie
        // var movie = $(this).siblings(".movie").val()
        
        var year = $(this).siblings(".year").val();
        var rating = $(this).siblings("rating").val();
    
        //checking to see that the movie i searched for is logged in the console
        movie = "&s=" + movie
    
    
        //function that runs the movie title through the API
        getMovie(movie)
        movieDetailsRun = setTimeout(movieDetails,3000);
    }else{
        window.alert("Looks like you haven't entered a movie title! Please try again.")
        return
    }
})

function getMovie(movie) {
    //apiUrl creates a string that adds the movie found above into the api link inorder to return movie data
    var apiUrl = 'https://www.omdbapi.com/?apikey=4cf0dfc5' + movie;

    
    //fetching api
    fetch(apiUrl)
      .then(function (response) {
        //storing data as an json object
        if(response.status === 'False'){
            return
        }
        return response.json()
        
      })
        .then(function(data){
            // console.log(data.Search)
            for(var i = 0; i < data.Search.length; i++){
                var movieDiv = $('<div>');
                movieDiv.attr('class',"movies movie-div")
                var imdbID = data.Search[i].imdbID;
                movieDiv.attr('id', imdbID)
                
                //creates the title element and creates stores the movie title in the title variable
                var titleEl = $('<h3>');
                var title = data.Search[i].Title;

                //creates the year element and creates stores the release year in the year variable
                var yearEl = $('<p>');
                var year = data.Search[i].Year;

                
                //creates poster element and stores url required for src
                var posterEl = $('<img>');
                var poster = data.Search[i].Poster;

                //creates a plot element and stores text as loading
                var plotEl = $('<p>');
                plotEl.attr('class', "plotDescription")
                plotEl.attr('data-plot',i);
                var plot = "Loading.....";

                //creates an element for streaming service data

                var streamEl = $('<div>');

                //box office element
                var boxOfficeEl = $('<p>');
                boxOfficeEl.attr('class', "boxOffice");
                boxOfficeEl.attr('data-boxoffice', i);

                //IMDB Rating element
                var imdbEl = $('<p>');
                imdbEl.attr('class', "imdbRating");
                imdbEl.attr('data-imdb', i);

                //creating a details button

                var detailsBtn = $('<button>');
                detailsBtn.attr('id', i+10);
                detailsBtn.attr('class', 'details-button btn btn-primary btn-block');

                //creating a my list button

                var myListBtn = $('<button>');
                myListBtn.attr('id',i+20);
                myListBtn.attr('class', 'details-button btn btn-primary btn-block myList');


                //appends the text into the elements
                titleEl.text(title);
                titleEl.attr("class","movie-child movie-title")
                yearEl.text(year)
                yearEl.attr("class","movie-year")
                posterEl.attr("src",poster);
                posterEl.attr("style","width:200px; height:300px")
                plotEl.text(plot);
                detailsBtn.text("Details");
                myListBtn.text('Add to My List');

                // console.log(imdbID);

                //Appends the elements 
                movieList.append(movieDiv);
                movieDiv.append(posterEl);
                movieDiv.append(titleEl);
                movieDiv.append(yearEl);
                movieDiv.append(imdbEl);
                movieDiv.append(boxOfficeEl);
                movieDiv.append(plotEl)
                movieDiv.append(streamEl);
                movieDiv.append(detailsBtn);
                movieDiv.append(myListBtn)

            }

        } 

    
    
)
 
};


function movieDetails(){
    movies = $(".movies");
    plotDescription = $(".plotDescription");
    var details=[];
    var ids = [];
    // details.splice(0, details.length)
    // ids.splice(0, ids.length)
    movies.each(function(){
        var movieIds = $(this).attr("id");
        ids.push(movieIds)
    })

    console.log(ids.length);

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
        console.log(details)
        details.sort(function (a,b){
            return ids.indexOf(a.imdbID) - ids.indexOf(b.imdbID)
        })
        for(x=0; x < details.length; x++){
            var y = x;
            stringX = y.toString();
            dataTarget = $('.plotDescription[data-plot=' + stringX +']')
            imdbTarget = $('.imdbRating[data-imdb=' + stringX +']')
            boxOfficeTarget = $('.boxOffice[data-boxoffice=' + stringX +']')
            dataTarget.text(details[x].Plot)
            imdbTarget.text(details[x].imdbRating)
            boxOfficeTarget.text(details[x].BoxOffice)
        }
    },2000);

}


$(document).on('click','.myList', function(event){
    event.preventDefault();
    var savedID = $(this).parent().attr('id');
    var movieTitle = $(this).siblings('.movie-title').text();
    var myListMovies = JSON.parse(localStorage.getItem("Movie-Details"));

    if(myListMovies){
        for(i=0; i < myListMovies.length; i++){
            var titleCheck = $(this).siblings('.movie-title').text();
            console.log(titleCheck)
            var arrayTitleText = myListMovies[i].name;
            console.log(arrayTitleText)
            if(titleCheck === arrayTitleText){
                window.alert("Looks like this is already on your list!")
                return
            }
        }
    }
 
    savedMovieDetails = {
        id: savedID,
        name: movieTitle
    };
    storageDetails.push(savedMovieDetails);
    console.log(storageDetails)
    localStorage.setItem("Movie-Details",JSON.stringify(storageDetails));
})






