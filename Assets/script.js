

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

                var streamEl = $('<a href>');
                streamEl.attr('class', "streamLinks");
                streamEl.attr('data-stream',i);

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
                

            };

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
        // console.log(plotUrl)
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



    // Second API call to get streaming info from imdbID get
    streamAvailability = setTimeout(function(){
        var streamOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '447785d6femshe88b6a464e3c243p16334fjsneb1d57287602',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }};

        var serviceList = '&service=netflix%20prime%20disney%20hbo%20hulu%20paramount%20starz%20showtime%20apple%20mubi%20stan%20now%20crave%20iplayer';
        
        var streamDetails= [];

    
       
        for(x=0; x < details.length; x++){
            var streamURL = 'https://streaming-availability.p.rapidapi.com/get/basic?country=au' + serviceList + '&imdb_id=' + details[x].imdbID + '&output_language=en';
        
            fetch(streamURL, streamOptions)
            .then(function(response) {
                
                if(response.status === 404){
                    streamDetails.push("");
                   }
                return response.json();
             })
              .then(function(data){

                streamDetails.push(data);
                console.log(streamDetails);
                
                var show1 = JSON.stringify(data.streamingInfo);
                console.log(show1);
                
            
         
               var stream0 = $('.streamLinks[data-stream=0]')
               var stream1 = $('.streamLinks[data-stream=1]')
               var stream2 = $('.streamLinks[data-stream=2]')
               var stream3 = $('.streamLinks[data-stream=3]')
               var stream4 = $('.streamLinks[data-stream=4]')
               var stream5 = $('.streamLinks[data-stream=5]')
               var stream6 = $('.streamLinks[data-stream=6]')
               var stream7 = $('.streamLinks[data-stream=7]')
               var stream8 = $('.streamLinks[data-stream=8]')
               var stream9 = $('.streamLinks[data-stream=9]')
            
               stream0.attr("href", "test" );
               stream1.attr("href", "test");
               stream2.attr("href", "test");
               stream3.attr("href", "test");
               stream4.attr("href", "test");
               stream5.attr("href", "test");
               stream6.attr("href", "test");
               stream7.attr("href", "test");
               stream8.attr("href", "test");
               stream9.attr("href", "test");
               
                
                
            });
    
            // console.log(streamDetails);
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
