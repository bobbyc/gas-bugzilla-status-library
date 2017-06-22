var ss              = SpreadsheetApp.getActiveSpreadsheet();
var dashboardSheet  = ss.getSheetByName("Dashboard");
var weeklySheet     = ss.getSheetByName("Weekly");
var mailingSheet    = ss.getSheetByName("Mailing");
var scheduleSheet   = ss.getSheetByName("Release");
var teamSheet       = ss.getSheetByName("Team View");
var mozillaSheet    = ss.getSheetByName("Mozilla");
var globalSheet     = ss.getSheetByName("Global");

var countP1 = countP2 = countP3 = countP4 = countP5 = countPN = 0;
var TDCcountP1 = TDCcountP2 = TDCcountP3 = TDCcountP4 = TDCcountP5 = TDCcountPN = 0;

var FFversion = ['55'];

var today = new Date();

function overallCountBug() {

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

    // Query TDC Firefox bugs
    var FirefoxQuery = [];
    FirefoxQuery.push(["include_fields","id,priority,assigned_to,component"]);
    FirefoxQuery.push(["bug_status","RESOLVED"]);
    FirefoxQuery.push(["bug_status","VERIFIED"]);
    FirefoxQuery.push(["resolution","FIXED"]);
    FirefoxQuery.push(["f1","cf_status_firefox" + FFversion[j]]);
    FirefoxQuery.push(["o1","equals"]);
    FirefoxQuery.push(["v1","fixed"]);
    FirefoxQuery.push(["f2","assigned_to"]);
    FirefoxQuery.push(["o2","anywordssubstr"]);
    FirefoxQuery.push(["v2","gasolin timdream tchien rchien schung ralin flin etseng scwwu ehung lchang dhuang kmlee \
                           selee yliao fliu jyeh vchen hhsu tchen pchen mochen thsieh hhuang jhuang chuang mliang jalin \
                           bmao fshih atsai gchang whsu ashiue ctang wiwang ywu brsun echuang alchen lochang"]);

    var FirefoxBugs = searchBugs(FirefoxQuery);
    var FirefoxLink = buildBugLink(FirefoxQuery);
    prioritizeBugs(FirefoxBugs);
    var Developers = countDevelopers(FirefoxBugs);
    var TDCFFHeadcount = Object.keys(Developers).length;
    var TDCFFBugsNum = FirefoxBugs.bugs.length;

    // Query TDC Platform bugs
    var PlatformQuery = [];
    PlatformQuery.push(["include_fields","id,priority,assigned_to,component"]);
    PlatformQuery.push(["bug_status","RESOLVED"]);
    PlatformQuery.push(["bug_status","VERIFIED"]);
    PlatformQuery.push(["resolution","FIXED"]);
    PlatformQuery.push(["f1","cf_status_firefox" + FFversion[j]]);
    PlatformQuery.push(["o1","equals"]);
    PlatformQuery.push(["v1","fixed"]);
    PlatformQuery.push(["f2","assigned_to"]);
    PlatformQuery.push(["o2","anywordssubstr"]);
    PlatformQuery.push(["v2","shuang ttung joliu tlee kchen tchou janus926 cyu wpan cku fatseng \
                            pchang boris.chiou tlin hshih mtseng vliu ethlin \
                            aschen echen btseng jhao jjong \
                            htsai bhsu jdai sawang sshih hchang allstars.chh \
                            dlee ettseng tnguyen tihuang gweng bechen jolin ctai \
                            jwwang ayang alwu tkuo mchiang bwu tkuo howareyou322 \
                            kaku xeonchen amchung juhsu swu kechen jacheng \
                            kuoe0 dmu cleu etsai kikuo kechang cchang schien"]);

    var platformBugs = searchBugs(PlatformQuery);
    var PlatforLink = buildBugLink(PlatformQuery);
    prioritizeBugs(platformBugs);
    Developers = countDevelopers (platformBugs);
    var TDCPLHeadcount = Object.keys(Developers).length;
    var TDCPLBugsNum = platformBugs.bugs.length;

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

    var componentList = countComponents(platformBugs);
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
    dashboardSheet.getRange(startRow+2,  startColumn+3).setValue( nTotalNumber - (TDCFFHeadcount+TDCPLHeadcount) );

    // Update TDC Firefox
    dashboardSheet.getRange(startRow+2,  startColumn+4).setFormula("=hyperlink(\"" + FirefoxLink + "\";\"" + TDCFFBugsNum + "\")");
    dashboardSheet.getRange(startRow+2,  startColumn+7).setValue(TDCFFHeadcount);

    // Update TDC Platform
    dashboardSheet.getRange(startRow+2,  startColumn+5).setFormula("=hyperlink(\""+PlatforLink+"\";\"" + TDCPLBugsNum + "\")");
    dashboardSheet.getRange(startRow+2,  startColumn+8).setValue(TDCPLHeadcount);

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
  // init counter
  countP1 = countP2 = countP3 = countP4 = countP5 = countPN = 0;

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



function doGet(request) {
  ss = SpreadsheetApp.openById("1s2LCo4Raba0dni--pNi5m-MegGsihvPPhQzlI80U08g");
  dashboardSheet = ss.getSheetByName("Overall Dashboard");
  weeklySheet    = ss.getSheetByName("Weekly");

  // Get all data from previous versions
  var overAllData  = dashboardSheet.getRange(3,  2, 100, 29).getValues();

  // Get last week data
  var lastWeekData = weeklySheet.getRange(3,  2, 1, 29).getValues();


  var jsonResult = {
    Versions: [],
    LastWeek: []
  };

  for (var i=0; i < overAllData.length; i++)
  {
    if (overAllData[i][0] == "")
      break;


    jsonResult.Versions.push({
      "Version":                overAllData[i][0],
      "Mozilla_Total":          overAllData[i][1],
      "Mozilla_Total_Link":     /"(.*?)"/.exec(dashboardSheet.getRange(i+3, 3).getFormula())[1],
      "TotalwoTDC":             overAllData[i][2],
      "TotalwoTDC_HC":          overAllData[i][3],
      "TDC_Firefox":            overAllData[i][4],
      "TDC_Firefox_Link":       /"(.*?)"/.exec(dashboardSheet.getRange(i+3, 6).getFormula())[1],
      "TDC_Platform":           overAllData[i][5],
      "TDC_Platform_Link":      /"(.*?)"/.exec(dashboardSheet.getRange(i+3, 7).getFormula())[1],
      "TDC_Total":              overAllData[i][6],
      "TDC_Firefox_Headcount":  overAllData[i][7],
      "TDC_Platform_Headcount": overAllData[i][8],
      "TDC_Percentage":         overAllData[i][9],
      "Overall_P1":             overAllData[i][10],
      "Overall_P2":             overAllData[i][11],
      "Overall_P3":             overAllData[i][12],
      "Overall_P4":             overAllData[i][13],
      "Overall_P5":             overAllData[i][14],
      "Overall_PN":             overAllData[i][15],
      "TDC_P1":                 overAllData[i][16],
      "TDC_P2":                 overAllData[i][17],
      "TDC_P3":                 overAllData[i][18],
      "TDC_P4":                 overAllData[i][19],
      "TDC_P5":                 overAllData[i][20],
      "TDC_PN":                 overAllData[i][21],
      "P1_Percentage":          overAllData[i][22],
      "P2_Percentage":          overAllData[i][23],
      "P3_Percentage":          overAllData[i][24],
      "P4_Percentage":          overAllData[i][25],
      "P5_Percentage":          overAllData[i][26],
      "PN_Percentage":          overAllData[i][27]
    });
  }

  jsonResult.LastWeek.push({
    "Version":                lastWeekData[0][0],
    "Mozilla_Total":          lastWeekData[0][1],
    "Mozilla_Total_Link":     "",
    "TotalwoTDC":             lastWeekData[0][2],
    "TotalwoTDC_HC":          lastWeekData[0][3],
    "TDC_Firefox":            lastWeekData[0][4],
    "TDC_Firefox_Link":       "",
    "TDC_Platform":           lastWeekData[0][5],
    "TDC_Platform_Link":      "",
    "TDC_Total":              lastWeekData[0][6],
    "TDC_Firefox_Headcount":  lastWeekData[0][7],
    "TDC_Platform_Headcount": lastWeekData[0][8],
    "TDC_Percentage":         lastWeekData[0][9],
    "Overall_P1":             lastWeekData[0][10],
    "Overall_P2":             lastWeekData[0][11],
    "Overall_P3":             lastWeekData[0][12],
    "Overall_P4":             lastWeekData[0][13],
    "Overall_P5":             lastWeekData[0][14],
    "Overall_PN":             lastWeekData[0][15],
    "TDC_P1":                 lastWeekData[0][16],
    "TDC_P2":                 lastWeekData[0][17],
    "TDC_P3":                 lastWeekData[0][18],
    "TDC_P4":                 lastWeekData[0][19],
    "TDC_P5":                 lastWeekData[0][20],
    "TDC_PN":                 lastWeekData[0][21],
    "P1_Percentage":          lastWeekData[0][22],
    "P2_Percentage":          lastWeekData[0][23],
    "P3_Percentage":          lastWeekData[0][24],
    "P4_Percentage":          lastWeekData[0][25],
    "P5_Percentage":          lastWeekData[0][26],
    "PN_Percentage":          lastWeekData[0][27]
    });

  return ContentService.createTextOutput(request.parameters.callback + "(" + JSON.stringify(jsonResult)+ ")").setMimeType(ContentService.MimeType.JAVASCRIPT);

}
