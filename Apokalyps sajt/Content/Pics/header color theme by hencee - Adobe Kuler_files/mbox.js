var mboxCopyright = "Copyright 1996-2012. Adobe Systems Incorporated. All rights reserved.";mboxUrlBuilder = function(a, b) { this.a = a; this.b = b; this.c = new Array(); this.d = function(e) { return e; }; this.f = null;};mboxUrlBuilder.prototype.addNewParameter = function (g, h) { this.c.push({name: g, value: h}); return this;};mboxUrlBuilder.prototype.addParameterIfAbsent = function (g, h) { if (h) { for (var i = 0; i < this.c.length; i++) { var j = this.c[i]; if (j.name === g) { return this; } } this.checkInvalidCharacters(g); return this.addNewParameter(g, h); }};mboxUrlBuilder.prototype.addParameter = function(g, h) { this.checkInvalidCharacters(g); for (var i = 0; i < this.c.length; i++) { var j = this.c[i]; if (j.name === g) { j.value = h; return this; } } return this.addNewParameter(g, h);};mboxUrlBuilder.prototype.addParameters = function(c) { if (!c) { return this; } for (var i = 0; i < c.length; i++) { var k = c[i].indexOf('='); if (k == -1 || k == 0) { continue; } this.addParameter(c[i].substring(0, k), c[i].substring(k + 1, c[i].length)); } return this;};mboxUrlBuilder.prototype.setServerType = function(l) { this.m = l;};mboxUrlBuilder.prototype.setBasePath = function(f) { this.f = f;};mboxUrlBuilder.prototype.setUrlProcessAction = function(n) { this.d = n;};mboxUrlBuilder.prototype.buildUrl = function() { var o = this.f ? this.f : '/m2/' + this.b + '/mbox/' + this.m; var p = document.location.protocol == 'file:' ? 'http:' : document.location.protocol; var e = p + "//" + this.a + o; var q = e.indexOf('?') != -1 ? '&' : '?'; for (var i = 0; i < this.c.length; i++) { var j = this.c[i]; e += q + encodeURIComponent(j.name) + '=' + encodeURIComponent(j.value); q = '&'; } return this.r(this.d(e));};mboxUrlBuilder.prototype.getParameters = function() { return this.c;};mboxUrlBuilder.prototype.setParameters = function(c) { this.c = c;};mboxUrlBuilder.prototype.clone = function() { var s = new mboxUrlBuilder(this.a, this.b); s.setServerType(this.m); s.setBasePath(this.f); s.setUrlProcessAction(this.d); for (var i = 0; i < this.c.length; i++) { s.addParameter(this.c[i].name, this.c[i].value); } return s;};mboxUrlBuilder.prototype.r = function(t) { return t.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');}; mboxUrlBuilder.prototype.checkInvalidCharacters = function (g) { var u = new RegExp('(\'|")'); if (u.exec(g)) { throw "Parameter '" + g + "' contains invalid characters"; } };mboxStandardFetcher = function() { };mboxStandardFetcher.prototype.getType = function() { return 'standard';};mboxStandardFetcher.prototype.fetch = function(v) { v.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + v.buildUrl() + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxStandardFetcher.prototype.cancel = function() { };mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype.getType = function() { return 'ajax';};mboxAjaxFetcher.prototype.fetch = function(v) { v.setServerType(this.getType()); var e = v.buildUrl(); this.w = document.createElement('script'); this.w.src = e; document.body.appendChild(this.w);};mboxAjaxFetcher.prototype.cancel = function() { };mboxMap = function() { this.x = new Object(); this.y = new Array();};mboxMap.prototype.put = function(z, h) { if (!this.x[z]) { this.y[this.y.length] = z; } this.x[z] = h;};mboxMap.prototype.get = function(z) { return this.x[z];};mboxMap.prototype.remove = function(z) { this.x[z] = undefined;};mboxMap.prototype.each = function(n) { for (var i = 0; i < this.y.length; i++ ) { var z = this.y[i]; var h = this.x[z]; if (h) { var A = n(z, h); if (A === false) { break; } } }};mboxFactory = function(B, b, C) { this.D = false; this.B = B; this.C = C; this.E = new mboxList(); mboxFactories.put(C, this); this.F = typeof document.createElement('div').replaceChild != 'undefined' && (function() { return true; })() && typeof document.getElementById != 'undefined' && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined' && typeof encodeURIComponent != 'undefined'; this.G = this.F && mboxGetPageParameter('mboxDisable') == null; var H = C == 'default'; this.I = new mboxCookieManager( 'mbox' + (H ? '' : ('-' + C)), (function() { return mboxCookiePageDomain(); })()); this.G = this.G && this.I.isEnabled() && (this.I.getCookie('disable') == null); if (this.isAdmin()) { this.enable(); } this.J(); this.K = mboxGenerateId(); this.L = mboxScreenHeight(); this.M = mboxScreenWidth(); this.N = mboxBrowserWidth(); this.O = mboxBrowserHeight(); this.P = mboxScreenColorDepth(); this.Q = mboxBrowserTimeOffset(); this.R = new mboxSession(this.K, 'mboxsession', 'session', 31 * 60, this.I); this.S = new mboxPC('PC', 1209600, this.I); this.v = new mboxUrlBuilder(B, b); this.T(this.v, H); this.U = new Date().getTime(); this.V = this.U; var W = this; this.addOnLoad(function() { W.V = new Date().getTime(); }); if (this.F) { this.addOnLoad(function() { W.D = true; W.getMboxes().each(function(X) { X.setFetcher(new mboxAjaxFetcher()); X.finalize(); }); }); if (this.G) { this.limitTraffic(100, 10368000); this.Y(); this.Z = new mboxSignaler(function(_, c) { return W.create(_, c); }, this.I); } }};mboxFactory.prototype.forcePCId = function(ab) { if (this.S.forceId(ab)) { this.R.forceId(mboxGenerateId()); }};mboxFactory.prototype.forceSessionId = function(ab) { this.R.forceId(ab);};mboxFactory.prototype.isEnabled = function() { return this.G;};mboxFactory.prototype.getDisableReason = function() { return this.I.getCookie('disable');};mboxFactory.prototype.isSupported = function() { return this.F;};mboxFactory.prototype.disable = function(bb, cb) { if (typeof bb == 'undefined') { bb = 60 * 60; } if (typeof cb == 'undefined') { cb = 'unspecified'; } if (!this.isAdmin()) { this.G = false; this.I.setCookie('disable', cb, bb); }};mboxFactory.prototype.enable = function() { this.G = true; this.I.deleteCookie('disable');};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf('mboxEnv') != -1;};mboxFactory.prototype.limitTraffic = function(db, bb) {};mboxFactory.prototype.addOnLoad = function(eb) { if (this.isDomLoaded()) { eb(); } else { var fb = false; var gb = function() { if (fb) { return; } fb = true; eb(); }; this.hb.push(gb); if (this.isDomLoaded() && !fb) { gb(); } }};mboxFactory.prototype.getEllapsedTime = function() { return this.V - this.U;};mboxFactory.prototype.getEllapsedTimeUntil = function(ib) { return ib - this.U;};mboxFactory.prototype.getMboxes = function() { return this.E;};mboxFactory.prototype.get = function(_, jb) { return this.E.get(_).getById(jb || 0);};mboxFactory.prototype.update = function(_, c) { if (!this.isEnabled()) { return; } if (!this.isDomLoaded()) { var W = this; this.addOnLoad(function() { W.update(_, c); }); return; } if (this.E.get(_).length() == 0) { throw "Mbox " + _ + " is not defined"; } this.E.get(_).each(function(X) { X.getUrlBuilder() .addParameter('mboxPage', mboxGenerateId()); X.load(c); });};mboxFactory.prototype.setVisitorIdParameters = function(e) { var namespace = 'adobemcspb'; if (typeof Visitor == 'undefined' || typeof Visitor.ID_TYPE_AUTHENTICATED == 'undefined' || namespace.length == 0) { return; } var anonymousVisitorIdName = 'mboxMCVID'; var globalVisitorIdName = 'mboxMCGVID'; var customVisitorIdName = 'mboxMCCUSTID'; var globalLocationHintName = 'mboxMCGLH'; var visitor = Visitor.getInstance(namespace); if (visitor.isAllowed()) { var globalVisitorID = visitor.getGlobalVisitorID(function (callbackGlobalVisitorID) { e.addParameterIfAbsent(globalVisitorIdName, callbackGlobalVisitorID); if (callbackGlobalVisitorID) { e.addParameterIfAbsent(globalLocationHintName, visitor.getGlobalLocationHint()); } }); e.addParameterIfAbsent(globalVisitorIdName, globalVisitorID); var anonymousVisitorId = visitor.getAnonymousVisitorID(function (callbackAnonymousVisitorID) { e.addParameterIfAbsent(anonymousVisitorIdName, callbackAnonymousVisitorID); }); e.addParameterIfAbsent(anonymousVisitorIdName, anonymousVisitorId); e.addParameterIfAbsent(customVisitorIdName, visitor.getAuthenticatedVisitorID()); if (globalVisitorID) { e.addParameterIfAbsent(globalLocationHintName, visitor.getGlobalLocationHint()); } }};mboxFactory.prototype.create = function( _, c, kb) { if (!this.isSupported()) { return null; } var e = this.v.clone(); e.addParameter('mboxCount', this.E.length() + 1); e.addParameters(c); this.setVisitorIdParameters(e); var jb = this.E.get(_).length(); var lb = this.C + '-' + _ + '-' + jb; var mb; if (kb) { mb = new mboxLocatorNode(kb); } else { if (this.D) { throw 'The page has already been loaded, can\'t write marker'; } mb = new mboxLocatorDefault(lb); } try { var W = this; var nb = 'mboxImported-' + lb; var X = new mbox(_, jb, e, mb, nb); if (this.G) { X.setFetcher( this.D ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } X.setOnError(function(ob, l) { X.setMessage(ob); X.activate(); if (!X.isActivated()) { W.disable(60 * 60, ob); window.location.reload(false); } }); this.E.add(X); } catch (pb) { this.disable(); throw 'Failed creating mbox "' + _ + '", the error was: ' + pb; } var qb = new Date(); e.addParameter('mboxTime', qb.getTime() - (qb.getTimezoneOffset() * 60000)); return X;};mboxFactory.prototype.getCookieManager = function() { return this.I;};mboxFactory.prototype.getPageId = function() { return this.K;};mboxFactory.prototype.getPCId = function() { return this.S;};mboxFactory.prototype.getSessionId = function() { return this.R;};mboxFactory.prototype.getSignaler = function() { return this.Z;};mboxFactory.prototype.getUrlBuilder = function() { return this.v;};mboxFactory.prototype.T = function(e, H) { e.addParameter('mboxHost', document.location.hostname) .addParameter('mboxSession', this.R.getId()); if (!H) { e.addParameter('mboxFactoryId', this.C); } if (this.S.getId() != null) { e.addParameter('mboxPC', this.S.getId()); } e.addParameter('mboxPage', this.K); e.addParameter('screenHeight', this.L); e.addParameter('screenWidth', this.M); e.addParameter('browserWidth', this.N); e.addParameter('browserHeight', this.O); e.addParameter('browserTimeOffset', this.Q); e.addParameter('colorDepth', this.P); e.addParameter('mboxXDomain', "enabled"); e.setUrlProcessAction(function(e) { e += '&mboxURL=' + encodeURIComponent(document.location); var rb = encodeURIComponent(document.referrer); if (e.length + rb.length < 2000) { e += '&mboxReferrer=' + rb; } e += '&mboxVersion=' + mboxVersion; return e; });};mboxFactory.prototype.sb = function() { return "";};mboxFactory.prototype.Y = function() { document.write('<style>.' + 'mboxDefault' + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.D;};mboxFactory.prototype.J = function() { if (this.hb != null) { return; } this.hb = new Array(); var W = this; (function() { var tb = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"; var ub = false; var vb = function() { if (ub) { return; } ub = true; for (var i = 0; i < W.hb.length; ++i) { W.hb[i](); } }; if (document.addEventListener) { document.addEventListener(tb, function() { document.removeEventListener(tb, arguments.callee, false); vb(); }, false); window.addEventListener("load", function(){ document.removeEventListener("load", arguments.callee, false); vb(); }, false); } else if (document.attachEvent) { if (self !== self.top) { document.attachEvent(tb, function() { if (document.readyState === 'complete') { document.detachEvent(tb, arguments.callee); vb(); } }); } else { var wb = function() { try { document.documentElement.doScroll('left'); vb(); } catch (xb) { setTimeout(wb, 13); } }; wb(); } } if (document.readyState === "complete") { vb(); } })();};mboxSignaler = function(yb, I) { this.I = I; var zb = I.getCookieNames('signal-'); for (var i = 0; i < zb.length; i++) { var Ab = zb[i]; var Bb = I.getCookie(Ab).split('&'); var X = yb(Bb[0], Bb); X.load(); I.deleteCookie(Ab); }};mboxSignaler.prototype.signal = function(Cb, _ ) { this.I.setCookie('signal-' + Cb, mboxShiftArray(arguments).join('&'), 45 * 60);};mboxList = function() { this.E = new Array();};mboxList.prototype.add = function(X) { if (X != null) { this.E[this.E.length] = X; }};mboxList.prototype.get = function(_) { var A = new mboxList(); for (var i = 0; i < this.E.length; i++) { var X = this.E[i]; if (X.getName() == _) { A.add(X); } } return A;};mboxList.prototype.getById = function(Db) { return this.E[Db];};mboxList.prototype.length = function() { return this.E.length;};mboxList.prototype.each = function(n) { if (typeof n != 'function') { throw 'Action must be a function, was: ' + typeof(n); } for (var i = 0; i < this.E.length; i++) { n(this.E[i]); }};mboxLocatorDefault = function(g) { this.g = 'mboxMarker-' + g; document.write('<div id="' + this.g + '" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate = function() { var Eb = document.getElementById(this.g); while (Eb != null) { if (Eb.nodeType == 1) { if (Eb.className == 'mboxDefault') { return Eb; } } Eb = Eb.previousSibling; } return null;};mboxLocatorDefault.prototype.force = function() { var Fb = document.createElement('div'); Fb.className = 'mboxDefault'; var Gb = document.getElementById(this.g); Gb.parentNode.insertBefore(Fb, Gb); return Fb;};mboxLocatorNode = function(Hb) { this.Eb = Hb;};mboxLocatorNode.prototype.locate = function() { return typeof this.Eb == 'string' ? document.getElementById(this.Eb) : this.Eb;};mboxLocatorNode.prototype.force = function() { return null;};mboxCreate = function(_ ) { var X = mboxFactoryDefault.create( _, mboxShiftArray(arguments)); if (X) { X.load(); } return X;};mboxDefine = function(kb, _ ) { var X = mboxFactoryDefault.create(_, mboxShiftArray(mboxShiftArray(arguments)), kb); return X;};mboxUpdate = function(_ ) { mboxFactoryDefault.update(_, mboxShiftArray(arguments));};mbox = function(g, Ib, v, Jb, nb) { this.Kb = null; this.Lb = 0; this.mb = Jb; this.nb = nb; this.Mb = null; this.Nb = new mboxOfferContent(); this.Fb = null; this.v = v; this.message = ''; this.Ob = new Object(); this.Pb = 0; this.Ib = Ib; this.g = g; this.Qb(); v.addParameter('mbox', g) .addParameter('mboxId', Ib); this.Rb = function() {}; this.Sb = function() {}; this.Tb = null;};mbox.prototype.getId = function() { return this.Ib;};mbox.prototype.Qb = function() { if (this.g.length > 250) { throw "Mbox Name " + this.g + " exceeds max length of " + "250 characters."; } else if (this.g.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.g + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.g;};mbox.prototype.getParameters = function() { var c = this.v.getParameters(); var A = new Array(); for (var i = 0; i < c.length; i++) { if (c[i].name.indexOf('mbox') != 0) { A[A.length] = c[i].name + '=' + c[i].value; } } return A;};mbox.prototype.setOnLoad = function(n) { this.Sb = n; return this;};mbox.prototype.setMessage = function(ob) { this.message = ob; return this;};mbox.prototype.setOnError = function(Rb) { this.Rb = Rb; return this;};mbox.prototype.setFetcher = function(Ub) { if (this.Mb) { this.Mb.cancel(); } this.Mb = Ub; return this;};mbox.prototype.getFetcher = function() { return this.Mb;};mbox.prototype.load = function(c) { if (this.Mb == null) { return this; } this.setEventTime("load.start"); this.cancelTimeout(); this.Lb = 0; var v = (c && c.length > 0) ? this.v.clone().addParameters(c) : this.v; this.Mb.fetch(v); var W = this; this.Vb = setTimeout(function() { W.Rb('browser timeout', W.Mb.getType()); }, 15000); this.setEventTime("load.end"); return this;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate()) { var W = this; setTimeout(function() { W.loaded(); }, 100); }};mbox.prototype.activate = function() { if (this.Lb) { return this.Lb; } this.setEventTime('activate' + ++this.Pb + '.start'); if (this.show()) { this.cancelTimeout(); this.Lb = 1; } this.setEventTime('activate' + this.Pb + '.end'); return this.Lb;};mbox.prototype.isActivated = function() { return this.Lb;};mbox.prototype.setOffer = function(Nb) { if (Nb && Nb.show && Nb.setOnLoad) { this.Nb = Nb; } else { throw 'Invalid offer'; } return this;};mbox.prototype.getOffer = function() { return this.Nb;};mbox.prototype.show = function() { this.setEventTime('show.start'); var A = this.Nb.show(this); this.setEventTime(A == 1 ? "show.end.ok" : "show.end"); return A;};mbox.prototype.showContent = function(Wb) { if (Wb == null) { return 0; } if (this.Fb == null || !this.Fb.parentNode) { this.Fb = this.getDefaultDiv(); if (this.Fb == null) { return 0; } } if (this.Fb != Wb) { this.Xb(this.Fb); this.Fb.parentNode.replaceChild(Wb, this.Fb); this.Fb = Wb; } this.Yb(Wb); this.Sb(); return 1;};mbox.prototype.hide = function() { this.setEventTime('hide.start'); var A = this.showContent(this.getDefaultDiv()); this.setEventTime(A == 1 ? 'hide.end.ok' : 'hide.end.fail'); return A;};mbox.prototype.finalize = function() { this.setEventTime('finalize.start'); this.cancelTimeout(); if (this.getDefaultDiv() == null) { if (this.mb.force() != null) { this.setMessage('No default content, an empty one has been added'); } else { this.setMessage('Unable to locate mbox'); } } if (!this.activate()) { this.hide(); this.setEventTime('finalize.end.hide'); } this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout = function() { if (this.Vb) { clearTimeout(this.Vb); } if (this.Mb != null) { this.Mb.cancel(); }};mbox.prototype.getDiv = function() { return this.Fb;};mbox.prototype.getDefaultDiv = function() { if (this.Tb == null) { this.Tb = this.mb.locate(); } return this.Tb;};mbox.prototype.setEventTime = function(Zb) { this.Ob[Zb] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.Ob;};mbox.prototype.getImportName = function() { return this.nb;};mbox.prototype.getURL = function() { return this.v.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.v;};mbox.prototype._b = function(Fb) { return Fb.style.display != 'none';};mbox.prototype.Yb = function(Fb) { this.ac(Fb, true);};mbox.prototype.Xb = function(Fb) { this.ac(Fb, false);};mbox.prototype.ac = function(Fb, bc) { Fb.style.visibility = bc ? "visible" : "hidden"; Fb.style.display = bc ? "block" : "none";};mboxOfferContent = function() { this.Sb = function() {};};mboxOfferContent.prototype.show = function(X) { var A = X.showContent(document.getElementById(X.getImportName())); if (A == 1) { this.Sb(); } return A;};mboxOfferContent.prototype.setOnLoad = function(Sb) { this.Sb = Sb;};mboxOfferAjax = function(Wb) { this.Wb = Wb; this.Sb = function() {};};mboxOfferAjax.prototype.setOnLoad = function(Sb) { this.Sb = Sb;};mboxOfferAjax.prototype.show = function(X) { var cc = document.createElement('div'); cc.id = X.getImportName(); cc.innerHTML = this.Wb; var A = X.showContent(cc); if (A == 1) { this.Sb(); } return A;};mboxOfferDefault = function() { this.Sb = function() {};};mboxOfferDefault.prototype.setOnLoad = function(Sb) { this.Sb = Sb;};mboxOfferDefault.prototype.show = function(X) { var A = X.hide(); if (A == 1) { this.Sb(); } return A;};mboxCookieManager = function mboxCookieManager(g, dc) { this.g = g; this.dc = dc == '' || dc.indexOf('.') == -1 ? '' : '; domain=' + dc; this.ec = new mboxMap(); this.loadCookies();};mboxCookieManager.prototype.isEnabled = function() { this.setCookie('check', 'true', 60); this.loadCookies(); return this.getCookie('check') == 'true';};mboxCookieManager.prototype.setCookie = function(g, h, bb) { if (typeof g != 'undefined' && typeof h != 'undefined' && typeof bb != 'undefined') { var fc = new Object(); fc.name = g; fc.value = escape(h); fc.expireOn = Math.ceil(bb + new Date().getTime() / 1000); this.ec.put(g, fc); this.saveCookies(); }};mboxCookieManager.prototype.getCookie = function(g) { var fc = this.ec.get(g); return fc ? unescape(fc.value) : null;};mboxCookieManager.prototype.deleteCookie = function(g) { this.ec.remove(g); this.saveCookies();};mboxCookieManager.prototype.getCookieNames = function(gc) { var hc = new Array(); this.ec.each(function(g, fc) { if (g.indexOf(gc) == 0) { hc[hc.length] = g; } }); return hc;};mboxCookieManager.prototype.saveCookies = function() { var ic = false; var jc = 'disable'; var kc = new Array(); var lc = 0; this.ec.each(function(g, fc) { if(!ic || g === jc) { kc[kc.length] = g + '#' + fc.value + '#' + fc.expireOn; if (lc < fc.expireOn) { lc = fc.expireOn; } } }); var mc = new Date(lc * 1000); document.cookie = this.g + '=' + kc.join('|') + '; expires=' + mc.toGMTString() + '; path=/' + this.dc;};mboxCookieManager.prototype.loadCookies = function() { this.ec = new mboxMap(); var nc = document.cookie.indexOf(this.g + '='); if (nc != -1) { var oc = document.cookie.indexOf(';', nc); if (oc == -1) { oc = document.cookie.indexOf(',', nc); if (oc == -1) { oc = document.cookie.length; } } var pc = document.cookie.substring( nc + this.g.length + 1, oc).split('|'); var qc = Math.ceil(new Date().getTime() / 1000); for (var i = 0; i < pc.length; i++) { var fc = pc[i].split('#'); if (qc <= fc[2]) { var rc = new Object(); rc.name = fc[0]; rc.value = fc[1]; rc.expireOn = fc[2]; this.ec.put(rc.name, rc); } } }};mboxSession = function(sc, tc, Ab, uc, I) { this.tc = tc; this.Ab = Ab; this.uc = uc; this.I = I; this.vc = false; this.Ib = typeof mboxForceSessionId != 'undefined' ? mboxForceSessionId : mboxGetPageParameter(this.tc); if (this.Ib == null || this.Ib.length == 0) { this.Ib = I.getCookie(Ab); if (this.Ib == null || this.Ib.length == 0) { this.Ib = sc; this.vc = true; } } I.setCookie(Ab, this.Ib, uc);};mboxSession.prototype.getId = function() { return this.Ib;};mboxSession.prototype.forceId = function(ab) { this.Ib = ab; this.I.setCookie(this.Ab, this.Ib, this.uc);};mboxPC = function(Ab, uc, I) { this.Ab = Ab; this.uc = uc; this.I = I; this.Ib = typeof mboxForcePCId != 'undefined' ? mboxForcePCId : I.getCookie(Ab); if (this.Ib != null) { I.setCookie(Ab, this.Ib, uc); }};mboxPC.prototype.getId = function() { return this.Ib;};mboxPC.prototype.forceId = function(ab) { if (this.Ib != ab) { this.Ib = ab; this.I.setCookie(this.Ab, this.Ib, this.uc); return true; } return false;};mboxGetPageParameter = function(g) { var A = null; var wc = new RegExp(g + "=([^\&]*)"); var xc = wc.exec(document.location); if (xc != null && xc.length >= 2) { A = xc[1]; } return A;};mboxSetCookie = function(g, h, bb) { return mboxFactoryDefault.getCookieManager().setCookie(g, h, bb);};mboxGetCookie = function(g) { return mboxFactoryDefault.getCookieManager().getCookie(g);};mboxCookiePageDomain = function() { var dc = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var yc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!yc.exec(dc)) { var zc = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(dc); if (zc) { dc = zc[0]; } } return dc ? dc: "";};mboxShiftArray = function(Ac) { var A = new Array(); for (var i = 1; i < Ac.length; i++) { A[A.length] = Ac[i]; } return A;};mboxGenerateId = function() { return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;};if (typeof mboxVersion == 'undefined') { var mboxVersion = 43; var mboxFactories = new mboxMap(); var mboxFactoryDefault = new mboxFactory('adobe.tt.omtrdc.net', 'adobe', 'default');};if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager() .getCookie("debug") != null) { setTimeout(function() { if (typeof mboxDebugLoaded == 'undefined') { alert('Could not load the remote debug.\nPlease check your connection' + ' to Test&amp;Target servers'); } }, 60*60); document.write('<' + 'scr' + 'ipt language="Javascript1.2" src=' + '"http://admin9.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=adobe.tt.omtrdc.net' + '&clientCode=adobe"><' + '\/scr' + 'ipt>');};mboxScPluginFetcher = function(b, Bc) { this.b = b; this.Bc = Bc;};mboxScPluginFetcher.prototype.Cc = function(v) { v.setBasePath('/m2/' + this.b + '/sc/standard'); this.Dc(v); var e = v.buildUrl(); e += '&scPluginVersion=1'; return e;};mboxScPluginFetcher.prototype.Dc = function(v) { var Ec = [ "dynamicVariablePrefix","visitorID","vmk","ppu","charSet", "visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName", "currencyCode","variableProvider","channel","server", "pageType","transactionID","purchaseID","campaign","state","zip","events", "products","linkName","linkType","resolution","colorDepth", "javascriptVersion","javaEnabled","cookiesEnabled","browserWidth", "browserHeight","connectionType","homepage","pe","pev1","pev2","pev3", "visitorSampling","visitorSamplingGroup","dynamicAccountSelection", "dynamicAccountList","dynamicAccountMatch","trackDownloadLinks", "trackExternalLinks","trackInlineStats","linkLeaveQueryString", "linkDownloadFileTypes","linkExternalFilters","linkInternalFilters", "linkTrackVars","linkTrackEvents","linkNames","lnk","eo" ]; for (var i = 0; i < Ec.length; i++) { this.Fc(Ec[i], v); } for (var i = 1; i <= 75; i++) { this.Fc('prop' + i, v); this.Fc('eVar' + i, v); this.Fc('hier' + i, v); }};mboxScPluginFetcher.prototype.Fc = function(g, v) { var h = this.Bc[g]; if (typeof(h) === 'undefined' || h === null || h === '') { return; } v.addParameter(g, h);};mboxScPluginFetcher.prototype.cancel = function() { };mboxScPluginFetcher.prototype.fetch = function(v) { v.setServerType(this.getType()); var e = this.Cc(v); this.w = document.createElement('script'); this.w.src = e; document.body.appendChild(this.w);};mboxScPluginFetcher.prototype.getType = function() { return 'ajax';};function mboxLoadSCPlugin(Bc) { if (!Bc) { return null; } Bc.m_tt = function(Bc) { var Gc = Bc.m_i('tt'); Gc.G = true; Gc.b = 'adobe'; Gc['_t'] = function() { if (!this.isEnabled()) { return; } var X = this.Ic(); if (X) { var Ub = new mboxScPluginFetcher(this.b, this.s); X.setFetcher(Ub); X.load(); } }; Gc.isEnabled = function() { return this.G && mboxFactoryDefault.isEnabled(); }; Gc.Ic = function() { var _ = this.Jc(); var Fb = document.createElement('DIV'); return mboxFactoryDefault.create(_, new Array(), Fb); }; Gc.Jc = function() { var Kc = this.s.events && this.s.events.indexOf('purchase') != -1; return 'SiteCatalyst: ' + (Kc ? 'purchase' : 'event'); }; }; return Bc.loadModule('tt');};mboxVizTargetUrl = function(_ ) { if (!mboxFactoryDefault.isEnabled()) { return; } var v = mboxFactoryDefault.getUrlBuilder().clone(); v.setBasePath('/m2/' + 'adobe' + '/viztarget'); v.addParameter('mbox', _); v.addParameter('mboxId', 0); v.addParameter('mboxCount', mboxFactoryDefault.getMboxes().length() + 1); var qb = new Date(); v.addParameter('mboxTime', qb.getTime() - (qb.getTimezoneOffset() * 60000)); v.addParameter('mboxPage', mboxGenerateId()); var c = mboxShiftArray(arguments); if (c && c.length > 0) { v.addParameters(c); } return v.buildUrl();};
var s_optOut=document.cookie.match( '(^|;) ?' + "adobe_optout" + '=([^;]*)(;|$)' );
if (s_optOut!=-1 && s_optOut!="" && s_optOut!==null) {
 document.write('<style>.' + 'mboxDefault' + ' { visibility:visible; }</style>');
 mboxCreate = function(Z ) { return; }
 mboxUpdate = function(Z ) { return; }
} 

function tnt_readCookie(name) {
 return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}

var aam_tnt_cval = tnt_readCookie("aam_tnt");
if(aam_tnt_cval){
	var aam_tnt_cval_array = new Array();
	aam_tnt_cval_array[0]="aamseg="+unescape(aam_tnt_cval);
	// var aam_tnt_cval_array = unescape(aam_tnt_cval).split(",");
		
	if(aam_tnt_cval_array){
		var tapMboxBuilder = mboxFactoryDefault.getUrlBuilder();
 tapMboxBuilder.addParameters(aam_tnt_cval_array);
	}
}