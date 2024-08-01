package com.siobhan.germanflashcards.dao;

import com.siobhan.germanflashcards.entity.Verb;
import com.siobhan.germanflashcards.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VerbRepository extends JpaRepository<Verb, Integer> {
    Optional<Verb> findByInfinitiv(String infinitiv);
}
