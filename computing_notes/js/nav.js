//==========
// nav.js
//==========


//==========
// onload handler
//==========
function on_load (f)
{
    console.log("onload");

    print_nav(f);
    print_title();
    setup_accordions();
}


//==========
// print_title
//==========
function print_title ()
{
//    var title_html = `
//    <span class="menutron" onclick="openNav()">&#9776;</span><a class="title" href="index.html">Computing Notes</a>` 

    var title_html = `<div class="title">Computing Notes</div>
    <div class="searchbox"><form action='search.py' method='POST'><input type="text" name="searchbox">
    <input type="submit" value="search">
    </form></div>`
    // onkeydown= "if (event.keyCode == 13) alert('Hello, World!')">

    document.getElementById('title').innerHTML = title_html;
}


//==========
// setup_accordions
//==========
function setup_accordions ()
{
    console.log ("setup_accordions");

    var acc = document.getElementsByClassName("accordion");

    for (let i=0; i<acc.length; i++)
    {
        console.log ("accordion");

        acc[i].onclick = function() {
            console.log ("I've been called");

            this.classList.toggle("active");

            var panel = this.nextElementSibling;

            if (panel.style.display === "block")
            {
                console.log ("block to none");

                panel.style.display = "none";
            }
            else
            {
                console.log ("none to block");

                panel.style.display = "block";
            }
        }
    }
}

function toggle_active (o)
{
    console.log ("make_active");

    o.classList.toggle("active");

    var panel = o.nextElementSibling;

    if (panel.style.display === "block")
    {
        console.log ("block to none");

        panel.style.display = "none";
    }
    else
    {
        console.log ("none to block");

        panel.style.display = "block";
    }
}

