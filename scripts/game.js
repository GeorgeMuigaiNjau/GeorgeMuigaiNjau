const
    msgDId = 'msg',
    menuMessege = 'PRESS [ ] TO PLAY',
    paddleWidth = 15,
    LOG = console.log;

let
    isPaused = !true,
    leftSideScore = 0,
    rightSideScore = 0,
    mouseX = 0,
    mouseY = 0,
    n,
    then = 0,
    deltaTime = 1;

document.addEventListener('DOMContentLoaded', main);

async function main(/**@type {Event} */ event) {
    event.preventDefault();

    DISPLAY_MSG('Loading...');
    run();

    setTimeout(() => {
        DISPLAY_MSG(`/- | -\\`);
        configureGamePlay()
    }, 3000);
}

function ballSpeed() {
    return parseFloat(parseFloat(4.80 + Math.sin(Date.now())).toFixed(2));
}

function paddleSpeed() {
    return 20.0 * absolute((parseFloat(Math.sin(Date.now()))));
}

function togglePause() {
    isPaused = !isPaused;
    DISPLAY_MSG(isPaused ? menuMessege : '\\:)');
}

function configureGamePlay() {
    // window.addEventListener('blur', function (ev) {
    //     if (isPaused) return;

    //     isPaused = true;
    //     DISPLAY_MSG(menuMessege);
    // });
}

function toggleFullscreen(/**@type {CanvasRenderingContext2D} */ context) {
    if (window.document.fullscreenElement) {
        window.document.exitFullscreen();
    } else {
        context.canvas.requestFullscreen();
    }
}

function HANDLE_INPUT(/**@type {CanvasRenderingContext2D} */ context, player, player2) {
    document.body.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    document.onkeydown = function (event) {
        let key = event.key;

        if (key === ' ') togglePause();
        if (key.toLocaleLowerCase() === 'f') toggleFullscreen(context);

        if (isPaused) return;

        if (key.toLocaleLowerCase() === 's') {
            // don't go beyond the canvas bounderies
            if (player.y + player.height > (context.canvas.height)) return;
            player.y += paddleSpeed() + deltaTime;
        }

        if (key.toLocaleLowerCase() === 'w') {
            if (player.y < 0) return;
            player.y -= paddleSpeed() + deltaTime;
        }


        if (key === 'ArrowDown') {
            if (player2.y + player2.height > (context.canvas.height)) return;
            player2.y += paddleSpeed();
        }

        if (key === 'ArrowUp') {
            if (player2.y < 0) return;
            player2.y -= paddleSpeed();
        }

    }
}


function getLeftSideScoreString() {
    return `${leftSideScore}`.length < 2
        ? `0${leftSideScore}`
        : `${leftSideScore}`;
}

function getRightSideScoreString() {
    return `${rightSideScore}`.length < 2
        ? `0${rightSideScore}`
        : `${rightSideScore}`;
}

