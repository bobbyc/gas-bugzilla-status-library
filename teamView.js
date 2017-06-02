var nTotalTaipeiBug = 0;
var nTotalNonTaipeiBug = 0;

var TaipeiDOM     = "htsai, sawang, ttung, sshih, jdai, bhsu, shuang, jjong, btseng, echen";
var TaipeiMedia   = "bwu, kaku, alwu, mchiang, jwwang, ayang, bechen, jolin,ctai, cchang, jacheng,kikuo";
var TaipeiSecurity= "ettseng, tihuang, tnguyen, jhao, hchang, dlee, allstars.chh";
var TaipeiLayout  = "aschen, jeremychen, slyu, tlin, boris.chiou, cku, kuoe0";
var TaipeiGraphic = "howareyou322, ethlin, mtseng, hshih, vliu, kechen, cleu";
var TaipeiNetwork = "swu, xeonchen, amchung, juhsu, kechan, schieng";
var TaipeiPerf    = "kchen, wpan, janus926, gweng, cyu, tlee";

var GlobalDOM     = "overholt, bkelly, annevk, mcaceres, catalin.badea392, afarre, \
                     michael@thelayzells.com, amarchesini, jvarga, ehsan, hsivonen, \
                     josh@joshmatthews.net, bugmail@asutherland.org, kyle@nonpolynomial.com, \
                     wchen, bugs@pettay.fi";
var GlobalMedia   = "ajones, jyavenard, gsquelart, bvandyk, jharris, dglastonbury, dmajor, \
                     cpearce, kinetik, giles, karlt";
var GlobalSecurity= "sdeckelmann, mwobensmith, jld, huseby, kjozwiak, dveditz, tanvi, tom, kwilson, mgoodwin, \
                     jjones, franziskuskiefer, ttaubert, dkeeler, ptheriault, julian.r.hector, kmckinley, jkt, \
                     stephouillon, cr, francois, ckerschb, fbraun, abillings, twsmith, jschwartzentruber, choller, \
                     rforbes, cdiehl, gary@rumblingedge.com";
var GlobalLayout  = "bugs@junglecode.net, schneider@jancona.com, cam@mcc.id.au, \
                     kgilbert, xidorn+moz@upsuper.org, npancholi, bwerth, dholbert, \
                     tantek@cs.stanford.edu, jwatt@jwatt.org, matt.woodrow, mats, mstange@themasta.com, \
                     jfkthame, bbirtles, mantaroh, hiikezoe, m_kato, masayuki";
var GlobalGraphic = "milan, mchang, botond, aosmond, lsalzman, kvarkus, dmalyshau, rhunt, \
                     sotaro.ikeda.g, gwright, anthony.s.hughes, dvander, jmuizelaar, tnikkel, \
                     jgilbert, bugmail@mozilla.staktrace.com, bas@basschouten.com,  jnicol, \
                     nical.bugzilla, edwin";
var GlobalNetwork = "Jduell.mcbugs, daniel@haxx.se, dd.mozilla, valentin.gosu, hurley, \
                     michal.novotny, honzab.moz";


function DOMTeamCountBug(startRow, startColumn, version) {

      // Query DOM team bugs
    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiDOM]);

    var NonTaipeiQuery = [];
    NonTaipeiQuery.push(["query_format", "advanced"]);
    NonTaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    NonTaipeiQuery.push(["resolution", "FIXED"]);
    NonTaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    NonTaipeiQuery.push(["o1", "equals"]);
    NonTaipeiQuery.push(["v1", "fixed"]);
    NonTaipeiQuery.push(["f2", "assigned_to"]);
    NonTaipeiQuery.push(["o2", "anywordssubstr"]);
    NonTaipeiQuery.push(["v2", GlobalDOM]);

    var TDCDOMbugs = searchBugs(TaipeiQuery);
    var NonTDCDOMbugs = searchBugs(NonTaipeiQuery);
    var tdcDOMTeamsize = TaipeiDOM.split(",").length;
    var DOMTeamsize = GlobalDOM.split(",").length;

    UpdateCellFormula (teamSheet, startRow, startColumn, (TDCDOMbugs.bugs.length/tdcDOMTeamsize).toFixed(2), buildBugLink(TaipeiQuery));
    UpdateCellFormula (teamSheet, startRow, startColumn+1, (NonTDCDOMbugs.bugs.length/DOMTeamsize).toFixed(2), buildBugLink(NonTaipeiQuery));

    nTotalTaipeiBug += TDCDOMbugs.bugs.length;
    nTotalNonTaipeiBug += NonTDCDOMbugs.bugs.length;
}

