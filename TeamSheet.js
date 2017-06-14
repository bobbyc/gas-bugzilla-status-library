
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
            loopTeam[i].SearchFixedBug(undefined, Nightly);
            loopTeam[i].RenderToSheet(this.sheet, resultRow + rowsTeamResult*i, resultColumn+index);

        }
    }
}

function UpdateTeamSheet() {

    // Generate Sheet
    var Sheet = new TeamSheet("Team");
    Sheet.Generate();
}
