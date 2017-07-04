
/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamRegressionSheet = function (name) {
    SheetBase.call(this, name);

    // Check Release sheet
    this.currentRelease = new ReleaseSheet("Release");
}

// create prototype from parent class
TeamRegressionSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamRegressionSheet.prototype.constructor = TeamRegressionSheet;

TeamRegressionSheet.prototype.Generate = function () {

    // Append column of current release
    this.CheckOrAppendRelease(this.currentRelease.version, this.currentRelease.merge_date);

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

    var TeamFirefox = new TeamBugQueryBase("Firefox", undefined);
    var TeamCore = new TeamBugQueryBase("Core", undefined);
    var TeamAndroid = new TeamBugQueryBase("Firefox for Android", undefined);

    // Loop Firefox Version from columns
    var numVersions = 2;        // How many version need to be processd?

    // Loop
    var rowFirstResult = 3;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf,
        TeamMozDOM, TeamMozSecurity, TeamMozNetwork, TeamMozLayout, TeamMozGraphic, TeamMozMedia,
        TeamFirefox, TeamCore, TeamAndroid];
    for (var ver = 0; ver < numVersions; ver++) {

        // Fetch the range of cells B1 -> [numVersions]1
        var FFversion = this.sheet.getRange(this.rowVersion, this.colStartDate + ver, 1, 1).getValue();
        var FFDate = this.sheet.getRange(this.rowDate, this.colStartDate, 1, 1).getValue();

        // Loop each team to get regression+crash count
        for (i = 0; i < loopTeam.length; i++) {

            var rowsTeamResult = 10;
            loopTeam[i].SearchFixedRegression(loopTeam[i].name, FFversion);
            loopTeam[i].RenderToSheet(this.sheet, rowFirstResult + rowsTeamResult * i, this.colStartDate + ver);

        }
    }
}

function UpdateRegressionSheet() {

    // Generate Sheet
    var Sheet = new TeamRegressionSheet("Regression");
    Sheet.Generate();
}
