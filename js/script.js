/*** 
    PROJECT 3: INTERACTIVE FORM
    -Miguel Valeriano-Cabrera

    AIMING FOR EXCEEDS EXPECTATIONS

    To find how to use autofocus for default focus field:
    https://stackoverflow.com/questions/17500704/javascript-set-focus-to-html-form-element/17500718
    To find how to hide default select for colors:
    https://stackoverflow.com/questions/27350843/how-can-i-hide-default-select-option-when-the-drop-down-is-clicked
 ***/


// OTHER ROLE TASK VARIABLES
const $otherRole = $('#other-title').hide();

// SHIRT THEME AND COLOR TASK VARIABLES
const $colorDiv = $('#colors-js-puns').hide();
const $select = $('#color option').hide();
const selectLength = $select.length;
const defColor = $('<option value="" selected disabled hidden>Choose any color</option>');
$('#color').append(defColor);
const $shirtValidation = $('<p>Finish choosing your shirt</p>');
$shirtValidation.css('color', 'red');
$('#design').after($shirtValidation);
$shirtValidation.hide();

// ACTIVITIES TASK VARIABLES
const $activities = $('.activities label input[type=checkbox]');
const $totalAmount = $('<label>Total amount: $0</label>');
$('.activities').append($totalAmount);
const $activityValidation = $('<p>Choose at least one activity</p>')
$activityValidation.css('color', 'red');
$('.activities').append($activityValidation);
$activityValidation.hide();

// PAYMENTS TASK VARIABLES
const $payment = $('#payment');
const creditCard = $payment.next();
const payPal = $payment.next().next();
payPal.hide();
const bitCoin = $payment.next().next().next();
bitCoin.hide();
const $paymentOptions = $payment.children();
$paymentOptions.eq(1).prop('selected', true);
$paymentOptions.eq(0).prop('disabled', true);

// VALIDATION TASK VARIABLES
    //** FOR NAME
const nameValidation = $('<p>Enter valid username: No numbers or special characters</p>');
nameValidation.css('color', 'red');
nameValidation.hide();
$('#name').after(nameValidation);
    //** FOR EMAIL
const emailValidation = $('<p>Follow email example: example@gmail.com</p>');
emailValidation.css('color', 'red');
emailValidation.hide();
$('#mail').after(emailValidation);
    //** FOR OTHER ROLE
const roleValidation = $('<p>Enter valid role: No numbers or special characters</p>');
roleValidation.css('color', 'red');
roleValidation.hide();
$('#other-title').after(roleValidation);
    //** FOR PAYMENT
const paymentValidation = $('<p align="justify">Enter valid values:<li>13-16 digit credit card number</li><li>5-digit zip code</li><li>Only numbers in CVV</li></p>');
paymentValidation.css('color', 'red');
paymentValidation.hide();
$('#cvv').after(paymentValidation);
    //** FOR ALL INPUTS
var $input = $('input');

/***
    formComplete stays false while there exists erroneous information and is turned to true
    whenever valid inputs are obtained
***/
var formComplete = false;

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
    * Make corresponding colors show depending on theme chosen
    * Hide color options until theme has been chosen
    * Adding event listener to control the display of color depending on theme
    ** URL of page used to find correct event listener:
    https://www.w3schools.com/jquery/event_change.asp
    ** Getting to reset color select to default:
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
        $('#color').val("").prop('selected', true);
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
        $('#color').val("").prop('selected', true);
    }
    else
    {
        alert('Something went wrong!');
    }
});


