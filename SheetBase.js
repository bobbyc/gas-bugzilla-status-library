function TestBugSheet() {

    // Count team group, and post result
    var Sheet = new SheetBase("TestSheet");
    var team = new TeamBugQueryBase("Taipei DOM", TaipeiDOM);
    team.SearchFixedBug(undefined, "55");
    team.RenderToSheet(Sheet.sheet, startRowRuntime, startColumn);
}

/**
 * Constructor - SheetBase
 * @param err
 * @param result
 */
var SheetBase = function (name) {
    this.name = name || 'TempSheet';

    // Get or Insert Target sheet
    this.sheet = ss.getSheetByName(name);
    if (this.sheet == null)
        this.sheet = ss.insertSheet(this.name);

    // Sheet render offsets
    this.rowVersion = 1;         // The row of Versions
    this.rowDate = 2;            // The row of Dates
    this.colStartDate = 2;       // The first columns of date to be processed

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

/**
 * Sheet Generate function
 * @param err
 * @param result
 */
SheetBase.prototype.CheckOrAppendRelease = function (CurrentRelease, date) {

    // Check Version and Date
    var FFVersion = this.sheet.getRange("B1").getValue();
    var FFDate = this.sheet.getRange("B2").getValue();

    if (FFVersion != CurrentRelease) {
        this.sheet.insertColumnBefore(this.colStartDate);
        this.sheet.getRange("B1").setValue(CurrentRelease);
        this.sheet.getRange("B2").setValue(date);
    }

}


/**
 * Constructor - TeamBugQuery
 * @param err
 * @param result
 */
var TeamBugQueryBase = function (name) {
    this.name = name || 'TeamBugQuery';

    // Query Team members from 'Teams' Sheet
    this.members = this.GetTeamByName(this.name).join(',');
    this.nTeamSize = this.members.split(",").length;

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
 * Constructor - TeamBugQueryBase
 * @param err
 * @param result
 */
TeamBugQueryBase.prototype.constructor = TeamBugQueryBase;

TeamBugQueryBase.prototype.CountBugs = function () {

    this.countP1 = 0;
    this.countP2 = 0;
    this.countP3 = 0;
    this.countP4 = 0;
    this.countP5 = 0;
    this.countPN = 0;
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

TeamBugQueryBase.prototype.Reset = function () {
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

TeamBugQueryBase.prototype.SearchBugs = function (query) {

    // Do the query
    this.buglist = searchBugs(query);
    this.CountBugs();
    return this.buglist;
}

TeamBugQueryBase.prototype.SearchBugsAndMerge = function (query) {

    // Do the query
    var results = searchBugs(query);

    // Merge bugs arrays
    if (results != undefined) {
        if (this.buglist != undefined) {
            for (var index in results.bugs)
                this.buglist.bugs.push(results.bugs[index]);
        } else {
            this.buglist = results;
        }
    }

    this.CountBugs();
    return this.buglist;
}


/**
 * Constructor - SheetBase
 * @param product
 * @param version Follow the format "Firefox 55"
 */
TeamBugQueryBase.prototype.SearchFixedBug = function (product, firefoxVersion) {

    // Reset this bug data
    this.Reset();

    // Process firefox
    var ver = firefoxVersion.split(" ")[1].trim();
    var mozillaVersion = ["mozilla", ver].join("");

    // Define search terms
    var TeamQuery = [];
    if (product != undefined) {
        TeamQuery.push(["product", product]);
    }
    TeamQuery.push(["include_fields", "id,priority,assigned_to,component,keywords"]);
    TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TeamQuery.push(["resolution", "FIXED"]);
    //TeamQuery.push(["f1", "cf_status_firefox" + ver]);
    //TeamQuery.push(["o1", "equals"]);
    //TeamQuery.push(["v1", "fixed"]);
    TeamQuery.push(["target_milestone", firefoxVersion]);
    TeamQuery.push(["target_milestone", mozillaVersion]);
    if (this.members != undefined) {
        TeamQuery.push(["f1", "assigned_to"]);
        TeamQuery.push(["o1", "anyexact"]);
        TeamQuery.push(["v1", this.members]);
    }

    // Do the query
    return this.SearchBugs(TeamQuery);
}

/**
 * Constructor - SheetBase
 * @param product
 * @param version Follow the format "Firefox 55"
 */
TeamBugQueryBase.prototype.SearchFixedBugByAssigned = function (product, version) {

    // Reset this bug data
    this.Reset();

    // Process firefox version
    var ver = version.split(" ")[1].trim();

    // Split and Trim the Team list
    var Assignees = this.members.split(',').map(function (item) { return item.trim(); });
    for (index in Assignees) {

        // Define search terms
        var TeamQuery = [];
        if (product != undefined) {
            TeamQuery.push(["product", product]);
        }
        TeamQuery.push(["include_fields", "id,priority,assigned_to,component,keywords,target_milestone"]);
        TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
        TeamQuery.push(["resolution", "FIXED"]);
        TeamQuery.push(["f1", "cf_status_firefox" + ver]);
        TeamQuery.push(["o1", "equals"]);
        TeamQuery.push(["v1", "fixed"]);
        TeamQuery.push(["f2", "assigned_to"]);
        TeamQuery.push(["o2", "equals"]);
        TeamQuery.push(["v2", Assignees[index]]);

        this.SearchBugsAndMerge(TeamQuery);
    }
    // Do the query
    return this.buglist;
}


TeamBugQueryBase.prototype.SearchFixedRegression = function (product, version) {

    // Reset this bug data
    this.Reset();

    // Process firefox version
    var ver = version.split(" ")[1].trim();
    var mozillaVer = ["mozilla", ver].join("");

    // Define search terms
    var TeamQuery = [];
    if (product != undefined) {
        TeamQuery.push(["product", product]);
    }
    TeamQuery.push(["include_fields", "id,priority,assigned_to,component,keywords,target_milestone"]);
    TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TeamQuery.push(["resolution", "FIXED"]);
    TeamQuery.push(["keywords", "regression, crash"]);
    TeamQuery.push(["keywords_type", "anywords"]);
    TeamQuery.push(["target_milestone", version]);
    TeamQuery.push(["target_milestone", mozillaVer]);
    if (this.members != undefined) {
        TeamQuery.push(["f1", "assigned_to"]);
        TeamQuery.push(["o1", "anyexact"]);
        TeamQuery.push(["v1", this.members]);
    }

    // Do the query
    return this.SearchBugs(TeamQuery);
}

TeamBugQueryBase.prototype.SearchFixedBugFromDateTo = function (version, datefrom, dateto) {

    // Reset this bug data
    this.Reset();

    // Process firefox version
    var ver = version.split(" ")[1].trim();

    // Define search terms
    var TeamQuery = [];
    //TeamQuery.push(["query_format", "advanced"]);
    TeamQuery.push(["include_fields", "id,priority,assigned_to,component"]);
    TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TeamQuery.push(["resolution", "FIXED"]);
    TeamQuery.push(["f1", "cf_status_firefox" + ver]);
    TeamQuery.push(["o1", "equals"]);
    TeamQuery.push(["v1", "fixed"]);
    if (this.members != undefined) {
        TeamQuery.push(["f2", "assigned_to"]);
        TeamQuery.push(["o2", "anyexact"]);
        TeamQuery.push(["v2", this.members]);
    }
    if (datefrom != undefined) TeamQuery.push(["chfieldfrom", datefrom]);
    if (dateto != undefined) TeamQuery.push(["chfieldto", dateto]);

    // Do the query
    return this.SearchBugs(TeamQuery);
}

TeamBugQueryBase.prototype.SearchFixedBugByAssignedFromDateTo = function (version, datefrom, dateto) {

    // Reset this bug data
    this.Reset();

    // Process firefox version
    var ver = version.split(" ")[1].trim();

    // Split and Trim the Team list
    var Assignees = this.members.split(',').map(function (item) { return item.trim(); });
    for (index in Assignees) {

        // Define search terms
        var TeamQuery = [];
        TeamQuery.push(["include_fields", "id,priority,assigned_to,component,keywords,target_milestone"]);
        TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
        TeamQuery.push(["resolution", "FIXED"]);
        TeamQuery.push(["f1", "cf_status_firefox" + ver]);
        TeamQuery.push(["o1", "equals"]);
        TeamQuery.push(["v1", "fixed"]);
        TeamQuery.push(["f2", "assigned_to"]);
        TeamQuery.push(["o2", "equals"]);
        TeamQuery.push(["v2", Assignees[index]]);
        if (datefrom != undefined) TeamQuery.push(["chfieldfrom", datefrom]);
        if (dateto != undefined) TeamQuery.push(["chfieldto", dateto]);

        this.SearchBugsAndMerge(TeamQuery);
    }
    // Do the query
    return this.buglist;
}

TeamBugQueryBase.prototype.SearchFixedBugByComponens = function (version, components) {

    // Define search terms
    this.buglist = undefined;
    var TeamQuery = [];
    TeamQuery.push(["include_fields", "id,priority,assigned_to,component"]);
    TeamQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TeamQuery.push(["resolution", "FIXED"]);
    TeamQuery.push(["f1", "cf_status_firefox" + version]);
    TeamQuery.push(["o1", "equals"]);
    TeamQuery.push(["v1", "fixed"]);
    if (this.members != undefined) {
        TeamQuery.push(["f2", "assigned_to"]);
        TeamQuery.push(["o2", "anyexact"]);
        TeamQuery.push(["v2", this.members]);
    }

    // Do the query
    this.buglist = searchBugsByComponents(TeamQuery, components);
    this.CountBugs();
    return this.buglist;
}

TeamBugQueryBase.prototype.RenderToSheet = function (sheet, row, column) {

    if (this.buglist != undefined) {
        var Devs = countDevelopers(this.buglist)
        var nTeamSize = Object.keys(Devs).length;

        // Post results to TargetSheets
        //TargetSheet.getRange(bugsRow, bugsColumn).setFormula("=hyperlink(\"" + link + "\",\"Bugzilla\")");
        if (sheet != undefined) {
            sheet.getRange(row, column).setValue(this.nTeamSize);
            sheet.getRange(row + 1, column).setValue(this.countP1);
            sheet.getRange(row + 2, column).setValue(this.countP2);
            sheet.getRange(row + 3, column).setValue(this.countP3);
            sheet.getRange(row + 4, column).setValue(this.countP4);
            sheet.getRange(row + 5, column).setValue(this.countP5);
            sheet.getRange(row + 6, column).setValue(this.countPN);
            sheet.getRange(row + 7, column).setValue(this.nBugs);
            sheet.getRange(row + 8, column).setValue(nTeamSize);
        }
    } else {
        Logger.log(Utilities.formatString("RenderToSheet(), Buglist is undefined"))
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

TeamBugQueryBase.prototype.GetTeamByName = function (teamName) {

    var sheet = ss.getSheetByName("Teams");

    var members = [];
    var range = sheet.getDataRange();
    var data = range.getValues();
    var col = data[0].indexOf(teamName);
    if (col != -1) {
        for (var iName = 1; iName < range.getNumRows(); iName++) {
            var name = data[iName][col];
            if (name != '')
                members.push(data[iName][col]);
        }
    }

    return members;
}
