
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
    var TeamDOM = new TeamBugQueryBase("DOM", MozillaDOM);
    var TeamNetwork = new TeamBugQueryBase("Network", MozillaNetwork);
    var TeamSecurity = new TeamBugQueryBase("Security", MozillaSecurity);
    var TeamLayout = new TeamBugQueryBase("Layout", MozillaLayout);
    var TeamGraphic = new TeamBugQueryBase("Graphic", MozillaGraphic);
    var TeamMedia = new TeamBugQueryBase("Media", MozillaMedia);
    var TeamPerf = new TeamBugQueryBase("Perf", MozillaPerf);
    var TeamFrontend = new TeamBugQueryBase("Frontend", MozillaFrontend);

    // Loop Firefox Version Columns
    var startRow = 1;  // First row of data to process
    var startColumn = 2;  // First row of data to process
    var numVersions = 6;

    // Fetch the range of cells B1 -> [numVersions]1
    var dataRange = this.sheet.getRange(startRow, startColumn, 1, numVersions+1)
    var FFversion = dataRange.getValues()[0];

    var resultRow = 3;
    var resultColumn = startColumn;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf, TeamFrontend];
    for (var index = 0; index < FFversion.length-1; index++) {

        // Extract version from version string
        var Nightly = FFversion[index].split(" ")[1];

        for (i = 0 ; i < loopTeam.length; i++) {

            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedRegression(Nightly);
            loopTeam[i].RenderToSheet(this.sheet, resultRow + rowsTeamResult*i, resultColumn+index);

        }
    }
}

function UpdateRegressionSheet() {

    // Generate Sheet
    var Sheet = new TeamRegressionSheet("Regression");
    Sheet.Generate();
}
