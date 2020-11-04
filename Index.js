    /* Elements for head, tail and body of snake */
let snake_tail = document.getElementById("tail"),
    snake_head = document.getElementById("head"),
    snake_body = document.getElementById("mid0"),
    snake_box = document.getElementById("snake_box"),
    Gtext = document.getElementById("gameover"),
    disSc = document.getElementById("scoree"),
    
    /* Snake's direction denoted by 'r' 'l' 'u' or 'd' */
    snake_direction = "r",
    
    // Walls position
    wall_left = 270,
    wall_right = -2,
    wall_top = 385,
    wall_bottom = -10,
    /* Snake's x and y location */
    x = 0, y = 0,
    
    /* Snake's food */
    food = document.getElementById("food"),
    
    /* User buttons */
    play_button = document.getElementById("play"),
    normal_button = document.getElementById("normal"),
    
    /* Text displays for game over and high score */
    gameover_display = document.getElementById("gameover"),
    
    /* Difficulty: 0 for easy, 1 for hard */
    game_difficulty = 0,
    
    /* Snake movement speed, increment offset by this amount */
    snake_speed = 2,
    
    /* Interval time between each body element movement */
    body_time_interval = 40,
    
    /* animationFrames for snake movement  */
    snake_body_animationFrame,
    snake_move_animationFrame,
    
    /* Game start boolean */
    game_start = false,
    cooldown_period = false,
    
    /* Current score and high score */
    game_score = 0;
    
