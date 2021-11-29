function ON_POST()
{
//---------------------------23-11-2021------Έγκριση Πληρωμών : Μετά απο πρόσληψη πωλητή -> 300€ πάγια προκαταβολή--------------------------------------------------------------------------------
		if (PRSNIN.PRSN<0){
			var strqry1=("select prsn.name,prsn.name2,prsn.users,groups.groups from prsn inner join users on prsn.users=users.users inner join groups on users.groups=groups.groups where  prsn.users=:1")
			var ds1    =X.GETSQLDATASET(strqry1,PRSNIN.USERS)
			X.WARNING(ds1.groups);
			if (ds1.groups==13) {
			//Δημιουργία BankAcc - TRDR
							var BankAccDocObj =X.CreateObj('BANKACC');
								BankAccDocObj.SETPARAM('WARNINGS','OFF');
								BankAccDocObj.SETPARAM('NOMESSAGES',1);
								BankAccDocObj.DBINSERT;
							var TblTrdr = BankAccDocObj.FindTable('TRDR');
								TblTrdr.Edit;
								TblTrdr.CODE = '35.03.00.*';							
								TblTrdr.NAME  = ds1.name2 + ' ' +ds1.name +' ΠΑΓΙΑ ΠΡΟΚΑΤΑΒΟΛΗ' ;
							var trdr = TblTrdr.NAME;
								TblTrdr.BANCTYPE = 3;
								TblTrdr.TRDTYPE1 = 0;
								TblTrdr.ACNMSK = '35.03.00.000';
								TblTrdr.COUNTRY = 1000;
								TblTrdr.SOCURRENCY = 100;
								TblTrdr.BRANCH = 1000;
							var k1=BankAccDocObj.DBPOST;
			var strqry2=("select trdr from trdr where name=:1");
			var ds2    =X.GETSQLDATASET(strqry2,trdr);
			//Δημιουργία Ειδικής Χρηματικών Λογαριασμών
							var LinbacDocObj =X.CreateObj('LINBACDOC');
								LinbacDocObj.SETPARAM('WARNINGS','OFF');
								LinbacDocObj.SETPARAM('NOMESSAGES',1);
								LinbacDocObj.DBINSERT;
							var TblFin = LinbacDocObj.FindTable('FINDOC');
								TblFin.Edit;
								TblFin.TRNDATE = X.SYS.LOGINDATE();							
								TblFin.SERIES  = 6170;
								TblFin.TRDR    = ds2.trdr;
								TblLns = LinbacDocObj.FindTable('LINLINES');
								TblLns.INSERT;
								TblLns.MTRL 			= 16925;
								TblLns.LINEVAL		= 300;
								TblLns.Post;
							var k2=LinbacDocObj.DBPOST;		
		}
	}
//---------------------------23-11-2021------Έγκριση Πληρωμών : Μετά απο πρόσληψη πωλητή -> 300€ πάγια προκαταβολή--------------------------------------------------------------------------------
}

