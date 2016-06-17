;(function(){
	var Game = function(canvasId){
		var	self     = this,
				canvas   = document.getElementById('screen'),
				screen   = canvas.getContext('2d'),
				gameSize = {
					x: canvas.width,
					y: canvas.height
				},
				tick     = function(){
					self.update();
					self.draw(screen, gameSize);
					requestAnimationFrame(tick);
				};
		tick();
		this.bodies = [];
	};

	Game.prototype = {
		update: function(){
			// console.log('update');
		},
		draw: function(screen, gameSize){
			screen.fillRect(150,150, 32,32);
		}
	};

	var Player = function(game, gameSize){
		this.game = game;
		this.size = {width:16,height:16};
		this.position = {x: gameSize.x/2-this.size.width/2, y: gameSize.y/2-this.size.height/2};
	};
	Player.prototype = {
		update: function(){

		}
	};


	window.onload = function(){
		new Game('');
	};

})();