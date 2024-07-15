const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Доброе утро, босс...");
  } else if (hour > 12 && hour < 17) {
    speak("Добрый день, хозяин...");
  } else {
    speak("Добрый вечер, сэр...");
  }
}

window.addEventListener("load", () => {
  speak("Инициализация ALISA...");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Слушаю....";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("привет") || message.includes("здравствуйте")) {
    speak("Здравствуйте, сэр, как я могу помочь?");
  } else if (message.includes("открой google")) {
    window.open("https://google.com", "_blank");
    speak("Открываю Google...");
  } else if (message.includes("открой youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Открываю Youtube...");
  } else if (message.includes("открой facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Открываю Facebook...");
  } else if (
    message.includes("что такое") ||
    message.includes("кто такой") ||
    message.includes("что такое")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "Вот что я нашел в интернете по запросу " + message;
    speak(finalText);
  } else if (message.includes("википедия")) {
    window.open(
      `https://en.wikipedia.org/wiki/${message.replace("википедия", "")}`,
      "_blank"
    );
    const finalText = "Вот что я нашел на википедии по запросу " + message;
    speak(finalText);
  } else if (message.includes("время")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = time;
    speak(finalText);
  } else if (message.includes("дата")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = date;
    speak(finalText);
  } else if (message.includes("калькулятор")) {
    window.open("Calculator:///");
    const finalText = "Открываю калькулятор";
    speak(finalText);
  } else {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "Я нашел информацию по запросу " + message + " на Google";
    speak(finalText);
  }
}
