// ===== クイズデータ =====
const QUIZ = [
  { id:1, q:"蔵王ジャンプ台が建設されたのはいつでしょうか?", choices:["1976 年","1978 年","1980 年","1982 年"], correct:1, hint:"受付で配ったパンフレットを見よう!", keyword:"ツ" },
  { id:2, q:"ジャンプ台の下から上までの標高差と近い高さの建物は次のうちどれでしょうか?", choices:["山形市役所","山形県庁","上山スカイタワー","霞城セントラル"], correct:3, hint:"インフォメーションコーナー横の看板を見てみよう!", keyword:"ャ" },
  { id:3, q:"蔵王ジャンプ台で髙梨沙羅選手が出した最大の飛距離は次のうちどれでしょう?", choices:["101.0m","103.5m","106.0m","108.5m"], correct:2, hint:"ジャンプ台に設置されている看板を見てみよう!", keyword:"ェ" },
  { id:4, q:"選手が着地する場所(ランディングバーン)の最大斜度は何度でしょうか?", choices:["35 度","36.5 度","38 度","39.5 度"], correct:1, hint:"受付で配ったパンフレットを見よう!", keyword:"シ" },
  { id:5, q:"8 月にここで開催されたサマージャンプ大会で第 2 位となった内藤智文選手の勤務先はどちらでしょうか?", choices:["蔵王温泉宿泊施設","蔵王温泉スキー場","山形県職員","山形市職員"], correct:3, hint:"受付テントに掲示してある新聞のコピーを見てみよう!", keyword:"ン" },
];

// ===== DOM 参照 =====
const questionEl = document.getElementById('question');
const choicesEl  = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const keywordEl  = document.getElementById('keyword-block');
const hintBtn    = document.getElementById('hint-btn');
const hintPopup  = document.getElementById('hint-popup');
const hintText   = document.getElementById('hint-text');
const closeHint  = document.getElementById('close-hint');

// ===== URL から問題番号を取得 =====
function getIndexFromURL(){
  const params = new URLSearchParams(location.search);
  let n = params.get('q') || params.get('id');
  if(n && /^\d+$/.test(n)){
    const idx = parseInt(n,10) - 1;
    if(idx>=0 && idx < QUIZ.length) return idx;
  }
  const h = (location.hash || '').replace(/^#q?/i,'');
  if(h && /^\d+$/.test(h)){
    const idx = parseInt(h,10) - 1;
    if(idx>=0 && idx < QUIZ.length) return idx;
  }
  return 0;
}
let currentIndex = getIndexFromURL();

// ===== 表示更新 =====
function render(){
  const data = QUIZ[currentIndex];
  closeHintPopup(); // 問題切替でヒント自動で閉じる
  feedbackEl.textContent = '';
  feedbackEl.classList.remove('success-text');
  keywordEl.classList.add('hidden');
  keywordEl.textContent = '';

  questionEl.textContent = data.q;
  choicesEl.innerHTML = '';
  data.choices.forEach((label, i)=>{
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn choice';
    btn.textContent = label;
    btn.addEventListener('click', ()=> checkAnswer(i));
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });

  hintText.textContent = data.hint;
}

// ===== 判定 =====
function checkAnswer(i){
  const data = QUIZ[currentIndex];
  if(i === data.correct){
    feedbackEl.textContent = 'Success!';
    feedbackEl.classList.add('success-text');
    keywordEl.textContent  = `獲得キーワード：${data.keyword}`;
    keywordEl.classList.remove('hidden');
    // 選択肢を無効化
    Array.from(document.querySelectorAll('.choice')).forEach(b=> b.disabled = true);
  }else{
    feedbackEl.textContent = '残念...もう一度解いてみよう！';
    feedbackEl.classList.remove('success-text');
  }
}

// ===== ヒントの開閉 =====
function openHintPopup(){
  hintPopup.classList.remove('hidden');
}
function closeHintPopup(){
  hintPopup.classList.add('hidden');
}
hintBtn.addEventListener('click', openHintPopup);
closeHint.addEventListener('click', closeHintPopup);
hintPopup.addEventListener('click', (e)=>{ if(e.target === hintPopup) closeHintPopup(); });

// URL変化に追従
window.addEventListener('popstate', ()=>{ currentIndex = getIndexFromURL(); render(); });
window.addEventListener('hashchange', ()=>{ currentIndex = getIndexFromURL(); render(); });

// 初期表示
render();
