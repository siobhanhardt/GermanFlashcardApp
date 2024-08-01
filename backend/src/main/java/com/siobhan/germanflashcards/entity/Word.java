package com.siobhan.germanflashcards.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "words")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "german_word")
    private String germanWord;
    @Column(name = "english_translation")
    private String englishTranslation;
    @Column(name = "part_of_speech")
    private String partOfSpeech;
    @Column(name = "example_sentence")
    private String exampleSentence;
    @Column(name = "example_sentence_en")
    private String exampleSentenceEn;
    @Column(name = "is_irregular_verb")
    private Boolean isIrregularVerb;
    @Column(name = "frequency")
    private int frequency;
    @Column(name = "alt_translations")
    private String altTranslations;
    @OneToOne(mappedBy = "word", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Verb verb;
    public Word() {
    }

    public Word(String germanWord, String englishTranslation, String partOfSpeech, String exampleSentence, String exampleSentenceEn, Boolean isIrregularVerb, String altTranslations) {
        this.id = id;
        this.germanWord = germanWord;
        this.englishTranslation = englishTranslation;
        this.partOfSpeech = partOfSpeech;
        this.exampleSentence = exampleSentence;
        this.exampleSentenceEn = exampleSentenceEn;
        this.isIrregularVerb = isIrregularVerb;
        this.frequency = 0;
        this.altTranslations = altTranslations;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGermanWord() {
        return germanWord;
    }

    public void setGermanWord(String germanWord) {
        this.germanWord = germanWord;
    }

    public String getEnglishTranslation() {
        return englishTranslation;
    }

    public void setEnglishTranslation(String englishTranslation) {
        this.englishTranslation = englishTranslation;
    }

    public String getPartOfSpeech() {
        return partOfSpeech;
    }

    public void setPartOfSpeech(String partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
    }

    public String getExampleSentence() {
        return exampleSentence;
    }

    public void setExampleSentence(String exampleSentence) {
        this.exampleSentence = exampleSentence;
    }

    public Boolean getIrregularVerb() {
        return isIrregularVerb;
    }

    public void setIrregularVerb(Boolean verb) {
        isIrregularVerb = verb;
    }

    public String getExampleSentenceEn() {
        return exampleSentenceEn;
    }

    public void setExampleSentenceEn(String exampleSentenceEn) {
        this.exampleSentenceEn = exampleSentenceEn;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public String getAltTranslations() {
        return altTranslations;
    }

    public void setAltTranslations(String altTranslations) {
        this.altTranslations = altTranslations;
    }

    public Verb getVerb() {
        return verb;
    }

    public void setVerb(Verb verb) {
        this.verb = verb;
    }
}
