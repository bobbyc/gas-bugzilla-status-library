/**
 * Constructor -
 * @param err
 * @param result
 */
var TeamWeekSheet = function (name) {
    SheetBase.call(this, name);

    // Check Release sheet
    this.currentRelease = new ReleaseSheet("Release");
}

// create prototype from parent class
TeamWeekSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
TeamWeekSheet.prototype.constructor = TeamWeekSheet;

/**
 * @param CurrentRelease
 * @param date
 */
SheetBase.prototype.CheckOrAppendRelease = function (CurrentRelease, date) {

    // TODO: calculate next week
    var today = new Date();
    var ThisWeek = new Date(this.sheet.getRange('B2').getValue());
    var NextWeek = new Date(ThisWeek.getFullYear(), ThisWeek.getMonth(), ThisWeek.getDate()+7);

    if ( today > ThisWeek ) {
        this.sheet.insertColumnAfter(1);
        this.sheet.getRange("B1").setValue(CurrentRelease);
        this.sheet.getRange("B2").setValue(NextWeek);
    }

}

TeamWeekSheet.prototype.Generate = function () {

    // Append column of current release
    this.CheckOrAppendRelease(this.currentRelease.version, this.currentRelease.merge_date);

    // Prepare TeamQuery
    var TeamDOM = new TeamBugQueryBase("DOM", TaipeiDOM);
    var TeamNetwork = new TeamBugQueryBase("Network", TaipeiNetwork);
    var TeamSecurity = new TeamBugQueryBase("Security", TaipeiSecurity);
    var TeamLayout = new TeamBugQueryBase("Layout", TaipeiLayout);
    var TeamGraphic = new TeamBugQueryBase("Graphic", TaipeiGraphic);
    var TeamMedia = new TeamBugQueryBase("Media", TaipeiMedia);
    var TeamPerf = new TeamBugQueryBase("Perf", TaipeiPerf);
    var TeamFrontend = new TeamBugQueryBase("Frontend", [TaipeiFrontend1, TaipeiFrontend2].join(""));

    // Loop Firefox Version from columns
    var rowVersion = 1;         // The row of Versions
    var rowDate = 2;            // The row of Dates
    var colStartWeek = 2;       // The first columns of week to be processed
    var numWeeks = 1;           // Change this to calculate more weeks

    // Looping version
    var rowFirstResult = 3;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf];
    for (var weekIndex = 0; weekIndex < numWeeks; weekIndex++) {

        // Fetch version and week
        var colWeek = colStartWeek+weekIndex;
        var FFversion = this.sheet.getRange(rowVersion, colWeek, 1, 1).getValue();
        var FFWeek = this.sheet.getRange(rowDate, colWeek, 1, 1).getValue();
        var FFPreWeek = this.sheet.getRange(rowDate, colWeek+1, 1, 1).getValue();

        // Extract version from version string
        var Nightly = FFversion.split(" ")[1];
        var Beta = (Number(Nightly)-1).toString();
        var Release = (Number(Nightly)-2).toString();
        var EndDate = FFWeek.toISOString().slice(0,10);
        var StartDate = FFPreWeek.toISOString().slice(0,10);

        for (i = 0 ; i < loopTeam.length; i++) {

            // Query Team Data
            var rowsTeamResult = 6;
            loopTeam[i].SearchFixedBugFromDateTo(Nightly, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, rowFirstResult + rowsTeamResult*i + 1, colWeek);
            loopTeam[i].SearchFixedBugFromDateTo(Beta, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, rowFirstResult + rowsTeamResult*i + 2, colWeek);
            loopTeam[i].SearchFixedBugFromDateTo(Release, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, rowFirstResult + rowsTeamResult*i + 3, colWeek);

        }
    }
}

function UpdateTeamWeekSheet() {

    // Generate Sheet
    var Sheet = new TeamWeekSheet("WeekSheet");
    Sheet.Generate();
}
