var expenseReportKeys = new Array();
var keysInitialized = false;
var reports = new Array();

function initializeReportKeys() {
    var s = window.localStorage.getItem("expenseReportKeys");
	if(s==null)
		expenseReportKeys = new Array();
	else
		expenseReportKeys = JSON.parse(s);

    keysInitialized = true;
}

function getNewKey() {
    if (!keysInitialized)
        initializeReportKeys();
    var newKey = "expenseKey" + expenseReportKeys.length;
	return newKey;
}

function saveReport(key, report) {
    window.localStorage.setItem(key, JSON.stringify(report));
	if(expenseReportKeys.indexOf(key)<0)
	{
		expenseReportKeys.push(key);
		window.localStorage.setItem("expenseReportKeys", JSON.stringify(expenseReportKeys));
	}
}

function getReport(key) {
    var s = window.localStorage.getItem(key);
    if (s == null || s == undefined)
        return {};
    else
        return JSON.parse(s);
}

function getReports() {
	if(!keysInitialized)
		initializeReportKeys();

	var reports = new Array();
	for(var key in expenseReportKeys)
	{
		reports.push(getReport(expenseReportKeys[key]));
	}
	return reports;
}

function cleanStore() {
    var s = window.localStorage.getItem("expenseReportKeys");
	var expenseReportKeys2 = new Array();

	// Remove duplicate keys
    for(var i=0;i<expenseReportKeys2.length;i++) {
	    window.localStorage.removeItem(expenseReportKeys2[i]);
	}

	window.localStorage.removeItem("expenseReportKeys");
}