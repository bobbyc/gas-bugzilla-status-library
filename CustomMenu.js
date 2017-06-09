function onOpen() {
  ss = SpreadsheetApp.getActiveSpreadsheet();

  var menuItems = [
    {name: 'Update Team Sheet', functionName: 'UpdateTeamSheet'},
    {name: 'Update Mozilla Sheet', functionName: 'UpdateMozillaSheet'},
    {name: 'Update Overall Sheet', functionName: 'UpdateOverallSheet'},
    {name: 'Update Regression Sheet', functionName: 'UpdateRegressionSheet'},
    {name: 'Send Status Email', functionName: 'SendStatusEmail'}
  ];
  ss.addMenu('Team Status', menuItems);
}
