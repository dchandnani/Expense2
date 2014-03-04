var report = {};
var key = null;
var reports = new Array();
var photoData = null;
var itemIndex = -1;

// cleanStore();

function addExpenseItemClicked (event) {
	itemIndex = -1;
	photoData = null;
	$.mobile.navigate("#expenseItemPage");
}

function itemDoneClicked(e) {
	var o = {};
	o.vendor = document.getElementById("vendor").value;
	o.cost = document.getElementById("cost").value;
	o.category = document.getElementById("category").value;
	o.date = document.getElementById("date").value;
	o.photodata = photoData;

	if(itemIndex>=0)
		report.items[itemIndex] = o;
	else {
		if(report.items==undefined)
			report.items = [];
		report.items.push(o);
	}

	$("#itemsBody").html("");
	if(report.items!=undefined && report.items!=null) {
           for(var i=0;i<report.items.length;i++) {
           		var s = $("#itemsBody").html();
				$("#itemsBody").html(s + "<tr onclick=\"showItem("+ i +")\"><td class=\"ui-table-priority-1\">" + report.items[i].vendor + "</td><td class=\"ui-table-priority-1\">" + report.items[i].cost + "</td><td class=\"ui-table-priority-1\">" + report.items[i].category + "</td><td class=\"ui-table-priority-1\">" + report.items[i].date + "</td></tr>");
           }
	}

	document.getElementById("vendor").value = "";
	document.getElementById("cost").value = "";
	document.getElementById("category").value = "";
	document.getElementById("date").value = "";

	$.mobile.navigate("#createExpensePage");
}

function saveFields() {
    report.title = document.getElementById("title").value;
	report.costCenter = document.getElementById("costCenter").value;
	report.interimApprover = document.getElementById("interimApprover").value;
	report.finalApprover = document.getElementById("finalApprover").value;
	report.comments = document.getElementById("comments").value;
}

function resetFields() {
	document.getElementById("title").value = "";
	document.getElementById("costCenter").value = "";
	document.getElementById("interimApprover").value = "";
	document.getElementById("finalApprover").value = "";
	document.getElementById("comments").value = "";
	$("#itemsBody").html("");
}

function saveReportClicked() {
	saveFields();
	if(key==null)
		key = getNewKey();
	saveReport(key, report);
	resetFields();
}

function submitReportClicked() {
	saveFields();
	report.submitted = true;
	if(key==null)
		key = getNewKey();
	saveReport(key, report);
	resetFields();
}

function pastExpensesClicked() {
	$.mobile.navigate("#listExpensesPage");
	reports = getReports();
	if(reports==null || reports.length<=0)
		return;

	$("#pastExpensesList").html("");
	var index = 0;
	for(var r in reports)
	{
        var s = $("#pastExpensesList").html();
		$("#pastExpensesList").html(s + "<li class=\"ui-btn ui-btn-icon-right ui-icon-carat-r ui-li-static ui-body-inherit ui-last-child\" onclick=\"showReport(" + index + ");\"><h2>" + reports[r].title + "</h2><p>" + (reports[r].submitted ? "Submitted" : "Not Submitted") + "</p></li>");
		index++;
	}
}

function showReport(index) {
	if(reports==null || index>reports.length+1)
		return;

	report = reports[index];
	key = expenseReportKeys[index];
	$.mobile.navigate("#createExpensePage");

	// Set the fields
   	document.getElementById("title").value = report.title;
	document.getElementById("costCenter").value = report.costCenter;
	document.getElementById("interimApprover").value = report.interimApprover;
	document.getElementById("finalApprover").value = report.finalApprover;
	document.getElementById("comments").value = report.comments;

	$("#itemsBody").html("");
	if(report.items!=undefined && report.items!=null) {
           for(var i=0;i<report.items.length;i++) {
           		var s = $("#itemsBody").html();
				$("#itemsBody").html(s + "<tr onclick=\"showItem("+ i +")\"><td class=\"ui-table-priority-1\">" + report.items[i].vendor + "</td><td class=\"ui-table-priority-1\">" + report.items[i].cost + "</td><td class=\"ui-table-priority-1\">" + report.items[i].category + "</td><td class=\"ui-table-priority-1\">" + report.items[i].date + "</td></tr>");
           }
	}
}

function showItem(index) {
	itemIndex = index;
	$.mobile.navigate("#expenseItemPage");

	document.getElementById("vendor").value = report.items[index].vendor;
	document.getElementById("cost").value = report.items[index].cost;
	document.getElementById("category").value = report.items[index].category;
	document.getElementById("date").value = report.items[index].date;
	photoData = report.items[index].photodata;

	var smallImage = document.getElementById('smallImage');
	if(photoData==null || photoData == undefined)
		smallImage.style.display = 'block';
	else {
		smallImage.style.display = 'block';
		smallImage.src = "data:image/jpeg;base64," + report.items[index].photodata;
	}
}
