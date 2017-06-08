//Mozilla Teams
var MozillaDOM     = "overholt, bkelly, annevk, mcaceres, catalin.badea392, afarre, \
                     michael@thelayzells.com, amarchesini, jvarga, ehsan, hsivonen, \
                     josh@joshmatthews.net, bugmail@asutherland.org, kyle@nonpolynomial.com, \
                     wchen, bugs@pettay.fi";
var MozillaSecurity= "sdeckelmann, mwobensmith, jld, huseby, kjozwiak, dveditz, tanvi, tom, kwilson, mgoodwin, \
                     jjones, franziskuskiefer, ttaubert, dkeeler, ptheriault, julian.r.hector, kmckinley, jkt, \
                     stephouillon, cr, francois, ckerschb, fbraun, abillings, twsmith, jschwartzentruber, choller, \
                     rforbes, cdiehl, gary@rumblingedge.com";
var MozillaNetwork = "Jduell.mcbugs, daniel@haxx.se, dd.mozilla, valentin.gosu, hurley, \
                     michal.novotny, honzab.moz";
var MozillaLayout  = "bugs@junglecode.net, schneider@jancona.com, cam@mcc.id.au, \
                     kgilbert, xidorn+moz@upsuper.org, npancholi, bwerth, dholbert, \
                     tantek@cs.stanford.edu, jwatt@jwatt.org, matt.woodrow, mats, mstange@themasta.com, \
                     jfkthame, bbirtles, mantaroh, hiikezoe, m_kato, masayuki";
var MozillaGraphic = "milan, mchang, botond, aosmond, lsalzman, kvarkus, dmalyshau, rhunt, \
                     sotaro.ikeda.g, gwright, anthony.s.hughes, dvander, jmuizelaar, tnikkel, \
                     jgilbert, bugmail@mozilla.staktrace.com, bas@basschouten.com,  jnicol, \
                     nical.bugzilla, edwin";
var MozillaMedia   = "ajones, jyavenard, gsquelart, bvandyk, jharris, dglastonbury, dmajor, \
                     cpearce, kinetik, giles, karlt";

// TODO: add teams
var MozillaPerf    = "aaa@mozilla.com";

// TODO: add teams
var MozillaFrontend  = "aaa@mozilla.com";

// TODO: add teams
var MozillaFennec  = "aaa@mozilla.com";

/**
 * Constructor -
 * @param err
 * @param result
 */
var MozillaSheet = function (name) {
    SheetBase.call(this, name);
}

// create prototype from parent class
MozillaSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
MozillaSheet.prototype.constructor = MozillaSheet;

MozillaSheet.prototype.Generate = function () {

    // Prepare TeamQuery
    var TeamDOM = new TeamBugQueryBase("DOM", MozillaDOM);
    var TeamNetwork = new TeamBugQueryBase("Network", MozillaNetwork);
    var TeamSecurity = new TeamBugQueryBase("Security", MozillaSecurity);
    var TeamLayout = new TeamBugQueryBase("Layout", MozillaLayout);
    var TeamGraphic = new TeamBugQueryBase("Graphic", MozillaGraphic);
    var TeamMedia = new TeamBugQueryBase("Media", MozillaMedia);
    var TeamPerf = new TeamBugQueryBase("Perf", MozillaPerf);
    var TeamFrontend = new TeamBugQueryBase("Frontend", MozillaFrontend);

    // Loop Firefox Version Columns
    var startRow = 1;       // First row of data to process
    var startColumn = 2;    // First row of data to process
    var numVersions = 2;        // Change this to calculate more weeks

    // Fetch the range of cells B1 -> [numVersions]1
    var FFversion = this.sheet.getRange(startRow, startColumn, 1, numVersions+1).getValues()[0]
    var FFWeekDate = this.sheet.getRange(startRow + 1, startColumn, 1, numVersions+1).getValues()[0]

    // Looping version
    var resultRow = 3;
    var resultColumn = startColumn;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf, TeamFrontend];
    for (var index = 0; index < FFWeekDate.length-1; index++) {

        // Extract version from version string
        var Nightly = FFversion[index].split(" ")[1];

        for (i = 0 ; i < loopTeam.length; i++) {

            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedBug(undefined, Nightly);
            loopTeam[i].RenderToSheet(this.sheet, resultRow + rowsTeamResult*i, resultColumn+index);

        }
    }
}

function RunMozillaSheet() {

    // Generate Sheet
    var Sheet = new MozillaSheet("Mozilla");
    Sheet.Generate();
}

