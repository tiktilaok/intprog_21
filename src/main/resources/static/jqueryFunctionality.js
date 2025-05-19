$(document).ready(function() {
    $('#addStudent').click(function(e){
        e.preventDefault();
        addStudent();
    })
    getAllStudents();

});
function addStudent(){
    if($('#name').val() == "" || $('#age').val() == "" || $('#course').val() == ""){
        alert("Please fill all the fields!");
        return;
    }

    var student = {
        stud_name: $('#name').val(),
        age: $('#age').val(),
        course: $('#course').val()
    };
    
    
        $.ajax({
        type: "POST",
        url:"/addStudent",
        data: JSON.stringify(student),
        contentType: "application/json",
        success: function(response) {
            alert("Student added successfully!");
            getAllStudents();
        },
        error: function(xhr, status, error) {
            alert("Error adding student: " + error);
        }
    });
}
function getAllStudents(){
    $.ajax({
        type: "GET",
        url:"/getStudents",
        success: function(response) {
            $('#studentTable thead').empty();
            var table = $('#studentTable tbody');
            table.empty(); 
            $.each(response, function(index, student) {
                var bodyRow = $('<tr>');
                if(index == 0){
                    var tableHeader =  $('#studentTable thead');
                    var headerRow = $('<tr>');
       
                    $.each(student, function(key,value){  
                        headerRow.append(`<th style ="border: 1px solid black;border-collapse: collapse;">${key}</th>`);
                        
                    });
                    tableHeader.append(headerRow);
                    $.each(student, function(key,value){  
                        bodyRow.append(`<td style ="border: 1px solid black;border-collapse: collapse;">${value}</td>`);
                        
                    });
                    table.append(bodyRow);
                }
                else{
       
                    $.each(student, function(key,value){  
                        bodyRow.append(`<td style ="border: 1px solid black;border-collapse: collapse;">${value}</td>`);
                        
                    });
                    table.append(bodyRow);
                }
            });
        }
    })
}