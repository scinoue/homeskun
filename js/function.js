// HOME JavaScript Document

$(function () {
	addBrowserClass();
	// fadeUpScroll();
	insert();
	smart_drawer();
	scroll();
});

function addBrowserClass() {
	var __add = function (name, ver) {
		if (document.documentElement.className) {
			document.documentElement.className += ' ';
		}
		document.documentElement.className += name + (ver != '' ? ' ' + name + (ver * 1).toString().replace('.', '_') : '');
	}
	var userAgent = window.navigator.userAgent.toLowerCase();
	var appVersion = window.navigator.appVersion.toLowerCase();
	if (get = userAgent.match(/msie (\d+(\.\d+)?)/i)) {
		__add('ie', get[1]);
	} else if (get = userAgent.match(/Trident.+rv\:(\d+(\.\d+)?)/i)) {
		__add('ie', get[1]);
	} else if (get = userAgent.match(/chrome\/(\d+(\.\d+)?)/i)) {
		__add('chrome', get[1]);
	} else if (get = userAgent.match(/firefox\/(\d+(\.\d+)?)/i)) {
		__add('firefox', get[1]);
	} else if (get = userAgent.match(/opera\/(\d+(\.\d+)?)/i)) {
		__add('opera', get[1]);
	} else if (get = userAgent.match(/safari\/(\d+(\.\d+)?)/i)) {
		__add('safari', get[1]);
	}

	// ios(iphone, ipad, ipod), android
	if (get = userAgent.match(/iPhone OS (\d+(\.\d+)?)/i)) {
		__add('ios', get[1]);
	}
	if (get = userAgent.match(/iPhone;/i)) {
		__add('iphone', '');
	} else if (get = userAgent.match(/iPod;/i)) {
		__add('ipod', '');
	} else if (get = userAgent.match(/iPad;/i)) {
		__add('ipad', '');
	} else if (get = userAgent.match(/Android (\d+(\.\d+)?)/i)) {
		__add('android', get[1]);
	}
}

// function fadeUpScroll() {
// 	$(window).scroll(function () {
// 		$('.fadeInUp').each(function () {
// 			var position = $(this).offset().top;
// 			var scroll = $(window).scrollTop();
// 			var windowHeight = $(window).height();
// 			if (scroll > position - windowHeight + 50) {
// 				$(this).addClass('active');
// 			}
// 		});
// 	});
// }

function insert() {
	var headSns = $('header .sns').clone(false);
  $('.ft-inside').append(headSns);
	
	// var hdbtn = $('.hd-def .btn').clone(false);
	// $('.sd-menu .lower').append(hdbtn);

	var headgnav = $('.hd-def .gnav ul').clone(false);
	$('.sd-menu .lower').prepend(headgnav);
}

function smart_drawer() {
	// Smart Drawer
	var scrollY;
	$("body").append('<div id="sd-overlay"></div>');
	var sd = $(".sd-menu"),
		overlay = $("#sd-overlay");
	//menu = $(".drawer-trigger"), //.drawer-triggerにopen追加　ページ内anchor時は使用不可
	$(".sd-trigger").click(function (e) {
		scrollY = $(window).scrollTop();
		$("body").css({
			//position: "fixed",ページ内	anchor時はコメントアウト
			top: -scrollY
		});
		sd.addClass("block");
		overlay.addClass("block");
		// overlay.toggleClass("block"); //addClassからtoggleClass変更
		//$(this).toggleClass('open'); //.drawer-triggerにopen追加　ページ内anchor時は使用不可
		e.preventDefault();
		return false;
	});
	$(".sd-menu .close, #sd-overlay, .sd-menu a[href^='#']").click(function (e) {
		$("body").attr("style", "");
		//$("html, body").prop({scrollTop: scrollY});ページ内	anchor時はコメントアウト
		sd.removeClass("block");
		overlay.removeClass("block");
		//menu.removeClass("open"); ページ内anchor時は使用不可
		e.preventDefault();
		return false;
	});

	// $('.sd-menu .btn').click(function () {
	// 	location.reload();
	// });
}

function scroll() {
	//URLのハッシュ値を取得
	var urlHash = location.hash;
	//ハッシュ値があればページ内スクロール 遷移先ページ内スクロール
	// if (urlHash) {
	// 	//スクロールを0に戻しておく
	// 	jQuery('body,html').stop().scrollTop(0); //アンカーリンク以外はコメントアウト
	// 	jQuery('body,html').animate({
	// 		scrollTop: 0
	// 	}, '1');
	// 	setTimeout(function () {
	// 		//ロード時の処理を待ち、時間差でスクロール実行
	// 		scrollToAnker(urlHash);
	// 	}, 100);
	// }
	//通常のクリック時
	// jQuery("a").click(function () {
	jQuery("a").not(".sns a").click(function () { //シンタックスエラー回避 .not()追加
		var href = jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? "body" : href);
		var position = target.offset().top;
		var w = jQuery(window).width();
		var x = 2500; //任意の幅
		if (w <= x) {
			var headerHight = jQuery("header").outerHeight();
			var position = target.offset().top - headerHight;
		}
		jQuery("html, body").animate({
			scrollTop: position
		}, 500, "swing");
		return false;
	});
	// 関数：スムーススクロール
	// 指定したアンカー(#ID)へアニメーションでスクロール
	function scrollToAnker(hash) {
		var target = jQuery(hash);
		var position = target.offset().top;
		var w = jQuery(window).width();
		var x = 2500; //任意の幅
		if (w <= x) {
			var headerHight = jQuery("header").outerHeight();
			var position = target.offset().top - headerHight;
		}
		console.log('position');
		jQuery('body,html').stop().animate({
			scrollTop: position
		}, 500);
	}
	//ページトップ
	var pagetop = jQuery('.pagetop');
	pagetop.click(function () {
		jQuery('body, html').animate({
			scrollTop: 0
		}, 400);
		return false;
	});
	var fixednavi = jQuery('.pagetop');
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 50) {
			fixednavi.fadeIn();
		} else {
			fixednavi.fadeOut();
		}
	});
}