var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".player-logo { height: 30px; width: auto !important }";
document.getElementsByTagName("head")[0].appendChild(style);

var bgr_netlink = document.createElement("div");

var scriptElement_btn = document.createElement("button");

var Ads = function (adVastTag, isStickyClient, left) {
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
  this.adVastTagz = adVastTag;
  // console.log(this.adVastTagz);

  // var bgr_netlink = document.createElement("div");
  bgr_netlink.id = "bgr_netlink";

  var scriptElement = document.createElement("a");
  scriptElement.href = "https://netlink.vn";
  scriptElement.id = "netlink_logo";
  // scriptElement.style = "left: 0; position: absolute";

  var scriptElement_img = document.createElement("img");
  scriptElement_img.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/video@master/logo-netlink.svg";
  scriptElement_img.style = "height: 30px; width: 78px !important";
  scriptElement_img.className = "player-logo";

  scriptElement_btn.innerHTML = "&#x2715;";
  if (this.isLeft) {
    scriptElement_btn.style =
      "width: 30; right: 0; bottom: 250; font-weight: bold; position: fixed; zIndex = 100000;";
  } else {
    scriptElement_btn.style =
      "width: 30; left: 290; bottom: 250; font-weight: bold; position: fixed; zIndex = 100000;";
  }

  scriptElement.appendChild(scriptElement_img);
  // bgr_netlink.prepend(scriptElement_btn);
  bgr_netlink.appendChild(scriptElement);
  this.mainSticky.prepend(bgr_netlink);

  document.addEventListener("scroll", this.sticky.bind(this));

  var vjsOptions = {
    autoplay: this.autoplayAllowed,
    muted: this.autoplayRequiresMute,
    debug: true,
  };
  player = videojs("content_video");

  this.player = videojs("content_video");
  this.contentPlayer = document.getElementById("content_video_html5_api");
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
    this.wrapperDiv.style.removeProperty("height");
    this.wrapperDiv.style.removeProperty("width");
    this.wrapperDiv.style.removeProperty("position");
    this.wrapperDiv.style.removeProperty("bottom");
    this.wrapperDiv.style.removeProperty("zIndex");
  });
};

// };
Ads.prototype.sticky = function () {
  if (!this.contentPlayer.paused && !this.isLoad) {
    this.isLoad = true;
  }
  if (this.checkDivInViewableArea(this.wrapperDiv) && !this.isLoad) {
    console.log("play");
    this.contentPlayer.click();
  }

  if (this.isLoad && this.isStickyClient) {
    if (
      !this.checkDivInViewableArea(this.wrapperDiv) &&
      !this.isSticky &&
      !this.isDel
    ) {
      bgr_netlink.style.position = "fixed";
      bgr_netlink.style.bottom = 250;
      bgr_netlink.style.zIndex = 100000;

      bgr_netlink.prepend(scriptElement_btn);
      scriptElement_btn.style.display = "block";

      if (this.isLeft) {
        bgr_netlink.style.width = 320;
        bgr_netlink.style.right = 0;
        this.wrapperDiv.style.right = 0;
      } else {
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
      bgr_netlink.style.removeProperty("zIndex");

      bgr_netlink.style.removeProperty("position");

      this.wrapperDiv.style.removeProperty("height");
      this.wrapperDiv.style.removeProperty("width");
      this.wrapperDiv.style.removeProperty("position");
      this.wrapperDiv.style.removeProperty("bottom");
      this.wrapperDiv.style.removeProperty("zIndex");
      scriptElement_btn.style.display = "none";
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
  this.player.ima.setContentWithAdTag(null, this.adVastTagz, false);
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
  this.player.ima.addEventListener(google.ima.AdError, () => {
    console.log("AdError");
  });
};
Ads.prototype.onAdEvent = function (event) {
  var message = "Ad event: " + event.type;
  console.log(message);
};
