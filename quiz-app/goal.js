function checkAnswer() {
  const input = document.getElementById('answer').value.trim();
  const feedback = document.getElementById('goal-feedback');
  const checkBtn = document.getElementById('check-btn');
  const surveyBtn = document.getElementById('survey-btn');

  if (input === "シャンツェ") {
    feedback.textContent = "Congratulation!";
    feedback.classList.add("success-text");

    // 判定ボタンをフェードアウト
    checkBtn.classList.add("fade-out");

    // フェードアウト後に非表示へ（0.6秒後）
    setTimeout(() => {
      checkBtn.style.display = "none";   // ← classList.add("hidden") ではなく直接 display:none
    }, 600);

    // アンケートボタンを2秒後に表示
    setTimeout(() => {
      surveyBtn.classList.remove("hidden");
      surveyBtn.classList.add("fade-in"); // ← フェードインさせる場合
    }, 2000);

  } else {
    feedback.textContent = "答えが違うみたいだ...。キーワードをもう一度見直してみよう！";
    feedback.classList.remove("success-text");
  }
}
