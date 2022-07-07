

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
                plotEl.attr('data-plot',i+1);
                var plot = "Loading.....";

                

                //appends the text into the elements
                titleEl.text(title);
                titleEl.attr("class","movie-child")
                yearEl.text(year)
                yearEl.attr("class","movie-child")
                posterEl.attr("src",poster);
                posterEl.attr("style","width:100px; height:100px")
                plotEl.text(plot);

                //Appends the elements 
                movieList.append(movieDiv);
                movieDiv.append(posterEl);
                movieDiv.append(titleEl);
                movieDiv.append(yearEl);
                movieDiv.append(plotEl)
                

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
        var plotUrl = 'https://www.omdbapi.com/?apikey=4cf0dfc5&i=' + uniqueMovieIdentifier;
        fetch(plotUrl)
        .then(function (response) {
            //storing data as an json object
            return response.json();
          })
            .then(function(plotdata){
                details.push(plotdata)
      })
    });

    console.log(details);
    applyingDetailsRun = setTimeout(function(){
        for(x=0; x < details.length; x++){
            var y = x+1;
            stringX = y.toString();
            dataTarget = $('.plotDescription[data-plot=' + stringX +']')
            // console.log(dataTarget.text());
            dataTarget.text(details[x].Plot)
        }
    },5000);
}





