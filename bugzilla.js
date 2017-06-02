var BUGZILLA_REST = "https://bugzilla.mozilla.org/rest/bug?";
var BUGZILLA_URL = "https://bugzilla.mozilla.org/buglist.cgi?";

// Send REST request to url
function sendRequest(url)
{
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
  for (var m in searchTerms) {
      url.push("&", encodeURIComponent(searchTerms[m][0]), "=", encodeURIComponent(searchTerms[m][1]));
  }

  url = url.join("");
  Logger.log(url);
  return sendRequest(url);
}

function searchBugsByComponents(searchTerms, components) {

  // Add searchTerms to url request
  var url = [BUGZILLA_REST];
  for (var m in searchTerms) {
      url.push("&", encodeURIComponent(searchTerms[m][0]), "=", encodeURIComponent(searchTerms[m][1]));
  }

  var results = undefined;
  var comps= Object.keys(components);
  var loopsize = 10;
  var compsLength = comps.length;
  for (var j=0 ; j < compsLength ; j = j+loopsize) {

    var r = [url.join("")];
    for (var k=j; (k < (j+loopsize)) && (k<compsLength) ; k++) {
      r.push("&component=", encodeURIComponent(comps[k]));
    }

    var request = r.join("");
    //Logger.log(request + "\n\n");
    var bugs = sendRequest(request);
    if (results == undefined)
      results = bugs;
    else {
      // merge 2 arrays
      for (var b=0; b< bugs.bugs.length; b++)
      results.bugs.push(bugs.bugs[k]);
    }
  }

  Logger.log(results + "\n\n");
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

function test_searchBugs(){
  var searchTerms = [];

//      FirefoxQuery = bugzillaURL + "/rest/bug?include_fields=id,priority,assigned_to,component&bug_status=RESOLVED&bug_status=VERIFIED&f1=cf_status_firefox"
//    + FFversion[j]
//    + "&f2=assigned_to&o1=equals&o2=anywordssubstr&resolution=FIXED&v1=fixed&v2=gasolin%20timdream%20tchien%20rchien%20schung%20ralin%20flin%20etseng%20scwwu%20ehung%20lchang%20dhuang%20kmlee%20selee%20yliao%20fliu%20jyeh%20vchen%20hhsu%20tchen%20pchen%20mochen%20thsieh%20hhuang%20jhuang%20chuang%20mliang%20jalin%20bmao%20fshih%20atsai%20gchang%20whsu%20ashiue%20ctang%20wiwang%20ywu%20brsun%20echuang%20alchen%20lochang";

  var version = "53";

  searchTerms.push(["include_fields","id,priority,assigned_to,component"]);
  searchTerms.push(["bug_status","RESOLVED"]);
  searchTerms.push(["bug_status","VERIFIED"]);
  searchTerms.push(["f1","cf_status_firefox" + version]);
  searchTerms.push(["f2","assigned_to"]);
  searchTerms.push(["o1","equals"]);
  searchTerms.push(["o2","anywordssubstr"]);
  searchTerms.push(["resolution","FIXED"]);
  searchTerms.push(["v1","fixed"]);
  searchTerms.push(["v2","gasolin timdream tchien rchien schung ralin flin etseng scwwu ehung lchang dhuang kmlee \
                         selee yliao fliu jyeh vchen hhsu tchen pchen mochen thsieh hhuang jhuang chuang mliang jalin \
                         bmao fshih atsai gchang whsu ashiue ctang wiwang ywu brsun echuang alchen lochang"]);

  var bugs = searchBugs(searchTerms);
  var componentList = countComponents(bugs);
  var total  = searchBugsByComponents(searchTerms, componentList);

}
