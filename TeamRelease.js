/**
 * Constructor -
 * @param err
 * @param result
 */
var ReleaseSheet = function (name) {

    // Call parent initial constructor
    SheetBase.call(this, name);

    // Collect Sheet information
    var FFRelease = ss.getRangeByName('Release!CurrentRelease').getValues();
    if (FFRelease != null) {
        this.today = FFRelease[1][0];
        this.version = FFRelease[1][1];
        this.merge_date = FFRelease[1][2];
        this.weeks = FFRelease[1][3];
    }

}

// create prototype from parent class
ReleaseSheet.prototype = Object.create(SheetBase.prototype);

// Set the "constructor" property
ReleaseSheet.prototype.constructor = ReleaseSheet;

//
ReleaseSheet.prototype.Generate = function () {
    Logger.log("Release Sheet has no Generate function")
}
