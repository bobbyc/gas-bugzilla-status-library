// create weekly records
function saveWeeklyRecords() {
  // insert new row
  dashboardSheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[0]);
  weeklySheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[1]);
  weeklySheet.insertRows(3);

  // Get latest records from dashboard sheet
  var dataRange = dashboardSheet.getRange(3, 2, 1, 32);
  var data = dataRange.getValues();
  currentVersion = dashboardSheet.getRange('B3').getValue().substring(0,2);
  data[0][0] = currentVersion;

  weeklySheet.getRange(3, 2, 1, 32).setValues(data);

  // Set Weekly date
  weeklySheet.getRange(3, 1).setValue(d.toDateString().substring(4, 15));

}
