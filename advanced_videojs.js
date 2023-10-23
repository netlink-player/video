var Ads = function () {
  this.autoplayAllowed = false;
  this.autoplayRequiresMute = false;
  this.isSticky = false;
  this.startEvent = "click";
  this.isFirst = false;
  this.isLoad = false;
  this.mainSticky = document.getElementById("main-videoplayer");

  var bgr_netlink = document.createElement("div");
  bgr_netlink.id = "bgr_netlink";

  var scriptElement_btn = document.createElement("button");

  scriptElement_btn.innerHTML = "&#x2715;";
  scriptElement_btn.style =
    "right: 0%; height: 100%; font-weight: bold; position: absolute;";

  var scriptElement = document.createElement("a");
  scriptElement.href = "https://netlink.vn";
  scriptElement.id = "netlink_logo";
  scriptElement.style = "left: 1%; position: absolute";

  var scriptElement_img = document.createElement("img");
  scriptElement_img.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/video@master/logo-netlink.webp";
  scriptElement_img.style = "vertical-align: middle; height: 20px; width: 63px";

  scriptElement.appendChild(scriptElement_img);
  bgr_netlink.prepend(scriptElement_btn);
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
  var contentPlayer = document.getElementById("content_video_html5_api");
  if (
    (navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) &&
    contentPlayer.hasAttribute("controls")
  ) {
    contentPlayer.removeAttribute("controls");
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
  // document.onload = function () {
  //   if (this.checkDivInViewableArea(this.mainSticky)) {
  //     console.log("heh");
  //   }
  // };

  this.player.ima(options);

  setTimeout(() => {
    // this.wrapperDiv.play();
    // this.init.bind(this);
    // videojs("vjs-big-play-button").play();
  }, 3000);
};

// Ads.prototype.initPlayer = function () {

// };
Ads.prototype.sticky = function () {
  // if (this.checkDivInViewableArea(this.mainSticky) && !this.isFirst) {
  //   this.player.play();
  //   // this.playButton.remove();
  //   this.isFirst = true;
  //   console.log("heheh");
  // }
  if (this.isLoad) {
    if (!this.checkDivInViewableArea(this.wrapperDiv) && !this.isSticky) {
      this.wrapperDiv.style.position = "fixed";
      this.wrapperDiv.style.bottom = 0;
      this.wrapperDiv.style.left = 0;
      this.wrapperDiv.style.height = "250px";
      this.wrapperDiv.style.width = "320px";
      this.wrapperDiv.style.zIndex = 10000;
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
      this.wrapperDiv.style.removeProperty("zIndex");
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
  "https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-video-pub-3166493188367342&description_url=http%3A%2F%2Fwww.tinmoi.vn&videoad_start_delay=0&hl=en&max_ad_duration=15000&sdmax=30000";

  // "http://pubads.g.doubleclick.net/gampad/ads?" +
  // "sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&" +
  // "ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&" +
  // "unviewed_position_start=1&" +
  // "cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&" +
  // "vid=short_onecue&correlator=";

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
  for (var index = 0; index < events.length; index++) {
    this.player.ima.addEventListener(events[index], this.onAdEvent.bind(this));
  }

  this.player.ima.addEventListener(google.ima.AdEvent.Type.LOADED, () => {
    this.isLoad = true;
  });
};
Ads.prototype.onAdEvent = function (event) {
  var message = "Ad event: " + event.type;
  console.log(message);
};
