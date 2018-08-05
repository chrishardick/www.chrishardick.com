// $Header: /user2/jscript/RCS/tbl_sort.js,v 1.8 2005/09/02 20:13:49 webmast Exp $

/******************************************************************************
**
**  tbl_sort.js
**
**  client side html table sorting module
**
**  REQ'D MODULE(S)
**  ===============
**  tbl_sort_ctbl    => CTbl class definition
**
**
**  FUNCTIONS
**  =========
**  initTbl() - initializes a html table which utilizes client side
**              table sorting
**            - called @ onload event
**            - attaches onclick event handlers (sortTbl) to
**              'th' elements
**            - for initial sort column 'th', appends an up/down
**              arrow image
**
**  sortTbl() - called when user clicks on a 'th' element
**            
**
**  chris hardick
**
******************************************************************************/


/******************************************************************************
**
**  globals
**
******************************************************************************/

/**********
 * associative array of all CTbl objects
 * - which represent all html tables on the current page that
 *   utilize client side table sorting
 * - key = table ID 
 *   g_cTbl["table_x"] => table_x CTbl object
 *   g_cTbl["table_y"] => table_y CTbl object
 **********/
var g_cTbl = new Object;

/*
 * global debug flag
 */
var g_bDbg = false;

/* alphanumeric */
rowCompare.nSortCol = 0;
rowCompare.nNumTimesCalled = 0;
rowCompare.bInit = false;

/* integer */
rowCompareInt.nSortCol = 0;
rowCompareInt.nNumTimesCalled = 0;
rowCompareInt.bInit = false;

/* floating point */
rowCompareFloat.nSortCol = 0;
rowCompareFloat.nNumTimesCalled = 0;
rowCompareFloat.bInit = false;

/* timestamp mm/dd/yyyy hh:mm:ss */
rowCompareTimestamp.nSortCol = 0;
rowCompareTimestamp.nNumTimesCalled = 0;
rowCompareTimestamp.bInit = false;

/* date mm/dd/yyyy */
rowCompareDate.nSortCol = 0;
rowCompareDate.nNumTimesCalled = 0;
rowCompareDate.bInit = false;

getTxt.bInit = false;
getTxt.szTxt = "";

compareDates.bInit = false;


/******************************************************************************
**
**  initTbl
**
**  called @ onload event
**  initialize a table which utilizes client side table sorting
**
**  instantiate new g_cTbl[] instance to save state
**  initialize 'th' elements
**  - set onclick handlers
**  - set css classes 
**  - append up/down arrow images to initial sort column
**
******************************************************************************/
function initTbl(   szTblID,                // in: string - id of table    
                    nNumCols,               // in: # of columns
                    szSortType,             // in: array of column types
                    nInitSortCol,           // in: int - initial sorted column
                    szInitSortDir)          // in: string - initial sort direction: "asc","desc"
{
    if (g_bDbg) alert ("ENTER: initTbl");


    /**********
     * 1) instantiate g_cTbl[] element to save state
     **********/

    g_cTbl[szTblID] = new CTbl (    nNumCols,
                                    szSortType,
                                    nInitSortCol,
                                    szInitSortDir);

    if (g_bDbg) alert (g_cTbl[szTblID]);


    /**********
     * 2) initialize 'th' elements
     * - set onclick handlers
     * - set css classes
     * - append up/down arrow images to initial sort column
     **********/

    initThElements (    szTblID,    
                        g_cTbl[szTblID]);
}


