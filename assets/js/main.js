/* =================================================================
   COMPORTEMENTS GÉNÉRAUX
   -----------------------------------------------------------------
   - repli du menu mobile si Bootstrap n'est pas disponible
   - bouton de bascule FR / EN
   - défilement fluide vers les sections
   - apparition progressive des blocs au défilement
   ================================================================= */
$(function(){
  /* Repli : si Bootstrap n'est pas chargé (CDN bloqué), le menu
     mobile reste fonctionnel grâce à un basculement manuel. */
  if(!window.bootstrap){
    $('.navbar-toggler').on('click', function(e){
      e.preventDefault();
      const nav = document.getElementById('navMenu');
      if(nav){
        nav.classList.toggle('show');
        $(this).attr('aria-expanded', nav.classList.contains('show'));
      }
    });
    /* .collapse sans Bootstrap : on rétablit l'affichage attendu */
    $('<style>.collapse:not(.show){display:none}.collapse.show{display:block}'+
      '@media(min-width:992px){.navbar-collapse{display:flex!important}}</style>').appendTo('head');
  }

  /* Toggle langue */
  $('#langBtn').on('click', function(){ lang = lang === 'fr' ? 'en' : 'fr'; applyLang(); });

  /* Défilement fluide + fermeture menu mobile */
  $('a.nav-link, .btn-x[href^="#"]').on('click', function(e){
    const href = $(this).attr('href');
    if(href && href.startsWith('#') && href.length > 1){
      e.preventDefault();
      const t = $(href);
      if(t.length){ $('html,body').animate({scrollTop: t.offset().top - 70}, 500); }
      const nav = document.getElementById('navMenu');
      if(nav && nav.classList.contains('show')){
        if(window.bootstrap && bootstrap.Collapse.getInstance(nav)) bootstrap.Collapse.getInstance(nav).hide();
        else nav.classList.remove('show');
      }
    }
  });

  /* Animations d'apparition au défilement (IntersectionObserver) */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){ $('.reveal').addClass('in'); }
  else if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach((en,i)=>{ if(en.isIntersecting){ setTimeout(()=>en.target.classList.add('in'), (i%3)*80); obs.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    $('.reveal').each(function(){ obs.observe(this); });
  } else { $('.reveal').addClass('in'); }
});
