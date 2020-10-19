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

(function($) {

	/**
	 * Class for Menu Module
	 *
	 * @since 1.6.1
	 */
	PPAdvancedMenu = function( settings ) {

		// set params
		this.settingsId 		 = settings.id;
		this.nodeClass           = '.fl-node-' + settings.id;
		this.wrapperClass        = this.nodeClass + ' .pp-advanced-menu';
		this.type				 = settings.type;
		this.mobileToggle		 = settings.mobile;
		this.breakPoints         = settings.breakPoints;
		this.mobileBreakpoint	 = settings.mobileBreakpoint;
		this.mediaBreakpoint	 = settings.mediaBreakpoint;
		this.mobileMenuType	 	 = settings.mobileMenuType;
		this.offCanvasDirection	 = settings.offCanvasDirection;
		this.isBuilderActive	 = settings.isBuilderActive;
		this.currentBrowserWidth = window.innerWidth;

		this._bindSettingsFormEvents();
		// initialize the menu
		this._initMenu();

		// check if viewport is resizing
		$( window ).on( 'resize', $.proxy( function( e ) {

			var width = window.innerWidth;

			// if screen width is resized, reload the menu
		    if( width != this.currentBrowserWidth ) {

				this._initMenu();
 				this._clickOrHover();
		    	this.currentBrowserWidth = width;
			}

		}, this ) );

	};

	PPAdvancedMenu.prototype = {
		nodeClass               : '',
		wrapperClass            : '',
		type 	                : '',
		breakPoints 			: {},
		$submenus				: null,
		fullScreenMenu			: null,
		offCanvasMenu			: null,

		/**
		 * Check if the screen size fits a mobile viewport.
		 *
		 * @since  1.6.1
		 * @return bool
		 */
		_isMobile: function() {
			return window.innerWidth <= this.breakPoints.small ? true : false;
		},

		/**
		 * Check if the screen size fits a medium viewport.
		 *
		 * @since  1.10.5
		 * @return bool
		 */
		_isMedium: function() {
			return window.innerWidth <= this.breakPoints.medium ? true : false;
		},

		/**
		 * Check if the screen size fits a custom viewport.
		 *
		 * @since  1.10.5
		 * @return bool
		 */
		_isCustom: function() {
			return window.innerWidth <= this.breakPoints.custom ? true : false;
		},

		_isTouch: function() {
			var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
			var mq = function(query) {
			  return window.matchMedia(query).matches;
			}
		  
			if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
			  return true;
			}
		  
			// include the 'heartz' as a way to have a non matching MQ to help terminate the join
			// https://git.io/vznFH
			var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
			return mq(query);
		},

		/**
		 * Check if the menu should toggle for the current viewport base on the selected breakpoint
		 *
		 * @see 	this._isMobile()
		 * @see 	this._isMedium()
		 * @since  	1.10.5
		 * @return bool
		 */
		_isMenuToggle: function() {
			if ( 'always' == this.mobileBreakpoint
				|| ( this._isMobile() && 'mobile' == this.mobileBreakpoint )
				|| ( this._isMedium() && 'medium-mobile' == this.mobileBreakpoint )
				|| ( this._isCustom() && 'custom' == this.mobileBreakpoint )
				) {
				return true;
			}

			return false;
		},

		_bindSettingsFormEvents: function()
		{
			// $('body').delegate( '.fl-builder-settings select[name="offcanvas_direction"]', 'change', function() {
			// 	$('html').removeClass('pp-off-canvas-menu-open');
			// } );
		},

		/**
		 * Initialize the toggle logic for the menu.
		 *
		 * @see    this._isMobile()
		 * @see    this._menuOnCLick()
		 * @see    this._clickOrHover()
		 * @see    this._submenuOnRight()
		 * @see    this._submenuRowZindexFix()
		 * @see    this._toggleForMobile()
		 * @since  1.6.1
		 * @return void
		 */
		_initMenu: function() {
			this._menuOnFocus();
			this._submenuOnClick();
			if ( $( this.nodeClass ).length && this.type == 'horizontal' ) {
				this._initMegaMenus();
			}

			if( this._isMenuToggle() || this.type == 'accordion' ) {

				$( this.wrapperClass ).off( 'mouseenter mouseleave' );
				this._menuOnClick();
				this._clickOrHover();

			} else {
				$( this.wrapperClass ).off( 'click' );
				this._submenuOnRight();
				this._submenuRowZindexFix();
			}

			if( this.mobileToggle != 'expanded' ) {
				this._toggleForMobile();

				if( this.mobileMenuType === 'off-canvas' ) {
					this._initOffCanvas();
				}

				if( this.mobileMenuType === 'full-screen' ) {
					this._initFullScreen();
				}
			}

			$(this.wrapperClass).find('li:not(.menu-item-has-children)').off().on('click', 'a', $.proxy(function (e) {

				$(this.nodeClass).find('.pp-advanced-menu').removeClass('menu-open');
				$(this.nodeClass).find('.pp-advanced-menu').addClass('menu-close');
				$('html').removeClass('pp-off-canvas-menu-open');
				$('html').removeClass('pp-full-screen-menu-open');

			}, this));
		},

		/**
		 * Adds a focus class to menu elements similar to be used similar to CSS :hover psuedo event
		 *
		 * @since  1.9.0
		 * @return void
		 */
		_menuOnFocus: function() {
			$( this.nodeClass ).off('focus').on( 'focus', 'a', $.proxy( function( e ) {
				var $menuItem	= $( e.target ).parents( '.menu-item' ).first(),
					$parents	= $( e.target ).parentsUntil( this.wrapperClass );

				$('.pp-advanced-menu .focus').removeClass('focus');

				$menuItem.addClass('focus');
				$parents.addClass('focus');

			}, this ) ).on( 'focusout', 'a', $.proxy( function( e ) {
				$( e.target ).parentsUntil( this.wrapperClass ).removeClass( 'focus' );
			}, this ) );
		},

		/**
		 * Logic for submenu toggling on accordions or mobile menus (vertical, horizontal)
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_menuOnClick: function() {
			var self = this;
			var $mainItem = '';

			$( this.wrapperClass ).off().on( 'click', '.pp-has-submenu-container', $.proxy( function( e ) {

				if ( self._isTouch() ) {
					if ( ! $(this).hasClass('first-click') ) {
						e.preventDefault();
						$(this).addClass('first-click');
					}
				}

				var isMainEl = $(e.target).parents('.menu-item').parent().parent().hasClass('pp-advanced-menu');

				if (isMainEl && $mainItem === '') {
					$mainItem = $(e.target).parents('.menu-item');
				}

				var $link			= $( e.target ).parents( '.pp-has-submenu' ).first(),
					$subMenu 		= $link.children( '.sub-menu' ).first(),
					$href	 		= $link.children('.pp-has-submenu-container').first().find('> a').attr('href'),
					$subMenuParents = $( e.target ).parents( '.sub-menu' ),
					$activeParent 	= $( e.target ).closest( '.pp-has-submenu.pp-active' );

				if( !$subMenu.is(':visible') || $(e.target).hasClass('pp-menu-toggle')
					|| ($subMenu.is(':visible') && (typeof $href === 'undefined' || $href == '#')) ) {
					e.preventDefault();
				}
				else {
					window.location.href = $href;
					return;
				}

				if ($(this.wrapperClass).hasClass('pp-advanced-menu-accordion-collapse')) {

					if ( !$link.parents('.menu-item').hasClass('pp-active') ) {
						$('.menu .pp-active', this.wrapperClass).not($link).removeClass('pp-active');
					}
					else if ($link.parents('.menu-item').hasClass('pp-active') && $link.parent('.sub-menu').length) {
						$('.menu .pp-active', this.wrapperClass).not($link).not($activeParent).removeClass('pp-active');
					}

					$('.sub-menu', this.wrapperClass).not($subMenu).not($subMenuParents).slideUp('normal');
				}

				// Parent menu toggle icon was being reversed on collapsing its submenu,
				// so here is the workaround to fix this behavior.
				if ($(self.wrapperClass).find('.sub-menu:visible').length > 0) {
					$(self.wrapperClass).find('.sub-menu:visible').parent().addClass('pp-active');
				}
				$subMenu.slideToggle(400, function() {
					// Reset previously opened sub-menu toggle icon.
					$(e.target).parents('.pp-has-submenu-container').parent().parent().find('> .menu-item.pp-active').removeClass('pp-active');
					
					if ($mainItem !== '') {
						$mainItem.parent().find('.menu-item.pp-active').removeClass('pp-active');
						$(self.wrapperClass).find('.sub-menu').parent().removeClass('pp-active');

						if ($(self.wrapperClass).find('.sub-menu:visible').length > 0) {
							$(self.wrapperClass).find('.sub-menu:visible').parent().addClass('pp-active');
						} else {
							$link.toggleClass('pp-active');
							$mainItem.removeClass('pp-active');
						}
					} else {
						$link.toggleClass('pp-active');
					}
					if (!$subMenu.is(':visible')) {
						$subMenu.parent().removeClass('pp-active');
					}
				});

			}, this ) );

		},

		/**
		 * Logic for submenu items click event
		 *
		 * @since  1.3.1
		 * @return void
		 */
		_submenuOnClick: function(){
			$( this.wrapperClass + ' .sub-menu' ).off().on( 'click', 'a', $.proxy( function( e ){
				if ( $( e.target ).parent().hasClass('focus') ) {
					$( e.target ).parentsUntil( this.wrapperClass ).removeClass('focus');
				}
			}, this ) );
		},

		/**
		 * Changes general styling and behavior of menus based on mobile / desktop viewport.
		 *
		 * @see    this._isMobile()
		 * @since  1.6.1
		 * @return void
		 */
		_clickOrHover: function() {
			this.$submenus = this.$submenus || $( this.wrapperClass ).find( '.sub-menu' );
			var $wrapper   = $( this.wrapperClass ),
				$menu      = $wrapper.find( '.menu' );
				$li        = $wrapper.find( '.pp-has-submenu' );

			if( this._isMenuToggle() ) {
				$li.each( function( el ) {
					if( !$(this).hasClass('pp-active') ) {
						$(this).find( '.sub-menu' ).fadeOut();
					}
				} );
			} else {
				$li.each( function( el ) {
					if( !$(this).hasClass('pp-active') ) {
						$(this).find( '.sub-menu' ).css( {
							'display' : '',
							'opacity' : ''
						} );
					}
				} );
			}
		},

		/**
		 * Logic to prevent submenus to go outside viewport boundaries.
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_submenuOnRight: function() {

			$( this.wrapperClass )
				.on( 'mouseenter', '.pp-has-submenu', $.proxy( function( e ) {

					if( $ ( e.currentTarget ).find('.sub-menu').length === 0 ) {
						return;
					}

					var $link           = $( e.currentTarget ),
						$parent         = $link.parent(),
						$subMenu        = $link.find( '.sub-menu' ),
						subMenuWidth    = $subMenu.width(),
						subMenuPos      = 0,
						winWidth        = window.innerWidth;

					if( $link.closest( '.pp-menu-submenu-right' ).length !== 0) {

						$link.addClass( 'pp-menu-submenu-right' );

					} else if( $( 'body' ).hasClass( 'rtl' ) ) {

						subMenuPos = $parent.is( '.sub-menu' ) ?
									 $parent.offset().left - subMenuWidth:
									 $link.offset().left - subMenuWidth;

						if( subMenuPos <= 0 ) {
							$link.addClass( 'pp-menu-submenu-right' );
						}

					} else {

						subMenuPos = $parent.is( '.sub-menu' ) ?
									 $parent.offset().left + $parent.width() + subMenuWidth :
									 $link.offset().left + subMenuWidth;

						if( subMenuPos > winWidth ) {
							$link.addClass('pp-menu-submenu-right');
						}
					}
				}, this ) )
				.on( 'mouseleave', '.pp-has-submenu', $.proxy( function( e ) {
					$( e.currentTarget ).removeClass( 'pp-menu-submenu-right' );
				}, this ) );

		},

		/**
		 * Logic to prevent submenus to go behind the next overlay row.
		 *
		 * @since  2.2
		 * @return void
		 */
		_submenuRowZindexFix: function (e) {

			$(this.wrapperClass)
				.on('mouseenter', 'ul.menu > .pp-has-submenu', $.proxy(function (e) {

					if ($(e.currentTarget).find('.sub-menu').length === 0) {
						return;
					}

					$(this.nodeClass)
						.closest('.fl-row')
						.find('.fl-row-content')
						.css('z-index', '10');

				}, this))
				.on('mouseleave', 'ul.menu > .pp-has-submenu', $.proxy(function (e) {

					$(this.nodeClass)
						.closest('.fl-row')
						.find('.fl-row-content')
						.css('z-index', '');

				}, this));
		},

		/**
		 * Logic for the mobile menu button.
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_toggleForMobile: function() {

			var $wrapper = null,
				$menu    = null;

			if( this._isMenuToggle() ) {

				if (this.mobileMenuType === 'default') {
					this._placeMobileMenuBelowRow();
					$wrapper = $(this.wrapperClass);
					$menu = $(this.nodeClass + '-clone');
					$menu.find('ul.menu').show();
				}
				else {
					$wrapper = $(this.wrapperClass);
					$menu = $wrapper.children('.menu');
				}

				if( !$wrapper.find( '.pp-advanced-menu-mobile-toggle' ).hasClass( 'pp-active' ) ) {
					$menu.css({ display: 'none' });
				}

				$wrapper.on( 'click', '.pp-advanced-menu-mobile-toggle', function( e ) {
					$( this ).toggleClass( 'pp-active' );
					$menu.slideToggle();
				} );

				$menu.on( 'click', '.menu-item > a[href*="#"]', function(e) {
					var $href = $(this).attr('href'),
						$targetID = '';

					if ( $href !== '#' ) {
						$targetID = $href.split('#')[1];

						if ( $('body').find('#'+  $targetID).length > 0 ) {
							e.preventDefault();
							$( this ).toggleClass( 'pp-active' );
							$menu.slideToggle('fast', function() {
								setTimeout(function() {
									$('html, body').animate({
								        scrollTop: $('#'+ $targetID).offset().top
								    }, 1000, function() {
								        window.location.hash = $targetID;
								    });
								}, 500);
							});
						}
					}
				});
			}
			else {

				if (this.mobileMenuType === 'default') {
					this._removeMenuFromBelowRow();
				}

				$wrapper = $( this.wrapperClass ),
				$menu    = $wrapper.children( '.menu' );
				$wrapper.find( '.pp-advanced-menu-mobile-toggle' ).removeClass( 'pp-active' );
				$menu.css({ display: '' });
			}
		},

		/**
		 * Init any mega menus that exist.
		 *
		 * @see 	this._isMenuToggle()
		 * @since  	1.10.4
		 * @return void
		 */
		_initMegaMenus: function() {

			var module     = $( this.nodeClass ),
				rowContent = module.closest( '.fl-row-content' ),
				rowWidth   = rowContent.width(),
				rowOffset  = rowContent.offset().left,
				megas      = module.find( '.mega-menu' ),
				disabled   = module.find( '.mega-menu-disabled' ),
				isToggle   = this._isMenuToggle();

			if ( isToggle ) {
				megas.removeClass( 'mega-menu' ).addClass( 'mega-menu-disabled' );
				module.find( 'li.mega-menu-disabled > ul.sub-menu' ).css( 'width', '' );
				rowContent.css( 'position', '' );
			} else {
				disabled.removeClass( 'mega-menu-disabled' ).addClass( 'mega-menu' );
				module.find( 'li.mega-menu > ul.sub-menu' ).css( 'width', rowWidth + 'px' );
				rowContent.css( 'position', 'relative' );
			}
		},

		/**
		 * Init off-canvas menu.
		 *
		 * @since  	1.2.8
		 * @return void
		 */
		_initOffCanvas: function() {
			$('html').addClass('pp-off-canvas-menu-module');
			$('html').addClass('pp-off-canvas-menu-' + this.offCanvasDirection);

			if ( this.isBuilderActive ) {
				this._toggleMenu();
				return;
			}
			if ( 'always' === this.mediaBreakpoint || this.mediaBreakpoint >= this.currentBrowserWidth ) {
				if ( null === this.offCanvasMenu && $(this.nodeClass).find('.pp-advanced-menu.off-canvas').length > 0 ) {
					this.offCanvasMenu = $(this.nodeClass).find('.pp-advanced-menu.off-canvas');
				}
				if ($('#pp-advanced-menu-off-canvas-'+this.settingsId).length === 0) {
					this.offCanvasMenu.appendTo('body').wrap('<div id="pp-advanced-menu-off-canvas-'+this.settingsId+'" class="fl-node-'+this.settingsId+'">');
				}
			}
			this._toggleMenu();
		},

		/**
		 * Init full-screen overlay menu.
		 *
		 * @since  	1.2.8
		 * @return void
		 */
		_initFullScreen: function() {
			$('html').addClass('pp-full-screen-menu-module');
			if ( this.isBuilderActive ) {
				this._toggleMenu();
				return;
			}
			if ( 'always' === this.mediaBreakpoint || this.mediaBreakpoint >= this.currentBrowserWidth ) {
				if ( null === this.offCanvasMenu && $(this.nodeClass).find('.pp-advanced-menu.full-screen').length > 0 ) {
					this.fullScreenMenu = $(this.nodeClass).find('.pp-advanced-menu.full-screen');
				}
				if ($('#pp-advanced-menu-full-screen-'+this.settingsId).length === 0) {
					this.fullScreenMenu.appendTo('body').wrap('<div id="pp-advanced-menu-full-screen-'+this.settingsId+'" class="fl-node-'+this.settingsId+'">');
				}
			}
			this._toggleMenu();
		},

		/**
		 * Trigger the toggle event for off-canvas
		 * and full-screen overlay menus.
		 *
		 * @since  	1.2.8
		 * @return void
		 */
		_toggleMenu: function() {
			var self = this;
			var singleInstance = true;
			if( self.mobileMenuType === 'full-screen' ) {
				var winHeight = $(window).height();
				$(self.nodeClass).find('.pp-menu-overlay').css('height', winHeight + 'px');
				$(window).resize(function() {
					winHeight = $(window).height();
					$(self.nodeClass).find('.pp-menu-overlay').css('height', winHeight + 'px');
				});
			}
			// Toggle Click
			$(self.nodeClass).find('.pp-advanced-menu-mobile-toggle' ).off('click').on( 'click', function() {
				if ( singleInstance ) {
					if ( $('.pp-advanced-menu.menu-open').length > 0 ) {
						$('.pp-advanced-menu').removeClass('menu-open');
						$('html').removeClass('pp-full-screen-menu-open');
					}
				}
				if( $(self.nodeClass).find('.pp-advanced-menu').hasClass('menu-open') ) {
					$(self.nodeClass).find('.pp-advanced-menu').removeClass('menu-open');
					$(self.nodeClass).find('.pp-advanced-menu').addClass('menu-close');
					$('html').removeClass('pp-off-canvas-menu-open');
					$('html').removeClass('pp-full-screen-menu-open');
				} else {
					$(self.nodeClass).find('.pp-advanced-menu').addClass('menu-open');
					if( self.mobileMenuType === 'off-canvas' ) {
						$('html').addClass('pp-off-canvas-menu-open');
					}
					if( self.mobileMenuType === 'full-screen' ) {
						$('html').addClass('pp-full-screen-menu-open');
					}
				}
			} );
			// Close button click
			$(self.nodeClass).find('.pp-advanced-menu .pp-menu-close-btn, .pp-clear').on( 'click', function() {
				$(self.nodeClass).find('.pp-advanced-menu').removeClass('menu-open');
				$(self.nodeClass).find('.pp-advanced-menu').addClass('menu-close');
				$('html').removeClass('pp-off-canvas-menu-open');
				$('html').removeClass('pp-full-screen-menu-open');
			} );

			if ( this.isBuilderActive ) {
				setTimeout(function() {
					if ( $('.fl-builder-settings[data-node="'+self.settingsId+'"]').length > 0 ) {
						$('.pp-advanced-menu').removeClass('menu-open');
						$(self.nodeClass).find('.pp-advanced-menu-mobile-toggle').trigger('click');
					}
				}, 600);

				FLBuilder.addHook('settings-form-init', function() {
					if ( ! $('.fl-builder-settings[data-node="'+self.settingsId+'"]').length > 0 ) {
						return;
					}
					if ( ! $(self.nodeClass).find('.pp-advanced-menu').hasClass('menu-open') ) {
						$('.pp-advanced-menu').removeClass('menu-open');
						$(self.nodeClass).find('.pp-advanced-menu-mobile-toggle').trigger('click');
					}
				});

				if ( $('html').hasClass('pp-full-screen-menu-open') && ! $(self.nodeClass).find('.pp-advanced-menu').hasClass('menu-open') ) {
					$('html').removeClass('pp-full-screen-menu-open');
				}
				if ( $('html').hasClass('pp-off-canvas-menu-open') && ! $(self.nodeClass).find('.pp-advanced-menu').hasClass('menu-open') ) {
					$('html').removeClass('pp-off-canvas-menu-open');
				}
			}
		},

		/**
		 * Logic for putting the mobile menu below the menu's
		 * column so it spans the full width of the page.
		 *
		 * @since  2.2
		 * @return void
		 */
		_placeMobileMenuBelowRow: function () {

			if ($(this.nodeClass + '-clone').length) {
				return;
			}

			var module = $(this.nodeClass),
				clone = module.clone(),
				col = module.closest('.fl-col');

			module.find('ul.menu').remove();
			clone.addClass((this.nodeClass + '-clone').replace('.', ''));
			clone.find('.pp-advanced-menu-mobile-toggle').remove();
			col.after(clone);

			this._menuOnClick();
		},

		/**
		 * Logic for removing the mobile menu from below the menu's
		 * column and putting it back in the main wrapper.
		 *
		 * @since  2.2
		 * @return void
		 */
		_removeMenuFromBelowRow: function () {

			if (!$(this.nodeClass + '-clone').length) {
				return;
			}

			var module = $(this.nodeClass),
				clone = $(this.nodeClass + '-clone'),
				menu = clone.find('ul.menu');

			module.find('.pp-advanced-menu-mobile-toggle').after(menu);
			clone.remove();
		}

	};

})(jQuery);

