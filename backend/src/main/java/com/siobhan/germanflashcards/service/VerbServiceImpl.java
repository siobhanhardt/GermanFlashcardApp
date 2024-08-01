package com.siobhan.germanflashcards.service;

import com.siobhan.germanflashcards.dao.VerbRepository;
import com.siobhan.germanflashcards.entity.Verb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VerbServiceImpl implements VerbService {
    private VerbRepository verbRepository;
    @Autowired
    public VerbServiceImpl (VerbRepository theVerbRepository) {
        verbRepository = theVerbRepository;
    }
    @Override
    public Verb findById(int theId) {
        Optional<Verb> result = verbRepository.findById(theId);
        Verb verb = null;
        if(result.isPresent()){
            verb = result.get();
        } else {
            throw new RuntimeException("Did not find word of id - " + theId);
        }
        return verb;
    }

    @Override
    public Verb getByInfinitv(String infinitiv) {
        Optional<Verb> result = verbRepository.findByInfinitiv(infinitiv);
        Verb verb = null;
        if(result.isPresent()){
            verb = result.get();
        } else {
            throw new RuntimeException("Did not find word of id - " + infinitiv);
        }
        return verb;
    }
}

