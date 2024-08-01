package com.siobhan.germanflashcards.rest;

import com.siobhan.germanflashcards.entity.Mail;
import com.siobhan.germanflashcards.service.MailService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class MailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody Mail request) {
        mailService.sendSimpleMessage("Issue with " + request.getWord(), "Issue: " + request.getIssue() + " " +request.getMessage());
        return "Email sent successfully!";
    }
}