//==========
// nav.js
//
// on_load()        - onload handler
// toggle_menu()    - onclick handler for menu. toggles between X and navicon
// toggle_active()  - onclick handler for sub-menus
//
// cookie data
// ===========
// menu_open=true
//
//==========

var dbg = false;


//==========
//
// set_viewport
//
// Responsive web pages look good on all devices, regardless of size. 
//
// When constructing responsive web pages, it's important to add the 
// following <meta> element 
//
//==========
function set_viewport ()
{
    console.log("set_viewport: ENTER");

    var metaElement = document.createElement('meta');
    metaElement.name = "viewport";
    metaElement.content = "width=device-width, initial-scale=1.0";

    document.getElementsByTagName('head')[0].appendChild(metaElement);
}


//==========
// onload handler
//
// - onload handler is triggered whtn the content of the document has finished loading
// - typically a great place to attach code
//==========
function on_load (f)
{
    console.log("on_load: ENTER");

    var cookies = get_cookies();

    //
    // set viewport
    // - for a more responsive web page
    //

    set_viewport();


    //
    // print nav panel html
    // - populates nav id
    //

    print_nav(f, cookies);


    //
    // print title html
    // - populates tltle id
    //

    print_title();


    //
    // set-up onclick handlers for the accordions
    //

    setup_accordions();


    //
    // handle keeping menu open/closed as user changes pages
    //

    handle_persistent_menu_open_close(cookies);


    if (f)
    {
        //
        // scroll to the element id specified
        //

        document.getElementById(f).scrollIntoView(true);
    }

    console.log("on_load: LEAVE");
}


//==========
// print_nav
//
// print html for nav panel
//
// populates nav id
//==========
function print_nav(f, cookies)
{
    if (dbg)
    {
        alert ("print_nav");
    }

    console.log ("print_nav: ENTER");

    _print_nav();

    //
    // traverse cookies
    // - anything matching accordian_* which is true - toggle active
    // - change code below to keep f active - maybe unique it
    //
   
    let s = new Set();

    if (f)
    {
        s.add(f);
    }

    const re = /^accordion_/;

    for (const c in cookies)
    {
        console.log("print_nav: cookies[" + c + "]=" + cookies[c]);

        if (re.test(c) && cookies[c] === "true")
        {
            console.log("print_nav: added to set");

            s.add(c);
        }
    }

    for (let i of s)
    {
        let elem = document.getElementById(i);

        toggle_active(elem);
    }

    if (f)
    {
        console.log ("print_nav: f=" + f);

        //
        // make this active
        //

        // var active_element = document.getElementById(f);

        // toggle_active(active_element);

        window.location = '#' + f;
    }

    console.log ("print_nav: LEAVE");
}


