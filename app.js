

var topics = ["cat", "dog", "hamster", "turtle", "goldfish", "snake", "rabbit"];

 var queryURL = "";
var GifDivEmpty = true;
var gifDiv; // The <div> for each individual gif
var gifs; //The main <div> that will hold the gifs

 function createMainGifDiv () {

      gifs = $("<div class='gifs col-lg-9'>");
             $(".row").prepend(gifs);
 }
   
$(document).ready(function () {
             
      createMainGifDiv();

    for (i=0;i<topics.length;i++) {
       
       $(".buttons").append($("<button type='button' class='btn btn-info topics' data-attr='"+ topics[i] + "'> "+topics[i]+"  </button>"));
       
            }
            
          $(".topics").on("click", function() {
               
             
             if (GifDivEmpty == false) {
                  gifs.remove();
                  GifDivEmpty = true;
                  createMainGifDiv();
             }  
             

            var topic = $(this).attr("data-attr");
             queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&limit=10&rating=pg-13&api_key=JRkXGHPUPUqr9BQSQvaxSyMHEDCpfdcu";
             
             $.ajax({
                 url: queryURL,
                 method: "GET"
             }).then(function(res) {
                
                 var results = res.data;
               
                console.log(results); 
                
                 for (i=0;i<results.length;i++) {
                      var gif = $(" <img class='gif' src="+results[i].images.fixed_width_still.url+"data-animate='still'>");
                      gifDiv = $("<div class='gifDiv'>");
                      var rating = $("<h5 class='rating'> Rating: "+results[i].rating+"</h5>")
                      
                      gifDiv.append(rating);
                      gifDiv.append(gif);
                      gifs.append(gifDiv);


                      GifDivEmpty = false;
                 }
                 

                })

          }) 
        
    });
    
 


