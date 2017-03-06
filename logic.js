//set up variables
var authKey="ceadb42d410e487d884bd07d6764a53d";

var searchTerm = '';
var startYear = 0;
var endYear = 0;
var numResult = 0;

var urlBase =  "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    urlBase += '?' + $.param({
      'api-key': authKey,
      'q': 'barack obama',
    });

    var articleCounter = 0;

    function runQuery(numberarticles, queryURL){
      $.ajax({
        url: urlBase,
        method: 'GET',
      }).done(function(NYTData){
        for (var i=0; i < numResult; i++){
          console.log(NYTData.response.docs[i].web_url);
          console.log(NYTData.response.docs[i].headline.main);
          console.log(NYTData.response.docs[i].section_name);
          console.log(NYTData.response.docs[i].pub_date);

          var wellSection = $('<div>');
          wellSection.addClass("well");
          wellSection.attr('id', 'article-'+i);
          $('#wellSection').append(wellSection);

          $('#article-'+i).append('<h3>'+NYTData.response.docs[i].headline.main +'</h3>');
          $('#article-'+i).append('<a>'+NYTData.response.docs[i].web_url +'</a>');
          $('#article-'+i).append('<h5>'+NYTData.response.docs[i].section_name +'</h5>');
          $('#article-'+i).append('<h5>'+NYTData.response.docs[i].pub_date+'</h5>');

        }
        console.log(urlBase);
        console.log(NYTData);
      }).fail(function(err){
        throw err;
      });
    }

    $('#searchButton').on('click', function(){
      searchTerm = $('#searchParam').val().trim();
      numResult = $('#recordNum').val();
      startYear = $('#startYear').val();
      endYear = $('#endYear').val();


      numResult = $('#recordNum').val();

      var newUrl = urlBase += '?' + $.param({
        'api-key': authKey,
        'q': searchTerm,

      });

      if (parseInt(startYear)){
        var newUrl = urlBase += '?' + $.param({
          'api-key': authKey,
          'q': searchTerm,
          'begin_date': startYear +"0101",

        });
      }

      if (parseInt(endYear)){
        var newUrl = urlBase += '?' + $.param({
          'api-key': authKey,
          'q': searchTerm,
          'begin_date': startYear +"0101",
          'end_date': endYear+"1231"
        });
      }

      runQuery(numResult, newUrl);
    })
//functions

//main process


// retrieve user inputs and conver to variables
// use variables to run an ajax call
// break down the NYT object into usable fields
// generate content for html


//dealing with EDGE cases


// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "ceadb42d410e487d884bd07d6764a53d",
//   'q': "barack obama",
//   'begin_date': "20150101"
// });
// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
// }).fail(function(err) {
//   throw err;
// });
