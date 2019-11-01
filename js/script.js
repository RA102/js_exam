$(document).ready(function(){

    localStorage.setItem( '1', JSON.stringify({ id: 1, name: "book 1", author: "author 1", count: 10 }));
    localStorage.setItem( '2', JSON.stringify({id: 2, name: "book 2", author: "author 2", count: 5}));


    for (let i = 1; i <= localStorage.length; i++) {
        let item = JSON.parse( localStorage.getItem(i))
        $("tbody").append(
            $('<tr>'),
            $('<th>').text(item.id),
            $('<td>').text(item.name),
            $('<td>').text(item.author),
            $('<td>').text(item.count),
            $('<td>').append(
                $('<a>').attr({'id':'edit', 'href': '#', 'data': item.id, 'data-target': '#modal' }).append(
                    $('<i>').addClass('fa fa-pencil')
                ),
            )
        );
    }

    $('#edit').on('click', function (event) {
        let id = $(this).attr('data');
        let item = JSON.parse(localStorage.getItem(id));
        $('body').prepend(
            $('<div>').attr({'class': 'modal', 'id': 'modal' }).append(
                $('<div>').attr('class', 'modal-dialog').append(
                    $('<div>').attr('class', 'modal-content').append(
                        $('<div>').attr('class', 'modal-header').append(
                            $('<h4>').attr('class', 'modal-title').text("Edit book"),
                            $('<button>').attr({ 'type': 'button', 'class': 'close', 'data-dismiss': 'modal', 'area-label': 'Close' }).text('x'),
                        ),
                        $('<div>').append(
                            $('<form>').append(
                                $('<div>').attr({ 'class': 'form-group'}).append(
                                    $('<label>').attr({'for': 'edit_id',}).text("Id"),
                                    $('<input>').attr(
                                        {
                                            'id': 'edit_id',
                                            'value': item.id,
                                            'class': 'form-control',
                                            'type': 'text'
                                        }).css('width', 'min-content'),
                                ),
                                $('<div>').attr({ 'class': 'form-group'}).append(
                                    $('<label>').attr({'for': 'edit_name',}).text("Name"),
                                    $('<input>').attr(
                                        {
                                            'id': 'edit_name',
                                            'value': item.name,
                                            'class': 'form-control',
                                            'type': 'text'
                                        }).css('width', 'min-content'),
                                ),
                                $('<div>').attr({ 'class': 'form-group'}).append(
                                    $('<label>').attr({'for': 'edit_name',}).text("Name"),
                                    $('<input>').attr(
                                        {
                                            'id': 'edit_author',
                                            'value': item.author,
                                            'class': 'form-control',
                                            'type': 'text'
                                        }).css('width', 'min-content')
                                ),
                                $('<button>').attr({'type': 'submit', 'class': 'btn btn-primary' }).text("Save")
                            ).attr({'method': 'post', 'id': 'modalForm', 'action'})
                        ).attr({'class': 'modal-body'})
                    )
                )
            )
        );
        $("#modal").modal('show');

        $('#modalForm').submit( function(event) {
            event.preventDefault();
            let $form = $(this);
            let id = $('#edit_id').val();
            console.log(id);
        });






    })  // on click на Edit









});   // end $(document).ready


function generetId () {
    return 'xxxxxxxx'.replace( /[xy]/g, function ( c ) {
        var r = Math.random() * 16 | 0;
        return ( c == 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );
    } );
};

function sendPostForm () {
    $('#modalForm').submit( function(event) {
        event.preventDefault();
        let $form = $( this ),
            id = $form.find($('#id')).val(),
            name =$form.find($('#name')).val();
        $.post(
            $form.serialize()
        );
        console.log(id)
        return false;
    })


}



