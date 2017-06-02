function testSendStatusEmail()
{

    // Get Email Body
  var subject = "TDC Weekly Bug Status Update - "+ d.toDateString();
  var emailBody = composeEmailBody();

  // Send to single email
  MailApp.sendEmail({
    to: "bchien@mozilla.com",
    subject: subject,
    htmlBody: emailBody,
  });

}

// Send mail notification
function sendStatusEmail() {

  // Get Email Body
  var subject = "TDC Weekly Bug Status Update - "+ d.toDateString();
  var emailBody = composeEmailBody();

  var startRow = 2;  // First row of data to process
  var numRows = 100;   // Number of rows to process

  // Fetch the range of cells B2
  var dataRange = mailingSheet.getRange(startRow, 1, numRows, 2)

  // Fetch values for each row in the Range.
  var subscription = dataRange.getValues();

  // Send mails
  for (i in subscription) {
    var row = subscription[i];
    var name = row[0];
    var email = row[1];

    if (email == '')
      break;

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: emailBody,
    });
  }
}

function composeEmailBody()
{
  // Logon information
  var myEmail = Session.getActiveUser().getEmail();

  // Get version information
  currentVersion = dashboardSheet.getRange('B3').getValue().substring(0,2);
  releaseDate = scheduleSheet.getRange('B6').getValue();

  // Get all bug counts
  var overallCell = dashboardSheet.getRange('C3');
  var overallFormula = overallCell.getFormula();
  var overallLink = overallFormula.substring(12, overallFormula.indexOf("\","));

  // Get TDC firefox bug counts
  var tdcFirefoxCell = dashboardSheet.getRange('G3');
  var tdcFirefoxFormula = tdcFirefoxCell.getFormula();
  var tdcFirefoxlLink = tdcFirefoxFormula.substring(12, tdcFirefoxFormula.indexOf("\","));

  // Get TDC platform bug counts
  var tdcPlatformCell = dashboardSheet.getRange('H3');
  var tdcPlatformFormula = tdcPlatformCell.getFormula();
  var tdcPlatformlLink = tdcPlatformFormula.substring(12, tdcPlatformFormula.indexOf("\","));

  // Get TDC total
  var tdcTotalCell = dashboardSheet.getRange('I3');

  // Get TDC percentage
  var tdcHCRatioCell        = dashboardSheet.getRange('L3');
  var tdcBugPplRatioCell    = dashboardSheet.getRange('M3');
  var nonTdcBugPplRatioCell = dashboardSheet.getRange('N3');
  var tdcPercentageCell     = dashboardSheet.getRange('O3');
  var tdcP1PercentageCell   = dashboardSheet.getRange('AB3');
  var tdcP2PercentageCell   = dashboardSheet.getRange('AC3');
  var tdcP3PercentageCell   = dashboardSheet.getRange('AD3');
  var tdcP4PercentageCell   = dashboardSheet.getRange('AE3');
  var tdcP5PercentageCell   = dashboardSheet.getRange('AF3');
  var tdcPNPercentageCell   = dashboardSheet.getRange('AG3');

  var headerColor = "color:#ffffff;background-color:#2b90d9;";
  var contentColor = "border-color:#666666;";
  var cellStyle = "font-size:12px;text-align:center;border-style:solid;border-width:1px;text-align:center;padding:5px 5px";

  var nTDCHCRatio = (tdcHCRatioCell.getValue()*100).toFixed(2);
  var nTDCBugPplRatio = (tdcBugPplRatioCell.getValue()*100).toFixed(2);
  var nTDCPercentage = (tdcPercentageCell.getValue()*1).toFixed(2);
  var nNonTDCBugPplRatio = (nonTdcBugPplRatioCell.getValue()*1).toFixed(2);

  var nP1Percentage = (tdcP1PercentageCell.getValue() * 100).toFixed(2);
  var nP2Percentage = (tdcP2PercentageCell.getValue() * 100).toFixed(2);
  var nP3Percentage = (tdcP3PercentageCell.getValue() * 100).toFixed(2);
  var nP4Percentage = (tdcP4PercentageCell.getValue() * 100).toFixed(2);
  var nP5Percentage = (tdcP5PercentageCell.getValue() * 100).toFixed(2);
  var nPNPercentage = (tdcPNPercentageCell.getValue() * 100).toFixed(2);

  var emailBody = "Dear all,<br><br>"
  + "  Please check Taipei weekly bug count update:<br>"
  + "  Detail: <a href=\"https://goo.gl/gKXPv6\"> TDC Bug Status </a><br><br>"
  + "<table style=border-style:solid;border-width:1px;border-collapse:collapse;border-spacing:1;border:1>"
  + "<tr>"
  + "<th style="+headerColor+cellStyle+">Current Version</th>"
  + "<th style="+headerColor+cellStyle+">Release Date</th>"
  + "<th style="+headerColor+cellStyle+">Mozilla Total</th>"
  + "<th style="+headerColor+cellStyle+">Taipei Firefox</th>"
  + "<th style="+headerColor+cellStyle+">Taipei Platform</th>"
  + "<th style="+headerColor+cellStyle+">Taipei Total</th>"
  + "<th style="+headerColor+cellStyle+">Headcount Ratio</th>"
  + "<th style="+headerColor+cellStyle+">Bug Ratio</th>"
  + "<th style="+headerColor+cellStyle+">Non-TDC Bug/Ppl</th>"
  + "<th style="+headerColor+cellStyle+">TDC Bug/Ppl</th>"
  + "<th style="+headerColor+cellStyle+">P1</th>"
  + "<th style="+headerColor+cellStyle+">P2</th>"
  + "<th style="+headerColor+cellStyle+">P3</th>"
  + "<th style="+headerColor+cellStyle+">P4</th>"
  + "<th style="+headerColor+cellStyle+">P5</th>"
  + "<th style="+headerColor+cellStyle+">--</th>"
  + "</tr>"
  + "<tr>"
  + "<td style="+contentColor+cellStyle+">"+currentVersion+"</td>"
  + "<td style="+contentColor+cellStyle+">"+releaseDate+"</td>"
  + "<td style="+contentColor+cellStyle+"><a href=\"" + overallLink + "\">" + overallCell.getValue() + "</a></td>"
  + "<td style="+contentColor+cellStyle+"><a href=\"" + tdcFirefoxlLink + "\">" + tdcFirefoxCell.getValue() + "</a></td>"
  + "<td style="+contentColor+cellStyle+"><a href=\"" + tdcPlatformlLink + "\">" + tdcPlatformCell.getValue() + "</a></td>"
  + "<td style="+contentColor+cellStyle+">"+tdcTotalCell.getValue() +"</td>"
  + "<td style=background-color:#f6ccc9;"+contentColor+cellStyle+">"+ nTDCHCRatio  +"%</td>"
  + "<td style=background-color:#ddbbcc;"+contentColor+cellStyle+">"+ nTDCBugPplRatio +"%</td>"
  + "<td style=background-color:#ffe397;"+contentColor+cellStyle+">"+ nNonTDCBugPplRatio+"</td>"
  + "<td style=background-color:#b9d1f6;"+contentColor+cellStyle+">"+ nTDCPercentage  +"</td>"
  + "<td style=background-color:"+tdcP1PercentageCell.getBackground()+";"+cellStyle+">"+ nP1Percentage  +"%</td>"
  + "<td style=background-color:"+tdcP2PercentageCell.getBackground()+";"+cellStyle+">"+ nP2Percentage  +"%</td>"
  + "<td style=background-color:"+tdcP3PercentageCell.getBackground()+";"+cellStyle+">"+ nP3Percentage  +"%</td>"
  + "<td style=background-color:"+tdcP4PercentageCell.getBackground()+";"+cellStyle+">"+ nP4Percentage  +"%</td>"
  + "<td style=background-color:"+tdcP5PercentageCell.getBackground()+";"+cellStyle+">"+ nP5Percentage  +"%</td>"
  + "<td style=background-color:"+tdcPNPercentageCell.getBackground()+";"+cellStyle+">"+ nPNPercentage  +"%</td>"
  + "</tr>"
  + "</table>"
  // Attach charts
  + "<table style=border-width:0;border-collapse:collapse;border-spacing:1;border:0>"
  + "<tr>"
  + "<p align='left'>"
  + "<img src='https://docs.google.com/spreadsheets/d/1s2LCo4Raba0dni--pNi5m-MegGsihvPPhQzlI80U08g/pubchart?oid=1859949787&format=image'></p>"
  + "<img src='https://docs.google.com/spreadsheets/d/1s2LCo4Raba0dni--pNi5m-MegGsihvPPhQzlI80U08g/pubchart?oid=230676355&format=image'></p>"
  + "</tr>"
  + "<tr>"
  + "<p align='left'>"
  + "<img src='https://docs.google.com/spreadsheets/d/1s2LCo4Raba0dni--pNi5m-MegGsihvPPhQzlI80U08g/pubchart?oid=1380858210&format=image'>"
  + "<img src='https://docs.google.com/spreadsheets/d/1s2LCo4Raba0dni--pNi5m-MegGsihvPPhQzlI80U08g/pubchart?oid=1653645995&format=image'></p>"
  + "</tr>"
  + "Bobby Chien<br>"
  + "Engineering Program Manager, Mozilla<br>"
  + "✉ " + myEmail;

  return emailBody;
}
