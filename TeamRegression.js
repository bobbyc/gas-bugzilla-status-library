
/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamRegressionSheet = function (name) {
    SheetBase.call(this, name);
}

// create prototype from parent class
TeamRegressionSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamRegressionSheet.prototype.constructor = TeamRegressionSheet;

TeamRegressionSheet.prototype.Generate = function () {

    // Prepare TeamQuery
    var TeamDOM = new TeamBugQueryBase("Core", TaipeiDOM);
    var TeamNetwork = new TeamBugQueryBase("Core", TaipeiNetwork);
    var TeamSecurity = new TeamBugQueryBase("Core", TaipeiSecurity);
    var TeamLayout = new TeamBugQueryBase("Core", TaipeiLayout);
    var TeamGraphic = new TeamBugQueryBase("Core", TaipeiGraphic);
    var TeamMedia = new TeamBugQueryBase("Core", TaipeiMedia);
    var TeamPerf = new TeamBugQueryBase("Core", TaipeiPerf);

    var TeamMozDOM = new TeamBugQueryBase("Core", MozillaDOM);
    var TeamMozNetwork = new TeamBugQueryBase("Core", MozillaNetwork);
    var TeamMozSecurity = new TeamBugQueryBase("Core", MozillaSecurity);
    var TeamMozLayout = new TeamBugQueryBase("Core", MozillaLayout);
    var TeamMozGraphic = new TeamBugQueryBase("Core", MozillaGraphic);
    var TeamMozMedia = new TeamBugQueryBase("Core", MozillaMedia);

    var TeamFirefox = new TeamBugQueryBase("Firefox", "");
    var TeamCore = new TeamBugQueryBase("Core", "");
    var TeamAndroid = new TeamBugQueryBase("Firefox for Android", "");

    // Loop Firefox Version Columns
    var startRow = 1;  // First row of data to process
    var startColumn = 2;  // First row of data to process
    var numVersions = 6;

    // Fetch the range of cells B1 -> [numVersions]1
    var dataRange = this.sheet.getRange(startRow, startColumn, 1, numVersions+1)
    var FFversion = dataRange.getValues()[0];

    var resultRow = 3;
    var resultColumn = startColumn;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf,
                    TeamMozDOM, TeamMozSecurity, TeamMozNetwork, TeamMozLayout, TeamMozGraphic, TeamMozMedia,
                    TeamFirefox, TeamCore, TeamAndroid];

    for (var index = 0; index < FFversion.length-1; index++) {

        // Extract version from version string
        var Nightly = FFversion[index].split(" ")[1];

        // Loop each team to get regression+crash count
        for (i = 0 ; i < loopTeam.length; i++) {

            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedRegression(loopTeam[i].name, Nightly);
            loopTeam[i].RenderToSheet(this.sheet, resultRow + rowsTeamResult*i, resultColumn+index);

        }
    }
}

function UpdateRegressionSheet() {

    // Generate Sheet
    var Sheet = new TeamRegressionSheet("Regression");
    Sheet.Generate();
}
