CarregaLista();

function SalvarLista() {
    $('ul li').each(function (i) {
        if ($(this).attr('value') == null && $(this).is(":visible")) {
            var ischecked = false;
            if ($(this).attr('class') == "checked")
                ischecked = true;

            $(this).find('.close').text("");
            var item =
            {
                Nome: $(this).text(),
                Concluida: ischecked
            };

            PostData(item);
            $(this).find('.close').text("x");
        }
        if ($(this).is(":visible") && $(this).attr('value') != null) {
            var ischecked = false;
            if ($(this).attr('class') == "checked")
                ischecked = true;
            $(this).find('.close').text("");
            var item =
            {
                Nome: $(this).text(),
                Concluida: ischecked,
                Id: $(this).attr('value')

            };
            PutData(item);
            $(this).find('.close').text("x");
        }

        if (!$(this).is(":visible") && $(this).attr('value') != null)
            deleteData($(this).attr('value'));//verifica se tem id, caso tenha deleta do banco.

    });
}


function PostData(item) {

    $.ajax({
        type: "POST",
        data: JSON.stringify(item),
        url: "http://localhost:49167/api/TodoItems",
        dataType: "json",
        contentType: "application/json",
    });

}

function PutData(item) {



    var t = JSON.stringify(item);

    $.ajax({
        url: 'http://localhost:49167/api/TodoItems/' + item.Id,
        type: "put",
        contentType: "application/json; charset=utf-8",
        data: t,
        dataType: "json",

    });
}

function deleteData(id) {

    $.ajax({
        url: 'http://localhost:49167/api/TodoItems/' + id,
        type: 'DELETE',
        success: function (data) {

        },
        error: function (data) {
            alert('Problem in deleting car:' + data.responseText);
        }
    });
}

function CarregaLista() {
    $.ajax({
        type: "GET",
        url: "http://localhost:49167/api/TodoItems", //URI  

        dataType: "json",
        success: function (data) {
            debugger;
            var datavalue = data;
            var myJsonObject = datavalue;

            contentType: "application/json";
            $.each(myJsonObject, function (i, obj) {
                var classe = "";
                if (obj.Concluida) {
                    classe = "checked";
                }
                $("#myUL").append('<li value = ' + obj.Id + ' class =' + classe + '>' + obj.Nome + '<span class="close">×</span></li>');

            });
            CriarClose();

        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });

}
function CriarClose() {

    // Create a "close" button and append it to each list item
    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    // Add a "checked" symbol when clicking on a list item
    var list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);
}



// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}