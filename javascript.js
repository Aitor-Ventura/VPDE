const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const info = document.querySelector("p");

const GLOBALS = {
    charX: 0,
    charY: 0,
    click: { x: undefined, y: undefined },
    mouse: { x: undefined, y: undefined },
    mouseDown: { x: undefined, y: undefined },
    mouseUp: { x: undefined, y: undefined },
    distance: (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)), 
    angle: (a, b) => Math.atan2(b.y - a.y, b.x - a.x) 
};

const PROPS = [];

class Player 
{
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 30;
    }
    
    render() {
        this.x += GLOBALS.charX / 10;
        this.y += GLOBALS.charY / 10;

        let { x, y, radius } = this;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
}

const CHARS = [];
let player = new Player(50, 50);
CHARS.push(player);

function init() 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("click", (e) => { 
        GLOBALS.mouseUp.x = GLOBALS.mouseDown.x = GLOBALS.mouse.x = GLOBALS.click.x = e.pageX;
        GLOBALS.mouseUp.y = GLOBALS.mouseDown.y = GLOBALS.mouse.y = GLOBALS.click.y = e.pageY;
    });

    function tStart(e) 
    {
        GLOBALS.mouseUp.x = undefined;
        GLOBALS.mouseUp.y = undefined;
        GLOBALS.mouseDown.x = GLOBALS.mouse.x = e.pageX || e.touches[0]?.pageX;
        GLOBALS.mouseDown.y = GLOBALS.mouse.y = e.pageY || e.touches[0]?.pageY;
    }

    function tEnd(e) 
    {
        GLOBALS.mouseDown.x = GLOBALS.mouse.x = undefined;
        GLOBALS.mouseDown.y = GLOBALS.mouse.y = undefined;
    }

    function tMove(e) 
    {
        GLOBALS.mouse.x = e.pageX || e.touches[0]?.pageX;
        GLOBALS.mouse.y = e.pageY || e.touches[0]?.pageY;
    }

    window.addEventListener("touchstart", tStart);
    window.addEventListener("mousedown", tStart);
    window.addEventListener("touchend", tEnd);
    window.addEventListener("mouseup", tEnd);
    window.addEventListener("touchmove", tMove);
    window.addEventListener("mousemove", tMove);
    
    function toggleFullScreen()
    {
        if (!document.fullscreenElement) 
        {
            document.documentElement.requestFullscreen();
        } 
        else if (document.exitFullscreen) 
        {
            document.exitFullscreen();
        }
    }
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "f")
        {
            toggleFullScreen();    
        }
    }, false);
    
}

function renderBackground() {}

function renderProps() {}

function renderCharacters() 
{
    for (let i of CHARS) {
        i.render();
    }
}

class Joystick 
{
    constructor(x, y) 
    {
        this.x = x;
        this.y = y;
        this.distance = { x: 0, y: 0 };
        this.angle = 0;
    }
    
    render() 
    {
        info.innerText = `
        directionX: ${this.distance.x || 0}, 
        directionY: ${ this.distance.y || 0}, 
        angle: ${this.angle}(radians)
        `;

        let { x, y } = this;
        let { distance, angle } = GLOBALS;
        
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.arc(x, y, 70, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        
        if (GLOBALS.mouseUp.x) 
        {
            ctx.arc(x, y, 40, 0, 2 * Math.PI);
            this.distance.x = x - this.x;
            this.distance.y = y - this.y;
            GLOBALS.charX = x - this.x;
            GLOBALS.charY = y - this.y;
            this.angle = angle({ x: x, y: y }, this);
        } 
        else if (distance(GLOBALS.mouse, this) < 70 && distance(GLOBALS.mouseDown, this) < 70) 
        {
            ctx.arc(GLOBALS.mouse.x, GLOBALS.mouse.y, 40, 0, 2 * Math.PI);
            this.angle = angle(GLOBALS.mouse, this);
            this.distance.x = GLOBALS.mouse.x - this.x;
            this.distance.y = GLOBALS.mouse.y - this.y;
            GLOBALS.charX = GLOBALS.mouse.x - this.x;
            GLOBALS.charY = GLOBALS.mouse.y - this.y;
        } 
        else if (distance(GLOBALS.mouse, this) > 70 && distance(GLOBALS.mouseDown, this) < 70) 
        {
            let { x, y } = GLOBALS.mouse;
            let d = distance(GLOBALS.mouse, this) - 70, ok = false;
            while (ok === false) 
            {
                if (x < this.x) 
                {
                    x++;
                } 
                else 
                {
                    x--;
                }
                if (y < this.y) 
                {
                    y++;
                } 
                else 
                {
                    y--;
                }
                
                if (distance({ x: x, y: y }, this) < 70) 
                {
                    ok = true;
                }
            }
            
            ctx.arc(x, y, 40, 0, 2 * Math.PI);
            
            this.distance.x = x - this.x;
            this.distance.y = y - this.y;
            
            GLOBALS.charX = x - this.x;
            GLOBALS.charY = y - this.y;
            
            this.angle = angle({ x: x, y: y }, this);
        } 
        else 
        {
            ctx.arc(x, y, 40, 0, 2 * Math.PI);
            
            this.distance.x = x - this.x;
            this.distance.y = y - this.y;
            
            GLOBALS.charX = x - this.x;
            GLOBALS.charY = y - this.y;
            
            this.angle = angle({ x: x, y: y }, this);
        }

        ctx.stroke();
        ctx.fillStyle = "gray";
        ctx.globalAlpha = 0.7;
        ctx.fill();
    }
}

let stick = new Joystick(window.innerWidth / 2, window.innerHeight / 2);

function renderControls() 
{
    stick.render();
}

function startFrames() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground();
    renderProps();
    renderCharacters();
    renderControls();

    window.requestAnimationFrame(startFrames);
}

init(); 
startFrames(); 
