/**
 * 开始场景
 * @author Kanon
 */
var StartUI = (function (_super) {
    __extends(StartUI, _super);
    function StartUI() {
        _super.call(this);
        //是否初始化过
        this.isInit = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = StartUI.prototype;
    __egretProto__.onAddToStage = function (event) {
        if (!this.isInit) {
            this.isInit = true;
            this.bg = new egret.Bitmap();
            this.bg.texture = RES.getRes("startBg");
            this.addChild(this.bg);
            var texture = RES.getRes("standMotion");
            var json = RES.getRes("standMotionJson");
            var mcdf = new egret.MovieClipDataFactory(json, texture);
            this.shadow = new egret.Bitmap();
            this.shadow.texture = RES.getRes("shadow");
            this.shadow.anchorX = .5;
            this.shadow.anchorY = .5;
            this.shadow.x = this.stage.stageWidth / 2;
            this.shadow.y = 580;
            this.addChild(this.shadow);
            this.roleMc = new egret.MovieClip(mcdf.generateMovieClipData());
            this.roleMc.frameRate = 12;
            this.roleMc.anchorX = .5;
            this.roleMc.anchorY = .5;
            this.addChild(this.roleMc);
            this.roleMc.x = this.stage.stageWidth / 2;
            this.roleMc.y = 450;
            /*this.startTips = new  egret.Bitmap();
            this.startTips.texture = RES.getRes("startTips");
            this.addChild(this.startTips);
            this.startTips.anchorX = .5;
            this.startTips.anchorY = .5;
            this.startTips.x = 234;
            this.startTips.y = 375;

            TweenMax.to(this.startTips, .5, {y:385, repeat:-1, yoyo:true});*/
            this.startBtn = new egret.Bitmap();
            this.startBtn.touchEnabled = true;
            this.startBtn.texture = RES.getRes("startBtn");
            this.startBtn.anchorX = .5;
            this.startBtn.anchorY = .5;
            this.startBtn.x = this.stage.stageWidth / 2;
            this.startBtn.y = this.roleMc.y + 230;
            this.addChild(this.startBtn);
            this.flyRole = new egret.Bitmap();
            this.flyRole.texture = RES.getRes("touchFlyRole");
            this.flyRole.anchorX = .5;
            this.flyRole.anchorY = .5;
            this.addChild(this.flyRole);
            var texture = RES.getRes("finger");
            var json = RES.getRes("fingerJson");
            var mcdf = new egret.MovieClipDataFactory(json, texture);
            this.finger = new egret.MovieClip(mcdf.generateMovieClipData());
            this.finger.frameRate = 12;
            this.finger.anchorX = .5;
            this.finger.anchorY = .5;
            this.reset();
        }
        this.shadow.visible = true;
        this.roleMc.play(-1);
    };
    __egretProto__.reset = function () {
        this.flyRole.x = this.roleMc.x;
        this.flyRole.y = this.roleMc.y;
        this.finger.x = 900;
        this.finger.y = 450;
        this.finger.gotoAndStop(1);
        this.roleMc.visible = true;
        this.flyRole.visible = false;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
    };
    __egretProto__.onTouchBeginHandler = function (event) {
        this.startBtn.scaleX = .9;
        this.startBtn.scaleY = .9;
    };
    __egretProto__.onTouchHandler = function (event) {
        this.startBtn.scaleX = 1;
        this.startBtn.scaleY = 1;
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
        this.addChild(this.finger);
        egret.Tween.get(this.finger).to({ x: 600 }, 400, egret.Ease.cubicOut).call(this.fingerMotionComplete, this);
    };
    __egretProto__.fingerMotionComplete = function () {
        this.finger.play(1);
        this.finger.addEventListener(egret.Event.ENTER_FRAME, this.fingerLoop, this);
    };
    __egretProto__.fingerLoop = function () {
        if (this.finger.currentFrame == this.finger.totalFrames) {
            this.finger.removeEventListener(egret.Event.ENTER_FRAME, this.fingerLoop, this);
            this.shadow.visible = false;
            this.roleMc.visible = false;
            this.flyRole.visible = true;
            egret.Tween.get(this.flyRole).to({ x: -200, y: 90 }, 900, egret.Ease.cubicOut).call(this.flyMotionComplete, this);
        }
    };
    __egretProto__.flyMotionComplete = function () {
        //开始游戏
        this.dispatchEvent(new egret.Event("StartGame"));
    };
    return StartUI;
})(egret.Sprite);
StartUI.prototype.__class__ = "StartUI";
