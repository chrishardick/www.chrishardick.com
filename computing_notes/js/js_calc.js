//=============================================================================
//
//  js_calc.js
//
//  JS for js_calc.html
//
//  IMPORTANT FUNCTIONS
//  ===================
//  on_number       
//
//  on_operator    
//
//  on_equal
//
//  on_clear
//
//  mode = OP1
//  ----------
//  ready to receive (or receiving) OP1
//  accept numeric values and operators
//    
//  if numeric
//      append to buffer
//    
//  if OPERATOR 
//      if buffer is empty or not a valid number
//          ignore
//      else
//          op1=buffer
//          clear buffer
//          op = op_in
//          mode = OP2
//
//  if EQUAL
//      ignore
//  
//  mode = OP2
//  ----------
//  ready to receive (or receiving) OP2
//  
//  if numeric
//      append to buffer
//  
//  if OPERATOR 
//      if buffer is empty
//          replace op
//      else
//          op2=buffer
//          perform operation: op1 op op2
//          op = op_in
//          op1 = result
//          clear op2
//          clear buffer
//  
//          // 1 + 2    + 
//          // 3 +   
//  
//  if EQUAL
//      if buffer is empty
//          ignore
//      else
//          op2=buffer
//          perform operation: op1 op op2
//          op1 = result
//  
//          // 1 + 2    = 
//          //          3
//          // =
//          // 3 + 2
//=============================================================================


// 123 + 123 
var STATE_OP1 = 1;
var STATE_OP2 = 2;

                
//
// globals
//

var state       = STATE_OP1;


var op          = "";
var op1         = "";
var op2         = "";
var buf         = "";

var input_element = document.getElementById("input");



//=============================================================================
//
//  on_keydown
//
//  keydown handler
//
//=============================================================================
function on_keydown (e)
{
    console.info ("on_keydown: object=|" + print_obj(e) + "|");

    //
    // prevent default action 
    // - i.e. displaying entered character, backspace, etc.
    //

    e.preventDefault();


    input_element.focus();


    if (e.keyCode == 8)
    {
        // backspace
    
        console.info ("on_keydown: BACKSPACE");

        on_backspace();
    }
    else if (e.keyCode == 13)
    {
        // ENTER
        // - handled as '='
    
        console.info ("on_keydown: ENTER");

        on_equal();
    }
    else 
    {
        key = e.key;

        if  ((key >= '0' && key <= '9') || (key == '.'))
        {
            on_number(key);
        }
        else if (key == 'C' || key == 'c')
        {
            on_clear();
        }
        else if (is_operator(key))
        {
            on_operator(key);
        }
        else if (key == '=')
        {
            on_equal();
        }
    }
}


//=============================================================================
//
//  on_backspace
//
//  BACKSPACE HANDLER
//
//  REMOVE LAST CHARACTER [FROM BUFFER & INPUT]
//  - if buffer is empty, no action is taken
//
//=============================================================================
function on_backspace ()
{
    console.info ("on_backspace: BEGIN: buf=|" + buf + "|. length=" + buf.length);

    if (buf.length > 0)
    {
        //
        // remove last character from buffer
        //

        buf = buf.substring(0,buf.length-1);  document.getElementById("buf").innerHTML = buf;        
        
        console.info ("on_backspace: buf=|" + buf + "|");
    }
    else
    {
        console.info ("on_backspace: END: empty buffer - no action taken");
    }
    
    //
    // buffer => input element
    // - keeps buffer & input in-sync
    //

    document.getElementById("input").value = buf;
}


//=============================================================================
//
//  on_number
//
//  NUMERIC ENTRY HANDLER
// - called when user enters numeric data (i.e. [0-9.]
//
//  APPEND INPUTTED CHARACTER TO BUFFER & INPUT
//  - if invalid character entered, no action is taken
//
//=============================================================================
function on_number (val)
{
    if (val.length != 1)
    {
        console.info ("on_number: invalid length. ignored. |" + val + "|");
        return;
    }

    console.info ("on_number: |" + val + "|");

    if (val >= '0' && val <= '9')
    {   
        if (val == '0' && buf.length == 0)
        {
            // leading zeros are ignored
            
            console.info ("on_number: leading zero ignored");
            return;
        }

        // append character to buffer
        buf += val;
        set_buf (buf);
        set_input (buf);
    }
    else if (val == '.')
    {
        if (buf.length == 0)
        {
            buf = "0.";
            set_buf (buf);
            set_input (buf);
        }
        else if (buf.search(/\./) != -1)
        {
            // buffer already contains a decimal point
            // - ignore

            console.info ("on_number: duplicate decimal point ignored");
            return;
        }
        else
        {
            buf += val;
            set_buf (buf);
            set_input (buf);
        }
    }
}


//=============================================================================
//
//  on_operator
//
//  OPERATOR HANDLER
// - called when user enters an operator
//
//=============================================================================
function on_operator (op_in)
{
    console.info ("on_operator: OP=" + op_in + ". STATE=" + state_string(state));

    if (state == STATE_OP1)
    {
        if (buf.length == 0)
        {
            console.info ("on_operator: BUF.LENGTH=0. OPERATOR IGNORED");
            return;
        }
        else
        {
            set_op1 (buf);
            clear_buffer();
            set_op (op_in);
            set_state (STATE_OP2);
        }
    }
    else if (state == STATE_OP2)
    {
        if (buf.length == 0)
        {
            set_op (op_in);
        }
        else
        {
            set_op2 (buf);
            var result = perform_operation (op1, op, op2);
            set_op (op_in);
            set_op1 (result);
            set_input (result);
            set_op2 ("");
            set_buf ("");
        }
    }
}


