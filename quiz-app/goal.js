(function(){
  const CORRECT = "シャンツェ";
  const chips = Array.from(document.querySelectorAll(".chip"));
  const slots = Array.from(document.querySelectorAll(".slot"));
  const feedback = document.getElementById("goal-feedback");
  const checkBtn = document.getElementById("submit-final");
  const surveyBtn = document.getElementById("survey-btn");

  function getAnswer(){ 
    return slots.map(s => s.textContent.trim()).join(""); 
  }
  function firstEmpty(){ 
    return slots.find(s => !s.textContent.trim()); 
  }
  function clearSlot(slot){
    const ch = slot.textContent.trim();
    if(!ch) return;
    const target = chips.find(c => c.dataset.char===ch && c.disabled);
    if(target) target.disabled=false;
    slot.textContent="";
    slot.classList.remove("filled");
  }

  // チップ → スロット
  chips.forEach(chip=>{
    chip.addEventListener("click",()=>{
      const empty=firstEmpty(); if(!empty)return;
      empty.textContent=chip.dataset.char;
      empty.classList.add("filled");
      chip.disabled=true;
    });
  });

  // スロット → クリア
  slots.forEach(slot=>{
    slot.addEventListener("click",()=>clearSlot(slot));
  });

  // 判定処理
  checkBtn.addEventListener("click",()=>{
    const ans=getAnswer();
    if(ans===CORRECT){
      feedback.textContent="Congratulation!";
      feedback.classList.add("success-text");

      // 判定ボタンをフェードアウト
      checkBtn.classList.add("fade-out");
      setTimeout(()=>{
        checkBtn.classList.add("hidden");

        // 2秒後にアンケートボタン表示
        setTimeout(()=>{
          surveyBtn.classList.remove("hidden");
        },2000);
      },600);

    }else{
      feedback.textContent="答えが違うみたいだ...。キーワードをもう一度見直してみよう！";
      feedback.classList.remove("success-text");
      surveyBtn.classList.add("hidden");
    }
  });
})();