/******************************************************************************
**
**  initThElements
**
**  set onclick handlers
**  set css classes
**  append up/down arrow images to initial sort column
**
******************************************************************************/
function initThElements (   szID,       // in: string - id of table
                            cTbl)       // in: CTbl object
{
    var nSortCol  = cTbl.getSortCol();
    var szSortDir = cTbl.getSortDir();

    /*
     * get the table object (via id)
     */
    var cHTMLTbl = document.getElementById(szID);

    if (cHTMLTbl == null)
    {
        alert ("ERROR: initThElements: ID |" + szID + "| NOT FOUND");

        return;
    }

    
    /*
     * get the 'thead' element of the table    
     * - there should only be 1, so we get the 1st
     */ 
    var cHTMLTHead = cHTMLTbl.getElementsByTagName("thead")[0];

    if (cHTMLTHead == null)
    {
        alert     ("ERROR: initThElements: Tbl |" + szID + "|: <thead>[0] NOT FOUND"); 

        return;
    }

    /*
     * get all 'th' of the 'thead'
     * - col[]
     */    
    var cHTMLTh = cHTMLTHead.getElementsByTagName("th");
    

    /*
     * loop through 'th' elements (col[])
     * - attach onclick event handlers
     * - add css class names
     * - append img
     */

    for (var i=0; i < cHTMLTh.length; i++) 
    {
        /**********
         * attach 'onclick' event handlers based upon passed-in szSortType[]
         **********/

        let elem = cHTMLTh[i];

        console.log (elem);

        if (i == nSortCol)
        {
            /*
             * the column we're initially sorting on 
             * - a sortable column
             */

            elem.onclick = function() {sortTbl(this)};

            if (! elem.classList.contains('tblsort_cursort_col'))
            {
                elem.classList.toggle('tblsort_cursort_col');     // add it
            }
    
            appendImg ( elem,
                        szSortDir);     // sort direction
        }
        else if (cTbl.getSortType([i]) != null)
        {
            /*
             * a sortable column
             * - not the column we're initially sorting on
             */

            elem.onclick = function() {sortTbl(this)};

            if (! elem.classList.contains('tblsort_cursort_col'))
            {
                elem.classList.toggle('tblsort_cursort_col');     // add it
            }
    
        }
        else
        {
            /*
             * not a sorted column
             */

            if (! elem.classList.contains('tblsort_nonsort_col'))
            {
                elem.classList.toggle('tblsort_nonsort_col');
            }
        }
    }
}


