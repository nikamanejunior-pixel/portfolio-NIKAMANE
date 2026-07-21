/* =================================================================
   THÈME CLAIR / SOMBRE
   -----------------------------------------------------------------
   Le thème sombre est celui par défaut. Au premier passage, le site
   suit la préférence du système du visiteur ; son choix est ensuite
   mémorisé (sauf navigation privée, où l'on ignore silencieusement).
   ================================================================= */
$(function(){
  /* Le thème sombre est celui par défaut. Le choix du visiteur est
     conservé d'une visite à l'autre lorsque le navigateur l'autorise. */
  function readSaved(){
    try{ return localStorage.getItem('theme'); }catch(e){ return null; }
  }
  function saveTheme(t){
    try{ localStorage.setItem('theme', t); }catch(e){ /* navigation privée : on ignore */ }
  }
  function applyTheme(t){
    if(t === 'light') document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
    /* icône : soleil quand on est en sombre (= passer au clair), lune sinon */
    $('#themeIcon use').attr('href', t === 'light' ? '#ic-moon' : '#ic-sun');
    /* l'animation du hero relit les couleurs du thème */
    if(window.refreshNetColors) window.refreshNetColors();
  }

  let theme = readSaved();
  if(!theme){
    /* aucun choix enregistré : on suit la préférence du système */
    theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  applyTheme(theme);

  $('#themeBtn').on('click', function(){
    theme = (theme === 'light') ? 'dark' : 'light';
    /* transition douce entre les deux thèmes */
    $('body').css('transition','background-color .3s ease, color .3s ease');
    applyTheme(theme);
    saveTheme(theme);
  });
});
