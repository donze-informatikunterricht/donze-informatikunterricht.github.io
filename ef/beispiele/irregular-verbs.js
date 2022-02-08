"use strict";

var irregularVerbs = [
    {infinitive: "to be", simplePast: "was / were", pastParticiple: "been", germanTranslation: "sein"},
    {infinitive: "to beat", simplePast: "beat", pastParticiple: "beaten", germanTranslation: "schlagen; besiegen"},
    {infinitive: "to become", simplePast: "became", pastParticiple: "become", germanTranslation: "werden"},
    {infinitive: "to begin", simplePast: "began", pastParticiple: "begun", germanTranslation: "beginnen, anfangen (mit)"},
    {infinitive: "to bet", simplePast: "bet", pastParticiple: "bet", germanTranslation: "wetten"},
    {infinitive: "to bite", simplePast: "bit", pastParticiple: "bitten", germanTranslation: "beissen"},
    {infinitive: "to blow", simplePast: "blew", pastParticiple: "blown", germanTranslation: "wehen, blasen"},
    {infinitive: "to break", simplePast: "broke", pastParticiple: "broken", germanTranslation: "(zer)brechen; kaputt gehen"},
    {infinitive: "to bring", simplePast: "brought", pastParticiple: "brought", germanTranslation: "(mit-, her)bringen"},
    {infinitive: "to build", simplePast: "built", pastParticiple: "built", germanTranslation: "bauen"},
    {infinitive: "to buy", simplePast: "bought", pastParticiple: "bought", germanTranslation: "kaufen"},
    {infinitive: "to catch", simplePast: "caught", pastParticiple: "caught", germanTranslation: "fangen; erwischen"},
    {infinitive: "to choose", simplePast: "chose", pastParticiple: "chosen", germanTranslation: "(aus)wählen; (sich) aussuchen"},
    {infinitive: "to come", simplePast: "came", pastParticiple: "come", germanTranslation: "kommen"},
    {infinitive: "to cost", simplePast: "cost", pastParticiple: "cost", germanTranslation: "kosten"},
    {infinitive: "to cut", simplePast: "cut", pastParticiple: "cut", germanTranslation: "schneiden"},
    {infinitive: "to do", simplePast: "did", pastParticiple: "done", germanTranslation: "tun, machen"},
    {infinitive: "to draw", simplePast: "drew", pastParticiple: "drawn", germanTranslation: "zeichnen; ziehen"},
    {infinitive: "to drink", simplePast: "drank", pastParticiple: "drunk", germanTranslation: "trinken"},
    {infinitive: "to drive", simplePast: "drove", pastParticiple: "driven", germanTranslation: "(ein Auto) fahren"},
    {infinitive: "to eat", simplePast: "ate", pastParticiple: "eaten", germanTranslation: "essen"},
    {infinitive: "to fall", simplePast: "fell", pastParticiple: "fallen", germanTranslation: "(hin)fallen, stürzen"},
    {infinitive: "to feed", simplePast: "fed", pastParticiple: "fed", germanTranslation: "füttern"},
    {infinitive: "to feel", simplePast: "felt", pastParticiple: "felt", germanTranslation: "(sich) fühlen; sich anfühlen"},
    {infinitive: "to fight", simplePast: "fought", pastParticiple: "fought", germanTranslation: "kämpfen"},
    {infinitive: "to find", simplePast: "found", pastParticiple: "found", germanTranslation: "finden"},
    {infinitive: "to fly", simplePast: "flew", pastParticiple: "flown", germanTranslation: "fliegen"},
    {infinitive: "to forget", simplePast: "forgot", pastParticiple: "forgotten", germanTranslation: "vergessen"},
    {infinitive: "to forgive", simplePast: "forgave", pastParticiple: "forgiven", germanTranslation: "vergeben, verzeihen"},
    {infinitive: "to get", simplePast: "got", pastParticiple: "got", germanTranslation: "bekommen; holen; werden; (hin)kommen"},
    {infinitive: "to give", simplePast: "gave", pastParticiple: "given", germanTranslation: "geben"},
    {infinitive: "to go", simplePast: "went", pastParticiple: "gone", germanTranslation: "gehen, fahren"},
    {infinitive: "to grow", simplePast: "grew", pastParticiple: "grown", germanTranslation: "wachsen; anbauen, anpflanzen"},
    {infinitive: "to hang", simplePast: "hung", pastParticiple: "hung", germanTranslation: "hängen; (etwas) aufhängen"},
    {infinitive: "to have (have got)", simplePast: "had", pastParticiple: "had", germanTranslation: "haben, besitzen"},
    {infinitive: "to hear", simplePast: "heard", pastParticiple: "heard", germanTranslation: "hören"},
    {infinitive: "to hide", simplePast: "hid", pastParticiple: "hidden", germanTranslation: "(sich) verstecken"},
    {infinitive: "to hit", simplePast: "hit", pastParticiple: "hit", germanTranslation: "schlagen"},
    {infinitive: "to hold", simplePast: "held", pastParticiple: "held", germanTranslation: "halten; abhalten, veranstalten"},
    {infinitive: "to hurt", simplePast: "hurt", pastParticiple: "hurt", germanTranslation: "wehtun; verletzen"},
    {infinitive: "to keep", simplePast: "kept", pastParticiple: "kept", germanTranslation: "(be)halten"},
    {infinitive: "to know", simplePast: "knew", pastParticiple: "known", germanTranslation: "wissen; kennen"},
    {infinitive: "to lay the table", simplePast: "laid", pastParticiple: "laid", germanTranslation: "den Tisch decken"},
    {infinitive: "to lead", simplePast: "led", pastParticiple: "led", germanTranslation: "führen"},
    {infinitive: "to leave", simplePast: "left", pastParticiple: "left", germanTranslation: "(weg)gehen; abfahren; verlassen; zurücklassen"},
    {infinitive: "to lend", simplePast: "lent", pastParticiple: "lent", germanTranslation: "(ver)leihen"},
    {infinitive: "to let", simplePast: "let", pastParticiple: "let", germanTranslation: "lassen"},
    {infinitive: "to light", simplePast: "lit", pastParticiple: "lit", germanTranslation: "anzünden"},
    {infinitive: "to lose", simplePast: "lost", pastParticiple: "lost", germanTranslation: "verlieren"},
    {infinitive: "to make", simplePast: "made", pastParticiple: "made", germanTranslation: "machen; bauen; bilden"},
    {infinitive: "to mean", simplePast: "meant", pastParticiple: "meant", germanTranslation: "bedeuten; meinen"},
    {infinitive: "to meet", simplePast: "met", pastParticiple: "met", germanTranslation: "(sich) treffen"},
    {infinitive: "to pay", simplePast: "paid", pastParticiple: "paid", germanTranslation: "bezahlen"},
    {infinitive: "to put", simplePast: "put", pastParticiple: "put", germanTranslation: "legen, stellen, (wohin) tun"},
    {infinitive: "to read", simplePast: "read", pastParticiple: "read", germanTranslation: "lesen"},
    {infinitive: "to ride", simplePast: "rode", pastParticiple: "ridden", germanTranslation: "reiten; (Rad) fahren"},
    {infinitive: "to ring", simplePast: "rang", pastParticiple: "rung", germanTranslation: "klingeln, läuten"},
    {infinitive: "to rise", simplePast: "rose", pastParticiple: "risen", germanTranslation: "(auf)steigen"},
    {infinitive: "to run", simplePast: "ran", pastParticiple: "run", germanTranslation: "rennen, laufen; verlaufen (Strasse, Grenze); leiten (Hotel, Firma)"},
    {infinitive: "to say", simplePast: "said", pastParticiple: "said", germanTranslation: "sagen"},
    {infinitive: "to see", simplePast: "saw", pastParticiple: "seen", germanTranslation: "sehen; besuchen, aufsuchen"},
    {infinitive: "to sell", simplePast: "sold", pastParticiple: "sold", germanTranslation: "verkaufen"},
    {infinitive: "to send", simplePast: "sent", pastParticiple: "sent", germanTranslation: "schicken, senden"},
    {infinitive: "to set a trap", simplePast: "set", pastParticiple: "set", germanTranslation: "eine Falle stellen"},
    {infinitive: "to sew", simplePast: "sewed", pastParticiple: "sewn", germanTranslation: "nähen"},
    {infinitive: "to shake", simplePast: "shook", pastParticiple: "shaken", germanTranslation: "schütteln; zittern"},
    {infinitive: "to shine", simplePast: "shone", pastParticiple: "shone", germanTranslation: "scheinen (Sonne)"},
    {infinitive: "to shoot", simplePast: "shot", pastParticiple: "shot", germanTranslation: "(er)schiessen"},
    {infinitive: "to show", simplePast: "showed", pastParticiple: "shown", germanTranslation: "zeigen"},
    {infinitive: "to shut", simplePast: "shut", pastParticiple: "shut", germanTranslation: "schliessen"},
    {infinitive: "to sing", simplePast: "sang", pastParticiple: "sung", germanTranslation: "singen"},
    {infinitive: "to sit", simplePast: "sat", pastParticiple: "sat", germanTranslation: "sitzen; sich setzen"},
    {infinitive: "to sleep", simplePast: "slept", pastParticiple: "slept", germanTranslation: "schlafen"},
    {infinitive: "to speak", simplePast: "spoke", pastParticiple: "spoken", germanTranslation: "sprechen"},
    {infinitive: "to spend", simplePast: "spent", pastParticiple: "spent", germanTranslation: "(Zeit) verbringen; (Geld) ausgeben"},
    {infinitive: "to spit", simplePast: "spat", pastParticiple: "spat", germanTranslation: "spucken"},
    {infinitive: "to stand", simplePast: "stood", pastParticiple: "stood", germanTranslation: "stehen; sich (hin)stellen"},
    {infinitive: "to steal", simplePast: "stole", pastParticiple: "stolen", germanTranslation: "stehlen"},
    {infinitive: "to stick", simplePast: "stuck", pastParticiple: "stuck", germanTranslation: "herausragen; herausstehen"},
    {infinitive: "to swim", simplePast: "swam", pastParticiple: "swum", germanTranslation: "schwimmen"},
    {infinitive: "to take", simplePast: "took", pastParticiple: "taken", germanTranslation: "nehmen; (weg-, hin)bringen; dauern, (Zeit) brauchen"},
    {infinitive: "to teach", simplePast: "taught", pastParticiple: "taught", germanTranslation: "unterrichten, lehren"},
    {infinitive: "to tear off", simplePast: "tore", pastParticiple: "torn", germanTranslation: "abreissen"},
    {infinitive: "to tell", simplePast: "told", pastParticiple: "told", germanTranslation: "erzählen, berichten"},
    {infinitive: "to think", simplePast: "thought", pastParticiple: "thought", germanTranslation: "denken, glauben, meinen"},
    {infinitive: "to throw", simplePast: "threw", pastParticiple: "thrown", germanTranslation: "werfen"},
    {infinitive: "to understand", simplePast: "understood", pastParticiple: "understood", germanTranslation: "verstehen"},
    {infinitive: "to upset", simplePast: "upset", pastParticiple: "upset", germanTranslation: "ärgern, kränken, aus der Fassung bringen"},
    {infinitive: "to wake up", simplePast: "woke", pastParticiple: "woken", germanTranslation: "aufwachen; wecken"},
    {infinitive: "to wear", simplePast: "wore", pastParticiple: "worn", germanTranslation: "tragen (Kleidung)"},
    {infinitive: "to win", simplePast: "won", pastParticiple: "won", germanTranslation: "gewinnen"},
    {infinitive: "to write", simplePast: "wrote", pastParticiple: "written", germanTranslation: "schreiben"}];
