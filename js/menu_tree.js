// $Header: /user2/jscript/RCS/menu_tree.js,v 1.8 2005/09/02 20:13:49 webmast Exp $

//==========
//
//  menu_tree.js
//
//  menu_tree
//
//  chris hardick
//
//==========


var folders = document.getElementsByClassName("folder_heading");

var i;

for (i=0;i<folders.length;i++)
{
    folders[i].onclick = function()
    {
        this.classList.toggle("active");
    
        var img = this.firstChild;
    
        if (img)
        {
            var idx;

            if (idx = img.src.indexOf("closed.gif") > -1)
            {
                img.src = "../images/open.gif";
            }        
            else
            {
                img.src = "../images/closed.gif";
            }
        }

        this.nextElementSibling.classList.toggle("show");
    }
}
