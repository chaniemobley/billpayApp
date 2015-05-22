var mainBillList = "#homeView #list";
var paidBillList = "#paidView #paidBills";
$(document).ready(function () {
    $.getJSON("data/data.json").done(function (data) {

        localStorage.setItem("data", JSON.stringify(data));

        $.each(data.bills, function (index, value) {

            $(mainBillList).append(
                "<li><span class='bName'>" + value.billname  + "</span><span class='bAmount'>$" + value.amount +
                    "</span>" + "<span class='bDate'>due " + value.duedate + "</span></li>"
            );


        });
        $.each(data.paid, function (index, value) {

            $(paidBillList).append(
                "<li><span class='bName'>" + value.billname  + "</span><span class='paiddate'>paid " + value.paiddate + "</span><span class='bAmount'>$" + value.amount + "</span></li>"
            );

        });

    }).fail(function () {

        if (localStorage.length != 0) {

            var localData = $.parseJSON(localStorage.getItem("data"));

            $.each(localData.bills, function (index, value) {

                $(mainBillList).append(
                    "<li><span class='bName'>" + value.billname  + "</span><span class='bAmount'>$" + value.amount +
                        "</span>" + "<span class='bDate'>due " + value.duedate + "</span></li>"
                );

            });
            $.each(data.paid, function (index, value) {

                $(paidBillList).append(
                    "<li><span class='bName'>" + value.billname  + "</span><span class='paiddate'>paid " + value.paiddate + "</span><span class='bAmount'>$" + value.amount + "</span></li>"
                );

            });

        }

    });
    init();
    loadBills();
});
function init() {
    setBindings();
}
//function saveBill(data) {
//    var temp = [];
//    temp = JSON.parse(localStorage.getItem('bills'));
//    temp.push(data);
//    console.log(temp);
//    localStorage.setItem('bills', JSON.stringify(temp));
//
//    loadBills();
//}

function loadBills() {
    var storedBills = JSON.parse(localStorage.getItem('data'));
    var bills = storedBills.bills;
    var paid = storedBills.paid;

    $(mainBillList).html('');

    if (bills.length > 0) {
        bills.forEach(function (bill) {
            $(mainBillList).append("<li><span class='bName'>" + value.billname  + "</span><span class='bAmount'>$" + value.amount +
                "</span>" + "<span class='bDate'>due " + value.duedate + "</span></li>");
        });
    } else {
        $(mainBillList).append('<li>No Bills</li>');
    }
    if (paid.length > 0) {
        paid.forEach(function (paidBill) {
            $(paidBillList).append("<li><span class='bName'>" + value.billname  + "</span><span class='paiddate'>paid " + value.paiddate + "</span><span class='bAmount'>$" + value.amount + "</span></li>");
        });
    } else {
        $(paidBillList).append('<li>No Paid Bill History</li>');
    }
}
function setBindings(){
    var currentView = "homeView";
    var nextView;
    $("i").click(function(event){
        nextView = event.currentTarget.id + "View";
        console.log(nextView);
        if (currentView != nextView){
            $("#" + nextView).css("z-index", "2");
            $("#" + currentView).css("z-index", "1");

            $("#" + currentView).animate({
                left: "100%"
            }, 200, function() {
                currentView = nextView;
            });
            $( "#" + nextView).animate({
                left: "0"
            }, 200, function() {
                // Animation complete.
            });
        }
    })
}
