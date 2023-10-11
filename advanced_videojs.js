var autoplayAllowed = false;
var autoplayRequiresMute = false;

var Ads = function () {
  this.isSticky = false;
  this.startEvent = "click";
  this.isLoad = false;
  this.mainSticky = document.getElementById("main-videoplayer");
  document.addEventListener("scroll", this.sticky.bind(this));
  canAutoplay
    .video({timeout: 100, muted: false})
    .then(function(response) {
        if(response.result === false) {
          // Unmuted autoplay is not allowed.
          checkMutedAutoplaySupport();
        } else {
          // Unmuted autoplay is allowed.
          autoplayAllowed = true;
          autoplayRequiresMute = false;
          initPlayer();
        }
    })
  var vjsOptions = {
    autoplay: autoplayAllowed,
    muted: autoplayRequiresMute,
    debug: true,
  };
  player = videojs("content_video", vjsOptions);

  this.player = videojs("content_video");

  // Remove controls from the player on iPad to stop native controls from stealing
  // our click
  var contentPlayer = document.getElementById("content_video_html5_api");
  if (
    (navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) &&
    contentPlayer.hasAttribute("controls")
  ) {
    contentPlayer.removeAttribute("controls");
  }

  // Start ads when the video player is clicked, but only the first time it's
  // clicked.

  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)
  ) {
    this.startEvent = "touchend";
  }

  this.wrapperDiv = document.getElementById("content_video");
  this.boundInit = this.init.bind(this);
  this.wrapperDiv.addEventListener(this.startEvent, this.boundInit);

  var options = {
    id: "content_video",
    adsManagerLoadedCallback: this.adsManagerLoadedCallback.bind(this),
  };
  this.player.ima(options);
};

Ads.prototype.initPlayer = function () {
  console.log("okeke");
};
Ads.prototype.sticky = function () {
  if (this.isLoad) {
    if (!this.checkDivInViewableArea(this.wrapperDiv) && !this.isSticky) {
      this.wrapperDiv.style.position = "fixed";
      this.wrapperDiv.style.bottom = 0;
      this.wrapperDiv.style.left = 0;
      this.wrapperDiv.style.height = "250px";
      this.wrapperDiv.style.width = "320px";
      this.isSticky = true;
    }
    if (
      this.checkDivInViewableArea(this.mainSticky) &&
      this.wrapperDiv.getBoundingClientRect().left == 0
    ) {
      this.wrapperDiv.style.removeProperty("height");
      this.wrapperDiv.style.removeProperty("width");
      this.wrapperDiv.style.removeProperty("position");
      this.wrapperDiv.style.removeProperty("bottom");
      this.wrapperDiv.style.removeProperty("left");
      this.isSticky = false;
    }
  }

  // console.log(this.checkDivInViewableArea(this.mainSticky));
  // console.log(this.wrapperDiv.getBoundingClientRect().left == 0);
};

Ads.prototype.checkDivInViewableArea = function (div) {
  const top = div.getBoundingClientRect().top;
  const left = div.getBoundingClientRect().left;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  return top >= 0 && top <= windowHeight && left >= 0 && left <= windowWidth;
};

Ads.prototype.SAMPLE_AD_TAG =
  "http://pubads.g.doubleclick.net/gampad/ads?" +
  "sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&" +
  "ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&" +
  "unviewed_position_start=1&" +
  "cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&" +
  "vid=short_onecue&correlator=";

Ads.prototype.init = function () {
  this.player.ima.initializeAdDisplayContainer();
  this.player.ima.setContentWithAdTag(null, this.SAMPLE_AD_TAG, false);
  this.player.ima.requestAds();
  this.wrapperDiv.removeEventListener(this.startEvent, this.boundInit);
};

Ads.prototype.adsManagerLoadedCallback = function () {
  var events = [
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
    google.ima.AdEvent.Type.CLICK,
    google.ima.AdEvent.Type.COMPLETE,
    google.ima.AdEvent.Type.FIRST_QUARTILE,
    google.ima.AdEvent.Type.LOADED,
    google.ima.AdEvent.Type.MIDPOINT,
    google.ima.AdEvent.Type.PAUSED,
    google.ima.AdEvent.Type.RESUMED,
    google.ima.AdEvent.Type.STARTED,
    google.ima.AdEvent.Type.THIRD_QUARTILE,
  ];

  
  this.player.ima.addEventListener(google.ima.AdEvent.Type.LOADED, () => {
    this.isLoad = true;
  });


};


