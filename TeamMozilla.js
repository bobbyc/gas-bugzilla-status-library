
/**
 * Constructor -
 * @param err
 * @param result
 */
var MozillaSheet = function (name) {
    SheetBase.call(this, name);

    // Check Release sheet
    this.currentRelease = new ReleaseSheet("Release");
}

// create prototype from parent class
MozillaSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
MozillaSheet.prototype.constructor = MozillaSheet;

MozillaSheet.prototype.Generate = function () {

    // Append column of current release
    this.CheckOrAppendRelease(this.currentRelease.version, this.currentRelease.merge_date);

    // Prepare TeamQuery
    var TeamDOM = new TeamBugQueryBase("MozillaDOM");
    var TeamNetwork = new TeamBugQueryBase("MozillaNetwork");
    var TeamSecurity = new TeamBugQueryBase("MozillaSecurity");
    var TeamLayout = new TeamBugQueryBase("MozillaLayout");
    var TeamGraphic = new TeamBugQueryBase("MozillaGraphic");
    var TeamMedia = new TeamBugQueryBase("MozillaMedia");
    var TeamPerf = new TeamBugQueryBase("MozillaPerf");
    var TeamFrontend = new TeamBugQueryBase("MozillaFrontend");

    // Loop Firefox Version from columns
    var numVersions = 2;        // How many version need to be processd?

    // Loop
    var rowFirstResult = 3;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf, TeamFrontend];
    for (var ver = 0; ver < numVersions; ver++) {

        // Fetch the range of cells B1 -> [numVersions]1
        var FFversion = this.sheet.getRange(this.rowVersion, this.colStartDate + ver, 1, 1).getValue();
        var FFDate = this.sheet.getRange(this.rowDate, this.colStartDate, 1, 1).getValue();

        // Extract version from version string
        for (i = 0; i < loopTeam.length; i++) {

            // Render results
            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedBug(undefined, FFversion);
            loopTeam[i].RenderToSheet(this.sheet, rowFirstResult + rowsTeamResult * i, this.colStartDate + ver);
        }
    }
}

function UpdateMozillaSheet() {

    // Generate Sheet
    var Sheet = new MozillaSheet("Mozilla");
    Sheet.Generate();
}

