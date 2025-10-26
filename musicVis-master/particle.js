function Particle(x,y,colour,angle,speed)
{
    var x = x;
    var y = y;
    var angle = angle;
    this.speed = speed;
    this.colour = colour;
    this.age = 255;

    this.draw = function()
    {
        this.update();
        var r = red(this.colour)-(255-this.age);
        var g = green(this.colour)-(255-this.age);
        var b = blue(this.colour)-(255-this.age);

        var c = color(r,g,b);
        fill(c);
        this.age -= 1;
        ellipse(x,y,10,10);
    }

    this.update = function()
    {
        x += cos(angle)*speed+noise(frameCount)*10;
        y += sin(angle)*speed+noise(frameCount)*10;
    }
}