function print_exit_ticket(sname,stime,sdate,slocation){
    
    var printer_find = 'TM-T20II';
    var teacher_name = 'Mr. Dulaney';

    qz.websocket.connect().then(function() { 
        return qz.printers.find(printer_find);              // Pass the printer name into the next Promise
     }).then(function(printer) {
        var config = qz.configs.create(printer);       // Create a default config for the found printer
        //var data = ['0x1B@0x1B!0x38HALL PASS0x0A0x0A0x1B0x00!FROM: Mr. Dulaney0x0A0x0ATO: Hallway0x0A0x0A11/03/13  19:53:170x0A'];   // Raw ZPL
        
        var data = [
            '\x1B' + '\x40',          // init
            '\x1B' + '\x61' + '\x31', // center align
            '\x1D' + '\x21' + '\x11', //Double font size
            'HALL PASS' + '\x0A',
            '\x0A',                   // line break
            '\x1D' + '\x21' + '\x00', // standard font size
            teacher_name+'\'s Class' + '\x0A',     // text and line break
            '\x0A',                   // line break
            '\x0A',                   // line break
            sdate + ' ' + stime + '\x0A',
            '\x0A',                   // line break
            '\x0A',                   // line break    
            '\x0A',
            'Student: '+ sname + '\x0A',
            '\x0A',                   // line break    
            '\x0A',
            'Destination: '+ slocation + '\x0A',
            '\x0A',
            '\x0A',
            '\x0A',
            '\x1B' + '\x61' + '\x30', // left align
            '\x1B' + '\x4D' + '\x31', // small text
            'Signed:' + '\x0A',
            '\x1B' + '\x4D' + '\x30', // normal text
            '------------------------------------------' + '\x0A',
            '\x0A' + '\x0A' + '\x0A',
            '\x1B' + '\x4D' + '\x31', // small text
            'Time:' + '\x0A',
            '\x1B' + '\x4D' + '\x30', // normal text
            '------------------------------------------' + '\x0A',
            '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
            '\x1B' + '\x69',          // cut paper (old syntax)
         // '\x1D' + '\x56'  + '\x00' // full cut (new syntax)
         // '\x1D' + '\x56'  + '\x30' // full cut (new syntax)
         // '\x1D' + '\x56'  + '\x01' // partial cut (new syntax)
         // '\x1D' + '\x56'  + '\x31' // partial cut (new syntax)
            //'\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
                                                         // **for legacy drawer cable CD-005A.  Research before using.
                                                         // see also http://keyhut.com/popopen4.htm
         ];
        
        return qz.print(config, data);
     }).then(function(){
        qz.websocket.disconnect();
     }).catch(function(e) { console.error(e); });
}

function print_pass_to_me(){
    
    var printer_find = 'TM-T20II';
    var teacher_name = 'Mr. Dulaney';

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    newdate = year + "/" + month + "/" + day;

    var student_name = prompt('Student Name');
    var pass_time = prompt('Hour / Time To Visit Class?');
    var pass_reason = prompt('Reason for Visit');

    qz.websocket.connect().then(function() { 
        return qz.printers.find(printer_find);              // Pass the printer name into the next Promise
     }).then(function(printer) {
        var config = qz.configs.create(printer);       // Create a default config for the found printer
        //var data = ['0x1B@0x1B!0x38HALL PASS0x0A0x0A0x1B0x00!FROM: Mr. Dulaney0x0A0x0ATO: Hallway0x0A0x0A11/03/13  19:53:170x0A'];   // Raw ZPL
        
        var data = [
            '\x1B' + '\x40',          // init
            '\x1B' + '\x61' + '\x31', // center align
            '\x1D' + '\x21' + '\x11', //Double font size
            'PASS TO '+ teacher_name + '\x0A',
            '\x0A',                   // line break
            '\x1D' + '\x21' + '\x00', // standard font size
            '\x0A',                 
            'Date: '+newdate+'\x0A',        
            '\x0A',                   // line break    
            '\x0A',
            'Send: ' + pass_time + '\x0A',
            '\x0A',                   // line break
            '\x0A',                   // line break    
            'Student: '+ student_name + '\x0A',
            '\x0A',                   // line break
            '\x0A',             
            'Reason: '+pass_reason+'\x0A'+'\x0A',
            '\x1B' + '\x61' + '\x30', // left align
            '\x1B' + '\x4D' + '\x31', // small text
            'Signed:' + '\x0A',
            '\x1B' + '\x4D' + '\x30', // normal text
            '------------------------------------------' + '\x0A',
            '\x0A' + '\x0A' + '\x0A',
            '\x1B' + '\x4D' + '\x31', // small text
            'Time:' + '\x0A',
            '\x1B' + '\x4D' + '\x30', // normal text
            '------------------------------------------' + '\x0A',
            '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
            '\x1B' + '\x69',          // cut paper (old syntax)
         // '\x1D' + '\x56'  + '\x00' // full cut (new syntax)
         // '\x1D' + '\x56'  + '\x30' // full cut (new syntax)
         // '\x1D' + '\x56'  + '\x01' // partial cut (new syntax)
         // '\x1D' + '\x56'  + '\x31' // partial cut (new syntax)
            //'\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
                                                         // **for legacy drawer cable CD-005A.  Research before using.
                                                         // see also http://keyhut.com/popopen4.htm
         ];
        
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