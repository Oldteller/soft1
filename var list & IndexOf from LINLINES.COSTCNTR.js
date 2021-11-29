//---------@c085---29/11/2021---------- Δημιουργία Λίστας για κάθε BU και Κέντρα Κόστους που ανήκουν στο καθένα -----------------
var bu100 = ',10301,10401,11202,11401,11701,11801,';
var bu200 = ',11001,11101,11203,11402,';
var bu300 = ',10501,10601,11403,';
var bu400 = ',10101,10201,11404,10102,10202,';


function ON_LINLINES_POST() {
				CheckCOSTCNTR_BU();
}

function ON_LINLINES_COSTCNTR(){
				CheckCOSTCNTR_BU();
}

//---------@c085---29/11/2021---------- Συμφωνία Κέντρου Κόστους με BU γραμμής -----------------
function CheckCOSTCNTR_BU(){
		var buLine = LINLINES.BUSUNITS;

		if (buLine == '100') {
			var vCOSTCNTR = ','+LINLINES.COSTCNTR+',';
			if (bu100.indexOf(vCOSTCNTR)=== -1) X.EXCEPTION('Το Κέντρο Κόστους δεν συμφωνεί με το BU της γραμμής');  // το INDEXOF ειναι -1 όταν δεν υπάρχει το vCOSTCNTR  στο bu100
					
		
		}
		else if (buLine == '200'){
			var vCOSTCNTR = ','+LINLINES.COSTCNTR+',';
			if (bu200.indexOf(vCOSTCNTR)=== -1) X.EXCEPTION('Το Κέντρο Κόστους δεν συμφωνεί με το BU της γραμμής');
		
		}
		else if (buLine == '300'){
			var vCOSTCNTR = ','+LINLINES.COSTCNTR+',';
			if (bu300.indexOf(vCOSTCNTR)=== -1) X.EXCEPTION('Το Κέντρο Κόστους δεν συμφωνεί με το BU της γραμμής');
		
		}
		else if (buLine == '400'){
			var vCOSTCNTR = ','+LINLINES.COSTCNTR+',';
			if (bu400.indexOf(vCOSTCNTR)=== -1) X.EXCEPTION('Το Κέντρο Κόστους δεν συμφωνεί με το BU της γραμμής');
		
		}
		else // NO BU 
		{//X.WARNING('no bu');
		}
}
//-------------------------------------------------------------------------------------------------------------------