/******************************************************************************
**
**  sortTbl
**
**  THIS FXN IS CALLED WHEN A USER CLICKS ON A ROW HEADING
**  
******************************************************************************/
function sortTbl(cTH)     // in: th element which was clicked
{
    var cTbl;
    var nThisCol;

    var szTblID;

    if (g_bDbg) alert ("ENTER: sortTable");


    /*
     * display msg for user in status bar
     */
    status = "Sorting. Please wait...";


    /*
     * traverse DOM to get table object
     * - th => tr => thead => table
     */
    cTbl  = cTH.parentNode.parentNode.parentNode;

    if (cTbl == null)
    {
        /*
         * todo: not sure if this is the correct way to indicate an error -- test
         */

        alert ("sortTbl: cTbl IS NULL");

        /*
         * clear 'please wait' msg from status bar
         */
        status = "";

        return; 
    }


    /*
     * get the id attribute of the table so we can look it up in g_cTbl[]
     */

    szTblID = cTbl.getAttribute('id');

    if (szTblID.length <= 0)
    {
        alert ("sortTbl: Table Does Not A Have ID Attribute");

        /*
         * clear 'please wait' msg from status bar
         */
        status = "";

        return;
    }

    
    if (g_bDbg) alert ("sortTable: table id: " + szTblID);

    
    /*
     * notes on cellIndex
     * - Node->Element->HTMLElement->HTMLTableCellElement.cellIndex
     * - the position of the cell w/i its row
     */
    nThisCol = cTH.cellIndex;
    
    if (g_bDbg) alert ("sortTable: column clicked: " + nThisCol);


    /*
      * get all data rows of the table
     * - table.tbody[0].tr[]
     */
    var cTBody = cTbl.getElementsByTagName('tbody')[0];

    if (cTBody == null)
    {
        alert ("sortTbl: cTBody IS NULL");

        /*
         * clear 'please wait' msg from status bar
         */
        status = "";

        return;
    }

    /*
     * returns an array of Node objects
     */
    var cRow   = cTBody.getElementsByTagName('tr');


    if (g_bDbg) alert ("sortTbl: # rows in table: " + cRow.length);


    /**********
     * tr's => rowArray[]
     **********/
    
    var cRowArray = new Array();

    for (var i=0, nLength=cRow.length; i<nLength; i++) 
    {            
        /*
         * clone a node and all its decendants
         */

        cRowArray[i] = cRow[i].cloneNode(true);
    }

    if (g_bDbg) alert ("sortTbl: # rows in array: " + cRowArray.length);


    /*
     * cRowArray[] now contains all data rows of the table    
     */


    if (g_cTbl[szTblID].getSortCol() == nThisCol) 
    { 
        if (g_bDbg) alert ("sortTable: reverse table mode");

        /*
         * we're already sorted on this fld
         * - reverse the sort
         */

        /* reverse all elements of the array */
        cRowArray.reverse(); 

        /* toggle the sort direction ("asc"|"desc") */
        g_cTbl[szTblID].toggleSortDir();
    } 
    else 
    {    
        if (g_bDbg) alert ("sortTable: sort table mode");

        /*
         * we're currently sorted on a different column (or not sorted @ all)
         * - re-sort the array
         */

        g_cTbl[szTblID].setInitSortDir();

        g_cTbl[szTblID].setSortCol(nThisCol);

        if (g_bDbg) alert ("sortTbl: sort type current column: " + g_cTbl[szTblID].getSortTypeCurCol());
    
        if (g_cTbl[szTblID].getSortTypeCurCol() == "int") 
        {
            rowCompareInt.nSortCol = nThisCol;
            rowCompareInt.bInit = false;

            cRowArray.sort(rowCompareInt);
        
            if (g_bDbg) alert ("sortTbl: rowCompareInt: nNumTimesCalled: " + rowCompareInt.nNumTimesCalled);
        } 
        else if (g_cTbl[szTblID].getSortTypeCurCol() == "float") 
        {
            rowCompareFloat.nSortCol = nThisCol;
            rowCompareFloat.bInit = false;

            cRowArray.sort(rowCompareFloat);
        
            if (g_bDbg) alert ("sortTbl: rowCompareFloat: nNumTimesCalled: " + rowCompareFloat.nNumTimesCalled);
        } 
        else if (    g_cTbl[szTblID].getSortTypeCurCol() == "alphanumeric" || 
                g_cTbl[szTblID].getSortTypeCurCol() == "alpha")
        {
            rowCompare.nSortCol = nThisCol;
            rowCompare.bInit = false;

            cRowArray.sort(rowCompare);
        
            if (g_bDbg) alert ("sortTbl: rowCompareFloat: nNumTimesCalled: " + rowCompare.nNumTimesCalled);
        } 
        else if (g_cTbl[szTblID].getSortTypeCurCol() == "timestamp")
        {
            rowCompareTimestamp.nSortCol = nThisCol;
            rowCompareTimestamp.bInit = false;

            cRowArray.sort(rowCompareTimestamp);
        
            if (g_bDbg) alert ("sortTbl: rowCompareTimestamp: nNumTimesCalled: " + rowCompareTimestamp.nNumTimesCalled);
        } 
        else if (g_cTbl[szTblID].getSortTypeCurCol() == "date")
        {
            rowCompareDate.nSortCol = nThisCol;
            rowCompareDate.bInit = false;

            cRowArray.sort(rowCompareDate);
        
            if (g_bDbg) alert ("sortTbl: rowCompareDate: nNumTimesCalled: " + rowCompareDate.nNumTimesCalled);
        } 
    }


    /**********
     * array is now sorted
     **********/


    status = "Re-arranging rows. Please wait...";


    /*
     * create a new <tbody>
     */    

    if (g_bDbg) alert ("sortTbl: creating new tbody...");

    var cNewTBody = document.createElement('tbody');


    /*
     * add the sorted rows 
     */
    if (g_bDbg) alert ("sortTbl: adding rows (sorted)...");

    for (var i=0, length=cRowArray.length; i<length; i++) 
    {
        cNewTBody.appendChild(cRowArray[i]);
    }

    /*
     * replace old tbody w/ new tbody
     */    
    if (g_bDbg) alert ("sortTbl: replacing the old tbody with the new tbody...");

    cTbl.replaceChild(cNewTBody, cTBody);



    status = "Fixing table headers. Please wait...";


    /*
     * get the <thead>
     */    
    var cTHead = cTbl.getElementsByTagName('thead')[0];

    if (cTHead == null)
    {
        alert ("ERROR: sortTbl: cTHead is NULL");

        /*
         * clear 'please wait' msg from status bar
         */
        status = "";

        return;
    }


    if (g_bDbg) alert ("sortTbl: looping thru <th>'s to add class names and append images...");


    /*
     * get all the <th> elements
     */
    var cTh  = cTHead.getElementsByTagName('th');

    if (g_bDbg) alert ("sortTbl: # <th> elements: " + cTh.length);


    /*
     * loop thru <th> elements
     */
    for (var i=0; i < cTh.length; i++) 
    {
        let elem = cTh[i];

        if (g_cTbl[szTblID].getSortCol() == i)
        {
            if (g_bDbg) alert ("sortTbl: column we're sorting on: " + i);

            if (! elem.classList.contains('tblsort_cursort_col'))
            {
                elem.classList.toggle('tblsort_cursort_col');     // add it
            }

            /*
             * remove any images
             */
            removeImgs (cTh[i]);

            /*
             * append the up/down arrow img
             */
            appendImg (    cTh[i],
                    g_cTbl[szTblID].getSortDir());
                    
        }
        else if (g_cTbl[szTblID].getSortType(i) != null)
        {
            if (g_bDbg) alert ("sortTbl: a sortable column: " + i);

            if (! elem.classList.contains('tblsort_cursort_col'))
            {
                elem.classList.toggle('tblsort_cursort_col');     // add it
            }
        
            /*
             * remove any images
             */
            removeImgs (cTh[i]);
        }
        else
        {
            if (g_bDbg) alert ("sortTbl: a non-sortable column: " + i);

            if (! elem.classList.contains('tblsort_nonsort_col'))
            {
                elem.classList.toggle('tblsort_nonsort_col');     // add it
            }
        }
    }
    
    /*
     * clear msg from status bar
     */
    status = "";

    if (g_bDbg) alert ("LEAVE: sortTable");
}


