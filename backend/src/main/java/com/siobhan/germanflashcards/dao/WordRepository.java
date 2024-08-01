package com.siobhan.germanflashcards.dao;

import com.siobhan.germanflashcards.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<Word, Integer> {
    Optional<Word> findByGermanWord(String germanWord);
    List<Word> findByPartOfSpeech(String partOfSpeech);

    List<Word> findByPartOfSpeechIn(List<String> partOfSpeech);
}
