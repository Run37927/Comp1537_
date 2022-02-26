
let history = []
function operate(op) {
    x = parseInt($('#x').val());
    y = parseInt($('#y').val());

    switch(op) {
        case 'add':
            expression = x + ' + ' + y + ' = ' + (x + y);
            break;
        case 'sub':
            expression = x + ' - ' + y + ' = ' + (x - y);
            break;
        case 'mul':
            expression = x + ' * ' + y + ' = ' + (x * y);
            break;
        case 'div':
            expression = x + ' / ' + y + ' = ' + (x / y);
            break;
        case 'ac':
            expression = $('#x').val("0") + $('#y').val("0")
            $('#result').html('');
            history = []
            $('#history').html(history)
            break;
        default:
            expression = 'ERROR'
            console.log("Error in calculation")
    }
    if (op != 'ac') {
        jQuery('#result').html("Result of " + expression);
    history.unshift(`<div class=${op}-color>${expression}</div>`);
    $('#history').html(history);}
}

function setup() {
    $(".operator").click(function(){operate(this.id)} )
}

$(document).ready(setup);