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

  // Search bugs by 10 components per loop
  var results = undefined;
  var loopsize = 10;
  var ComponentNames= Object.keys(components);
  var ComponentLength = ComponentNames.length;
  for (var j=0 ; j < ComponentLength ; j = j+loopsize) {

    var query = [url.join("")];
    for (var k=j; (k < (j+loopsize)) && (k<ComponentLength) ; k++) {
      query.push("&component=", encodeURIComponent(ComponentNames[k]));
    }

    var request = query.join("");
    //Logger.log(request + "\n\n");
    var bugs = sendRequest(request);

    // Merge bugs arrays
    if (results == undefined)
      results = bugs;
    else {
      for (var index=0; index< bugs.bugs.length; index++)
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

function test_searchBugs(){
  var searchTerms = [];
  var version = "55";

  var PlatformQuery = [];
  PlatformQuery.push(["include_fields","id,priority,assigned_to,component"]);
  PlatformQuery.push(["bug_status","RESOLVED"]);
  PlatformQuery.push(["bug_status","VERIFIED"]);
  PlatformQuery.push(["resolution","FIXED"]);
  PlatformQuery.push(["f1","cf_status_firefox" + version]);
  PlatformQuery.push(["o1","equals"]);
  PlatformQuery.push(["v1","fixed"]);
  PlatformQuery.push(["f2","assigned_to"]);
  PlatformQuery.push(["o2","anywordssubstr"]);
  PlatformQuery.push(["v2","shuang ttung joliu tlee kchen tchou janus926 cyu wpan cku fatseng \
                          pchang boris.chiou tlin hshih mtseng vliu ethlin \
                          aschen echen btseng jhao jjong \
                          htsai bhsu jdai sawang sshih hchang allstars.chh \
                          dlee ettseng tnguyen tihuang gweng bechen jolin ctai \
                          jwwang ayang alwu tkuo mchiang bwu tkuo howareyou322 \
                          kaku xeonchen amchung juhsu swu kechen jacheng \
                          kuoe0 dmu cleu etsai kikuo kechang cchang schien"]);

  var platformBugs = searchBugs(PlatformQuery);
  var Developers = countDevelopers (platformBugs);
  var TDCPLHeadcount = Object.keys(Developers).length;
  var TDCPLBugsNum = platformBugs.bugs.length;

  Logger.log( "Bugs:" +  platformBugs.bugs.length);
  Logger.log( "Developers:" +  TDCPLHeadcount);

  //
  // Query TDC handleded
  //
  var TaipeiQuery = [];
  TaipeiQuery.push(["include_fields","id,priority,assigned_to,component"]);
  TaipeiQuery.push(["bug_status","RESOLVED"]);
  TaipeiQuery.push(["bug_status","VERIFIED"]);
  TaipeiQuery.push(["resolution","FIXED"]);
  TaipeiQuery.push(["f1","cf_status_firefox" + version]);
  TaipeiQuery.push(["o1","equals"]);
  TaipeiQuery.push(["v1","fixed"]);

  var componentList = countComponents(platformBugs);
  var TaipeiBugs = searchBugsByComponents(TaipeiQuery, componentList);
  Developers = countDevelopers (TaipeiBugs);
  var nTotalNumber = Object.keys(Developers).length;
  var nTDCBugs = TaipeiBugs.bugs.length;

  Logger.log( "Bugs:" +  TaipeiBugs.bugs.length);
  Logger.log( "Developers:" +  nTotalNumber);

}