(function($) {

    new PPAdvancedMenu({
    	id: '5cc1d050d27e9',
    	type: 'horizontal',
    	mobile: 'hamburger-label',
		breakPoints: {
			medium: 1024,
			small: 768,
			custom: 768		},
		mobileBreakpoint: 'medium-mobile',
		mediaBreakpoint: '1024',
		mobileMenuType: 'off-canvas',
		offCanvasDirection: 'right',
		fullScreenAnimation: '',
		isBuilderActive: false    });

})(jQuery);

/* Start Global Node Custom JS */

/* End Global Node Custom JS */


/* Start Layout Custom JS */

/* End Layout Custom JS */

(function($){

	/**
	 * Helper class for header layout logic.
	 *
	 * @since 1.0
	 * @class FLThemeBuilderHeaderLayout
	 */
	FLThemeBuilderHeaderLayout = {

		/**
		 * A reference to the window object for this page.
		 *
		 * @since 1.0
		 * @property {Object} win
		 */
		win : null,

		/**
		 * A reference to the body object for this page.
		 *
		 * @since 1.0
		 * @property {Object} body
		 */
		body : null,

		/**
		 * A reference to the header object for this page.
		 *
		 * @since 1.0
		 * @property {Object} header
		 */
		header : null,

		/**
		 * Whether this header overlays the content or not.
		 *
		 * @since 1.0
		 * @property {Boolean} overlay
		 */
		overlay : false,

		/**
		 * Whether the page has the WP admin bar or not.
		 *
		 * @since 1.0
		 * @property {Boolean} hasAdminBar
		 */
		hasAdminBar : false,

		/**
		 * Initializes header layout logic.
		 *
		 * @since 1.0
		 * @method init
		 */
		init: function()
		{
			var editing = $( 'html.fl-builder-edit' ).length,
				header  = $( '.fl-builder-content[data-type=header]' );

			if ( ! editing && header.length ) {

				header.imagesLoaded( $.proxy( function() {

					this.win    	 = $( window );
					this.body   	 = $( 'body' );
					this.header 	 = header.eq( 0 );
					this.overlay     = !! Number( header.attr( 'data-overlay' ) );
					this.hasAdminBar = !! $( 'body.admin-bar' ).length;

					if ( Number( header.attr( 'data-sticky' ) ) ) {

						this.header.data( 'original-top', this.header.offset().top );
						this.win.on( 'resize', $.throttle( 500, $.proxy( this._initSticky, this ) ) );
						this._initSticky();

						if ( Number( header.attr( 'data-shrink' ) ) ) {
							this.header.data( 'original-height', this.header.outerHeight() );
							this.win.on( 'resize', $.throttle( 500, $.proxy( this._initShrink, this ) ) );
							this._initShrink();
						}
					}

				}, this ) );
			}
		},

		/**
		 * Initializes sticky logic for a header.
		 *
		 * @since 1.0
		 * @access private
		 * @method _initSticky
		 */
		_initSticky: function()
		{
			if ( this.win.width() >= FLBuilderLayoutConfig.breakpoints.medium ) {
				this.win.on( 'scroll.fl-theme-builder-header-sticky', $.proxy( this._doSticky, this ) );
				this._doSticky();
			} else {
				this.win.off( 'scroll.fl-theme-builder-header-sticky' );
				this.header.removeClass( 'fl-theme-builder-header-sticky' );
				this.body.css( 'padding-top', '0' );
			}
		},

		/**
		 * Sticks the header when the page is scrolled.
		 *
		 * @since 1.0
		 * @access private
		 * @method _doSticky
		 */
		_doSticky: function()
		{
			var winTop    		  = this.win.scrollTop(),
				headerTop 		  = this.header.data( 'original-top' ),
				hasStickyClass    = this.header.hasClass( 'fl-theme-builder-header-sticky' ),
				hasScrolledClass  = this.header.hasClass( 'fl-theme-builder-header-scrolled' );

			if ( this.hasAdminBar ) {
				winTop += 32;
			}

			if ( winTop >= headerTop ) {
				if ( ! hasStickyClass ) {
					this.header.addClass( 'fl-theme-builder-header-sticky' );
					if ( ! this.overlay ) {
						this.body.css( 'padding-top', this.header.outerHeight() + 'px' );
					}
				}
			}
			else if ( hasStickyClass ) {
				this.header.removeClass( 'fl-theme-builder-header-sticky' );
				this.body.css( 'padding-top', '0' );
			}

			if ( winTop > headerTop ) {
				if ( ! hasScrolledClass ) {
					this.header.addClass( 'fl-theme-builder-header-scrolled' );
				}
			} else if ( hasScrolledClass ) {
				this.header.removeClass( 'fl-theme-builder-header-scrolled' );
			}
		},

		/**
		 * Initializes shrink logic for a header.
		 *
		 * @since 1.0
		 * @access private
		 * @method _initShrink
		 */
		_initShrink: function()
		{
			if ( this.win.width() >= FLBuilderLayoutConfig.breakpoints.medium ) {
				this.win.on( 'scroll.fl-theme-builder-header-shrink', $.proxy( this._doShrink, this ) );
				this._setImageMaxHeight();
			} else {
				this.body.css( 'padding-top', '0' );
				this.win.off( 'scroll.fl-theme-builder-header-shrink' );
				this._removeShrink();
				this._removeImageMaxHeight();
			}
		},

		/**
		 * Shrinks the header when the page is scrolled.
		 *
		 * @since 1.0
		 * @access private
		 * @method _doShrink
		 */
		_doShrink: function()
		{
			var winTop 	  	 = this.win.scrollTop(),
				headerTop 	 = this.header.data( 'original-top' ),
				headerHeight = this.header.data( 'original-height' ),
				hasClass     = this.header.hasClass( 'fl-theme-builder-header-shrink' );

			if ( this.hasAdminBar ) {
				winTop += 32;
			}

			if ( winTop > headerTop + headerHeight ) {

				if ( ! hasClass ) {

					this.header.addClass( 'fl-theme-builder-header-shrink' );

					this.header.find( '.fl-row-content-wrap' ).each( function() {

						var row = $( this );

						if ( parseInt( row.css( 'padding-bottom' ) ) > 5 ) {
							row.addClass( 'fl-theme-builder-header-shrink-row-bottom' );
						}

						if ( parseInt( row.css( 'padding-top' ) ) > 5 ) {
							row.addClass( 'fl-theme-builder-header-shrink-row-top' );
						}
					} );

					this.header.find( '.fl-module-content' ).each( function() {

						var module = $( this );

						if ( parseInt( module.css( 'margin-bottom' ) ) > 5 ) {
							module.addClass( 'fl-theme-builder-header-shrink-module-bottom' );
						}

						if ( parseInt( module.css( 'margin-top' ) ) > 5 ) {
							module.addClass( 'fl-theme-builder-header-shrink-module-top' );
						}
					} );
				}
			} else if ( hasClass ) {
				this._removeShrink();
			}
		},

		/**
		 * Removes the header shrink effect.
		 *
		 * @since 1.0
		 * @access private
		 * @method _removeShrink
		 */
		_removeShrink: function()
		{
			var rows    = this.header.find( '.fl-row-content-wrap' ),
				modules = this.header.find( '.fl-module-content' );

			rows.removeClass( 'fl-theme-builder-header-shrink-row-bottom' );
			rows.removeClass( 'fl-theme-builder-header-shrink-row-top' );
			modules.removeClass( 'fl-theme-builder-header-shrink-module-bottom' );
			modules.removeClass( 'fl-theme-builder-header-shrink-module-top' );
			this.header.removeClass( 'fl-theme-builder-header-shrink' );
		},

		/**
		 * Adds max height to images in modules for smooth scrolling.
		 *
		 * @since 1.1.1
		 * @access private
		 * @method _setImageMaxHeight
		 */
		_setImageMaxHeight: function()
		{
			var head = $( 'head' ),
				stylesId = 'fl-header-styles-' + this.header.data( 'post-id' ),
				styles = '',
				images = this.header.find( '.fl-module-content img' );

			if ( $( '#' + stylesId ).length ) {
				return;
			}

			images.each( function( i ) {
				var image = $( this ),
					height = image.height(),
					node = image.closest( '.fl-module' ).data( 'node' ),
					className = 'fl-node-' + node + '-img-' + i;

				image.addClass( className );
				image.attr( 'data-no-lazy', 1 );
				styles += '.' + className + ' { max-height: ' + height + 'px }';
			} );

			if ( '' !== styles ) {
				head.append( '<style id="' + stylesId + '">' + styles + '</style>' );
			}
		},

		/**
		 * Removes max height on images in modules for smooth scrolling.
		 *
		 * @since 1.1.1
		 * @access private
		 * @method _removeImageMaxHeight
		 */
		_removeImageMaxHeight: function()
		{
			$( '#fl-header-styles-' + this.header.data( 'post-id' ) ).remove();
		},
	};

	$( function() { FLThemeBuilderHeaderLayout.init(); } );

})(jQuery);
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

									row_id = '5cfff21977159';

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
								row_id = '5cc1cf910925b';

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
								row_id = '5cc2206b71627';

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
								row_id = '5d1529445f225';

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