function _print_nav ()
{
    console.log ("_print_nav: ENTER");

    var nav_html = `
    <button class="accordion" id="accordion_ajax">AJAX</button>
    <div class="panel">
        <a href="ajax_intro.html">Introduction</a>
    </div>

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
    
    <button class="accordion" id="accordion_binarytree">Binary Trees</button>
    <div class="panel">
        <a href="binarytree_bt.html">Binary Tree</a>
        <a href="binarytree_breadth_first.html">Breadth First</a>
        <a href="binarytree_depth_first.html">Depth First</a>
        <a href="binarytree_bst.html">Binary Search Tree</a>
    </div>

    <button class="accordion" id="accordion_c">C</button>
    <div class="panel">
        <a href="c_bit_operations.html">Bit Operations</a>
        <a href="c_errno.html">errno</a>
        <a href="c_function_pointers.html">Function Pointers</a>
        <a href="c_function_reference.html">Function Reference</a>
        <a href="c_posix_datatypes.html">POSIX Datatypes</a>
        <a href="c_predefined_ids.html">Predefined IDS</a>
        <a href="c_tokenize.html">String Tokenize</a>
        <a href="c_variable_argument_list.html">Variable Argument List</a>
    </div>
    
    <button class="accordion" id="accordion_cpp">C++</button>
    <div class="panel">
        <a href="cpp_oop.html">OOP</a>
        <a href="cpp_hello_world.html">Hello, World!</a>
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
        <a href="cpp_dynamic_memory_allocation.html">Dynamic Memory Allocation</a>
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
        <a href="cpp_map.html">Map, Multimap</a>
        <a href="cpp_set.html">Set, Multiset</a>
        <a href="cpp_unordered_map.html">Unordered Map, Multimap</a>
        <a href="cpp_unordered_set.html">Unordered Set, Multiset</a>
        <a href="cpp_deque.html">Deque</a>
        <a href="cpp_string.html">String</a>
        <a href="cpp_string_stream.html">String Streams</a>
        <a href="cpp_file_stream.html">File Streams</a>
        <a href="cpp_transform.html">Transform</a>
        <a href="cpp_iostreams.html">iostreams</a>
        <a href="cpp_auto_keyword.html">auto keyword</a>
        <a href="cpp_include_guards.html">Include Guards</a>
        <a href="cpp_lambda.html">Lambdas</a>
        <a href="cpp_std_bind_std_function.html">std::bind and std::function</a>
        <a href="cpp_sort.html">std::sort</a>
        <a href="cpp_curly_bracket_initialization.html">Curly Bracket Initialization</a>
        <a href="cpp_stream_buffers_and_streams.html">Stream Buffers and Streams</a>
        <a href="cpp_inserter_back_inserter.html">std::inserter and std::back_inserter</a>
        <a href="cpp_set_difference.html">std::set_difference</a>
        <a href="cpp_versions.html">C++ Versions</a>
        <a href="cpp_move_semantics.html">Move Semantics</a>
    </div>

    <button class="accordion" id="accordion_cmake">CMake</button>
    <div class="panel">
        <a href="cmake.html">Cheat Sheet</a>
        <a href="cmake_ctest.html">CTest</a>
    </div>

    <button class="accordion" id="accordion_crypto">Cryptography</button>
    <div class="panel">
        <a href="crypto_hash_functions.html">Cryptographic Hash Functions</a>
        <a href="crypto_public_key_cryptography.html">Public-Key Cryptography</a>
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
        <a href="css_display_property.html">Display Properties</a>
        <a href="css_position_properties.html">Position Properties</a>
        <a href="css_table_properties.html">Table Properties</a>
        <a href="css_cursor_properties.html">Cursor Properties</a>
        <a href="css_misc_properties.html">Misc Properties</a>
    </div>

    <button class="accordion" id="accordion_cunix">C/UNIX</button>
    <div class="panel">
        <a href="cunix_files.html">Files</a>
        <a href="cunix_signals.html">Signals</a>
        <a href="cunix_time.html">Time</a>
        <a href="cunix_nanosleep.html">nanosleep()</a>
        <a href="cunix_clock_gettime.html">clock_gettime()</a>
        <a href="cunix_getopt.html">getopt()</a>
    </div>
    
    <button class="accordion" id="accordion_db">Databases</button>
    <div class="panel">
        <a href="db_join.html">Join Types</a>
        <a href="db_transactions.html">Transactions</a>
    </div>

    <button class="accordion" id="accordion_dns">DNS</button>
    <div class="panel">
        <a href="dns.html">Cheat Sheet</a>
    </div>

    <button class="accordion" id="accordion_endianness">Endianness</button>
    <div class="panel">
        <a href="endianness_endianness.html">Endianness</a>
    </div>

    <button class="accordion" id="accordion_git">Git</button>
    <div class="panel">
        <a href="git.html">Cheat Sheet</a>
        <a href="git_hooks.html">Git Hooks</a>
        <a href="git_github_markdown.html">Github Markdown</a>
    </div>

    <button class="accordion" id="accordion_gtest">Google Test / Mock</button>
    <div class="panel">
        <a href="gtest.html">Google Test</a>
        <a href="gmock.html">Google Mock</a>
    </div>

    <button class="accordion" id="accordion_groovy">Groovy</button>
    <div class="panel">
        <a href="groovy.html">Intro</a>
    </div>

    <button class="accordion" id="accordion_html">HTML</button>
    <div class="panel">
        <a href="html_intro.html">Introduction</a>
        <a href="html_tables.html">Tables</a>
        <a href="html_colors.html">Colors</a>
        <a href="html_color_test.html">Color Tester</a>
        <a href="html_forms.html">Forms</a>
        <a href="html_button.html">Button Element</a>
        <a href="html_dom_events.html">DOM Events</a>
        <a href="html_hello_world.html">Hello, World!</a>
        <a href="html_unicode.html">Unicode</a>
        <a href="html_canvas.html">Canvas</a>
        <a href="html_svg.html">SVG</a>
    </div>

    <button class="accordion" id="accordion_http">HTTP</button>
    <div class="panel">
        <a href="http_intro.html">Introduction</a>
        <a href="http_headers.html">Headers</a>
        <a href="http_get_request_response.html">GET Request/Response</a>
        <a href="http_post_request_response.html">POST Request/Response</a>
        <a href="http_basic_authentication.html">Basic Authentication</a>
        <a href="http_apache_http.html">Apache HTTP</a>
        <a href="http_apache_virtual_hosts.html">Apache - Virtual Hosts</a>
        <a href="http_apache_ssl.html">Apache - SSL</a>
        <a href="http_cookies.html">Cookies</a>
        <a href="http_redirection.html">Re-direction</a>
        <a href="http_web_services.html">Web Services</a>
    </div>

    <button class="accordion" id="accordion_js">JavaScript</button>
    <div class="panel">
        <a href="js_intro.html">Introduction</a>
        <a href="js_variables_and_data_types.html">Variables and Data Types</a>
        <a href="js_string.html">Strings</a>
        <a href="js_regular_expressions.html">Regular Expressions</a>
        <a href="js_number.html">Numbers</a>
        <a href="js_boolean.html">Booleans</a>
        <a href="js_operators.html">Operators</a>
        <a href="js_control_structs.html">Control Structures</a>
        <a href="js_objects.html">Objects</a>
        <a href="js_array.html">Arrays</a>
        <a href="js_functions.html">Functions</a>
        <a href="js_exceptions.html">Exceptions</a>
        <a href="js_date.html">Date class</a>
        <a href="js_set.html">Set</a>
        <a href="js_json.html">JSON</a>
        <a href="js_date_examples.html">Date class Examples</a>
        <a href="js_es6.html">ES6</a>
        <a href="js_hoisting.html">Hoisting</a>
    </div>

    <button class="accordion" id="accordion_jsclient">JavaScript Client-Side</button>
    <div class="panel">
        <a href="jsclient_intro.html">Intro</a>
        <a href="jsclient_window_object.html">Window Object</a>
        <a href="jsclient_document_object.html">Document Object</a>
        <a href="jsclient_element_object.html">Element Object</a>
        <a href="jsclient_node_object.html">Node Object</a>
        <a href="jsclient_events.html">Events</a>
        <a href="jsclient_timers.html">Timers</a>
        <a href="jsclient_dom.html">DOM</a>
        <a href="jsclient_cookies.html">Cookies</a>
        <a href="jsclient_css.html">CSS</a>
        <a href="jsclient_clock.html">Clock</a>
        <a href="jsclient_debugging.html">Debugging</a>
        <a href="jsclient_jquery.html">jquery</a>
        <a href="jsclient_canvas.html">Canvas</a>
        <a href="jsclient_calc.html">Basic Calculator</a>
        <a href="jsclient_loan_calc.html">Loan Calculator</a>
        <a href="jsclient_scratch_pad.html">Scratch Pad</a>
        <a href="jsclient_canvas_scratch.html">Canvas Scratch Pad</a>
    </div>

    <button class="accordion" id="accordion_jenkins">Jenkins</button>
    <div class="panel">
        <a href="jenkins.html">Intro</a>
        <a href="jenkins_shared_libraries.html">Shared Libraries</a>
    </div>

    <button class="accordion" id="accordion_json">JSON</button>
    <div class="panel">
        <a href="json_intro.html">Intro</a>
    </div>

    <button class="accordion" id="accordion_kafka">Kafka</button>
    <div class="panel">
        <a href="kafka_intro.html">Intro</a>
    </div>

    <button class="accordion" id="accordion_linux">Linux</button>
    <div class="panel">
        <a href="linux_bind.html">BIND</a>
        <a href="linux_cron.html">cron</a>
        <a href="linux_curl.html">curl</a>
        <a href="linux_debian.html">Debian</a>
        <a href="linux_dhcp.html">DHCP</a>
        <a href="linux_inotifywait.html">inotifywait</a>
        <a href="linux_iptables.html">IPTables</a>
        <a href="linux_ln.html">ln - link files</a>
        <a href="linux_modules.html">Modules</a>
        <a href="linux_speedtest.html">Network Speed Test</a>
        <a href="linux_networking.html">Networking</a>
        <a href="linux_olson.html">Olson Database</a>
        <a href="linux_raspberrypi.html">Raspberry Pi</a>
        <a href="linux_rcs.html">RCS</a>
        <a href="linux_rsync.html">rsync</a>
        <a href="linux_sendmail.html">sendmail</a>
        <a href="linux_setup_new_server.html">Set Up New Server</a>
        <a href="linux_shutdown.html">shutdown</a>
        <a href="linux_ssh.html">ssh</a>
        <a href="linux_su.html">su</a>
        <a href="linux_sudo.html">sudo</a>
        <a href="linux_systemd.html">systemd</a>
        <a href="linux_tape_info.html">Tapes</a>
        <a href="linux_tcpdump.html">tcpdump</a>
        <a href="linux_users.html">Users</a>
        <a href="linux_wireless.html">wireless</a>
    </div>

    <button class="accordion" id="accordion_mac">Mac</button>
    <div class="panel">
        <a href="mac.html">Cheat Sheet</a>
        <a href="mac_hosts_file.html">Hosts File</a>
        <a href="mac_root_user.html">Root User</a>
        <a href="mac_setup_new_workstation.html">Set Up New Work Station</a>
    </div>

    <button class="accordion" id="accordion_make">Make</button>
    <div class="panel">
        <a href="make.html">Cheat Sheet</a>
    </div>

    <button class="accordion" id="accordion_mdns">mDNS</button>
    <div class="panel">
        <a href="mdns.html">Cheat Sheet</a>
    </div>

    <button class="accordion" id="accordion_mariadb">MySQL / MariaDB</button>
    <div class="panel">
        <a href="mariadb_intro.html">Introduction</a>
        <a href="mariadb_admin.html">Administration and Utilities</a>
        <a href="mariadb_sql.html">SQL</a>
        <a href="mariadb_data_types.html">Data Types</a>
        <a href="mariadb_partitions.html">Partitions</a>
    </div>

    <button class="accordion" id="accordion_networking">Networking</button>
    <div class="panel">
        <a href="networking_mac_address.html">MAC Addresses</a>
    </div>

    <button class="accordion" id="accordion_nodejs">Node.js</button>
    <div class="panel">
        <a href="nodejs_intro.html">Introduction</a>
        <a href="nodejs_require.html">require</a>
        <a href="nodejs_simple_web_server.html">Simple Web Server</a>
    </div>

    <button class="accordion" id="accordion_nosql">NoSQL</button>
    <div class="panel">
        <a href="nosql_intro.html">Introduction</a>
        <a href="nosql_cassandra.html">Cassandra</a>
    </div>

    <button class="accordion" id="accordion_openssl">OpenSSL</button>
    <div class="panel">
        <a href="openssl_intro.html">Introduction</a>
    </div>

    <button class="accordion" id="accordion_postgres">PostgreSQL</button>
    <div class="panel">
        <a href="postgres_intro.html">Introduction</a>
        <a href="postgres_admin.html">Administration</a>
        <a href="postgres_sql.html">SQL</a>
        <a href="postgres_data_types.html">Data Types</a>
        <a href="postgres_psql.html">Psql / Other Utilities</a>
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
    
    <button class="accordion" id="accordion_python">Python</button>
    <div class="panel">
        <a href="python_intro.html">Introduction</a>
        <a href="python_hello_world.html">Hello, World!</a>
        <a href="python_variables.html">Variables</a>
        <a href="python_string.html">String</a>
        <a href="python_operators.html">Operators</a>
        <a href="python_control_structs.html">Control Structures</a>
        <a href="python_list.html">List</a>
        <a href="python_tuple.html">Tuple</a>
        <a href="python_dictionary.html">Dictionary</a>
        <a href="python_set.html">Set</a>
        <a href="python_functions.html">Functions</a>
        <a href="python_cmd_line_args.html">Command Line Arguments</a>
        <a href="python_external_files.html">External Files</a>
        <a href="python_modules.html">Modules</a>
        <a href="python_classes.html">Classes</a>
        <a href="python_dates_times.html">Dates and Times</a>
        <a href="python_exceptions.html">Exceptions</a>
        <a href="python_regex.html">Regular Expressions</a>
        <a href="python_formatted_output.html">Formatted Output</a>
        <a href="python_subprocess.html">subprocess module</a>
        <a href="python_os.html">os module</a>
        <a href="python_environment_variables.html">Environment Variables</a>
        <a href="python_sqlite.html">Sqlite</a>
        <a href="python_mysql.html">MySQL</a>
        <a href="python_logging.html">Logging</a>
        <a href="python_json.html">JSON</a>
        <a href="python_guid.html">GUID</a>
        <a href="python_cgi.html">CGI</a>
        <a href="python_struct.html">struct</a>
        <a href="python_socket.html">sockets</a>
        <a href="python_hashlib.html">hashlib</a>
        <a href="python_base64.html">Base64</a>
        <a href="python_requests.html">requests - HTTP module</a>
        <a href="python_cookie.html">Cookie - HTTP Cookie module</a>
        <a href="python_permutations_combinations.html">Permutations and Combinations</a>
        <a href="python_threading.html">threading module</a>
        <a href="python_multiprocessing.html">multiprocessing module</a>
        <a href="python_queue.html">queue module</a>
        <a href="python_context_managers.html">Context Managers</a>
        <a href="python_random.html">random module</a>
        <a href="python_time.html">time module</a>
        <a href="python_yaml.html">YAML</a>
        <a href="python_pip.html">pip</a>
        <a href="python_pytest.html">pytest</a>
        <a href="python_unittest_mock.html">unittest.mock</a>
        <a href="python_xml.html">XML</a>
        <a href="python_iterators.html">Iterators</a>
        <a href="python_decimal.html">Decimal Floating Point</a>
    </div>

    <button class="accordion" id="accordion_set">Set Theory</button>
    <div class="panel">
        <a href="set_cheatsheet.html">Cheat Sheet</a>
        <a href="set_permutations_and_combinations.html">Permutations and Combinations</a>
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
    
    <button class="accordion" id="accordion_sorting">Sorting</button>
    <div class="panel">
        <a href="sorting_bubble_sort.html">Bubble Sort</a>
        <a href="sorting_merge_sort.html">Merge Sort</a>
        <a href="sorting_quick_sort.html">Quick Sort</a>
    </div>

    <button class="accordion" id="accordion_sqlite">SQLite</button>
    <div class="panel">
        <a href="sqlite_intro.html">Introduction</a>
        <a href="sqlite_sql.html">SQL</a>
        <a href="sqlite_datatypes.html">Datatypes</a>
        <a href="sqlite_utils.html">Utilities</a>
    </div>

    <button class="accordion" id="accordion_swift">Swift</button>
    <div class="panel">
        <a href="swift_intro.html">Introduction</a>
        <a href="swift_variables.html">Variables</a>
        <a href="swift_collection_types.html">Collections: Arrays, Sets, Dictionaries</a>
        <a href="swift_operators.html">Operators</a>
        <a href="swift_control_structs.html">Control Structures</a>
        <a href="swift_functions.html">Functions</a>
        <a href="swift_objects.html">Objects</a>
        <a href="swift_optional.html">Optionals</a>
        <a href="swift_enum.html">Enumerations</a>
    </div>

    <button class="accordion" id="accordion_systemdesign">System Design</button>
    <div class="panel">
        <a href="systemdesign.html">Cheat Sheet</a>
    </div>

    <button class="accordion" id="accordion_utf8">UTF-8</button>
    <div class="panel">
        <a href="utf8.html">Cheat Sheet</a>
    </div>

    <button class="accordion" id="accordion_vim">Vim</button>
    <div class="panel">
        <a href="vim_cheatsheet.html">Cheat Sheet</a>
        <a href="vim_templates.html">Templates</a>
    </div>

    <button class="accordion" id="accordion_xcode">Xcode</button>
    <div class="panel">
        <a href="xcode_intro.html">Introduction</a>
        <a href="xcode_simulator.html">Simulator</a>
        <a href="xcode_ui_basics.html">UI Basics</a>
        <a href="xcode_outlet.html">Outlets (Widget &#11108; Variable)</a>
        <a href="xcode_action.html">Actions (Event &#11157; Method)</a>
        <a href="xcode_delegate.html">Delegates</a>
        <a href="xcode_label.html">Labels (Outlets)</a>
        <a href="xcode_button.html">Buttons (Actions)</a>
        <a href="xcode_text_field.html">Text Fields (Delegates)</a>
        <a href="xcode_add_view_controller.html">Add View Controller</a>
        <a href="xcode_url_session.html">URL Session</a>
        <a href="xcode_image.html">Images</a>
        <a href="xcode_view_controllers.html">View Controllers</a>
        <!--<aXXX href="xcode_add_storyboard_scene.html">Add Storyboard Scene</a> --> 
        <a href="xcode_table_view.html">Table View</a>
        <a href="xcode_data_model.html">Data Model</a>
        <a href="xcode_custom_control.html">Custom Control</a>
        <a href="xcode_uistackview.html">UIStackView</a>
        <a href="xcode_uiview.html">UIView</a>
        <a href="xcode_outlets_actions_delegates.html">Outlets, Actions and Delegates</a>
    </div>

    <button class="accordion" id="accordion_xml">XML</button>
    <div class="panel">
        <a href="xml_intro.html">Introduction</a>
        <a href="xml_xslt.html">XSLT - Transformations</a>
        <a href="xml_xsd.html">XSD - XML Schema</a>
    </div>
    <button class="accordion" id="accordion_yaml">YAML</button>
    <div class="panel">
        <a href="yaml_cheatsheet.html">Cheat Sheet</a>
    </div>`

    document.getElementById('nav').innerHTML = nav_html;
   

    console.log ("_print_nav: LEAVE");
}

