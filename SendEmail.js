function testSendStatusEmail() {

  // Get Email Body
  var subject = "Update: TDC Weekly Status - " + today.toDateString();

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
  var subject = "TDC Weekly Bug Status Update - " + today.toDateString();
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
      email = ["\"", name, "\" <", email, ">"];
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
  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  var releaseDate = (new Date(dashboardSheet.getRange('C2').getValue() - tzoffset)).toISOString().slice(0,10);
  var releaseWeek = [GetOrdinalNumberOf(dashboardSheet.getRange('E2').getValue()),
                          dashboardSheet.getRange('D2').getValue()].join(' / ')

  // replace variable in template
  template.currentVersion = dashboardSheet.getRange('B2').getValue();
  template.releaseDate = releaseDate;
  template.releaseWeek = releaseWeek;
  template.daysToGo = dashboardSheet.getRange('F2').getValue();
  template.FirefoxWeeklyCount = dashboardSheet.getRange('F2').getValue();
  template.AndroidWeeklyCount = dashboardSheet.getRange('G2').getValue();


  // Prepare for sending email
  var emailBody = template.evaluate().getContent();
  Logger.log(emailBody);
  return emailBody;
}

function GetOrdinalNumberOf(number) {
  var j = number % 10,
    k = number % 100;
  if (j == 1 && k != 11) {
    return number + "st";
  }
  if (j == 2 && k != 12) {
    return number + "nd";
  }
  if (j == 3 && k != 13) {
    return number + "rd";
  }
  return number + "th";
}
