/**
 * Created by tangben on 2015/6/12.
 */
/**
 *
 * ʧ�ܽ���
 * @author Kanon
 */
var FailPanel = (function (_super) {
    __extends(FailPanel, _super);
    function FailPanel() {
        _super.call(this);
        //�Ƿ���ʼ����
        this.isInit = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = FailPanel.prototype;
    __egretProto__.onAddToStage = function (event) {
        if (this.isInit)
            return;
        this.bg = new egret.Bitmap();
        this.bg.anchorX = .5;
        this.bg.anchorY = .5;
        this.bg.texture = RES.getRes("failPanel");
        this.addChild(this.bg);
        this.againBtn = new egret.Bitmap();
        this.againBtn.texture = RES.getRes("againBtn");
        this.againBtn.x = 126;
        this.againBtn.y = 130;
        this.againBtn.anchorX = .5;
        this.againBtn.anchorY = .5;
        this.againBtn.touchEnabled = true;
        this.addChild(this.againBtn);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndAgainBtnHandler, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginAgainBtnHandler, this);
        this.backBtn = new egret.Bitmap();
        this.backBtn.texture = RES.getRes("closeBtn");
        this.backBtn.x = -126;
        this.backBtn.y = this.againBtn.y;
        this.backBtn.anchorX = .5;
        this.backBtn.anchorY = .5;
        this.backBtn.touchEnabled = true;
        this.addChild(this.backBtn);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndBackBtnHandler, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginBackBtnHandler, this);
        this.isInit = true;
    };
    __egretProto__.onTouchEndAgainBtnHandler = function (event) {
        this.againBtn.scaleX = 1;
        this.againBtn.scaleY = 1;
        this.dispatchEvent(new egret.Event("playAgain"));
    };
    __egretProto__.onTouchBeginAgainBtnHandler = function (event) {
        this.againBtn.scaleX = .9;
        this.againBtn.scaleY = .9;
    };
    __egretProto__.onTouchEndBackBtnHandler = function (event) {
        this.backBtn.scaleX = 1;
        this.backBtn.scaleY = 1;
        this.dispatchEvent(new egret.Event("back"));
    };
    __egretProto__.onTouchBeginBackBtnHandler = function (event) {
        this.backBtn.scaleX = .9;
        this.backBtn.scaleY = .9;
    };
    return FailPanel;
})(egret.Sprite);
FailPanel.prototype.__class__ = "FailPanel";
