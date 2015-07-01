/**
 * Created by tangben on 2015/7/1.
 */
/**
 *
 * 奖励界面
 * @author Kanon
 */
class RewardPanel extends egret.Sprite
{
    private bg:egret.Bitmap;
    private againBtn:egret.Bitmap;
    private backBtn:egret.Bitmap;
    //是否初始化过
    private isInit:boolean = false;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event)
    {
        if(this.isInit) return;
        this.bg = new egret.Bitmap();
        this.bg.anchorX = .5;
        this.bg.anchorY = .5;
        this.bg.texture = RES.getRes("rewardPanel");
        this.addChild(this.bg);

        this.againBtn = new egret.Bitmap();
        this.againBtn.texture = RES.getRes("againBtn");
        this.againBtn.x = 135;
        this.againBtn.y = 300;
        this.againBtn.anchorX = .5;
        this.againBtn.anchorY = .5;
        this.againBtn.touchEnabled = true;
        this.addChild(this.againBtn);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndAgainBtnHandler, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginAgainBtnHandler, this);

        this.backBtn = new egret.Bitmap();
        this.backBtn.texture = RES.getRes("closeBtn");
        this.backBtn.x = -130;
        this.backBtn.y = this.againBtn.y;
        this.backBtn.anchorX = .5;
        this.backBtn.anchorY = .5;
        this.backBtn.touchEnabled = true;
        this.addChild(this.backBtn);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndBackBtnHandler, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginBackBtnHandler, this);

        this.isInit = true;
    }

    private onTouchEndAgainBtnHandler(event:egret.TouchEvent):void
    {
        this.againBtn.scaleX = 1;
        this.againBtn.scaleY = 1;
        this.dispatchEvent(new egret.Event("playAgain"));
    }

    private onTouchBeginAgainBtnHandler(event:egret.TouchEvent):void
    {
        this.againBtn.scaleX = .9;
        this.againBtn.scaleY = .9;
    }

    private onTouchEndBackBtnHandler(event:egret.TouchEvent):void
    {
        this.backBtn.scaleX = 1;
        this.backBtn.scaleY = 1;
        this.dispatchEvent(new egret.Event("back"));
    }

    private onTouchBeginBackBtnHandler(event:egret.TouchEvent):void
    {
        this.backBtn.scaleX = .9;
        this.backBtn.scaleY = .9;
    }
}