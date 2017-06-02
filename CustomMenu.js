function onOpen() {
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var menuItems = [
    {name: 'Update', functionName: 'overallCountBug'},
    {name: 'Snapshot Weekly', functionName: 'saveWeeklyRecords'}
  ];
  ss.addMenu('[Caculate Bugs]', menuItems);
}
