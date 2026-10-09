/* =========================================================
   AEVORA — shared behavior for digital.html & photography.html
   ========================================================= */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      links.classList.toggle('open');
    });
  }

  // Contact form -> Formspree
  const form = document.getElementById('contactForm');
  if(form){
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      msg.textContent = 'Sending...';
      try{
        const res = await fetch(form.action, {method:'POST', body:new FormData(form), headers:{'Accept':'application/json'}});
        if(res.ok){ msg.textContent = "Thanks — we'll get back to you soon."; form.reset(); }
        else { msg.textContent = 'Something went wrong — try again.'; }
      } catch(err){ msg.textContent = 'Something went wrong — try again.'; }
    });
  }

  // Portfolio masonry — auto-arranges whatever is listed in PORTFOLIO_IMAGES below
  const grid = document.getElementById('portfolioGrid');
  if(grid && typeof PORTFOLIO_IMAGES !== 'undefined'){
    if(PORTFOLIO_IMAGES.length === 0){
      grid.innerHTML = '<div class="empty-note">No photos added yet — see the comment at the top of photography.html for how to add your work.</div>';
    } else {
      grid.innerHTML = '';
      PORTFOLIO_IMAGES.forEach(function(file){
        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = 'portfolio/' + file;
        img.alt = file;
        img.loading = 'lazy';
        fig.appendChild(img);
        grid.appendChild(fig);
      });
    }
  }
});
