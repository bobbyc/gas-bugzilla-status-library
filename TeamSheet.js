
var TaipeiDOM       = "htsai, jdai, bhsu, sawang, ttung, sshih, echuang, alchen, shuang, btian, jjong, btseng, echen";
var TaipeiSecurity  = "ettseng, tnguyen, cfu, tihuang, jhao, dlee, hchang, allstars.chh";
var TaipeiNetwork   = "swu, xeonchen, amchung, kechang, juhsu, schieng";

var TaipeiMedia     = "bwu, alwu, cchang, jacheng, mchiang, kaku, kikuo, jolin, ayang, jwwang, bechen";
var TaipeiLayout    = "aschen, tokuo, fatseng, lochang, ywu, jeremychen, slyu, cku, etsai, boris.chiou, tlin, cmccormack";
var TaipeiGraphic   = "howareyou322, dmu, ethlin, cleu, kechen, brsun, mtseng, hshih, vliu";
var TaipeiPerf      = "kchen, wpan, janus926, gweng, cyu, tlee";
var TaipeiFrontend1 = "ehung, fliu, selee, lchang, kmlee";
var TaipeiFrontend2 = "timdream, ralin@mozilla.com, evan@tseng.io, gasolin, rchien, scwwu, schung";
var TaipeiFennec    = "cnevinchen@gmail.com, walkingice0204@gmail.com, topwu.tw@gmail.com, osimpleo@gmail.com, max@mxli.us";

/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamSheet = function (name) {
    SheetBase.call(this, name);
}

// create prototype from parent class
TeamSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamSheet.prototype.constructor = TeamSheet;

TeamSheet.prototype.Generate = function () {

    // Prepare TeamQuery
    var TeamDOM = new TeamBugQueryBase("DOM", TaipeiDOM);
    var TeamNetwork = new TeamBugQueryBase("Network", TaipeiNetwork);
    var TeamSecurity = new TeamBugQueryBase("Security", TaipeiSecurity);
    var TeamLayout = new TeamBugQueryBase("Layout", TaipeiLayout);
    var TeamGraphic = new TeamBugQueryBase("Graphic", TaipeiGraphic);
    var TeamMedia = new TeamBugQueryBase("Media", TaipeiMedia);
    var TeamPerf = new TeamBugQueryBase("Perf", TaipeiPerf);
    var TeamFrontend = new TeamBugQueryBase("Frontend", [TaipeiFrontend1, TaipeiFrontend2].join(""));

    // Loop Firefox Version Columns
    var startRow = 1;  // First row of data to process
    var startColumn = 2;  // First row of data to process
    var numVersions = 1;

    // Fetch the range of cells B1 -> [numVersions]1
    var dataRange = this.sheet.getRange(startRow, startColumn, 1, numVersions)
    var FFversion = dataRange.getValues()[0];

    // Looping version
    var resultRow = 3;
    var resultColumn = 2;
    for (var ver = 0; ver < FFversion.length; ver++) {

        // Extract version from version string
        var v = FFversion[ver].split(" ")[1];

        // Query Team Data
        TeamDOM.SearchFixedBug(undefined, v);
        TeamNetwork.SearchFixedBug(undefined, v);
        TeamSecurity.SearchFixedBug(undefined, v);
        TeamLayout.SearchFixedBug(undefined, v);
        TeamGraphic.SearchFixedBug(undefined, v);
        TeamMedia.SearchFixedBug(undefined, v);
        TeamPerf.SearchFixedBug(undefined, v);
        TeamFrontend.SearchFixedBug(undefined, v);

        // Render to Sheet
        TeamDOM.RenderToSheet(this.sheet, resultRow, resultColumn+ver);
        TeamNetwork.RenderToSheet(this.sheet, resultRow+10, resultColumn+ver);
        TeamSecurity.RenderToSheet(this.sheet, resultRow+20, resultColumn+ver);
        TeamLayout.RenderToSheet(this.sheet, resultRow+30, resultColumn+ver);
        TeamGraphic.RenderToSheet(this.sheet, resultRow+40, resultColumn+ver);
        TeamMedia.RenderToSheet(this.sheet, resultRow+50, resultColumn+ver);
        TeamPerf.RenderToSheet(this.sheet, resultRow+60, resultColumn+ver);
        TeamFrontend.RenderToSheet(this.sheet, resultRow+70, resultColumn+ver);
    }
}

function RunTeamSheet() {

    // Generate Sheet
    var Sheet = new TeamSheet("Team");
    Sheet.Generate();
}
