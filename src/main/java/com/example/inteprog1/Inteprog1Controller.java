package com.example.inteprog1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;


import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class Inteprog1Controller {
	@Autowired
	private StudentRepository studentRepository;
    @GetMapping("/hello")
	public String hello(@RequestParam(value="name") String name) {
		return String.format("Hello World");
	}

    @GetMapping("/home")
    public String home() {
        return "inteprog_21.html";
    }

	public static final String ACCOUNT_SID = "ACb89bdb8d4357db922d99f66fa493d400";
	public static final String AUTH_TOKEN = "74af3f8e1f20bbf1e3d9472c904937f6";

	@GetMapping("/sendSms")
	public ResponseEntity<String> sendSms(){
		Twilio.init(ACCOUNT_SID,AUTH_TOKEN);

		Message.creator(new PhoneNumber("+639503441684"),new PhoneNumber("+12625876607"),
		"Hi Jhondrei, Ako si Kuya Will ng Wil to Win at nanalo ka ng 1 Million pesos!").create();
		return new ResponseEntity<>("SMS Sent", HttpStatus.OK);
	}


	@GetMapping("/getStudents")
	public @ResponseBody Iterable<Student> getStudents() {
		return studentRepository.findAll();
	}
	@GetMapping("/getStudentById")
	public @ResponseBody Student getStudentById(@RequestParam(value="id") Long id) {
		return studentRepository.findById(id).orElse(null);
	}

	@PostMapping("/addStudent")
	public @ResponseBody String addStudent(@RequestBody Student student) {
		//TODO: process POST request
		Student stud = new Student();
		stud.setStud_name(student.getStud_name());
		stud.setAge(student.getAge());
		stud.setCourse(student.getCourse());	
		studentRepository.save(stud);
		return "Student added successfully!";
	}

	@PostMapping("/editStudent")
	public @ResponseBody String editStudent(@RequestBody Student student) {
		//TODO: process POST request
		Student stud = studentRepository.findById(student.getStud_id()).orElse(null);
		if (stud != null) {
			stud.setStud_name(student.getStud_name());
			stud.setAge(student.getAge());
			stud.setCourse(student.getCourse());	
			studentRepository.save(stud);
			return "Student updated successfully!";
		} else {
			return "Student not found!";
		}
	}
	
	
	

}
