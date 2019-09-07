$(function () {

    let tbody = $('#tableBooks');
    let addBookForm = $('#addBookForm');
    let addBookSubmit = $('#addBookSubmit');
    downloadBooks(tbody);

    tbody.on("click", "tr", function () {
        downloadBookDetails($(this).next('tr'), $(this).attr("data-id"));
    });

    addBookSubmit.on("click", function (e) {
        e.preventDefault();
        if (formValidation(addBookForm)) {
            addBook(addBookForm, tbody);
        } else {
            alert("Podaj wszystkie dane książki")
        }
    });


});

function downloadBooks(table) {
    table.html("");
    $.ajax({
            url: "http://localhost:8282/books",
            method: "GET",
            dataType: "json"
        }
    ).done(function (response) {
        response.forEach(function (item) {
            showBook(table, item);
        })
    })
}

function showBook(table, book) {
    console.log(book);
    let row = $(`<tr data-id="${book.id}">
                    <th scope="row">${book.id}</th>
                    <td>${book.title}</td>
                    <td>${book.isbn}</td>
                    <td>
                        <button class="btn btn-outline-dark" data-id =${book.id}>Usuń</button>
                    </td>
                </tr>
                <tr><td colspan="4" class="bookDetails"></td></tr>
`);
    table.append(row);
    table.find('.bookDetails').slideUp();
}

function downloadBookDetails(div, id) {
    $.ajax({
            url: "http://localhost:8282/books/" + id,
            method: "GET",
            dataType: "json"
        }
    ).done(function (response) {
        showBookDetails(div, response);
    })
}

function showBookDetails(div, book) {
    let details = $(`<div>
                        <p>Autor: ${book.author}</p>
                        <p>Wydawca: ${book.publisher}</p>
                        <p>Typ: ${book.type}</p>
                        </div>`);

    $(div).children().eq(0).html(details);
    $(div).children().slideToggle(1000);
}

function addBook(form, tbody) {
    $.ajax({
        url: "http://localhost:8282/books/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            isbn: $(form).find('#isbn').val(),
            title: $(form).find('#title').val(),
            author: $(form).find('#author').val(),
            publisher: $(form).find('#publisher').val(),
            type: $(form).find('#type').val()
        }),
        dataType: "json"
    }).done(function (response) {
        console.log(response);
        downloadBooks(tbody);
    }).fail(function (response) {
        console.log(response)
    })
}

function formValidation(form) {
    for (let input of $(form).find('.form-control')) {
        if ($(input).val() === "") {
            return false;
        }
    }
    return true;
}


