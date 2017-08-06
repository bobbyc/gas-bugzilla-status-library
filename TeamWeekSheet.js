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
TeamWeekSheet.prototype.CheckOrAppendRelease = function (CurrentRelease, date) {

    // TODO: calculate next week
    var today = new Date();
    var ThisWeek = new Date(this.sheet.getRange('B2').getValue());
    var NextWeek = new Date(ThisWeek.getFullYear(), ThisWeek.getMonth(), ThisWeek.getDate() + 7);

    if (today > ThisWeek) {
        this.sheet.insertColumnAfter(1);
        this.sheet.getRange("B1").setValue(CurrentRelease);
        this.sheet.getRange("B2").setValue(NextWeek);
    }
}

TeamWeekSheet.prototype.Generate = function () {

    // Append column of current release
    this.CheckOrAppendRelease(this.currentRelease.version, this.currentRelease.merge_date);

    // Prepare TeamQuery
    var TeamDOM = new TeamBugQueryBase("DOM");
    var TeamNetwork = new TeamBugQueryBase("Network");
    var TeamSecurity = new TeamBugQueryBase("Security");
    var TeamLayout = new TeamBugQueryBase("Layout");
    var TeamGraphic = new TeamBugQueryBase("Graphic");
    var TeamMedia = new TeamBugQueryBase("Media");
    var TeamPerf = new TeamBugQueryBase("Perf");
    var TeamFrontend = new TeamBugQueryBase("Frontend");
    var TeamFennec = new TeamBugQueryBase("Fennec");

    // Loop Firefox Version from columns
    var numWeeks = 2;           // Change this to calculate more weeks

    // Looping version
    var rowFirstResult = 3;
    var loopTeam = [TeamDOM, TeamSecurity, TeamNetwork, TeamLayout, TeamGraphic, TeamMedia, TeamPerf, TeamFrontend, TeamFennec];
    for (var weekIndex = 0; weekIndex < numWeeks; weekIndex++) {

        // Fetch version and week
        var colWeek = this.colStartDate + weekIndex;
        var FFversion = this.sheet.getRange(this.rowVersion, colWeek, 1, 1).getValue();
        var FFWeek = this.sheet.getRange(this.rowDate, colWeek, 1, 1).getValue();
        var FFPreWeek = this.sheet.getRange(this.rowDate, colWeek + 1, 1, 1).getValue();

        // Extract version from version string
        var VString = FFversion.split(" ");
        var Nightly = VString[1];
        var Beta = (Number(Nightly) - 1).toString();
        var Release = (Number(Nightly) - 2).toString();
        var NightlyVersion = FFversion;
        var BetaVersion = [VString[0], Beta].join(" ");
        var ReleaseVersion = [VString[0], Release].join(" ");
        var EndDate = FFWeek.toISOString().slice(0, 10);
        var StartDate = FFPreWeek.toISOString().slice(0, 10);

        for (i = 0; i < loopTeam.length; i++) {

            // Query Team Data
            var rowsTeamResult = 6;
            loopTeam[i].SearchFixedBugFromDateTo(NightlyVersion, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, rowFirstResult + rowsTeamResult * i + 1, colWeek);
            loopTeam[i].SearchFixedBugFromDateTo(BetaVersion, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, rowFirstResult + rowsTeamResult * i + 2, colWeek);
            loopTeam[i].SearchFixedBugFromDateTo(ReleaseVersion, StartDate, EndDate);
            loopTeam[i].RenderBugNumToSheet(this.sheet, rowFirstResult + rowsTeamResult * i + 3, colWeek);

        }
    }
}

function UpdateTeamWeekSheet() {

    // Generate Sheet
    var Sheet = new TeamWeekSheet("WeekSheet");
    Sheet.Generate();
}
