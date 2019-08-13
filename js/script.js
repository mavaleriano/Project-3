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
const $activities = $('.activities label');
$activities.eq(2).attr('disabled');

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


/***
* PAYMENT INFO
    -Make job role field show when other is chosen
***/


/***
* FORM VALIDATION
    -Make job role field show when other is chosen
***/