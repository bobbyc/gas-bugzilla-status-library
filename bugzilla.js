var BUGZILLA_REST = "https://bugzilla.mozilla.org/rest/bug?";
var BUGZILLA_URL = "https://bugzilla.mozilla.org/buglist.cgi?";

// Send REST request to url
function sendRequest(url) {

  Logger.log(url);
  var response = UrlFetchApp.fetch(
    url,
    {
      method: "GET",
      contentType: "application/json",
      muteHttpExceptions: true,
    }
  );
  var responseCode = response.getResponseCode()
  var responseBody = response.getContentText()

  if (responseCode === 200) {
    var responseJson = JSON.parse(responseBody)
    return responseJson;
  } else {
    Logger.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody))
  }
}

function searchBugs(searchTerms) {
  var url = [BUGZILLA_REST];

  // Concat search Terms
  for (var m in searchTerms) {
    url.push("&", encodeURIComponent(searchTerms[m][0]), "=", encodeURIComponent(searchTerms[m][1]));
  }

  // Do the query
  return sendRequest(url.join(""));
}

function searchBugsByComponents(searchTerms, components) {

  // Concat search Terms
  var Query = [BUGZILLA_REST];
  for (var m in searchTerms) {
    Query.push("&", encodeURIComponent(searchTerms[m][0]), "=", encodeURIComponent(searchTerms[m][1]));
  }

  // Search bugs by 10 components per loop
  var results = undefined;
  var loopsize = 10;
  var ComponentNames = Object.keys(components);
  var ComponentLength = ComponentNames.length;
  for (var j = 0; j < ComponentLength; j = j + loopsize) {

    // Create temp query string for sub-query
    var Request = [Query.join("")];
    for (var k = j; (k < (j + loopsize)) && (k < ComponentLength); k++) {
      Request.push("&component=", encodeURIComponent(ComponentNames[k]));
    }

    // Do the query
    var bugs = sendRequest(Request.join(""));

    // Merge bugs arrays
    if (results == undefined)
      results = bugs;
    else {
      for (var index = 0; index < bugs.bugs.length; index++)
        results.bugs.push(bugs.bugs[index]);
    }
  }

  return results;
}

function buildBugLink(searchTerms) {
  var url = [BUGZILLA_URL]
  for (var m in searchTerms) {
    url.push("&", encodeURIComponent(searchTerms[m][0]), "=", encodeURIComponent(searchTerms[m][1]));
  }

  url = url.join("");
  Logger.log(url);
  return url;
}

function test_searchBugs() {
  var searchTerms = [];
  var version = "55";



}
