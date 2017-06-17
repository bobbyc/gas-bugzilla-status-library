function onOpen() {
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var menuItems = [
    {name: 'Update Taipei Sheet', functionName: 'UpdateTeamSheet'},
    {name: 'Update Mozilla Sheet', functionName: 'UpdateMozillaSheet'},
    {name: 'Update Overall Sheet', functionName: 'UpdateOverallSheet'},
    {name: 'Update Regression Sheet', functionName: 'UpdateRegressionSheet'},
    {name: 'Update Team Week Sheet', functionName: 'UpdateTeamWeekSheet'},
    {name: 'Send Status Email', functionName: 'SendStatusEmail'}
  ];
  ss.addMenu('Team Status', menuItems);
}
