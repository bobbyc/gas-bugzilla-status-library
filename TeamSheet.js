
/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamSheet = function (name) {
    SheetBase.call(this, name);

    // Check Release sheet
    this.currentRelease = new ReleaseSheet("Release");
}

// create prototype from parent class
TeamSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamSheet.prototype.constructor = TeamSheet;

TeamSheet.prototype.Generate = function () {

    // Append column of current release
    this.CheckOrAppendRelease(this.currentRelease.version, this.currentRelease.merge_date);

    // Prepare TeamQuery
    var TeamDOM = new TeamBugQueryBase("DOM Team", TaipeiDOM);
    var TeamNetwork = new TeamBugQueryBase("Network Team", TaipeiNetwork);
    var TeamSecurity = new TeamBugQueryBase("Security Team", TaipeiSecurity);
    var TeamLayout = new TeamBugQueryBase("Layout Team", TaipeiLayout);
    var TeamGraphic = new TeamBugQueryBase("Graphic Team", TaipeiGraphic);
    var TeamMedia = new TeamBugQueryBase("Media Team", TaipeiMedia);
    var TeamPerf = new TeamBugQueryBase("Perf Team", TaipeiPerf);
    var TeamFrontend = new TeamBugQueryBase("Frontend Team", [TaipeiFrontend1, TaipeiFrontend2].join(""));
    var TeamFennec = new TeamBugQueryBase("Fennec Team", TaipeiFennec);

    // Loop Firefox Version from columns
    var numVersions = 2;        // How many version need to be processd?

    // Loop
    var rowFirstResult = 3;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf, TeamFrontend, TeamFennec];
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

function UpdateTeamSheet() {

    // Generate Sheet
    var Sheet = new TeamSheet("Team");
    Sheet.Generate();
}