function run(/**@type {Event} */ event) {
    /**@type {HTMLCanvasElement} */
    const canvas = getElementById('field');

    canvas.width = document.body.clientWidth;
    canvas.height = window.screen.height;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const context = canvas.getContext('2d');
    const paddleHeight = canvasHeight * 0.15;

    const versionMsg = `Firey Firefighter`;
    const versionMsgDisp = new SpriteFont(
        context,
        versionMsg,
        new Vector2(
            (canvasWidth * 0.75) - (context.measureText(versionMsg).width),
            canvasHeight - (context.measureText(versionMsg).fontBoundingBoxAscent + 10)
        ),
        'rgba(0, 43, 235, 0.575)'
    );

    const pauseMsg = `PRESS [ ] TO PAUSE`;
    const pauseMsgDisp = new SpriteFont(
        context,
        pauseMsg,
        new Vector2(
            (context.measureText(versionMsg).width),
            canvasHeight - (context.measureText(versionMsg).fontBoundingBoxAscent + 10)
        ),
        'dimgrey'
        // '#bbbbbb4d'
    );

    const pausedMsg = 'PRESS [ ] TO PLAY';
    const msgDisp = new SpriteFont(
        context,
        pausedMsg,
        new Vector2(
            (canvasWidth / 2) - (context.measureText(pausedMsg).width),
            (canvasHeight / 2) - (context.measureText(pausedMsg).fontBoundingBoxAscent)
        ),
        'dimgrey'
    );

    const pausedMsg2 = 'PRESS `F` TO TOGGLE FULLSCREEN';
    const msgDisp2 = new SpriteFont(
        context,
        pausedMsg2,
        new Vector2(
            (canvasWidth / 2) - (context.measureText(pausedMsg2).width),
            (canvasHeight / 2) + (context.measureText(pausedMsg2).fontBoundingBoxAscent * 2)
        ),
        'dimgrey'
    );

    // '#bbbbbb4d'
    const ball = new Ellipse(context, 10, new Vector2(paddleWidth + 11, 10), 'black');

    const border = new Rect(
        context,
        paddleWidth,
        25,
        new Vector2(
            canvasWidth / 2 - (paddleWidth / 2),
            0
        ),
        '#fff',
        ''
    );

    const player1Paddle = new Rect(
        context,
        paddleWidth,
        paddleHeight,
        new Vector2(
            paddleWidth / 2,
            (canvasHeight / 2) - (paddleHeight / 2)
        ),
        '#5c5c5c90'
    );

    const player2Paddle = new Rect(
        context,
        paddleWidth,
        paddleHeight,
        new Vector2(
            canvasWidth - (paddleWidth + (paddleWidth / 2)),
            (canvasHeight / 2) - (paddleHeight / 2)
        ),
        'red',
        '',
        new Vector2(
            border.x + context.measureText('banana').width,
            paddleHeight / 2
        )
    );

    const leftScoreDisp = new SpriteFont(
        context,
        getLeftSideScoreString(),
        new Vector2(
            (canvasWidth / 2) - (context.measureText(getLeftSideScoreString()).width + (paddleWidth * 4)),
            20
        ),
        '#fff'
    );

    const rightSideScoreDisp = new SpriteFont(
        context,
        getRightSideScoreString(),
        new Vector2(
            (canvasWidth / 2) + (context.measureText(getRightSideScoreString()).width + (paddleWidth * 2.5)),
            20
        ),
        'black'
    )

    const gameObjects = [
        // ball,
        // pauseMsgDisp,
        // player1Paddle,
        // player2Paddle,
        // border,
        // leftScoreDisp,
        // rightSideScoreDisp
    ];

    HANDLE_INPUT(context, player1Paddle, player2Paddle);

    let ballSpeedX, ballSpeedY;
    ballSpeedX = ballSpeedY = ballSpeed();

    const HANDLE_BALL = function () {
        if (ball.x < 0) {
            ballSpeedX = -ballSpeedX;
            rightSideScore += 1;
            rightSideScoreDisp.currentText = getRightSideScoreString();
        }

        if (ball.x > canvas.width - (ball.width)) {
            ballSpeedX = -ballSpeedX;
            leftSideScore += 1;
            leftScoreDisp.currentText = getLeftSideScoreString();
        }

        if (ball.y < 0) {
            ballSpeedY = -ballSpeedY;
        }

        if (ball.y > canvas.height - (ball.height / 2)) {
            ballSpeedY = -ballSpeedY;
        }

        ball.x += ballSpeedX + (deltaTime);
        ball.y += ballSpeedY + (deltaTime);
    }

    const resetBallDirection = function () {
        const randomSeed = -1;//function () { return Math.random() > .5 ? 1 : -1 }

        ballSpeedX = ballSpeedX * randomSeed;
        ballSpeedY = ballSpeedY * randomSeed;
    }

    const resetBallColor = function (/**@type {GameEntity} */ playerPaddle) {
        ball.fillStyle = playerPaddle.fillStyle;
        let t = setTimeout(() => {
            ball.fillStyle = 'black';
            clearTimeout(t);
        }, 1200);
    }

    if (context) {
        // configureGamePlay();
        function R(now) {
            n = now / 6000;
            deltaTime = n - then;
            then = n;

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            // context.fillStyle = 'black';
            // context.fillRect(0, 0, canvasWidth, canvasHeight);

            versionMsgDisp.draw();

            if (isPaused) {
                context.globalAlpha = 1.0;
                context.fillStyle = 'green';
                // context.fillRect(0, 0, canvasWidth, canvasHeight);
                // context.save();

                context.globalAlpha = Math.min(0.9, 0.50 * now / 600);
                msgDisp.draw();
                context.save();
                msgDisp2.draw();
                context.restore();
            }

            for (let i = 0; i < gameObjects.length; i++) {
                context.beginPath();

                gameObjects[i].draw();
                context.closePath();
            }

            if (!isPaused) {
                HANDLE_BALL();
                if (ball.isCollidingWith(player1Paddle)) {
                    ballSpeedY *= Math.random() > 0.5 ? 1 : -1;
                    resetBallDirection();
                    // resetBallColor(player1Paddle);
                }

                if (ball.isCollidingWith(player2Paddle)) {
                    ballSpeedY *= Math.random() > 0.5 ? 1 : -1;
                    resetBallDirection();
                    // resetBallColor(player2Paddle);
                }
            }
            requestAnimationFrame(R);
        }
        requestAnimationFrame(R);

    } else {
        canvas.remove();
        document.body.style.height = '100%';
        document.body.style.display = 'flex';
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        document.body.style.fontSize = '32px';
        document.body.style.flexDirection = 'column';
        document.body.style.textAlign = 'center';
        document.body.style.alignContent = 'center';
        document.body.style.justifyContent = 'center';
        document.body.innerText = ': ( \n your browser doesn\'t support 2d';
    }
}

