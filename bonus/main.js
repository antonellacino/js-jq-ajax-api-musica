$(document).ready(function() {
    var source = document.getElementById("album-template").innerHTML;
    var template = Handlebars.compile(source);

    $.ajax({
        method: "GET",
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        success: function(data, stato) {
            var album = data.response;
            for (i = 0; i < album.length; i++) {
                var context = {
                    cover: album[i].poster,
                    title: album[i].title,
                    author: album[i].author,
                    year: album[i].year,
                    genre: album[i].genre
                }
                var html = template(context);
                //console.log(context);

                $('div.container').append(html);

            }
        },
        error: function(richiesta, stato, errori) {
            alert("E' avvenuto un errrore." + errore);
        }
    });

    $('#search').change(
        function() {
            var genreSelected = $(this).val().toLowerCase();
            console.log(genreSelected);
            if (genreSelected === "all") {
                $('.album').fadeIn();
                return;
            }
            $('.album').each(function() {
                var genreAlbum = $(this).data("genre").toLowerCase();
                console.log(genreAlbum);
                if (genreSelected === genreAlbum) {
                    $(this).fadeIn();
                } else {
                    $(this).fadeOut();
                }
            })
        }
    )
});