//=============================================================================
//
//  on_equal handler
//
//  BUF => OP2
// 
//=============================================================================
function on_equal ()
{
    console.info ("on_equal: STATE=" + state_string(state));

    var result;

    //
    // 
    //

    if (state == STATE_OP1)
    {
        console.info ("on_equal: ignored - STATE=STATE_OP1");

        return;
    }
    else if (state == STATE_OP2)
    {
        if (buf.length == 0)
        {
            console.info ("on_equal: ignored - buf.length=0");

            return;
        }
        else
        {
            set_op2 (buf);
            var result = perform_operation (op1, op, op2);
            set_op1 (result);
            set_input (result);
        }
    }
}


function on_clear ()
{
    console.info ("on_clear: BEGIN");
    
    set_state(STATE_OP1);
    set_buf("");
    set_op1("");
    set_op2("");
    set_op("");
    set_input ("");
    
    console.info ("on_clear: END");
}

//
// cell_click handler
//
function on_cell_click (e)
{
    var txt = this.innerHTML;

    console.info ("on_cell_click: txt=|" + txt + "|");


    input_element.focus();


    if (txt == "C")
    {
        //
        // clear
        //

        console.info ("on_cell_click: clear");

        on_clear();
    }
    else if (txt == "=")
    {
        //
        // equal
        //

        console.info ("on_cell_click: equal");

        on_equal();
    }
    else if (is_operator(txt))
    {
        //
        // operator
        //

        on_operator(txt);
    }
    else
    {
        //
        // text
        //

        console.info ("on_cell_click: text");

        on_number(txt);
    }
}


//
// register click events for calculator buttons
//

var cell_elements = document.getElementsByClassName("cell");

for (var i=0; i<cell_elements.length; i++)
{
    cell_elements[i].addEventListener("click", on_cell_click, false);
}


//
// register key events for input field
//

document.getElementById("input").addEventListener("keydown" , on_keydown    , false);

window.addEventListener("load",init_screen, false);


function init_screen (e)
{
    input_element.focus();

    set_state   (STATE_OP1);
    set_buf     ("");
    set_op1     ("");
    set_op2     ("");
    set_op      ("");
}
    

//
// is_operator
// - is input character an operator
//
function is_operator (c)
{
    switch (c)
    {
        case '/':
        case 'x':   case '*':
        case '+':
        case '-':

            return true;
    }

    return false;
}


//
// generic function to return an object as a string
//
function print_obj (obj)
{
    var ret = "";

    var first = true;

    for (var prop in obj)
    {
        var rhs = typeof(obj[prop]);

        if (rhs === "string" || rhs === "boolean" || rhs === "number")
        {
            rhs = obj[prop];
        }

        if (!first)
        {
            ret += ",";
        }

        ret += prop + "=" + rhs;

        first = false;
    }

    return ret;
}


//=============================================================================
//
//  perform_operation
//
//  perform op1 op op2 returning the result
//
//  accepts strings, returns a string
//
//  RETURN
//  ======
//  result -- as string
//  an error, error string which can be presented to the user
//
//=============================================================================
function perform_operation ( lcl_op1        // string
                            ,lcl_op         // string
                            ,lcl_op2        // string
                            )
{
    //
    // convert operands to real numbers
    //

    var op1_float = parseFloat(lcl_op1);
    var op2_float = parseFloat(lcl_op2);


    if (op == "+")
    {
        result = op1_float + op2_float;
    }
    else if (op == "-")
    {
        result = op1_float - op2_float;
    }
    else if (op == '*' || op == 'x')
    {
        result = op1_float * op2_float;
    }
    else if (op == '/')
    {
        result = op1_float / op2_float;
    }
    else
    {
        result = "invalid op - " + op;
    }

    result = result.toString();

    return result;
}


function set_state (val)
{
    console.info ("set_state: val=" + val + "|");

    if (val != STATE_OP1 &&
        val != STATE_OP2)
    {
        console.error ("set_state: INVALID VALUE: |" + val + "|. NO ACTION TAKEN");

        return;
    }

    state = val;    document.getElementById("state").innerHTML = state_string(state);
}


//
// set input
//
function set_input (val)
{
    console.info ("set_input: val=|" + val + "|");

    document.getElementById("input").value = val;
}


//
// set buf
//
function set_buf (val)
{
    console.info ("set_buf: val=|" + val + "|");

    buf = val;       document.getElementById("buf").innerHTML = buf;
}

//
// set op1
//
function set_op1 (val)
{
    console.info ("set_op1: val=|" + val + "|");

    op1 = val;       document.getElementById("op1").innerHTML = op1;
}

//
// set op2
//
function set_op2 (val)
{
    console.info ("set_op2: val=|" + val + "|");

    op2 = val;       document.getElementById("op2").innerHTML = op2;
}

//
// set op
//
function set_op (val)
{
    console.info ("set_op: val=|" + val + "|");

    op = val;       document.getElementById("op").innerHTML = op;
}

//
//
//
function clear_operator_and_operands ()
{
    set_op1 ("");
    set_op2 ("");
    set_op  ("");
}


//
// clear accumulator
//
function clear_buffer ()
{
    set_buf ("");
}


//
// clear input field
// - screen only
//
function clear_input ()
{
    set_input ("");
}


//
// clear all internal buffers
//
function clear_variables ()
{
    clear_buffer();
    clear_operator_and_operands();
}

function state_string (val)
{
    if (val == STATE_OP1)
    {
        return "OP1 (" + STATE_OP1 + ")";
    }
    else if (val == STATE_OP2)
    {
        return "OP2 (" + STATE_OP2 + ")";
    }
    else
    {
        return "ERR-" + val;
    }
}
