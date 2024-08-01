package com.siobhan.germanflashcards.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name="verb_conjugations")
public class Verb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "prasens_ich")
    private String prasensIch;
    @Column(name = "prasens_du")
    private String prasensDu;
    @Column(name = "prasens_er_sie_es")
    private String prasensErSieEs;
    @Column(name = "prateritum_ich")
    private String prateritumIch;
    @Column(name = "prateritum_du")
    private String prateritumDu;
    @Column(name = "prateritum_er_sie_es")
    private String prateritumErSieEs;
    @Column(name = "perfekt")
    private String perfekt;
    @Column(name="infinitiv")
    private String infinitiv;
    @OneToOne(cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
    @JoinColumn(name = "word_id")
    private Word word;
    public Verb () {}
    public Verb(String prasensIch, String prasensDu, String prasensErSieEs, String prateritumIch, String prateritumDu, String prateritumErSieEs, String perfekt, String infinitiv) {
        this.prasensIch = prasensIch;
        this.prasensDu = prasensDu;
        this.prasensErSieEs = prasensErSieEs;
        this.prateritumIch = prateritumIch;
        this.prateritumDu = prateritumDu;
        this.prateritumErSieEs = prateritumErSieEs;
        this.perfekt = perfekt;
        this.infinitiv = infinitiv;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPrasensIch() {
        return prasensIch;
    }

    public void setPrasensIch(String prasensIch) {
        this.prasensIch = prasensIch;
    }

    public String getPrasensDu() {
        return prasensDu;
    }

    public void setPrasensDu(String prasensDu) {
        this.prasensDu = prasensDu;
    }

    public String getPrasensErSieEs() {
        return prasensErSieEs;
    }

    public void setPrasensErSieEs(String prasensErSieEs) {
        this.prasensErSieEs = prasensErSieEs;
    }

    public String getPrateritumIch() {
        return prateritumIch;
    }

    public void setPrateritumIch(String prateritumIch) {
        this.prateritumIch = prateritumIch;
    }

    public String getPrateritumDu() {
        return prateritumDu;
    }

    public void setPrateritumDu(String prateritumDu) {
        this.prateritumDu = prateritumDu;
    }

    public String getPrateritumErSieEs() {
        return prateritumErSieEs;
    }

    public void setPrateritumErSieEs(String prateritumErSieEs) {
        this.prateritumErSieEs = prateritumErSieEs;
    }

    public String getPerfekt() {
        return perfekt;
    }

    public void setPerfekt(String perfekt) {
        this.perfekt = perfekt;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public String getInfinitiv() {
        return infinitiv;
    }

    public void setInfinitiv(String infinitiv) {
        this.infinitiv = infinitiv;
    }
}
