function checkAnswer() {
  const input = document.getElementById('answer').value.trim();
  const feedback = document.getElementById('goal-feedback');
  const checkBtn = document.getElementById('check-btn');
  const surveyBtn = document.getElementById('survey-btn');

  if (input === "シャンツェ") {
    feedback.textContent = "Congratulation!";
    feedback.classList.add("success-text");

    checkBtn.classList.add("hidden"); // 判定ボタン消す

    // 2秒後にアンケートボタン表示
    setTimeout(() => {
      surveyBtn.classList.remove("hidden");
    }, 2000);

  } else {
    feedback.textContent = "答えが違うみたいだ...。キーワードをもう一度見直してみよう！";
    feedback.classList.remove("success-text");
  }
}