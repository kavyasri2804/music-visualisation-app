function FireworkEffect()
{
    this.name = "Firework";

    var fireworks;

    this.setup = function()
    {
        background(0);
        angleMode(DEGREES);
        frameRate(60);
        beatDetect = new BeatDetect();
        fireworks = new Fireworks();
    }
    this.setup();

    this.draw = function()
    {
        background(0);
        var spectrum = fourier.analyze();
        if(beatDetect.detectBeat(spectrum))
            {
                fireworks.addFirework();
            }
            fireworks.update();
    }
}