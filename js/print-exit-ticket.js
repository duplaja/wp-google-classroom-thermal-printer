function print_exit_ticket(temp_data){
    
    var pass_data = temp_data;

    qz.websocket.connect().then(function() { 
        return qz.printers.find('ML');              // Pass the printer name into the next Promise
     }).then(function(printer) {
        var config = qz.configs.create(printer);       // Create a default config for the found printer
        var data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw ZPL
        return qz.print(config, data);
     }).then(function(){
        qz.websocket.disconnect();
     }).catch(function(e) { console.error(e); });
}

qz.security.setCertificatePromise(function(resolve, reject) {
        
    //Preferred method - from server
    var cert = jQuery('#store_data').data('certfile');
    jQuery.ajax({ url: cert, cache: false, dataType: 'text' }).then(resolve, reject);
});

qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
    
        var signfile = jQuery('#store_data').data('signfile');
        //Preferred method - from server
        jQuery.ajax(signfile +'?request='+ toSign).then(resolve, reject);

    };
});