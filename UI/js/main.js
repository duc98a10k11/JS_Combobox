$(document).ready(function() {
    input_focus();
});

function input_focus() {
    $("#input_selected").focus(function() {
        $("#btn_selected").css({ "border": "1px solid #019160" })

    });
}