var sessionInfo = { verbList: irregularVerbs };
var fieldNames = ['infinitive', 'simplePast', 'pastParticiple', 'germanTranslation'];

var infinitiveField = document.getElementById("infinitive");
var simplePastField = document.getElementById("simplePast");
var pastParticipleField = document.getElementById("pastParticiple");
var germanTranslationField = document.getElementById("germanTranslation");
var germanTranslationField2 = document.getElementById("germanTranslation2");

initialise();

function setValue(id, newValue) {
    var s = document.getElementById(id);
    s.value = newValue;
}

function initialise() {

    if (sessionInfo.verbList.length === 0) {
        document.getElementById("congrats-container").classList.remove("invisible");
        document.getElementById("main-container").style.visibility = "hidden";
    } else {

        sessionInfo.shownVerbIndex = [Math.floor(Math.random() * sessionInfo.verbList.length)];
        sessionInfo.shownFieldName = fieldNames[Math.floor(Math.random() * fieldNames.length)];

        switch (sessionInfo.shownFieldName) {
            case 'infinitive':
                infinitiveField.value = sessionInfo.verbList[sessionInfo.shownVerbIndex][String(sessionInfo.shownFieldName)];
                break;
            case 'simplePast':
                simplePastField.value = sessionInfo.verbList[sessionInfo.shownVerbIndex][String(sessionInfo.shownFieldName)];
                break;
            case 'pastParticiple':
                pastParticipleField.value = sessionInfo.verbList[sessionInfo.shownVerbIndex][String(sessionInfo.shownFieldName)];
                break;
            case 'germanTranslation':
                germanTranslationField.value = sessionInfo.verbList[sessionInfo.shownVerbIndex][String(sessionInfo.shownFieldName)];
                germanTranslationField2.value = sessionInfo.verbList[sessionInfo.shownVerbIndex][String(sessionInfo.shownFieldName)];
                break;
        }

        // update button stati
        document.getElementById("nextButton").disabled = true;
        document.getElementById("deleteButton").disabled = true;
        document.getElementById("resolveButton").disabled = false;

        return sessionInfo;
    }
}

