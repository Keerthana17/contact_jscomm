var StylePanel = {
    opt: {
        themeStyle: "#savvyStyle",
        stylePanel: ".style-panel",
        stylePanelButton: ".style-panel__button",
        cookieColor: "cookieColor"
    },
    loadCssFile: "style-panel.css",
    init: function(a) {
        if (!this._inited) {
            this._inited = !0, a && (a.on && ($(this).on(a.on), delete a.on), $.extend(this, a));
            var b = this,
                c = this.getPanel(),
                d = !1;
            if (!(c.length < 1)) {
                var e = !0;
                if (this.loadCssFile) {
                    var f = this.getCssFileUrl(this.loadCssFile);
                    $('link[href^="' + f + '"]').length < 1 && (e = !1, $("<link>").attr("rel", "stylesheet").attr("href", f).insertAfter(this.getMainStyleLinkEl()).on("load", function() {
                        c.fadeIn("slow")
                    }))
                }
                c.find(this.opt.stylePanelButton).on("click", function() {
                    c.animate({
                        left: d ? "-" + c.outerWidth() + "px" : 0
                    }, 500), d = !d
                }), e && c.fadeIn("slow"), this.getColorButtons().on("click", function(a) {
                    a.preventDefault(), b.setColor($(this).data("value"))
                }), this.getResetBtn().on("click", function() {
                    b.setColor("")
                }), "undefined" != this.getCookie() && this.setColor(this.getCookie())
            }
        }
    },
    getPanel: function() {
        return $(this.opt.stylePanel)
    },
    getColorButtons: function() {
        return this.getPanel().find("a[data-value]")
    },
    getCssFileUrl: function(a) {
        if (!this._baseCssUrl) {
            var b = this.getMainStyleLinkEl();
            this._baseCssUrl = b.attr("href").replace(/[^/]+$/, "")
        }
        return this._baseCssUrl + a
    },
    getMainStyleLinkEl: function() {
        return $(this.opt.themeStyle)
    },
    setColor: function(a) {
        var b = this.getMainStyleLinkEl();
        this._defaultUrl || (this._defaultUrl = b.attr("href"));
        var c = "?tc=c" + (new Date).getTime(),
            d = a ? this.getCssFileUrl("main-skin-" + a + ".css" + c) : this._defaultUrl;
        if (d != b.attr("href")) {
            {
                var e = this;
                b.clone().on("load", function() {
                    b.remove(), $(e).trigger("updated")
                }).attr("href", d).insertAfter(b)
            }
            this.setCookie(a);
            var f = this.getColorButtons();
            if (f.filter(".active").removeClass("active"), f.filter('[data-value="' + a + '"]').addClass("active"), this._secondCheck) this.checkResetBtnState();
            else {
                var e = this;
                setTimeout(function() {
                    e.checkResetBtnState()
                }, 200), this._secondCheck = !0
            }
        }
    },
    checkResetBtnState: function() {
        var a = this.getResetBtn();
        this.getColorButtons().filter(".active").length ? a.show() : a.hide()
    },
    getResetBtn: function() {
        return this.getPanel().find(".btn-reset")
    },
    setCookie: function(a) {
        $.cookie(this.opt.cookieColor, a)
    },
    getCookie: function() {
        return $.cookie(this.opt.cookieColor)
    }
};
jQuery(function() {
    StylePanel.init({
        on: {
            updated: function() {
                window.Template && (Template.shortcodes && Template.shortcodes.hardReset(), Template.init())
            }
        }
    })
});