
/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamOverallSheet = function (name) {
    SheetBase.call(this, name);

    // Check Release sheet
    this.currentRelease = new ReleaseSheet("Release");
}

// create prototype from parent class
TeamOverallSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamOverallSheet.prototype.constructor = TeamOverallSheet;

TeamOverallSheet.prototype.Generate = function () {

    // Append column of current release
    this.CheckOrAppendRelease(this.currentRelease.version, this.currentRelease.merge_date);

    // Prepare TeamQuery
    var TeamFirefox = new TeamBugQueryBase("Firefox", undefined);
    var TeamCore = new TeamBugQueryBase("Core", undefined);
    var TeamAndroid = new TeamBugQueryBase("Firefox for Android", undefined);

    // Loop Firefox Version from columns
    var rowVersion = 1;         // The row of Versions
    var rowDate = 2;            // The row of Dates
    var colStartVersion = 2;    // The first columns of version to be processed
    var numVersions = 1;        // How many version need to be processd?

    // Loop
    var rowFirstResult = 3;
    var loopTeam = [TeamFirefox, TeamCore, TeamAndroid];
    for (var ver = 0; ver < numVersions; ver++) {

        // Fetch the range of cells B1 -> [numVersions]1
        var FFversion = this.sheet.getRange(rowVersion, colStartVersion+ver, 1, 1).getValue();
        var FFDate = this.sheet.getRange(rowDate, colStartVersion, 1, 1).getValue();

        // Extract version from version string
        var Nightly = FFversion.split(" ")[1];
        for (i = 0 ; i < loopTeam.length; i++) {

            // Search bugs in target teams
            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedBug(loopTeam[i].name, Nightly);
            loopTeam[i].RenderToSheet(this.sheet, rowFirstResult + rowsTeamResult*i, colStartVersion+ver);
        }
    }
}

function UpdateOverallSheet() {

    // Generate Sheet
    var Sheet = new TeamOverallSheet("Overall");
    Sheet.Generate();
}
