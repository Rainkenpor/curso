var glob_alto=$$(window).height();

$$(window).resize(function() {
	vconsole('alto actual:'+$$(window).height());
	if (glob_alto>$$(window).height()){
		$$('.toolbar-inferior').hide();
	}else{
		$$('.toolbar-inferior').show();
	}
});
