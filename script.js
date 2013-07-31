var meusProtocolos = function(nome, telefone){
    var endpointPath = '__xmlMeusProtocolos=';
    var strXML = '<meusProtocolos><nomeSolicitante>'+nome+'</nomeSolicitante><telefone>'+telefone+'</telefone></meusProtocolos>';

    var _url = 'MeusProtocolos.php?'+endpointPath+strXML;

    $.ajax({
        url: _url,
        success: handleMeusProtocolos
    });
};

var handleMeusProtocolos = function(xml){
    var protocolosXml = $.parseXML( $(xml)[2].innerText );

    var _html = '<h2>Protocolos:</h2><ul>';
    
    $(protocolosXml).find('protocolo').each(function(){
        var codigo = $(this).find('codigo').text();
        var dataInicio = $(this).find('inicio').text();
        var dataFim = $(this).find('fim').text();
        
        var statusProtocolo = 'fechado';
        if(dataFim == '')
            statusProtocolo = 'aberto';

        _html += '<li>Protocolo: <span class="codigo">'+codigo+'</span> - Status: '+statusProtocolo+' - Data de abertura: '+dataInicio;
        if(statusProtocolo == 'fechado')
            _html += ' - Data de encerramento: '+dataFim;
        _html += '</li>';
    });

    _html += '</ul>';

    $('body').append(_html);

    $('.codigo').on('click', function(){
        $(this).off('click');
        recuperaProtocolo( $(this) );
    })
};

var recuperaProtocolo = function($codigo){
    var codigo = $codigo.text();

    var endpointPath = 'xmlNumeroProcolo=';
    var strXML = '<RecuperaChamados><codigoProtocolo>'+codigo+'</codigoProtocolo></RecuperaChamados>';

    var _url = 'MobileChamadosDetalhadosProtocolo.php?'+endpointPath+strXML;

    $.ajax({
        url: _url,
        success: function(data){
            handleRecuperaProtocolo(data, $codigo);
        }
    });
};

var handleRecuperaProtocolo = function(xml, $codigo){
    var protocolosXml = $.parseXML( $(xml)[2].innerText );

    var _html = '<h3>Status:</h3>';
    
    $(protocolosXml).find('retornoChamadosDetalhadosProtocoloMobile').each(function(){
        $(this).children().each(function(){
            var tagName  = this.tagName;

            if(tagName == 'chamados'){
                _html += '<h4>Chamados</h4>';
                $(this).children().each(function(){
                    $(this).children().each(function(){
                        var tagName  = this.tagName;

                        if(tagName == 'classificacao' || tagName == 'endereco'){
                            _html += '<h5>'+tagName+'</h5>';
                            $(this).children().each(function(){
                                var tagName  = this.tagName;
                                var tagValue = $(this).text();
                                _html += '<b>'+tagName+': '+tagValue+'<br>';
                            });
                        }else{
                            var tagValue = $(this).text();
                            _html += '<b>'+tagName+': '+tagValue+'<br>';
                        }
                    });
                });
            }else{
                var tagValue = $(this).text();
                _html += '<b>'+tagName+': '+tagValue+'<br>';
            }
        })
    });

    $codigo.parent().after(_html);
};

$(document).ready(function(){
    $('#procura').on('click', function(){
        var nome     = $('#nome').val();
        var telefone = $('#telefone').val();
        meusProtocolos(nome, telefone);
    });
});