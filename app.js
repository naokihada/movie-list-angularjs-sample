var app = angular.module("App", []);

app.controller("Ctrl", function($scope, $http) {
    var baseUrl = "http://api.themoviedb.org/3";
    var apiKey = "FIXME_REPLACE_WITH_YOUR_API_KEY"; // FIXME: use your API key
    var urlSuffix = "?api_key=" + apiKey + "&callback=JSON_CALLBACK";

    $scope.movieCollection; // Collection info
    $scope.selectedMovie; // Movie info
    $scope.credits; // Credits info
    $scope.profilePath; // Cast: selected profile image URL

    function buildCollectionUrl(id){
      var fName = "buildCollectionUrl()";
      var url = baseUrl + "/collection/" + id + urlSuffix;
      return url
    }

    function buildMovieUrl(id){
      var url = baseUrl + "/movie/" + id + urlSuffix;
      return url
    }

    function buildCreditUrl(id){
      var url = baseUrl + "/movie/" + id + '/credits' + urlSuffix;
      return url
    }

    function updateCollection(id){
      var url = buildCollectionUrl(id);
      $http.jsonp(url).then(function(result, status) {
        // $scope.result1 = JSON.stringify(result); // for debug
        $scope.movieCollection = result.data;
        $scope.selectedMovie = result.data.parts[0]; // TODO: better handling
      },function(result, status) {
        // $scope.result1 = 'Failed: Check API key - ' + JSON.stringify(result); // for debug
      });
    }

    function updateMovie(id){
      var url = buildMovieUrl(id);
      $http.jsonp(url).then(function(result, status) {
        // $scope.result2 = JSON.stringify(result); // for debug
        $scope.data2 = result.data; // TODO: better handling
      },function(result, status) {
        // $scope.result2 = 'Failed: Check API key - ' + JSON.stringify(result); // for debug
      });
    }

    function updateCredit(id){
      var url = buildCreditUrl(id);
      $http.jsonp(url).then(function(result, status) {
        // $scope.result3 = JSON.stringify(result); // for debug
        $scope.credits = result.data; // TODO: better handling
        $scope.profilePath = result.data.cast[0].profile_path; // TODO: better handling
      },function(result, status) {
        // $scope.result3 = 'Failed: Check API key - ' + JSON.stringify(result); // for debug
      });
    }

    $scope.movieClick = function(movie) {
      $scope.selectedMovie = movie;
      updateCredit(movie.id);
    }

    $scope.castClick = function(cast) {
      $scope.profilePath = cast.profile_path;
    }

    // Initial loading
    updateCollection(528); // 528 = "The Terminator Collection"
    updateCredit(218);     // 218 = "The Terminator"

});


