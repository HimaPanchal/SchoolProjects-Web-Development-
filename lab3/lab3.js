/*
 * Project:     Lab 03/ICA11 - AJAX with JSON
 * Course:      CMPE2000
 * Instructor:  Herb Vanselow
 * Author:      Hima Panchal
 * Date:        Dec 19,2015
 */



 
var timerID = 0;        //timer
var autoFlag = false;   // auto flag set to false
var tab3 = true;        //a flag to determine whether or not table 3 is showing
                        //used to guard against showing if timer checkbox is on

/*
 * Method:      Ready
 * Arguments:   null
 * Returns:     void
 * Description: when the document loads
 *              
 */
$(document).ready(function(){
   
    $("#tagNameBox").val('');
    $("#minBox").val('');
    $("#maxBox").val('');
    $("#tagByFilterBox").val('');
    $('#rTCheckBox').attr('checked', false);
    //add the table headers to their respective tables
    $('#table2').html(Table2Headers());
    $('#table3').html(Table3Headers());
    $('#table4').html(Table4Headers());
    
    //when the get all button is clicked, return all values and place 
    //them into the first table beneath the main table
    $('#getAllBtn').click( function(){
        //Hiding other tables
        $('#table3').html(Table3Headers());
        $('#table4').html(Table4Headers());
        
        
        tab3 = true;//turn off table3
       
        fAuto(); //calling  timer function to stop the timer
        
        //object to hold the post Data
        var postData = {};
        
        //assign value to pass to the server
        postData["tagId"] = "all";//get all of the tags
        
        //AJAX post request
        var jqObject = $.post("/~demo/cmpe2000/ica11_json.php", postData);
        
     
        jqObject.done(function(data, status){
            //parse the data into a JSON object and send it to the AllTAgs Method
            var jsonData = $.parseJSON(data);
            console.log(data);
            AllTAgs(jsonData, status);
        });
        
        
        //if the post call fails display the error in the console
        jqObject.fail(function(data, status){
            console.log("Failed : " + data + " : " + status);
        });
        
        //always show the response status
        jqObject.always(function(data, status){
            $('#target').html("Response: " + status);
        });
    });
    //when the add tag button is clicked, add a tag with the specified values to 
    //the server
    $('#addTagBtn').click( function()
    
    {
        var postData = {};        //object to hold the post Data
        postData["action"] = "add";
        postData["tagDesc"] = $('#tagNameBox').val();
        postData["tagMin"] = $('#minBox').val();
        postData["tagMax"] = $('#maxBox').val();
        
      
        var jqObject = $.post("/~demo/cmpe2000/ica11_json.php", postData);
                
      
        jqObject.done(function(data, status){
            //display the data in the console
            console.log(data);
        });
        //if the post call fails display the error in the console
        jqObject.fail(function(data, status){
            console.log("Failed : " + data + " : " + status);
        });
        //always show the respons status
        jqObject.always(function(data, status){
            $('#target').html("Response: " + status);
        });
    });
    //when the get live button is clicked, get the current values of the Random number and display them as a
    //a "bar", which is a div between of width between 0 and 100
    $('#getLiveBtn').click( function(){
        //if any of the other tables are showing, hide them
        $('#table2').html(Table2Headers());
        $('#table4').html(Table4Headers());
        
        //if the tab3 flag is set, turn if off and call the fAuto function to
        //set the timer if the real time box is checked
        if(tab3)
        {
            tab3 = false;
            fAuto();
        }
        
        
        
        //call the GetLive function to initiate the AJAX call
        GetLive();
    });
    //toggle the autoFlag when the checkbox is clicked
    $('#rTCheckBox').change(function (){
        autoFlag = $('#rTCheckBox').is(':checked') ? true : false;
        fAuto();
    });
    //when the filter button is clicked, populate the select box with the results of an AJAX call
    $('#filterBtn').click( function(){
        //object to hold the post Data
        var postData = {};
        postData["action"] = "filter";
        postData["tagDesc"] = $('#tagByFilterBox').val();
        
        //AJAX post request
        var jqObject = $.post("/~demo/cmpe2000/ica11_json.php", postData);
        
        //when the post is done
        jqObject.done(function(data, status){
            //get the json object
            var jsonData = $.parseJSON(data);
            //write data to console
            console.log(data);
            //poulate the select box
            PopulateSelect(jsonData);
        });
        
        //if the post call fails display the error in the console
        jqObject.fail(function(data, status){
            console.log("Failed : " + data + " : " + status);
        });
        
        //always show the respons status
        jqObject.always(function(data, status){
            $('#target').html("Response: " + status);
        });
    });
    //when the Get Historical button is click, get the last 100 values of the tag
    //selected in the select box
    $('#getHistoricalBtn').click( function(){
        //if any of the other tables are showing, hide them
        $('#table2').html(Table2Headers());
        $('#table3').html(Table3Headers());
        //turn off table3
        tab3 = true;
        
        fAuto();//calling timer function to stop the timer
        
        var postData = {};
        postData["action"] = "historical";
        postData["tagId"] = $('select option:selected').val();
        
       
        var jqObject = $.post("/~demo/cmpe2000/ica11_json.php", postData);
        
      
        jqObject.done(function(data, status){
         
            var jsonData = $.parseJSON(data);
           
            console.log(data);
            
            GetHistorical(jsonData);//call GetHistorical to populate the table
        });
        
      //If fails
        jqObject.fail(function(data, status){
            console.log("Failed : " + data + " : " + status);
        });
        
        //showing always response status
        jqObject.always(function(data, status){
            $('#target').html("Response: " + status);
        });
    });
});

