function createSplashScreen() {
  // vid.show();
  nextbtn = createButton("start");
  nextbtn.parent("nextbtn");
  nextbtn.size(120, 40);
  // nextbtn.style("top", "400px");
  // nextbtn.style("top", "50vh");
  nextbtn.style("margin", "0 auto");
  nextbtn.mousePressed(advanceInterface);
}

function createCharSelector() {
    // character text
  chartext = createP("select your character:");
  chartext.parent("contents");
  chartext.style("top", "80px");
  
  // character selector
  charsel = createSelect();
  charsel.option("")
  for (thischar in characters) {
    charsel.option(characters[thischar]);
  }
  
  let myCharacter = getItem('myCharacter');
  if (myCharacter === null) {
    charsel.selected("");
   } else {
    charsel.selected(myCharacter);
   }

  // charsel.selected("");
  charsel.changed(charSelectEvent);
  charsel.style("top", "120px");
  charsel.style("margin", "0 auto");
  charsel.parent("contents");
  
  chartext.hide();
  charsel.hide();
}

function createMicCheck() {
  // audio text
  audiotext = createP("Test your microphone. Exit when done.");
  audiotext.parent("contents");
  audiotext.style("top", "45vh");
  audiotext.hide();

  // record button
  recbtn = createButton("rec");
  recbtn.parent("contents");
  recbtn.size(120, 40);
  recbtn.style("top", "50vh");
  recbtn.style("margin", "0 auto");
  recbtn.mousePressed(toggleListening);
  recbtn.hide();

  // audio text
  speechoutput = createP("(speak now)");
  speechoutput.parent("contents");
  speechoutput.id("speech");
  speechoutput.style("top", "140px");
  speechoutput.style("color", "gray");
  speechoutput.hide();  
}


// PREFERENCES SCREEN 

let prefs = [
  "adventure",
  "sociability",
  "risk",
  "pleasure",
  "humor",
  "optimism",
  "wellbeing",
  "achievement"
]

let prefText = {};
let prefSliders = {};

function createSliders() {

  for (i in prefs) {
    // title text
    let pref = prefs[i];
    prefText[pref] = createP(pref);
    prefText[pref].parent("contents");
    prefText[pref].style("top", "100px");
    prefText[pref].hide();

    // slider element
    prefSliders[pref] = createSlider(-5, 5, 0);
    prefSliders[pref].parent("contents");
    prefSliders[pref].style("top", "120px");
    prefSliders[pref].input(() => updateSlider(pref));
    prefSliders[pref].hide();

    // check cached value
    let myval = getItem(pref);
    if (myval === null) {
      prefSliders[pref].value(0);
     } else {
      prefSliders[pref].value(myval);
     }
  }
}

function updateSlider(name) {
  let thisValue = prefSliders[name].value();

  // data.push([thisTime, thisValue]);
  console.log(name, ": ", thisValue);
  storeItem(name, thisValue);
}

function showPreferences() {
  for (i in prefs) {
    let pref = prefs[i];
    prefText[pref].show();
    prefSliders[pref].show();
  }
}

function createWaiting() {
  timertext = createP(Math.round(waittime/1000))
  timertext.parent("countdown");
  timertext.style("position", "relative");
  timertext.style("font-size", "384pt");
  timertext.style("color", "#f0f0f0");
  timertext.style("top", "50vh");
  timertext.style("margin", "0 auto");
  timertext.style("line-height", "90px");
  timertext.hide();

  waittext = createP(story["waiting"].text);
  waittext.style("position", "relative");
  waittext.parent("contents");
  waittext.style("top", "50vh");
  waittext.style("line-height", "24px");
  waittext.hide();
}

function hideAll() {
  nextbtn.hide();

  vid.hide();
  
  chartext.hide();
  charsel.hide();

  // advtext.hide();
  // advslider.hide();
  // soctext.hide();
  // socslider.hide();
  for (i in prefs) {
    let pref = prefs[i];
    prefText[pref].hide();
    prefSliders[pref].hide();
  }

  audiotext.hide();
  recbtn.hide();
  speechoutput.hide();
  
  timertext.hide();  
  waittext.hide();

  
}