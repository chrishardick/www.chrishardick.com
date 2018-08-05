// $Header: /user2/wwws.legalmgmt/html/danhardickesq/jscript/RCS/tbl_sort_ctbl.js,v 1.2 2005/09/25 12:05:08 webmast Exp $

/******************************************************************************
**
**  tbl_sort_ctbl.js
**
**  client side html table sorting module - CTbl class definition
**
**  chris hardick
**
******************************************************************************/


/******************************************************************************
**
**  CTbl class
**
**  properties
**  ==========
**  m_nNumCols        =>    number of columns
**  m_nSortCol        =>    currently sorted column
**  m_szSortDir        =>    current sort direction "asc"|"desc"
**  m_szSortType[]    =>    array of sort types
**
******************************************************************************/
function CTbl ( nNumCols,       // # of columns
                szSortType,     // array of sort types: "int", "float", "alphanumeric", null
                nSortCol,       // currently sorted column
                szSortDir)      // current sort direction
{
    if (g_bDbg) alert ("ENTER: CTbl");

    // # columns in table
    this.m_nNumCols = nNumCols;

    // current sorted column 
    this.m_nSortCol = nSortCol;

    // current sort direction
    this.m_szSortDir = szSortDir;

    this.m_szSortType = new Array();

    for (var i=0; i<szSortType.length; i++)
        this.m_szSortType[i] = szSortType[i];


    CTbl.prototype.toString = function () 
    {
        return  "CTbl::m_nNumCols:    " + this.m_nNumCols + "\n" +
                "CTbl::m_szSortType:   " + this.m_szSortType + "\n" + 
                "CTbl::m_nSortCol: " + this.m_nSortCol + "\n" +
                "CTbl::m_sCurSortDir: " + this.m_szSortDir + "\n";
    }

    /**********
     * SortCol
     * - get
     * - set
     **********/

    CTbl.prototype.getSortCol = function ()
    {
        return this.m_nSortCol;
    }

    CTbl.prototype.setSortCol = function (nSortCol)
    {
        this.m_nSortCol = nSortCol;
    }


    /**********
     * SortDir ("asc"|"desc")
     * - init
     * - get
     * - toggle
     **********/

    CTbl.prototype.getSortDir = function ()
    {
        return this.m_szSortDir;
    }

    CTbl.prototype.toggleSortDir = function ()
    {
        if (this.m_szSortDir == "asc")
            this.m_szSortDir = "desc";
        else
            this.m_szSortDir = "asc";    
    }

    CTbl.prototype.setInitSortDir = function ()
    {
        this.m_szSortDir = "asc";
    } 

    
    /**********
     * SortType
     * - getSortTypeCurCol
     * - getSortType
     **********/

    CTbl.prototype.getSortTypeCurCol = function ()
    {
        return this.m_szSortType[this.m_nSortCol];
    }

    CTbl.prototype.getSortType = function (nCol)
    {
        return this.m_szSortType[nCol];
    }    


    if (g_bDbg) alert ("LEAVE: CTbl");
}
