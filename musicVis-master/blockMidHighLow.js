var rotateThresh;
var progThresh;
var seedThresh;

var boxColour = '#0013FF';
var lineColour = '#FF00FB';

this.unSelectVisual = function()
{
    console.log("de select");
    gui.hide();
}

this.selectVisual = function()
{
    console.log("select");
    gui.show();
}

this.isMouseInGUI = function()
{
    var inGUI = false;
    var gui_x = gui.prototype._panel.style.left;
    var gui_y = gui.prototype._panel.style.top;
    var gui_height = gui.prototype._panel.clientHeight;
    var gui_width = gui.prototype._panel.clientWidth;

    gui_x = parseInt(gui_x,10);
    gui_y = parseInt(gui_y,10);
    gui_height = parseInt(gui_height,10);
    gui_width = parseInt(gui_width,10);

    if(mouseX > gui_x && mouseX < gui_x + gui_width)
        {
            if(mouseY > gui_y && mouseY < gui_y + gui_height)
                {
                    inGUI = true;
                }
        }
    return inGUI;
}

function BlockMidHighLow()
{
    this.name = "Block Mid High Low"
    var rot = 0;
    var noiseStep = 0.01;
    var prog = 0;
    var circles = [];

    var gui;

    this.setup = function()
    {
        rotateThresh = 165;
        progThresh = 120;
        seedThresh = 100;

        gui = createGui('Audio Visualiser');
        gui.setPosition(width-200, 0);

        sliderRange(0.001,1,0.001);
        gui.addGlobals('noiseStep');

        sliderRange(0,255,1);
        gui.addGlobals('rotateThresh');
        gui.addGlobals('progThresh');
        gui.addGlobals('seedThresh');

        gui.addGlobals('boxColour');
        gui.addGlobals('lineColour');

        for (var i = 0; i < 5; i++) {
            circles.push({
                x: random(width),
                y: random(height),
                diameter: random(20, 50),
                speedX: random(-2, 2),
                speedY: random(-2, 2),
                color: color(random(255), random(255), random(255))
            });
        }

    }

    this.setup();

    this.onResize = function()
    {
        gui.setPosition(width-200,0);
    }
    
    this.onResize();

    this.draw = function()
    {
        fourier.analyze();
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");

        rotatingBlocks(b);
        noiseLine(b,t);
        dancingCircles(b);
    }

    function rotatingBlocks(energy)
    {
        if(energy < rotateThresh)
            {
                rot += 0.2;
            }
        
        var r = map(energy,0,255,20,100);

        push();
        rectMode(CENTER);
        translate(width/2, height/2);
        rotate(rot);
        fill(boxColour);

        var incr = width/(10-1);

        for(var i = 0; i<10; i++)
            {
                rect(i*incr-width/2,0,r,r);
            }
        
        pop();
    }

    function noiseLine(energy1, energy2)
    {
        push();
        translate(width/2, height/2);

        beginShape();
        noFill();
        stroke(lineColour);
        strokeWeight(3);

        for(var i=0; i<100; i++)
            {
                var x = map(noise(i* noiseStep + prog),0,1,-250,250);
                var y =map(noise(i* noiseStep + prog + 1000),0,1,-250,250);
                vertex(x,y);
            }
        
        endShape();

        if(energy1 > progThresh)
        {
            prog += 0.05;
        }

        if(energy2 > seedThresh)
        {
            noiseSeed();
        }

        pop();
    }

    function dancingCircles(energy) {
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];

            // Move circles based on energy levels
            circle.x += circle.speedX * map(energy, 0, 255, 0.5, 2);
            circle.y += circle.speedY * map(energy, 0, 255, 0.5, 2);

            // Wrap around edges of canvas
            if (circle.x < 0) circle.x = width;
            if (circle.x > width) circle.x = 0;
            if (circle.y < 0) circle.y = height;
            if (circle.y > height) circle.y = 0;

            // Draw circles
            fill(circle.color);
            noStroke();
            ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
        }
    }
}
