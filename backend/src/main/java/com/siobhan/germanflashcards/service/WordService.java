package com.siobhan.germanflashcards.service;

import com.siobhan.germanflashcards.entity.Word;
import java.util.List;
import java.util.Optional;

public interface WordService {

    List<Word> findAll();
    List<Word> findByPartOfSpeech(String partOfSpeech);
    List<Word> findByPartOfSpeechIn(List<String> partOfSpeech);
    Word findById(int theId);
    Word findByGermanWord(String germanWord);
}
