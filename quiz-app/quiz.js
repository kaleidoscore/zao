const QUIZ = [
  {id:1,q:"蔵王ジャンプ台が建設されたのはいつでしょうか?",choices:["1976 年","1978 年","1980 年","1982 年"],correct:1,hint:"受付で配ったパンフレットを見よう!",keyword:"ツ"},
  {id:2,q:"ジャンプ台の下から上までの標高差と近い高さの建物は次のうちどれでしょうか?",choices:["山形市役所","山形県庁","上山スカイタワー","霞城セントラル"],correct:3,hint:"インフォメーションコーナー横の看板を見てみよう!",keyword:"ャ"},
  {id:3,q:"蔵王ジャンプ台で髙梨沙羅選手が出した最大の飛距離は次のうちどれでしょう?",choices:["101.0m","103.5m","106.0m","108.5m"],correct:2,hint:"ジャンプ台に設置されている看板を見てみよう!",keyword:"ェ"},
  {id:4,q:"選手が着地する場所(ランディングバーン)の最大斜度は何度でしょうか?",choices:["35 度","36.5 度","38 度","39.5 度"],correct:1,hint:"受付で配ったパンフレットを見よう!",keyword:"シ"},
  {id:5,q:"8 月にここで開催されたサマージャンプ大会で第 2 位となった内藤智文選手の勤務先はどちらでしょうか?",choices:["蔵王温泉宿泊施設","蔵王温泉スキー場","山形県職員","山形市職員"],correct:3,hint:"受付テントに掲示してある新聞のコピーを見てみよう!",keyword:"ン"}
];

const qEl = document.getElementById('question'),
      cEl = document.getElementById('choices'),
      fEl = document.getElementById('feedback'),
      kEl = document.getElementById('keyword-block');

function getIndex() {
  const p = new URLSearchParams(location.search);
  let n = p.get('q');
  if (n && /^\d+$/.test(n)) {
    let i = parseInt(n) - 1;
    if (i >= 0 && i < QUIZ.length) return i;
  }
  const h = (location.hash || '').replace(/^#q?/i, '');
  if (h && /^\d+$/.test(h)) {
    let i = parseInt(h) - 1;
    if (i >= 0 && i < QUIZ.length) return i;
  }
  return 0;
}

let idx = getIndex();

function render() {
  const d = QUIZ[idx];
  closeHint(); // 問題切り替え時にヒント閉じる
  fEl.textContent = '';
  fEl.classList.remove('success-text');
  kEl.classList.add('hidden');
  kEl.textContent = '';
  qEl.textContent = d.q;
  cEl.innerHTML = '';
  d.choices.forEach((lab, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn choice';
    b.textContent = lab;
    b.onclick = () => check(i);
    li.appendChild(b);
    cEl.appendChild(li);
  });
}

// 解答チェック
function check(i) {
  const d = QUIZ[idx];
  const choiceButtons = document.querySelectorAll('.choice');

  if (i === d.correct) {
    fEl.textContent = 'Success!';
    fEl.classList.add('success-text');
    kEl.textContent = `獲得キーワード：${d.keyword}`;
    kEl.classList.remove('hidden');
    choiceButtons.forEach(b => b.disabled = true);
  } else {
    fEl.textContent = '残念...もう一度解いてみよう！';
    fEl.classList.remove('success-text');
    const wrongBtn = choiceButtons[i];
    wrongBtn.classList.add('wrong');
    wrongBtn.disabled = true;
  }
}

// --- ヒント処理 ---
function openHint() {
  const d = QUIZ[idx];
  document.getElementById("quiz-hint-text").textContent = d.hint;
  document.getElementById("quiz-hint-popup").classList.remove("hidden");
}
function closeHint() {
  document.getElementById("quiz-hint-popup").classList.add("hidden");
}

document.getElementById("hint-btn").onclick = openHint;
document.getElementById("quiz-close-hint").onclick = closeHint;
document.getElementById("quiz-hint-popup").addEventListener("click", e => {
  if (e.target.id === "quiz-hint-popup") closeHint();
});

// URL変更で問題切り替え
window.addEventListener('hashchange', () => { idx = getIndex(); render(); });

// 初期表示
render();
