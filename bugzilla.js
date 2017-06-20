var BUGZILLA_REST = "https://bugzilla.mozilla.org/rest/bug?";
var BUGZILLA_URL = "https://bugzilla.mozilla.org/buglist.cgi?";

/**
 * Constructor - SheetBase
 * @param err
 * @param result
 */
var Bugzilla = function (name) {
  this.name = name || 'BugSheetBase';
  this.sheet = ss.getSheetByName(name);
}

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
    var responseJson = JSON.parse(responseBody);
    responseJson.body = responseBody;
    return responseJson;
  } else {
    Logger.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody))
  }
}

function searchBugs(searchTerms) {
  var query = [BUGZILLA_REST];

  // Concat search Terms
  for (var m in searchTerms) {
    query.push("&", encodeURIComponent(searchTerms[m][0]), "=", encodeURIComponent(searchTerms[m][1]));
  }

  // Do the query
  var request = query.join("");
  return sendRequest(request);
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
      for (var index in bugs.bugs)
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

function countDevelopers(resultBugs) {
  var assignees = {};

  for (var i = 0; i < resultBugs.bugs.length; i++) {
    if (assignees.hasOwnProperty(resultBugs.bugs[i].assigned_to)) {
      assignees[resultBugs.bugs[i].assigned_to].push(resultBugs.bugs[i].id)
    }
    else {
      var Name = resultBugs.bugs[i].assigned_to;
      var Bug = [resultBugs.bugs[i].id];
      assignees[Name] = Bug;
    }
  }

  return assignees;
}

function countComponents(resultBugs) {
  var components = {};

  for (var i = 0; i < resultBugs.bugs.length; i++) {
    if (components.hasOwnProperty(resultBugs.bugs[i].component)) {
      components[resultBugs.bugs[i].component].push(resultBugs.bugs[i].id)
    }
    else {
      var Name = resultBugs.bugs[i].component;
      var Bug = [resultBugs.bugs[i].id];
      components[Name] = Bug;
    }
  }

  var lists = Object.keys(components);

  Logger.log("Count" + lists.length);
  for (var j = 0; j < lists.length; j++)
    Logger.log(lists[j]);

  return components;

}
