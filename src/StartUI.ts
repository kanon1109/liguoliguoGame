/**
 * 开始场景
 * @author Kanon
 */
class StartUI extends egret.Sprite
{
    private bg: egret.Bitmap;
    private flyRole: egret.Bitmap;
    private startTips: egret.Bitmap;
    private finger:egret.MovieClip;
    private roleMc:egret.MovieClip;
    private startBtn:egret.Bitmap;
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
        this.isInit = true;
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("startBg");
        this.addChild(this.bg);

        var texture = RES.getRes("standMotion");
        var json = RES.getRes("standMotionJson");
        var mcdf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json, texture);

        this.roleMc = new egret.MovieClip(mcdf.generateMovieClipData());
        this.roleMc.frameRate = 12;
        this.roleMc.anchorX = .5;
        this.roleMc.anchorY = .5;
        this.addChild(this.roleMc);
        this.roleMc.x = this.stage.stageWidth / 2;
        this.roleMc.y = 485;
        this.roleMc.play(-1);

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
        this.startBtn.y = this.roleMc.y + 220;
        this.addChild(this.startBtn);

        this.flyRole = new egret.Bitmap();
        this.flyRole.texture = RES.getRes("touchFlyRole");
        this.flyRole.anchorX = .5;
        this.flyRole.anchorY = .5;
        this.addChild(this.flyRole);

        var texture = RES.getRes("finger");
        var json = RES.getRes("fingerJson");
        var mcdf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json, texture);
        this.finger = new egret.MovieClip(mcdf.generateMovieClipData());
        this.finger.frameRate = 12;
        this.finger.anchorX = .5;
        this.finger.anchorY = .5;

        this.reset();
    }


    public reset():void
    {
        this.flyRole.x = this.stage.stageWidth / 2;
        this.flyRole.y = this.stage.stageHeight / 2;
        this.finger.x = 900;
        this.finger.y = 510;
        this.finger.gotoAndStop(1);
        this.roleMc.visible = true;
        this.flyRole.visible = false;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
    }


    private onTouchBeginHandler(event:egret.TouchEvent):void
    {
        this.startBtn.scaleX = .9;
        this.startBtn.scaleY = .9;
    }

    private onTouchHandler(event:egret.TouchEvent):void
    {
        this.startBtn.scaleX = 1;
        this.startBtn.scaleY = 1;
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
        this.addChild(this.finger);
        egret.Tween.get(this.finger).to({x:600}, 400, egret.Ease.cubicOut).call(this.fingerMotionComplete, this);
    }

    private fingerMotionComplete():void
    {
        this.finger.play(1);
        this.finger.addEventListener(egret.Event.ENTER_FRAME, this.fingerLoop, this);
    }

    private fingerLoop():void
    {
        if(this.finger.currentFrame == this.finger.totalFrames)
        {
            this.finger.removeEventListener(egret.Event.ENTER_FRAME, this.fingerLoop, this);
            this.roleMc.visible = false;
            this.flyRole.visible = true;
            egret.Tween.get(this.flyRole).to({x:-200, y:90}, 900, egret.Ease.cubicOut).call(this.flyMotionComplete, this);
        }
    }

    private flyMotionComplete():void
    {
        //开始游戏
        this.dispatchEvent(new egret.Event("StartGame"));
    }
}
