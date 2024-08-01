package com.siobhan.germanflashcards.rest;

import com.siobhan.germanflashcards.entity.Verb;
import com.siobhan.germanflashcards.entity.VerbConjugated;
import com.siobhan.germanflashcards.entity.Word;
import com.siobhan.germanflashcards.service.VerbService;
import com.siobhan.germanflashcards.util.Conjugator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// Handle GET requests for conjugating verbs
@RestController
@RequestMapping("/")
public class VerbRestController {

    public VerbService verbService;

    public VerbRestController(VerbService theVerbService) {
        verbService = theVerbService;
    }

    @GetMapping("/irregular/{infinitiv}")
    public ResponseEntity<List<VerbConjugated>> getVerb(@PathVariable String infinitiv) {
        Verb verb = verbService.getByInfinitv(infinitiv);

        if (verb == null) {
            return ResponseEntity.notFound().build(); // Use ResponseEntity to handle not found scenario
        }
        List<VerbConjugated> tenses = new ArrayList<>();
        // Add 4 main tenses to list
        tenses.add(Conjugator.presentIrregular(verb));
        tenses.add(Conjugator.prateritumIrregular(verb));
        tenses.add(Conjugator.perfektIrregular(verb));
        tenses.add(Conjugator.futur(infinitiv));

        // Return list
        return ResponseEntity.ok(tenses); // Returns the list of VerbConjugated objects
    }


    @GetMapping("/regular/{infinitiv}")
    public ResponseEntity<List<VerbConjugated>> getRegularVerb(@PathVariable String infinitiv) {
        List<VerbConjugated> tenses = new ArrayList<>();

        tenses.add(Conjugator.presentRegular(infinitiv));
        tenses.add(Conjugator.prateritumRegular(infinitiv));
        tenses.add(Conjugator.perfektRegular(infinitiv));
        tenses.add(Conjugator.futur(infinitiv));

        return ResponseEntity.ok(tenses); // Returns the list of VerbConjugated objects
    }

}