function MediaTeamCountBug(startRow, startColumn, version) {

    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiMedia]);

    var NonTaipeiQuery = [];
    NonTaipeiQuery.push(["query_format", "advanced"]);
    NonTaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    NonTaipeiQuery.push(["resolution", "FIXED"]);
    NonTaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    NonTaipeiQuery.push(["o1", "equals"]);
    NonTaipeiQuery.push(["v1", "fixed"]);
    NonTaipeiQuery.push(["f2", "assigned_to"]);
    NonTaipeiQuery.push(["o2", "anywordssubstr"]);
    NonTaipeiQuery.push(["v2", GlobalMedia]);

    var TDCbugs = searchBugs(TaipeiQuery);
    var NonTDCbugs = searchBugs(NonTaipeiQuery);
    var tdcMediaTeamsize = TaipeiMedia.split(",").length;
    var MediaTeamsize = GlobalMedia.split(",").length;

    UpdateCellFormula (teamSheet, startRow, startColumn, (TDCbugs.bugs.length/tdcMediaTeamsize).toFixed(2), buildBugLink(TaipeiQuery));
    UpdateCellFormula (teamSheet, startRow, startColumn+1, (NonTDCbugs.bugs.length/MediaTeamsize).toFixed(2), buildBugLink(NonTaipeiQuery));

    nTotalTaipeiBug += TDCbugs.bugs.length;
    nTotalNonTaipeiBug += NonTDCbugs.bugs.length;
}

function SecurityTeamCountBug(startRow, startColumn, version) {

    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiSecurity]);

    var NonTaipeiQuery = [];
    NonTaipeiQuery.push(["query_format", "advanced"]);
    NonTaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    NonTaipeiQuery.push(["resolution", "FIXED"]);
    NonTaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    NonTaipeiQuery.push(["o1", "equals"]);
    NonTaipeiQuery.push(["v1", "fixed"]);
    NonTaipeiQuery.push(["f2", "assigned_to"]);
    NonTaipeiQuery.push(["o2", "anywordssubstr"]);
    NonTaipeiQuery.push(["v2", GlobalSecurity]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    var NonTaipeiBugs = searchBugs(NonTaipeiQuery);
    var tdcSecurityTeamsize = TaipeiSecurity.split(",").length;
    var SecurityTeamsize = GlobalSecurity.split(",").length;

    UpdateCellFormula (teamSheet, startRow, startColumn, (TaipeiBugs.bugs.length/tdcSecurityTeamsize).toFixed(2), buildBugLink(TaipeiQuery));
    UpdateCellFormula (teamSheet, startRow, startColumn+1, (NonTaipeiBugs.bugs.length/SecurityTeamsize).toFixed(2), buildBugLink(NonTaipeiQuery));

    nTotalTaipeiBug += TaipeiBugs.bugs.length;
    nTotalNonTaipeiBug += NonTaipeiBugs.bugs.length;
}

function LayoutTeamCountBug(startRow, startColumn, version) {

    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiLayout]);

    var NonTaipeiQuery = [];
    NonTaipeiQuery.push(["query_format", "advanced"]);
    NonTaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    NonTaipeiQuery.push(["resolution", "FIXED"]);
    NonTaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    NonTaipeiQuery.push(["o1", "equals"]);
    NonTaipeiQuery.push(["v1", "fixed"]);
    NonTaipeiQuery.push(["f2", "assigned_to"]);
    NonTaipeiQuery.push(["o2", "anywordssubstr"]);
    NonTaipeiQuery.push(["v2", GlobalLayout]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    var NonTaipeiBugs = searchBugs(NonTaipeiQuery);
    var tdcLayoutTeamsize = TaipeiLayout.split(",").length;
    var LayoutTeamsize = GlobalLayout.split(",").length;

    UpdateCellFormula (teamSheet, startRow, startColumn, (TaipeiBugs.bugs.length/tdcLayoutTeamsize).toFixed(2), buildBugLink(TaipeiQuery));
    UpdateCellFormula (teamSheet, startRow, startColumn+1, (NonTaipeiBugs.bugs.length/LayoutTeamsize).toFixed(2), buildBugLink(NonTaipeiQuery));

    nTotalTaipeiBug += TaipeiBugs.bugs.length;
    nTotalNonTaipeiBug += NonTaipeiBugs.bugs.length;
}

