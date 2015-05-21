var mainBillList = "#homeView #list";
$(document).ready(function () {
    $.getJSON("data/data.json").done(function (data) {

        localStorage.setItem("data", JSON.stringify(data));

        $.each(data.bills, function (index, value) {

            $(mainBillList).append(
                "<li><span class='bName'>" + bill.billname + "</span><span class='bAmount'>$" + bill.amount +
                    "</span></li>"
            );

        });

    }).fail(function () {

        if (localStorage.length != 0) {

            var localData = $.parseJSON(localStorage.getItem("data"));

            $.each(localData.bills, function (index, value) {

                $(mainBillList).append(
                    "<li><span class='bName'>" + bill.billname + "</span><span class='bAmount'>$" + bill.amount +
                        "</span></li>"
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
function saveBill(data) {
    var temp = [];
    temp = JSON.parse(localStorage.getItem('bills'));
    temp.push(data);
    console.log(temp);
    localStorage.setItem('bills', JSON.stringify(temp));

    loadBills();
}

function loadBills() {
    var bills = JSON.parse(localStorage.getItem('bills'));
    $(mainBillList).html('');

    if (bills.length > 0) {
        bills.forEach(function (bill) {
            $(mainBillList).append("<li><span class='bName'>" + bill.billname + "</span><span class='bAmount'>$" + bill.amount +
                "</span></li>");
        });
    } else {
        $(mainBillList).append('<li>No Bills</li>');
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