/******************************************************************************
**
**  rowCompare
**
**  alphanumeric comparision
**
**  RETURN
**  ======
**   0    =>    equivalent
**   1    =>    lhs > rhs
**  -1    =>    rhs > lsh
**
******************************************************************************/
function rowCompare(    cTrLHS,     // in: <tr> array element - LHS
            cTrRHS)     // in: <tr> array element - RHS
{
    var szLHS = "";
    var szRHS = "";

    if (rowCompare.bInit == false)
    {
        /* we've yet to be initialized */

        if (g_bDbg) alert ("rowCompare: sort column: " + rowCompare.nSortCol);

        rowCompare.nNumTimesCalled = 0;
    }

    rowCompare.nNumTimesCalled++;

    /*
     * get the text from the <td> node that we're sorting on (LHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrLHS.getElementsByTagName('td')[rowCompare.nSortCol]);
    szLHS = getTxt.szTxt;

    /*
     * get the text from the <td> node that we're sorting on (RHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrRHS.getElementsByTagName('td')[rowCompare.nSortCol]);
    szRHS = getTxt.szTxt;

    if (g_bDbg && rowCompare.bInit == false)
    {
        alert ("rowCompare: LHS: " + szLHS + ". RHS: " + szRHS);
    }    

    rowCompare.bInit = true;


    if (szLHS == szRHS)
    {
        return 0;
    }
    else if (szLHS > szRHS)
    {
        return 1;
    }
    else
    {
        return -1;
    }
}


/******************************************************************************
**
**  rowCompareInt
**
**  integer comparision
**
**  GLOBALS
**  =======
**  rowCompareInt.nSortCol        set to index of column # we're sorting on
**  rowCompareInt.bInit            set to false before calling
**  rowCompareInt.nNumTimesCalled    return value used for metrics
**
**  RETURN
**  ======
**   0    =>    equivalent
**  +n    =>    lhs > rhs
**  -n    =>    rhs > lsh
**
******************************************************************************/
function rowCompareInt(     cTrLHS,     // in: <tr> array element - LHS
                            cTrRHS)     // in: <tr> array element - RHS
{
    var szLHS = "";
    var szRHS = "";

    if (rowCompareInt.bInit == false)
    {
        /* we've yet to be initialized */

        rowCompareInt.bInit = true;

        if (g_bDbg) alert ("rowCompareInt: sort column: " + rowCompareInt.nSortCol);

        rowCompareInt.nNumTimesCalled = 0;
    }

    rowCompareInt.nNumTimesCalled++;


    /*
     * get the text from the <td> node that we're sorting on (LHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrLHS.getElementsByTagName('td')[rowCompareInt.nSortCol]);
    szLHS = getTxt.szTxt;
    szLHS = szLHS.replace(/\D/g,'');

    /* text => int */
    var nLHS = parseInt(szLHS,10);


    /*
     * get the text from the <td> node that we're sorting on (RHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrRHS.getElementsByTagName('td')[rowCompareInt.nSortCol]);
    szRHS = getTxt.szTxt;
    szRHS = szRHS.replace(/\D/g,'');

    /* text => int */
    var nRHS = parseInt(szRHS,10);


    /*
     * lhs  > rhs    =>    positive
     * rhs  < lhs    =>    negative
     * lhs == rhs    =>    0
     */

    return (nLHS - nRHS);
}


/******************************************************************************
**
**  rowCompareTimestamp
**
**  timestamp comparision
**
**  GLOBALS
**  =======
**  rowCompareTimestamp.nSortCol
**  rowCompareTimestamp.bInit
**  rowCompareTimestamp.nNumTimesCalled
**
**  RETURN
**  ======
**   0    =>    equivalent
**  +n    =>    lhs > rhs
**  -n    =>    rhs > lsh
**
******************************************************************************/
function rowCompareTimestamp(    cTrLHS,     // in: <tr> array element - LHS
                cTrRHS)     // in: <tr> array element - RHS
{
    var szLHS = "";
    var szRHS = "";

    if (rowCompareTimestamp.bInit == false)
    {
        /* we've yet to be initialized */

        rowCompareTimestamp.bInit = true;

        if (g_bDbg) alert ("rowCompareTimestamp: sort column: " + rowCompareTimestamp.nSortCol);

        rowCompareTimestamp.nNumTimesCalled = 0;
    }

    rowCompareTimestamp.nNumTimesCalled++;


    /*
     * get the text from the <td> node that we're sorting on (LHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrLHS.getElementsByTagName('td')[rowCompareTimestamp.nSortCol]);
    szLHS = getTxt.szTxt;

    /*
     * get the text from the <td> node that we're sorting on (RHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrRHS.getElementsByTagName('td')[rowCompareTimestamp.nSortCol]);
    szRHS = getTxt.szTxt;

    /*
     * lhs  > rhs    =>    positive
     * rhs  < lhs    =>    negative
     * lhs == rhs    =>    0
     */

    return (compareTimestamps(szLHS,szRHS));
}


/******************************************************************************
**
**  rowCompareDate
**
**  date comparision (mm/dd/yyyy)
**
**  GLOBALS
**  =======
**  rowCompareDate.nSortCol
**  rowCompareDate.bInit
**  rowCompareDate.nNumTimesCalled
**
**  RETURN
**  ======
**   0    =>    equivalent
**  +n    =>    lhs > rhs
**  -n    =>    rhs > lsh
**
******************************************************************************/
function rowCompareDate(    cTrLHS,     // in: <tr> array element - LHS
                cTrRHS)     // in: <tr> array element - RHS
{
    var szLHS = "";
    var szRHS = "";

    if (rowCompareDate.bInit == false)
    {
        /* we've yet to be initialized */

        rowCompareDate.bInit = true;

        if (g_bDbg) alert ("rowCompareDate: sort column: " + rowCompareDate.nSortCol);

        rowCompareDate.nNumTimesCalled = 0;
    }

    rowCompareDate.nNumTimesCalled++;


    /*
     * get the text from the <td> node that we're sorting on (LHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrLHS.getElementsByTagName('td')[rowCompareDate.nSortCol]);
    szLHS = getTxt.szTxt;

    /*
     * get the text from the <td> node that we're sorting on (RHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrRHS.getElementsByTagName('td')[rowCompareDate.nSortCol]);
    szRHS = getTxt.szTxt;

    /*
     * lhs  > rhs    =>    positive
     * rhs  < lhs    =>    negative
     * lhs == rhs    =>    0
     */

    compareDates.bInit = false;

    return (compareDates(szLHS,szRHS));
}


/******************************************************************************
**
**  rowCompareFloat
**
**  floating point comparision
**
**  GLOBALS
**  =======
**  rowCompareFloat.nSortCol        set to index of column # we're sorting on
**  rowCompareFloat.bInit        set to false before calling
**  rowCompareFloat.nNumTimesCalled    return value used for metrics
**
**  RETURN
**  ======
**   0    =>    equivalent
**  +n    =>    lhs > rhs
**  -n    =>    rhs > lsh
**
******************************************************************************/
function rowCompareFloat(    cTrLHS,     // in: <tr> array element - LHS
                cTrRHS)     // in: <tr> array element - RHS
{
    var szLHS = "";
    var szRHS = "";

    if (rowCompareFloat.bInit == false)
    {
        /* we've yet to be initialized */

        rowCompareFloat.bInit = true;

        if (g_bDbg) alert ("rowCompareFloat: sort column: " + rowCompareFloat.nSortCol);

        rowCompareFloat.nNumTimesCalled = 0;
    }

    rowCompareFloat.nNumTimesCalled++;


    /*
     * get the text from the <td> node that we're sorting on (LHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrLHS.getElementsByTagName('td')[rowCompareFloat.nSortCol]);
    szLHS = getTxt.szTxt;

    /*
     * get the text from the <td> node that we're sorting on (RHS)
     */
    getTxt.szTxt = "";
    getTxt (cTrRHS.getElementsByTagName('td')[rowCompareFloat.nSortCol]);
    szRHS = getTxt.szTxt;

    /*
     * lhs  > rhs    =>    positive
     * rhs  < lhs    =>    negative
     * lhs == rhs    =>    0
     */

    return (compareFloats(szLHS,szRHS));
}


/******************************************************************************
**
**  rowCompareFloat
**
**  floating point comparision
**
**  GLOBALS
**  =======
**  g_nSortCol
**
**  RETURN
**  ======
**   0    =>    equivalent
**  +n    =>    lhs > rhs
**  -n    =>    rhs > lsh
**
******************************************************************************/
function rowCompareFloatOld(    cTrLHS,     // in: <tr> array element - LHS
                cTrRHS)     // in: <tr> array element - RHS
{
    /* strings */
    var szLHSTxt = cTrLHS.getElementsByName('td')[g_nSortCol].firstChild.nodeValue;
    var szRHSTxt = cTrRHS.getElementsByName('td')[g_nSortCol].firstChild.nodeValue;

    /* remove anything non-numeric */
    szLHSTxt.replace (/[^0-9\.]/g, "");
    szRHSTxt.replace (/[^0-9\.]/g, "");

    /* not sure this is necessary */
    var dLHS = parseFloat (szLHSTxt);
    var dRHS = parseFloat (szRHSTxt);

    /*
     * dLHS >  dRHS        => positive
     * dLHS <  dRHS     => negative
     * dLHS == dRHS     => 0
     */
    return (dLHS - dRHS);
}


/******************************************************************************
**
**  appendImg
**
******************************************************************************/
function appendImg (    cTH,        // in: th element to append indicator image to
                        szSortDir)    // in: sort direction ("asc"|"desc")
{
    if (g_bDbg) alert ("ENTER: appendImg");

    if (g_bDbg) alert ("appendImg: sort direction: " + szSortDir);

    /*
     * alternate text
     */

    var szAltText = "Ascending";

    if (szSortDir == "desc")
    {
        szAltText = "Descending";
    }


    var cIndicator = document.createElement("img");

    cIndicator.setAttribute("src"   , "/images/tbl_sort_" + szSortDir + ".gif");
    cIndicator.setAttribute("width" , "9");
    cIndicator.setAttribute("height", "10");
    cIndicator.setAttribute("alt"   , szAltText);
    cIndicator.className = "tblsort_sort_indicator";

    cTH.appendChild(cIndicator);
    
    if (g_bDbg) alert ("LEAVE: appendImg");

}


/******************************************************************************
**
**  removeImgs
**
**  given a node, remove any 'img' children elements
**
******************************************************************************/
function removeImgs (cElem)
{
    var cImg = cElem.getElementsByTagName('img');

    for (var i=0; i<cImg.length; i++)
        cElem.removeChild(cImg[i]);
}



/******************************************************************************
**
**  getTxt
**
**  given a DOM node object, return all of the text -- including all of the 
**  text of any child node(s)
**
******************************************************************************/
function getTxt (cNode)    // in:     DOM Node object
{
    if (cNode.nodeType == 3)    /* text */
    {
        if (g_bDbg && getTxt.bInit == false)
            alert ("getTxt: txt node: " + cNode.data);

        szTxt = cNode.data;
        szTxt = szTxt.toUpperCase();

        getTxt.szTxt = getTxt.szTxt + szTxt;
    }
    else
    {
        var cChild = cNode.childNodes;

        if (g_bDbg && getTxt.bInit == false)
            alert ("getTxt: not a text node - length = " + cChild.length);

        for (var i=0; i<cChild.length; i++)
        {
            getTxt (cChild[i]);
        }
    }

    getTxt.bInit = true;
}


/******************************************************************************
**
**  compareTimestamps
**
**  mm/dd/yyyy hh:mm:ss
**
******************************************************************************/
function compareTimestamps (    szLHS,    // in: timestamp mm/dd/yyyy hh:mm:ss
                szRHS)    // in: timestamp mm/dd/yyyy hh:mm:ss
{
    // separate date & times
    var szLHS1 = szLHS.split(" ");
    var szRHS1 = szRHS.split(" ");

    // work w/ dates
    var szLHSDate = szLHS1[0];
    var szRHSDate = szRHS1[0];

    var szLHSDate1 = szLHSDate.split("/");
    var szRHSDate1 = szRHSDate.split("/");

    var nLHSMonth = parseInt (szLHSDate1[0],10);
    var nLHSDay   = parseInt (szLHSDate1[1],10);
    var nLHSYear  = parseInt (szLHSDate1[2],10);

    var nRHSMonth = parseInt (szRHSDate1[0],10);
    var nRHSDay   = parseInt (szRHSDate1[1],10);
    var nRHSYear  = parseInt (szRHSDate1[2],10);

    if (nLHSYear > nRHSYear)
    {
        return 1;
    }
    else if (nLHSYear < nRHSYear)
    {
        return -1;
    }

    // if here, years are equivalent. check months

    if (nLHSMonth > nRHSMonth)
    {
        return 1;
    }
    else if (nLHSMonth < nRHSMonth)
    {
        return -1;
    }

    // if here, years & months are equivalent. check days

    if (nLHSDay > nRHSDay)
    {
        return 1;
    }
    else if (nLHSDay < nRHSDay)
    {
        return -1;
    }


    // if here, years & months & days are equivalent. check times

    var szLHSTime = szLHS1[1];
    var szRHSTime = szRHS1[1];

    var szLHSTime1 = szLHSTime.split(":");
    var szRHSTime1 = szRHSTime.split(":");

    var nLHSHour = parseInt (szLHSTime1[0],10);
    var nLHSMin  = parseInt (szLHSTime1[1],10);
    var nLHSSec  = parseInt (szLHSTime1[2],10);

    var nRHSHour = parseInt (szRHSTime1[0],10);
    var nRHSMin  = parseInt (szRHSTime1[1],10);
    var nRHSSec  = parseInt (szRHSTime1[2],10);

    if (nLHSHour > nRHSHour)
    {
        return 1;
    }
    else if (nLHSHour < nRHSHour)
    {
        return -1;
    }

    // if here, hours are equivalent. check minutes

    if (nLHSMin > nRHSMin)
    {
        return 1;
    }
    else if (nLHSMin < nRHSMin)
    {
        return -1;
    }

    // if here, hours & minutes are equivalent. check seconds

    if (nLHSSec > nRHSSec)
    {
        return 1;
    }
    else if (nLHSSec < nRHSSec)
    {
        return -1;
    }

    // if here, timestamps equivalent
    
    return 0;
}


/******************************************************************************
**
**  compareDates
**
**  mm/dd/yyyy
**
**  RETURN
**  ======
**  -1        lhs  < rhs
**   1        lhs  > rhs
**   0        lhs == rhs
**
******************************************************************************/
function compareDates (    szLHS,    // in: date mm/dd/yyyy
            szRHS)    // in: date mm/dd/yyyy
{
    var bInit = compareDates.bInit;

    compareDates.bInit = true;

    if (g_bDbg && bInit == false)
        alert ("compareDates: LHS: " + szLHS +  ". RHS: " + szRHS + ".");

    var szLHS1 = szLHS.split("/");
    var szRHS1 = szRHS.split("/");

    var nLHSMonth = parseInt (szLHS1[0],10);
    var nLHSDay   = parseInt (szLHS1[1],10);
    var nLHSYear  = parseInt (szLHS1[2],10);

    var nRHSMonth = parseInt (szRHS1[0],10);
    var nRHSDay   = parseInt (szRHS1[1],10);
    var nRHSYear  = parseInt (szRHS1[2],10);

    if (g_bDbg && bInit == false)
        alert (    "compareDates: " +
            "LHS Month (int): " + nLHSMonth + ", " + 
            "LHS Day (int): "   + nLHSDay   + ", " + 
            "LHS Year (int): "  + nLHSYear  + ", " +
            "RHS Month (int): " + nRHSMonth + ", " + 
            "RHS Day (int): "   + nRHSDay   + ", " + 
            "RHS Year (int): "  + nRHSYear);

    if (nLHSYear > nRHSYear)
    {
        if (g_bDbg && bInit == false)
            alert (    "compareDates: " +
                "nLHSYear (" + nLHSYear + ")" +
                " > " +
                "nRHSYear (" + nRHSYear + ")" +
                " RETURNING 1");
        return 1;
    }
    else if (nLHSYear < nRHSYear)
    {
        if (g_bDbg && bInit == false)
            alert (    "compareDates: " +
                "nLHSYear (" + nLHSYear + ")" +
                " < " +
                "nRHSYear (" + nRHSYear + ")" +
                " RETURNING -1");

        return -1;
    }

    // if here, years are equivalent. check months

    if (nLHSMonth > nRHSMonth)
    {
        if (g_bDbg && bInit == false)
            alert (    "compareDates: " +
                "nLHSMonth (" + nLHSMonth + ")" +
                " > " +
                "nRHSMonth (" + nRHSMonth + ")" +
                " RETURNING 1");

        return 1;
    }
    else if (nLHSMonth < nRHSMonth)
    {
        if (g_bDbg && bInit == false)
            alert (    "compareDates: " +
                "nLHSMonth (" + nLHSMonth + ")" +
                " < " +
                "nRHSMonth (" + nRHSMonth + ")" +
                " RETURNING -1");

        return -1;
    }

    // if here, years & months are equivalent. check days

    if (nLHSDay > nRHSDay)
    {
        if (g_bDbg && bInit == false)
            alert (    "compareDates: " +
                "nLHSDay (" + nLHSDay + ")" +
                " > " +
                "nRHSDay (" + nRHSDay + ")" +
                " RETURNING 1");

        return 1;
    }
    else if (nLHSDay < nRHSDay)
    {
        if (g_bDbg && bInit == false)
            alert (    "compareDates: " +
                "nLHSDay (" + nLHSDay + ")" +
                " < " +
                "nRHSDay (" + nRHSDay + ")" +
                " RETURNING 1");

        return -1;
    }


    // if here, dates equivalent
    
    if (g_bDbg && bInit == false)
        alert (    "compareDates: DATES ARE EQUIVALENT " +
            " RETURNING 0");


    return 0;
}


/******************************************************************************
**
**  compareFloats
**
**  removes all characters except digits and decimal points before doing
**  comparision
**
**  RETURN
**  ======
**  -1        lhs  < rhs
**   1        lhs  > rhs
**   0        lhs == rhs
**
******************************************************************************/
function compareFloats (    szLHS,    // in: 
                szRHS)    // in: 
{
    // remove all except digits and decimal points
    var szLHS1 = szLHS.replace(/[^0-9\.]/g,"");
    var szRHS1 = szRHS.replace(/[^0-9\.]/g,"");

    var dLHS   = parseFloat (szLHS1);
    var dRHS   = parseFloat (szRHS1);

    if (dLHS > dRHS)
    {
        return 1;
    }
    else if (dLHS < dRHS)
    {
        return -1;
    }

    // if here, floating point numbers are equivalent
    return 0;
}