/*Function: MakeTable2()
 * Arguments:   null
 * Returns:     void
 * Description: Start the game;
 *              
 */

function Table2Headers()
{
    //create string of headers
    var string = 
        '<tr>' +
        '<th class="tdGreen">ID</th>' +
        '<th class="tdWhite">TagDescription</th>' +
        '<th class="tdGreen">Min</th>' +
        '<th class="tdWhite">Max</th>' +
        '</tr>';
    
    //return the finished string to be placed into the page
    return string;
};



/*
 * Function: Table3Headers()
 * Arguments:   null
 * Returns:     void
 * Description: add the table 3 headers
 *              
 */
function Table3Headers()
{
    //create string of headers
    var string = 
        '<tr>' +
        '<th class="tdGreen">ID</th>' +
        '<th class="tdWhite">TagDescription</th>' +
        '<th class="tdGreen">Min</th>' +
        '<th class="tdWhite">Max</th>' +
        '<th class="bar">Bar</th>' +
        '</tr>';
    
    //return the finished string to be placed into the page
    return string;
};


/*
 * Function:     Table4Headers()
 * Arguments:   null
 * Returns:     void
 * Description: add the table 4 headers
 *              
 */
function Table4Headers()
{
    //create string of headers
    var string = 
        '<tr>' +
        '<th class="tdGreen">Minimum</th>' +
        '<th class="tdWhite">Maximum</th>' +
        '<th class="tdGreen">Value</th>' +
        '<th class="tdWhite">TimeStamp</th>' +
        '<th class="bar">Bar</th>' +
        '</tr>';
    
    //return the finished string to be placed into the page
    return string;
};


/*
 *function:     ShowAllTages(jsonData, status)
 * Arguments:   null
 * Returns:     void
 * Description:  parses an array of objects and puts them into a table
 *              
 */

function AllTAgs(jsonData)
{
    //array variable to hold passed array
    var objectArray = jsonData["data"];
    
    //array variable to hold the "keys" (properties) of each object in the array
    var keyArray = new Array();
    
  
    var indexVar;
    
    //add the table 2 headers to the new table string
    var tableString = Table2Headers();
    
    //get the "keys" (properties) of the objects by looking at the first object
    // in the array and getting the values
    for (indexVar in objectArray[0])
        keyArray.push(indexVar);
    
    //create the table rows and data cells
    for (var i = 0; i < objectArray.length; ++i)
    {
        tableString += '<tr>';
        //cycle through the properties of each object
        for (var indexVar = 0; indexVar < keyArray.length; ++indexVar)
        {
            //alternate colors between green and white
            //and add the value of the item in the object
            if(indexVar % 2 === 0)
                tableString += '<td style="background-color: green;">' + objectArray[i][keyArray[indexVar]] + '</td>';
            else
                tableString += '<td style="background-color: white;">' + objectArray[i][keyArray[indexVar]] + '</td>'
        }
        
        tableString += '</tr>';
    }
    //add the string to the table
    $('#table2').find("tbody").empty().append(tableString);
};


/*
 * Method:      AddBar(jsonData, status)
 * Arguments:   null
 * Returns:     void
 * Description: Gathers the data from the an Ajax Post (after it was parsed
 *              by the $.parseJSON function and creates an string
 *              to place into the page.
 *              
 */
function AddBar(jsonData)
{
        //array variable to hold passed array
    var objectArray = jsonData["data"];
    
    //array variable to hold the "keys" (properties) of each object in the array
    var keyArray = new Array();
    
   
    var indexVar;
    
    //add the table 3 headers to the new table string
    var tableString = Table3Headers();
    
    //get the "keys" (properties) of the objects by looking at the first object
    // in the array and getting the values
    for (indexVar in objectArray[0])
        keyArray.push(indexVar);
    
    //create the table rows and data cells
    for (var i = 0; i < objectArray.length; ++i)
    {
        tableString += '<tr>';
        //cycle through the properties of each object
        for (var indexVar = 0; indexVar < keyArray.length; ++indexVar)
        {
            //get the minimum value
            var min = objectArray[i][keyArray[2]];
            var max = objectArray[i][keyArray[3]] - min;            //make the max value the provided max minus the min for accurate display of the bar

            
            //when we reach the last item in the array (bar value)
            if (indexVar === 4)
            {
          
                var barValue = Math.abs(parseInt((objectArray[i][keyArray[indexVar]] - min) / max * 100));
                
                //add the bar 
                tableString += '<td><div style="background-color: lightblue; width: '+ barValue + 'px;">&nbsp</div></td>';
            }
            else if(indexVar % 2 === 0)
                //add the table value with a green background
                tableString += '<td style="background-color: lightblue;">' + objectArray[i][keyArray[indexVar]] + '</td>';
            else
                //add the table value with a white background
                tableString += '<td style="background-color: white;">' + objectArray[i][keyArray[indexVar]] + '</td>';
        }
        
        tableString += '</tr>';
    }
    //add the string to the table
    $('#table3').find("tbody").empty().append(tableString);
};



