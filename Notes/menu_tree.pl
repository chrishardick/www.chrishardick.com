#!/usr/bin/perl -w
#==============================================================================
#
#  menu_tree.pl
#
#  legal mgmt - menu tree
#  
#==============================================================================

use lib "/user2/Perl";

use CGI qw/:standard/;

use LGL_MGMT_HTML;
use LGL_MGMT_SYS_SYSTEM;
use DWH_BILL_HTML;


#==========
# verify session
# - either returns w/ hash(valid session) -or- 
# - redirects user to login.pl (invalid session)
#==========

my %SessionHash = LglMgmtHTMLChkSessionHash ();

if (not %SessionHash)
{
	my $errno = 2; # database error
	
	LglMgmtHTMLRedirectToLogin ($errno);

	exit -1;	
}


#==========
# get system abbr
#==========

my $SSystemAbbr = "Instance";

my $DBH = $SessionHash{dbh};
my $SystemDBH = $SessionHash{system_dbh};

my ($SSystem,$SSystemEMsg) = LglMgmtSSYSTEMGet ($SystemDBH,$SessionHash{system_id});

if ($SSystem and $$SSystem{abbr})
{
	# successfully returned rec & this system has an abbr

	$SSystemAbbr = $$SSystem{abbr};
}


#==========
# print HTTP hdr
#==========

print header;


#==========
# print HTML hdr and opening body tag
#==========

print start_html (	-title=>"test",
			-style=>{-src=>['css/legal_mgmt.css','css/tree.css']},
			-script=>[	{-language=>"JavaScript",-src=>"jscript/menu_tree.js"},
					{-language=>"JavaScript",-src=>"jscript/cookie.js"},
					{-language=>"JavaScript",-src=>"jscript/log_out.js"}]);

print <<EOF;

<span class=smallprint>
<div class="pagetitle"><a href=index.pl target=data_frame>Legal Mgmt v1.0</a></div>

<!--
==========
Accts
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchAcct'); toggleFolderImg('folderAcct');"><img src="images/closed.gif" id="folderAcct">Accounts</div>
<span class="branch" id="branchAcct">
	<img src="images/doc.gif"><A HREF="AcctForm.pl?Add" TARGET="data_frame">Add</A><br>
	<img src="images/doc.gif"><A HREF="Accts.pl" TARGET="data_frame">View/Update/Delete</A><br>

	<!--
	==========
	Acct Reps
	==========
	-->
		
	<div class="trigger" onClick="toggleFolder('branchAcctRep'); toggleFolderImg('folderAcctRep');"><img src="images/closed.gif" id="folderAcctRep">Acct Reps</div>
	<span class="branch" id="branchAcctRep">
		<img src="images/doc.gif"><A HREF="AcctRepForm.pl?Add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="AcctReps.pl" TARGET="data_frame">View/Update/Delete</A><br>
	</span>
	
</span>



<!--
==========
Cases
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchCase'); toggleFolderImg('folderCase');"><img src="images/closed.gif" id="folderCase">Cases</div>
<span class="branch" id="branchCase">
	<img src="images/doc.gif"><A HREF="ActionForm.pl?Add" TARGET="data_frame">Add</A><br>
	<img src="images/doc.gif"><A HREF="Actions.pl" TARGET="data_frame">View/Update/Delete</A><br>
</span>


<!--
==========
Clients
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchClient'); toggleFolderImg('folderClient');"><img src="images/closed.gif" id="folderClient">Clients</div>
<span class="branch" id="branchClient">
	<img src="images/doc.gif"><A HREF="Client2Form.pl?Add" TARGET="data_frame">Add</A><br>
	<img src="images/doc.gif"><A HREF="Clients2.pl" TARGET="data_frame">View/Update/Delete</A><br>
</span>


<!--
==========
Invoice Items
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchInvItem'); toggleFolderImg('folderInvItem');" title="Work & Disbursements"><img src="images/closed.gif" id="folderInvItem">Invoice Items</div>

<span class="branch" id="branchInvItem">

	<img src="images/doc.gif"><A HREF="InvoiceItemForm.pl?Add" TARGET="data_frame">Add</A><br>

	<!--
	==========
	View/Update/Delete
	==========
	-->

	<div class="trigger" onClick="toggleFolder('branchInvItem1'); toggleFolderImg('folderInvItem1');"><img src="images/closed.gif" id="folderInvItem1">View/Update/Delete</div>
	<span class="branch" id="branchInvItem1">
		<img src="images/doc.gif"><A HREF="InvoiceItems.pl?search" TARGET="data_frame">Search (Beta)</A><br>
		<img src="images/doc.gif"><A HREF="InvoiceItems.pl?30"     TARGET="data_frame">Last 30 Days (Beta)</A><br>
		<img src="images/doc.gif"><A HREF="InvoiceItems.pl?60"     TARGET="data_frame">Last 60 Days (Beta)</A><br>
		<img src="images/doc.gif"><A HREF="InvoiceItems.pl?90"     TARGET="data_frame">Last 90 Days (Beta)</A><br>
		<img src="images/doc.gif"><A HREF="InvoiceItems.pl?pend"   TARGET="data_frame">Pending (Beta)</A><br>
		<img src="images/doc.gif"><A HREF="InvoiceItems.pl"        TARGET="data_frame">All</A><br>
	</span>
	
