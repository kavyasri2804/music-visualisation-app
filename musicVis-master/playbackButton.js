//displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = 20;
	this.y = 20;
	this.width = 50;
	this.height = 50;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.bgColor = '#222222'; 
    this.borderColor = '#FFD700'; 
    this.playColor = '#00FF00'; 
    this.pauseColor = '#FF0000'; 

	this.draw = function(){
		fill(this.bgColor);
        stroke(this.borderColor);
        strokeWeight(4);
        rect(this.x, this.y, this.width, this.height, 10); 

        
        fill(0, 100); 
        noStroke();
        rect(this.x + 5, this.y + 5, this.width, this.height, 10);

        // Draw play or pause icon
        if(this.playing){
            fill(this.pauseColor);
            noStroke();
            let barWidth = (this.width / 5);
            rect(this.x + (this.width / 4) - barWidth, this.y + (this.height / 5), barWidth, this.height * 0.6);
            rect(this.x + (this.width / 2) + barWidth, this.y + (this.height / 5), barWidth, this.height * 0.6);
        }
        else{	
            fill(this.playColor);
            noStroke();
            let inset = this.width / 6;
            triangle(this.x + inset, this.y + inset, this.x + this.width - inset, this.y + this.height / 2, this.x + inset, this.y + this.height - inset);
        }
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (sound.isPlaying()) {
    			sound.pause();
  			} else {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
			return false;
	};

}