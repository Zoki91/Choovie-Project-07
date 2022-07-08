

button = $('.searchButton');

movieList = $('#list');





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

        return response.json();
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
                detailsBtn.attr('id', i);
                detailsBtn.attr('class', 'details-button btn btn-primary btn-block');

                //appends the text into the elements
                titleEl.text(title);
                titleEl.attr("class","movie-child movie-title")
                yearEl.text(year)
                yearEl.attr("class","movie-child movie-year")
                posterEl.attr("src",poster);
                posterEl.attr("style","width:200px; height:300px")
                plotEl.text(plot);
                detailsBtn.text("Details");
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
            // console.log(dataTarget)
            // console.log(stringX)
            // console.log(details[x].imdbID)
            dataTarget.text(details[x].Plot)
            imdbTarget.text(details[x].imdbRating)
            boxOfficeTarget.text(details[x].BoxOffice)
            // console.log(dataTarget.text());
        }
    },2000);

    // movies.each(function(){
    //     var uniqueMovieIdentifier = $(this).attr("id");
    //     // console.log(uniqueMovieIdentifier)
    //     // console.log(uniqueMovieIdentifier)
    //     var ploUrl = 'https://www.omdbapi.com/?apikey=4cf0dfc5&i=' + uniqueMovieIdentifier;
    //     // console.log(plotUrl)
    //     fetch(ploUrl)
    //     .then(function (response) {
    //         //storing data as an json object
    //         return response.json();
    //       })
    //         .then(function(plotdata){
    //             // console.log(plotdata)
    //             details.push(plotdata)            
    //         })
    // });
    // console.log(details);


}
