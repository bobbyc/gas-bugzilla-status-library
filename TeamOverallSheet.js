
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
    var TeamFirefox = new TeamBugQueryBase("Firefox");
    var TeamCore = new TeamBugQueryBase("Core");
    var TeamAndroid = new TeamBugQueryBase("Firefox for Android");

    // Loop Firefox Version from columns
    var numVersions = 2;        // How many version need to be processd?

    // Loop
    var rowFirstResult = 3;
    var loopTeam = [TeamFirefox, TeamCore, TeamAndroid];
    for (var ver = 0; ver < numVersions; ver++) {

        // Fetch the range of cells B1 -> [numVersions]1
        var FFversion = this.sheet.getRange(this.rowVersion, this.colStartDate + ver, 1, 1).getValue();
        var FFDate = this.sheet.getRange(this.rowDate, this.colStartDate, 1, 1).getValue();

        // Extract version from version string
        for (i = 0; i < loopTeam.length; i++) {

            // Search bugs in target teams
            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedBug(loopTeam[i].name, FFversion);
            loopTeam[i].RenderToSheet(this.sheet, rowFirstResult + rowsTeamResult * i, this.colStartDate + ver);
        }
    }
}

function UpdateOverallSheet() {

    // Generate Sheet
    var Sheet = new TeamOverallSheet("Overall");
    Sheet.Generate();
}