function GraphicTeamCountBug(startRow, startColumn, version) {

    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiGraphic]);

    var NonTaipeiQuery = [];
    NonTaipeiQuery.push(["query_format", "advanced"]);
    NonTaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    NonTaipeiQuery.push(["resolution", "FIXED"]);
    NonTaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    NonTaipeiQuery.push(["o1", "equals"]);
    NonTaipeiQuery.push(["v1", "fixed"]);
    NonTaipeiQuery.push(["f2", "assigned_to"]);
    NonTaipeiQuery.push(["o2", "anywordssubstr"]);
    NonTaipeiQuery.push(["v2", GlobalGraphic]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    var NonTaipeiBugs = searchBugs(NonTaipeiQuery);
    var tdcGraphicTeamsize = TaipeiGraphic.split(",").length;
    var GraphicTeamsize = GlobalGraphic.split(",").length;

    UpdateCellFormula (teamSheet, startRow, startColumn, (TaipeiBugs.bugs.length/tdcGraphicTeamsize).toFixed(2), buildBugLink(TaipeiQuery));
    UpdateCellFormula (teamSheet, startRow, startColumn+1, (NonTaipeiBugs.bugs.length/GraphicTeamsize).toFixed(2), buildBugLink(NonTaipeiQuery));

    nTotalTaipeiBug += TaipeiBugs.bugs.length;
    nTotalNonTaipeiBug += NonTaipeiBugs.bugs.length;
}

function NetworkTeamCountBug(startRow, startColumn, version) {

    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiNetwork]);

    var NonTaipeiQuery = [];
    NonTaipeiQuery.push(["query_format", "advanced"]);
    NonTaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    NonTaipeiQuery.push(["resolution", "FIXED"]);
    NonTaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    NonTaipeiQuery.push(["o1", "equals"]);
    NonTaipeiQuery.push(["v1", "fixed"]);
    NonTaipeiQuery.push(["f2", "assigned_to"]);
    NonTaipeiQuery.push(["o2", "anywordssubstr"]);
    NonTaipeiQuery.push(["v2", GlobalNetwork]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    var NonTaipeiBugs = searchBugs(NonTaipeiQuery);
    var tdcNetworkTeamsize = TaipeiNetwork.split(",").length;
    var NetworkTeamsize = GlobalNetwork.split(",").length;

    UpdateCellFormula (teamSheet, startRow, startColumn, (TaipeiBugs.bugs.length/tdcNetworkTeamsize).toFixed(2), buildBugLink(TaipeiQuery));
    UpdateCellFormula (teamSheet, startRow, startColumn+1, (NonTaipeiBugs.bugs.length/NetworkTeamsize).toFixed(2), buildBugLink(NonTaipeiQuery));

    nTotalTaipeiBug += TaipeiBugs.bugs.length;
    nTotalNonTaipeiBug += NonTaipeiBugs.bugs.length;
}

function PerformanceTeamCountBug(startRow, startColumn, version) {

      // Query DOM team bugs
    var TaipeiQuery = [];
    TaipeiQuery.push(["query_format", "advanced"]);
    TaipeiQuery.push(["bug_status", "RESOLVED"], ["bug_status", "VERIFIED"]);
    TaipeiQuery.push(["resolution", "FIXED"]);
    TaipeiQuery.push(["f1", "cf_status_firefox" + version]);
    TaipeiQuery.push(["o1", "equals"]);
    TaipeiQuery.push(["v1", "fixed"]);
    TaipeiQuery.push(["f2", "assigned_to"]);
    TaipeiQuery.push(["o2", "anywordssubstr"]);
    TaipeiQuery.push(["v2", TaipeiPerf]);

    var TaipeiBugs = searchBugs(TaipeiQuery);
    //var NonTaipeiBugs = searchBugs(NonTaipeiQuery);
    var tdcPerfTeamsize = TaipeiPerf.split(",").length;

    UpdateCellFormula (teamSheet, startRow, startColumn, (TaipeiBugs.bugs.length/tdcPerfTeamsize).toFixed(2), buildBugLink(TaipeiQuery));
    //updateCellFormula (teamSheet, startRow, startColumn+1, (NonTaipeiBugs.bugs.length/NetworkTeamsize).toFixed(2), buildBugLink(NonTaipeiQuery));

    nTotalTaipeiBug += TaipeiBugs.bugs.length;
    //nTotalNonTaipeiBug += NonTaipeiBugs.bugs.length;
}

