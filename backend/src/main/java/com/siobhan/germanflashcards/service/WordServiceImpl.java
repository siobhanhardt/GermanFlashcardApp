package com.siobhan.germanflashcards.service;

import com.siobhan.germanflashcards.dao.WordRepository;
import com.siobhan.germanflashcards.entity.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WordServiceImpl implements WordService{

    private WordRepository wordRepository;
    @Autowired
    public WordServiceImpl(WordRepository theWordRepository) {
        wordRepository = theWordRepository;
    }
    @Override
    public List<Word> findAll() {
        return wordRepository.findAll();
    }

    @Override
    public List<Word> findByPartOfSpeech(String partOfSpeech) {
        return wordRepository.findByPartOfSpeech(partOfSpeech);
    }

    @Override
    public List<Word> findByPartOfSpeechIn(List<String> partOfSpeech) {
        return wordRepository.findByPartOfSpeechIn(partOfSpeech);
    }

    @Override
    public Word findById(int theId) {
        Optional<Word> result = wordRepository.findById(theId);
        Word word = null;
        if(result.isPresent()){
            word = result.get();
        } else {
            throw new RuntimeException("Did not find word of id - " + theId);
        }
        return word;
    }

    @Override
    public Word findByGermanWord(String germanWord) {
       Optional<Word> result = wordRepository.findByGermanWord(germanWord);
       return result.orElse(null);
    }

}
