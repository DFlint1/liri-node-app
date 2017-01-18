//subjected start 
var fs=require('fs');
var keys = require('./keys.js');
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var twitterKeys = keys.twitterKeys;


//testing input
console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");
//arguments
var userCommand = process.argv[2];
var secondCommand = process.argv[3];
	for(i=4; i<process.argv.length; i++){
	    secondCommand += '+' + process.argv[i];
	}
	//switch-case statements
function theDualSwitch(){
		switch(userCommand){

		case 'my-tweets':
		fetchTweets();
		break;

		case 'spotify-this-song':
		spotifyMe();
		break;

		case 'movie-this':
		aMovieForMe();
		break;

		case 'do-what-it-says':
		followCommands();
		break;
		
	}
};
//functions
function fetchTweets(){
	console.log("Here are some sweet tweets!");
	//load keys from keys.js

   	var client = new Twitter(twitterKeys);

    
	//parameters for twitter function.
	var parameters = {
		screen_name: 'DanaFlint',
        count: 20
    };

    //call the get method twitter
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {console.log(tweets);
	        // for (i=0; i<tweets.length; i++) {
	        //     var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	        //     console.log(returnedData);
	        //     console.log("-------------------------");
	        }
	}); //end client.get
	// }); //end twitter parameters
}//end fetchTweets

function spotifyMe(){
	console.log("Music to your hears!");

	//variable for search term, test if defined.

	var searchTrack;
	if(secondCommand === undefined){
		searchTrack = "What's My Age Again?";
	}else{
		searchTrack = secondCommand;
	}
	//launch spotify search
	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	        console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});
};//end spotifyMe

function aMovieForMe(){
	console.log("Netflix?");

	var searchMovie;
	if(secondCommand === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};//end aMovieForMe

function followCommands(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

     	//split data, declare variables
     	var dataArr = data.split(',');
        userCommand = dataArr[0];
        secondCommand = dataArr[1];
        //if multi-word search term, add.
        for(i=2; i<dataArr.length; i++){
            secondCommand = secondCommand + "+" + dataArr[i];
        };
        //run action
		theDualSwitch();
		
    	};//end else

    });//end readfile

};//end followCommands

theDualSwitch();