/**
 * The base class of all game objects
 */
class GameEntity {
    constructor(
        /**@type {CanvasRenderingContext2D} */ context,
        width = 0.0,
        height = 0.0,
        position = new Vector2(x = 0.0, y = 0.0),
        fillStyle = 'grey',
        name = '',
        /**@type {Vector2} */
        namePosition
    ) {
        this.width = width;
        this.height = height;

        /**@type {Vector2} */
        this.position = position;
        this.fillStyle = fillStyle;
        /** @type {CanvasRenderingContext2D} */
        this.context = context;
        this.name = name;
        /**@type {Vector2} */
        this.namePosition = namePosition;
    }

    get fieldName() {
        return this.name;
    }

    set x(value = 0.0) {
        this.position.X = parseFloat(parseFloat(value).toFixed(3));
    }

    set y(value = 0.0) {
        this.position.Y = parseFloat(parseFloat(value).toFixed(3));
    }

    get x() {
        return this.position.X;
    }

    get y() {
        return this.position.Y;
    }

    draw(deltaTime) {
        if (this.fieldName) {
            this.context.font = '18px sans';
            this.context.letterSpacing = '3px';
            this.context.fillStyle = ''
            this.context.fillText(
                this.fieldName,
                this.namePosition ? this.namePosition.X : this.x + ((this.width / 2) + 1),
                this.namePosition ? this.namePosition.Y : this.y + this.height - 5
            );
        }
        this.context.fillStyle = this.fillStyle;
    }

    /**@type {boolean} */
    isCollidingWith(/**@type {GameEntity}*/ other) {
        let collidingX, collidingY;

        collidingX = (
            this.x > other.x && (this.x - (other.x + other.width) <= 0)
            ||
            this.x < other.x && (other.x - (this.x + this.width) <= 0)
        );

        collidingY = (
            this.y > other.y && (this.y - (other.y + other.height) <= 0)
            ||
            this.y < other.y && (other.y - (this.y + this.height) <= 0)
        );

        return (collidingX && collidingY);
    }
}

class Rect extends GameEntity {
    constructor(
        /**@type {CanvasRenderingContext2D} */ context,
        width = 0.0,
        height = 0.0,
        position = new Vector2(x = 0.0, y = 0.0),
        fillStyle = 'grey',
        name = '',
        /**@type {Vector2} */ namePosition
    ) {
        super(context, width, height, fillStyle, name, namePosition);
        this.context = context;
        this.width = width;
        this.height = height;
        this.position = position;
        this.fillStyle = fillStyle;
        this.name = name;
        this.namePosition = namePosition
    }

