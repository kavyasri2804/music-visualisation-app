function Fireworks()
{
    var fireworks = [];
    this.addFirework = function()
    {
        var f_colour = null;

        var r = random(0,255);
        var g = random(0,255);
        var b = random(0,255);
        console.log(r+ " "+ g + " "+ b);
        f_colour = color(r,g,b);
        var f_x = random(width*0.2, width*0.8);
        var f_y = random(height*0.2, height*0.8);
        var firework = new Firework(f_colour, f_x, f_y);
        fireworks.push(firework);
    }

    this.update = function()
    {
        for(var i=0; i<fireworks.length; i++)
            {
                fireworks[i].draw();
                if(fireworks[i].depleted)
                    {
                        fireworks.splice(i,1);
                    }
            }
    }
}