
function EXECCOMMAND(cmd) {
	if(cmd == 202111242){

		TRDTLINES.FIRST;
		while(!TRDTLINES.EOF){
			TRDTLINES.CCCSENDEMAIL = 1;
		TRDTLINES.NEXT;
		}	
	}
	if(cmd == 202111243){

		TRDTLINES.FIRST;
		while(!TRDTLINES.EOF){
			TRDTLINES.CCCSENDEMAIL = 0;
		TRDTLINES.NEXT;
		}
}
		
	if(cmd == 202111241){
		MAIL();
			}
	}
function MAIL(){

	var selectedTRD = X.GETPROPERTY('GRIDSELECTED:MAINGRID|TRDTLINES');

	var outlookApp = new ActiveXObject('Outlook.Application');
  
  var footer = '<br>' + '<br>' + 'Αυτό είναι ένα αυτοματοποιημένο μήνυμα, παρακαλούμε <b>μην απαντάτε στο παρόν email</b>.' + '<br>' ;

  TRDTLINES.FIRST;
  while (!TRDTLINES.EOF) {
			
      if (TRDTLINES.CCCSENDEMAIL == 1) {

        var strBodyHeader = 'Θα θέλαμε να σας ενημερώσουμε ότι στις ' +'<strong> '+ X.FORMATDATE('dd/mm/yyyy', BFNSUPDOC.TRNDATE)  +'</strong><BR>' +
          'κατατέθηκε έμβασμα στον λογαριασμό σας με IBAN  ' +  TRDTLINES.TRDBANKACC_TRDBANKACC_IBAN.toString().substr(0, 4)+'-'+TRDTLINES.TRDBANKACC_TRDBANKACC_IBAN.toString().substr(4, 6)+'-'+TRDTLINES.TRDBANKACC_TRDBANKACC_IBAN.toString().substr(10, 3)  + '<BR>' +
          'από ' +' '+ BFNSUPDOC.TRDR_BANKACC_NAME + '<br>'+
					' το ποσό των <strong>' + X.FORMATFLOAT(TRDTLINES.LINEVAL,2) +' €</strong><BR><BR>'
					+'Με την αιτιολογία ' +TRDTLINES.TRDR_SUPPLIER_NAME +'/ΕΛΑΝΚΟ/ΕΞΟΦΛ./'+ TRDTLINES.COMMENTS +' '+BFNSUPDOC.CMPFINCODE+ '<BR>';
					'<BR>'+'<BR>';

        var myQMails = 'SELECT email from trdr where trdr=' + TRDTLINES.TRDR;
				 dsMails = X.GETSQLDATASET(myQMails, null);
		
					strTO = dsMails.email;
				  strCC= '';
					strBCC = '';

        strSubject = 'ΕΝΗΜΕΡΩΣΗ ΕΙΣΠΡΑΞΗΣ | ' + TRDTLINES.TRDR_SUPPLIER_CODE + ' ' + TRDTLINES.TRDR_SUPPLIER_NAME +' | ' +BFNSUPDOC.CMPFINCODE ;
        strBodyPlain = '';
        strFromName = 'ELANCO transactions';

        strBodyHTML = strBodyHeader  + footer;
        strAttachment = '';
				
        var vEmailAccount = 100;

        //X.WARNING(strBodyHTML);

        //X.EXEC('CODE:SysRequest.doSendMail3', strTO, strCC, strBCC, strSubject, strBodyPlain, strBodyHTML, strAttachment, strFromName, vEmailAccount);
			
				var myMail = outlookApp.CreateItem(0);
				myMail.Subject = 'ΕΝΗΜΕΡΩΣΗ ΕΙΣΠΡΑΞΗΣ | ' + TRDTLINES.TRDR_SUPPLIER_CODE + ' ' + TRDTLINES.TRDR_SUPPLIER_NAME+' | ' +BFNSUPDOC.CMPFINCODE ;	
				myMail.To = dsMails.email;
				myMail.CC = '';
				myMail.HTMLBody = strBodyHTML;
				dsMails.next
				myMail.display();

				X.RUNSQL('UPDATE TRDTLINES SET CCCSENDEMAIL = 1 WHERE TRDTLINES = '+ TRDTLINES.TRDTLINES+' AND FINDOC = '+TRDTLINES.FINDOC,null);
			
      }
			TRDTLINES.NEXT;
    }
	
}
	