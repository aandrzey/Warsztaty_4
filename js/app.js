$(function () {

    let tbody = $('#tableBooks');
    downloadBooks(tbody);

    tbody.on("click", "tr", function () {
        downloadBookDetails($(this).next('tr'), this.dataset.id);
        console.log($(this).find('.bookDetails'));
    })

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
    console.log(book);
    let details = $(`<div>
                        <p>Autor: ${book.author}</p>
                        <p>Wydawca: ${book.publisher}</p>
                        <p>Typ: ${book.type}</p>
                        </div>`);

    $(div).children().eq(0).html(details);
    $(div).children().slideToggle(1000);
}

