/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera|opr|opios/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      if( /touchpad\//i.test(ua) ){
        result.touchpad = t;
      }
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

(function($){
  UABBTrigger = {

      /**
       * Trigger a hook.
       *
       * @since 1.1.0.3
       * @method triggerHook
       * @param {String} hook The hook to trigger.
       * @param {Array} args An array of args to pass to the hook.
       */
      triggerHook: function( hook, args )
      {
        $( 'body' ).trigger( 'uabb-trigger.' + hook, args );
      },
    
      /**
       * Add a hook.
       *
       * @since 1.1.0.3
       * @method addHook
       * @param {String} hook The hook to add.
       * @param {Function} callback A function to call when the hook is triggered.
       */
      addHook: function( hook, callback )
      {
        $( 'body' ).on( 'uabb-trigger.' + hook, callback );
      },
    
      /**
       * Remove a hook.
       *
       * @since 1.1.0.3
       * @method removeHook
       * @param {String} hook The hook to remove.
       * @param {Function} callback The callback function to remove.
       */
      removeHook: function( hook, callback )
      {
        $( 'body' ).off( 'uabb-trigger.' + hook, callback );
      },
  };
})(jQuery);

jQuery(document).ready(function( $ ) {

    if( typeof bowser !== 'undefined' && bowser !== null ) {

      var uabb_browser   = bowser.name,
          uabb_browser_v = bowser.version,
          uabb_browser_class = uabb_browser.replace(/\s+/g, '-').toLowerCase(),
          uabb_browser_v_class = uabb_browser_class + parseInt( uabb_browser_v );
      
      $('html').addClass(uabb_browser_class).addClass(uabb_browser_v_class);
      
    }

    $('.uabb-row-separator').parents('html').css('overflow-x', 'hidden');
});
var wpAjaxUrl = 'https://www.starwarsccg.org/wp/wp-admin/admin-ajax.php';var flBuilderUrl = 'https://www.starwarsccg.org/wp/wp-content/plugins/bb-plugin/';var FLBuilderLayoutConfig = {
	anchorLinkAnimations : {
		duration 	: 1000,
		easing		: 'swing',
		offset 		: 100
	},
	paths : {
		pluginUrl : 'https://www.starwarsccg.org/wp/wp-content/plugins/bb-plugin/',
		wpAjaxUrl : 'https://www.starwarsccg.org/wp/wp-admin/admin-ajax.php'
	},
	breakpoints : {
		small  : 768,
		medium : 1024	},
	waypoint: {
		offset: 80
	}
};
(function($){

	if(typeof FLBuilderLayout != 'undefined') {
		return;
	}

	/**
	 * Helper class with generic logic for a builder layout.
	 *
	 * @class FLBuilderLayout
	 * @since 1.0
	 */
	FLBuilderLayout = {

		/**
		 * Initializes a builder layout.
		 *
		 * @since 1.0
		 * @method init
		 */
		init: function()
		{
			// Destroy existing layout events.
			FLBuilderLayout._destroy();

			// Init CSS classes.
			FLBuilderLayout._initClasses();

			// Init backgrounds.
			FLBuilderLayout._initBackgrounds();

			// Only init if the builder isn't active.
			if ( 0 === $('.fl-builder-edit').length ) {

				// Init module animations.
				FLBuilderLayout._initModuleAnimations();

				// Init anchor links.
				FLBuilderLayout._initAnchorLinks();

				// Init the browser hash.
				FLBuilderLayout._initHash();

				// Init forms.
				FLBuilderLayout._initForms();
			}
		},

		/**
		 * Public method for refreshing Wookmark or MosaicFlow galleries
		 * within an element.
		 *
		 * @since 1.7.4
		 * @method refreshGalleries
		 */
		refreshGalleries: function( element )
		{
			var $element  = 'undefined' == typeof element ? $( 'body' ) : $( element ),
				mfContent = $element.find( '.fl-mosaicflow-content' ),
				wmContent = $element.find( '.fl-gallery' ),
				mfObject  = null;

			if ( mfContent ) {

				mfObject = mfContent.data( 'mosaicflow' );

				if ( mfObject ) {
					mfObject.columns = $( [] );
					mfObject.columnsHeights = [];
					mfContent.data( 'mosaicflow', mfObject );
					mfContent.mosaicflow( 'refill' );
				}
			}
			if ( wmContent ) {
				wmContent.trigger( 'refreshWookmark' );
			}
		},

		/**
		 * Public method for refreshing Masonry within an element
		 *
		 * @since 1.8.1
		 * @method refreshGridLayout
		 */
		refreshGridLayout: function( element )
		{
			var $element 		= 'undefined' == typeof element ? $( 'body' ) : $( element ),
				msnryContent	= $element.find('.masonry');

			if ( msnryContent.length )	{
				msnryContent.masonry('layout');
			}
		},

		/**
		 * Public method for reloading BxSlider within an element
		 *
		 * @since 1.8.1
		 * @method reloadSlider
		 */
		reloadSlider: function( element )
		{
			var $element 	= 'undefined' == typeof element ? $( 'body' ) : $( element ),
				bxContent	= $element.find('.bx-viewport > div').eq(0),
				bxObject   	= null;

			if ( bxContent.length ) {
				bxObject = bxContent.data( 'bxSlider');
				if ( bxObject ) {
					bxObject.reloadSlider();
				}
			}
		},

		/**
		 * Public method for resizing WP audio player
		 *
		 * @since 1.8.2
		 * @method resizeAudio
		 */
		resizeAudio: function( element )
		{
			var $element 	 	= 'undefined' == typeof element ? $( 'body' ) : $( element ),
				audioPlayers 	= $element.find('.wp-audio-shortcode.mejs-audio'),
				player 		 	= null,
				mejsPlayer 	 	= null,
				rail 			= null,
				railWidth 		= 400;

			if ( audioPlayers.length && typeof mejs !== 'undefined' ) {
            	audioPlayers.each(function(){
	            	player 		= $(this);
	            	mejsPlayer 	= mejs.players[player.attr('id')];
	            	rail 		= player.find('.mejs-controls .mejs-time-rail');
	            	var innerMejs = player.find('.mejs-inner'),
	            		total 	  = player.find('.mejs-controls .mejs-time-total');

	            	if ( typeof mejsPlayer !== 'undefined' ) {
	            		railWidth = Math.ceil(player.width() * 0.8);

	            		if ( innerMejs.length ) {

		            		rail.css('width', railWidth +'px!important');
		            		//total.width(rail.width() - 10);

		            		mejsPlayer.options.autosizeProgress = true;

		            		// webkit has trouble doing this without a delay
							setTimeout(function () {
								mejsPlayer.setControlsSize();
							}, 50);

			            	player.find('.mejs-inner').css({
			            		visibility: 'visible',
			            		height: 'inherit'
			            	});
		            	}
		           	}
	            });
	        }
		},

		/**
		 * Public method for preloading WP audio player when it's inside the hidden element
		 *
		 * @since 1.8.2
		 * @method preloadAudio
		 */
		preloadAudio: function(element)
		{
			var $element 	 = 'undefined' == typeof element ? $( 'body' ) : $( element ),
				contentWrap  = $element.closest('.fl-accordion-item'),
				audioPlayers = $element.find('.wp-audio-shortcode.mejs-audio');

			if ( ! contentWrap.hasClass('fl-accordion-item-active') && audioPlayers.find('.mejs-inner').length ) {
				audioPlayers.find('.mejs-inner').css({
					visibility : 'hidden',
					height: 0
				});
			}
		},

		/**
		 * Public method for resizing slideshow momdule within the tab
		 *
		 * @since 1.10.5
		 * @method resizeSlideshow
		 */
		resizeSlideshow: function(){
			if(typeof YUI !== 'undefined') {
				YUI().use('node-event-simulate', function(Y) {
					Y.one(window).simulate("resize");
				});
			}
		},

		/**
		 * Public method for reloading an embedded Google Map within the tabs or hidden element.
		 *
		 * @since 2.2
		 * @method reloadGoogleMap
		 */
		reloadGoogleMap: function(element){
			var $element  = 'undefined' == typeof element ? $( 'body' ) : $( element ),
			    googleMap = $element.find( 'iframe[src*="google.com/maps"]' );

			if ( googleMap.length ) {
			    googleMap.attr( 'src', function(i, val) {
			        return val;
			    });
			}
		},

		/**
		 * Unbinds builder layout events.
		 *
		 * @since 1.0
		 * @access private
		 * @method _destroy
		 */
		_destroy: function()
		{
			var win = $(window);

			win.off('scroll.fl-bg-parallax');
			win.off('resize.fl-bg-video');
		},

		/**
		 * Checks to see if the current device has touch enabled.
		 *
		 * @since 1.0
		 * @access private
		 * @method _isTouch
		 * @return {Boolean}
		 */
		_isTouch: function()
		{
			if(('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the current device is mobile.
		 *
		 * @since 1.7
		 * @access private
		 * @method _isMobile
		 * @return {Boolean}
		 */
		_isMobile: function()
		{
			return /Mobile|Android|Silk\/|Kindle|BlackBerry|Opera Mini|Opera Mobi|webOS/i.test( navigator.userAgent );
		},

		/**
		 * Initializes builder body classes.
		 *
		 * @since 1.0
		 * @access private
		 * @method _initClasses
		 */
		_initClasses: function()
		{
			var body = $( 'body' ),
				ua   = navigator.userAgent;

			// Add the builder body class.
			if ( ! body.hasClass( 'archive' ) && $( '.fl-builder-content-primary' ).length > 0 ) {
				body.addClass('fl-builder');
			}

			// Add the builder touch body class.
			if(FLBuilderLayout._isTouch()) {
				body.addClass('fl-builder-touch');
			}

			// Add the builder mobile body class.
			if(FLBuilderLayout._isMobile()) {
				body.addClass('fl-builder-mobile');
			}

			if ( $(window).width() < FLBuilderLayoutConfig.breakpoints.small ) {
				body.addClass( 'fl-builder-breakpoint-small' );
			}

			if ( $(window).width() > FLBuilderLayoutConfig.breakpoints.small && $(window).width() < FLBuilderLayoutConfig.breakpoints.medium ) {
				body.addClass( 'fl-builder-breakpoint-medium' );
			}

			if ( $(window).width() > FLBuilderLayoutConfig.breakpoints.medium ) {
				body.addClass( 'fl-builder-breakpoint-large' );
			}

			// IE11 body class.
			if ( ua.indexOf( 'Trident/7.0' ) > -1 && ua.indexOf( 'rv:11.0' ) > -1 ) {
				body.addClass( 'fl-builder-ie-11' );
			}
		},

		/**
		 * Initializes builder node backgrounds that require
		 * additional JavaScript logic such as parallax.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _initBackgrounds
		 */
		_initBackgrounds: function()
		{
			var win = $(window);

			// Init parallax backgrounds.
			if($('.fl-row-bg-parallax').length > 0 && !FLBuilderLayout._isMobile()) {
				FLBuilderLayout._scrollParallaxBackgrounds();
				FLBuilderLayout._initParallaxBackgrounds();
				win.on('scroll.fl-bg-parallax', FLBuilderLayout._scrollParallaxBackgrounds);
			}

			// Init video backgrounds.
			if($('.fl-bg-video').length > 0) {
				FLBuilderLayout._initBgVideos();
				FLBuilderLayout._resizeBgVideos();
				win.on('resize.fl-bg-video', FLBuilderLayout._resizeBgVideos);
			}
		},

		/**
		 * Initializes all parallax backgrounds in a layout.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _initParallaxBackgrounds
		 */
		_initParallaxBackgrounds: function()
		{
			$('.fl-row-bg-parallax').each(FLBuilderLayout._initParallaxBackground);
		},

		/**
		 * Initializes a single parallax background.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _initParallaxBackgrounds
		 */
		_initParallaxBackground: function()
		{
			var row     = $(this),
				content = row.find('> .fl-row-content-wrap'),
				src     = row.data('parallax-image'),
				loaded  = row.data('parallax-loaded'),
				img     = new Image();

			if(loaded) {
				return;
			}
			else if(typeof src != 'undefined') {

				$(img).on('load', function() {
					content.css('background-image', 'url(' + src + ')');
					row.data('parallax-loaded', true);
				});

				img.src = src;
			}
		},

		/**
		 * Fires when the window is scrolled to adjust
		 * parallax backgrounds.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _scrollParallaxBackgrounds
		 */
		_scrollParallaxBackgrounds: function()
		{
			$('.fl-row-bg-parallax').each(FLBuilderLayout._scrollParallaxBackground);
		},

		/**
		 * Fires when the window is scrolled to adjust
		 * a single parallax background.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _scrollParallaxBackground
		 */
		_scrollParallaxBackground: function()
		{
			var win     = $(window),
				row     = $(this),
				content = row.find('> .fl-row-content-wrap'),
				speed   = row.data('parallax-speed'),
				offset  = content.offset(),
				yPos    = -((win.scrollTop() - offset.top) / speed);

			content.css('background-position', 'center ' + yPos + 'px');
		},

		/**
		 * Initializes all video backgrounds.
		 *
		 * @since 1.6.3.3
		 * @access private
		 * @method _initBgVideos
		 */
		_initBgVideos: function()
		{
			$('.fl-bg-video').each(FLBuilderLayout._initBgVideo);
		},

		/**
		 * Initializes a video background.
		 *
		 * @since 1.6.3.3
		 * @access private
		 * @method _initBgVideo
		 */
		_initBgVideo: function()
		{
			var wrap   = $( this ),
				width       = wrap.data( 'width' ),
				height      = wrap.data( 'height' ),
				mp4         = wrap.data( 'mp4' ),
				youtube     = wrap.data( 'youtube'),
				vimeo       = wrap.data( 'vimeo'),
				mp4Type     = wrap.data( 'mp4-type' ),
				webm        = wrap.data( 'webm' ),
				webmType    = wrap.data( 'webm-type' ),
				fallback    = wrap.data( 'fallback' ),
				loaded      = wrap.data( 'loaded' ),
				videoMobile = wrap.data( 'video-mobile' ),
				fallbackTag = '',
				videoTag    = null,
				mp4Tag      = null,
				webmTag     = null;

			// Return if the video has been loaded for this row.
			if ( loaded ) {
				return;
			}

			videoTag  = $( '<video autoplay loop muted playsinline></video>' );

			/**
			 * Add poster image (fallback image)
			 */
			if( 'undefined' != typeof fallback && '' != fallback ) {
				videoTag.attr( 'poster', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' )
				videoTag.css( 'background', 'transparent url("' + fallback + '") no-repeat center center' )
				videoTag.css( 'background-size', 'cover' )
				videoTag.css( 'height', '100%' )
			}

			// MP4 Source Tag
			if ( 'undefined' != typeof mp4 && '' != mp4 ) {

				mp4Tag = $( '<source />' );
				mp4Tag.attr( 'src', mp4 );
				mp4Tag.attr( 'type', mp4Type );

				videoTag.append( mp4Tag );
			}
			// WebM Source Tag
			if ( 'undefined' != typeof webm && '' != webm ) {

				webmTag = $( '<source />' );
				webmTag.attr( 'src', webm );
				webmTag.attr( 'type', webmType );

				videoTag.append( webmTag );
			}

			// This is either desktop, or mobile is enabled.
			if ( ! FLBuilderLayout._isMobile() || ( FLBuilderLayout._isMobile() && "yes" == videoMobile ) ) {
				if ( 'undefined' != typeof youtube ) {
					FLBuilderLayout._initYoutubeBgVideo.apply( this );
				}
				else if ( 'undefined' != typeof vimeo ) {
					FLBuilderLayout._initVimeoBgVideo.apply( this );
				}
				else {
					wrap.append( videoTag );
				}
			}
			else {
				// if we are here, it means we are on mobile and NO is set so remove video src and use fallback
				videoTag.attr('src', '')
				wrap.append( videoTag );
			}

			// Mark this video as loaded.
			wrap.data('loaded', true);
		},

		/**
		 * Initializes Youtube video background
		 *
		 * @since 1.9
		 * @access private
		 * @method _initYoutubeBgVideo
		 */
		_initYoutubeBgVideo: function()
		{
			var playerWrap  = $(this),
				videoId     = playerWrap.data('video-id'),
				videoPlayer = playerWrap.find('.fl-bg-video-player'),
				enableAudio = playerWrap.data('enable-audio'),
				audioButton = playerWrap.find('.fl-bg-video-audio'),
				startTime   = 'undefined' !== typeof playerWrap.data('start') ? playerWrap.data('start') : 0,
				endTime     = 'undefined' !== typeof playerWrap.data('end') ? playerWrap.data('end') : 0,
				loop        = 'undefined' !== typeof playerWrap.data('loop') ? playerWrap.data('loop') : 1,
				stateCount  = 0,
				player,fallback_showing;

			if ( videoId ) {
				fallback = playerWrap.data('fallback') || false
				if( fallback ) {
					playerWrap.find('iframe').remove()
					fallbackTag = $( '<div></div>' );
					fallbackTag.addClass( 'fl-bg-video-fallback' );
					fallbackTag.css( 'background-image', 'url(' + playerWrap.data('fallback') + ')' );
					fallbackTag.css( 'background-size', 'cover' );
					fallbackTag.css( 'transition', 'background-image 1s')
					playerWrap.append( fallbackTag );
					fallback_showing = true;
				}
				FLBuilderLayout._onYoutubeApiReady( function( YT ) {
					setTimeout( function() {

						player = new YT.Player( videoPlayer[0], {
							videoId: videoId,
							events: {
								onReady: function(event) {
									if ( "no" === enableAudio || FLBuilderLayout._isMobile() ) {
										event.target.mute();
									}
									else if ( "yes" === enableAudio && event.target.isMuted ) {
										event.target.unMute();
									}

									// Store an instance to a parent
									playerWrap.data('YTPlayer', player);
									FLBuilderLayout._resizeYoutubeBgVideo.apply(playerWrap);

									// Queue the video.
									event.target.playVideo();

									if ( audioButton.length > 0 && ! FLBuilderLayout._isMobile() ) {
										audioButton.on( 'click', {button: audioButton, player: player}, FLBuilderLayout._toggleBgVideoAudio );
									}
								},
								onStateChange: function( event ) {

									if ( event.data === 1 ) {
										if ( fallback_showing ) {
											$( '.fl-bg-video-fallback' ).css( 'background-image', 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)' )
										}
									}
									// Manual check if video is not playable in some browsers.
									// StateChange order: [-1, 3, -1]
									if ( stateCount < 4 ) {
										stateCount++;
									}

									// Comply with the audio policy in some browsers like Chrome and Safari.
									if ( stateCount > 1 && (-1 === event.data || 2 === event.data) && "yes" === enableAudio ) {
										player.mute();
										player.playVideo();
										audioButton.show();
									}

									if ( event.data === YT.PlayerState.ENDED && 1 === loop ) {
										if ( startTime > 0 ) {
											player.seekTo( startTime );
										}
										else {
											player.playVideo();
										}
									}
								},
								onError: function(event) {
									console.info('YT Error: ' + event.data)
									FLBuilderLayout._onErrorYoutubeVimeo(playerWrap)
								}
							},
							playerVars: {
								playsinline: FLBuilderLayout._isMobile() ? 1 : 0,
								controls: 0,
								showinfo: 0,
								rel : 0,
								start: startTime,
								end: endTime,
							}
						} );
					}, 1 );
				} );
			}
		},

		/**
		 * On youtube or vimeo error show the fallback image if available.
		 * @since 2.0.7
		 */
		_onErrorYoutubeVimeo: function(playerWrap) {

			fallback = playerWrap.data('fallback') || false
			if( ! fallback ) {
				return false;
			}
			playerWrap.find('iframe').remove()
			fallbackTag = $( '<div></div>' );
			fallbackTag.addClass( 'fl-bg-video-fallback' );
			fallbackTag.css( 'background-image', 'url(' + playerWrap.data('fallback') + ')' );
			playerWrap.append( fallbackTag );
		},

		/**
		 * Check if Youtube API has been downloaded
		 *
		 * @since 1.9
		 * @access private
		 * @method _onYoutubeApiReady
		 * @param  {Function} callback Method to call when YT API has been loaded
		 */
		_onYoutubeApiReady: function( callback ) {
			if ( window.YT && YT.loaded ) {
				callback( YT );
			} else {
				// If not ready check again by timeout..
				setTimeout( function() {
					FLBuilderLayout._onYoutubeApiReady( callback );
				}, 350 );
			}
		},

		/**
		 * Initializes Vimeo video background
		 *
		 * @since 1.9
		 * @access private
		 * @method _initVimeoBgVideo
		 */
		_initVimeoBgVideo: function()
		{
			var playerWrap	= $(this),
				videoId 	= playerWrap.data('video-id'),
				videoPlayer = playerWrap.find('.fl-bg-video-player'),
				enableAudio = playerWrap.data('enable-audio'),
				audioButton = playerWrap.find('.fl-bg-video-audio'),
				player,
				width = playerWrap.outerWidth();

			if ( typeof Vimeo !== 'undefined' && videoId )	{
				player = new Vimeo.Player(videoPlayer[0], {
					id         : videoId,
					loop       : true,
					title      : false,
					portrait   : false,
					background : true,
					autopause  : false,
					muted      : true
				});

				playerWrap.data('VMPlayer', player);
				if ( "no" === enableAudio ) {
					player.setVolume(0);
				}
				else if ("yes" === enableAudio ) {
					// Chrome and Safari have audio policy restrictions for autoplay videos.
					if ( $.browser.safari || $.browser.chrome ) {
						player.setVolume(0);
						audioButton.show();
					}
					else {
						player.setVolume(1);
					}
				}

				player.play().catch(function(error) {
					FLBuilderLayout._onErrorYoutubeVimeo(playerWrap)
				});

				if ( audioButton.length > 0 ) {
					audioButton.on( 'click', {button: audioButton, player: player}, FLBuilderLayout._toggleBgVideoAudio );
				}
			}
		},

		/**
		 * Mute / unmute audio on row's video background.
		 * It works for both Youtube and Vimeo.
		 *
		 * @since 2.1.3
		 * @access private
		 * @method _toggleBgVideoAudio
		 * @param {Object} e Method arguments
		 */
		_toggleBgVideoAudio: function( e ) {
			var player  = e.data.player,
			    control = e.data.button.find('.fl-audio-control');

			if ( control.hasClass( 'fa-volume-off' ) ) {
				// Unmute
				control
					.removeClass( 'fa-volume-off' )
					.addClass( 'fa-volume-up' );
				e.data.button.find( '.fa-times' ).hide();

				if ( 'function' === typeof player.unMute ) {
					player.unMute();
				}
				else {
					player.setVolume( 1 );
				}
			}
			else {
				// Mute
				control
					.removeClass( 'fa-volume-up' )
					.addClass( 'fa-volume-off' );
				e.data.button.find( '.fa-times' ).show();

				if ( 'function' === typeof player.unMute ) {
					player.mute();
				}
				else {
					player.setVolume( 0 );
				}
			}
		},

		/**
		 * Fires when there is an error loading a video
		 * background source and shows the fallback.
		 *
		 * @since 1.6.3.3
		 * @access private
		 * @method _videoBgSourceError
		 * @param {Object} e An event object
		 * @deprecated 2.0.3
		 */
		_videoBgSourceError: function( e )
		{
			var source 		= $( e.target ),
				wrap   		= source.closest( '.fl-bg-video' ),
				vid		    = wrap.find( 'video' ),
				fallback  	= wrap.data( 'fallback' ),
				fallbackTag = '';
			source.remove();

			if ( vid.find( 'source' ).length ) {
				// Don't show the fallback if we still have other sources to check.
				return;
			} else if ( '' !== fallback ) {
				fallbackTag = $( '<div></div>' );
				fallbackTag.addClass( 'fl-bg-video-fallback' );
				fallbackTag.css( 'background-image', 'url(' + fallback + ')' );
				wrap.append( fallbackTag );
				vid.remove();
			}
		},

		/**
		 * Fires when the window is resized to resize
		 * all video backgrounds.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _resizeBgVideos
		 */
		_resizeBgVideos: function()
		{
			$('.fl-bg-video').each( function() {

				FLBuilderLayout._resizeBgVideo.apply( this );

				if ( $( this ).parent().find( 'img' ).length > 0 ) {
					$( this ).parent().imagesLoaded( $.proxy( FLBuilderLayout._resizeBgVideo, this ) );
				}
			} );
		},

		/**
		 * Fires when the window is resized to resize
		 * a single video background.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _resizeBgVideo
		 */
		_resizeBgVideo: function()
		{
			if ( 0 === $( this ).find( 'video' ).length && 0 === $( this ).find( 'iframe' ).length ) {
				return;
			}

			var wrap        = $(this),
				wrapHeight  = wrap.outerHeight(),
				wrapWidth   = wrap.outerWidth(),
				vid         = wrap.find('video'),
				vidHeight   = wrap.data('height'),
				vidWidth    = wrap.data('width'),
				newWidth    = wrapWidth,
				newHeight   = Math.round(vidHeight * wrapWidth/vidWidth),
				newLeft     = 0,
				newTop      = 0,
				iframe 		= wrap.find('iframe');

			if ( vid.length ) {
				if(vidHeight === '' || typeof vidHeight === 'undefined' || vidWidth === '' || typeof vidWidth === 'undefined') {
					vid.css({
						'left'      : '0px',
						'top'       : '0px',
						'width'     : newWidth + 'px'
					});

					// Try to set the actual video dimension on 'loadedmetadata' when using URL as video source
					vid.on('loadedmetadata', FLBuilderLayout._resizeOnLoadedMeta);

				}
				else {

					if(newHeight < wrapHeight) {
						newHeight   = wrapHeight;
						newWidth    = Math.round(vidWidth * wrapHeight/vidHeight);
						newLeft     = -((newWidth - wrapWidth)/2);
					}
					else {
						newTop      = -((newHeight - wrapHeight)/2);
					}

					vid.css({
						'left'      : newLeft + 'px',
						'top'       : newTop + 'px',
						'height'    : newHeight + 'px',
						'width'     : newWidth + 'px'
					});
				}
			}
			else if ( iframe.length ) {

				// Resize Youtube video player within iframe tag
				if ( typeof wrap.data('youtube') !== 'undefined' ) {
					FLBuilderLayout._resizeYoutubeBgVideo.apply(this);
				}
			}
		},

		/**
		 * Fires when video meta has been loaded.
		 * This will be Triggered when width/height attributes were not specified during video background resizing.
		 *
		 * @since 1.8.5
		 * @access private
		 * @method _resizeOnLoadedMeta
		 */
		_resizeOnLoadedMeta: function(){
			var video 		= $(this),
				wrapHeight 	= video.parent().outerHeight(),
				wrapWidth 	= video.parent().outerWidth(),
				vidWidth 	= video[0].videoWidth,
				vidHeight 	= video[0].videoHeight,
				newHeight   = Math.round(vidHeight * wrapWidth/vidWidth),
				newWidth    = wrapWidth,
				newLeft     = 0,
				newTop 		= 0;

			if(newHeight < wrapHeight) {
				newHeight   = wrapHeight;
				newWidth    = Math.round(vidWidth * wrapHeight/vidHeight);
				newLeft     = -((newWidth - wrapWidth)/2);
			}
			else {
				newTop      = -((newHeight - wrapHeight)/2);
			}

			video.parent().data('width', vidWidth);
			video.parent().data('height', vidHeight);

			video.css({
				'left'      : newLeft + 'px',
				'top'       : newTop + 'px',
				'width'     : newWidth + 'px',
				'height' 	: newHeight + 'px'
			});
		},

		/**
		 * Fires when the window is resized to resize
		 * a single Youtube video background.
		 *
		 * @since 1.9
		 * @access private
		 * @method _resizeYoutubeBgVideo
		 */
		_resizeYoutubeBgVideo: function()
		{
			var wrap				= $(this),
				wrapWidth 			= wrap.outerWidth(),
				wrapHeight 			= wrap.outerHeight(),
				player 				= wrap.data('YTPlayer'),
				video 				= player ? player.getIframe() : null,
				aspectRatioSetting 	= '16:9', // Medium
				aspectRatioArray 	= aspectRatioSetting.split( ':' ),
				aspectRatio 		= aspectRatioArray[0] / aspectRatioArray[1],
				ratioWidth 			= wrapWidth / aspectRatio,
				ratioHeight 		= wrapHeight * aspectRatio,
				isWidthFixed 		= wrapWidth / wrapHeight > aspectRatio,
				width 				= isWidthFixed ? wrapWidth : ratioHeight,
				height 				= isWidthFixed ? ratioWidth : wrapHeight;

			if ( video ) {
				$(video).width( width ).height( height );
			}
		},

		/**
		 * Initializes module animations.
		 *
		 * @since 1.1.9
		 * @access private
		 * @method _initModuleAnimations
		 */
		_initModuleAnimations: function()
		{
			if(typeof jQuery.fn.waypoint !== 'undefined') {
				$('.fl-animation').each( function() {
					var node = $( this ),
						nodeTop = node.offset().top,
						winHeight = $( window ).height(),
						bodyHeight = $( 'body' ).height(),
						waypoint = FLBuilderLayoutConfig.waypoint,
						offset = '80%';

					if ( typeof waypoint.offset !== undefined ) {
						offset = FLBuilderLayoutConfig.waypoint.offset + '%';
					}

					if ( bodyHeight - nodeTop < winHeight * 0.2 ) {
						offset = '100%';
					}

					node.waypoint({
						offset: offset,
						handler: FLBuilderLayout._doModuleAnimation
					});
				} );
			}
		},

		/**
		 * Runs a module animation.
		 *
		 * @since 1.1.9
		 * @access private
		 * @method _doModuleAnimation
		 */
		_doModuleAnimation: function()
		{
			var module = 'undefined' == typeof this.element ? $(this) : $(this.element),
				delay = parseFloat(module.data('animation-delay')),
				duration = parseFloat(module.data('animation-duration'));

			if ( ! isNaN( duration ) ) {
				module.css( 'animation-duration', duration + 's' );
			}

			if(!isNaN(delay) && delay > 0) {
				setTimeout(function(){
					module.addClass('fl-animated');
				}, delay * 1000);
			} else {
				setTimeout(function(){
					module.addClass('fl-animated');
				}, 1);
			}
		},

		/**
		 * Opens a tab or accordion item if the browser hash is set
		 * to the ID of one on the page.
		 *
		 * @since 1.6.0
		 * @access private
		 * @method _initHash
		 */
		_initHash: function()
		{
			var hash 			= window.location.hash.replace( '#', '' ).split( '/' ).shift(),
				element 		= null,
				tabs			= null,
				responsiveLabel	= null,
				tabIndex		= null,
				label			= null;

			if ( '' !== hash ) {

				try {

					element = $( '#' + hash );

					if ( element.length > 0 ) {

						if ( element.hasClass( 'fl-accordion-item' ) ) {
							setTimeout( function() {
								element.find( '.fl-accordion-button' ).trigger( 'click' );
							}, 100 );
						}
						if ( element.hasClass( 'fl-tabs-panel' ) ) {

							setTimeout( function() {

								tabs 			= element.closest( '.fl-tabs' );
								responsiveLabel = element.find( '.fl-tabs-panel-label' );
								tabIndex 		= responsiveLabel.data( 'index' );
								label 			= tabs.find( '.fl-tabs-labels .fl-tabs-label[data-index=' + tabIndex + ']' );

								if ( responsiveLabel.is( ':visible' ) ) {
									responsiveLabel.trigger( 'click' );
								}
								else {
									label[0].click();
									FLBuilderLayout._scrollToElement( element );
								}

							}, 100 );
						}
					}
				}
				catch( e ) {}
			}
		},

		/**
		 * Initializes all anchor links on the page for smooth scrolling.
		 *
		 * @since 1.4.9
		 * @access private
		 * @method _initAnchorLinks
		 */
		_initAnchorLinks: function()
		{
			$( 'a' ).each( FLBuilderLayout._initAnchorLink );
		},

		/**
		 * Initializes a single anchor link for smooth scrolling.
		 *
		 * @since 1.4.9
		 * @access private
		 * @method _initAnchorLink
		 */
		_initAnchorLink: function()
		{
			var link    = $( this ),
				href    = link.attr( 'href' ),
				loc     = window.location,
				id      = null,
				element = null;
			if ( 'undefined' != typeof href && href.indexOf( '#' ) > -1 && link.closest('svg').length < 1 ) {

				if ( loc.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && loc.hostname == this.hostname ) {

					try {

						id      = href.split( '#' ).pop();
						// If there is no ID then we have nowhere to look
						// Fixes a quirk in jQuery and FireFox
						if( ! id ) {
							return;
						}
						element = $( '#' + id );

						if ( element.length > 0 ) {
							if ( link.hasClass( 'fl-scroll-link' ) || element.hasClass( 'fl-row' ) || element.hasClass( 'fl-col' ) || element.hasClass( 'fl-module' ) ) {
								$( link ).on( 'click', FLBuilderLayout._scrollToElementOnLinkClick );
							}
							if ( element.hasClass( 'fl-accordion-item' ) ) {
								$( link ).on( 'click', FLBuilderLayout._scrollToAccordionOnLinkClick );
							}
							if ( element.hasClass( 'fl-tabs-panel' ) ) {
								$( link ).on( 'click', FLBuilderLayout._scrollToTabOnLinkClick );
							}
						}
					}
					catch( e ) {}
				}
			}
		},

		/**
		 * Scrolls to an element when an anchor link is clicked.
		 *
		 * @since 1.4.9
		 * @access private
		 * @method _scrollToElementOnLinkClick
		 * @param {Object} e An event object.
		 * @param {Function} callback A function to call when the scroll is complete.
		 */
		_scrollToElementOnLinkClick: function( e, callback )
		{
			var element = $( '#' + $( this ).attr( 'href' ).split( '#' ).pop() );

			FLBuilderLayout._scrollToElement( element, callback );

			e.preventDefault();
		},

		/**
		 * Scrolls to an element.
		 *
		 * @since 1.6.4.5
		 * @access private
		 * @method _scrollToElement
		 * @param {Object} element The element to scroll to.
		 * @param {Function} callback A function to call when the scroll is complete.
		 */
		_scrollToElement: function( element, callback )
		{
			var config  = FLBuilderLayoutConfig.anchorLinkAnimations,
				dest    = 0,
				win     = $( window ),
				doc     = $( document );

			if ( element.length > 0 ) {

				if ( element.offset().top > doc.height() - win.height() ) {
					dest = doc.height() - win.height();
				}
				else {
					dest = element.offset().top - config.offset;
				}

				$( 'html, body' ).animate( { scrollTop: dest }, config.duration, config.easing, function() {

					if ( 'undefined' != typeof callback ) {
						callback();
					}

					if ( undefined != element.attr( 'id' ) ) {

						if ( history.pushState ) {
							history.pushState( null, null, '#' + element.attr( 'id' ) );
						}
						else {
							window.location.hash = element.attr( 'id' );
						}
					}
				} );
			}
		},

		/**
		 * Scrolls to an accordion item when a link is clicked.
		 *
		 * @since 1.5.9
		 * @access private
		 * @method _scrollToAccordionOnLinkClick
		 * @param {Object} e An event object.
		 */
		_scrollToAccordionOnLinkClick: function( e )
		{
			var element = $( '#' + $( this ).attr( 'href' ).split( '#' ).pop() );

			if ( element.length > 0 ) {

				var callback = function() {
					if ( element ) {
						element.find( '.fl-accordion-button' ).trigger( 'click' );
						element = false;
					}
				};

				FLBuilderLayout._scrollToElementOnLinkClick.call( this, e, callback );
			}
		},

		/**
		 * Scrolls to a tab panel when a link is clicked.
		 *
		 * @since 1.5.9
		 * @access private
		 * @method _scrollToTabOnLinkClick
		 * @param {Object} e An event object.
		 */
		_scrollToTabOnLinkClick: function( e )
		{
			var element 		= $( '#' + $( this ).attr( 'href' ).split( '#' ).pop() ),
				tabs			= null,
				label   		= null,
				responsiveLabel = null;

			if ( element.length > 0 ) {

				tabs 			= element.closest( '.fl-tabs' );
				responsiveLabel = element.find( '.fl-tabs-panel-label' );
				tabIndex 		= responsiveLabel.data( 'index' );
				label 			= tabs.find( '.fl-tabs-labels .fl-tabs-label[data-index=' + tabIndex + ']' );

				if ( responsiveLabel.is( ':visible' ) ) {

					var callback = function() {
						if ( element ) {
							responsiveLabel.trigger( 'click' );
							element = false;
						}
					};

					FLBuilderLayout._scrollToElementOnLinkClick.call( this, e, callback );
				}
				else {
					label[0].click();
					FLBuilderLayout._scrollToElement( element );
				}

				e.preventDefault();
			}
		},

		/**
		 * Initializes all builder forms on a page.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _initForms
		 */
		_initForms: function()
		{
			if ( ! FLBuilderLayout._hasPlaceholderSupport ) {
				$( '.fl-form-field input' ).each( FLBuilderLayout._initFormFieldPlaceholderFallback );
			}

			$( '.fl-form-field input' ).on( 'focus', FLBuilderLayout._clearFormFieldError );
		},

		/**
		 * Checks to see if the current device has HTML5
		 * placeholder support.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _hasPlaceholderSupport
		 * @return {Boolean}
		 */
		_hasPlaceholderSupport: function()
		{
			var input = document.createElement( 'input' );

			return 'undefined' != input.placeholder;
		},

		/**
		 * Initializes the fallback for when placeholders aren't supported.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _initFormFieldPlaceholderFallback
		 */
		_initFormFieldPlaceholderFallback: function()
		{
			var field       = $( this ),
				val         = field.val(),
				placeholder = field.attr( 'placeholder' );

			if ( 'undefined' != placeholder && '' === val ) {
				field.val( placeholder );
				field.on( 'focus', FLBuilderLayout._hideFormFieldPlaceholderFallback );
				field.on( 'blur', FLBuilderLayout._showFormFieldPlaceholderFallback );
			}
		},

		/**
		 * Hides a fallback placeholder on focus.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _hideFormFieldPlaceholderFallback
		 */
		_hideFormFieldPlaceholderFallback: function()
		{
			var field       = $( this ),
				val         = field.val(),
				placeholder = field.attr( 'placeholder' );

			if ( val == placeholder ) {
				field.val( '' );
			}
		},

		/**
		 * Shows a fallback placeholder on blur.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _showFormFieldPlaceholderFallback
		 */
		_showFormFieldPlaceholderFallback: function()
		{
			var field       = $( this ),
				val         = field.val(),
				placeholder = field.attr( 'placeholder' );

			if ( '' === val ) {
				field.val( placeholder );
			}
		},

		/**
		 * Clears a form field error message.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _clearFormFieldError
		 */
		_clearFormFieldError: function()
		{
			var field = $( this );

			field.removeClass( 'fl-form-error' );
			field.siblings( '.fl-form-error-message' ).hide();
		}
	};

	/* Initializes the builder layout. */
	$(function(){
		FLBuilderLayout.init();
	});

})(jQuery);

/* Start Global JS */

/* End Global JS */


/**
 * This file should contain frontend logic for 
 * all module instances.
 *//**
 * $module An instance of your module class.
 * $id The module's ID.
 * $settings The module's settings.
*/

(function($) {

    if($(window).width() <= 768 && $(window).width() >= 481 ) {
        $('.fl-node-5cbf3e8b0c734 .pp-heading-separator, .fl-node-5cbf3e8b0c734 .pp-heading').removeClass('pp-center');
        $('.fl-node-5cbf3e8b0c734 .pp-heading-separator, .fl-node-5cbf3e8b0c734 .pp-heading').addClass('pp-tablet-');
    }

    if( $(window).width() <= 480 ) {
        $('.fl-node-5cbf3e8b0c734 .pp-heading-separator, .fl-node-5cbf3e8b0c734 .pp-heading').removeClass('pp-center');
        $('.fl-node-5cbf3e8b0c734 .pp-heading-separator, .fl-node-5cbf3e8b0c734 .pp-heading').addClass('pp-mobile-');
    }

})(jQuery);

(function($) {
	PPGallery = function(settings)
	{
		this.settings       = settings;
		this.id				= settings.id;
		this.nodeClass      = '.fl-node-' + settings.id;
		this.wrapperClass   = this.nodeClass + ' .pp-photo-gallery';
		this.itemClass      = this.wrapperClass + ' .pp-photo-gallery-item';
		this.cachedItems	= false;
		this.cachedIds		= [];
		this.isBuilderActive = settings.isBuilderActive;

		if ( this._hasItem() ) {
			this._initLayout();
		}
	};

	PPGallery.prototype = {

		settings        : {},
		nodeClass       : '',
		wrapperClass    : '',
		itemClass       : '',
		gallery         : null,
		cachedItems		: false,
		cachedIds		: [],
		isBuilderActive : false,

		_hasItem: function()
		{
			return $(this.itemClass).length > 0;
		},

		_initLayout: function()
		{
			if ( this.settings.layout === 'masonry' ) {
				this._masonryLayout();
			}

			if ( this.settings.layout === 'justified' ) {
				this._justifiedLayout();
			}

			if ( this.settings.lightbox ) {
				this._initLightbox();
			}

			if ( this.settings.pagination && 'none' !== this.settings.pagination ) {
				this._initPagination();
			}

			$(this.itemClass).css('visibility', 'visible');
		},

		_masonryLayout: function()
		{
			var wrap = $(this.wrapperClass);

			var isotopeData = {
				itemSelector: '.pp-gallery-masonry-item',
				percentPosition: true,
				transitionDuration: '0.6s',
				masonry: {
					columnWidth: '.pp-gallery-masonry-item',
					gutter: '.pp-photo-space'
				},
			};

			wrap.imagesLoaded( $.proxy( function() {
				wrap.isotope(isotopeData);
			}, this ) );
		},

		_justifiedLayout: function()
		{
			var wrap = $(this.wrapperClass);

			wrap.imagesLoaded( $.proxy(function () {
				$(this.wrapperClass).justifiedGallery({
					margins: this.settings.spacing,
					rowHeight: this.settings.rowHeight,
					maxRowHeight: this.settings.maxRowHeight,
					lastRow: this.settings.lastRow,
				});
			}, this));
		},

		_initLightbox: function()
		{
			var id = this.id;
			var options = {
				modal			: false,
				baseClass		: 'fancybox-' + id,
				buttons			: [
					'zoom',
					'slideShow',
					'fullScreen',
					'close'
				],
				wheel			: false,
				afterLoad		: function(current, previous) {
					$('.fancybox-' + id).find('.fancybox-bg').addClass('fancybox-' + id + '-overlay');
				},
			};

			if ( this.settings.lightboxCaption ) {
                options.caption = function(instance, item) {
                    var caption = $(this).attr('title') || '';
                    var desc = $(this).data('description') || '';
                    if (desc !== '') {
                        caption += '<div class="pp-fancybox-desc">' + desc + '</div>';
                    }
                    return caption;
                };
			}

			if ( this.settings.lightboxThumbs ) {
				options.buttons.push( 'thumbs' );
				options['thumbs'] = {
					autoStart: true, // Display thumbnails on opening
					hideOnClose: true, // Hide thumbnail grid when closing animation starts
					parentEl: ".fancybox-container", // Container is injected into this element
					axis: "y" // Vertical (y) or horizontal (x) scrolling
				}
			}

			$(this.nodeClass).find('a[data-fancybox="images"]').fancybox( options );
		},

		_initPagination: function()
		{
			var self = this;
			
			$(this.itemClass).each(function() {
				self.cachedIds.push( $(this).data('item-id') );
			});

			if ( 'load_more' === this.settings.pagination ) {
				this._initLoadMore();
			}
			if ( 'scroll' === this.settings.pagination && ! this.isBuilderActive ) {
				this._initScroll();
			}
		},

		_initLoadMore: function()
		{
			var self = this;

			$(this.nodeClass).find( '.pp-gallery-load-more' ).on('click', function(e) {
				e.preventDefault();

				var $this = $(this);
				$this.addClass('disabled loading');

				if ( self.cachedItems ) {
					self._renderItems();
				} else {
					self._getAjaxPhotos();
				}
			});
		},

		_initScroll: function() {
			var self 			= this,
				galleryOffset 	= $(this.wrapperClass).offset(),
				galleryHeight 	= $(this.wrapperClass).height(),
				winHeight		= $(window).height(),
				loaded			= false;

			$(window).on('scroll', function() {
				if ( loaded ) {
					return;
				}
				var scrollPos = $(window).scrollTop();

				if ( scrollPos >= galleryOffset.top - ( winHeight - galleryHeight ) ) {
					if ( $(self.nodeClass).find('.pp-gallery-pagination.loaded').length > 0 ) {
						loaded = true;
						$(self.nodeClass).find('.pp-gallery-loader').hide();
					} else {
						loaded = true;
						$(self.wrapperClass).imagesLoaded(function() {
							setTimeout(function() {
								//$(self.nodeClass).find('.pp-gallery-loader').show();
								if ( self.cachedItems ) {
									self._renderItems();
									galleryHeight = $(self.wrapperClass).height();
								} else {
									self._getAjaxPhotos(function() {
										galleryHeight = $(self.wrapperClass).height();
									});
								}
							}, 600);
						});
					}
				}
			});

			$(this.wrapperClass).on('gallery.rendered', function() {
				if ( $(self.nodeClass).find('.pp-gallery-pagination.loaded').length === 0 ) {
					loaded = false;
					galleryHeight = $(self.wrapperClass).height();
				}
			});
		},

		_getAjaxPhotos: function(callback) {
			var self = this;

			var data = {
				pp_action: 'pp_gallery_get_photos',
				node_id: self.settings.id,
				images_per_page: self.settings.perPage,
				settings: self.settings.settings
			};

			if ( self.settings.templateId ) {
				data['template_id'] = self.settings.templateId;
			}
			if ( self.settings.templateNodeId ) {
				data['template_node_id'] = self.settings.template_node_id;
			}

			$(this.nodeClass).find('.pp-gallery-loader').show();

			$.ajax({
				type: 'post',
				url: window.location.href.split( '#' ).shift(),
				data: data,
				async: true,
				success: function(response) {
					response = JSON.parse(response);
					
					if ( ! response.error ) {
						self.cachedItems = response.data;
						self._renderItems();
						if ( 'function' === typeof callback ) {
							callback();
						}
						$(self.nodeClass).find('.pp-gallery-loader').hide();
					}
				}
			});
		},

		_renderItems: function()
		{
			$(this.nodeClass).find( '.pp-gallery-load-more' ).removeClass('disabled loading');
			$(this.nodeClass).find('.pp-gallery-loader').show();

			var self = this,
				wrap = $(self.wrapperClass);

			if ( self.cachedItems ) {
				var count = 1;
				var items = [];

				$(self.cachedItems).each(function() {
					var id = $(this).data('item-id');

					if ( -1 === $.inArray( id, self.cachedIds ) ) {
						if ( count <= self.settings.perPage ) {
							self.cachedIds.push( id );
							items.push( this );
							count++;
						}
					}
				});

				if ( items.length > 0 ) {
					items = $(items).hide();
					
					// Grid layout.
					if ( self.settings.layout === 'grid' ) {
						wrap.append( items.fadeIn() );
					}
					
					// Justified layout.
					if ( self.settings.layout === 'justified' ) {
						wrap.append( items.fadeIn() );
						self._justifiedLayout();
					}

					// Masonry layout.
					if ( self.settings.layout === 'masonry' ) {
						items = items.show();
						wrap.isotope('insert', items);
						wrap.find('.pp-photo-space').remove();
						wrap.append('<div class="pp-photo-space"></div>');
						wrap.imagesLoaded($.proxy(function () {
							setTimeout(function () {
								wrap.isotope('layout');
							}, 500);
						}, this));
					}

					this._initLightbox();

					wrap.trigger('gallery.rendered');
				}

				if ( $(self.cachedItems).length === self.cachedIds.length ) {
					$(self.nodeClass).find('.pp-gallery-pagination').addClass('loaded').hide();
					$(self.nodeClass).find('.pp-gallery-loader').hide();
				}
			}
		}
	};

})(jQuery);
var pp_gallery_5cbf3f9414b21;
;(function($) {

	$(".fl-node-5cbf3f9414b21 .pp-photo-gallery-item, .fl-node-5cbf3f9414b21 .pp-gallery-masonry-item").find('.pp-photo-gallery-caption-below').parent().addClass('has-caption');

	
	var options = {
		id: '5cbf3f9414b21',
		layout: 'grid',
		gutter: 1,
		spacing: 5,
		columns: 4,
		rowHeight: 120,
		maxRowHeight: 120,
		lastRow: 'nojustify',
		lightbox: false,
		lightboxCaption: true,
		lightboxThumbs: false,
				pagination: 'none',
		perPage: 6,
						settings: {"gallery_layout":"grid","gallery_photos":[914,915,916,917,918,919,920,921,922,923,924,925],"photo_size":"full","photo_order":"normal","show_captions":"no","click_action":"custom-link","show_lightbox_thumb":"no","lightbox_image_size":"large","lightbox_caption":"yes","custom_link_target":"_self","hover_effects":"none","image_animation_speed":"300","overlay_effects":"none","overlay_animation_speed":"300","icon":"0","overlay_icon":"","photo_grid_count":"4","photo_grid_count_medium":"3","photo_grid_count_responsive":"2","photo_spacing":"1","justified_spacing":"5","row_height":"120","max_row_height":"0","last_row":"nojustify","bt_notes":"","photo_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"photo_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"photo_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"photo_padding":"","photo_padding_medium":"","photo_padding_responsive":"","show_image_shadow_hover":"no","image_shadow_hover":{"vertical":"0","horizontal":"2","blur":"15","spread":"0"},"image_shadow_color_hover":"rgba(0,0,0,0.5)","image_shadow_hover_speed":"300","overlay_type":"solid","overlay_color":"","overlay_primary_color":"","overlay_secondary_color":"","overlay_color_opacity":"70","overlay_border_width":"","overlay_border_color":"","overlay_spacing":"","overlay_icon_size":"30","overlay_icon_bg_color":"","overlay_icon_color":"","overlay_icon_radius":"","overlay_icon_horizotal_padding":"","overlay_icon_vertical_padding":"","lightbox_overlay_color":"rgba(0,0,0,0.5)","caption_bg_color":"","caption_alignment":"center","caption_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"caption_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"caption_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"caption_color":"","pagination":"none","images_per_page":"6","load_more_text":"Load More","load_more_bg_color":"eee","load_more_bg_hover_color":"","load_more_text_color":"","load_more_text_hover_color":"","load_more_border":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"load_more_border_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"load_more_border_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"load_more_border_hover_color":"","load_more_margin_top":"","load_more_margin_top_medium":"","load_more_margin_top_responsive":"","load_more_alignment":"left","responsive_display":"","visibility_display":"","visibility_user_capability":"","visibility_logic":"[]","animation":{"style":"","delay":"0","duration":"1"},"container_element":"div","id":"","class":"","export":"","import":"","caption_padding_top":"0","caption_padding_top_medium":"","caption_padding_top_responsive":"","caption_padding_right":"0","caption_padding_right_medium":"","caption_padding_right_responsive":"","caption_padding_bottom":"0","caption_padding_bottom_medium":"","caption_padding_bottom_responsive":"","caption_padding_left":"0","caption_padding_left_medium":"","caption_padding_left_responsive":"","load_more_padding_top":"10","load_more_padding_top_medium":"","load_more_padding_top_responsive":"","load_more_padding_right":"10","load_more_padding_right_medium":"","load_more_padding_right_responsive":"","load_more_padding_bottom":"10","load_more_padding_bottom_medium":"","load_more_padding_bottom_responsive":"","load_more_padding_left":"10","load_more_padding_left_medium":"","load_more_padding_left_responsive":"","margin_top":"0","margin_unit":"px","margin_top_medium":"","margin_medium_unit":"px","margin_top_responsive":"","margin_responsive_unit":"px","margin_right":"0","margin_right_medium":"","margin_right_responsive":"","margin_bottom":"0","margin_bottom_medium":"","margin_bottom_responsive":"","margin_left":"0","margin_left_medium":"","margin_left_responsive":"","type":"pp-gallery","photo_data":{"914":{"id":914,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g1.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g1.jpg","cta_link":"\/virtual-slips\/"},"915":{"id":915,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g2.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g2.jpg","cta_link":"\/rules\/"},"916":{"id":916,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g3.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g3.jpg","cta_link":"\/tournaments\/#decklists"},"917":{"id":917,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g4.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g4.jpg","cta_link":"\/forum\/"},"918":{"id":918,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g5.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g5.jpg","cta_link":"\/podcasts-videos\/"},"919":{"id":919,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g6.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g6.jpg","cta_link":"\/tournaments\/#resources"},"920":{"id":920,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g7.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g7.jpg","cta_link":"\/tournaments\/#calendar"},"921":{"id":921,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g8.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g8.jpg","cta_link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/plugins\/card-search\/cardSearch.html"},"922":{"id":922,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g9.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g9.jpg","cta_link":"\/new-returning-players\/"},"923":{"id":923,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g10.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g10.jpg","cta_link":"#"},"924":{"id":924,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g11.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g11.jpg","cta_link":"\/online-play\/"},"925":{"id":925,"alt":"Star Wars Players Committee","caption":"","description":"","title":"Star Wars Players Committee","sizes":{"height":400,"width":500},"src":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g12.jpg","link":"https:\/\/www.starwarsccg.org\/wp\/wp-content\/uploads\/2019\/07\/g12.jpg","cta_link":"\/cube\/"}},"connections":{"gallery_photos":"","image_shadow_color_hover":"","overlay_color":"","overlay_primary_color":"","overlay_secondary_color":"","overlay_border_color":"","overlay_icon_bg_color":"","overlay_icon_color":"","lightbox_overlay_color":"","caption_bg_color":"","caption_color":""}},
		isBuilderActive: false	};

	pp_gallery_5cbf3f9414b21 = new PPGallery(options);

	// expandable row fix.
	var state = 0;
	$(document).on('pp_expandable_row_toggle', function(e, selector) {
		if ( selector.is('.pp-er-open') && state === 0 ) {
			new PPGallery(options);
			state = 1;
		}
	});

	// accordion fix
	var accordion_state = false;
	$(document).on('pp-accordion-toggle-complete', function(e, selector) {
		if ( ! accordion_state ) {
			new PPGallery(options);
			accordion_state = true;
		}
	});

	// tabs fix
	var tabs_state = false;
	$(document).on('pp-tabs-switched', function(e, selector) {
		if ( selector.find('.pp-photo-gallery-content').length > 0 && ! tabs_state ) {
			new PPGallery(options);
			tabs_state = true;
		}
	});
})(jQuery);

( function( $ ) {

	UABBSubscribeFormModule = function( settings )
	{
		this.settings	= settings;
		this.nodeClass	= '.fl-node-' + settings.id;
		this.form 		= $( this.nodeClass + ' .uabb-subscribe-form' );
		this.button		= this.form.find( 'a.uabb-button' );
		this.btn_width	= settings.btn_width;
		this.btn_padding = settings.btn_padding;
		this.layout = settings.layout;
		this._init();
	};

	UABBSubscribeFormModule.prototype = {
	
		settings	: {},
		nodeClass	: '',
		form		: null,
		button		: null,
		
		_init: function()
		{
			this.button.on( 'click', $.proxy( this._submitForm, this ) );
			var form = $( '.uabb-form-wrap' ),
				inputFName = form.find( 'input[name=uabb-subscribe-form-fname]' ),
				inputLName = form.find( 'input[name=uabb-subscribe-form-lname]' ),
				inputEmail = form.find( 'input[name=uabb-subscribe-form-email]' );

				inputFName.on('focusout', this._focusOut);
				inputLName.on('focusout', this._focusOut);
				inputEmail.on('focusout', this._focusOut);

				inputFName.on('focus', this._removeErrorClass);
				inputLName.on('focus', this._removeErrorClass);
				inputEmail.on('focus', this._removeErrorClass);

			if( this.btn_width != 'custom' && this.layout == 'inline' ) {
				var height = $( this.nodeClass + ' .uabb-form-field input[type=text]' ).outerHeight(true),
					line_height = ( height - ( 2 * this.btn_padding ) );
				$( this.nodeClass + ' .uabb-form-button a' ).css( 'height', height );
				$( this.nodeClass + ' .uabb-form-button a' ).css( 'line-height', line_height + 'px' );
			}
		},

		_focusOut: function( e ) {
			if( $( this ).val().length !== 0 ) {
				$( this ).parent().addClass( 'open' );
			} else {
				$( this ).parent().removeClass( 'open' );
			}
		},
		
		_removeErrorClass: function(){
			$( this ).removeClass('uabb-form-error');
		},

		_submitForm: function( e )
		{
			var submitButton		= $( e.currentTarget ),
				currentForm     	= submitButton.closest( '.uabb-subscribe-form' ),
				postId      		= currentForm.closest( '.fl-builder-content' ).data( 'post-id' ),
				templateId 	        = currentForm.data( 'template-id' ),
				templateNodeId		= currentForm.data( 'template-node-id' ),
				nodeId      		= currentForm.closest( '.fl-module' ).data( 'node' ),
				buttonText  		= submitButton.find( '.uabb-button-text' ).text(),
				waitText    		= submitButton.closest( '.uabb-form-button' ).data( 'wait-text' ),
				fname        		= currentForm.find( 'input[name=uabb-subscribe-form-fname]' ),
				lname        		= currentForm.find( 'input[name=uabb-subscribe-form-lname]' ),
				email       		= currentForm.find( 'input[name=uabb-subscribe-form-email]' ),
				termsCheckbox   	= currentForm.find( 'input[name=uabb-terms-checkbox]'),
				re          		= /\S+@\S+\.\S+/,
				valid       		= true;

			e.preventDefault();

			if ( submitButton.hasClass( 'uabb-form-button-disabled' ) ) {
				return; // Already submitting
			}
			/*if ( name.length > 0 && name.val() == '' ) {
				name.addClass( 'uabb-form-error' );
				name.siblings( '.uabb-form-error-message' ).show();
				valid = false;
			}*/
			if ( '' == email.val() || ! re.test( email.val() ) ) {
				email.addClass( 'uabb-form-error' );
				email.siblings( '.uabb-form-error-message' ).show();
				valid = false;
			}

			if ( termsCheckbox.val() ) {
				if ( ! termsCheckbox.is(':checked') ) {
					valid = false;
					termsCheckbox.closest('.uabb-terms-wrap').addClass( 'uabb-form-error' );
					termsCheckbox.parent().siblings( '.uabb-form-error-message' ).show();
				}
				else {
					termsCheckbox.removeClass( 'uabb-form-error-message' );
					termsCheckbox.parent().siblings( '.uabb-form-error-message' ).hide();
				}
			}
			
			if ( valid ) {
				
				currentForm.find( '> .uabb-form-error-message' ).hide();
				submitButton.find( '.uabb-button-text' ).text( waitText );
				submitButton.data( 'original-text', buttonText );
				submitButton.addClass( 'uabb-form-button-disabled' );
				
					ajaxData = {
					action  			: 'uabb_subscribe_form_submit',
					lname    			: lname.val(),
					fname    			: fname.val(),
					email   			: email.val(),
					post_id 			: postId,
					template_id 		: templateId,
					template_node_id 	: templateNodeId,
					node_id 			: nodeId
				};

				$.post( FLBuilderLayoutConfig.paths.wpAjaxUrl, ajaxData, $.proxy( function( response ){
					this._submitFormComplete( response, submitButton );
				}, this ));

			}
		},
		
		_submitFormComplete: function( response , button )
		{

			var data        = JSON.parse( response ),
				buttonText  = button.data( 'original-text' ),
				form        = button.closest( '.uabb-subscribe-form' );
			if ( data.error ) {
				
				form.find( '> .uabb-form-error-message' ).text( data.error );
				form.find( '> .uabb-form-error-message' ).show();
				button.removeClass( 'uabb-form-button-disabled' );
				button.find( '.uabb-button-text' ).text( buttonText );
			} else {
				
				button.removeClass( 'uabb-form-button-disabled' );
				button.find( '.uabb-button-text' ).text( buttonText );
				if ( 'message' == data.action ) {
					form.find( '> *' ).hide();
					form.append( '<div class="fl-form-success-message">' + data.message + '</div>' );
				}
				else if ( 'redirect' == data.action ) {
					window.location.href = data.url;
				}
			}

		}
	}
	
})( jQuery );
(function($) {

	$(function() {
		jQuery( document ).ready(function($) {
			new UABBSubscribeFormModule({
				id: '5cbf5c46354fc',
				btn_width: 'full',
				btn_padding: '12',
				layout: 'inline',
			});
		});

	});
})(jQuery);

/**
 * This file should contain frontend logic for 
 * all module instances.
 */(function($) {

			$('.fl-node-5cbf5cff7c6e4 .pp-list-connector').css('left', ( $('.fl-node-5cbf5cff7c6e4 .pp-icon-wrapper').width() )/2 + "px");
			})(jQuery);

/* Start Global Node Custom JS */

/* End Global Node Custom JS */


/* Start Layout Custom JS */

/* End Layout Custom JS */

		;(function($){
			var form = $('.fl-builder-settings'),
				gradient_type = form.find( 'input[name=uabb_row_gradient_type]' );

			$( document ).on( 'change', 'input[name=uabb_row_radial_advance_options], input[name=uabb_row_linear_advance_options], input[name=uabb_row_gradient_type], select[name=bg_type]', function() {
				var form        = $('.fl-builder-settings'),
					background_type       = form.find( 'select[name=bg_type]' ).val(),
					linear_direction      = form.find( 'select[name=uabb_row_uabb_direction]' ).val(),
					linear_advance_option = form.find( 'input[name=uabb_row_linear_advance_options]:checked' ).val(),
					radial_advance_option = form.find( 'input[name=uabb_row_radial_advance_options]:checked' ).val(),
					gradient_type         = form.find( 'input[name=uabb_row_gradient_type]:checked' ).val();				
				if( background_type == 'uabb_gradient' ) {

					if( gradient_type == 'radial' ) {

						setTimeout( function() { 
							form.find('#fl-field-uabb_row_linear_direction').hide();
							form.find('#fl-field-uabb_row_linear_gradient_primary_loc').hide();
							form.find('#fl-field-uabb_row_linear_gradient_secondary_loc').hide();
						}, 1);

						if( radial_advance_option == 'yes' ) {
							form.find('#fl-field-uabb_row_radial_gradient_primary_loc').show();
							form.find('#fl-field-uabb_row_radial_gradient_secondary_loc').show();
						}
					}

					if( gradient_type == 'linear' ) {

						setTimeout( function() { 
							form.find('#fl-field-uabb_row_radial_gradient_primary_loc').hide();
							form.find('#fl-field-uabb_row_radial_gradient_secondary_loc').hide();
						}, 1);

						if( linear_direction == 'custom' ) {
							form.find('#fl-field-uabb_row_linear_direction').show();
						}

						if( linear_advance_option == 'yes' ) {
							form.find('#fl-field-uabb_row_linear_gradient_primary_loc').show();
							form.find('#fl-field-uabb_row_linear_gradient_secondary_loc').show();
						}
					}   
				}
			});
		})(jQuery);	

		;(function($) {
				var url ='https://www.starwarsccg.org/wp/wp-content/plugins/bb-ultimate-addon/assets/js/particles.min.js';

				window.particle_js_loaded = 0;

				jQuery.cachedScript = function( url, options ) {

					// Allow user to set any option except for dataType, cache, and url.
					options = jQuery.extend( options || {}, {
						dataType: "script",
						cache: true,
						url: url
					});
					// Return the jqXHR object so we can chain callbacks.
					return jQuery.ajax( options );
				};

				if (  jQuery( '.uabb-row-particles-background' ).length ) {

					jQuery.cachedScript( url ).done( function( script, textStatus ) {
						window.particle_js_loaded = 1;
						init_particles_row_background_script();

					});
				}
			function init_particles_row_background_script() {

									row_id = '5cbf3e810ba1a';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-row-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
													} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5cbf5c46361ea';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-row-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
													} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5cbf5d0530503';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-row-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
													} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
						}
		})(jQuery);
		;(function($){
		$( document ).on( 'change', 'select[name=uabb_row_particles_style]', function() {
			_hideFields();
		});
		$( document ).on( 'change', 'select[name=enable_particles]', function() {
			_hideFields();
		});
		$( document ).on( 'change', 'select[name=uabb_row_particles_settings]', function() {
			_hideFields();
		});

		$( document ).on( 'init', '.fl-builder-settings', function() {
			_hideFields();
		});
		function _hideFields() { 

			var form = $('.fl-builder-settings');

			var branding = 'no';

			if ( form.length > 0 ) {

				enable_particle = form.find( 'select[name=enable_particles]' ).val();

				if ( 'no' === enable_particle ) {

					form.find('#fl-field-uabb_particles_direction').hide();
					form.find('#fl-field-uabb_particles_custom_code').hide();
					form.find('#fl-field-uabb_row_particles_style').hide();
					form.find('#fl-field-uabb_row_particles_color').hide();
					form.find('#fl-field-uabb_row_particles_color_opacity').hide();
					form.find('#fl-field-uabb_row_particles_settings').hide();
					form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
					form.find('#fl-field-uabb_row_particles_size').hide();
					form.find('#fl-field-uabb_row_particles_speed').hide();
					form.find('#fl-field-uabb_row_number_particles').hide();

				} else {
					if ( 'snow' === form.find('select[name=uabb_row_particles_style]').val() ) {
						form.find('#fl-field-uabb_row_particles_style').show();
						form.find('#fl-field-uabb_row_particles_color').show();
						form.find('#fl-field-uabb_row_particles_color_opacity').show();
						form.find('#fl-field-uabb_row_particles_settings').show();
						form.find('#fl-field-uabb_particles_direction').show();
						form.find('#fl-field-uabb_particles_custom_code').hide();
						if (  'yes' === form.find('select[name=uabb_row_particles_settings]').val() ) {
							form.find('#fl-field-uabb_row_particles_size').show();
							form.find('#fl-field-uabb_row_particles_speed').show();
							form.find('#fl-field-uabb_row_number_particles').show();
							form.find('#fl-field-uabb_row_particles_interactive_settings').show();
						} else {
							form.find('#fl-field-uabb_row_particles_size').hide();
							form.find('#fl-field-uabb_row_particles_speed').hide();
							form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
							form.find('#fl-field-uabb_row_number_particles').hide();
						}
					}
					if ( 'custom' === form.find('select[name=uabb_row_particles_style]').val() ) {

						form.find('#fl-field-uabb_particles_custom_code').show();
						form.find('#fl-field-uabb_particles_direction').hide();
						form.find('#fl-field-uabb_row_particles_style').show();
						form.find('#fl-field-uabb_row_particles_color').hide();
						form.find('#fl-field-uabb_row_particles_color_opacity').hide();
						form.find('#fl-field-uabb_row_particles_settings').hide();
						form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
						form.find('#fl-field-uabb_row_particles_size').hide();
						form.find('#fl-field-uabb_row_particles_speed').hide();
						form.find('#fl-field-uabb_row_number_particles').hide();
					}
					if ( 'nasa' === form.find('select[name=uabb_row_particles_style]').val() || 'default' === form.find('select[name=uabb_row_particles_style]').val() ) {
						form.find('#fl-field-uabb_row_particles_style').show();
						form.find('#fl-field-uabb_row_particles_color').show();
						form.find('#fl-field-uabb_row_particles_color_opacity').show();
						form.find('#fl-field-uabb_row_particles_settings').show();
						form.find('#fl-field-uabb_row_particles_interactive_settings').show();
						form.find('#fl-field-uabb_particles_custom_code').hide();
						form.find('#fl-field-uabb_particles_direction').hide();

						if (  'yes' === form.find('select[name=uabb_row_particles_settings]').val() ) {
							form.find('#fl-field-uabb_row_particles_size').show();
							form.find('#fl-field-uabb_row_particles_speed').show();
							form.find('#fl-field-uabb_row_number_particles').show();
							form.find('#fl-field-uabb_row_particles_interactive_settings').show();
						} else {
							form.find('#fl-field-uabb_row_particles_size').hide();
							form.find('#fl-field-uabb_row_particles_speed').hide();
							form.find('#fl-field-uabb_row_number_particles').hide();
							form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
						}
					}
					if ( 'custom' === form.find('select[name=uabb_row_particles_style]').val() ) {

						style_selector = form.find( '#fl-field-uabb_row_particles_style' );

						wrapper =	style_selector.find( '.fl-field-control-wrapper' );

						if ( wrapper.find( '.fl-field-description' ).length === 0 ) {

							if ( 'no' === branding ) {

								style_selector.find( '.fl-field-control-wrapper' ).append( '<span class="fl-field-description uabb-particle-docs-list"><div class="uabb-docs-particle"> Add custom JSON for the Particles Background below. To generate a completely customized background style follow steps below - </div><div class="uabb-docs-particle">1. Visit a link <a class="uabb-docs-particle-link" href="https://vincentgarreau.com/particles.js/" target="_blank"> here </a> and choose required attributes for particles</div><div class="uabb-docs-particle">2. Once a custom style is created, download JSON from "Download current config (json)" link</div><div class="uabb-docs-particle">3. Copy JSON code from the above file and paste it below</div><div class="uabb-docs-particle">To know more about creating a custom style, refer to a document <a class="uabb-docs-particle-link" href="https://www.ultimatebeaver.com/docs/custom-particle-backgrounds/?utm_source=uabb-pro-backend&utm_medium=row-editor-screen&utm_campaign=particle-backgrounds-row" target="_blank" rel="noopener"> here. </a></div></span>' );

							} else {

								style_selector.find( '.fl-field-control-wrapper' ).append( '<span class="fl-field-description uabb-particle-docs-list"><div class="uabb-docs-particle"> Add custom JSON for the Particles Background below. To generate a completely customized background style follow steps below - </div><div class="uabb-docs-particle">1. Visit a link <a class="uabb-docs-particle-link" href="https://vincentgarreau.com/particles.js/" target="_blank"> here </a> and choose required attributes for particles</div><div class="uabb-docs-particle">2. Once a custom style is created, download JSON from "Download current config (json)" link</div><div class="uabb-docs-particle">3. Copy JSON code from the above file and paste it below</div></span>' );
							}

						} else {
							wrapper.find( '.fl-field-description' ).show();
						}
					} else {

						style_selector = form.find( '#fl-field-uabb_row_particles_style' );

						wrapper =	style_selector.find( '.fl-field-control-wrapper' );

						wrapper.find( '.fl-field-description' ).hide();
					}
				}
			}
		}
	})(jQuery);
			;(function($){
			var form = $('.fl-builder-settings'),
				gradient_type = form.find( 'input[name=uabb_col_gradient_type]' );

			$( document ).on( 'change', ' input[name=uabb_col_radial_advance_options], input[name=uabb_col_linear_advance_options], input[name=uabb_col_gradient_type], select[name=bg_type]', function() {
				var form        = $('.fl-builder-settings'),
					background_type       = form.find( 'select[name=bg_type]' ).val(),
					linear_direction      = form.find( 'select[name=uabb_col_uabb_direction]' ).val(),
					linear_advance_option = form.find( 'input[name=uabb_col_linear_advance_options]:checked' ).val(),
					radial_advance_option = form.find( 'input[name=uabb_col_radial_advance_options]:checked' ).val(),
					gradient_type         = form.find( 'input[name=uabb_col_gradient_type]:checked' ).val();		
				if( background_type == 'uabb_gradient' ) {

					if( gradient_type == 'radial' ) {
						setTimeout( function() {                        
							form.find('#fl-field-uabb_col_linear_direction').hide();
							form.find('#fl-field-uabb_col_linear_gradient_primary_loc').hide();
							form.find('#fl-field-uabb_col_linear_gradient_secondary_loc').hide();
						}, 1);    

						if( radial_advance_option == 'yes' ) {
							form.find('#fl-field-uabb_col_radial_gradient_primary_loc').show();
							form.find('#fl-field-uabb_col_radial_gradient_secondary_loc').show();
						}
					}

					if( gradient_type == 'linear' ) {
						setTimeout( function() { 
								form.find('#fl-field-uabb_col_radial_gradient_primary_loc').hide();
								form.find('#fl-field-uabb_col_radial_gradient_secondary_loc').hide();
						}, 1);

						if( linear_direction == 'custom' ) {
							form.find('#fl-field-uabb_col_linear_direction').show();
						}

						if( linear_advance_option == 'yes' ) {
							form.find('#fl-field-uabb_col_linear_gradient_primary_loc').show();
							form.find('#fl-field-uabb_col_linear_gradient_secondary_loc').show();
						}
					}   
				}
			});

		})(jQuery);  
	