
function TestCountBugGlobal() {

    // Loop each version to query bugs
    for (var ver = 0; ver < FFversion.length; ver++) {

        // Initial val
        CountFirefoxRuntimeBug(startRowRuntime, startColumn+ver, contributorRowRuntime, FFversion[ver]);
        CountFirefoxVisualBug(startRowVisual, startColumn+ver, contributorRowVisual, FFversion[ver]);
        CountFirefoxFennecBug(startRowFennec, startColumn+ver, contributorRowFennec, FFversion[ver]);
    }

}

function CountFirefoxRuntimeBug(startRow, startColumn, contributorRow, version) {

    var TaipeiTeam = [TaipeiDOM, TaipeiNetwork, TaipeiSecurity].join(",");
    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiTeam]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    var TaipeiLink = buildBugLink(TaipeiQuery);

    var MozillaQuery = [];
    MozillaQuery.push(["include_fields", "id,priority,assigned_to,component"]);
    MozillaQuery.push(["bug_status", "RESOLVED"]);
    MozillaQuery.push(["bug_status", "VERIFIED"]);
    MozillaQuery.push(["resolution", "FIXED"]);
    MozillaQuery.push(["f1", "cf_status_firefox" + version]);
    MozillaQuery.push(["o1", "equals"]);
    MozillaQuery.push(["v1", "fixed"]);

    var componentList = countComponents(TaipeiBugs);
    var MozillaBugs = searchBugsByComponents(MozillaQuery, componentList);

    PostGroupResults( globalSheet, startRow, startColumn, contributorRow, MozillaBugs, undefined );
}

function CountFirefoxVisualBug(startRow, startColumn, contributorRow, version) {

    var TaipeiTeam = [TaipeiFrontend1, TaipeiFrontend2, TaipeiGraphic, TaipeiLayout, TaipeiMedia, TaipeiPerf].join(",");
    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiTeam]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    var TaipeiLink = buildBugLink(TaipeiQuery);

    var MozillaQuery = [];
    MozillaQuery.push(["include_fields", "id,priority,assigned_to,component"]);
    MozillaQuery.push(["bug_status", "RESOLVED"]);
    MozillaQuery.push(["bug_status", "VERIFIED"]);
    MozillaQuery.push(["resolution", "FIXED"]);
    MozillaQuery.push(["f1", "cf_status_firefox" + version]);
    MozillaQuery.push(["o1", "equals"]);
    MozillaQuery.push(["v1", "fixed"]);

    var componentList = countComponents(TaipeiBugs);
    var MozillaBugs = searchBugsByComponents(MozillaQuery, componentList);

    PostGroupResults( globalSheet, startRow, startColumn, contributorRow, MozillaBugs, undefined );

}

function CountFirefoxFennecBug(startRow, startColumn, contributorRow, version) {

    var TaipeiTeam = [TaipeiFennec].join(",");
    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["product", "Firefox for Android"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["product", "Firefox for Android"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiTeam]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    var TaipeiLink = buildBugLink(TaipeiQuery);

    var MozillaQuery = [];
    MozillaQuery.push(["include_fields", "id,priority,assigned_to,component"]);
    MozillaQuery.push(["product", "Firefox for Android"]);
    MozillaQuery.push(["bug_status", "RESOLVED"]);
    MozillaQuery.push(["bug_status", "VERIFIED"]);
    MozillaQuery.push(["resolution", "FIXED"]);
    MozillaQuery.push(["f1", "cf_status_firefox" + version]);
    MozillaQuery.push(["o1", "equals"]);
    MozillaQuery.push(["v1", "fixed"]);

    var componentList = countComponents(TaipeiBugs);
    var MozillaBugs = searchBugsByComponents(MozillaQuery, componentList);

    PostGroupResults( globalSheet, startRow, startColumn, contributorRow, MozillaBugs, undefined );

}


