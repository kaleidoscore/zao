document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('quiz-box');
  if(!box) return;
  box.style.opacity = 0;
  requestAnimationFrame(()=>{
    box.style.transition = 'opacity .5s ease';
    box.style.opacity = 1;
  });
});