function CountTeamBugs() {

  var startRow = 4;
  var startColumn = 3;

  // Update Title Fileds
  UpdateTeamSize();

  // For each FFversion to count team bugs
  for (var j=0; j < FFversion.length; j++){
    var row = startRow + j;

    // Query DOM team bugs
    DOMTeamCountBug(row, startColumn, FFversion[j]);

    // Query Media team bugs
    MediaTeamCountBug(row, startColumn+2, FFversion[j]);

    // Query Security team bugs
    SecurityTeamCountBug(row, startColumn+4, FFversion[j]);

    // Query Layout team bugs
    LayoutTeamCountBug(row, startColumn+6, FFversion[j]);

    // Query Gfx team bugs
    GraphicTeamCountBug(row, startColumn+8, FFversion[j]);

    // Query Necko team bugs
    NetworkTeamCountBug(row, startColumn+10, FFversion[j]);

    // Query Performance team bugs
    PerformanceTeamCountBug(row, startColumn+12, FFversion[j]);

    // Update Summary
    teamSheet.getRange(row, startColumn+13).setValue(Math.round(nTotalTaipeiBug/53 * 100) / 100);
    teamSheet.getRange(row, startColumn+14).setValue(Math.round(nTotalNonTaipeiBug/102 * 100) / 100);
  }

}

function UpdateCellFormula (sheet, row, column, value, linkformula) {
  sheet.getRange(row, column).setFormula("=hyperlink(\"" + linkformula + "\";\"" + value + "\")");
}

function UpdateTeamSize() {
  var startRow = 3;
  var startColumn = 3;

  teamSheet.getRange(startRow, startColumn).setValue( TaipeiDOM.split(",").length );
  teamSheet.getRange(startRow, startColumn+1).setValue( GlobalDOM.split(",").length );
  teamSheet.getRange(startRow, startColumn+2).setValue( TaipeiMedia.split(",").length );
  teamSheet.getRange(startRow, startColumn+3).setValue( GlobalMedia.split(",").length );
  teamSheet.getRange(startRow, startColumn+4).setValue( TaipeiSecurity.split(",").length );
  teamSheet.getRange(startRow, startColumn+5).setValue( GlobalSecurity.split(",").length );
  teamSheet.getRange(startRow, startColumn+6).setValue( TaipeiLayout.split(",").length );
  teamSheet.getRange(startRow, startColumn+7).setValue( GlobalLayout.split(",").length );
  teamSheet.getRange(startRow, startColumn+8).setValue( TaipeiGraphic.split(",").length );
  teamSheet.getRange(startRow, startColumn+9).setValue( GlobalGraphic.split(",").length );
  teamSheet.getRange(startRow, startColumn+10).setValue( TaipeiNetwork.split(",").length );
  teamSheet.getRange(startRow, startColumn+11).setValue( GlobalNetwork.split(",").length );
  teamSheet.getRange(startRow, startColumn+12).setValue( TaipeiPerf.split(",").length );

  // update total
  teamSheet.getRange(startRow, startColumn+13).setValue(
                    [TaipeiDOM, TaipeiGraphic, TaipeiLayout, TaipeiMedia, TaipeiNetwork, TaipeiPerf, TaipeiSecurity].join(",").split(",").length);
  teamSheet.getRange(startRow, startColumn+14).setValue(
                    [GlobalDOM, GlobalGraphic, GlobalLayout, GlobalMedia, GlobalNetwork, GlobalSecurity].join(",").split(",").length);

}

function testCountTeamBugs() {
    var startColumn = 2;
    var startRow = 3;
    SecurityTeamCountBug(startRow, startColumn+13, "53")
}

function testCountTeamMembers() {
  var number = [TaipeiDOM, TaipeiGraphic, TaipeiLayout, TaipeiMedia, TaipeiNetwork, TaipeiPerf, TaipeiSecurity].join(",").split(",").length;
  var g = [GlobalDOM, GlobalGraphic, GlobalLayout, GlobalMedia, GlobalNetwork, GlobalSecurity].join(",").split(",").length;
  Logger.log( "Taipei Platform: " + number );
  Logger.log( "Global Platform: " + g );

}
