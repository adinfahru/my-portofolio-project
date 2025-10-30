const jawabanBenar = {
  question1: "b",
  question2: "a",
  question3: "b",
  question4: "c",
  question5: "a",
  bonus: "b",
};

// Select the DOM
const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const result = document.getElementById("result");
const quizTitle = document.getElementById("quizTitle");
const darkModeBtn = document.getElementById("darkModeBtn");
const bonusQuestion = document.getElementById("bonusQuestion");

function hitungSkor() {
  let skor = 0;
  let totalSoal = 5;

  // Cek jawaban pertanyaan 1
  const jawaban1 = document.querySelector('input[name="question1"]:checked');
  if (jawaban1 && jawaban1.value === jawabanBenar.question1) {
    skor++;
  }

  // Cek jawaban pertanyaan 2
  const jawaban2 = document.querySelector('input[name="question2"]:checked');
  if (jawaban2 && jawaban2.value === jawabanBenar.question2) {
    skor++;
  }

  // Cek jawaban pertanyaan 3
  const jawaban3 = document.querySelector('input[name="question3"]:checked');
  if (jawaban3 && jawaban3.value === jawabanBenar.question3) {
    skor++;
  }

  // Cek jawaban pertanyaan 4
  const jawaban4 = document.querySelector('input[name="question4"]:checked');
  if (jawaban4 && jawaban4.value === jawabanBenar.question4) {
    skor++;
  }

  // Cek jawaban pertanyaan 5
  const jawaban5 = document.querySelector('input[name="question5"]:checked');
  if (jawaban5 && jawaban5.value === jawabanBenar.question5) {
    skor++;
  }

  // Cek jawaban bonus
  const jawabanBonus = document.querySelector('input[name="bonus"]:checked');
  if (bonusQuestion.style.display !== "none") {
    totalSoal = 6;
    if (jawabanBonus && jawabanBonus.value === jawabanBenar.bonus) {
      skor++;
    }
  }

  return { skor: skor, total: totalSoal };
}

function submitQuiz(event) {
  event.preventDefault();

  // Hitung skor
  const hasil = hitungSkor();

  // Tampilkan hasil
  result.textContent = `Skor kamu: ${hasil.skor} / ${hasil.total}`;

  // Nonaktifkan semua input radio
  const allInputs = document.querySelectorAll('input[type="radio"]');
  allInputs.forEach((input) => {
    input.disabled = true;
  });

  // Nonaktifkan tombol submit dan tampilkan tombol restart
  submitBtn.disabled = true;
  restartBtn.style.display = "block";

  // Ubah tampilan berdasarkan skor
  if (hasil.skor === hasil.total) {
    // Easter Egg 1
    document.body.style.background = "#2ecc71";
    quizTitle.textContent = "Selamat! Semua jawaban benar!";
  } else if (hasil.skor === 0) {
    // Easter Egg 2
    document.body.style.background = "#e74c3c";
    quizTitle.textContent = "Stresss!";
  }
}

function restartQuiz() {
  document.body.style.background = "";
  quizTitle.textContent = "Mini Quiz";
  result.textContent = "";

  // Reset form
  quizForm.reset();

  // Aktifkan kembali semua input
  const allInputs = document.querySelectorAll('input[type="radio"]');
  allInputs.forEach((input) => {
    input.disabled = false;
  });

  // Aktifkan tombol submit dan sembunyikan tombol restart
  submitBtn.disabled = false;
  restartBtn.style.display = "none";

  // Sembunyikan pertanyaan bonus
  bonusQuestion.style.display = "none";
}

// Easter Egg 3
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Ubah icon tombol
  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "☀️";
  } else {
    darkModeBtn.textContent = "🌙";
  }
}

// Easter Egg 4
function tampilkanBonus() {
  bonusQuestion.style.display = "block";
}

// Easter Egg 5
let typedWord = "";
function handleTyping(event) {
  typedWord += event.key.toLowerCase();

  if (typedWord.includes("prabowo") || typedWord.includes("jokowi")) {
    fillAllAnswers();
    typedWord = "";
  }

  if (typedWord.length > 10) {
    typedWord = "";
  }
}

function fillAllAnswers() {
  if (submitBtn.disabled) return;

  document.querySelector('input[name="question1"][value="b"]').checked = true;
  document.querySelector('input[name="question2"][value="a"]').checked = true;
  document.querySelector('input[name="question3"][value="b"]').checked = true;
  document.querySelector('input[name="question4"][value="c"]').checked = true;
  document.querySelector('input[name="question5"][value="a"]').checked = true;

  quizTitle.textContent = "Cheat Activated";
}

quizForm.addEventListener("submit", submitQuiz);
restartBtn.addEventListener("click", restartQuiz);
darkModeBtn.addEventListener("click", toggleDarkMode);
quizTitle.addEventListener("dblclick", tampilkanBonus);
document.addEventListener("keypress", handleTyping);

