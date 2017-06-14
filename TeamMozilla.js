
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
    var numVersions = 1;        // Change this to calculate more weeks

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

function UpdateMozillaSheet() {

    // Generate Sheet
    var Sheet = new MozillaSheet("Mozilla");
    Sheet.Generate();
}

