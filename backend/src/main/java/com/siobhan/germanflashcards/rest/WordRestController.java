package com.siobhan.germanflashcards.rest;

import com.siobhan.germanflashcards.entity.Word;
import com.siobhan.germanflashcards.service.WordService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
// Handles different GET requests for Words
@RestController
@RequestMapping("/")
public class WordRestController {

    private WordService wordService;

    public WordRestController(WordService theWordService) {
        wordService = theWordService;
    }

    @GetMapping("/words")
    // Return all words
    public List<Word> findAll() {
        return wordService.findAll();
    }

    @GetMapping("/words/{wordId}")
    // Returns single word based on ID
    public Word getWord(@PathVariable int wordId) {
        Word word = wordService.findById(wordId);

        if(word == null) {
            throw new RuntimeException("Word not found -" + wordId);
        }
        return word;
    }
    @GetMapping("/wordsgerman/{germanWord}")
    // Returns single word based on german word
    public Word getWordByGerman(@PathVariable String germanWord) {
        Word word = wordService.findByGermanWord(germanWord);

        if(word == null) {
            throw new RuntimeException("Word not found -" + germanWord);
        }
        return word;
    }
    @GetMapping("/types")
    // Returns all words of a specific type
    public List<Word> findByWordTypes(@RequestParam List<String> partOfSpeech) {
        return wordService.findByPartOfSpeechIn(partOfSpeech);
    }

    @GetMapping("/test")
    // Specific function for returning 3 other words for test component of frontend
    public List<Word> getTestWords(@RequestParam List<String> partOfSpeech, @RequestParam int id) {
        // Takes part of speech so other options are the same type, and ID so it doesn't send back the same word
        // Find all words in the same category
        List<Word> words =  wordService.findByPartOfSpeechIn(partOfSpeech);
        List<Word> testWords = new ArrayList<>();
        String english = wordService.findById(id).getEnglishTranslation();
        if(words.size() < 3) {
            // Special condition for articles as there are only 2
            testWords.add(wordService.findByGermanWord("gut"));
            testWords.add(wordService.findByGermanWord("nicht"));
            if(english.equals("the")) {
                testWords.add(wordService.findByGermanWord("ein"));
            } else {
                testWords.add(wordService.findById(1));
            }
            return testWords;
        }

        int length = words.size();
        int [] nums = {-1,-1,-1};

        for(int i = 0; i < 3; i++) {
            while(nums[i] == -1) { // Loop that keeps going until index is replaced with an id number
                int num = (int) (Math.random() * length); // Get random number
                Word word = words.get(num); // Find that word
                // check words hasn't already been added, word isn't the chosen word and that english translation isn't the same
                if (num != nums[0] && num != nums[1] && words.get(num).getId() != id && !word.getEnglishTranslation().equals(english)) {
                    nums[i] = num;
                    testWords.add(words.get(num));
                }
            }
        }

        return testWords;
    }
}
