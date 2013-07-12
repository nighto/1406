<?php
$url = 'http://200.222.65.84:8080/pcrj_ws_mobile/WsMobile.asmx/MobileChamadosDetalhadosProtocolo?xmlNumeroProcolo='.urlencode($_GET["xmlNumeroProcolo"]);
echo file_get_contents($url);
 ?>