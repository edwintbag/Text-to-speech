document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("text-input");
    const speakButton = document.getElementById("speak-btn");
    const voiceSelect = document.getElementById("voice-select");
    const pitch = document.getElementById("pitch");
    const pitchValue = document.getElementById("pitch-value");
    const rate = document.getElementById("rate");
    const rateValue = document.getElementById("rate-value");

    const synth = window.speechSynthesis;

    function populateVoices() {
        const voices = synth.getVoices();
        voiceSelect.innerHTML = '<option value="">Select Voice</option>'; 

        voices.forEach((voice, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    synth.onvoiceschanged = populateVoices;

    pitch.addEventListener("input", () => pitchValue.textContent = pitch.value);
    rate.addEventListener("input", () => rateValue.textContent = rate.value);

    speakButton.addEventListener("click", () => {
        const text = textInput.value.trim();
        const selectedVoiceIndex = voiceSelect.value;
        const voices = synth.getVoices();

        if (!text) {
            alert("Please enter some text.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        
        if (selectedVoiceIndex) {
            utterance.voice = voices[selectedVoiceIndex];
        }

        utterance.pitch = parseFloat(pitch.value);
        utterance.rate = parseFloat(rate.value);

        synth.speak(utterance);
    });
});