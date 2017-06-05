
var countP1 = countP2 = countP3 = countP4 = countP5 = countPN = 0;
var TDCcountP1 = TDCcountP2 = TDCcountP3 = TDCcountP4 = TDCcountP5 = TDCcountPN = 0;

function CountTaipeiBugDistribution() {

  var startRow;
  var startColumn = 3;
  var response;

  for (var j=0; j < FFversion.length; j++){

    // Initial values
    startRow=j+1;
    countP1 = countP2 = countP3 = countP4 = countP5 = countPN = 0;

    //
    // Query TDC Firefox and platform bugs
    //

    CountFirefoxRuntimeBug(startRow, startColumn, FFversion[j]);


    // Query Taipei Visual Team bugs
    var FirefoxVisualQuery = [];
    var FirefoxVisual = [TaipeiFrontend1, TaipeiFrontend2, TaipeiGraphic, TaipeiLayout, TaipeiMedia, TaipeiPerf].join(",");
    FirefoxVisualQuery.push(["include_fields","id,priority,assigned_to,component"]);
    FirefoxVisualQuery.push(["bug_status","RESOLVED"]);
    FirefoxVisualQuery.push(["bug_status","VERIFIED"]);
    FirefoxVisualQuery.push(["resolution","FIXED"]);
    FirefoxVisualQuery.push(["f1","cf_status_firefox" + FFversion[j]]);
    FirefoxVisualQuery.push(["o1","equals"]);
    FirefoxVisualQuery.push(["v1","fixed"]);
    FirefoxVisualQuery.push(["f2","assigned_to"]);
    FirefoxVisualQuery.push(["o2","anywordssubstr"]);
    FirefoxVisualQuery.push(["v2",FirefoxVisual]);

    var FirefoxVisualBugs = searchBugs(FirefoxVisualQuery);
    var FirefoxVisualBugsNum = FirefoxVisualBugs.bugs.length;
    var FirefoxVisualLink = buildBugLink(FirefoxVisualQuery);
    prioritizeBugs(FirefoxVisualBugs);
    var TaipeiVisualHeadcount = FirefoxVisual.split(",").length;

    TDCcountP1 = countP1;
    TDCcountP2 = countP2;
    TDCcountP3 = countP3;
    TDCcountP4 = countP4;
    TDCcountP5 = countP5;
    TDCcountPN = countPN;

    //
    // Query TDC handleded
    //
    var TaipeiQuery = [];
    TaipeiQuery.push(["include_fields","id,priority,assigned_to,component"]);
    TaipeiQuery.push(["bug_status","RESOLVED"]);
    TaipeiQuery.push(["bug_status","VERIFIED"]);
    TaipeiQuery.push(["resolution","FIXED"]);
    TaipeiQuery.push(["f1","cf_status_firefox" + FFversion[j]]);
    TaipeiQuery.push(["o1","equals"]);
    TaipeiQuery.push(["v1","fixed"]);

    var componentList = countComponents(FirefoxVisualBugs);
    var TaipeiBugs = searchBugsByComponents(TaipeiQuery, componentList);
    prioritizeBugs(TaipeiBugs);
    Developers = countDevelopers (TaipeiBugs);
    var nTotalNumber = Object.keys(Developers).length;
    var nTDCBugs = TaipeiBugs.bugs.length;

    //
    // Query all bugs (All components)
    //
    var MozillaQuery = [];
    MozillaQuery.push(["include_fields","id,priority,assigned_to,component"]);
    MozillaQuery.push(["bug_status","RESOLVED"]);
    MozillaQuery.push(["bug_status","VERIFIED"]);
    MozillaQuery.push(["resolution","FIXED"]);
    MozillaQuery.push(["f1","cf_status_firefox" + FFversion[j]]);
    MozillaQuery.push(["o1","equals"]);
    MozillaQuery.push(["v1","fixed"]);
    var MozillaBugs = searchBugs(MozillaQuery);
    var AllBuglink = buildBugLink(MozillaQuery);
    var nMozillaBugs = MozillaBugs.bugs.length;

    // Update all bugs
    dashboardSheet.getRange(startRow+2,  startColumn).setFormula("=hyperlink(\"" + AllBuglink + "\";\"" + nMozillaBugs + "\")");

    // Update TDC bugs
    dashboardSheet.getRange(startRow+2,  startColumn+1).setFormula("=hyperlink(\"" + AllBuglink + "\";\"" + nTDCBugs + "\")");

    // Update Non-TDC headcount
    dashboardSheet.getRange(startRow+2,  startColumn+3).setValue( nTotalNumber - (TaipeiRuntimeHeadcount+TaipeiVisualHeadcount) );

    // Update TDC Firefox
    dashboardSheet.getRange(startRow+2,  startColumn+4).setFormula("=hyperlink(\"" + FirefoxLink + "\";\"" + FirefoxRuntimeBugsNum + "\")");
    dashboardSheet.getRange(startRow+2,  startColumn+7).setValue(TaipeiRuntimeHeadcount);

    // Update TDC Platform
    dashboardSheet.getRange(startRow+2,  startColumn+5).setFormula("=hyperlink(\""+FirefoxVisualLink+"\";\"" + FirefoxVisualBugsNum + "\")");
    dashboardSheet.getRange(startRow+2,  startColumn+8).setValue(TaipeiVisualHeadcount);

    // Update Non-TDC bug counts
    dashboardSheet.getRange(startRow+2,  startColumn+13).setValue(countP1-TDCcountP1);
    dashboardSheet.getRange(startRow+2,  startColumn+14).setValue(countP2-TDCcountP2);
    dashboardSheet.getRange(startRow+2,  startColumn+15).setValue(countP3-TDCcountP3);
    dashboardSheet.getRange(startRow+2,  startColumn+16).setValue(countP4-TDCcountP4);
    dashboardSheet.getRange(startRow+2,  startColumn+17).setValue(countP5-TDCcountP5);
    dashboardSheet.getRange(startRow+2,  startColumn+18).setValue(countPN-TDCcountPN);

    // Update TDC Prioritized bugs
    dashboardSheet.getRange(startRow+2,  startColumn+19).setValue(TDCcountP1);
    dashboardSheet.getRange(startRow+2,  startColumn+20).setValue(TDCcountP2);
    dashboardSheet.getRange(startRow+2,  startColumn+21).setValue(TDCcountP3);
    dashboardSheet.getRange(startRow+2,  startColumn+22).setValue(TDCcountP4);
    dashboardSheet.getRange(startRow+2,  startColumn+23).setValue(TDCcountP5);
    dashboardSheet.getRange(startRow+2,  startColumn+24).setValue(TDCcountPN);

  }

  // Insert update time
  dashboardSheet.getRange('AG2').setValue(today.toString()).setFontColor('#ffffff');
}


