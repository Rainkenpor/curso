var isMaterial = Framework7.prototype.device.ios === false;
var isIos = Framework7.prototype.device.ios === true;


Template7.global = {
  material: isMaterial,
  ios: isIos,
};

// for(key in localStorage) {localStorage.removeItem(key);}
Template7.registerHelper('if_compare', function (a, operator, b, options) {
    var match = false;

    if (
        (operator === '==' && (a == b)) ||
        (operator === '===' && (a === b)) ||
        (operator === '!=' && (a != b)) ||
        (operator === '>' && (a > b)) ||
        (operator === '<' && (a < b)) ||
        (operator === '>=' && (a >= b)) ||
        (operator === '<=' && (a <= b))||
        (operator === '||' && (a || b)) ||
        (operator === '&&' && (a && b))
        ) {
        match = true;
    }
    if (match) return options.fn(this);
    else return options.inverse(this);
});


if (!isIos) {
// vconsole("android");
  $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
  $$('.view .navbar').prependTo('.view .page');
}

// Initialize app
var myApp = new Framework7({
tapHold: true,
  material: isIos? false : true,
  template7Pages: true,
  precompileTemplates: true,
  swipePanel: 'left',
  swipePanelActiveArea: '30',
  swipeBackPage: true,
  animateNavBackIcon: true,
  pushState: !!Framework7.prototype.device.os,
});

function vconsole(txt){
  $$('#login_console').append('<br>'+txt)
  $$('.swiper-slide[name="inicio-log"]').append('<br>'+txt);
  console.log(txt);
  // $$("#app-status-ul").append('<br>'+txt);
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    uniqueHistory:true,
    SwipeBackPage:true,

});


 // Init slider and store its instance in mySwiper variable
  var mySwiper = myApp.swiper('.swiper-container-menu', {
    pagination:'.swiper-pagination',
  });