//
// print_title
//
// print html for title
//
// populates title id
//
function print_title ()
{
    console.log("print_title: ENTER");


//    var title_html = `
//    <span class="menutron" onclick="openNav()">&#9776;</span><a class="title" href="index.html">Computing Notes</a>` 

    var title_html = `<div class="title"><span id="menu_icon" class="menu_icon"></span><a href="index.html" style="color: white; text-decoration: none;">Computing Notes</a></div>
    <div class="searchbox"><form action='search.py' method='POST'><input type="text" name="searchbox"> <input type="submit" value="search"> </form></div>`
    // onkeydown= "if (event.keyCode == 13) alert('Hello, World!')">

    document.getElementById('title').innerHTML = title_html;

    //
    // onclick handler
    //

    document.getElementById('menu_icon').onclick = toggle_menu;
   

    console.log("print_title: LEAVE");
}


//
// setup_accordions
//
// set-up onclick handlers for the accordions
//
function setup_accordions ()
{
    if (dbg)
    {
        alert ("setup_accordions");
    }


    console.log ("setup_accordions: ENTER");

    var acc = document.getElementsByClassName("accordion");

    for (let i=0; i<acc.length; i++)
    {
        acc[i].onclick = function() {
            toggle_active(this);
        }
    }
    
    console.log ("setup_accordions: LEAVE");
}


