function checkAnswer() {
  const input = document.getElementById('answer').value.trim();
  const feedback = document.getElementById('goal-feedback');
  const checkBtn = document.getElementById('check-btn');
  const surveyBtn = document.getElementById('survey-btn');

  if (input === "シャンツェ") {
    // Congratulation! を中央に表示
    feedback.textContent = "Congratulation!";
    feedback.classList.add("success-text");

    // 判定ボタンをフェードアウト
    checkBtn.classList.add("fade-out");

    // フェードアウト完了後に完全に非表示
    setTimeout(() => {
      checkBtn.classList.add("hidden");

      // 2秒後にアンケートボタンを表示
      setTimeout(() => {
        surveyBtn.classList.remove("hidden");
      }, 2000);

    }, 600); // フェードアウト時間に合わせる

  } else {
    feedback.textContent = "答えが違うみたいだ...。キーワードをもう一度見直してみよう！";
    feedback.classList.remove("success-text");
  }
}
