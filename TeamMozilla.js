//Mozilla Teams
var MozillaDOM     = "overholt, bkelly, annevk, mcaceres, catalin.badea392, afarre, \
                     michael@thelayzells.com, amarchesini, jvarga, ehsan, hsivonen, \
                     josh@joshmatthews.net, bugmail@asutherland.org, kyle@nonpolynomial.com, \
                     wchen, bugs@pettay.fi";
var MozillaMedia   = "ajones, jyavenard, gsquelart, bvandyk, jharris, dglastonbury, dmajor, \
                     cpearce, kinetik, giles, karlt";
var MozillaSecurity= "sdeckelmann, mwobensmith, jld, huseby, kjozwiak, dveditz, tanvi, tom, kwilson, mgoodwin, \
                     jjones, franziskuskiefer, ttaubert, dkeeler, ptheriault, julian.r.hector, kmckinley, jkt, \
                     stephouillon, cr, francois, ckerschb, fbraun, abillings, twsmith, jschwartzentruber, choller, \
                     rforbes, cdiehl, gary@rumblingedge.com";
var MozillaLayout  = "bugs@junglecode.net, schneider@jancona.com, cam@mcc.id.au, \
                     kgilbert, xidorn+moz@upsuper.org, npancholi, bwerth, dholbert, \
                     tantek@cs.stanford.edu, jwatt@jwatt.org, matt.woodrow, mats, mstange@themasta.com, \
                     jfkthame, bbirtles, mantaroh, hiikezoe, m_kato, masayuki";
var MozillaGraphic = "milan, mchang, botond, aosmond, lsalzman, kvarkus, dmalyshau, rhunt, \
                     sotaro.ikeda.g, gwright, anthony.s.hughes, dvander, jmuizelaar, tnikkel, \
                     jgilbert, bugmail@mozilla.staktrace.com, bas@basschouten.com,  jnicol, \
                     nical.bugzilla, edwin";
var MozillaNetwork = "Jduell.mcbugs, daniel@haxx.se, dd.mozilla, valentin.gosu, hurley, \
                     michal.novotny, honzab.moz";


function TestCountBugMozilla() {

    // Create Product team group
    var runtime = [MozillaDOM, MozillaNetwork, MozillaSecurity].join(",");
    // TODO: Add Full Mozilla team into list
    var visual = [MozillaGraphic, MozillaLayout, MozillaMedia].join(",");
    // TODO: Add Fennec team into list
    var fennec = ["aaa@mozilla.com"].join(",");

    // Count team group, and post result
    CountBugDistribution(mozillaSheet, runtime, visual, fennec);
}


