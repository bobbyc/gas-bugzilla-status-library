/**
 * Constructor - SheetBase
 * @param err
 * @param result
 */
var SheetBase = function (name) {
    this.name = name || 'BugSheetBase';
    this.sheet = ss.getSheetByName(name);
}

/**
 * Sheet Generate function
 * @param err
 * @param result
 */
SheetBase.prototype.Generate = function () {

    // Report generation function
    for (var ver = 0; ver < FFversion.length; ver++) {

        // Initial val
        this.CountFixedBugsByTeam(startRowRuntime, startColumn + ver, contributorRowRuntime, FFversion[ver], [TaipeiDOM], undefined);
    }
}

function TestBugSheet() {

    // Create Product team group
    var runtime = [TaipeiDOM];
    var visual = [TaipeiFrontend1];
    var fennec = [TaipeiFennec];

    // Count team group, and post result
    var Sheet = new SheetBase("TestSheet");
    var team = new TeamBugQueryBase("Taipei DOM", TaipeiDOM);
    team.SearchFixedBug(undefined, "55");
    team.RenderToSheet(Sheet.sheet, startRowRuntime, startColumn);
}

/**
 * Constructor - TeamBugQuery
 * @param err
 * @param result
 */
var TeamBugQueryBase = function (name, members) {
    this.name = name || 'TeamBugQuery';
    this.members = members;
    this.nTeamSize = members.split(",").length;

    // Counter for Bugs
    this.buglist = undefined;
    this.nBugs = 0;
    this.countP1 = 0;
    this.countP2 = 0;
    this.countP3 = 0;
    this.countP4 = 0;
    this.countP5 = 0;
    this.countPN = 0;
    this.countDev = 0;
}

/**
 * Show matrix as table
 */
TeamBugQueryBase.prototype.SearchBug = function () {
    Logger.log("TeamBugQuery.prototype.searchBug");
}

TeamBugQueryBase.prototype.CountBugs = function () {

    if (this.buglist != undefined) {
        this.nBugs = this.buglist.bugs.length
        for (var i = 0; i < this.nBugs; i++) {
            switch (this.buglist.bugs[i].priority) {
                case '--':
                    this.countPN += 1;
                    break;
                case 'P1':
                    this.countP1 += 1;
                    break;
                case 'P2':
                    this.countP2 += 1;
                    break;
                case 'P3':
                    this.countP3 += 1;
                    break;
                case 'P4':
                    this.countP4 += 1;
                    break;
                case 'P5':
                    this.countP5 += 1;
                    break;
            }
        }
    }
}

TeamBugQueryBase.prototype.SearchFixedBug = function (ProductName, version) {

    // Define search terms
    this.buglist = undefined;
    var TeamQuery = [];
    if (ProductName != undefined) {
        TeamQuery.push(["product", ProductName]);
    }
    TeamQuery.push(["include_fields", "id,priority,assigned_to,component"]);
    TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TeamQuery.push(["resolution", "FIXED"]);
    TeamQuery.push(["f1", "cf_status_firefox" + version]);
    TeamQuery.push(["o1", "equals"]);
    TeamQuery.push(["v1", "fixed"]);
    if (this.members != undefined) {
        TeamQuery.push(["f2", "assigned_to"]);
        TeamQuery.push(["o2", "anywordssubstr"]);
        TeamQuery.push(["v2", this.members]);
    }

    // Do the query
    this.buglist = searchBugs(TeamQuery);
    this.CountBugs();

    return this.buglist;
}

TeamBugQueryBase.prototype.SearchFixedBugFromDateTo = function (version, datefrom, dateto) {

    // Define search terms
    this.buglist = undefined;
    var TeamQuery = [];
    TeamQuery.push(["query_format", "advanced"]);
    TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TeamQuery.push(["resolution", "FIXED"]);
    TeamQuery.push(["f1", "cf_status_firefox" + version]);
    TeamQuery.push(["o1", "equals"]);
    TeamQuery.push(["v1", "fixed"]);
    if (this.members != undefined) {
        TeamQuery.push(["f2", "assigned_to"]);
        TeamQuery.push(["o2", "anywordssubstr"]);
        TeamQuery.push(["v2", this.members]);
    }
    if (datefrom != undefined) TeamQuery.push(["chfieldfrom", datefrom]);
    if (dateto != undefined) TeamQuery.push(["chfieldto", dateto]);

    // Do the query
    this.buglist = searchBugs(TeamQuery);
    this.CountBugs();

    return this.buglist;
}

TeamBugQueryBase.prototype.RenderToSheet = function (sheet, row, column) {

    var Devs = countDevelopers(this.buglist)
    var nTeamSize = Object.keys(Devs).length;

    // Post results to TargetSheets
    //TargetSheet.getRange(bugsRow, bugsColumn).setFormula("=hyperlink(\"" + link + "\",\"Bugzilla\")");
    if (sheet != undefined) {
        sheet.getRange(row + 1, column).setValue(this.countP1);
        sheet.getRange(row + 2, column).setValue(this.countP2);
        sheet.getRange(row + 3, column).setValue(this.countP3);
        sheet.getRange(row + 4, column).setValue(this.countP4);
        sheet.getRange(row + 5, column).setValue(this.countP5);
        sheet.getRange(row + 6, column).setValue(this.countPN);
        sheet.getRange(row + 7, column).setValue(this.nBugs);
        sheet.getRange(row + 8, column).setValue(nTeamSize);
    }
}

TeamBugQueryBase.prototype.RenderBugNumToSheet = function (sheet, row, column) {

    var Devs = countDevelopers(this.buglist)
    var nTeamSize = Object.keys(Devs).length;

    // Post results to TargetSheets
    //TargetSheet.getRange(bugsRow, bugsColumn).setFormula("=hyperlink(\"" + link + "\",\"Bugzilla\")");
    if (sheet != undefined) {
        sheet.getRange(row, column).setValue(this.nBugs);
    }
}
