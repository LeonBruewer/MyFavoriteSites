chayns.ready.then(function() {
    addSite.init();
  });
  
(function (addSite, chayns, window, undefined) {

    'use strict';

    var $sitesAccordion = document.querySelector('#sitesAccordion');
    var $aAdd = document.querySelector('#aAdd');
    var $sendButton = document.querySelector('#send');
    
    addSite.init = function init(data) {
        console.log(data);
        $aAdd.addEventListener('click', switchAccordions);
        $sendButton.addEventListener('click', addSite);
    };

    function switchAccordions() {
        var $addSiteAccordion = document.querySelector('#addSite');
        
        $sitesAccordion.className = 'accordion';
        $addSiteAccordion.className = 'accordion accordion--open';
        
    }

    function addSite() {
        var name = document.querySelector('#inpName').value;
        var street = document.querySelector('#inpStreet').value;
        var plz = document.querySelector('#inpPlz').value;
        var ort = document.querySelector('#inpOrt').value;
        var mail = document.querySelector('#inpMail').value;
        var comment = document.querySelector('#inpComment').value;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            chayns.intercom.sendMessageToPage({ 
                text: 'Name: ' + name + '\n Straße: ' + street + '\n PLZ: ' + plz + '\n Ort: ' + ort + '\n E-Mail: ' + mail + '\n Kommentar: ' + comment
            }).then(function(data){            
                if(data.status == 200)
                chayns.dialog.alert('','Antrag wurde gestellt');
            });
        }
        else {
            chayns.dialog.alert('', 'Du musst eine gültige E-Mail Adresse angeben');
        }
    }
   
  })((window.addSite = {}), chayns, window);