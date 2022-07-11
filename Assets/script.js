

button = $('.searchButton');

myListBtn = $('.myListButton')

movieList = $('#list');

myListAdd =$('.myList');

var details =[];

var storageDetails = JSON.parse(localStorage.getItem("Movie-Details")) || [];

myListBtn = $('.myListButton')

var duplicateModal = $('#duplicate-myModal');

var duplicateModalSpan = $('.duplicate-close');

var detailsModal = $('#details-myModal');

var detailsModalSpan = $('.details-close');




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
                posterEl.attr('class', 'movie-poster');
                var poster = data.Search[i].Poster;

                //creates a plot element and stores text as loading
                var plotEl = $('<p>');
                plotEl.attr('class', "plotDescription")
                plotEl.attr('data-plot',i);
                var plot = "Loading.....";

                //creates an element for streaming service data

                var streamEl = $('<a>');
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
                detailsBtn.attr('id', i+10);
                detailsBtn.attr('class', 'details-button btn btn-primary btn-block details-button-modal');

                //creating data-targets for details section

                var director = $('.director');
                director.attr('data-director',i);

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
    var savedPoster = $(this).siblings('.movie-poster').attr('src');
    var myListMovies = JSON.parse(localStorage.getItem("Movie-Details"));

    if(myListMovies){
        for(i=0; i < myListMovies.length; i++){
            var titleCheck = $(this).parent().attr("id");
            console.log(titleCheck)
            var arrayTitleText = myListMovies[i].id;
            console.log(arrayTitleText)
            if(titleCheck === arrayTitleText){
                // window.alert("Looks like this is already on your list!")
                duplicateModal.attr('style','display:block')
                window.onclick = function(event) {
                    console.log(event.target.className);
                    console.log(duplicateModal)
                    if (event.target.id === duplicateModal.attr('id')) {
                      duplicateModal.attr('style','display:none');
                    }
                    if(event.target.className === duplicateModalSpan.attr('class')){
                        duplicateModal.attr('style','display:none');
                    }
                  }

                return
            }
        }
    }
    
    $(this).text("+ Added");
    savedMovieDetails = {
        id: savedID,
        name: movieTitle,
        poster: savedPoster
    };
    storageDetails.push(savedMovieDetails);
    console.log(storageDetails)
    localStorage.setItem("Movie-Details",JSON.stringify(storageDetails));
})


$(document).on('click','.details-button-modal', function(event){
    console.log(event.target.id)
    console.log(detailsModal.attr('id'));
    detailsModal.attr('style','display:block')

    //need to insert specific movie data here


    window.onclick= function(event){
        if (event.target.id === detailsModal.attr('id')) {
            detailsModal.attr('style','display:none');
          }
        if(event.target.className === detailsModalSpan.attr('class')){
              detailsModal.attr('style','display:none');
          }
    }})

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
            var streamTitle = JSON.stringify(details[x].Title);
            console.log(streamTitle);
            fetch(streamURL, streamOptions)
            .then(function(response) {
            
                if(response.status === 404){
                    streamDetails.push(["Not a Film", "Not Found"]);
                   };
                return response.json();
             })
              .then(function(data){

                if(JSON.stringify(data.streamingInfo) === "{}"){
                    streamDetails.push(["Unavailable", "No Streams Available in AU"]);
                   }
                else if (!(JSON.stringify(data.streamingInfo) === "{}")){
                streamDetails.push([data.originalTitle, (JSON.stringify(data.streamingInfo)).split('"')[7]]);
                };
                console.log(streamDetails);
                
               
                
            
         
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
            
               stream0.attr("href", streamDetails[0][1]);
               stream1.attr("href", streamDetails[1][1]);
               stream2.attr("href", streamDetails[2][1]);
               stream3.attr("href", streamDetails[3][1]);
               stream4.attr("href", streamDetails[4][1]);
               stream5.attr("href", streamDetails[5][1]);
               stream6.attr("href", streamDetails[6][1]);
               stream7.attr("href", streamDetails[7][1]);
               stream8.attr("href", streamDetails[8][1]);
               stream9.attr("href", streamDetails[9][1]);
               
               stream0.text("Stream Link: " + streamDetails[0][0]);
               stream1.text("Stream Link: " + streamDetails[1][0]);
               stream2.text("Stream Link: " + streamDetails[2][0]);
               stream3.text("Stream Link: " + streamDetails[3][0]);
               stream4.text("Stream Link: " + streamDetails[4][0]);
               stream5.text("Stream Link: " + streamDetails[5][0]);
               stream6.text("Stream Link: " + streamDetails[6][0]);
               stream7.text("Stream Link: " + streamDetails[7][0]);
               stream8.text("Stream Link: " + streamDetails[8][0]);
               stream9.text("Stream Link: " + streamDetails[9][0]);
                
            });
    
            // console.log(streamDetails);
        }
        },2000)






