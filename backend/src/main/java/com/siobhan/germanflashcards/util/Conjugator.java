package com.siobhan.germanflashcards.util;

import com.siobhan.germanflashcards.entity.Verb;
import com.siobhan.germanflashcards.entity.VerbConjugated;

// Util for conjugation functions, both irregular and regular
public class Conjugator {
    public static void main(String[] args) {
        //System.out.println(presentRegular("machen"));
        //Verb lesen = new Verb("lese", "liest", "liest", "las", "last", "las", "habe gelesen");
        //System.out.println(presentIrregular(lesen));
        System.out.println(createStem("atmen"));

    }

    public static VerbConjugated presentRegular(String verb) {
        VerbConjugated response = new VerbConjugated();
        String prefix = "";
        if (verb.contains("-")) { // Condition for separable verbs
            String[] parts = verb.split("-", 2); // Split into 2 parts
            verb = parts[1]; //reassign verb so it can be used in function below
            prefix = parts[0];
            prefix = " " + prefix;
        }
        int verbLength = verb.length();
        char secondLastChar = verb.charAt(verbLength - 2);
        boolean isT = verb.charAt(verbLength - 3) == 't'; // Check if ends in T
        boolean isElen = secondLastChar == 'l' || secondLastChar == 'r'; // Check if ends in L or R


        String stem = isElen ? verb.substring(0, verbLength - 1) : verb.substring(0, verbLength - 2); // Create stem, with condition for l and r
        // Add endings with conditions for isT and isELen
        String duEnd = isT ? "est" : "st";
        String erSieEsEnd = isT ? "et" : "t";
        String wirSieSieEnd = isElen ? "n" : "en";
        String ihrEnd = isT ? "et" : "t";

        // Create the conjugations, adding prefix if it exists
        response.setIch(stem + "e" + prefix);
        response.setDu(stem + duEnd + prefix);
        response.setErSieEs(stem + erSieEsEnd + prefix);
        response.setWir(stem + wirSieSieEnd + prefix);
        response.setIhr(stem + ihrEnd + prefix);
        response.setSieSie(stem + wirSieSieEnd + prefix);

        return response;
    }

    public static VerbConjugated presentIrregular(Verb verb) {
        VerbConjugated response = new VerbConjugated();
        // Special case for sein as it is very irregular
        if (verb.getInfinitiv().equals("sein")) {
            response.setIch(verb.getPrasensIch());
            response.setDu(verb.getPrasensDu());
            response.setErSieEs(verb.getPrasensErSieEs());
            response.setWir("sind");
            response.setIhr("seid");
            response.setSieSie("sind");
        } else {
            String stem = verb.getInfinitiv().substring(0, verb.getInfinitiv().length() - 2);
            // Ich, du, and er, sie, es are generally the irregular parts, so they are stored in database
            response.setIch(verb.getPrasensIch());
            response.setDu(verb.getPrasensDu());
            response.setErSieEs(verb.getPrasensErSieEs());
            if (verb.getInfinitiv().contains("-")) { // Case for separable verbs
                String[] parts = verb.getInfinitiv().split("-", 2);
                stem = parts[1];
                String prefix = " " + parts[0];
                response.setWir(stem + prefix);
                response.setIhr(stem.substring(0, stem.length() - 2) + "t" + prefix);
                response.setSieSie(stem + prefix);
            } else {
                response.setWir(verb.getPrasensIch() + "n");
                response.setIhr(stem + "t");
                response.setSieSie(verb.getInfinitiv());
            }
        }

        return response;
    }

    public static VerbConjugated prateritumRegular(String verb) {
        // Similar to present for getting stem, endings are different
        VerbConjugated response = new VerbConjugated();
        String prefix = "";
        if (verb.contains("-")) {
            String[] parts = verb.split("-", 2);
            verb = parts[1];
            prefix = parts[0];
            prefix = " " + prefix;
        }

        int verbLength = verb.length();
        char secondLastChar = verb.charAt(verbLength - 2);

        boolean isTorD = verb.charAt(verbLength - 3) == 't' || verb.charAt(verbLength - 3) == 'd';
        boolean isElen = secondLastChar == 'l' || secondLastChar == 'r';

        String stem = isElen ? verb.substring(0, verbLength - 1) : verb.substring(0, verbLength - 2);
        stem = isTorD ? stem + "e" : stem;

        response.setIch(stem + "te" + prefix);
        response.setDu(stem + "test" + prefix);
        response.setErSieEs(stem + "te" + prefix);
        response.setWir(stem + "ten" + prefix);
        response.setIhr(stem + "tet" + prefix);
        response.setSieSie(stem + "ten" + prefix);

        return response;
    }

