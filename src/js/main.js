$(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $('.site-header, .header-contacts').addClass('on');
        } else {
            $('.site-header, .header-contacts').removeClass('on');
        }
    });


    // Toggle responsive menu
    var sidebar = $('.sidebar');

    $('.sidebar-btn-open').click(function(e) {
        e.preventDefault();
        sidebar.toggleClass('slide-sidebar');
    });

    // Closing sidebar with ESC
    document.addEventListener('keyup', function(e) {
        if (e.keyCode == 27 && $('.sidebar').length) {
            sidebar.removeClass('slide-sidebar');
        }
    });

    // Ajax form
    var formContact = $('.form-contact');

    formContact.on('submit', function(e) {

        e.preventDefault();

        var alert = $('[class^=alert-]'),
            nome = $('#iName').val(),
            endereco = $('#iEnd').val(),
            fone = $('#iPhone').val(),
            email = $('#iEmail').val(),
            setor = $('#iSetor').val(),
            mensagem = $('#iMsg').val();

        $.ajax({
            url: 'https://formspree.io/contato@velozsolution.com',
            method: 'POST',
            data: {
                Nome: nome,
                Endereco: endereco,
                Fone: fone,
                Email: email,
                Setor: setor,
                Mensagem: mensagem,
                _replyto: email,
                _subject: 'Formulário de contato da Veloz Solution',
                _format: 'plain'
            },
            dataType: 'json',
            success: function() {
                console.log('success');
                $('.alert-success').slideDown('fast');
            },
            error: function() {
                $('.alert-error').slideDown('fast');
            },
            beforeSend: function() {
                $('.btn-send-contact').html("<span class='icon-spinner4 roll'></span> enviando...").attr('disabled', 'disabled');
                alert.slideUp('fast');
            },
            complete: function() {
                $('.btn-send-contact').html('Enviar').removeAttr('disabled');
            }
        });

        // Ajax close message
        alert.click(function() {
            $(this).fadeOut('fast');
        });
    });

    // WheelOff
    $(function() {
        $('.google-map').click(function() {
            $('.google-map iframe').css('pointer-events', 'auto');
        });
        $('.google-map').mouseleave(function() {
            $('.google-map iframe').css('pointer-events', 'none');
        });
    });

});
