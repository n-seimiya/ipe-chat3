window.onload = function() {
    var deleteBtn = document.getElementsByClassName("delete-btn");
    
    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", function(e) {
            e.preventDefault();
            
            if(window.confirm('本当に削除しますか？')) {
                document.getElementById('form_' + this.dataset.id).submit();
            }
        }, false)
    }
};

// $(function() {
//     var boxes = $('.message-box')
//     boxes.each(function(i, box) {
//         $(box).hover(function() {
//             var content = $(box).find('.message-block')
//             content.animate({fontSize : '24px'}, 500);
//         }, function() {
//             var content = $(box).find('.message-block')
//             content.animate({fontSize : '16px'}, 500);
//         })
//     })
// });

// $(function() {
//     var button = $('#remove-btn')
//     var icon = $('.top-icon')
//     function clickFunc() {
//         icon.toggle();
//     };
//     button.on("click", clickFunc)
// });

// $(function() {
//     var form = $('#chat-form')
//     form.keyup(function() {
//         var count = $(this).val().length;
//         $('#counter').text(count + "文字")
//         if (count > 10){
//             $('#counter').css('color', 'red');
//         } else if (count == 0 ) {
//             $("#counter").empty();
//         } else {
//             $('#counter').css('color', 'white');
//         }
//     })
// })

$(function() {
    function buildHTML(message) {
        console.log(message)
        var content = (message.content !== null) ? `${ message.content }`: "";
        var text = content.replace(/\n|\r\n|\r/g, '<br>');
        var name = (message.user_name !== null) ? `${ message.user_name }`: "";
        var date = (message.date !== null) ? `${ message.date }`: "";
        var id = (message.id !== null) ? `${ message.id }`: "";
        var img = (message.img.url !== null) ? `<p><img src = "${message.img.url}"/></p>`:""; 
        var btn = (message.user_id == message.current_user_id) ?    `<div class="message-post">
                                                                        <ul>
                                                                            <li>
                                                                                <a href="/messages/${id}/edit">edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a rel="nofollow" data-method="delete" href="/messages/${id}/delete">delete</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>` : "";

        var html = `<div class="message-box" data-message-id="${id}">
                        <div class="message-block">
                            <p class="message-info">
                                ${name}
                                <span>
                                ${date}
                                </span>
                            </p>
                            <p class="message-content">${text}</p>
                            ${img}
                        </div>
                        ${btn}
                    </div>`
                    return html;
    }

    $('#new_message').on('submit', function(e) {
        e.preventDefault();
        var messageContent = new FormData(this);
        var url = "/messages/create";

        $.ajax({
            url: url,
            type: 'POST',
            data: messageContent,
            dataType: 'json',
            processData: false,
            contentType: false,
        })

        .done(function(message) {
            var html = buildHTML(message);
            $('.chat-container').append(html);
            $('#chat-form').val('');
            $('.chat-container').animate({ scrollTop: $('.chat-container')[0].scrollHeight});
        })

        .fail(function() {
            alert('error');
        })
        return false;
    });

    var reloadMessages = function(message) {
        if ($(window.location).attr('pathname') == '/' || $(window.location).attr('pathname') == 'messages/index') {
            
            var last_message_id = $('.message-box:last').data('message-id');

            var url = 'api/messages'

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                data: {
                    last_message: last_message_id
                }
            })

            .done(function(messages) {
                var html = '';
                $(messages).each(function(i, message){
                    html = buildHTML(message);
                    $('.chat-container').append(html);
                    $('.chat-container').animate({ scrollTop: $('.chat-container')[0].scrollHeight});
                })

            })

            .fail(function() {
                alert('error');
            })

        } else {
            clearInterval
        }
    }
setInterval(reloadMessages, 5000);

})