/***
* REGISTER FOR ACTIVITIES
    * Add up total cost for activities
    * Disable events that have time conflicts
    ** Using custom data attributes:
    http://html5doctor.com/html5-custom-data-attributes/
***/
$activities.change(function (event)
{
    let target = event.target.name;
    let total = 0;
    if (target === "js-frameworks" && this.checked)
    {
        $activities.eq(3).prop('disabled', true);
    }
    else if (target === "js-frameworks")
    {
        $activities.eq(3).prop('disabled', false);
    }

    if (target === "express" && this.checked) {
        $activities.eq(1).prop('disabled', true);
    }
    else if (target === "express") {
        $activities.eq(1).prop('disabled', false);
    }

    if (target === "node" && this.checked) {
        $activities.eq(2).prop('disabled', true);
    }
    else if (target === "node") {
        $activities.eq(2).prop('disabled', false);
    }

    if (target === "js-libs" && this.checked)
    {
        $activities.eq(4).prop('disabled', true);
    }
    else if (target === "js-libs")
    {
        $activities.eq(4).prop('disabled', false);
    }

    $activities.each(function () {                      // Used to loop through checkboxes
        if (this.checked) {
            let regex = /\d{3}$/;                       // Create regex, look for the three decimal value
            let string;
            string = this.getAttribute('data-cost');
            total += parseFloat(string.match(regex));   // Turns the retrived value to float to be added together
            $activityValidation.hide();                 // Helps hide the $activityValidation error message
        }
    });
    $totalAmount.html("Total amount: $" + total);
});


/***
* PAYMENT INFO
    * Display payment based on option chosen, hides the other related fields
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
    * Checks to make sure each field has a valid input
    * If input is erroneous, then this is indicated with red border or output
    * Validate function is explained below
***/
$('input').on('input', function(event) 
{
    let target = event.target.name;
    let value = $(event.target).val();

    if (target === "user-name")
    {
        Validate(/^[a-z]+( [a-z]+)?( [a-z]+)?( ?\-?[a-z]+)?$/i, value, event.target, nameValidation);
    }
    if (target === "user-email")
    {
        Validate(/^[^@]+@[^@.]+\.[a-z]+$/i, value, event.target, emailValidation);
    }
    if (target === "other-title")
    {
        Validate(/^[a-z]*$/i, value, event.target, roleValidation);
    }
    if (target === "user-cc-num") 
    {
        Validate(/^(\d{13,16})$/, value, event.target, paymentValidation);
    }
    if (target === "user-zip") 
    {
        Validate(/^(\d{5})$/, value, event.target, paymentValidation);
    }
    if (target === "user-cvv") 
    {
        Validate(/^\d{3}$/, value, event.target, paymentValidation);
    }
});


/***
    Function created when refactoring program
    * Takes in regex (the rule to search for), value (what to compare),
    * target object, and validationType (specific field being affected)
    ****** formComplete is explained at the top
***/
const Validate = (regex, value, target, validationType) =>
{
    
    if (!(regex.test(value))) {
        target.style.borderColor = "red";
        validationType.show();
        formComplete = false;
    }
    else {
        target.style.borderColor = "";
        validationType.hide();
        formComplete = true;
    }
}


/***
    Event that takes care of checking for errors or missing input fields
    *[1]* Checks that the fields are shown, so as not to account for other role if not chosen
    *[2]* Checks that at least one activity has been chosen
    *[3]* Prevents default actions if there is something incomplete
***/
$('button').click(function (event)
{
    let isComplete = 0;     // Keeps track of any incomplete fields
    var checkBoxes = false; // Stays false while checkboxes are unchecked

    for (let i = 0; i < $input.length; i += 1) // [1]
    {
        if ($input.eq(i).val() === "" && $input.eq(i).css('display') !== "none")
        {
            $input.eq(i).css('border-color', 'red'); // Changes the color of border if there's missing or erroneous information
            $input.eq(i).attr('placeholder', 'Empty field, enter valid input!');
            isComplete += 1;
        }
    }
    for (let i = 0; i < $activities.length; i += 1) // [2]
    {
        if ($activities.eq(i).prop('checked'))
        {
            checkBoxes = true;
        }
    }
    if (checkBoxes === false)
    {
        $activityValidation.show();
        isComplete += 1;
    }

    if (isComplete > 0 || $('#design option:selected').val() === "Select Theme" || $('#color option:selected').val() === "") // [3]
    {
        alert("Validation error: Fix red validation messages!")
        event.preventDefault();
    }

    if ($('#design option:selected').val() === "Select Theme" || $('#color option:selected').val() === "")
    {
        $shirtValidation.show();
    }
});


/***
    Listening for choosing color of shirt
    * The only real purpose of this listener is to hide the validation message once it gets fixed
***/
$('#color').click(function () {
    if ($('#color option:selected').val() !== "")
    {
        $shirtValidation.hide();
    }
});