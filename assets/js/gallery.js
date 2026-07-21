/* =================================================================
   GALERIE DES PROJETS & LIGHTBOX
   -----------------------------------------------------------------
   Construit les vignettes, le bouton "Code source" et la visionneuse
   plein écran à partir de assets/js/config.js.
   Navigation : flèches, points, clavier (gauche/droite/Échap).
   ================================================================= */
$(function(){
  let lbList = [], lbIndex = 0, lbTitle = '';

  function buildGalleries(){
    $('.thumb[data-project]').each(function(){
      const key = $(this).attr('data-project');
      const imgs = projectImages[key] || [];
      const $thumb = $(this), $card = $thumb.closest('.card-x');
      const title = $card.find('h3').text();

      /* --- bouton "Code source" si un lien GitHub est renseigné --- */
      $card.find('.repo-link').remove();
      const repo = (projectLinks[key] || '').trim();
      if(repo){
        const label = (lang === 'fr') ? 'Code source' : 'Source code';
        $card.find('.body').append(
          '<a class="repo-link" href="'+repo+'" target="_blank" rel="noopener">'+
          '<svg class="ic"><use href="#ic-github"/></svg>'+label+'</a>'
        );
      }

      $thumb.find('.thumb-img,.count-badge,.zoom-hint').remove();
      $card.find('.gallery-strip').remove();
      $thumb.removeClass('has-img').off('click.gal');
      if(imgs.length === 0) return;                 // garde l'illustration SVG
      $thumb.addClass('has-img');
      $thumb.append('<img class="thumb-img" src="'+imgs[0]+'" alt="'+title+'">');
      if(imgs.length > 1) $thumb.append('<span class="count-badge"><svg class="ic"><use href="#ic-images"/></svg>'+imgs.length+'</span>');
      $thumb.append('<span class="zoom-hint"><span class="zoom-circle"><svg class="ic"><use href="#ic-zoom"/></svg></span></span>');
      $thumb.on('click.gal', function(){ openLightbox(imgs, 0, title); });
      if(imgs.length > 1){
        const strip = $('<div class="gallery-strip"></div>');
        imgs.forEach(function(src, i){
          const t = $('<img src="'+src+'" alt="'+title+' '+(i+1)+'">');
          t.on('click', function(e){ e.stopPropagation(); openLightbox(imgs, i, title); });
          strip.append(t);
        });
        $card.find('.body').append(strip);
      }
    });
  }

  function openLightbox(list, index, title){
    lbList = list; lbIndex = index; lbTitle = title;
    renderLightbox(); $('#lightbox').addClass('open'); document.body.style.overflow='hidden';
  }
  function renderLightbox(){
    $('#lbImg').attr('src', lbList[lbIndex]).attr('alt', lbTitle);
    $('#lbTitle').text(lbTitle);
    $('#lbCounter').text((lbIndex+1)+' / '+lbList.length);
    const showNav = lbList.length > 1;
    $('#lbPrev,#lbNext').toggle(showNav);
    const dots = $('#lbDots').empty();
    if(showNav) lbList.forEach(function(_, i){
      const d = $('<span'+(i===lbIndex?' class="active"':'')+'></span>');
      d.on('click', function(){ lbIndex=i; renderLightbox(); });
      dots.append(d);
    });
  }
  function closeLightbox(){ $('#lightbox').removeClass('open'); document.body.style.overflow=''; }
  function nav(dir){ lbIndex = (lbIndex + dir + lbList.length) % lbList.length; renderLightbox(); }

  $('#lbClose').on('click', closeLightbox);
  $('#lbPrev').on('click', function(){ nav(-1); });
  $('#lbNext').on('click', function(){ nav(1); });
  $('#lightbox').on('click', function(e){ if(e.target === this) closeLightbox(); });
  $(document).on('keydown', function(e){
    if(!$('#lightbox').hasClass('open')) return;
    if(e.key === 'Escape') closeLightbox();
    else if(e.key === 'ArrowLeft'  && lbList.length>1) nav(-1);
    else if(e.key === 'ArrowRight' && lbList.length>1) nav(1);
  });

  buildGalleries();
  window.rebuildGalleries = buildGalleries;   // rappelé au changement de langue
});
