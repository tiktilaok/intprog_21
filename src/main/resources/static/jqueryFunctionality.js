$(document).ready(function() {
    
    $('#addStudent').click(function(e){
        e.preventDefault();
        addStudent();
    });
    $('#btn_edit').click(function(e){
        e.preventDefault();
        var stud_id = $("#fld_stud_id").val();
        if(stud_id == ""){
            alert("Please select a student to edit!");
            return;
        }
        else{
           getStudentById(stud_id);
            
        }
         var modal = $("#myModal");
         var span = $(".close");

        span.click(function() {
            modal.hide();
        });
    });
    $("#editStudent").click(function(e){
        e.preventDefault();
        editStudent();
    });
    getAllStudents();

});
function getStudentById(stud_id){
    
    $.ajax({
        type: "GET",
        url: "/getStudentById?id="+stud_id,
        success: function(data){
            if(!data){
                alert("No student found with the given ID.");
                $("#fld_stud_id").val("");
                return;
            }
            $("#edit_id").val(data.stud_id);
            $("#edit_name").val(data.stud_name);
            $("#edit_age").val(data.age);
            $("#edit_course").val(data.course);
            $("#myModal").show();
            var span = $(".close");

            span.click(function() {
                $("#myModal").hide();
            });
        },
        error: function(xhr, status, error) {
            alert("Error fetching student data: " + error);
        }
    });

    
}
function editStudent(){
    if($('#edit_name').val() == "" || $('#edit_age').val() == "" || $('#edit_course').val() == ""){
        alert("Please fill all the fields!");
        return;
    }
    var student = {
        stud_id: $("#edit_id").val(),
        stud_name: $('#edit_name').val(),
        age: $('#edit_age').val(),
        course: $('#edit_course').val()
    };
    alert(JSON.stringify(student));
    $.ajax({
        type:"POST",
        url:"/editStudent",
        data: JSON.stringify(student),
        contentType: "application/json",
        success: function(response) {
            alert("Student updated successfully!");
            $("#myModal").hide();
            getAllStudents();
            $("#fld_stud_id").val("");
        },
    })
}
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
                    headerRow.append('<th style ="border: 1px solid black;border-collapse: collapse;">Actions</th>');
                    tableHeader.append(headerRow);
                    $.each(student, function(key,value){  
                        bodyRow.append(`<td style ="border: 1px solid black;border-collapse: collapse;">${value}</td>`);
                        
                    });
                   
                    bodyRow.append(`<td style ="border: 1px solid black;border-collapse: collapse;"><button id="btn_edit_${index}" >Edit Student</button>`);
                    table.append(bodyRow);
                }
                else{
       
                    $.each(student, function(key,value){  
                        bodyRow.append(`<td style ="border: 1px solid black;border-collapse: collapse;">${value}</td>`);
                        
                    });
                    bodyRow.append(`<td style ="border: 1px solid black;border-collapse: collapse;"><button id="btn_edit_${index}">Edit Student</button>`);
                    table.append(bodyRow);
                }
                $(`#btn_edit_${index}`).click(function(e){
                    e.preventDefault();
                    getStudentById(student.stud_id);
                })
                
            });
        }
    })
}