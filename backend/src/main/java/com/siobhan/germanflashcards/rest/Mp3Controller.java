package com.siobhan.germanflashcards.rest;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

// Handle GET requests for MP3 files using the specified fileName
@RestController
@RequestMapping("/mp3")
public class Mp3Controller {
    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> getMp3(@PathVariable String fileName) {
        try {
            // Load the resource, ClassPathResource generally reads from the src/main/resources folder
            Resource resource = new ClassPathResource("mp3"+ File.separator + fileName);
            // Check if the resource exists and is readable
            if (!resource.exists() || !resource.isReadable()) {
                // Return 404 Not Found if the resource doesn't exist or isn't readable
                return ResponseEntity.notFound().build();
            }

            // Variable to hold the audio bytes
            byte[] audioBytes;
            // Read the resource into a byte array
            try (InputStream inputStream = resource.getInputStream()) {
                audioBytes = StreamUtils.copyToByteArray(inputStream);
            }
            // Set HTTP headers for the response
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("audio/mpeg")); // parses audio/mpeg into MediaType object represeting MIME type
            headers.setContentLength(audioBytes.length);
            headers.setContentDispositionFormData("attachment", fileName);

            // Return the response entity with the audio bytes and headers
            return ResponseEntity.ok().headers(headers).body(audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
