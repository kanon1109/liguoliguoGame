/**
 * Created by tangben on 2015/6/12.
 */
/**
 *
 * 失败界面
 * @author Kanon
 */
class FailPanel extends egret.Sprite
{
    private bg:egret.Bitmap;
    private againBtn:egret.Bitmap;
    private backBtn:egret.Bitmap;
    //是否初始化过
    private isInit:boolean = false;
    //米文字
    private materWord:Word;
    private short:egret.Bitmap;
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

        this.short = new egret.Bitmap();
        this.short.anchorX = .5;
        this.short.anchorY = .5;
        this.short.x = this.bg.x + 15;
        this.short.y = this.bg.y - 15;
        this.short.texture = RES.getRes("short");
        this.addChild(this.short);

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

        this.materWord = new Word();
        this.materWord.create(0, "g", 1);
        this.materWord.x = this.stage.stageWidth - this.materWord.width;
        this.addChild(this.materWord);

        this.materWord.anchorX = .5;
        this.materWord.anchorY = .5;

        this.materWord.x = this.bg.x;
        this.materWord.y = this.bg.y + 120;

        this.isInit = true;
    }

    //设置最终的米
    public setFinalMeter(mater:number):void
    {
        if(this.materWord)
           this.materWord.create(mater, "g", 1);
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