//==========
// print_nav
//==========
function print_nav(f)
{
    console.log ("print_nav");

    var nav_html = `
    <button class="accordion" id="accordion_bash">Bash</button>
    <div class="panel">
        <a href="bash_intro.html">Introduction</a>
        <a href="bash_processes.html">Processes</a>
        <a href="bash_functions.html">Functions</a>
        <a href="bash_variables.html">Variables</a>
        <a href="bash_cmdline_opts.html">Command Line Options</a>
        <a href="bash_arithmetic.html">Arithmetic</a>
        <a href="bash_flowcontrol.html">Flow Control</a>
        <a href="bash_precedence.html">Precedence</a>
    </div>
    
    <button class="accordion" id="accordion_c">C</button>
    <div class="panel">
        <a href="c_bit_operations.html">Bit Operations</a>
        <a href="c_function_pointers.html">Function Pointers</a>
        <a href="c_function_reference.html">Function Reference</a>
        <a href="c_posix_datatypes.html">POSIX Datatypes</a>
        <a href="c_predefined_ids.html">Predefined IDS</a>
        <a href="c_tokenize.html">String Tokenize</a>
        <a href="c_variable_argument_list.html">Variable Argument List</a>
    </div>
    
    <button class="accordion" id="accordion_cunix">C/UNIX</button>
    <div class="panel">
        <a href="cunix_files.html">Files</a>
        <a href="cunix_signals.html">Signals</a>
        <a href="cunix_time.html">Time</a>
        <a href="cunix_nanosleep.html">nanosleep()</a>
        <a href="cunix_clock_gettime.html">clock_gettime()</a>
    </div>
    
    <button class="accordion" id="accordion_sockets_api">Sockets API (C/UNIX)</button>
    <div class="panel">
        <a href="sockets_elementary_socket_fxns.html">Elementary Socket Functions</a>
        <a href="sockets_read.html">read()</a>
        <a href="sockets_write.html">write()</a>
        <a href="sockets_close.html">close()</a>
        <a href="sockets_shutdown.html">shutdown()</a>
        <a href="sockets_socket_address_structs.html">Socket Address Structures</a>
        <a href="sockets_port_numbers.html">Port Numbers</a>
        <a href="sockets_sockets.html">Sockets</a>
        <a href="sockets_byte_order.html">Byte Order</a>
        <a href="sockets_protocols.html">Protocols</a>
        <a href="sockets_transport_layer_protocols.html">Transport Layer Protocols (UDP, TCP)</a>
        <a href="sockets_application_layer_protocols.html">Application Layer Protocols</a>
        <a href="sockets_data_format.html">Data Format</a>
        <a href="sockets_io_multiplexing.html">I/O Multiplexing</a>
        <a href="sockets_socket_options.html">Socket Options</a>
        <a href="sockets_udp_sockets.html">UDP Sockets</a>
        <a href="sockets_terms.html">Terms</a>
    </div>
    
    <button class="accordion" id="accordion_pthreads">POSIX Threads (C/UNIX)</button>
    <div class="panel">
        <a href="pthreads_when_to_use_threads.html">When to Use Threads</a>
        <a href="pthreads_misc.html">Misc</a>
        <a href="pthreads_threads.html">Threads</a>
        <a href="pthreads_mutexes.html">Mutexes</a>
        <a href="pthreads_condition_variables.html">Condition Variables</a>
        <a href="pthreads_memory_visibility_rules.html">Memory Visibility Rules</a>
        <a href="pthreads_one_time_initialization.html">One Time Initialization</a>
        <a href="pthreads_stdio.html">Pthreads and Stdio</a>
        <a href="pthreads_thread_cancellation.html">Thread Cancellation</a>
        <a href="pthreads_pthreads_and_signals.html">Pthreads and Signals</a>
        <a href="pthreads_attribute_objects.html">Attribute Objects</a>
        <a href="#">Thread Specific Data - TBD</a>
        <a href="#">Read/Write Locks - TBD</a>
    </div>
    
    <button class="accordion" id="accordion_cpp">C++</button>
    <div class="panel">
        <a href="cpp_oop.html">OOP</a>
        <a href="cpp_member_functions.html">Member Functions</a>
        <a href="cpp_constructors.html">Constructors</a>
        <a href="cpp_destructors.html">Destructors</a>
        <a href="cpp_encapsulation.html">Encapsulation</a>
        <a href="cpp_inheritance.html">Inheritance</a>
        <a href="cpp_polymorphism.html">Polymorphism</a>
        <a href="cpp_default_parameters.html">Default Parameters</a>
        <a href="cpp_function_overloading.html">Function Overloading</a>
        <a href="cpp_operator_overloading.html">Operator Overloading</a>
        <a href="cpp_typecasting.html">Typecasting</a>
        <a href="cpp_constants.html">Constants</a>
        <a href="cpp_dynamic_memory_allocation.html">Dynamic Memory Allocationg</a>
        <a href="cpp_inline.html">Inline Functions</a>
        <a href="cpp_initialization_list.html">Initialization List</a>
        <a href="cpp_functional_notation.html">Functional Notation</a>
        <a href="cpp_access_attributes.html">Access Attributes</a>
        <a href="cpp_friend_functions.html">Friend Functions</a>
        <a href="cpp_references.html">References</a>
        <a href="cpp_this_pointer.html">this Pointer</a>
        <a href="cpp_static_class_members.html">Static Class Members</a>
        <a href="cpp_function_templates.html">Function Templates</a>
        <a href="cpp_class_templates.html">Class Templates</a>
        <a href="cpp_exceptions.html">Exceptions</a>
        <a href="cpp_function_objects.html">Function Objects (Functors)</a>
        <a href="cpp_namespaces.html">Namespaces</a>
        <a href="cpp_pair.html">Pair</a>
        <a href="cpp_vector.html">Vector</a>
        <a href="cpp_list.html">List</a>
        <a href="cpp_map.html">Map and Multimap</a>
        <a href="#">Set - TBD</a>
        <a href="cpp_deque.html">Deque</a>
        <a href="cpp_string.html">String</a>
        <a href="cpp_transform.html">Transform</a>
        <a href="cpp_iostreams.html">iostreams</a>
    </div>
    
    <button class="accordion" id="accordion_db">Databases</button>
    <div class="panel">
        <a href="db_transactions.html">Transactions</a>
        <a href="db_sqlite.html">SQLite</a>
        <a href="db_mysql.html">MySQL</a>
        <a href="db_mysql_join.html">MySQL - join</a>
        <a href="db_mysql_sql_cmds.html">MySQL - SQL</a>
    </div>

    <button class="accordion" id="accordion_git">Git</button>
    <div class="panel">
        <a href="git.html">Cheat Sheet</a>
    </div>

    <button class="accordion" id="accordion_html">HTML</button>
    <div class="panel">
        <a href="html_intro.html">Introduction</a>
        <a href="html_colors.html">Colors</a>
        <a href="html_color_test.html">Color Tester</a>
        <a href="html_forms.html">Forms</a>
        <a href="html_dom_events.html">DOM Events</a>
        <a href="html_basic_template.html">Basic Template</a>
    </div>

    <button class="accordion" id="accordion_css">CSS</button>
    <div class="panel">
        <a href="css_intro.html">Introduction</a>
        <a href="css_external_internal_inline.html">Internal, External, Inline</a>
        <a href="css_html_element_types.html">HTML Element Types</a>
        <a href="css_rules.html">Rules</a>
        <a href="css_specificity.html">Specificity</a>
        <a href="css_units.html">Units</a>
        <a href="css_generated_content.html">Generated Content</a>
        <a href="css_layout.html">Layout</a>
        <a href="css_font_properties.html">Font Properties</a>
        <a href="css_text_properties.html">Text Properties</a>
        <a href="css_color_and_bg_properties.html">Color and Background Properties</a>
        <a href="css_content_area_padding_borders_margins.html">Content Area, Padding, Borders and Margins</a>
        <a href="css_position_properties.html">Position Properties</a>
        <a href="css_table_properties.html">Table Properties</a>
        <a href="css_misc_properties.html">Misc Properties</a>
    </div>

    <button class="accordion" id="accordion_http">HTTP</button>
    <div class="panel">
        <a href="http_intro.html">Introduction</a>
        <a href="http_apache_http.html">Apache HTTP</a>
        <a href="http_apache_virtual_hosts.html">Apache - Virtual Hosts</a>
        <a href="http_cookies.html">Cookies</a>
        <a href="http_redirection.html">Re-direction</a>
    </div>

    <button class="accordion" id="accordion_js">JavaScript</button>
    <div class="panel">
        <a href="js_intro.html">Introduction</a>
        <a href="js_data_types.html">Data Types</a>
        <a href="js_control_structs.html">Control Structures</a>
        <a href="js_objects.html">Objects</a>
        <a href="js_variables.html">Variables</a>
        <a href="js_functions.html">Functions</a>
        <a href="js_exceptions.html">Exceptions</a>
        <a href="js_date.html">Date class</a>
        <a href="js_json.html">JSON</a>
        <a href="js_date_examples.html">Date class Examples</a>
        <a href="js_client_side.html">Client Side</a>
        <a href="js_client_objects.html">Client Side Objects</a>
        <a href="js_dom.html">DOM</a>
        <a href="js_clock.html">Clock</a>
        <a href="js_loan_calc.html">Loan Calculator</a>
        <a href="js_scratch_pad.html">Scratch Pad</a>
        <a href="js_jquery.html">jquery</a>
    </div>

    <button class="accordion" id="accordion_ajax">AJAX</button>
    <div class="panel">
        <a href="ajax_intro.html">Introduction</a>
    </div>

    <button class="accordion" id="accordion_linux">Linux</button>
    <div class="panel">
        <a href="linux_systemd.html">systemd</a>
        <a href="linux_cron.html">cron</a>
        <a href="linux_dhcp.html">DHCP</a>
        <a href="linux_iptables.html">IPTables</a>
        <a href="linux_modules.html">Modules</a>
        <a href="linux_debian.html">Debian</a>
        <a href="linux_raspberrypi.html">Raspberry Pi</a>
        <a href="linux_rcs.html">RCS</a>
        <a href="linux_rsync.html">rsync</a>
        <a href="linux_sendmail.html">sendmail</a>
        <a href="linux_shutdown.html">shutdown</a>
        <a href="linux_sudo.html">sudo</a>
        <a href="linux_tcpdump.html">tcpdump</a>
        <a href="linux_wireless.html">wireless</a>
        <a href="linux_inotifywait.html">inotifywait</a>
        <a href="linux_tape_info.html">Tapes</a>
    </div>

    <button class="accordion" id="accordion_python">Python</button>
    <div class="panel">
        <a href="python_intro.html">Introduction</a>
        <a href="python_variables.html">Variables</a>
        <a href="python_operators.html">Operators</a>
        <a href="python_list.html">List</a>
        <a href="python_tuple.html">Tuple</a>
        <a href="python_dictionary.html">Dictionary</a>
        <a href="python_set.html">Set</a>
        <a href="python_control_structs.html">Control Structures</a>
        <a href="python_functions.html">Functions</a>
        <a href="python_cmd_line_args.html">Command Line Arguments</a>
        <a href="python_external_files.html">External Files</a>
        <a href="python_modules.html">Modules</a>
        <a href="python_classes.html">Classes</a>
        <a href="python_dates_times.html">Dates and Times</a>
        <a href="python_exceptions.html">Exceptions</a>
        <a href="python_regex.html">Regular Expressions</a>
        <a href="python_formatted_output.html">Formatted Output</a>
        <a href="python_executing_cmds.html">Executing Commands</a>
        <a href="python_environment_variables.html">Environment Variables</a>
        <a href="python_sqlite.html">Sqlite</a>
        <a href="python_logging.html">Logging</a>
        <a href="python_json.html">JSON</a>
        <a href="python_guid.html">GUID</a>
        <a href="python_cgi.html">CGI</a>
        <a href="python_struct.html">struct</a>
        <a href="python_socket.html">sockets</a>
    </div>

    <button class="accordion" id="accordion_vim">Vim</button>
    <div class="panel">
        <a href="vim_cheatsheet.html">Cheat Sheet</a>
    </div>`

    document.getElementById('nav').innerHTML = nav_html;

    if (f)
    {
        console.log ("print_nav: f=" + f);

        toggle_active(document.getElementById(f));

        loc = "#" + f;

        location="#";
        location=loc;
    }
}

function findPos(e)
{
    r = e.getBoundingClientRect()
    
    return r.top;
}
