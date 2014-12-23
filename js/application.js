/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 26-11-2014
Cliente: Cambridge University (Out & About)
***********************/


/**********************
VARIABLES
**********************/
var pag_slider=1;
var total_slider=0;
var slider;
var touch_gall=0;
var w_container=0;


// Player Youtube Asíncrono
/*var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
*/

//Eventos para dispositivos móviles
var ua = navigator.userAgent,
event = (ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) ? "touchstart" : "click";
var device='none';
if(ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)){
	device='yes';
}

jQuery.noConflict();


jQuery(window).load(function(){

	
});

jQuery(document).ready(function(){
	
	//Reiniciar Scroll a 0
	/*jQuery('body').scrollTo( "0px", 0,function(){
		//Pillar anclas de la url si las hay 
		var hash = window.location.hash.substring(1);
		if(hash!=""){
			//jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
		}
	});*/
	
	
	//Cargar librería Lightbox
	jQuery(".boxer").boxer();
	
	jQuery(window).scroll(control_scroll);
	
	//Obtenemos altura y anchura del navegador
	var h_win=jQuery('#wrapper').height();
	var w_win=window.innerWidth;
	
	//Máscara wrapper
	jQuery('#mask_wrapper').css({width:w_win,height:h_win});
	
	//Ajustamos elementos para resoluciones superiores a 1024px
	if(w_win>1024){
		//Ajustamos bg blanco izquierda
		jQuery('.bg_space').css({height:h_win});	
		//Ajustamos slider izquierda
		var mar_despl=(w_win-1024)/2;
		jQuery('#slider').css({width:(1024+mar_despl),marginLeft:-mar_despl});
		jQuery('#cover-top').css({width:(1024+mar_despl),marginLeft:-mar_despl});
		jQuery('.cont_gall').css({width:(1024+mar_despl)});	
		//Ajustamos el pie
		jQuery('#pie_rrss').css({width:(1024+mar_despl)});	
		jQuery('#pie_info').css({width:(1024+mar_despl)});	
		
	}else{
		jQuery('#slider').css({width:w_win,marginLeft:0});	
		jQuery('#cover-top').css({width:w_win,marginLeft:0});	
		jQuery('.cont_gall').css({width:w_win});	
		//Ajustamos el pie
		jQuery('#pie_rrss').css({width:w_win});	
		jQuery('#pie_info').css({width:w_win});	
	}
	
	//Obtenemos ancho clase container y ajustamos flecha up
	w_container=jQuery('#wrapper').width();
	jQuery('.up-window').css({marginLeft:(w_container-45)});
	
	
	//Comprobar que solo se carga en la home
	if ( jQuery("#slider").is(":visible") ) {
		
	//Ajustamos los bloques contenidos slider 
	total_slider=jQuery("#scroll_info div[id^='info_']").length;
	var width_slider=jQuery("#content_slider").width();
	var aux=total_slider*width_slider;
	jQuery("#scroll_info").css('width',(total_slider*width_slider));
	jQuery(".info_box").css('width',(width_slider));
		
	//Galería de la Home
	slider=jQuery('.bxslider').bxSlider({
						  pager: false,
						  infiniteLoop: true,
						  useCSS: false,
						  /*auto: true,*/
					  	  autoHover: true,
						  pause: 5000,
						  onSlideNext: function(slideElement, oldIndex, newIndex){
							 if(device=='yes' && (touch_gall!=1)){
									if(newIndex!=(pag_slider+1)){
										pag_slider=parseInt(newIndex+1);
										jQuery('#content_slider').stop().clearQueue().scrollTo(jQuery('#info_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
										//pintamos el bullet correspondiente
										jQuery('#bullet_slider a').removeClass('active');
										jQuery('#bullet_slider a[rel='+pag_slider+']').addClass('active');
									}
									
							  }else{
							  	//Versión escritorio
								if(newIndex!=(pag_slider+1)){
									pag_slider=parseInt(newIndex+1);
									jQuery('#content_slider').stop().clearQueue().scrollTo(jQuery('#info_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
									//pintamos el bullet correspondiente
									jQuery('#bullet_slider a').removeClass('active');
									jQuery('#bullet_slider a[rel='+pag_slider+']').addClass('active');	
								}
							  }
							  touch_gall=0; 	
						  },
						  onSlidePrev: function(slideElement, oldIndex, newIndex){
						 if(device=='yes' && (touch_gall!=1)){
								if(pag_slider!=(newIndex)){
									pag_slider=parseInt(newIndex+1);
									jQuery('#content_slider').stop().clearQueue().scrollTo(jQuery('#info_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
									//pintamos el bullet correspondiente
									jQuery('#bullet_slider a').removeClass('active');
									jQuery('#bullet_slider a[rel='+pag_slider+']').addClass('active');
								}
							}else{
							//Version escritorio
								if(pag_slider!=(newIndex)){
									pag_slider=parseInt(newIndex+1);
									jQuery('#content_slider').stop().clearQueue().scrollTo(jQuery('#info_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
									//pintamos el bullet correspondiente
									jQuery('#bullet_slider a').removeClass('active');
									jQuery('#bullet_slider a[rel='+pag_slider+']').addClass('active');	
								}
							
							}
							touch_gall=0;
						  },
						  onSliderLoad: function(){
							
						  },
						});
	}
	
		//Avanzar a la siguiente pantalla slider
	jQuery(document).on("click",".next_slider", function(e) {
		e.preventDefault();
		touch_gall=1;
		slider.goToNextSlide();
		var current = slider.getCurrentSlide();
		pag_slider=parseInt(current+1);
		//Movemos contenidos
		jQuery('#content_slider').stop().clearQueue().scrollTo(jQuery('#info_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
		//pintamos el bullet correspondiente
		jQuery('#bullet_slider a').removeClass('active');
		jQuery('#bullet_slider a[rel='+pag_slider+']').addClass('active');
	});	
		
	//Retroceder a la siguiente pantalla del slider 
	jQuery(document).on("click",".prev_slider", function(e) {
		e.preventDefault();
			touch_gall=1;
			slider.goToPrevSlide();
			var current = slider.getCurrentSlide();
			pag_slider=parseInt(current+1);
			jQuery('#content_slider').stop().clearQueue().scrollTo(jQuery('#info_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
			//pintamos el bullet correspondiente
			jQuery('#bullet_slider a').removeClass('active');
			jQuery('#bullet_slider a[rel='+pag_slider+']').addClass('active');
	});
	
	//Cuando pulsas sobre uno de los bullets del slider de la home
	jQuery(document).on("click","#bullet_slider a", function(e) {
		e.preventDefault();
			var pag= jQuery(this).attr('rel');
			//Añadimos color al bullet 
			jQuery('#bullet_slider a').removeClass('active');
			jQuery(this).addClass('active');
			pag=parseInt(pag);
			touch_gall=1;
			slider.goToSlide(pag-1);
			jQuery('#content_slider').stop().clearQueue().scrollTo(jQuery('#info_'+pag),400,{axis:'x',easing:'easeInOutExpo'});
			pag_slider=pag;
	});
	
	//Cambiar Profesor-Alumno-Componentes de producto
	jQuery(document).on("click","#cover_componentes ul li a", function(e) {
		e.preventDefault();
		 var link_act= jQuery(this).attr('id');
		 var link_ant= jQuery('#cover_componentes ul li a.active').attr('id');
		 console.log(link_act+'---'+link_ant);
		 if(!jQuery(this).hasClass('active')) {
				jQuery('#cover_componentes ul li a').removeClass('active');
				jQuery(this).addClass('active');
				switch (link_ant){
					case 'comp_teacher':
						jQuery('#profesores').stop().clearQueue().fadeOut(800,function(){
							if(link_act=='comp_student'){
								jQuery('#alumnos').stop().clearQueue().fadeIn(800);
							}else{
								jQuery('#digital').stop().clearQueue().fadeIn(800);
							}
						});
					break;
					case 'comp_student':
						jQuery('#alumnos').stop().clearQueue().fadeOut(800,function(){
							if(link_act=='comp_teacher'){
								jQuery('#alumnos').stop().clearQueue().fadeIn(800);
							}else{
								jQuery('#digital').stop().clearQueue().fadeIn(800);
							}
						});
					break;
					case 'comp_digitales':
						jQuery('#digital').stop().clearQueue().fadeOut(800,function(){
							if(link_act=='comp_student'){
								jQuery('#alumnos').stop().clearQueue().fadeIn(800);
							}else{
								jQuery('#profesores').stop().clearQueue().fadeIn(800);
							}
						});
					break;
				}
		 }
	});
	
	//Subir al top de la ventana
	jQuery(document).on("click",".up-window", function(e) {
		e.preventDefault();
		jQuery("html, body").stop().clearQueue().animate({scrollTop:0}, '800', 'easeInOutExpo');
		
	});
	
	
	//Cambiar de secciones Videos | Fotos | Tips & Tricks
	jQuery(document).on("click","#menu_fotos_videos ul li a", function(e) {
		e.preventDefault();
		//Obtenemos variables actual y a la que queremos acceder 
		var actual_box=jQuery('#menu_fotos_videos ul li a.active').attr('rel');
		var next_box=jQuery(this).attr('rel');
		//Cambiamos activo en el menu
		jQuery('#menu_fotos_videos ul li a').removeClass('active');
		jQuery(this).addClass('active');
		switch (next_box){
			case 'videos':
				if(actual_box!=next_box){
					switch (actual_box){
						case 'fotos':
							jQuery('#block_fotos').fadeOut(600,function(){
								jQuery('#block_videos').fadeIn(600);
							});
						break;
						case 'tips':
							jQuery('#block_tips').fadeOut(600,function(){
								jQuery('#block_videos').fadeIn(600);
							});
						break;
					}
				}
			break;
			case 'fotos':
				if(actual_box!=next_box){
					switch (actual_box){
						case 'videos':
							jQuery('#block_videos').fadeOut(600,function(){
								jQuery('#block_fotos').fadeIn(600);
							});
						break;
						case 'tips':
							jQuery('#block_tips').fadeOut(600,function(){
								jQuery('#block_fotos').fadeIn(600);
							});
						break;
					}
				}
			break;
			case 'tips':
				if(actual_box!=next_box){
					switch (actual_box){
						case 'videos':
							jQuery('#block_videos').fadeOut(600,function(){
								jQuery('#block_tips').fadeIn(600);
							});
						break;
						case 'fotos':
							jQuery('#block_fotos').fadeOut(600,function(){
								jQuery('#block_tips').fadeIn(600);
							});
						break;
					}
				}
			break;
		}
	});
	
	//Cambiar niveles videos 
	jQuery(document).on("click","#list_videos .menu_levels li a", function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass('active')) {
			var actual_box=jQuery('#list_videos .menu_levels li a.active').attr('rel');
			var next_box=jQuery(this).attr('rel');
			jQuery('#list_videos .menu_levels li a').removeClass('active');
			jQuery(this).addClass('active');
			//Cerramos el bloque actual y mostramos el seleccionado
			jQuery('#list_videos #level_'+actual_box).fadeOut(600,function(){
				jQuery('#list_videos #level_'+next_box).fadeIn(600);	
			});
		}
		
	});
	
	//Cambiar niveles tips and tricks 
	jQuery(document).on("click","#list_fotos .menu_levels li a", function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass('active')) {
			var actual_box=jQuery('#list_fotos .menu_levels li a.active').attr('rel');
			var next_box=jQuery(this).attr('rel');
			jQuery('#list_fotos .menu_levels li a').removeClass('active');
			jQuery(this).addClass('active');
			//Cerramos el bloque actual y mostramos el seleccionado
			jQuery('#list_fotos #level_'+actual_box).fadeOut(600,function(){
				jQuery('#list_fotos #level_'+next_box).fadeIn(600);	
			});
		}
		
	});
	
	//Cambiar niveles tips and tricks 
	jQuery(document).on("click","#list_tips .menu_levels li a", function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass('active')) {
			var actual_box=jQuery('#list_tips .menu_levels li a.active').attr('rel');
			var next_box=jQuery(this).attr('rel');
			jQuery('#list_tips .menu_levels li a').removeClass('active');
			jQuery(this).addClass('active');
			//Cerramos el bloque actual y mostramos el seleccionado
			jQuery('#list_tips #level_'+actual_box).fadeOut(600,function(){
				jQuery('#list_tips #level_'+next_box).fadeIn(600);	
			});
		}
		
	});
								
	
	//Evento para capturar el resize de la ventana 
	jQuery( window ).resize(function() {
		
		//Obtenemos altura y anchura del navegador
		var h_win=jQuery(document).height();
		var w_win=window.innerWidth;
		
		//Máscara wrapper
	   jQuery('#mask_wrapper').css({width:w_win,height:h_win});
		
		//Ajustamos elementos para resoluciones superiores a 1024px
		if(w_win>1024){
			//Ajustamos slider izquierda
			var mar_despl=(w_win-1024)/2;
			jQuery('#slider').css({width:(1024+mar_despl),marginLeft:-mar_despl});	
			jQuery('#cover-top').css({width:(1024+mar_despl),marginLeft:-mar_despl});	
			jQuery('.cont_gall').css({width:(1024+mar_despl)});	
			//Ajustamos el pie
			jQuery('#pie_rrss').css({width:(1024+mar_despl)});	
			jQuery('#pie_info').css({width:(1024+mar_despl)});	
			
		}else{
			jQuery('#slider').css({width:w_win,marginLeft:0});
			jQuery('#cover-top').css({width:w_win,marginLeft:0});
			jQuery('.cont_gall').css({width:w_win});	
			//Ajustamos el pie
			jQuery('#pie_rrss').css({width:w_win});	
			jQuery('#pie_info').css({width:w_win});	
		}
		
		//Obtenemos ancho clase container y ajustamos flecha up
		w_container=jQuery('#wrapper').width();
		jQuery('.up-window').css({marginLeft:(w_container-45)});

	});
	
	
});


/*************************
FUNCIONES JAVASCRIPT
**************************/

//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll	
  var scrollAmount = jQuery(window).scrollTop();
  var h_foot=jQuery('#pie').height();
  
  //Aparece flecha top
  if(scrollAmount>300){
		if (!jQuery('.up-window').is(":visible") ) {
			jQuery('.up-window').stop().clearQueue().fadeIn(400);
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot + 20) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
				jQuery('.up-window').css({bottom:(despl)});
		   }else{
				jQuery('.up-window').css({bottom:0});
		   }  
		}else{
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
				jQuery('.up-window').css({bottom:(despl)});
		   }else{
				jQuery('.up-window').css({bottom:0});
		   } 
		}
   }else{
   		jQuery('.up-window').stop().clearQueue().fadeOut(400);
   }
   //jQuery('.marcador').html(scrollAmount);
}

// autoplay video Youtube
function onPlayerReady(event) {
	if(device!='yes'){
        event.target.playVideo();
	}
}

// when video ends Youtube
function onPlayerStateChange(event) {        
   if(event.data === 0) {            
           //Cuando acaba el video
    }
}

