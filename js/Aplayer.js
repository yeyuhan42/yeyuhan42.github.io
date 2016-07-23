'user strict'
function APlayer(e) {
    if (!("music"in e && "title"in e.music && "author"in e.music && "url"in e.music && "pic"in e.music))
        throw "APlayer Error: Music, music.title, music.author, music.url, music.pic are required in options";
    if (null === e.element)
        throw "APlayer Error: element option null";
    this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
    this.isMobile && (e.autoplay = !1);
    var a = {
        element: document.getElementsByClassName("aplayer")[0],
        narrow: !1,
        autoplay: !1,
        showlrc: !1
    };
    for (var t in a)
        a.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = a[t]);
    this.option = e
}
APlayer.prototype.init = function() {
    function e(e) {
        var a = e || window.event
          , i = (a.clientX - t(p.bar)) / y;
        i = i > 0 ? i : 0,
        i = 1 > i ? i : 1,
        p.updateBar.call(p, "played", i, "width"),
        p.option.showlrc && p.updateLrc.call(p, parseFloat(p.playedBar.style.width) / 100 * p.audio.duration),
        p.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = p.secondToTime(i * p.audio.duration)
    }
    function a() {
        document.removeEventListener("mouseup", a),
        document.removeEventListener("mousemove", e),
        p.audio.currentTime = parseFloat(p.playedBar.style.width) / 100 * p.audio.duration,
        p.play()
    }
    function t(e) {
        for (var a, t = e.offsetLeft, i = e.offsetParent; null !== i; )
            t += i.offsetLeft,
            i = i.offsetParent;
        return a = document.body.scrollLeft + document.documentElement.scrollLeft,
        t - a
    }
    function i(e) {
        for (var a, t = e.offsetTop, i = e.offsetParent; null !== i; )
            t += i.offsetTop,
            i = i.offsetParent;
        return a = document.body.scrollTop + document.documentElement.scrollTop,
        t - a
    }
    if (this.element = this.option.element,
    this.music = this.option.music,
    this.option.showlrc) {
        this.lrcTime = [],
        this.lrcLine = [];
        for (var l = this.element.getElementsByClassName("aplayer-lrc-content")[0].innerHTML, s = l.split(/\n/), r = /\[(\d{2}):(\d{2})\.(\d{2})]/, n = /](.*)$/, o = /\[[A-Za-z]+:/, d = 0; d < s.length; d++) {
            s[d] = s[d].replace(/^\s+|\s+$/g, "");
            var c = r.exec(s[d])
              , u = n.exec(s[d]);
            if (c && u && !n.exec(u[1]))
                this.lrcTime.push(60 * parseInt(c[1]) + parseInt(c[2]) + parseInt(c[3]) / 100),
                this.lrcLine.push(u[1]);
            else if (s[d] && !o.exec(s[d]))
                throw "APlayer Error: lrc format error : should be like `[mm:ss.xx]lyric` : " + s[d]
        }
    }
    if (this.element.innerHTML = '<div class="aplayer-pic"><img src="' + this.music.pic + '"><div class="aplayer-button aplayer-pause aplayer-hide"><i class="demo-icon aplayer-icon-pause"></i></div><div class="aplayer-button aplayer-play"><i class="demo-icon aplayer-icon-play"></i></div></div><div class="aplayer-info"><div class="aplayer-music"><span class="aplayer-title">' + this.music.title + '</span><span class="aplayer-author"> - (＞﹏＜)加载中,好累的说...</span></div><div class="aplayer-lrc"><div class="aplayer-lrc-contents" style="transform: translateY(0);"></div></div><div class="aplayer-controller"><div class="aplayer-bar-wrap"><div class="aplayer-bar"><div class="aplayer-loaded" style="width: 0"></div><div class="aplayer-played" style="width: 0"><span class="aplayer-thumb"></span></div></div></div><div class="aplayer-time"> - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">(oﾟ▽ﾟ)</span><div class="aplayer-volume-wrap"><i class="demo-icon aplayer-icon-volume-down"></i><div class="aplayer-volume-bar-wrap"><div class="aplayer-volume-bar"><div class="aplayer-volume" style="height: 80%"></div></div></div></div></div></div></div>',
    this.option.showlrc) {
        this.element.classList.add("aplayer-withlrc");
        var m = "";
        for (this.lrcContents = this.element.getElementsByClassName("aplayer-lrc-contents")[0],
        d = 0; d < this.lrcLine.length; d++)
            m += "<p>" + this.lrcLine[d] + "</p>";
        this.lrcContents.innerHTML = m,
        this.lrcIndex = 0,
        this.lrcContents.getElementsByTagName("p")[0].classList.add("aplayer-lrc-current")
    }
    this.option.narrow && this.element.classList.add("aplayer-narrow"),
    this.audio = document.createElement("audio"),
    this.audio.src = this.music.url,
    this.audio.loop = !0,
    this.audio.preload = "metadata";
    var p = this;
    this.audio.addEventListener("durationchange", function() {
        1 !== p.audio.duration && (p.element.getElementsByClassName("aplayer-dtime")[0].innerHTML = p.secondToTime(p.audio.duration))
    }),
    this.audio.addEventListener("loadedmetadata", function() {
        p.element.getElementsByClassName("aplayer-author")[0].innerHTML = " - " + p.music.author,
        p.loadedTime = setInterval(function() {
            var e = p.audio.buffered.end(p.audio.buffered.length - 1) / p.audio.duration;
            p.updateBar.call(p, "loaded", e, "width"),
            1 === e && clearInterval(p.loadedTime)
        }, 500)
    }),
    this.audio.addEventListener("error", function() {
        p.element.getElementsByClassName("aplayer-author")[0].innerHTML = " - 加载失败 ╥﹏╥"
    }),
    this.playButton = this.element.getElementsByClassName("aplayer-play")[0],
    this.pauseButton = this.element.getElementsByClassName("aplayer-pause")[0],
    this.playButton.addEventListener("click", function() {
        p.play.call(p)
    }),
    this.pauseButton.addEventListener("click", function() {
        p.pause.call(p)
    }),
    this.playedBar = this.element.getElementsByClassName("aplayer-played")[0],
    this.loadedBar = this.element.getElementsByClassName("aplayer-loaded")[0],
    this.thumb = this.element.getElementsByClassName("aplayer-thumb")[0],
    this.bar = this.element.getElementsByClassName("aplayer-bar")[0];
    var y;
    this.bar.addEventListener("click", function(e) {
        var a = e || window.event;
        y = p.bar.clientWidth;
        var i = (a.clientX - t(p.bar)) / y;
        p.updateBar.call(p, "played", i, "width"),
        p.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = p.secondToTime(i * p.audio.duration),
        p.audio.currentTime = parseFloat(p.playedBar.style.width) / 100 * p.audio.duration
    }),
    this.thumb.addEventListener("mousedown", function() {
        y = p.bar.clientWidth,
        clearInterval(p.playedTime),
        document.addEventListener("mousemove", e),
        document.addEventListener("mouseup", a)
    }),
    this.audio.volume = .8,
    this.volumeBar = this.element.getElementsByClassName("aplayer-volume")[0];
    var h = this.element.getElementsByClassName("aplayer-volume-bar")[0]
      , v = p.element.getElementsByClassName("aplayer-time")[0].getElementsByTagName("i")[0]
      , f = 35;
    this.element.getElementsByClassName("aplayer-volume-bar-wrap")[0].addEventListener("click", function(e) {
        var a = e || window.event
          , t = (f - a.clientY + i(h)) / f;
        t = t > 0 ? t : 0,
        t = 1 > t ? t : 1,
        p.updateBar.call(p, "volume", t, "height"),
        p.audio.volume = t,
        p.audio.muted && (p.audio.muted = !1),
        1 === t ? v.className = "demo-icon aplayer-icon-volume-up" : v.className = "demo-icon aplayer-icon-volume-down"
    }),
    v.addEventListener("click", function() {
        p.audio.muted ? (p.audio.muted = !1,
        v.className = 1 === p.audio.volume ? "demo-icon aplayer-icon-volume-up" : "demo-icon aplayer-icon-volume-down",
        p.updateBar.call(p, "volume", p.audio.volume, "height")) : (p.audio.muted = !0,
        v.className = "demo-icon aplayer-icon-volume-off",
        p.updateBar.call(p, "volume", 0, "height"))
    }),
    this.option.autoplay && this.play()
}
,
APlayer.prototype.play = function() {
    this.playButton.classList.add("aplayer-hide"),
    this.pauseButton.classList.remove("aplayer-hide"),
    this.audio.play();
    var e = this;
    this.playedTime = setInterval(function() {
        e.updateBar.call(e, "played", e.audio.currentTime / e.audio.duration, "width"),
        e.option.showlrc && e.updateLrc.call(e),
        e.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = e.secondToTime(e.audio.currentTime)
    }, 100)
}
,
APlayer.prototype.pause = function() {
    this.pauseButton.classList.add("aplayer-hide"),
    this.playButton.classList.remove("aplayer-hide"),
    this.audio.pause(),
    clearInterval(this.playedTime)
}
,
APlayer.prototype.updateBar = function(e, a, t) {
    a = a > 0 ? a : 0,
    a = 1 > a ? a : 1,
    this[e + "Bar"].style[t] = 100 * a + "%"
}
,
APlayer.prototype.updateLrc = function(e) {
    if (e || (e = this.audio.currentTime),
    e < this.lrcTime[this.lrcIndex] || e >= this.lrcTime[this.lrcIndex + 1])
        for (var a = 0; a < this.lrcTime.length; a++)
            e >= this.lrcTime[a] && (!this.lrcTime[a + 1] || e < this.lrcTime[a + 1]) && (this.lrcIndex = a,
            this.lrcContents.style.transform = "translateY(" + 20 * -this.lrcIndex + "px)",
            this.lrcContents.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"),
            this.lrcContents.getElementsByTagName("p")[a].classList.add("aplayer-lrc-current"))
},
APlayer.prototype.secondToTime = function(e) {
    var a = function(e) {
        return 10 > e ? "0" + e : "" + e
    }
      , t = parseInt(e / 60)
      , i = parseInt(e - 60 * t);
    return a(t) + ":" + a(i)
};

window.onload=function(){
	 var ap1 = new APlayer({
        element: document.getElementById('player1'),
        narrow: false,
        autoplay: false,
        showlrc: false,
        music: {
            title: 'Sugar',
            author: 'Maroon 5',
            url: 'img/Sugar.mp3',
            pic: 'img/Maroon5.jpg'
        }
    });
    ap1.init();
	
    var ap2 = new APlayer({
        element: document.getElementById('player2'),
        narrow: true,
        autoplay: false,
        showlrc: false,
        music: {
            title: 'Sugar',
            author: 'Maroon 5',
            url: 'img/Sugar.mp3',
            pic: 'img/Maroon5.jpg'
        }
    });
    ap2.init();
	
    var ap3 = new APlayer({
        element: document.getElementById('player3'),
        narrow: false,
        autoplay: false,
        showlrc: true,
        music: {
            title: '平凡之路',
            author: '朴树',
            url: 'img/pingfanzhilu.mp3',
            pic: 'img/pf.jpg'
        }
    });
    ap3.init();
};