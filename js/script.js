/*** 
    To find how to use autofocus for default focus field:
    https://stackoverflow.com/questions/17500704/javascript-set-focus-to-html-form-element/17500718
    To find how to hide default select for colors:
    https://stackoverflow.com/questions/27350843/how-can-i-hide-default-select-option-when-the-drop-down-is-clicked
 ***/
const $otherRole = $('#other-title').hide();
const $colorDiv = $('#colors-js-puns').hide();
const $select = $('#color option').hide();
const selectLength = $select.length;
const defColor = $('<option value="" selected disabled hidden>Choose any color</option>');
$('#color').append(defColor);
const $activities = $('.activities label input[type=checkbox]');
const $totalAmount = $('<label>Total amount: $0</label>');
$('.activities').append($totalAmount);
const $payment = $('#payment');
const creditCard = $payment.next();
const payPal = $payment.next().next();
payPal.hide();
const bitCoin = $payment.next().next().next();
bitCoin.hide();
const $paymentOptions = $payment.children();
$paymentOptions.eq(1).prop('selected', true);
$paymentOptions.eq(0).prop('disabled', true);


/***
* JOB ROLE
    -Make job role field show when other is chosen
***/
$('#title').change(function (event)
{
    if (event.target.value === 'other')
    {
        $otherRole.show();
    }
    else
    {
        $otherRole.hide();
    }
});


/***
 * T-SHIRT INFO
    -Make corresponding colors show depending on theme chosen
    -Hide color options until theme has been chosen
    Adding event listener to control the display of color depending on theme
    URL of page used to find correct event listener:
    https://www.w3schools.com/jquery/event_change.asp
    Getting to reset color select to default:
    https://stackoverflow.com/questions/4680075/set-selected-option-of-select-box
***/
$('#design').change(function (event)
{
    $colorDiv.show();
    const target = event.target.value;
    if (target === 'Select Theme')
    {
        $select.hide();
        $colorDiv.hide();
        $('#color').val("").prop('selected', true);
    }
    else if (target === 'js puns')
    {
        for (let i = 0; i < selectLength; i += 1)
        {   
            if (i < 3)
            {
                $select.eq(i).show();
            }
            else
            {
                $select.eq(i).hide()
            }
        }   
    }
    else if (target === 'heart js')
    {
        for (let i = 0; i < selectLength; i += 1) {
            if (i > 2) {
                $select.eq(i).show();
            }
            else {
                $select.eq(i).hide()
            }
        }  
    }
    else
    {
        alert('Something went wrong!');
    }

});


/***
* REGISTER FOR ACTIVITIES
    -Add up total cost for activities
    -Disable events that have time conflicts
    Using custom data attributes:
    http://html5doctor.com/html5-custom-data-attributes/
***/
$activities.change(function (event) {
    let target = event.target.name;
    let total = 0;
    if (target === "js-frameworks" && this.checked) {
        $activities.eq(3).prop('disabled', true);
    }
    else if (target === "js-frameworks")
    {
        $activities.eq(3).prop('disabled', false);
    }

    if (target === "js-libs" && this.checked) {
        $activities.eq(4).prop('disabled', true);
    }
    else if (target === "js-libs") {
        $activities.eq(4).prop('disabled', false);
    }

    $activities.each(function () {
        if (this.checked) {
            let regex = /\d{3}$/;
            let string;
            string = this.getAttribute('data-cost');
            total += parseFloat(string.match(regex));
        }
    });
    $totalAmount.html("Total amount: $" + total);
});


/***
* PAYMENT INFO
    -Display payment based on option chosen
***/
$payment.change(function (event)
{
    const target = event.target.value;
    if (target === "credit card") {
        payPal.hide();
        bitCoin.hide();
        creditCard.show();
    }
    if (target === "paypal")
    {
        creditCard.hide();
        bitCoin.hide();
        payPal.show();
    }
    if (target === "bitcoin") {
        creditCard.hide();
        payPal.hide();
        bitCoin.show();
    }
});

/***
* FORM VALIDATION
    -Make job role field show when other is chosen
***/