//
// onclick handler for menu 
// - toggles between X and navicon
//
function toggle_menu ()
{
    console.log ("toggle_menu: ENTER");

    
    menu_icon   = document.getElementById('menu_icon')
    nav         = document.getElementById('nav')
    content     = document.getElementById('content')


    //
    // alternate between X and menu icon
    //

    menu_icon.classList.toggle("active");


    if (nav.style.display === "block")
    {
        //
        // nav is currently displayed
        // - hide it and slide over the contents
        //

        console.log ("toggle_menu: hide nav");

        nav.style.display           = "none";
        content.style.marginLeft    = "5px";

        document.cookie = "menu_open=false;";
        
        console.log ("toggle_menu: cookie - menu_open=false")

    }
    else
    {
        //
        // nav is currently hidden
        // - display it and slide over the contents
        //

        console.log ("toggle_menu: display nav");

        nav.style.display           = "block";
        content.style.marginLeft    = "250px";
        
        document.cookie = "menu_open=true;";
        
        console.log ("toggle_menu: cookie - menu_open=true")
    }
}


//
// open_menu
//
function open_menu ()
{
    console.log ("open_menu: ENTER");

    var menu_icon   = document.getElementById('menu_icon')
    var nav         = document.getElementById('nav')
    var content     = document.getElementById('content')


    if (! (menu_icon.classList.contains("active")))
    {
        console.log ("open_menu: menu_icon NOT ACTIVE. setting ACTIVE");

        menu_icon.classList.toggle("active");
    }    


    nav.style.display           = "block";
    content.style.marginLeft    = "250px";
   

    console.log ("open_menu: LEAVE");
}


