"use strict";

var $ = function (id) {
    return document.getElementById(id);
};

var calculateDiscountPercent = function (customerType, invoiceSubtotal) {
    var discountPercent;

    switch (customerType) {
        case "r":
            if (invoiceSubtotal < 100) {
                discountPercent = .01;
            } else if (invoiceSubtotal >= 100 && invoiceSubtotal < 250) {
                discountPercent = .1;
            } else if (invoiceSubtotal >= 250 && invoiceSubtotal < 500) {
                discountPercent = .25;
            } else if (invoiceSubtotal >= 500) {
                discountPercent = .3;
            }
            break;
        case "l":
            discountPercent = .3;
            break;
        case "h":
            if (invoiceSubtotal < 500) {
                discountPercent = .4;
            } else if (invoiceSubtotal >= 500) {
                discountPercent = .5;
            }
            break;
        default:
            discountPercent = 0;
            break;
    }

    return discountPercent;
};

var processEntries = function () {
    var discountAmount;
    var invoiceTotal;
    var discountPercent;

    //get values from page, reset subtotal to 2 decimals
    var customerType = $("type").value;
    var invoiceSubtotal = parseFloat($("subtotal").value);

    if (!isNaN(invoiceSubtotal)) {
        $("subtotal").value = invoiceSubtotal.toFixed(2);
        //call function to get discount percent
        discountPercent = calculateDiscountPercent(customerType, invoiceSubtotal);

        //calculate and display discount percent, amount and new total
        discountAmount = invoiceSubtotal * discountPercent;
        invoiceTotal = invoiceSubtotal - discountAmount;

        $("percent").value = (discountPercent * 100).toFixed(2);
        $("discount").value = discountAmount.toFixed(2);
        $("total").value = invoiceTotal.toFixed(2);
    } else {
        alert("Please enter a number");
    }

    $("subtotal").focus();

};




window.onload = function () {
    $("calculate_value").onclick = processEntries;
    $("type").focus();
};