    public static VerbConjugated prateritumIrregular(Verb verb) {
        VerbConjugated response = new VerbConjugated();
        String prefix = "";
        String ich = verb.getPrateritumIch();

        if (verb.getInfinitiv().contains("-")) {
            String[] parts = ich.split(" ", 2);
            prefix = " " + parts[1];
            ich = parts[0];
        }

        int len = ich.length();
        boolean endsE = ich.charAt(len - 1) == 'e';
        String stem = endsE ? ich.substring(0, len - 1) : ich; // prateritum irregular verbs have the same stem as ich

        String ihrEnd = endsE ? "et" : "t";

        response.setIch(verb.getPrateritumIch());
        response.setDu(verb.getPrateritumDu());
        response.setErSieEs(verb.getPrateritumErSieEs());
        response.setWir(stem + "en" + prefix);
        response.setIhr(stem + ihrEnd + prefix);
        response.setSieSie(stem + "en" + prefix);

        return response;
    }

    public static VerbConjugated perfektRegular(String verb) {
        VerbConjugated response = new VerbConjugated();

        String partizip = formPartizipII(verb);

        response.setIch("habe " + partizip);
        response.setDu("hast " + partizip);
        response.setErSieEs("hat " + partizip);
        response.setWir("haben " + partizip);
        response.setIhr("habt " + partizip);
        response.setSieSie("haben " + partizip);

        return response;
    }

    public static VerbConjugated perfektIrregular(Verb verb) {
        VerbConjugated response = new VerbConjugated();

        String partzip = verb.getPerfekt(); // all use the same form of verb
        boolean bin = partzip.startsWith("bin"); //check if used with sein or haben
        partzip = partzip.split(" ")[1]; //get verb without bin or haben

        if (bin) {
            response.setIch("bin " + partzip);
            response.setDu("bist " + partzip);
            response.setErSieEs("ist " + partzip);
            response.setWir("sind " + partzip);
            response.setIhr("seid " + partzip);
            response.setSieSie("sind " + partzip);
        } else {
            response.setIch("habe " + partzip);
            response.setDu("hast " + partzip);
            response.setErSieEs("hat " + partzip);
            response.setWir("haben " + partzip);
            response.setIhr("habt " + partzip);
            response.setSieSie("haben " + partzip);
        }

        return response;
    }


    public static VerbConjugated futur(String verb) {
        VerbConjugated response = new VerbConjugated();
        if (verb.contains("-")) verb = verb.replace("-", ""); // Remove separator
        response.setIch("werde " + verb);
        response.setDu("wirst " + verb);
        response.setErSieEs("wird " + verb);
        response.setWir("werden " + verb);
        response.setIhr("werdet " + verb);
        response.setSieSie("werden " + verb);

        return response;
    }

    public static String formPartizipII(String infinitive) {
        String partizipII = "";
        String stem = infinitive;

        // Handling verbs ending with "-ieren"
        if (infinitive.endsWith("ieren")) {
            stem = infinitive.substring(0, infinitive.length() - 2); // Remove "-en"
            partizipII = stem + "t";
        }
        // Handling regular verbs with inseparable prefix
        else if (startsWithInseparablePrefix(infinitive)) {
            //stem = createStem(infinitive); // Remove prefix
            partizipII = createStem(infinitive);
        }
        // Handling regular verbs with separable prefix
        else if (infinitive.contains("-")) {
            String[] parts = infinitive.split("-", 2);
            partizipII = parts[0] + "ge" + createStem(parts[1]);
        }
        // Handling regular verbs without a prefix
        else {
            partizipII = "ge" + createStem(stem);
        }

        return partizipII;
    }

    private static boolean startsWithInseparablePrefix(String verb) {
        // List of common inseparable prefixes
        String[] prefixes = {"be", "emp", "ent", "er", "ge", "miss", "ver", "voll", "zer"};
        for (String prefix : prefixes) {
            if (verb.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    }

    private static String createStem(String verb) {
        if (verb.endsWith("eln") || verb.endsWith("ern")) {
            verb = verb.substring(0, verb.length() - 1); // Remove n
        } else if (verb.endsWith("en")) {
            verb = verb.substring(0, verb.length() - 2); // Remove "-en"
        }
        int len = verb.length();
        String secondLastChar = verb.substring(len - 2, len - 1);
        String lastChar = verb.substring(len - 1);
        // Add "e" before "t" if the stem ends with specific consonants
        if (len > 1) {
            if (verb.endsWith("d") || verb.endsWith("t")) {
                return verb + "et";
            } else if ("bdfgkpt".contains(secondLastChar) && "nm".contains(lastChar)) {
                return verb + "et";
            } else {
                return verb + "t";
            }
        } else {
            return "";
        }
    }
}
