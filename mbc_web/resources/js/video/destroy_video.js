$(function(){
    
    function destroyVideo( videoURI, data = {} ){

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            denyButtonColor: '#d33',
            denyButtonText: `Cancel`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $.ajax({
                    method: "GET",
                    url: videoURI,
                    data: data
                })
                .done(function( msg ) {
                    console.log( msg );
                    Swal.fire('Deleted!', '', 'success').then(() => {
                         //location.reload(true); 
                         history.go(0);
                    });
                });
            } else if (result.isDenied) {
                console.log('result.isDenied', result.isDenied);
            }
        });

    }

    $('.btn-destroy').on('click', function( event ){
        event.preventDefault();
        var uri = $(this).attr('href');
        destroyVideo(uri);
    });

});