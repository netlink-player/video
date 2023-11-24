var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".player-logo { height: 30px; width: auto !important }";
document.getElementsByTagName("head")[0].appendChild(style);

var bgr_netlink = document.createElement("div");

var scriptElement_btn = document.createElement("button");
var scriptElement = document.createElement("a");
var screenWidth = window.innerWidth;
var Ads = function (adVastTag, isStickyClient, left) {
  window.onload = function () {
    reponsiveVideo();
  };
  this.isLeft = left;
  this.isDel = false;
  this.isStickyClient = isStickyClient;
  this.autoplayAllowed = false;
  this.autoplayRequiresMute = false;
  this.isSticky = false;
  this.startEvent = "click";
  this.isFirst = false;
  this.isLoad = false;
  this.mainSticky = document.getElementById("main-videoplayer");
  this.adVastTagz = adVastTag[0];


  // var bgr_netlink = document.createElement("div");
  bgr_netlink.id = "bgr_netlink";

  scriptElement.href = "https://netlink.vn";
  scriptElement.id = "netlink_logo";
  scriptElement.style = "position: absolute";

  var scriptElement_img = document.createElement("img");
  scriptElement_img.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/video@master/logo-netlink-tag.png";
  scriptElement_img.style =
    "height: 30px; width: auto !important; display: block !important";
  scriptElement_img.className = "player-logo";

  scriptElement_btn.innerHTML = "&#x2715;";
  if (this.isLeft) {
    scriptElement_btn.style =
      "width: 30; right: 0 !important; bottom: 250 !important; font-weight: bold; position: fixed !important; zIndex = 100000 !important; border: none !important; border-radius: 5px 5px 0 0 !important; background: black !important; color: white !important;";
  } else {
    scriptElement_btn.style =
      "width: 30; left: 290 !important; bottom: 250 !important; font-weight: bold; position: fixed !important; zIndex = 100000 !important; border: none !important; border-radius: 5px 5px 0 0 !important; background: black !important;color: white !important;";
  }

  scriptElement.appendChild(scriptElement_img);
  // bgr_netlink.prepend(scriptElement_btn);
  bgr_netlink.appendChild(scriptElement);
  this.mainSticky.prepend(bgr_netlink);

  document.addEventListener("scroll", this.sticky.bind(this));

  var vjsOptions = {
    autoplay: true,
    muted: true,
    debug: true,
  };
  player = videojs("content_video", vjsOptions);

  this.player = videojs("content_video");
  this.contentPlayer = document.getElementById("content_video_html5_api");
  this.autoPlayBtn = document.querySelector('.vjs-big-play-button');
  if (
    (navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) &&
    this.contentPlayer.hasAttribute("controls")
  ) {
    this.contentPlayer.removeAttribute("controls");
  }
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)
  ) {
    this.startEvent = "touchend";
  }
  this.wrapperDiv = document.getElementById("content_video");
  this.playButton = document.getElementById("playButton");
  this.boundInit = this.init.bind(this);
  this.wrapperDiv.addEventListener(this.startEvent, this.boundInit);
  // this.playButton.addEventListener("click", () => {});

  var options = {
    id: "content_video",
    adsManagerLoadedCallback: this.adsManagerLoadedCallback.bind(this),
  };
  this.player.ima(options);
  scriptElement_btn.addEventListener("click", () => {
    this.isDel = true;
    scriptElement_btn.style.display = "none";

    bgr_netlink.style.removeProperty("bottom");
    bgr_netlink.style.removeProperty("left");
    bgr_netlink.style.removeProperty("position");
    bgr_netlink.style.removeProperty("zIndex");
    bgr_netlink.style.setProperty("zIndex", "0", "important");
    this.wrapperDiv.style.setProperty("zIndex", "0", "important");
    bgr_netlink.style.zIndex = "0";
    this.wrapperDiv.style.zIndex = "0";
    this.wrapperDiv.style.removeProperty("height");
    this.wrapperDiv.style.removeProperty("width");
    this.wrapperDiv.style.removeProperty("position");
    this.wrapperDiv.style.removeProperty("bottom");
    // this.wrapperDiv.style.removeProperty("zIndex");
  });

  // reponsiveVideo();
  function reponsiveVideo() {
    var wrapperDiv = document.getElementById("content_video");
    var main_videoplayerDiv = document.getElementById("main-videoplayer");

    if (screenWidth >= 768) {
      main_videoplayerDiv.style.width = "640px";
      main_videoplayerDiv.style.height = "360px";
      wrapperDiv.style.width = "640px";
      wrapperDiv.style.height = "360px";
    } else {
      main_videoplayerDiv.style.width = "320px";
      main_videoplayerDiv.style.height = "250px";
      wrapperDiv.style.height = "250px";
      wrapperDiv.style.width = "320px";
    }
    // document.addEventListener("resize", reponsiveVideo());
  }
  this.player.ima.onWaterFall(adVastTag);
};

