
/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamOverallSheet = function (name) {
    SheetBase.call(this, name);
}

// create prototype from parent class
TeamOverallSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamOverallSheet.prototype.constructor = TeamOverallSheet;

TeamOverallSheet.prototype.Generate = function () {

    // Prepare TeamQuery
    var TeamFirefox = new TeamBugQueryBase("Firefox", undefined);
    var TeamCore = new TeamBugQueryBase("Core", undefined);
    var TeamAndroid = new TeamBugQueryBase("Firefox for Android", undefined);

    // Loop Firefox Version Columns
    var startRow = 1;  // First row of data to process
    var startColumn = 2;  // First row of data to process
    // ====== Change this number to count version
    var numVersions = 1;
    // =======

    // Fetch the range of cells B1 -> [numVersions]1
    var dataRange = this.sheet.getRange(startRow, startColumn, 1, numVersions+1)
    var FFversion = dataRange.getValues()[0];

    var resultRow = 3;
    var resultColumn = startColumn;
    var loopTeam = [TeamFirefox, TeamCore, TeamAndroid];
    for (var index = 0; index < FFversion.length-1; index++) {

        // Extract version from version string
        var Nightly = FFversion[index].split(" ")[1];

        for (i = 0 ; i < loopTeam.length; i++) {

            // Search bugs in target teams
            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedBug(loopTeam[i].name, Nightly);
            loopTeam[i].RenderToSheet(this.sheet, resultRow + rowsTeamResult*i, resultColumn+index);
        }
    }
}

function UpdateOverallSheet() {

    // Generate Sheet
    var Sheet = new TeamOverallSheet("Overall");
    Sheet.Generate();
}
