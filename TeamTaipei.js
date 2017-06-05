// Define the offsets to post data
var startRowRuntime = 3;
var startRowVisual = 12;
var startRowFennec = 21;
var startColumn = 2;
var contributorRowRuntime = 31;
var contributorRowVisual = 32;
var contributorRowFennec = 33;

// Taipei Teams
var TaipeiDOM = "htsai, jdai, bhsu, sawang, ttung, sshih, echang, alchen, shuang, btian, jjong, btseng, echen";
var TaipeiMedia = "bwu, alwu, cchang, jacheng, mchiang, kaku, kikuo, jolin, ayang, jwwang, bechen";
var TaipeiSecurity = "ettseng, tnguyen, cfu, tihuang, jhao, dlee, hchang, allstars.chh";
var TaipeiLayout = "aschen, tokuo, fatseng, lochang, ywu, jeremychen, slyu, cku, etsai, boris.chiou, tlin, cmccormack";
var TaipeiGraphic = "howareyou322, dmu, ethlin, cleu, kechen, brsun, mtseng, hshih, vliu";
var TaipeiNetwork = "swu, xeonchen, amchung, kechang, juhsu, schieng";
var TaipeiPerf = "kchen, wpan, janus926, gweng, cyu, tlee";
var TaipeiFrontend1 = "ehung, fliu, selee, lchang, kmlee";
var TaipeiFrontend2 = "timdream, ralin@mozilla.com, evan@tseng.io, gasolin, rchien, scwwu, schung";
var TaipeiFennec = "cnevinchen@gmail.com, walkingice0204@gmail.com, topwu.tw@gmail.com, osimpleo@gmail.com, max@mxli.us";

function TestCountBugTaipei() {

    // Create Product team group
    var runtime = [TaipeiDOM, TaipeiNetwork, TaipeiSecurity].join(",");
    var visual = [TaipeiFrontend1, TaipeiFrontend2, TaipeiGraphic, TaipeiLayout, TaipeiMedia, TaipeiPerf].join(",");
    var fennec = [TaipeiFennec].join(",");

    // Count team group, and post result
    CountBugDistribution(taipeiSheet, runtime, visual, fennec);
}

function CountBugDistribution(TargetSheet, RuntimeTeam, VisualTeam, FennecTeam) {


    for (var ver = 0; ver < FFversion.length; ver++) {

        // Initial val
        CountFixedBugsByTeam(TargetSheet, startRowRuntime, startColumn+ver, contributorRowRuntime, FFversion[ver], RuntimeTeam, undefined);
        CountFixedBugsByTeam(TargetSheet, startRowVisual, startColumn+ver, contributorRowVisual, FFversion[ver], VisualTeam, undefined);
        CountFixedBugsByTeam(TargetSheet, startRowFennec, startColumn+ver, contributorRowFennec, FFversion[ver], FennecTeam, "Firefox for Android");

    }
}

function CountFixedBugsByTeam(TargetSheet, bugsRow, bugsColumn, contributorRow, version, Team, ProductName) {

    // Define search terms
    var TeamQuery = [];
    TeamQuery.push(["include_fields","id,priority,assigned_to,component"]);
    TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TeamQuery.push(["resolution", "FIXED"]);
    if ( ProductName != undefined ) {
        TeamQuery.push(["product", ProductName]);
    }
    TeamQuery.push(["f1", "cf_status_firefox" + version]);
    TeamQuery.push(["o1", "equals"]);
    TeamQuery.push(["v1", "fixed"]);
    if (Team != undefined ) {
        TeamQuery.push(["f2", "assigned_to"]);
        TeamQuery.push(["o2", "anywordssubstr"]);
        TeamQuery.push(["v2", Team]);
    }

    var Bugs = searchBugs(TeamQuery);
    var Link = buildBugLink(TeamQuery);

    if ( TargetSheet != undefined ) {
        // Post data
        PostGroupResults(TargetSheet, bugsRow, bugsColumn, contributorRow, Bugs, Link);
    }

    return Bugs;
}


function PostGroupResults(TargetSheet, bugsRow, bugsColumn, contributorRow, Bugs, link) {

    var nBugs = Bugs.bugs.length;
    var Devs = countDevelopers(Bugs)
    var nTeamSize = Object.keys(Devs).length;
    //var nTeamSize = Team.split(",").length;
    prioritizeBugs(Bugs);

    // Post results to TargetSheets
    TargetSheet.getRange(bugsRow+1, bugsColumn).setValue(countP1);
    TargetSheet.getRange(bugsRow+2, bugsColumn).setValue(countP2);
    TargetSheet.getRange(bugsRow+3, bugsColumn).setValue(countP3);
    TargetSheet.getRange(bugsRow+4, bugsColumn).setValue(countP4);
    TargetSheet.getRange(bugsRow+5, bugsColumn).setValue(countP5);
    TargetSheet.getRange(bugsRow+6, bugsColumn).setValue(countPN);
    TargetSheet.getRange(bugsRow+7, bugsColumn).setValue(nBugs);
    TargetSheet.getRange(contributorRow, bugsColumn).setValue(nTeamSize);

}



