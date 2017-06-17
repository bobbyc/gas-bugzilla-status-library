
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
    var TeamDOM = new TeamBugQueryBase("DOM", MozillaDOM);
    var TeamNetwork = new TeamBugQueryBase("Network", MozillaNetwork);
    var TeamSecurity = new TeamBugQueryBase("Security", MozillaSecurity);
    var TeamLayout = new TeamBugQueryBase("Layout", MozillaLayout);
    var TeamGraphic = new TeamBugQueryBase("Graphic", MozillaGraphic);
    var TeamMedia = new TeamBugQueryBase("Media", MozillaMedia);
    var TeamPerf = new TeamBugQueryBase("Perf", MozillaPerf);
    var TeamFrontend = new TeamBugQueryBase("Frontend", MozillaFrontend);

    // Loop Firefox Version from columns
    var rowVersion = 1;         // The row of Versions
    var rowDate = 2;            // The row of Dates
    var colStartVersion = 2;    // The first columns of version to be processed
    var numVersions = 1;        // How many version need to be processd?

    // Loop
    var rowFirstResult = 3;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf, TeamFrontend];
    for (var ver = 0; ver < numVersions; ver++) {

        // Fetch the range of cells B1 -> [numVersions]1
        var FFversion = this.sheet.getRange(rowVersion, colStartVersion+ver, 1, 1).getValue();
        var FFDate = this.sheet.getRange(rowDate, colStartVersion, 1, 1).getValue();

        // Extract version from version string
        var Nightly = FFversion.split(" ")[1];
        for (i = 0 ; i < loopTeam.length; i++) {

            // Render results
            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedBug(undefined, Nightly);
            loopTeam[i].RenderToSheet(this.sheet, rowFirstResult + rowsTeamResult*i, colStartVersion+ver);
        }
    }
}

function UpdateMozillaSheet() {

    // Generate Sheet
    var Sheet = new MozillaSheet("Mozilla");
    Sheet.Generate();
}

