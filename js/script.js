/* BEM VINDO, MARINHEIRO 
   O desafio demorou mas saiu rápido
   Antes de tudo, leia todas as dicas e obersações no link do desafio
   ...
   *-* Todo conteudo dentro de $(document).ready( function() { ... } ); será execultado assim que carregar a página
*/
$(document).ready(function() 
{
    //Inserir um comando para deixar a div #alerta movel  (Dica: função da jqueryui)
    $("#alerta").draggable();
    //chamar a funcão chamada "contador"
    contador();

    //Estilização
    //animMenu();
    animAprenda();

    //Fazer a alerta aparecer depois de 5 segundos, chamando ã função toggleAlert
    $("#novidadesform [type='submit']").click(function(e) 
    {
        e.preventDefault();

        //criar uma variavel e pegar o conteudo digitado na input
        var e_mail = document.forms["contact-form"]["email"].value;//document.forms["contact-form"]["email"].value;

        //verificar se o campo não está vazio com if e else
        if (e_mail != "") 
        {
            $.ajax({
                type: 'post',
                data: {'meuemail': e_mail},
                dataType: 'JSON',
                url: 'https://51.254.204.44/ti/enviar_email.php',
                success: function(retorno)
                {
                    toastr.success(retorno.text, 'Sucesso!');
                    $(".resultado").html(e_mail + " foi salvo em nossa lista de novidades =)");
                    $("#campo_email").val("");
                    setTimeout(toggleAlert, 2000);

                },
                error: function(erro)
                {
                    toastr.error(erro, 'Erro - Insira um email válido');
                }
            })
        }
        else
        {
            toastr.error('Preencha um email!', 'Error!');
        }

        //se for vazio execultar o comando abaixo
        //toastr.error('Preencha um email!', 'Error!');

        //se não for vazio enviar uma requisição com -requisição AJAX- do tipo POST para http://51.254.204.44/ti/enviar_email.php 
        // -- passando o paramentro "meuemail" e o dataType JSON

        //SE OCORRER TUDO CERTO COM A REQUISIÇAO: 1° exibir um toastr.sucess com a mensagem  | 2° 
        // 2° colocar um texto na div  de class resultado. "*emaildigitado* foi salvo em nossa lista de novidades =)"
        //limpar input
        //fechar a alerta depois de 2 segundos

        //SE não ocorrer tudo certo a alerta ñ deve fechar. Exibir um toastr.error com a mensagem do erro retornada pelo servidor



    });
});

/* NÃO MEXER 
   Se tiver visível, após executar a função, a div será oculta e vice-versa
*/
function toggleAlert() 
{
    $('#alerta').slideToggle();
}

//Contador inicia em 5
var i = 5;
var controle = 1;

function contador() 
{
    //Ocultar a div #contador qnd o cronometro ser menor ou igual a ZERO
    //Mudar a cor do texto da div #contador qnd o cronometro ser menor ou igual a TRES
    //Sinalizar contador. Ex: Alerta aparecendo em: __  (usar a div #contador)
    
    setInterval(function(){uContador()}, 1000);
}

function uContador() 
{
    if (i <= 0) 
    {
        $('#contador').hide();
    }

    if (i <= 3) 
    {
        $('#contador').css("color", "#80000");
    }
    
    document.getElementById('contador').innerText = "Alerta aparecendo em: " + i;
    
    i--;

    if(i < 0 && controle == 1)
    {
        controle = 0;
        toggleAlert();
    }
}

function animAprenda()
{
    $("#div-header").animate({
        height: "toggle"
    }, 1500, function(){});
}

function escurecerBotao(objeto)
{
    $("#"+objeto).css("opacity", "0.3");
}

function normalizarBotao(objeto)
{
    $("#"+objeto).css("opacity", "");   
}

function irPara(objeto)
{
    $('html, body').animate({
        scrollTop: $('#'+objeto).offset().top
    }, 1000);
}