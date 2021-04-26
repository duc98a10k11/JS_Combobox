/* 
 * Mảng gender
 */
const gender = [{ text: "Nam", value: 1 }, { text: "Nữ", value: 0 }, { text: "Khác", value: 2 }];
/* 
 * giá trị index dùng để tái sử code khi thêm dropdown.
 */
const index = 0;

/* 
 * ulTagName: getElement UL.
 */
const ulTagName = document.getElementsByTagName("UL");

/* 
 * liTagName: getElement LI.
 */
const liTagName = document.getElementsByTagName('LI');

/* 
 * currentFocus: vị trí focus vào item LI
 */
var currentFocus = -1;

$(document).ready(function() {
    onFocusInput();
    btnClick();
    DetectClickOutsideElement();
    CreateCheckedWhenClickOnElement();
    Autocomplete(document.getElementById("input"));
    mouseDownKeyBoard(document.getElementById("input"));
});

/* 
 * Focus vào input: Append mảng gender và hiển thị data-list UL
 * CreatedBy: LMDuc (25/04/2021)
 */
function onFocusInput() {
    $('#input').focus(function() {
        AppendElement(gender);
        ulTagName[index].classList.remove('invisible');
        $('#button').addClass('btnFocus');
    })
}

/* 
 * AppendElement: Lấy ra element của data-list rồi append LI vào data-list UL
 * CreatedBy: LMDuc (25/04/2021)
 */

function AppendElement(arr) {

    var element = ulTagName[index];
    var i;
    for (i = 0; i < arr.length; i++) {
        if (liTagName.length < arr.length) {
            var span = document.createElement("LI");
            span.innerHTML = arr[i].text.toString();
            span.setAttribute('value', arr[i].value.toString());
            element.appendChild(span);
        }
    }
}

/* 
 * DetectClickOutsideElement: click chuột ra bên ngoài field(chứa input và button) thì ẩn list UL.
 * CreatedBy: LMDuc (25/04/2021)
 */
function DetectClickOutsideElement() {
    $(document).on("click", function(event) {
        if (!$(event.target).closest(".field").length && !$(event.target).closest(".data-list").length) {

            ulTagName[index].classList.add('invisible');
            $('#button').removeClass('btnFocus');
        }
    });
}

/* 
 * CreateCheckedWhenClickOnElement: LI được chọn thì add 1 class checked(class thêm dấu tích phía trước) vào.
 * CreatedBy: LMDuc (25/04/2021)
 */
function CreateCheckedWhenClickOnElement() {
    var list = ulTagName[index];
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            var x = liTagName.length;
            var i;
            for (i = 0; i < x; i++) {
                if (liTagName[i].getAttribute('class') === 'checked') {
                    liTagName[i].classList.remove('checked');
                }
            }
            ev.target.classList.toggle('checked');
            $('#input').val(ev.target.innerHTML);

            $('#input').focus();
            ulTagName[index].classList.add('invisible');
        }
    });

}

/* 
 * Autocomplete: Theo dõi sự thay đổi giá tị input sau đó lọc mảng gender và append vào.
 * CreatedBy: LMDuc (25/04/2021)
 */
function Autocomplete(inp) {
    inp.addEventListener('input', function(e) {
        ulTagName[index].classList.remove('invisible');
        let val = $(this).val();
        let genderFilter = gender.filter((item) => item.text.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
        if (genderFilter.length == 0) {
            $('#button').removeClass('btnFocus');
            $('.field').addClass('error');
            $('.field').find('#input').attr('title', "Dữ liệu không tồn tại trong hệ thống.");
        }
        if (val === '' || genderFilter.length > 0) {
            $('.field').removeClass('error');
            $('.field').find('#input').removeAttr('title');
        }
        $('.data-list').children().remove();
        AppendElement(genderFilter);
        currentFocus = -1;
    });

}

/* 
 * btnClick: button click ẩn hiện data-list và append gender.
 * CreatedBy: LMDuc (25/04/2021)
 */
function btnClick() {
    $('#button').on('click', function() {
        if ($('.data-list').hasClass('invisible')) {
            var value = $('#input').val();
            $('.data-list').children().remove();
            AppendElement(gender);
            var i;
            for (i = 0; i < gender.length; i++) {
                if (gender[i].text == value) {
                    $('.data-list')[0].getElementsByTagName('LI')[i].classList.add('checked');
                }
            }
            $('.data-list').removeClass('invisible');
            currentFocus = -1;
        } else {
            $('.data-list')[0].classList.add('invisible');
            AppendElement(gender);
        }
    });
}

/* Lắng nghe sự kiện bấm phím up, down, enter.
 * CreatedBy: LMDuc (25/04/2021)
 */
function mouseDownKeyBoard(inp) {
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById('list');
        if (x) x = x.getElementsByTagName("LI");
        if (e.keyCode == 40) { //down
            currentFocus++;
            /* Thêm class hover vào thẻ LI */
            addActive(x);
        } else if (e.keyCode == 38) { //up

            currentFocus--;
            /* Thêm class hover vào thẻ LI */
            addActive(x);
        } else if (e.keyCode == 13) { //enter
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    })
}

/* Thêm class hover vào thẻ LI 
 * x: các thẻ LI được lấy ra từ UL
 * CreatedBy: LMDuc (25/04/2021)
 */
function addActive(x) {
    if (!x) return false;
    /* Xóa tất cả các class hover của tất cả thẻ LI */
    removeActive(x);
    /* currentFocus > các thẻ LI được tạo ra thì gán currentFocus = 0 để nó nhảy về vị trí đầu tiên */
    if (currentFocus >= x.length) currentFocus = 0;

    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("hover");
}

/* Xóa tất cả các class hover của tất cả thẻ LI 
 * CreatedBy: LMDuc (25/04/2021)
 */
function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("hover");
    }
}

/* 
 * Tạo function getText, getValue, getData tự định nghĩa.
 * CreatedBy: LMDuc (25/04/2021)
 */
(function($) {
    $.fn.getText = function() {
        return this[0].firstElementChild.getElementsByClassName('inputCBX')[0].value;
    };

    $.fn.getValue = function() {
        return this[0].firstElementChild.nextElementSibling.getElementsByClassName('checked')[0].getAttribute("value");
    };

    $.fn.getData = function() {
        var x = this[0].firstElementChild.nextElementSibling.getElementsByTagName('li').length;
        var itemText = this[0].firstElementChild.nextElementSibling.getElementsByTagName('li');
        var i;
        var item = [];
        for (i = 0; i < x; i++) {
            var obj = { text: itemText[i].textContent, value: itemText[i].getAttribute("value") };
            item.push(obj);
        }
        return item;
    };

}(jQuery));