    fromRect(/**@type {Rect} */ rect, fillStyle = 'grey', name, namePosition) {
        return new Rect(
            rect.context,
            rect.width,
            rect.height,
            rect.position,
            fillStyle || rect.fillStyle,
            name,
            namePosition
        );
    }

    draw() {
        this.context.beginPath()
        super.draw();
        this.context.rect(this.position.X, this.position.Y, this.width, this.height);
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.closePath();
    }
}

class Ellipse extends GameEntity {
    constructor(
        /**@type {CanvasRenderingContext2D} */ context,
        radius,
        position = new Vector2(x = 0.0, y = 0.0),
        fillStyle = 'grey',
        name = '',
        /**@type {Vector2} */ namePosition
    ) {
        super(context, radius, radius, position, fillStyle, name, namePosition);
        this.context = context;
        this.height = this.width = radius;
        this.position = position;
        this.fillStyle = fillStyle;
        this.name = name;
        /**@type {Vector2} */
        this.namePosition = namePosition;
    }

    fromEllipse(/**@type {Ellipse} */ ellipse, fillStyle = 'grey', name = '', namePosition) {
        return new Ellipse(
            ellipse.context,
            ellipse.width,
            ellipse.height,
            fillStyle || ellipse.fillStyle,
            name,
            namePosition
        );
    }

    get radius() {
        return this.width;
    }

    draw() {
        super.draw();
        this.context.strokeStyle = this.fillStyle;
        this.context.arc(
            this.position.X,
            this.position.Y,
            this.radius,
            Math.PI * 2,
            0
        );
        this.context.stroke()
        this.context.closePath()
    }
}

class SpriteFont extends GameEntity {
    constructor(
        /**@type {CanvasRenderingContext2D} */ context,
        text = '',
        position = new Vector2(x = 0.0, y = 0.0),
        fillStyle = 'grey',
    ) {
        super(context, context.measureText(text).width, context.measureText(text).actualBoundingBoxDescent, position, fillStyle);
        this.context = context;
        this.text = text;
        this.width = context.measureText(text).width
        this.height = context.measureText(text).actualBoundingBoxAscent
        this.position = position;
        this.fillStyle = fillStyle;
    }

    get currentText() {
        return this.text;
    }

    set currentText(newText) {
        this.text = newText;
    }

    draw(deltaTime) {
        super.draw();
        this.context.font = '24px Space Grotesk';
        this.context.fontKerning = 'auto';
        this.context.lineCap = 'square';
        this.context.strokeStyle = this.context.createLinearGradient(0, 0, this.position.X, this.position.Y);
        this.context.fillText(this.currentText, this.position.X, this.position.Y);
        this.context.strokeText(this.currentText, this.position.X, this.position.Y);
    }
}

class Vector2 {
    constructor(x = 0.0, y = 0.0) {
        /** @type {number} */
        this.X = x;
        /** @type {number} */
        this.Y = y;
    }

    set x(/** @type {number} */value) {
        this.X = parseFloat(parseFloat(value).toFixed(1))
    }

    set x(/** @type {number} */ value) {
        this.Y = parseFloat(parseFloat(value).toFixed(1))
    }

    minus(/**@type {Vector2} */ other) {
        return `(x = ${this.X - other.X}, y = ${this.Y - other.Y})`
    }

    toString() {
        return `(x = ${this.X}, y = ${this.Y})`
    }
}

// ---------------------------------- UTILS

/**@type {number} */
function absolute(/**@type {number} */ number) {
    if (number === 0) return number;

    let sign = Math.sign(number);

    return sign > 0 ? number : (-number);
}

// display msg
function DISPLAY_MSG(msg) {
    // setElementText(msgDId, msg)
}

function getElementById(id = "") {
    if (id) {
        return document.getElementById(id);
    }

    return null;
}

function setElementText(id = "", newText = "") {
    const el = getElementById(id);
    // if (el) {
    //     el.innerText = newText;
    // }
}