function prioritizeBugs (resultBugs){
  for (var i=0; i < resultBugs.bugs.length; i++)
    {
      switch (resultBugs.bugs[i].priority)
      {
        case '--':
          countPN+=1;
          break;
        case 'P1':
          countP1+=1;
          break;
        case 'P2':
          countP2+=1;
          break;
        case 'P3':
          countP3+=1;
          break;
        case 'P4':
          countP4+=1;
          break;
        case 'P5':
          countP5+=1;
          break;
      }
    }
}

function countDevelopers (resultBugs){
  var assignees = {};

  for (var i=0; i < resultBugs.bugs.length; i++) {
    if (assignees.hasOwnProperty(resultBugs.bugs[i].assigned_to))
    {
      assignees[resultBugs.bugs[i].assigned_to].push(resultBugs.bugs[i].id)
    }
    else
    {
      var Name = resultBugs.bugs[i].assigned_to;
      var Bug = [resultBugs.bugs[i].id];
      assignees[Name] = Bug;
    }
  }

  return assignees;
}

function countComponents (resultBugs){
  var components = {};

  for (var i=0; i < resultBugs.bugs.length; i++) {
    if (components.hasOwnProperty(resultBugs.bugs[i].component))
    {
      components[resultBugs.bugs[i].component].push(resultBugs.bugs[i].id)
    }
    else
    {
      var Name = resultBugs.bugs[i].component;
      var Bug = [resultBugs.bugs[i].id];
      components[Name] = Bug;
    }
  }

  var lists= Object.keys(components);

  Logger.log("Count" + lists.length);
  for (var j=0;j < lists.length; j++)
   Logger.log(lists[j]);

  return components;

}

function testCountBug() {
    CountFirefoxRuntimeBug(3, 3, "55");
}

function CountFirefoxRuntimeBug(startRow, startColumn, version) {

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
    var TaipeiBugsNum = TaipeiBugs.bugs.length;
    //var NonTaipeiBugs = searchBugs(NonTaipeiQuery);
    var TaipeiTeamsize = TaipeiTeam.split(",").length;
    //var SecurityTeamsize = GlobalSecurity.split(",").length;
    var TaipeiLink = buildBugLink(TaipeiQuery);
    prioritizeBugs(TaipeiBugs);

    taipeiSheet.getRange(startRow,  startColumn+4).setValue(TaipeiBugsNum);
    taipeiSheet.getRange(startRow,  startColumn+5).setValue(TaipeiTeamsize);
    taipeiSheet.getRange(startRow,  startColumn+14).setValue(countP1);
    taipeiSheet.getRange(startRow,  startColumn+15).setValue(countP2);
    taipeiSheet.getRange(startRow,  startColumn+16).setValue(countP3);
    taipeiSheet.getRange(startRow,  startColumn+17).setValue(countP4);
    taipeiSheet.getRange(startRow,  startColumn+18).setValue(countP5);
    taipeiSheet.getRange(startRow,  startColumn+19).setValue(countPN);

}
