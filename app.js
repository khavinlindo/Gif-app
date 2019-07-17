

var topics = ["cat", "dog", "hamster", "turtle", "goldfish", "snake", "rabbit"];

var queryURL = "";
var GifDivEmpty = true;

var gifs; //The main <div> that will hold the gifs

var results = [];

 function createMainGifDiv () {

      gifs = $("<div class='gifs col-lg-9'>");
             $(".row").prepend(gifs);
 }
   

 function createButtons (arr) {
   for (i=0;i<arr.length;i++) {
    $(".buttons").append($("<button type='button' class='btn btn-info topics' data-attr='"+ arr[i] + "'> "+ arr[i] +"  </button>"));
   }
 }


 $(document).ready(function () {
        
      createMainGifDiv();
      createButtons(topics);
            
          $(document).on("click", ".topics", function() {
               
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
                
                 results = res.data;
               
                console.log(results); 
                
                 for (i=0;i<results.length;i++) {
                      var gif = $(" <img class='gif' src="+results[i].images.fixed_width_still.url+" data-state='still' data-animate='"+results[i].images.fixed_width.url+"' data-still='"+results[i].images.fixed_width_still.url+"'>");
                      var gifDiv = $("<div class='gifDiv'>");
                      var rating = $("<h5 class='rating'> Rating: "+results[i].rating+"</h5>")
                      
                      gifDiv.append(rating);
                      gifDiv.append(gif);
                      gifs.append(gifDiv);
                      GifDivEmpty = false;
                 }
             }); 
               
          });  
          
          $(document).on("click", ".gif", function() {
            var state = $(this).attr("data-state"); //record state of gif
             
              if (state==="still") {
             $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animated");
              }
             
              
             if (state==="animated") {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
             }
      
          })
      
          
          $("#gif-search").on("click", function(e) {
              e.preventDefault();

              var newTopic = $("#input-gif").val().trim();
              console.log(newTopic);

              topics.push(newTopic);
              console.log(topics);
              
              $(".buttons").empty();
              createButtons(topics); 
          })
           
    });
    
 


