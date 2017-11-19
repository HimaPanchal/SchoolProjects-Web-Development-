/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready( function (){
    $('#RowCount').val(5);
    $('#ColCount').val(5);
    $("#hobbyRange").val(8);
    var rows = $('#RowCount').val();
    var cols = $('#ColCount').val();
    
    $('#part2btn').html('Post to Make ' + rows + 'x' + cols + ' Table');
    
    $("#part1btn").click(function() {
        var getData = {};
        getData["Name"] = $("#nameBox").val();
        getData["Hobby"] = $("#hobbyBox").val();
        getData["HowMuch"] = $("#hobbyRange").val();
        
        
        var target = $("#part1label");
        var jqObject = $.get("/~demo/cmpe2000/ica10_Hobby.php", getData);
        jqObject.done(function (data, status) {
            
            console.log(data + ' : ' + status);
            target.html(data);
        });
        
        jqObject.fail(function(data, status) {
            console.log("Get Failed : " + data + " : " + status);
            
        });
    }); 
    $("#RowCount").change(function(){
        rows = $('#RowCount').val();
        cols = $('#ColCount').val();
        $('#part2btn').html('Post to Make ' + rows + 'x' + cols + ' Table');
    });
    $("#ColCount").change(function(){
        rows = $('#RowCount').val();
        cols = $('#ColCount').val();
        $('#part2btn').html('Post to Make ' + rows + 'x' + cols + ' Table');
    });
    
    $("#part2btn").click(function() {
        var target = $('#part2ContentDiv');
        var url = '/~demo/cmpe2000/ica10_Table.php';
        var data = {};
        data["RowCount"] = $('#RowCount').val();
        data["ColumnCount"] = $('#ColCount').val();
        AjaxPost(url, data, target);
    });
//    var data = new Array();
//    $("#part3Abtn").click(function() {
//        var string = ' ';
//        data = new Array();
//        for (var i = 0; i < 20; ++i)
//            data.push(Math.floor(Math.random() * 20));
//        for (var i = 0; i < 20; ++i)
//            string += data[i] + ', ';
//        $('#numdiv').html(string);
//    });
    $("#part3Bbtn").click(function() {
        var target = $('#postDiv');
        var url = '/~demo/cmpe2000/ica10_Numbers.php';
        var getData = {};
        getData["Numbers"] = data;
        AjaxPost(url, getData, target);
    });
    
});

function AjaxPost(url, data, target) 
{
    var jqObject = $.post(url, data);
        
    jqObject.done(function (data, status) {
            
        console.log(data + ' : ' + status);
        target.html(data + '<br />' + status);
        $("#status").html(status);
    });
    jqObject.fail(function(data, status) {
        target.html('ERROR: ' + status);
        console.log('ERROR: ' + status);
    });
    jqObject.always(function(data, status) {
        target.append('<br /> Always done: ' + status);
    });
};