</span>


<!--
==========
Invoices
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchInv'); toggleFolderImg('folderInv');"><img src="images/closed.gif" id="folderInv">Invoices</div>
<span class="branch" id="branchInv">
	<img src="images/doc.gif"><A HREF="InvoiceForm.pl?Add" TARGET="data_frame">Add</A><br>
	<img src="images/doc.gif"><A HREF="Invoices.pl" TARGET="data_frame">View/Update/Delete</A><br>
	<img src="images/doc.gif"><A HREF="email_invoice_form.pl" TARGET="data_frame">E-Mail Invoice</A><br>
</span>


<!--
==========
Payments
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchPay'); toggleFolderImg('folderPay');"><img src="images/closed.gif" id="folderPay">Payments</div>
<span class="branch" id="branchPay">
	<img src="images/doc.gif"><A HREF="PaymentForm.pl?Add" TARGET="data_frame">Add</A><br>
	<img src="images/doc.gif"><A HREF="Payments.pl" TARGET="data_frame">View/Update/Delete</A><br>
</span>


<!--
====================
Calendar
====================
-->
	
<div class="folder" onClick="toggleFolder('folderCalendar'); toggleFolderImg('folderCalendarImg');">
<img src="images/closed.gif" id="folderCalendarImg">Calendar
</div>

<span class="document" id="folderCalendar">

	<!--
	==========
	Calendar - Events
	==========
	-->

	<div class="folder" onClick="toggleFolder('folderCalendarEvents'); toggleFolderImg('folderCalendarEventsImg');">
		<img src="images/closed.gif" id="folderCalendarEventsImg">Events
	</div>

	<span class="document" id="folderCalendarEvents">
		<img src="images/doc.gif"><A HREF="CalEventForm.pl?Add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="CalEvents.pl" TARGET="data_frame">View/Update/Delete</A><br>
		<img src="images/doc.gif"><A HREF="calendar.pl" TARGET="data_frame">Calendar - Monthly</A><br>
	</span>


	<!--
	==========
	Calendar - Locations
	==========
	-->

	<div class="folder" onClick="toggleFolder('folderCalendarLocations'); toggleFolderImg('folderCalendarLocationsImg');">
		<img src="images/closed.gif" id="folderCalendarLocationsImg">Locations
	</div>

	<span class="document" id="folderCalendarLocations">
		<img src="images/doc.gif"><A HREF="LocationForm.pl?Add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="Locations.pl" TARGET="data_frame">View/Update/Delete</A><br>
	</span>

</span>


<!--
==========
Invoice Item / Calendar Event Types
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchInvItemType'); toggleFolderImg('folderInvItemType');"><img src="images/closed.gif" id="folderInvItemType">Inv Item/Cal Event Types</div>
<span class="branch" id="branchInvItemType">
	<img src="images/doc.gif"><A HREF="InvoiceItemTypeForm.pl?Add" TARGET="data_frame">Add</A><br>
	<img src="images/doc.gif"><A HREF="InvoiceItemTypes.pl" TARGET="data_frame">View/Update/Delete</A><br>
</span>


<!--
==========
Files
==========
-->
	
<div class="trigger" onClick="toggleFolder('branchFile'); toggleFolderImg('folderFile');">
<img src="images/closed.gif" id="folderFile">Files
</div>

<span class="branch" id="branchFile">

	<img src="images/doc.gif"><A HREF="FileForm.pl?Add" TARGET="data_frame">Add</A><br>
	<img src="images/doc.gif"><A HREF="Files.pl" TARGET="data_frame">View/Update/Delete</A><br>

	<!--
	==========
	File Types
	==========
	-->

	<div class="folder" onClick="toggleFolder('folderFileTypes'); toggleFolderImg('folderFileTypesImg');">
		<img src="images/closed.gif" id="folderFileTypesImg">File Types
	</div>

	<span class="document" id="folderFileTypes">
		<img src="images/doc.gif"><A HREF="FileTypeForm.pl?Add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="FileTypes.pl" TARGET="data_frame">View/Update/Delete</A><br>
	</span>


</span>


<!--
====================
Reports
====================
-->
	
<div class="trigger" onClick="toggleFolder('branchRpt'); toggleFolderImg('folderRpt');"><img src="images/closed.gif" id="folderRpt">Reports</div>
<span class="branch" id="branchRpt">
	<img src="images/doc.gif"><A HREF="Summary.pl?FORM" TARGET="data_frame">Summary</A><br>
	<img src="images/doc.gif"><A HREF="WorkPerMonth.pl?FORM" TARGET="data_frame">Work Per Month</A><br>
