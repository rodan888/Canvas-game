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
		this.bodies = [new Player(this, gameSize)];
		tick();
	};

	Game.prototype = {
		update: function(){			
			for (var i = 0; i < this.bodies.length; i++){
				this.bodies[i].update();
				if (this.bodies[i].position.y < 0) {
					this.bodies.splice(i, 1);
				}
			}
		},
		draw: function(screen, gameSize){
			clearCanvas(screen,gameSize);
			for (var i = 0; i < this.bodies.length; i++){
				drawRect(screen,this.bodies[i]);
			}			
		},
		addBody: function(body){
			this.bodies.push(body);
		}
	};

	var Player = function(game, gameSize){
		this.game = game;
		this.bullets = 0;
		this.timer = 0;
		this.size = {width:16,height:16};
		this.position = {x: gameSize.x/2-this.size.width/2, y: gameSize.y/2-this.size.height/2};
		this.Keyboarder = new Keyboarder();
	};
	Player.prototype = {
		update: function(){			
				if (this.Keyboarder.isDown(this.Keyboarder.KEYS.LEFT)) {
					this.position.x -= 2;
				}else if(this.Keyboarder.isDown(this.Keyboarder.KEYS.RIGHT)) {
					this.position.x += 2;
				}else if(this.Keyboarder.isDown(this.Keyboarder.KEYS.UP)) {
					this.position.y -= 2;					
				}else if(this.Keyboarder.isDown(this.Keyboarder.KEYS.DOWN)) {
					this.position.y += 2;					
				}
				if(this.Keyboarder.isDown(this.Keyboarder.KEYS.SPASE)) {
					if (this.bullets < 2) {
						var bullet = new Bullet({x:this.position.x+this.size.width/2-3/2, y:this.position.y},
							{x:0, y:-6});
						this.game.addBody(bullet);		
						this.bullets++;
					}
				}
				this.timer++;
				if(this.timer % 12 == 0){
					this.bullets = 0;
				}			
		}
	};

	var Bullet = function(position, velocity){
		this.size = {width:3,height:3};
		this.position = position;
		this.velocity = velocity;
	};
	Bullet.prototype = {
		update: function(){
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
		}		 
	};

	var Keyboarder = function(){
		var keyState = {};
		this.KEYS = {
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40,
			SPASE: 32
		};	

		window.onkeydown = function(e){
			keyState[e.keyCode] = true;
		}
		window.onkeyup = function(e){
			keyState[e.keyCode] = false;
		}
		this.isDown = function(keyCode){
			return keyState[keyCode] === true;
		}
	};



	var drawRect    = function(screen, body){
				screen.fillRect(body.position.x,body.position.y,body.size.width,body.size.height);
			},
			clearCanvas = function(screen, gameSize) {
				screen.clearRect(0,0,gameSize.x,gameSize.y);
			};

	window.onload = function(){						
		new Game('');
	};

})();