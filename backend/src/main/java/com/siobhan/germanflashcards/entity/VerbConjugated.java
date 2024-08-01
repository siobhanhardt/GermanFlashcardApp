package com.siobhan.germanflashcards.entity;

public class VerbConjugated {
    private String ich;
    private String du;
    private String erSieEs;
    private String wir;
    private String ihr;
    private String SieSie;

    public VerbConjugated() {
    }

    public VerbConjugated(String ich, String du, String erSieEs, String wir, String ihr, String sieSie) {
        this.ich = ich;
        this.du = du;
        this.erSieEs = erSieEs;
        this.wir = wir;
        this.ihr = ihr;
        SieSie = sieSie;
    }

    public String getIch() {
        return ich;
    }

    public void setIch(String ich) {
        this.ich = ich;
    }

    public String getDu() {
        return du;
    }

    public void setDu(String du) {
        this.du = du;
    }

    public String getErSieEs() {
        return erSieEs;
    }

    public void setErSieEs(String erSieEs) {
        this.erSieEs = erSieEs;
    }

    public String getWir() {
        return wir;
    }

    public void setWir(String wir) {
        this.wir = wir;
    }

    public String getIhr() {
        return ihr;
    }

    public void setIhr(String ihr) {
        this.ihr = ihr;
    }

    public String getSieSie() {
        return SieSie;
    }

    public void setSieSie(String sieSie) {
        SieSie = sieSie;
    }
}