/*
 *function:     PopulateSelect(jsonData)
 * Arguments:   jsonData
 * Returns:     void
 * Description: create a string of html code that will generate a 
 *              list of options to be put into a select statement
 *  
 */
function PopulateSelect(jsonData)
{
    
    //array variable to hold passed array
    var objectArray = jsonData["data"];
    
    //array variable to hold the "keys" (properties) of each object in the array
    var keyArray = new Array();
    
    var indexVar;
    
    //string for the options
    var select = '';
    
    //get the "keys" (properties) of the objects by looking at the first object
    // in the array and getting the values
    for (indexVar in objectArray[0])
        keyArray.push(indexVar);
    //create the statement
    for (var i = 0; i < objectArray.length; ++i)
        //add the value of the item in the object
        select += '<option name="' + objectArray[i][keyArray[0]] + 
                '" value="' + objectArray[i][keyArray[1]] + '">'+
                objectArray[i][keyArray[0]] + '</option>';
        
    //add the string to the table
    $('#table1').find("select").empty().append(select);
};

/*
 *function:     GetHistorical(jsonData)
 * Arguments:   jsonData
 * Returns:     void
 * Description: Get Historical ] button will get the tagId of the currently selected element and
 *              invoke with the required parameters 
 *              
 */
function GetHistorical(jsonData)
{
        //array variable to hold passed array
    var objectArray = jsonData["data"];
    
    //array variable to hold the "keys" (properties) of each object in the array
    var keyArray = new Array();
    
    
    var indexVar;
    
    //add the table 3 headers to the new table string
    var tableString = Table4Headers();
    
   
    for (indexVar in objectArray[0]) //get the "keys" (properties) of the objects by looking at the first object
        keyArray.push(indexVar);
    
    //create the table rows and data cells
    for (var i = 0; i < objectArray.length; ++i)
    {
        tableString += '<tr>';
        //cycle through the properties of each object
        for (var indexVar = 0; indexVar < keyArray.length; ++indexVar)
        {
            //if we are at the third property in the object (the value) 
            if(indexVar === 2)
                //parsecycle the value as a float and fix it to 2 decimal places and color it green
                tableString += '<td style="background-color: green;">' + parseFloat(objectArray[i][keyArray[indexVar]]).toFixed(2) + '</td>';
            //color the cell green
            else if(indexVar % 2 === 0)
                tableString += '<td style="background-color: green;">' + objectArray[i][keyArray[indexVar]] + '</td>';
            //color the cell white
            else
                tableString += '<td style="background-color: white;">' + objectArray[i][keyArray[indexVar]] + '</td>';
        }
        //add the bar
        var barValue = Math.abs(parseInt(objectArray[i][keyArray[2]] / objectArray[i][keyArray[1]] * 100));
        tableString += '<td><div style="background-color: lightgrey; width: '+ barValue + 'px;">&nbsp</div></td>';
        tableString += '</tr>';
    }
    //add the string to the table
    $('#table4').find("tbody").empty().append(tableString);
};

/*
 * function:   fAuto()
 * Arguments:   null
 * Returns:     void
 * Description: Starts and stops the timer;
 *              
 */
function fAuto()
{
    //if the flag is true and table3 is being shown
    if (autoFlag && !tab3)
    {
        //sample GetLive every 500 ms
        timerID = setInterval(GetLive, 500);
        autoFlag = true;
    }
    else
    {
        //clear the timer and set the flag to false (turn off the timer)
        clearInterval(timerID);
        timerID = 0;
        autoFlag = false;
    }     
};

/*
 * function:    Getlive()
 * Arguments:   null
 * Returns:     void
 * Description: make an AJAX post call to the server grabbing the data of all tags whose descriptions match
 *              a value like the one in the filter box
 */
function GetLive()
{
   
    var postData = {};
    postData["action"] = "live";
    postData["tagDescription"] = $('#tagByFilterBox').val();
    
   
    var jqObject = $.post("/~demo/cmpe2000/ica11_json.php", postData);
    
    jqObject.done(function(data, status)
    {
      
        var jsonData = $.parseJSON(data);
        
        console.log(data);
        //add the table with the bar
        AddBar(jsonData);
    });
    //if the post call fails display the error in the console   
    jqObject.fail(function(data, status)
    {
        console.log("Failed : " + data + " : " + status);
    });
     
    jqObject.always(function(data, status){
        $('#target').html("Response: " + status);
              
        
    });
    
};