function showVerb() {
    var index = sessionInfo.shownVerbIndex;
    infinitiveField.value = sessionInfo.verbList[index].infinitive;
    simplePastField.value = sessionInfo.verbList[index].simplePast;
    pastParticipleField.value = sessionInfo.verbList[index].pastParticiple;
    germanTranslationField.value = sessionInfo.verbList[index].germanTranslation;
    germanTranslationField2.value = sessionInfo.verbList[index].germanTranslation;

    // update button stati
    document.getElementById("nextButton").disabled = false;
    document.getElementById("deleteButton").disabled = false;
    document.getElementById("resolveButton").disabled = true;
}

function clear() {
    infinitiveField.value = '';
    simplePastField.value = '';
    pastParticipleField.value = '';
    germanTranslationField.value = '';
    germanTranslationField2.value = '';
}
function askNewVerb() {
    clear();
    initialise();
}

function deleteVerb() {
    sessionInfo.verbList.splice(sessionInfo.shownVerbIndex, 1);
    askNewVerb();
}

function toggleCollapsible() {

    var collapsible = document.getElementsByClassName("collapsible");
    collapsible[0].classList.toggle("active");
    collapsible[0].innerHTML === "Show Explanations" ? collapsible[0].innerHTML = 'Hide Explanations' : collapsible[0].innerHTML = 'Show Explanations';

    var content = collapsible[0].nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.scrollIntoView({ behavior: "smooth" });
    }
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}