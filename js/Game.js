class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }

    async start() {
        if(gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }

        car1 = createSprite(100, 200);
        car1.addImage("car1", car1Img);
        car1.scale = 0.5;
        car2 = createSprite(300, 200);
        car2.addImage("car2", car2Img);
        car2.scale = 0.5;
        car3 = createSprite(500, 200);
        car3.addImage("car3", car3Img);
        car3.scale = 0.5;
        car4 = createSprite(700, 200);
        car4.addImage("car4", car4Img);
        car4.scale = 0.5;
        cars = [car1, car2, car3, car4];
    }

    play() {
        form.hide();

        Player.getPlayerInfo();

        if(allPlayers !==  undefined) {
            image(track, 0, -displayHeight*4, displayWidth - 25, displayHeight*5);
            var index = 0;

            var x = 50;
            var y;

            for(var plr in allPlayers) {
                index = index + 1;

                x = x+ 275;

                y = displayHeight - allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;

                if(index === player.index){
                    cars[index-1].shapeColor= "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }
        }
        
        if(keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance+=10;
            player.update();
        }

        if(player.distance > 3860) {
            gameState = 2;
        }

        drawSprites();
    }

    end(){
        console.log("Game Has Ended");
    }
}
