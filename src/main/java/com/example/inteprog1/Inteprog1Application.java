package com.example.inteprog1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@SpringBootApplication
@RestController
public class Inteprog1Application {

	public static void main(String[] args) {
		SpringApplication.run(Inteprog1Application.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value="name") String name) {
		return String.format("Hello World");
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
	

}