</span>


<!--
====================
Users/Associates
====================
-->
	
<div class="trigger" onClick="toggleFolder('branchUser'); toggleFolderImg('folderUser');">
<img src="images/closed.gif" id="folderUser">Users/Associates
</div>

<span class="branch" id="branchUser">

	<!--
	==========
	Lgl Mgmt Users/Associates
	==========
	-->

	<div class="folder" onClick="toggleFolder('folderLglMgmtUser'); toggleFolderImg('folderLglMgmtUserImg');">
		<img src="images/closed.gif" id="folderLglMgmtUserImg">Legal Mgmt
	</div>

	<span class="document" id="folderLglMgmtUser">
		<img src="images/doc.gif"><A HREF="SystemUserForm.pl?mode=add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="SystemUsers.pl" TARGET="data_frame">View/Update</A><br>
	</span>


	<!--
	==========
	Instance Users/Associates
	==========
	-->

	<div class="folder" onClick="toggleFolder('folderInstanceUser'); toggleFolderImg('folderInstanceUserImg');">
		<img src="images/closed.gif" id="folderInstanceUserImg">$SSystemAbbr
	</div>

	<span class="document" id="folderInstanceUser">
		<img src="images/doc.gif"><A HREF="UserForm.pl?mode=add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="Users.pl" TARGET="data_frame">View/Update</A><br>
	</span>

</span>


<!--
====================
Automation
====================
-->
	
<div class="folder" onClick="toggleFolder('folderAutomation'); toggleFolderImg('folderAutomationImg');">
<img src="images/closed.gif" id="folderAutomationImg">Automation
</div>

<span class="document" id="folderAutomation">

	<!--
	==========
	Automation - Objects
	==========
	-->

	<div class="folder" onClick="toggleFolder('folderAutomationObjects'); toggleFolderImg('folderAutomationObjectsImg');">
		<img src="images/closed.gif" id="folderAutomationObjectsImg">Objects
	</div>

	<span class="document" id="folderAutomationObjects">
		<img src="images/doc.gif"><A HREF="AutoObjectForm.pl?Add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="AutoObjects.pl" TARGET="data_frame">View/Update/Delete</A><br>
	</span>


	<!--
	==========
	Automation - Events
	==========
	-->

	<div class="folder" onClick="toggleFolder('folderAutomationEvents'); toggleFolderImg('folderAutomationEventsImg');">
		<img src="images/closed.gif" id="folderAutomationEventsImg">Events
	</div>

	<span class="document" id="folderAutomationEvents">
		<img src="images/doc.gif"><A HREF="AutoEventForm.pl?Add" TARGET="data_frame">Add</A><br>
		<img src="images/doc.gif"><A HREF="AutoEvents.pl" TARGET="data_frame">View/Update/Delete</A><br>
	</span>


	<!--
	==========
	Automation - Tools
	==========
	-->

	<div class="trigger" onClick="toggleFolder('folderAutomationTools'); toggleFolderImg('folderAutomationToolsImg');">
		<img src="images/closed.gif" id="folderAutomationToolsImg">Tools
	</div>

	<span class="document" id="folderAutomationTools">
		<img src="images/doc.gif"><A HREF="AutoManualForm.pl" TARGET="data_frame">Manual Control</A><br>
		<img src="images/doc.gif"><A HREF="AutoTailLog.pl" TARGET="data_frame">View Log</A><br>
	</span>


</span>


<div class="trigger" onClick="toggleFolder('branchAdmin'); toggleFolderImg('folderAdmin');"><img src="images/closed.gif" id="folderAdmin">Admin</div>
<span class="branch" id="branchAdmin">
	<img src="images/doc.gif"><A HREF="chg_passwd.pl" TARGET="data_frame">Change Password</A><br>
	<img src="images/doc.gif"><A HREF="view_log.pl" TARGET="data_frame">Activity Log</A><br>
	<img src="images/doc.gif"><A HREF="BackupLog.pl" TARGET="data_frame">Backup Log</A><br>
	<img src="images/doc.gif"><A HREF="chk_invoice_integrity.pl" TARGET="data_frame">Invoice Integrity</A><br>
	<img src="images/doc.gif"><A HREF="system_summary.pl" TARGET="data_frame">System Summary</A><br>
	<img src="images/doc.gif"><A HREF="Sessions.pl" TARGET="data_frame">View Sessions</A><br>
	<img src="images/doc.gif"><A class=clickable onClick="viewCookie()">View Cookie(s)</A><br>
	<img src="images/doc.gif"><A HREF="file_list.pl" TARGET="data_frame">Source Code</A><br>

</span>

<div class="clickable margin_top_10px clickable" onClick="logOut()">Log Out</div>

<div class="legalmgmtlink"><a class="legalmgmtlink" href=http://www.legalmgmtsoftware.com target=data_frame>www.legalmgmtsoftware.com</a></div>

</span>
EOF

HTMLEnd ("NOTXT");
exit 0;
