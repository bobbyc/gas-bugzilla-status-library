function testSendStatusEmail()
{

      // Get Email Body
  var subject = "Update: TDC Weekly Status - "+ today.toDateString();

  // Send to single email
  MailApp.sendEmail({
    to: "\"Bobby Chien\" <bchien@mozilla.com>",
    subject: subject,
    htmlBody: composeNewEmailBody(),
  });

}

// Send mail notification
function SendStatusEmail() {

  // Get Email Body
  var subject = "TDC Weekly Bug Status Update - "+ today.toDateString();
  var emailBody = composeNewEmailBody();

  var startRow = 2;  // First row of data to process
  var numRows = 100;   // Number of rows to process

  // Fetch the range of cells B2
  var dataRange = mailingSheet.getRange(startRow, 1, numRows, 2)

  // Fetch values for each row in the Range.
  var subscription = dataRange.getValues();

  // Send emails
  var emails = [];
  for (i in subscription) {
    var row = subscription[i];
    var name = row[0];
    var email = row[1];

    if (email == '')
      break;
    else {
      email = [ "\"", name, "\" <", email, ">"];
      emails.push(email.join(""));
    }
  }

  // Sending emails
  emails = emails.join(",");
  Logger.log(emails);
  MailApp.sendEmail({
    to: emails,
    subject: subject,
    htmlBody: emailBody,
  });

}

function composeNewEmailBody() {

  var template = HtmlService.createTemplateFromFile('template.html');

  // Logon information
  var myEmail = Session.getActiveUser().getEmail();

  // Get version information
  template.currentVersion = dashboardSheet.getRange('B3').getValue().substring(0,2);
  template.releaseDate = scheduleSheet.getRange('B6').getValue();

  // Get all bug counts
  var overallCell = dashboardSheet.getRange('C3');
  var overallFormula = overallCell.getFormula();
  template.overallLink = overallFormula.substring(12, overallFormula.indexOf("\","));
  template.overallCell = overallCell.getValue();

  // Get TDC firefox bug counts
  var tdcFirefoxCell = dashboardSheet.getRange('G3');
  var tdcFirefoxFormula = tdcFirefoxCell.getFormula();
  template.tdcFirefoxlLink = tdcFirefoxFormula.substring(12, tdcFirefoxFormula.indexOf("\","));
  template.tdcFirefoxCell = tdcFirefoxCell.getValue();

  // Get TDC platform bug counts
  var tdcPlatformCell = dashboardSheet.getRange('H3');
  var tdcPlatformFormula = tdcPlatformCell.getFormula();
  template.tdcPlatformlLink = tdcPlatformFormula.substring(12, tdcPlatformFormula.indexOf("\","));
  template.tdcPlatformCell = tdcPlatformCell.getValue();

  // Get TDC total
  template.tdcTotalCell = dashboardSheet.getRange('I3').getValue();

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

  template.nTDCHCRatio = (tdcHCRatioCell.getValue()*100).toFixed(2);
  template.nTDCBugPplRatio = (tdcBugPplRatioCell.getValue()*100).toFixed(2);
  template.nTDCPercentage = (tdcPercentageCell.getValue()*1).toFixed(2);
  template.nNonTDCBugPplRatio = (nonTdcBugPplRatioCell.getValue()*1).toFixed(2);

  template.nP1Percentage = (tdcP1PercentageCell.getValue() * 100).toFixed(2);
  template.nP2Percentage = (tdcP2PercentageCell.getValue() * 100).toFixed(2);
  template.nP3Percentage = (tdcP3PercentageCell.getValue() * 100).toFixed(2);
  template.nP4Percentage = (tdcP4PercentageCell.getValue() * 100).toFixed(2);
  template.nP5Percentage = (tdcP5PercentageCell.getValue() * 100).toFixed(2);
  template.nPNPercentage = (tdcPNPercentageCell.getValue() * 100).toFixed(2);

  template.tdcP1CellBackground = tdcP1PercentageCell.getBackground();
  template.tdcP2CellBackground = tdcP2PercentageCell.getBackground();
  template.tdcP3CellBackground = tdcP3PercentageCell.getBackground();
  template.tdcP4CellBackground = tdcP4PercentageCell.getBackground();
  template.tdcP5CellBackground = tdcP5PercentageCell.getBackground();
  template.tdcPNCellBackground = tdcPNPercentageCell.getBackground();

  // Prepare for sending email
  var emailBody = template.evaluate().getContent();
  Logger.log(emailBody);
  return emailBody;
}