// };

Ads.prototype.sticky = function () {
  if (!this.contentPlayer.paused && !this.isLoad) {
    this.isLoad = true;
  }
  if (this.isLoad && this.isStickyClient) {
    if (
      !this.checkDivInViewableArea(this.wrapperDiv) &&
      !this.isSticky &&
      !this.isDel
    ) {
      bgr_netlink.style.position = "fixed";
      // bgr_netlink.style.bottom = "250px !important";
      bgr_netlink.style.setProperty("bottom", "250px", "important");
      bgr_netlink.style.zIndex = 100000;

      bgr_netlink.prepend(scriptElement_btn);
      scriptElement_btn.style.display = "block";
      scriptElement_btn.style.setProperty("width", "30px", "important");
      scriptElement_btn.style.setProperty("bottom", "250px", "important");
      bgr_netlink.style.width = 320;
      bgr_netlink.style.setProperty("width", "320px", "important");

      if (this.isLeft) {
        scriptElement_btn.style.setProperty("right", "0px", "important");

        bgr_netlink.style.right = 0;
        this.wrapperDiv.style.right = 0;
      } else {
        // scriptElement.style.right = "242px !important";
        scriptElement_btn.style.setProperty("left", "290px", "important");

        bgr_netlink.style.left = 0;
        this.wrapperDiv.style.left = 0;
      }

      this.wrapperDiv.style.position = "fixed";
      this.wrapperDiv.style.bottom = 0;

      this.wrapperDiv.style.height = "250px";
      this.wrapperDiv.style.width = "320px";
      this.wrapperDiv.style.zIndex = 100000;
      this.isSticky = true;
    }
    if (
      this.checkDivInViewableArea(this.mainSticky)
      // &&
      // this.wrapperDiv.getBoundingClientRect().left == 0
    ) {
      if (this.isLeft) {
        bgr_netlink.style.removeProperty("right");
        this.wrapperDiv.style.removeProperty("right");
      } else {
        bgr_netlink.style.removeProperty("left");
        this.wrapperDiv.style.removeProperty("left");
      }

      bgr_netlink.style.removeProperty("bottom");
      // bgr_netlink.style.removeProperty("zIndex");

      bgr_netlink.style.removeProperty("position");
      bgr_netlink.style.setProperty("zIndex", "0", "important");
      this.wrapperDiv.style.setProperty("zIndex", "0", "important");
      bgr_netlink.style.zIndex = "0";
      this.wrapperDiv.style.zIndex = "0";
      // scriptElement.removeProperty("right");

      if (screenWidth >= 768) {
        this.wrapperDiv.style.width = "640px";
        this.wrapperDiv.style.height = "360px";
      } else {
        this.wrapperDiv.style.height = "250px";
        this.wrapperDiv.style.width = "320px";
      }
      // this.wrapperDiv.style.removeProperty("height");
      // this.wrapperDiv.style.removeProperty("width");
      this.wrapperDiv.style.removeProperty("position");
      this.wrapperDiv.style.removeProperty("bottom");
      // this.wrapperDiv.style.removeProperty("zIndex");
      scriptElement_btn.style.display = "none";
      this.isSticky = false;
    }
  }

  if (this.checkDivInViewableArea(this.wrapperDiv) && !this.isLoad) {
    console.log("play");
    var clickEvent = new Event('click', {
      bubbles: true,
      cancelable: true
    });
    this.autoPlayBtn.click();
    this.autoPlayBtn.dispatchEvent(clickEvent);
  }
};

Ads.prototype.checkDivInViewableArea = function (div) {
  const top = div.getBoundingClientRect().top;
  const left = div.getBoundingClientRect().left;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  return top >= 0 && top <= windowHeight;
};

Ads.prototype.SAMPLE_AD_TAG =
  "https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-video-pub-3166493188367342&description_url=http%3A%2F%2Fwww.tinmoi.vn&videoad_start_delay=0&hl=en&max_ad_duration=15000&sdmax=30000";

// "http://pubads.g.doubleclick.net/gampad/ads?" +
// "sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&" +
// "ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&" +
// "unviewed_position_start=1&" +
// "cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&" +
// "vid=short_onecue&correlator=";

Ads.prototype.init = function () {
  this.player.ima.initializeAdDisplayContainer();
  this.player.ima.setContentWithAdTag(null, this.adVastTagz, true);
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
  for (var index = 0; index < events.length; index++) {
    this.player.ima.addEventListener(events[index], this.onAdEvent.bind(this));
  }

  this.player.ima.addEventListener(google.ima.AdEvent.Type.LOADED, () => {
    this.isLoad = true;
  });
};
Ads.prototype.onAdEvent = function (event) {
  var message = "Ad event: " + event.type;
  // console.log(message);
};