(function($) {

	/**
	 * Class for Menu Module
	 *
	 * @since 1.6.1
	 */
	FLBuilderMenu = function( settings ){

		// set params
		this.nodeClass           = '.fl-node-' + settings.id;
		this.wrapperClass        = this.nodeClass + ' .fl-menu';
		this.type				 = settings.type;
		this.mobileToggle		 = settings.mobile;
		this.mobileBelowRow		 = settings.mobileBelowRow;
		this.mobileFlyout		 = settings.mobileFlyout;
		this.breakPoints         = settings.breakPoints;
		this.mobileBreakpoint	 = settings.mobileBreakpoint;
		this.currentBrowserWidth = $( window ).width();

		// initialize the menu
		this._initMenu();

		// check if viewport is resizing
		$( window ).on( 'resize', $.proxy( function( e ) {

			var width = $( window ).width();

			// if screen width is resized, reload the menu
		    if( width != this.currentBrowserWidth ){

				this.currentBrowserWidth = width;
				this._initMenu();
 				this._clickOrHover();
			}

		}, this ) );

		$( 'body' ).on( 'click', $.proxy( function( e ) {
			if ( 'undefined' !== typeof FLBuilderConfig ){
				return;
			}

			if ( $( this.wrapperClass ).find( '.fl-menu-mobile-toggle' ).hasClass( 'fl-active' ) && ( 'expanded' !== this.mobileToggle ) ){
				$( this.wrapperClass ).find( '.fl-menu-mobile-toggle' ).trigger( 'click' );
			}

		}, this ) );

	};

	FLBuilderMenu.prototype = {
		nodeClass               : '',
		wrapperClass            : '',
		type 	                : '',
		breakPoints 			: {},
		$submenus				: null,

		/**
		 * Check if the screen size fits a mobile viewport.
		 *
		 * @since  1.6.1
		 * @return bool
		 */
		_isMobile: function(){
			return this.currentBrowserWidth <= this.breakPoints.small ? true : false;
		},

		/**
		 * Check if the screen size fits a medium viewport.
		 *
		 * @since  1.10.5
		 * @return bool
		 */
		_isMedium: function(){
			return this.currentBrowserWidth <= this.breakPoints.medium ? true : false;
		},

		/**
		 * Check if the menu should toggle for the current viewport base on the selected breakpoint
		 *
		 * @see 	this._isMobile()
		 * @see 	this._isMedium()
		 * @since  	1.10.5
		 * @return bool
		 */
		_isMenuToggle: function(){
			if ( ( 'always' == this.mobileBreakpoint
				|| ( this._isMobile() && 'mobile' == this.mobileBreakpoint )
				|| ( this._isMedium() && 'medium-mobile' == this.mobileBreakpoint )
			) && ( $( this.wrapperClass ).find( '.fl-menu-mobile-toggle' ).is(':visible') || 'expanded' == this.mobileToggle ) ) {
				return true;
			}

			return false;
		},

		/**
		 * Initialize the toggle logic for the menu.
		 *
		 * @see    this._isMenuToggle()
		 * @see    this._menuOnCLick()
		 * @see    this._clickOrHover()
		 * @see    this._submenuOnRight()
		 * @see    this._submenuRowZindexFix()
		 * @see    this._toggleForMobile()
		 * @since  1.6.1
		 * @return void
		 */
		_initMenu: function(){
			this._menuOnFocus();
			this._submenuOnClick();
			if ( $( this.nodeClass ).length && this.type == 'horizontal' ) {
				this._initMegaMenus();
			}

			if( this._isMenuToggle() || this.type == 'accordion' ){

				$( this.wrapperClass ).off( 'mouseenter mouseleave' );
				this._menuOnClick();
				this._clickOrHover();

			} else {
				$( this.wrapperClass ).off( 'click' );
				this._submenuOnRight();
				this._submenuRowZindexFix();
			}

			if( this.mobileToggle != 'expanded' ){
				this._toggleForMobile();
			}
		},

		/**
		 * Adds a focus class to menu elements similar to be used similar to CSS :hover psuedo event
		 *
		 * @since  1.9.0
		 * @return void
		 */
		_menuOnFocus: function(){
			$( this.nodeClass ).off('focus').on( 'focus', 'a', $.proxy( function( e ){
				var $menuItem	= $( e.target ).parents( '.menu-item' ).first(),
					$parents	= $( e.target ).parentsUntil( this.wrapperClass );

				$('.fl-menu .focus').removeClass('focus');

				$menuItem.addClass('focus')
				$parents.addClass('focus')

			}, this ) ).on( 'focusout', 'a', $.proxy( function( e ){

				el = $(e.target).parent()

				if( el.is(':last-child' ) ) {
					$( e.target ).parentsUntil( this.wrapperClass ).removeClass( 'focus' );
				}
			}, this ) );
		},

		/**
		 * Logic for submenu toggling on accordions or mobile menus (vertical, horizontal)
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_menuOnClick: function(){
			$( this.wrapperClass ).off().on( 'click', '.fl-has-submenu-container', $.proxy( function( e ){

				var $link			= $( e.target ).parents( '.fl-has-submenu' ).first(),
					$subMenu 		= $link.children( '.sub-menu' ).first(),
					$href	 		= $link.children('.fl-has-submenu-container').first().find('> a').attr('href'),
					$subMenuParents = $( e.target ).parents( '.sub-menu' ),
					$activeParents 	= $( e.target ).parents( '.fl-has-submenu.fl-active' );

				if( !$subMenu.is(':visible') || $(e.target).hasClass('fl-menu-toggle')
					|| ($subMenu.is(':visible') && (typeof $href === 'undefined' || $href == '#')) ){
					e.preventDefault();
				}
				else {
					e.stopPropagation();
					window.location.href = $href;
					return;
				}

				if ($(this.wrapperClass).hasClass('fl-menu-accordion-collapse')) {

					if ( !$link.parents('.menu-item').hasClass('fl-active') ) {
						$('.menu .fl-active', this.wrapperClass).not($link).removeClass('fl-active');
					}
					else if ($link.parents('.menu-item').hasClass('fl-active') && $link.parent('.sub-menu').length) {
						$('.menu .fl-active', this.wrapperClass).not($link).not($activeParents).removeClass('fl-active');
					}

					$('.sub-menu', this.wrapperClass).not($subMenu).not($subMenuParents).slideUp('normal');
				}

				$subMenu.slideToggle();
				$link.toggleClass( 'fl-active' );
				e.stopPropagation();

			}, this ) );

		},

		/**
		 * Logic for submenu items click event
		 *
		 * @since  1.10.6
		 * @return void
		 */
		_submenuOnClick: function(){
			$( this.wrapperClass + ' .sub-menu' ).off().on( 'click', 'a', $.proxy( function( e ){
				if ( $( e.target ).parent().hasClass('focus') ) {
					$( e.target ).parentsUntil( this.wrapperClass ).removeClass('focus');
				}
			}, this ) );
		},

		/**
		 * Changes general styling and behavior of menus based on mobile / desktop viewport.
		 *
		 * @see    this._isMenuToggle()
		 * @since  1.6.1
		 * @return void
		 */
		_clickOrHover: function(){
			this.$submenus = this.$submenus || $( this.wrapperClass ).find( '.sub-menu' );
			var $wrapper   = $( this.wrapperClass ),
				$menu      = $wrapper.find( '.menu' );
				$li        = $wrapper.find( '.fl-has-submenu' );

			if( this._isMenuToggle() ){
				$li.each( function( el ){
					if( !$(this).hasClass('fl-active') ){
						$(this).find( '.sub-menu' ).fadeOut();
					}
				} );
			} else {
				$li.each( function( el ){
					if( !$(this).hasClass('fl-active') ){
						$(this).find( '.sub-menu' ).css( {
							'display' : '',
							'opacity' : ''
						} );
					}
				} );
			}
		},

		/**
		 * Logic to prevent submenus to go outside viewport boundaries.
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_submenuOnRight: function(){

			$( this.wrapperClass )
				.on( 'mouseenter focus', '.fl-has-submenu', $.proxy( function( e ){

					if( $ ( e.currentTarget ).find('.sub-menu').length === 0 ) {
						return;
					}

					var $link           = $( e.currentTarget ),
						$parent         = $link.parent(),
						$subMenu        = $link.find( '.sub-menu' ),
						subMenuWidth    = $subMenu.width(),
						subMenuPos      = 0,
						bodyWidth       = $( 'body' ).width();

					if( $link.closest( '.fl-menu-submenu-right' ).length !== 0) {

						$link.addClass( 'fl-menu-submenu-right' );

					} else if( $( 'body' ).hasClass( 'rtl' ) ) {

						subMenuPos = $parent.is( '.sub-menu' ) ?
									 $parent.offset().left - subMenuWidth:
									 $link.offset().left - $link.width() - subMenuWidth;

						if( subMenuPos <= 0 ) {
							$link.addClass( 'fl-menu-submenu-right' );
						}

					} else {

						subMenuPos = $parent.is( '.sub-menu' ) ?
									 $parent.offset().left + $parent.width() + subMenuWidth :
									 $link.offset().left + $link.width() + subMenuWidth;

						if( subMenuPos > bodyWidth ) {
							$link.addClass('fl-menu-submenu-right');
						}
					}
				}, this ) )
				.on( 'mouseleave', '.fl-has-submenu', $.proxy( function( e ){
					$( e.currentTarget ).removeClass( 'fl-menu-submenu-right' );
				}, this ) );

		},

		/**
		 * Logic to prevent submenus to go behind the next overlay row.
		 *
		 * @since  1.10.9
		 * @return void
		 */
		_submenuRowZindexFix: function( e ){

			$( this.wrapperClass )
				.on( 'mouseenter', 'ul.menu > .fl-has-submenu', $.proxy( function( e ){

					if( $ ( e.currentTarget ).find('.sub-menu').length === 0 ) {
						return;
					}

					$( this.nodeClass )
						.closest( '.fl-row' )
						.find( '.fl-row-content' )
						.css( 'z-index', '10' );

				}, this ) )
				.on( 'mouseleave', 'ul.menu > .fl-has-submenu', $.proxy( function( e ){

					$( this.nodeClass )
						.closest( '.fl-row' )
						.find( '.fl-row-content' )
						.css( 'z-index', '' );

				}, this ) );
		},

		/**
		 * Logic for the mobile menu button.
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_toggleForMobile: function(){

			var $wrapper = null,
				$menu    = null,
				self     = this;

			if( this._isMenuToggle() ){

				if ( this._isMobileBelowRowEnabled() ) {
					this._placeMobileMenuBelowRow();
					$wrapper = $( this.wrapperClass );
					$menu    = $( this.nodeClass + '-clone' );
					$menu.find( 'ul.menu' ).show();
				}
				else {
					$wrapper = $( this.wrapperClass );
					$menu    = $wrapper.find( '.menu' );
				}

				if( !$wrapper.find( '.fl-menu-mobile-toggle' ).hasClass( 'fl-active' ) && ! self.mobileFlyout ){
					$menu.css({ display: 'none' });
				}

				// Flayout Menu
				if ( self.mobileFlyout ) {
					this._initFlyoutMenu();
				}

				$wrapper.on( 'click', '.fl-menu-mobile-toggle', function( e ){
					$( this ).toggleClass( 'fl-active' );

					if ( self.mobileFlyout ) {
						self._toggleFlyoutMenu();
					}
					else {
						$menu.slideToggle();
					}

					e.stopPropagation();
				} );

				// Hide active menu when click on anchor link ID that exists on a page.
				$menu.on( 'click', '.menu-item > a[href*="#"]:not([href="#"])', function(e){
					var $href = $(this).attr('href'),
						$targetID = $href.split('#')[1];

					if ( $('body').find('#'+  $targetID).length > 0 ) {
						$( this ).toggleClass( 'fl-active' );
						$menu.slideToggle();
					}
				});
			}
			else {

				if ( this._isMobileBelowRowEnabled() ) {
					this._removeMenuFromBelowRow();
				}

				$wrapper = $( this.wrapperClass ),
				$menu    = $wrapper.find( 'ul.menu' );
				$wrapper.find( '.fl-menu-mobile-toggle' ).removeClass( 'fl-active' );
				$menu.css({ display: '' });

				if ( this.mobileFlyout && $wrapper.find( '.fl-menu-mobile-flyout' ).length > 0 ) {
					$( 'body' ).css( 'margin', '' );
					$( '.fl-builder-ui-pinned-content-transform' ).css( 'transform', '' );
					$menu.unwrap();
					$wrapper.find( '.fl-menu-mobile-close' ).remove();
					$wrapper.find( '.fl-menu-mobile-opacity' ).remove();
				}
			}
		},

		/**
		 * Init any mega menus that exist.
		 *
		 * @see 	this._isMenuToggle()
		 * @since  	1.10.4
		 * @return void
		 */
		_initMegaMenus: function(){

			var module     = $( this.nodeClass ),
				rowContent = module.closest( '.fl-row-content' ),
				rowWidth   = rowContent.width(),
				megas      = module.find( '.mega-menu' ),
				disabled   = module.find( '.mega-menu-disabled' ),
				isToggle   = this._isMenuToggle();

			if ( isToggle ) {
				megas.removeClass( 'mega-menu' ).addClass( 'mega-menu-disabled' );
				module.find( 'li.mega-menu-disabled > ul.sub-menu' ).css( 'width', '' );
				rowContent.css( 'position', '' );
			} else {
				disabled.removeClass( 'mega-menu-disabled' ).addClass( 'mega-menu' );
				module.find( 'li.mega-menu > ul.sub-menu' ).css( 'width', rowWidth + 'px' );
				rowContent.css( 'position', 'relative' );
			}
		},

		/**
		 * Check to see if Below Row should be enabled.
		 *
		 * @since  	1.11
		 * @return boolean
		 */
		_isMobileBelowRowEnabled: function() {
			return this.mobileBelowRow && $( this.nodeClass ).closest( '.fl-col' ).length;
		},

		/**
		 * Logic for putting the mobile menu below the menu's
		 * column so it spans the full width of the page.
		 *
		 * @since  1.10
		 * @return void
		 */
		_placeMobileMenuBelowRow: function(){

			if ( $( this.nodeClass + '-clone' ).length ) {
				return;
			}

			var module = $( this.nodeClass ),
				clone  = module.clone(),
				col    = module.closest( '.fl-col' );

			module.find( 'ul.menu' ).remove();
			clone.addClass( ( this.nodeClass + '-clone' ).replace( '.', '' ) );
			clone.addClass( 'fl-menu-mobile-clone' );
			clone.find( '.fl-menu-mobile-toggle' ).remove();
			col.after( clone );

			// Removes animation when enabled.
			if ( module.hasClass( 'fl-animation' ) ) {
				clone.removeClass( 'fl-animation' );
			}

			this._menuOnClick();
		},

		/**
		 * Logic for removing the mobile menu from below the menu's
		 * column and putting it back in the main wrapper.
		 *
		 * @since  1.10
		 * @return void
		 */
		_removeMenuFromBelowRow: function(){

			if ( ! $( this.nodeClass + '-clone' ).length ) {
				return;
			}

			var module = $( this.nodeClass ),
				clone  = $( this.nodeClass + '-clone' ),
				menu   = clone.find( 'ul.menu' );

			module.find( '.fl-menu-mobile-toggle' ).after( menu );
			clone.remove();
		},

		/**
		 * Logic for Flyout responsive menu.
		 *
		 * @since 2.2
		 * @return void
		 */
		_initFlyoutMenu: function(){
			var win     = $( window ),
				wrapper = $( this.wrapperClass ),
				menu  	= wrapper.find( 'ul.menu' ),
				button	= wrapper.find( '.fl-menu-mobile-toggle' );

			if ( 0 === wrapper.find( '.fl-menu-mobile-flyout' ).length ) {
				menu.wrap( '<div class="fl-menu-mobile-flyout"></div>' );
			}

			if ( 0 === wrapper.find( '.fl-menu-mobile-close' ).length ) {
				wrapper.find( '.fl-menu-mobile-flyout' )
					   .prepend( '<button class="fl-menu-mobile-close"><i class="fas fa-times"></i></button>' );
			}

			// Push with opacity
			if ( wrapper.hasClass( 'fl-menu-responsive-flyout-push-opacity' ) && 0 === wrapper.find( '.fl-menu-mobile-opacity' ).length ) {
				wrapper.append( '<div class="fl-menu-mobile-opacity"></div>' );
			}

			wrapper.find( '.fl-menu-mobile-flyout' ).height( win.height() );

			wrapper.on( 'click', '.fl-menu-mobile-opacity, .fl-menu-mobile-close', function(e){
				button.trigger( 'click' );
				e.stopPropagation();
			});

			if ( 'undefined' !== typeof FLBuilder ) {
				FLBuilder.addHook('restartEditingSession', function(){
					$( '.fl-builder-ui-pinned-content-transform' ).css( 'transform', '' );

					// Toggle active menu.
					if ( button.hasClass( 'fl-active' ) ) {
						button.trigger( 'click' );
					}
				});
			}
		},

		/**
		 * Logic to enable/disable the Flyout menu on button click.
		 *
		 * @since 2.2
		 * @return void
		 */
		_toggleFlyoutMenu: function(){
			var wrapper		= $( this.wrapperClass ),
				button		= wrapper.find( '.fl-menu-mobile-toggle' ),
				wrapFlyout	= wrapper.find( '.fl-menu-mobile-flyout' ),
				position 	= wrapper.hasClass( 'fl-flyout-right' ) ? 'right' : 'left',
				pushMenu 	= wrapper.hasClass( 'fl-menu-responsive-flyout-push' ) || wrapper.hasClass( 'fl-menu-responsive-flyout-push-opacity' ),
				opacity		= wrapper.find( '.fl-menu-mobile-opacity' ),
				marginPos	= {},
				posAttr		= {},
				fixedPos    = {},
				fixedHeader = $('header, header > div');

			posAttr[ position ] = button.hasClass( 'fl-active' ) ? '0px' : '';
			wrapFlyout.css( posAttr );

			// Fix the push menu when builder ui panel is pinned.
			if ( $( '.fl-builder-ui-pinned-content-transform' ).length > 0 && ! $( 'body' ).hasClass( 'fl-builder-edit' ) ) {
				$( '.fl-builder-ui-pinned-content-transform' ).css( 'transform', 'none' );
			}

			if ( pushMenu ) {
				marginPos[ 'margin-' + position ] = button.hasClass( 'fl-active' ) ? '250px' : '0px';
				$( 'body' ).animate( marginPos, 200);

				// Fixed header
				if ( fixedHeader.length > 0 ) {
					fixedPos[ position] = button.hasClass( 'fl-active' ) ? '250px' : '0px';
					fixedHeader.each(function(){
						if ( 'fixed' == $( this ).css( 'position' ) ) {
							$( this ).css({
								'-webkit-transition': 'none',
								'-o-transition'		: 'none',
								'transition'		: 'none'
							});
							$( this ).animate( fixedPos, 200 );
						}
					});
				}
			}

			if ( opacity.length > 0 && button.hasClass( 'fl-active' ) ) {
				opacity.show();
			}
			else {
				opacity.hide();
			}
		},
	};

})(jQuery);

(function($) {

	$(function() {

		new FLBuilderMenu({
			id: '5cbf5b4d0ccb3',
			type: 'horizontal',
			mobile: 'expanded',
			mobileBelowRow: false,
			mobileFlyout: false,
			breakPoints: {
				medium: 1024,
				small: 768			},
			mobileBreakpoint: 'mobile'
		});

	});

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

									row_id = '5cbf5b4d0cca1';

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
								row_id = '5cbf5b4d0ccbf';

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
	