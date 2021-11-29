//--------------              26-11-2021      ΦΙΛΤΡΟ ΝΑ ΦΕΡΝΕΙ ΕΙΔΗ ΠΟΥ ΑΝΗΚΟΥΝ ΜΟΝΑΧΑ ΣΤΟ BU του HEADER του ΠΑΡΑΣΤΑΤΙΚΟΥ -------------------------
function ON_ITELINES_NEW(){

	var myBU = SALDOC.BUSUNITS.toString();
	if(SALDOC.BUSUNITS==400){
		myBU='410,450';
	}	
		if (SALDOC.SERIES == 4005 || SALDOC.SERIES == 4000)
	{
		X.SETFIELDEDITOR('ITELINES.MTRL','ITEM(F[SODTYPE=&ITESODTYPE],W[(a.MTRACN in (1,2) and a.BUSUNITS in ('+myBU+')  and (EXISTS(select 1 from prcrdata where sodtype=13 and prcrule in (9505) and company=100 and dim1=a.mtrl)))],I[QTY1],U[VAT;MTRUNIT;MTRSEASON;CDIM1;CDIM2;CDIM3;MTRPRJCBLD;GUARTIME;MTRCATEGORY=VAT;MTRUNIT4;MTRSEASON;CDIM1;CDIM2;CDIM3;MTRPRJCBLD;GUARTIME;MTRCATEGORY@])');
		}
		else X.SETFIELDEDITOR('ITELINES.MTRL','ITEM(F[SODTYPE=&ITESODTYPE],W[(a.MTRACN in (1,2) and a.BUSUNITS in ('+myBU+') and (EXISTS(select 1 from prcrdata where sodtype=13 and prcrule in (30111,30113,30211,30212,30411,30511) and company=100 and dim1=a.mtrl)))],I[QTY1],U[VAT;MTRUNIT;MTRSEASON;CDIM1;CDIM2;CDIM3;MTRPRJCBLD;GUARTIME;MTRCATEGORY=VAT;MTRUNIT4;MTRSEASON;CDIM1;CDIM2;CDIM3;MTRPRJCBLD;GUARTIME;MTRCATEGORY@])');


}