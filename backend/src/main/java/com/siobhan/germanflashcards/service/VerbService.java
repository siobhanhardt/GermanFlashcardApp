package com.siobhan.germanflashcards.service;

import com.siobhan.germanflashcards.entity.Verb;
import com.siobhan.germanflashcards.entity.Word;

import java.util.List;

public interface VerbService {
    Verb findById(int theId);
    Verb getByInfinitv(String infinitiv);
}
