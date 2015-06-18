/**
 * Created by kanon on 2015/5/20.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.posAry = new Array(); // 任意类型数组
        //存放敌人的数��?
        this.enemyAry = new Array();
        //云或者参照物的列��?
        this.cloudAry = new Array();
        //敌人纹理数组
        this.enemyTextureAry = new Array();
        //云朵纹理数组
        this.cloudTextureAry = new Array();
        //浮动速度
        this.floatSpeed = 1;
        //��?后的距离
        this.finalMater = 100;
        //云朵的�?�度加成
        this.cloudSpeedScale = 1;
        //点击次数
        this.clickNum = 0;
        //�Ƿ���ʼ����
        this.isInit = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.onAddToStage = function (event) {
        if (!this.isInit) {
            this.initData();
            this.initTexture();
            this.createBg();
            this.createGround();
            this.createRole();
            this.createTips();
            this.createTxt();
            this.createBox();
            this.createUI();
            this.isInit = true;
        }
        this.startGame();
    };
    //��?始游��?
    __egretProto__.startGame = function () {
        this.posIndex = 1;
        this.roleIndex = 1;
        this.enemyPosIndex = 0;
        this.enemyIndex = 0;
        this.cloudIndex = 0;
        this.totalDelay = 3;
        this.totalMater = 3000;
        this.cloudDelay = 1.5;
        this.isShowTips = false;
        this.enemyTotalIndex = 60 * this.totalDelay;
        this.cloudTotalIndex = 60 * this.cloudDelay;
        this.cloudSpeedScale = 1;
        this.clickNum = 0;
        this.speed = 1.5;
        this.roleMc1.x = this.posAry[this.posIndex];
        this.roleMc1.y = -this.roleMc1.height;
        this.roleMc1.play(-1);
        this.roleMc2.x = this.roleMc1.x;
        this.roleMc2.y = this.roleMc1.y;
        this.roleMc3.x = this.roleMc1.x;
        this.roleMc3.y = this.roleMc1.y;
        this.roleMc1.visible = true;
        this.roleMc2.visible = false;
        this.roleMc3.visible = false;
        this.roleMc4.visible = false;
        this.role.visible = false;
        this.floatSpeed = 0;
        this.rolePosY = 548;
        this.roleSpt.x = this.posAry[this.posIndex];
        this.roleSpt.y = this.rolePosY;
        this.isWin = false;
        this.roleMc1.play(-1);
        this.roleMc2.play(-1);
        this.roleMc3.play(-1);
        this.box1.visible = false;
        this.box2.visible = false;
        this.box1.touchEnabled = false;
        this.tips1.visible = false;
        this.tips2.visible = false;
        this.tips3.visible = false;
        this.ground.y = this.stage.stageHeight;
        this.againBtn.visible = false;
        this.removeAllEnemy();
        this.removeAllCloud();
        //停止出�?�和��?
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.startFallMotion();
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    //初始化数��?
    __egretProto__.initData = function () {
        this.posIndex = 1;
        this.posAry.push(110);
        this.posAry.push(320);
        this.posAry.push(530);
    };
    __egretProto__.createBg = function () {
        var bg = new egret.Bitmap();
        var texture = RES.getRes("bgImage");
        bg.texture = texture;
        this.addChild(bg);
        this.backLayer = new egret.Sprite();
        this.addChild(this.backLayer);
    };
    __egretProto__.createUI = function () {
        this.againBtn = new egret.Bitmap();
        this.againBtn.texture = RES.getRes("againBtn");
        this.againBtn.x = 560;
        this.againBtn.y = 1050;
        this.againBtn.anchorX = .5;
        this.againBtn.anchorY = .5;
        this.againBtn.touchEnabled = true;
        this.addChild(this.againBtn);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndAgainBtnHandler, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginAgainBtnHandler, this);
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
    __egretProto__.createRole = function () {
        var texture = RES.getRes("FallMotion1");
        var json = RES.getRes("FallMotion1Json");
        var mcdf = new egret.MovieClipDataFactory(json, texture);
        this.roleMc1 = new egret.MovieClip(mcdf.generateMovieClipData());
        this.roleMc1.frameRate = 24;
        this.roleMc1.anchorX = .5;
        this.roleMc1.anchorY = .5;
        this.addChild(this.roleMc1);
        texture = RES.getRes("FallMotion2");
        json = RES.getRes("FallMotion2Json");
        mcdf = new egret.MovieClipDataFactory(json, texture);
        this.roleMc2 = new egret.MovieClip(mcdf.generateMovieClipData());
        this.roleMc2.frameRate = 24;
        this.roleMc2.anchorX = .5;
        this.roleMc2.anchorY = .5;
        this.addChild(this.roleMc2);
        texture = RES.getRes("FallMotion4");
        json = RES.getRes("FallMotion4Json");
        mcdf = new egret.MovieClipDataFactory(json, texture);
        this.roleMc3 = new egret.MovieClip(mcdf.generateMovieClipData());
        this.roleMc3.frameRate = 24;
        this.roleMc3.anchorX = .5;
        this.roleMc3.anchorY = .5;
        this.addChild(this.roleMc3);
        texture = RES.getRes("FallMotion3");
        json = RES.getRes("FallMotion3Json");
        mcdf = new egret.MovieClipDataFactory(json, texture);
        this.roleMc4 = new egret.MovieClip(mcdf.generateMovieClipData());
        this.roleMc4.frameRate = 20;
        this.roleMc4.anchorX = .5;
        this.roleMc4.anchorY = .5;
        this.addChild(this.roleMc4);
        this.role = new egret.Bitmap();
        this.role.texture = RES.getRes("role");
        this.role.anchorX = .5;
        this.role.anchorY = .5;
        this.addChild(this.role);
        this.frontLayer = new egret.Sprite();
        this.addChild(this.frontLayer);
        this.roleSpt = new egret.Bitmap();
        this.roleSpt.texture = RES.getRes("hitRole");
        this.roleSpt.anchorX = .5;
        this.roleSpt.anchorY = .5;
        this.roleSpt.visible = false;
        this.addChild(this.roleSpt);
    };
    __egretProto__.createTips = function () {
        var texture = RES.getRes("startTips");
        this.tips1 = new egret.Bitmap();
        this.tips1.texture = texture;
        this.tips1.anchorX = .5;
        this.tips1.anchorY = .5;
        this.addChild(this.tips1);
        this.tips1.x = this.posAry[0];
        this.tips1.y = this.stage.stageHeight - this.tips1.height / 2 - 30;
        TweenMax.to(this.tips1, .3, { y: this.tips1.y + 15, repeat: -1, yoyo: true });
        this.tips2 = new egret.Bitmap();
        this.tips2.texture = texture;
        this.tips2.anchorX = .5;
        this.tips2.anchorY = .5;
        this.addChild(this.tips2);
        this.tips2.x = this.posAry[1];
        this.tips2.y = this.tips1.y;
        TweenMax.to(this.tips2, .3, { y: this.tips1.y + 15, repeat: -1, yoyo: true });
        this.tips3 = new egret.Bitmap();
        this.tips3.texture = texture;
        this.tips3.anchorX = .5;
        this.tips3.anchorY = .5;
        this.addChild(this.tips3);
        this.tips3.x = this.posAry[2];
        this.tips3.y = this.tips1.y;
        TweenMax.to(this.tips3, .3, { y: this.tips1.y + 15, repeat: -1, yoyo: true });
    };
    __egretProto__.createTxt = function () {
        this.materTxt = new egret.TextField();
        this.materTxt.text = "Egret";
        this.materTxt.textColor = 0xff0000;
        //Egret没有TextFormat
        this.materTxt.size = 40;
        this.materTxt.fontFamily = "Arial";
        this.materTxt.lineSpacing = 3;
        this.addChild(this.materTxt);
    };
    __egretProto__.createBox = function () {
        this.box1 = new egret.Bitmap();
        var texture = RES.getRes("box1");
        this.box1.texture = texture;
        this.box1.anchorX = .5;
        this.box1.anchorY = .5;
        this.box1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBox1Handler, this);
        this.addChild(this.box1);
        this.box2 = new egret.Bitmap();
        var texture = RES.getRes("box2");
        this.box2.texture = texture;
        this.box2.anchorX = .5;
        this.box2.anchorY = .5;
        this.addChild(this.box2);
    };
    __egretProto__.createGround = function () {
        this.ground = new egret.Bitmap();
        var texture = RES.getRes("ground");
        this.ground.texture = texture;
        this.addChild(this.ground);
    };
    __egretProto__.onTouchHandler = function (event) {
        if (event.localX > this.roleMc1.x)
            this.posIndex++; //��?��?
        else
            this.posIndex--; //��?��?
        if (this.posIndex > this.posAry.length - 1)
            this.posIndex = this.posAry.length - 1;
        else if (this.posIndex < 0)
            this.posIndex = 0;
        var posX = this.posAry[this.posIndex];
        this.roleMc1.x = posX;
        this.roleSpt.x = posX;
        this.roleMc2.x = posX;
        this.roleMc3.x = posX;
        this.roleMc4.x = posX;
        this.roleIndex++;
        if (this.roleIndex > 3)
            this.roleIndex = 1;
        this.roleMc2.visible = false;
        this.roleMc1.visible = false;
        this.roleMc3.visible = false;
        this["roleMc" + this.roleIndex].visible = true;
    };
    //下落动画
    __egretProto__.startFallMotion = function () {
        egret.Tween.removeTweens(this.roleMc1);
        egret.Tween.removeTweens(this.roleMc2);
        egret.Tween.removeTweens(this.roleMc3);
        this.fallTween = egret.Tween.get(this.roleMc1).to({ y: this.rolePosY }, 900, egret.Ease.cubicOut).call(this.startFallMotionComplete, this);
        egret.Tween.get(this.roleMc2).to({ y: this.rolePosY }, 900, egret.Ease.cubicOut);
        egret.Tween.get(this.roleMc3).to({ y: this.rolePosY }, 900, egret.Ease.cubicOut);
    };
    __egretProto__.startFallMotionComplete = function () {
        egret.Tween.removeTweens(this.roleMc1);
        egret.Tween.removeTweens(this.roleMc2);
        egret.Tween.removeTweens(this.roleMc3);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        //漂浮
        this.floatSpeed = .6;
    };
    //初始化敌人的纹理
    __egretProto__.initTexture = function () {
        for (var i = 1; i <= 4; ++i) {
            var texture = RES.getRes("m" + i);
            this.enemyTextureAry.push(texture);
        }
        for (var i = 1; i <= 11; ++i) {
            var texture = RES.getRes("c" + i);
            this.cloudTextureAry.push(texture);
        }
    };
    //创建敌人
    __egretProto__.createEnemy = function (posIndex) {
        var enemy = new Enemy();
        var type = Math.round(Math.random() * 3) + 1;
        enemy.create(type);
        //enemy.texture = this.enemyTextureAry[type - 1];
        enemy.anchorX = .5;
        enemy.anchorY = .5;
        enemy.x = this.posAry[posIndex];
        enemy.y = this.stage.stageHeight;
        this.addChild(enemy);
        this.enemyAry.push(enemy);
    };
    //创建云朵
    __egretProto__.createCloud = function () {
        var count = Math.round(Math.random() * 5) + 5;
        for (var i = 0; i < count; ++i) {
            var cloud = new Cloud();
            var type = Math.round(Math.random() * 5) + 1;
            cloud.texture = this.cloudTextureAry[type - 1];
            cloud.x = Math.random() * this.stage.stageWidth + 1;
            cloud.y = this.stage.stageHeight + Math.random() * 40;
            var index = Math.round(Math.random() * 1);
            if (index < 1) {
                this.backLayer.addChild(cloud);
                cloud.alpha = Math.random() * .5 + .5;
                cloud.scaleX = Math.random() * .5 + .5;
                cloud.scaleY = cloud.scaleX;
                cloud.speed = Math.random() * 10 + 10;
            }
            else {
                this.frontLayer.addChild(cloud);
                cloud.speed = Math.random() * 20 + 25;
            }
            this.cloudAry.push(cloud);
        }
    };
    //更新敌人状�??
    __egretProto__.updateEnemy = function () {
        for (var i = this.enemyAry.length - 1; i >= 0; --i) {
            var enemy = this.enemyAry[i];
            enemy.update();
            if (enemy.y < -enemy.height) {
                this.enemyAry.splice(i, 1);
                this.removeChild(enemy);
            }
        }
    };
    __egretProto__.updateCloud = function () {
        for (var i = this.cloudAry.length - 1; i >= 0; --i) {
            var cloud = this.cloudAry[i];
            cloud.speedScale = this.cloudSpeedScale;
            cloud.update();
            if (cloud.y < -cloud.height) {
                this.cloudAry.splice(i, 1);
                cloud.parent.removeChild(cloud);
            }
        }
    };
    //碰撞��?��?
    __egretProto__.checkHitTest = function () {
        var gapW = 10;
        for (var i = this.enemyAry.length - 1; i >= 0; --i) {
            var enemy = this.enemyAry[i];
            if (this.roleSpt.hitTestPoint(enemy.x - enemy.width / 2 + gapW, enemy.y - enemy.height / 2))
                return true;
            if (this.roleSpt.hitTestPoint(enemy.x + enemy.width / 2 - gapW, enemy.y - enemy.height / 2))
                return true;
            if (this.roleSpt.hitTestPoint(enemy.x + enemy.width / 2 + gapW, enemy.y + enemy.height / 2))
                return true;
            if (this.roleSpt.hitTestPoint(enemy.x - enemy.width / 2 - gapW, enemy.y + enemy.height / 2))
                return true;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y - this.roleSpt.height / 2))
                return true;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y - this.roleSpt.height / 2))
                return true;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y + this.roleSpt.height / 2))
                return true;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y + this.roleSpt.height / 2))
                return true;
        }
        return false;
    };
    //更新计时器索��?
    __egretProto__.updateTimerIndex = function () {
        if (this.isWin)
            return;
        this.cloudIndex++;
        this.enemyIndex++;
        if (this.cloudIndex >= this.cloudTotalIndex) {
            this.createCloud();
            this.cloudIndex = 0;
        }
        if (!this.isShowTips && this.enemyIndex >= this.enemyTotalIndex - 80) {
            this.enemyPosIndex = Math.round(Math.random() * 2);
            this["tips" + (this.enemyPosIndex + 1)].visible = true;
            this.isShowTips = true;
        }
        if (this.enemyIndex >= this.enemyTotalIndex) {
            console.log("this.enemyPosIndex" + this.enemyPosIndex);
            this["tips" + (this.enemyPosIndex + 1)].visible = false;
            this.createEnemy(this.enemyPosIndex);
            this.enemyIndex = 0;
            this.isShowTips = false;
        }
    };
    //游戏主循��?
    __egretProto__.loop = function (event) {
        this.totalMater -= this.speed;
        if (this.totalMater < 0)
            this.totalMater = 0;
        this.materTxt.text = Math.round(this.totalMater).toString() + "M";
        this.updateTimerIndex();
        this.floatMove();
        this.updateEnemy();
        this.updateCloud();
        this.checkMater();
        if (this.checkHitTest()) {
            this.fail();
        }
    };
    //根据距离判断减少出�?�间��?
    __egretProto__.checkMater = function () {
        if (this.totalMater > this.finalMater && this.totalMater % 1000 == 0) {
            this.totalDelay -= 1;
            //加快出�?��?�度
            this.enemyTotalIndex = 60 * this.totalDelay;
        }
        if (this.totalMater <= this.finalMater + 100) {
            //停止出�?�和出云
            this.tips1.visible = false;
            this.tips2.visible = false;
            this.tips3.visible = false;
            this.isWin = true;
        }
        if (this.totalMater <= 0) {
            this.floatSpeed = 0;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
            egret.Tween.get(this.roleMc1).to({ y: this.rolePosY + 300 }, 400).call(this.fallComplete, this);
            egret.Tween.get(this.roleMc2).to({ y: this.rolePosY + 300 }, 400);
            egret.Tween.get(this.roleMc3).to({ y: this.rolePosY + 300 }, 400);
            egret.Tween.get(this.ground).to({ y: this.rolePosY + 300 }, 400);
        }
    };
    __egretProto__.fallComplete = function () {
        //TODO 弹出胜利
        this.roleMc1.visible = false;
        this.roleMc2.visible = false;
        this.roleMc3.visible = false;
        this.role.x = this.roleMc1.x;
        this.role.y = this.roleMc1.y;
        this.roleMc4.x = this.roleMc1.x;
        this.roleMc4.y = this.roleMc1.y;
        this.roleMc4.visible = true;
        this.roleMc4.gotoAndPlay(1);
        this.roleMc4.addEventListener(egret.Event.ENTER_FRAME, this.roleMc4Loop, this);
        //�����������ɺ� ��ʾ role
    };
    __egretProto__.roleMc4Loop = function () {
        if (this.roleMc4.currentFrame == this.roleMc4.totalFrames) {
            this.roleMc4.removeEventListener(egret.Event.ENTER_FRAME, this.roleMc4Loop, this);
            this.roleMc4.stop();
            //this.roleMc3.visible = false;
            //this.role.visible = true;
            this.box1.x = this.stage.stageWidth / 2;
            this.box1.y = this.role.y;
            this.box1.alpha = 0;
            this.box1.visible = true;
            egret.Tween.get(this.box1).to({ alpha: 1, y: this.stage.stageHeight / 2 }, 1000).call(this.box1MoveComplete, this);
        }
    };
    __egretProto__.box1MoveComplete = function () {
        this.box1.touchEnabled = true;
        egret.Tween.removeTweens(this.box1);
        this.againBtn.visible = true;
        this.box2.x = this.box1.x;
        this.box2.y = this.box1.y;
    };
    __egretProto__.onTouchBox1Handler = function () {
        this.box1.visible = false;
        this.box2.visible = true;
    };
    //删除敌人
    __egretProto__.removeAllEnemy = function () {
        for (var i = this.enemyAry.length - 1; i >= 0; --i) {
            var enemy = this.enemyAry[i];
            this.removeChild(enemy);
            this.enemyAry.splice(i, 1);
        }
    };
    //删除��?有云��?
    __egretProto__.removeAllCloud = function () {
        for (var i = this.cloudAry.length - 1; i >= 0; --i) {
            var cloud = this.cloudAry[i];
            cloud.parent.removeChild(cloud);
            this.cloudAry.splice(i, 1);
        }
    };
    //失败
    __egretProto__.fail = function () {
        this.roleMc1.stop();
        this.roleMc2.stop();
        this.roleMc3.stop();
        this.roleMc4.stop();
        this.floatSpeed = 0;
        this.removeAllEnemy();
        this.removeAllCloud();
        //停止出�?�和��?
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.dispatchEvent(new egret.Event("fail"));
    };
    //上下漂浮移动
    __egretProto__.floatMove = function () {
        this.roleMc1.y += this.floatSpeed;
        if (this.roleMc1.y > this.rolePosY + 20 || this.roleMc1.y < this.rolePosY - 20)
            this.floatSpeed *= -1;
        this.roleMc2.y = this.roleMc1.y;
        this.roleMc3.y = this.roleMc1.y;
    };
    return GameScene;
})(egret.Sprite);
GameScene.prototype.__class__ = "GameScene";