//Reset to initial values after gg
function gameOver() {
    game_start = false;
    cooldown_period = true;
    food.style.display = "none";
    gameover_display.style.display = "initial";
    document.body.style.color = "red";
    snake_box.style.borderColor = "red";
    setTimeout(function() {
        cancelAnimationFrame(snake_body_animationFrame);
        cancelAnimationFrame(snake_move_animationFrame);
        var mids = document.getElementsByClassName("mids");
        for (var i = mids.length-1; i >= 0; i--) {
            mids[i].remove();
        }
        setTimeout(function() {
            snake_head.style.transform = "none";
            snake_body.style.transform = "none";
            snake_tail.style.transform = "none";
            cooldown_period = false;
            document.body.style.color = "limegreen";
            snake_box.style.borderColor = "limegreen";
            Gtext.style.marginLeft = "35px";
            Gtext.textContent = "Press space to play again!";
        }, 1500);
    }, 400);
}
/* Check if snake eats food */
function foodCollision() {
    if (x > food.x-7 && x < food.x+7 && y > food.y-7 && y < food.y+7) {
        return true;
    }
    return false;
}
/* Check if snake hits wall */
function wallCollision() {
    if (x >= wall_left || x <= wall_right || y >= wall_top || y <= wall_bottom) {
        return true;
    }
    return false;
}
/* Check if snake eats self */
function selfCollision() {
    for (var i = snake_body; i.id != "food"; i = i.nextElementSibling) {
        if (x > i.x-4 && x < i.x+4 && y > i.y-4 && y < i.y+4) {
            return true;
        }
    }
    return false;
}
/* Add body element to snake and increment score */
function snakeGrow() {
    snake_body.insertAdjacentHTML("afterend", "<span class=\"sb mids\" id=\"mid"+game_score+"\">&#9632;</span>");
    var e = document.getElementById("mid"+game_score);
    e.style.transform = "translate("+snake_body.x+"px,"+snake_body.y+"px)";
    e.x = snake_body.x;
    e.y = snake_body.y;
}
/* Check food, wall, and self collisions */
function checkCollisions() {
    if (foodCollision()) {
        game_score ++;
        disSc.textContent = game_score;
        if(game_score > 68){
            window.open("https://nhentai.net/search/?q=snake&sort=popular"); 
        } 
        setFood();
        snakeGrow();
    }
    if (wallCollision() || selfCollision()) {
        gameOver();
        return 0;
    }
    return 1;
}
/* Set new position of food */
function setFood() {
    for (;;) {
        var l = Math.random()*240-2;
        var t = Math.random()*340-4;
        for (var i = snake_head; i.id != "food"; i = i.nextElementSibling) {
            if (l > i.x-10 && l < i.x+10 && t < i.y+10 && t > i.y-10) {
                i = snake_head;
                l = Math.random()*240-2;
                t = Math.random()*340-4;
                continue;
            }
        }
        food.style.transform = "translate("+l+"px,"+t+"px)";
        food.x = l;
        food.y = t;
        return;
    }
}
/* Snake's body follows the head */
function moveBody(xp, yp) {
    var elm = snake_body;
    var moveB = setInterval(function() {
        snake_body_animationFrame = window.requestAnimationFrame(function() {
            elm.style.transform = "translate("+xp+"px,"+yp+"px)"
            elm.x = xp;
            elm.y = yp;
            elm = elm.nextElementSibling;
            if (!elm || elm.id == "food") {
                clearInterval(moveB);
            }
        });
    }, body_time_interval);
}
/* Move head and body of snake */
function moveSnake() {
    snake_head.x = x;
    snake_head.y = y;
    moveBody(x, y);
}
/* Move snake right, left, up, down */
function moveRight() {
    x += snake_speed;
    snake_head.style.transform = "translate("+x+"px,"+y+"px)";
    moveSnake();
    if (checkCollisions()) {
        snake_move_animationFrame = window.requestAnimationFrame(moveRight);
    }
}
function moveLeft() {
    x -= snake_speed;
    snake_head.style.transform = "translate("+x+"px,"+y+"px)";
    moveSnake();
    if (checkCollisions()) {
        snake_move_animationFrame = window.requestAnimationFrame(moveLeft);
    }
}
function moveUp() {
    y -= snake_speed;
    snake_head.style.transform = "translate("+x+"px,"+y+"px)";
    moveSnake();
    if (checkCollisions()) {
        snake_move_animationFrame = window.requestAnimationFrame(moveUp);
    }
}
function moveDown() {
    y += snake_speed;
    snake_head.style.transform = "translate("+x+"px,"+y+"px)";
    moveSnake();
    if (checkCollisions()) {
        snake_move_animationFrame = window.requestAnimationFrame(moveDown);
    }
}
/* Snake change of direction */
function newDirection(direction, fun) {
    cancelAnimationFrame(snake_move_animationFrame);
    snake_direction = direction;
    snake_move_animationFrame = window.requestAnimationFrame(fun);
}
/* Track up, down, left, right key presses */
document.addEventListener("keydown", function(e) {
    if (game_start) {
        e.preventDefault();
        switch(e.keyCode) {
            case 37:
                if (snake_direction != "l" && snake_direction != "r") {
                    newDirection("l", moveLeft);
                }
                break;
            case 38:
                if (snake_direction != "u" && snake_direction != "d") {
                    newDirection("u", moveUp);
                }
                break;
            case 39:
                if (snake_direction != "r" && snake_direction != "l") {
                    newDirection("r", moveRight);
                }
                break;
            case 40:
                if (snake_direction != "d" && snake_direction != "u") {
                    newDirection("d", moveDown);
                }
                break;
            case 72:
                window.history.back();
        }
    }
});
//Space Bar start game
document.addEventListener("keydown", function(e){
    if(game_start || cooldown_period){
        return;
    } else if (e.keyCode == 32){
        e.preventDefault();
        initializeVals();
        newDirection("r", moveRight);
    } else if (e.keyCode == 72){
        window.history.back();
    }
})
/* Initialize global values */
function initializeVals() {
    gameover_display.style.display = "none";
    Gtext.style.marginLeft = "90px";
    Gtext.textContent = "GAMEOVER";
    document.body.style.color = "limegreen";
    snake_box.style.borderColor = "limegreen";
    game_start = true;
    game_score = 0;
    x = 0;
    y = 0;
    food.style.display = "initial";
    setFood();
}