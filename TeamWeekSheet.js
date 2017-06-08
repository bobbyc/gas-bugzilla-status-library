
/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamWeekSheet = function (name) {
    SheetBase.call(this, name);
}

// create prototype from parent class
TeamWeekSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamWeekSheet.prototype.constructor = TeamWeekSheet;

TeamWeekSheet.prototype.Generate = function () {

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
    var startRow = 1;       // First row of data to process
    var startColumn = 2;    // First row of data to process
    var numWeeks = 5;        // Change this to calculate more weeks

    // Fetch the range of cells B1 -> [numVersions]1
    var FFversion = this.sheet.getRange(startRow, startColumn, 1, numWeeks+1).getValues()[0]
    var FFWeekDate = this.sheet.getRange(startRow + 1, startColumn, 1, numWeeks+1).getValues()[0]

    // Looping version
    var resultRow = 3;
    var resultColumn = startColumn;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf];
    for (var index = 0; index < FFWeekDate.length-1; index++) {

        // Extract version from version string
        var Nightly = FFversion[index].split(" ")[1];
        var Beta = (Number(Nightly)-1).toString();
        var Release = (Number(Nightly)-2).toString();
        var EndDate = FFWeekDate[index].toISOString().slice(0,10);
        var StartDate = FFWeekDate[index+1].toISOString().slice(0,10);

        for (i = 0 ; i < loopTeam.length; i++) {

            // Query Team Data
            var rowsTeamResult = 6;
            loopTeam[i].SearchFixedBugFromDateTo(Nightly, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, resultRow + rowsTeamResult*i + 1, resultColumn+index);
            loopTeam[i].SearchFixedBugFromDateTo(Beta, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, resultRow + rowsTeamResult*i + 2, resultColumn+index);
            loopTeam[i].SearchFixedBugFromDateTo(Release, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, resultRow + rowsTeamResult*i + 3, resultColumn+index);

        }
    }
}

function RunTeamWeekSheet() {

    // Generate Sheet
    var Sheet = new TeamWeekSheet("WeekSheet");
    Sheet.Generate();
}
