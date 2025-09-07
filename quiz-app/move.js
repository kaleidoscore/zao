document.addEventListener('DOMContentLoaded',()=>{
  const box=document.getElementById('quiz-box');
  if(box){box.style.opacity=0;requestAnimationFrame(()=>{box.style.transition='opacity .5s';box.style.opacity=1;});}
});