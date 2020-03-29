function loadVoices() {
  var voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    return voice;
  });
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function() {
  loadVoices();
};

function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
  var msg = new SpeechSynthesisUtterance();

  // Set the text.
  msg.text = text;

  // Set the attributes.
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 1;
  msg.lang = "es-ES";

  const voices = speechSynthesis.getVoices();

  msg.voice = voices.filter(voice => {
    return voice.name == "Google español";
  })[0];

  if (msg.voice === null) {
    msg.voice = voices.filter(voice => {
      if (voice.name == "Jorge") {
        return voice.name == "Jorge";
      }
    })[0];
  }

  // Queue this utterance.
  window.speechSynthesis.speak(msg);
}

const textToSpeech = {
  speak(text) {
    window.speechSynthesis.cancel();
    speak(text);
  }
};

export default textToSpeech;
