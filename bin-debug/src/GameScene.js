/**
 * Created by kanon on 2015/5/20.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.posAry = new Array(); // 浠绘剰绫诲�?�鏁扮粍
        //敌人数组
        this.enemyAry = new Array();
        //云朵数组
        this.cloudAry = new Array();
        //敌人纹理数组
        this.enemyTextureAry = new Array();
        //云朵纹理数组
        this.cloudTextureAry = new Array();
        //浮动速度
        this.floatSpeed = 1;
        //不再出现怪的距离
        this.finalMater = 500;
        //云朵速率
        this.cloudSpeedScale = 1;
        //点击次数
        this.clickNum = 0;
        //是否初始化过
        this.isInit = false;
        //旋转速度
        this.rotationSpeed = 20;
        //旋转持续时间
        this.rotationDelay = 1;
        //猫爪持续时间
        this.catEffectDelay = 1;
        //显示敌人的间隔
        this.showEnemyDelay = .8;
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
            //this.createUI();
            this.isInit = true;
        }
        this.startGame();
    };
    //开始游戏
    __egretProto__.startGame = function () {
        this.posIndex = 1;
        this.roleIndex = 1;
        this.enemyIndex = 0;
        this.cloudIndex = 0;
        this.rotationIndex = 0;
        this.catEffectIndex = 0;
        this.totalDelay = 2;
        this.rotationDelay = 1;
        this.totalMater = 10000;
        this.showEnemyIndex = 0;
        //this.totalMater = 1000;
        this.curMater = this.totalMater;
        this.cloudDelay = .5;
        this.isShowTips = false;
        this.floatSpeed = 0;
        this.rolePosY = 548;
        this.roleStatus = GameScene.NONE;
        this.inDoubleMode = false;
        this.isEnemyTipsShow = false;
        this.isWin = false;
        this.cloudSpeedScale = 1;
        this.clickNum = 0;
        this.speed = 4;
        this.enemyTotalIndex = 60 * this.totalDelay;
        this.cloudTotalIndex = 60 * this.cloudDelay;
        this.rotationTotalIndex = 60 * this.rotationDelay;
        this.catEffectTotalIndex = 60 * this.catEffectDelay;
        this.showEnemyTotalIndex = 60 * this.showEnemyDelay;
        this.roleMc1.x = this.posAry[this.posIndex];
        this.roleMc1.y = -this.roleMc1.height;
        this.roleMc1.play(-1);
        this.roleMc2.x = this.roleMc1.x;
        this.roleMc2.y = this.roleMc1.y;
        this.roleMc3.x = this.roleMc1.x;
        this.roleMc3.y = this.roleMc1.y;
        this.hitCat.x = this.roleMc1.x;
        this.hitCat.y = this.rolePosY;
        this.hitBat.x = this.roleMc1.x;
        this.hitBat.y = this.rolePosY;
        this.hitPeg.x = this.roleMc1.x;
        this.hitPeg.y = this.rolePosY;
        this.roleMc1.visible = true;
        this.roleMc2.visible = false;
        this.roleMc3.visible = false;
        this.roleMc4.visible = false;
        this.role.visible = false;
        this.hitCat.visible = false;
        this.hitBat.visible = false;
        this.hitPeg.visible = false;
        this.roleSpt.x = this.posAry[this.posIndex];
        this.roleSpt.y = this.rolePosY;
        this.roleMc1.play(-1);
        this.roleMc2.play(-1);
        this.roleMc3.play(-1);
        this.box1.visible = false;
        this.box2.visible = false;
        this.box1.touchEnabled = false;
        this.rewardPanel.visible = false;
        this.tips1.visible = false;
        this.tips2.visible = false;
        this.tips3.visible = false;
        this.ground.y = this.stage.stageHeight;
        //this.againBtn.visible = false;
        this.catEffect.visible = false;
        this.removeAllEnemy();
        this.removeAllCloud();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.startFallMotion();
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    //初始化数据
    __egretProto__.initData = function () {
        this.posIndex = 1;
        this.posAry = [130, 320, 530];
    };
    __egretProto__.createBg = function () {
        var bg = new egret.Bitmap();
        var texture = RES.getRes("bgImage");
        bg.texture = texture;
        this.addChild(bg);
        this.backLayer = new egret.Sprite();
        this.addChild(this.backLayer);
    };
    /*private createUI():void
    {
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
    }*/
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
        this.hitBat = new egret.Bitmap();
        this.hitBat.texture = RES.getRes("hitBat");
        this.hitBat.anchorX = .5;
        this.hitBat.anchorY = .5;
        this.addChild(this.hitBat);
        texture = RES.getRes("hitCat");
        json = RES.getRes("hitCatJson");
        mcdf = new egret.MovieClipDataFactory(json, texture);
        this.hitCat = new egret.MovieClip(mcdf.generateMovieClipData());
        this.hitCat.frameRate = 20;
        this.hitCat.anchorX = .5;
        this.hitCat.anchorY = .5;
        this.addChild(this.hitCat);
        texture = RES.getRes("hitPeg");
        json = RES.getRes("hitPegJson");
        mcdf = new egret.MovieClipDataFactory(json, texture);
        this.hitPeg = new egret.MovieClip(mcdf.generateMovieClipData());
        this.hitPeg.frameRate = 20;
        this.hitPeg.anchorX = .5;
        this.hitPeg.anchorY = .5;
        this.addChild(this.hitPeg);
        texture = RES.getRes("catEffect");
        json = RES.getRes("catEffectJson");
        mcdf = new egret.MovieClipDataFactory(json, texture);
        this.catEffect = new egret.MovieClip(mcdf.generateMovieClipData());
        this.catEffect.frameRate = 20;
        this.catEffect.anchorX = .5;
        this.catEffect.anchorY = .5;
        this.addChild(this.catEffect);
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
        this.enemyTips = new egret.Bitmap();
        this.enemyTips.texture = RES.getRes("enemyTips");
        this.enemyTips.anchorX = .5;
        this.enemyTips.anchorY = .5;
        this.enemyTips.x = this.stage.stageWidth / 2;
        this.enemyTips.y = this.stage.stageHeight / 2 - 220;
        this.enemyTips.alpha = 0;
        this.addChild(this.enemyTips);
    };
    __egretProto__.createTxt = function () {
        /*this.materTxt = new egret.TextField();
        this.materTxt.text = "Egret";
        this.materTxt.textColor = 0xff0000;

        //Egret娌℃湁TextFormat
        this.materTxt.size = 40;
        this.materTxt.fontFamily = "Arial";
        this.materTxt.lineSpacing = 3;
        this.addChild(this.materTxt);*/
        this.materWord = new Word();
        this.materWord.create(0, "z", 1);
        this.materWord.createTail("zm");
        this.materWord.x = this.stage.stageWidth - this.materWord.width;
        this.addChild(this.materWord);
    };
    __egretProto__.createBox = function () {
        this.rewardPanel = new RewardPanel();
        this.rewardPanel.addEventListener("playAgain", this.playAgainHandler, this);
        this.rewardPanel.addEventListener("back", this.backHandler, this);
        this.addChild(this.rewardPanel);
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
    __egretProto__.playAgainHandler = function (event) {
        this.startGame();
    };
    __egretProto__.backHandler = function (event) {
        this.dispatchEvent(new egret.Event("back"));
    };
    __egretProto__.createGround = function () {
        this.ground = new egret.Bitmap();
        var texture = RES.getRes("ground");
        this.ground.texture = texture;
        this.addChild(this.ground);
    };
    __egretProto__.onTouchHandler = function (event) {
        if (this.isWin)
            return;
        if (this.roleStatus == GameScene.ROTATION)
            return;
        if (this.roleStatus == GameScene.CRAZY)
            return;
        if (this.roleStatus == GameScene.FLY)
            return;
        if (event.localX > this.roleMc1.x)
            this.posIndex++; //向右
        else
            this.posIndex--; //向左
        if (this.posIndex > this.posAry.length - 1)
            this.posIndex = this.posAry.length - 1;
        else if (this.posIndex < 0)
            this.posIndex = 0;
        var posX = this.posAry[this.posIndex];
        /*this.roleMc1.x = posX;
        this.roleSpt.x = posX;
        this.roleMc2.x = posX;
        this.roleMc3.x = posX;
        this.roleMc4.x = posX;
        this.hitBat.x = posX;
        this.hitCat.x = posX;
        this.hitPeg.x = posX;*/
        var delay = .2;
        TweenMax.to(this.roleMc1, delay, { x: posX });
        TweenMax.to(this.roleSpt, delay, { x: posX });
        TweenMax.to(this.roleMc2, delay, { x: posX });
        TweenMax.to(this.roleMc3, delay, { x: posX });
        TweenMax.to(this.roleMc4, delay, { x: posX });
        TweenMax.to(this.hitBat, delay, { x: posX });
        TweenMax.to(this.hitCat, delay, { x: posX });
        TweenMax.to(this.hitPeg, delay, { x: posX });
        /*this.roleIndex++;
        if(this.roleIndex > 3) this.roleIndex = 1;
        this.roleMc2.visible = false;
        this.roleMc1.visible = false;
        this.roleMc3.visible = false;

        this["roleMc" + this.roleIndex].visible = true;*/
    };
    //开始下落
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
        this.floatSpeed = 1;
    };
    //初始化纹理
    __egretProto__.initTexture = function () {
        for (var i = 1; i <= 3; ++i) {
            var texture = RES.getRes("m" + i);
            this.enemyTextureAry.push(texture);
        }
        for (var i = 1; i <= 3; ++i) {
            var texture = RES.getRes("c" + i);
            this.cloudTextureAry.push(texture);
        }
    };
    //创建敌人
    __egretProto__.createEnemy = function (posIndex) {
        var enemy = new Enemy();
        var type = Math.round(Math.random() * 2) + 1;
        enemy.create(type);
        enemy.anchorX = .5;
        enemy.anchorY = .5;
        enemy.x = this.posAry[posIndex];
        enemy.y = this.stage.stageHeight;
        this.addChild(enemy);
        this.enemyAry.push(enemy);
        return enemy;
    };
    //创建云
    __egretProto__.createCloud = function () {
        var count = Math.round(Math.random() * 5) + 1;
        for (var i = 0; i < count; ++i) {
            var cloud = new Cloud();
            var type = Math.round(Math.random() * 2) + 1;
            cloud.texture = this.cloudTextureAry[type - 1];
            cloud.x = Math.random() * this.stage.stageWidth + 1;
            cloud.y = this.stage.stageHeight + Math.random() * 100;
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
    //敌人循环
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
    //碰撞检测
    __egretProto__.checkHitTest = function () {
        var gapW = 10;
        for (var i = this.enemyAry.length - 1; i >= 0; --i) {
            var enemy = this.enemyAry[i];
            if (this.roleSpt.hitTestPoint(enemy.x - enemy.width / 2 + gapW, enemy.y - enemy.height / 2))
                return enemy.type;
            if (this.roleSpt.hitTestPoint(enemy.x + enemy.width / 2 - gapW, enemy.y - enemy.height / 2))
                return enemy.type;
            if (this.roleSpt.hitTestPoint(enemy.x + enemy.width / 2 + gapW, enemy.y + enemy.height / 2))
                return enemy.type;
            if (this.roleSpt.hitTestPoint(enemy.x - enemy.width / 2 - gapW, enemy.y + enemy.height / 2))
                return enemy.type;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y - this.roleSpt.height / 2))
                return enemy.type;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y - this.roleSpt.height / 2))
                return enemy.type;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y + this.roleSpt.height / 2))
                return enemy.type;
            if (enemy.hitTestPoint(this.roleSpt.x, this.roleSpt.y + this.roleSpt.height / 2))
                return enemy.type;
        }
        return 0;
    };
    //创建云和敌人的计数器
    __egretProto__.updateTimerIndex = function () {
        if (this.isWin)
            return;
        this.cloudIndex++;
        this.enemyIndex++;
        if (this.cloudIndex >= this.cloudTotalIndex) {
            this.createCloud();
            this.cloudIndex = 0;
        }
        if (!this.isShowTips && this.enemyIndex >= this.enemyTotalIndex - 30) {
            if (this.inDoubleMode) {
                //双重障碍模式
                this.posIndexAry = this.doubleModeRandom(this.posIndex + 1);
            }
            else {
                this.posIndexAry = [this.posIndex + 1];
            }
            var count = this.posIndexAry.length;
            for (var i = 1; i <= count; ++i) {
                var index = this.posIndexAry[i - 1];
                console.log("tips" + index);
                this["tips" + index].visible = true;
            }
            this.isShowTips = true;
        }
        if (this.enemyIndex >= this.enemyTotalIndex) {
            console.log(this.posIndexAry);
            var count = this.posIndexAry.length;
            for (var i = 1; i <= count; ++i) {
                var index = this.posIndexAry[i - 1];
                this["tips" + index].visible = false;
                var enemy = this.createEnemy(index - 1);
                if (count > 1)
                    enemy.y = this.stage.stageHeight + Math.round(Math.random() * 400);
            }
            this.enemyIndex = 0;
            this.isShowTips = false;
            if (this.roleStatus == GameScene.NONE)
                this.roleStatus = GameScene.AFRAID;
        }
    };
    //主循环
    __egretProto__.loop = function (event) {
        this.curMater -= this.speed;
        if (this.curMater < 0)
            this.curMater = 0;
        //this.materTxt.text = Math.round(this.curMater).toString() + "M";
        this.materWord.create(this.curMater, "z", 1);
        this.materWord.x = this.stage.stageWidth - this.materWord.width;
        this.updateTimerIndex();
        this.floatMove();
        this.updateEnemy();
        this.updateCloud();
        this.checkMater();
        this.checkHitStatus();
        this.checkStatus();
    };
    //判断碰撞状态
    __egretProto__.checkHitStatus = function () {
        if (this.roleStatus == GameScene.NONE || this.roleStatus == GameScene.AFRAID) {
            var type = this.checkHitTest();
            switch (type) {
                case 1:
                    //bat
                    this.roleStatus = GameScene.ROTATION;
                    break;
                case 2:
                    //cat
                    this.roleStatus = GameScene.CRAZY;
                    break;
                case 3:
                    //peg
                    this.roleStatus = GameScene.FLY;
                    break;
            }
        }
    };
    //根据状态执行动作
    __egretProto__.checkStatus = function () {
        if (this.roleStatus == GameScene.ROTATION) {
            this.hitCat.visible = false;
            this.catEffect.gotoAndStop(1);
            this.catEffect.visible = false;
            this.hitPeg.visible = false;
            this.roleMc1.visible = false;
            this.roleMc3.visible = false;
            this.hitBat.visible = true;
            this.hitBat.rotation += this.rotationSpeed;
            this.rotationIndex++;
            if (this.rotationIndex >= this.rotationTotalIndex) {
                this.rotationIndex = 0;
                this.roleStatus = GameScene.NONE;
            }
        }
        else if (this.roleStatus == GameScene.CRAZY) {
            this.hitBat.rotation = 0;
            this.hitBat.visible = false;
            this.hitPeg.visible = false;
            this.roleMc1.visible = false;
            this.roleMc3.visible = false;
            this.hitCat.visible = true;
            this.catEffect.visible = true;
            this.catEffect.x = this.hitCat.x;
            this.catEffect.y = this.hitCat.y;
            this.catEffect.play(-1);
            this.catEffectIndex++;
            if (this.catEffectIndex >= this.catEffectTotalIndex) {
                this.catEffectIndex = 0;
                this.roleStatus = GameScene.NONE;
            }
        }
        else if (this.roleStatus == GameScene.FLY) {
            this.hitBat.rotation = 0;
            this.hitBat.visible = false;
            this.hitCat.visible = false;
            this.catEffect.gotoAndStop(1);
            this.catEffect.visible = false;
            this.roleMc1.visible = false;
            this.roleMc3.visible = false;
            this.hitPeg.visible = true;
            egret.Tween.get(this.hitPeg).to({ y: -this.hitPeg.height }, 600).call(this.flyComplete, this);
            ;
        }
        else if (this.roleStatus == GameScene.AFRAID) {
            this.roleMc3.visible = true;
            this.roleMc1.visible = false;
            this.showEnemyIndex++;
            if (this.showEnemyIndex >= this.showEnemyTotalIndex) {
                this.showEnemyIndex = 0;
                this.roleStatus = GameScene.NONE;
            }
        }
        else if (this.roleStatus == GameScene.NONE) {
            this.hitBat.rotation = 0;
            this.hitBat.visible = false;
            this.hitCat.visible = false;
            this.catEffect.gotoAndStop(1);
            this.catEffect.visible = false;
            this.hitPeg.visible = false;
            this.roleMc1.visible = true;
            this.roleMc3.visible = false;
        }
    };
    //飞行结束
    __egretProto__.flyComplete = function () {
        this.fail();
    };
    //判断距离
    __egretProto__.checkMater = function () {
        /*if (this.curMater > this.finalMater &&
            this.curMater % 1000 == 0)
        {
            this.totalDelay -= 1;
            this.enemyTotalIndex = 60 * this.totalDelay;
        }*/
        if (this.curMater <= this.totalMater / 2 + 600 && this.curMater >= this.finalMater + 100) {
            if (!this.isEnemyTipsShow) {
                this.isEnemyTipsShow = true;
                TweenMax.to(this.enemyTips, .5, { alpha: 1, repeat: 5, yoyo: true });
            }
        }
        if (this.curMater <= this.totalMater / 2 && this.curMater >= this.finalMater + 100) {
            this.inDoubleMode = true;
            this.totalDelay = 1.5;
            this.enemyTotalIndex = 60 * this.totalDelay;
        }
        if (this.curMater <= this.finalMater + 100) {
            this.tips1.visible = false;
            this.tips2.visible = false;
            this.tips3.visible = false;
            this.isWin = true;
            egret.Tween.get(this.roleMc1).to({ x: this.posAry[1] }, 200);
            egret.Tween.get(this.roleMc2).to({ x: this.posAry[1] }, 200);
            egret.Tween.get(this.roleMc3).to({ x: this.posAry[1] }, 200);
        }
        if (this.curMater <= 0) {
            this.floatSpeed = 0;
            var posY = this.rolePosY + 330;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
            egret.Tween.get(this.roleMc1).to({ y: posY }, 400).call(this.fallComplete, this);
            egret.Tween.get(this.roleMc2).to({ y: posY }, 400);
            egret.Tween.get(this.roleMc3).to({ y: posY }, 400);
            egret.Tween.get(this.ground).to({ y: posY }, 400);
        }
    };
    __egretProto__.fallComplete = function () {
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
        //动画播放完成 显示 role
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
            this.rewardPanel.alpha = 0;
            this.rewardPanel.x = this.box1.x;
            this.rewardPanel.y = this.box1.y - 70;
            this.rewardPanel.visible = true;
            egret.Tween.get(this.box1).to({ alpha: 1, y: this.stage.stageHeight / 2 - 130 }, 1000).call(this.box1MoveComplete, this);
            egret.Tween.get(this.rewardPanel).to({ alpha: 1, y: this.stage.stageHeight / 2 - 200 }, 1000);
        }
    };
    __egretProto__.box1MoveComplete = function () {
        TweenMax.to(this.box1, .3, { y: this.box1.y - 15, repeat: -1, yoyo: true });
        this.box1.touchEnabled = true;
        egret.Tween.removeTweens(this.box1);
        //this.againBtn.visible = true;
        this.box2.x = this.box1.x;
        this.box2.y = this.box1.y;
    };
    __egretProto__.onTouchBox1Handler = function () {
        TweenMax.killTweensOf(this.box1);
        this.box1.visible = false;
        this.box2.visible = true;
    };
    //删除所有敌人
    __egretProto__.removeAllEnemy = function () {
        for (var i = this.enemyAry.length - 1; i >= 0; --i) {
            var enemy = this.enemyAry[i];
            this.removeChild(enemy);
            this.enemyAry.splice(i, 1);
        }
    };
    //删除所有云
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
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.dispatchEvent(new egret.Event("fail"));
    };
    //上下浮动
    __egretProto__.floatMove = function () {
        this.roleMc1.y += this.floatSpeed;
        if (this.roleMc1.y > this.rolePosY + 30 || this.roleMc1.y < this.rolePosY - 30)
            this.floatSpeed *= -1;
        this.roleMc2.y = this.roleMc1.y;
        this.roleMc3.y = this.roleMc1.y;
    };
    //随机双重障碍
    __egretProto__.doubleModeRandom = function (posIndex) {
        var ary = [1, 2, 3];
        var count = ary.length;
        var tmpAry = [];
        for (var i = 0; i < count; ++i) {
            if (ary[i] != posIndex) {
                tmpAry.push(ary[i]);
            }
        }
        var index = Math.round(Math.random() * (tmpAry.length - 1));
        tmpAry.splice(index, 1);
        return [posIndex, tmpAry[0]];
    };
    //普通状态
    GameScene.NONE = "none";
    //旋转状态
    GameScene.ROTATION = "rotation";
    //被猫爪状态
    GameScene.CRAZY = "crazy";
    //飞出状态
    GameScene.FLY = "fly";
    //恐惧状态
    GameScene.AFRAID = "afraid";
    return GameScene;
})(egret.Sprite);
GameScene.prototype.__class__ = "GameScene";