//
// close_menu
//
function close_menu ()
{
    console.log ("close_menu: ENTER");

    
    menu_icon   = document.getElementById('menu_icon')
    nav         = document.getElementById('nav')
    content     = document.getElementById('content')


    if (menu_icon.contains("active"))
    {
        menu_icon.classList.toggle("active");
    }    


    nav.style.display           = "none";
    content.style.marginLeft    = "5px";
}


//
// get_cookies
//
// returns object (hash) of cookies
//
function get_cookies ()
{
    console.log ("get_cookies: ENTER");

    var ret = { }

    var all = document.cookie;  // all cookies. n1=v1; n2=v2; n3=v3; ...

    if (all === "")
    {
        console.log ("get_cookies: NO COOKIES");

        return ret;
    }

    var list = all.split("; ");

    console.log ("get_cookies: #cookies=" + list.length);

    for (var i=0; i < list.length; i++)
    {
        var cookie = list[i];

        var p = cookie.indexOf("=");

        var n = cookie.substring(0,p);
        var v = cookie.substring(p+1);

        console.log ("get_cookies: " + n + "=" + v);

        ret[n] = v;
    }

    return ret;
}


//
//
//
function handle_persistent_menu_open_close(cookies)
{
    console.log ("handle_persistent_menu_open_close: ENTER");


    // default to false

    var menu_open = false;

    
    //
    // get object (hash) of alll cookies
    //

    // var cookies = get_cookies();


    if (cookies.hasOwnProperty('menu_open'))
    {
        var val = cookies['menu_open'];

        console.log ("handle_persistent_menu_open_close: user has 'menu_open' cookie. value=|" + val + "|");

        if (val == "true")
        {
            menu_open = true;
        }
    }

    if (menu_open == true)
    {
        open_menu();
    }
    
    console.log ("handle_persistent_menu_open_close: LEAVE");

}


//
// onclick handler for sub-menus
//
function toggle_active (o)      // object
{
    console.log ("toggle_active: ENTER");


    //
    // toggle adds the class name if not already present
    // otherwise it removes it
    //

    o.classList.toggle("active");


    id = o.id;

    var panel = o.nextElementSibling;

    if (panel.style.display === "block")
    {
        console.log ("toggle_active: block to none");

        panel.style.display = "none";

        document.cookie = id + "=false";
    }
    else
    {
        console.log ("toggle_active: none to block");

        panel.style.display = "block";
        
        document.cookie = id + "=true";
    }
    
    console.log ("toggle_active: LEAVE");
}




function findPos(e)
{
    r = e.getBoundingClientRect()
    
    return r.top;
}
