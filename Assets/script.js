

button = $('.searchButton');

movieList = $('#list');





//function around what happens when the button is clicked
button.on('click', function(event){

    //stops default button actions
    event.preventDefault();

    var movie = $('#movie_title').val();

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
            for(var i = 0; i < data.Search.length; i++){
                var movieDiv = $('<div>');
                movieDiv.attr('class',"movies")
                movieDiv.attr('style',"background-color: white; padding: 10px; margin:20px; border-radius:10px; border: solid #A52A2A 3px")
                var imdbID = data.Search[i].imdbID;
                movieDiv.attr('id', imdbID)
                
                //creates the title element and creates stores the movie title in the title variable
                var titleEl = $('<h3>');
                titleEl.attr('style','display:inline-block; position:relative; top:-120px; padding:10px')
                var title = data.Search[i].Title;

                //creates the year element and creates stores the release year in the year variable
                var yearEl = $('<p>');
                yearEl.attr('style', "font-style:italic")
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

                //creating a details button

                var detailsBtn = $('<button>');
                detailsBtn.attr('id', i);
                detailsBtn.attr('class', 'details-button btn btn-primary btn-block');

                //appends the text into the elements
                titleEl.text(title);
                titleEl.attr("class","movie-child")
                yearEl.text(year)
                yearEl.attr("class","movie-child")
                posterEl.attr("src",poster);
                posterEl.attr("style","width:200px; height:300px")
                plotEl.text(plot);
                detailsBtn.text("Details");
                console.log(imdbID);

                //Appends the elements 
                movieList.append(movieDiv);
                movieDiv.append(posterEl);
                movieDiv.append(titleEl);
                movieDiv.append(yearEl);
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
    movies.each(function(){
        var uniqueMovieIdentifier = $(this).attr("id");
        // console.log(uniqueMovieIdentifier)
        // console.log(uniqueMovieIdentifier)
        var plotUrl = 'https://www.omdbapi.com/?apikey=4cf0dfc5&i=' + uniqueMovieIdentifier;
        fetch(plotUrl)
        .then(function (response) {
            //storing data as an json object
            return response.json();
          })
            .then(function(plotdata){
                // console.log(plotdata)
                details.push(plotdata)
      })
    });
    console.log(details);
    applyingDetailsRun = setTimeout(function(){
        for(x=0; x < details.length; x++){
            var y = x;
            stringX = y.toString();
            dataTarget = $('.plotDescription[data-plot=' + stringX +']')
            
            // console.log(dataTarget.text());
            dataTarget.text(details[x].Plot)
        }
    },2000);
}





