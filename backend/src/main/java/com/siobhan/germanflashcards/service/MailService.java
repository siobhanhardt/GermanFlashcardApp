package com.siobhan.germanflashcards.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class MailService {
    private static final Logger logger = LogManager.getLogger(MailService.class);

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("german1000words@gmail.com");
            message.setTo("german1000words@gmail.com"); // Adjust as necessary
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Email sent successfully");
        } catch (Exception e) {
            logger.error("Failed to send email", e);
        }
    }
}
