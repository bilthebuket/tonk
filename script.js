var userPosition = [0, 200]; // (x,y)
var terminate = false;
var userVelocity = [0, 0]; //(x,y) if in 2d then y always has a negative acceleation (gravity)
var d2 = false;
var d3 = false;
var w = false;
var a = false;
var s = false;
var d = false;
var click = false;
var enemyCount;
var refreshCount = 0;
var x;
var y;
var projectileCount = 100;
var rotationAngle = 1.57;

var obj1_onTopOf_obj2 = false;
var obj2_onTopOf_obj1 = false;
var obj1_onLeftOf_obj2 = false;
var obj1_onRightOf_obj2 = false;

var holding = false;
var holdCount = 0;

var barrierCount;

var endless = false;

document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById("start").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 200 + "px";
    document.getElementById("settings").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 200 + "px";
    document.getElementById("lvl1").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 200 + "px";
    document.getElementById("lvl2").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 200 + "px";
    document.getElementById("lvl3").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 200 + "px";
    document.getElementById("lvl4").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 200 + "px";
    document.getElementById("lvl5").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 200 + "px";
    document.getElementById("lvl6").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 440 + "px";
    document.getElementById("lvl7").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 440 + "px";
    document.getElementById("lvl8").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 440 + "px";
    document.getElementById("endless").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 440 + "px";
    document.getElementById("back").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 440 + "px";
    document.getElementById("endOfLevelBox").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 550 + "px";
    document.getElementById("lives2").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 700 - (parseInt(window.getComputedStyle(document.getElementById("lives2")).width) / 2) + "px";
    document.getElementById("round").style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) + 700 - (parseInt(window.getComputedStyle(document.getElementById("round")).width) / 2) + "px";
});

function toMenu()
{
    document.getElementById("start").style.display = "block";
    document.getElementById("settings").style.display = "block";
    document.getElementById("lvl1").style.display = "none";
    document.getElementById("lvl2").style.display = "none";
    document.getElementById("lvl3").style.display = "none";
    document.getElementById("lvl4").style.display = "none";
    document.getElementById("lvl5").style.display = "none";
    document.getElementById("lvl6").style.display = "none";
    document.getElementById("lvl7").style.display = "none";
    document.getElementById("lvl8").style.display = "none";
    document.getElementById("endless").style.display = "none";
    document.getElementById("back").style.display = "none";
    document.getElementById("endOfLevelBox").style.display = "none";
    document.getElementById("container").style.backgroundImage = "url('menuImage.png')";
    document.getElementById("lives2").style.display = "none";
    document.getElementById("round").style.display = "none";
    document.getElementById("header").style.display = "block";
}

function showLevelSelector()
{
    document.getElementById("start").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("lvl1").style.display = "block";
    document.getElementById("lvl2").style.display = "block";
    document.getElementById("lvl3").style.display = "block";
    document.getElementById("lvl4").style.display = "block";
    document.getElementById("lvl5").style.display = "block";
    document.getElementById("lvl6").style.display = "block";
    document.getElementById("lvl7").style.display = "block";
    document.getElementById("lvl8").style.display = "block";
    document.getElementById("endless").style.display = "block";
    document.getElementById("back").style.display = "block";
    document.getElementById("endOfLevelBox").style.display = "none";
    document.getElementById("container").style.backgroundImage = "url('menuImage.png')";
    document.getElementById("lives2").style.display = "none";
    document.getElementById("round").style.display = "none";
    for (var i = -1; i >= barrierCount; i = i - 1)
    {
        if (JSON.stringify(document.getElementById(i)) != "null")
        {
            document.getElementById(i).remove();
        }
    }
    for (var i = 0; i < enemyCount; i++)
    {
        if (JSON.stringify(document.getElementById(i)) != "null")
        {
            document.getElementById(i).remove();
        }
    }
    for (var i = 100; i < projectileCount; i++)
    {
        if (JSON.stringify(document.getElementById(i)) != "null")
        {
            document.getElementById(i).remove();
        }
    }
    document.getElementById("user").style.display = "none";
}

function startGame(level)
{
    if (level != 'endless')
    {
        endless = false;
        userPosition = [0, 200];
        refreshCount = 0;
        projectileCount = 100;
        rotationAngle = 1.57;
        document.getElementById("kills").innerHTML = "0";
        document.getElementById("shotsFired").innerHTML = "0";
        document.getElementById("lives").innerHTML = "5";
        document.getElementById("lives2").innerHTML = "Lives: 5";
        terminate = false;
        document.getElementById("user").style.display = "block";
        document.getElementById("container").style.backgroundImage = "url('battlefield.png')";
        document.addEventListener('mousemove', event => obj.getCursorPosition(event));
        document.addEventListener('mousedown', event => obj.getCursorPosition(event));
        enemyCount = level * 2;
        barrierCount = level * -2;
        document.getElementById("header").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("start").style.display = "none";
        document.getElementById("lvl1").style.display = "none";
        document.getElementById("lvl2").style.display = "none";
        document.getElementById("lvl3").style.display = "none";
        document.getElementById("lvl4").style.display = "none";
        document.getElementById("lvl5").style.display = "none";
        document.getElementById("lvl6").style.display = "none";
        document.getElementById("lvl7").style.display = "none";
        document.getElementById("lvl8").style.display = "none";
        document.getElementById("endless").style.display = "none";
        document.getElementById("back").style.display = "none";
        document.getElementById("endOfLevelBox").style.display = "none";
        document.getElementById("lives2").style.display = "block";
        document.getElementById("round").style.display = "block";
        document.getElementById("round").innerHTML = "Level " + level;
        enter3d();
        for (var i = -1; i >= barrierCount; i = i - 1)
        {
            createBarrier(i);
        }
        for (var i = 0; i < enemyCount; i++)
        {
            createEnemy(i);
        }
        loadGame();
    }
    else
    {
        endless = true;
        userPosition = [0, 200];
        refreshCount = 0;
        projectileCount = 100;
        rotationAngle = 1.57;
        document.getElementById("kills").innerHTML = "0";
        document.getElementById("shotsFired").innerHTML = "0";
        document.getElementById("lives").innerHTML = "5";
        document.getElementById("lives2").innerHTML = "Lives: 5";
        terminate = false;
        document.getElementById("user").style.display = "block";
        document.getElementById("container").style.backgroundImage = "url('battlefield.png')";
        document.addEventListener('mousemove', event => obj.getCursorPosition(event));
        document.addEventListener('mousedown', event => obj.getCursorPosition(event));
        document.getElementById("header").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("start").style.display = "none";
        document.getElementById("lvl1").style.display = "none";
        document.getElementById("lvl2").style.display = "none";
        document.getElementById("lvl3").style.display = "none";
        document.getElementById("lvl4").style.display = "none";
        document.getElementById("lvl5").style.display = "none";
        document.getElementById("lvl6").style.display = "none";
        document.getElementById("lvl7").style.display = "none";
        document.getElementById("lvl8").style.display = "none";
        document.getElementById("endless").style.display = "none";
        document.getElementById("back").style.display = "none";
        document.getElementById("endOfLevelBox").style.display = "none";
        document.getElementById("lives2").style.display = "block";
        document.getElementById("round").style.display = "block";
        enemyCount = 0;
        barrierCount = 0;
        enter3d();
        executeEndless();
    }
}

async function executeEndless()
{
    var totalEnemysSpawned = 0;
    while (terminate == false)
    {
        enemyCount = enemyCount + 2;
        document.getElementById("round").innerHTML = "Round " + (enemyCount / 2);
        if (barrierCount >= -10)
        {
            barrierCount = barrierCount - 2;
        }
        else
        {
            barrierCount = 10;
        }
        for (var i = -1; i >= barrierCount; i = i - 1)
        {
            createBarrier(i);
        }
        for (var i = 0; i < enemyCount; i++)
        {
            createEnemy(i);
            totalEnemysSpawned++;
        }
        if (enemyCount == 2)
        {
            loadGame();
        }
        while (parseInt(document.getElementById("kills").innerHTML) != totalEnemysSpawned)
        {
            await sleep(10);
        }

        await sleep(1000);

        for (var i = -1; i >= barrierCount; i = i - 1)
        {
            document.getElementById(i).remove();
        }
    }
}

function updatePositions()
{
    if (d2 == true)
    {
        if (w)
        {
            userVelocity[1] = 5;
        }
        if (a)
        {
            userVelocity[0] = -5;
        }
        if (s)
        {
            userVelocity[1] = userVelocity[1] - 3;
        }
        if (d)
        {
            userVelocity[0] = 5;
        }

        if (userVelocity[0] > 0)
        {
            userVelocity[0] = userVelocity[0] - 1;
        }
        else
        {
            if (userVelocity[0] < 0)
            {
                userVelocity[0] = userVelocity[0] + 1;
            }
        }
        if (userPosition[1] > 0)
        {
            userVelocity[1] = userVelocity[1] - .1;
        }

        userPosition[0] = userPosition[0] + userVelocity[0];
        if (userPosition[1] + userVelocity[1] > 0)
        {
            userPosition[1] = userPosition[1] + userVelocity[1];
        }
        else
        {
            userPosition[1] = 0;
            userVelocity[1] = 0;
        }
    }
    if (d3 == true)
    {
        if (w)
        {
            userVelocity[1] = 5;
        }
        if (a)
        {
            userVelocity[0] = -5;
        }
        if (s)
        {
            userVelocity[1] = -5;
        }
        if (d)
        {
            userVelocity[0] = 5;
        }
        if (userVelocity[0] > 0)
        {
            userVelocity[0] = userVelocity[0] - 1;
        }
        else
        {
            if (userVelocity[0] < 0)
            {
                userVelocity[0] = userVelocity[0] + 1;
            }
        }
        if (userVelocity[1] > 0)
        {
            userVelocity[1] = userVelocity[1] - 1;
        }
        else
        {
            if (userVelocity[1] < 0)
            {
                userVelocity[1] = userVelocity[1] + 1;
            }
        }
        for (var j = -1; j > barrierCount; j = j - 1)
        {
            checkIfTouching(document.getElementById("user"), document.getElementById(j));
            if (obj1_onLeftOf_obj2 == true || obj1_onRightOf_obj2 == true)
            {
                userVelocity[0] = userVelocity[0] * -1;
            }
            if (obj1_onTopOf_obj2 == true || obj2_onTopOf_obj1 == true)
            {
                userVelocity[1] = userVelocity[1] * -1;
            }
        }
        userPosition[0] = userPosition[0] + userVelocity[0];
        userPosition[1] = userPosition[1] + userVelocity[1];
        if (click)
        {
            if (!holding)
            {
                createProjectile("black", "true");
                holding = true;
                holdCount++;
            }
            else
            {
                if ((holdCount % 10) == 0)
                {
                    createProjectile("black", "true");
                }
                holdCount++;
            }
        }
        else
        {
            holding = false;
            holdCount = 0;
            if (Math.abs(userVelocity[1]) > 0 || Math.abs(userVelocity[0]) > 0)
            {
                rotationAngle = (Math.atan2(userVelocity[1], userVelocity[0]) - (Math.PI / 2)) * -1;
            }
        }
    }

    if (userPosition[0] < 0)
    {
        userPosition[0] = 0;
    }
    if (userPosition[0] > 1150)
    {
        userPosition[0] = 1150;
    }
    if (userPosition[1] > 450)
    {
        userPosition[1] = 450;
    }
    if (userPosition[1] < 0)
    {
        userPosition[1] = 0;
    }
    document.getElementById("user").style.marginLeft = userPosition[0] + "px";
    document.getElementById("user").style.marginTop = 450 - userPosition[1] + "px";

    if (refreshCount % 30 == 0)
    {
        for (var i = 0; i < enemyCount; i++)
        {
            if (JSON.stringify(document.getElementById(i)) != "null")
            {
                document.getElementById(i).style.zIndex = Math.floor(Math.random() * 5) - 2; // storing the horizontal velocity of each enemy in their z index
                document.getElementById(i).style.fontSize = Math.floor(Math.random() * 3) + "px"; // storing the vertical velocity of each enemy in their font size
                document.getElementById(i).style.padding = Math.floor(Math.random() * 2) + "px";// storing the sign of the vertical velocity of each enemey in their padding (0 = negaitve, 1 = positive)
            }
        }
        //I did this so i didn't have to make a massive of array or a bunch of variables to store enemy velocities. Also it's funny
    }
    for (var i = 0; i < enemyCount; i++)
    {
        if (JSON.stringify(document.getElementById(i)) != "null")
        {
            for (var j = -1; j > barrierCount; j = j - 1)
            {
                checkIfTouching(document.getElementById(i), document.getElementById(j));
                if (obj1_onLeftOf_obj2 == true || obj1_onRightOf_obj2 == true)
                {
                    document.getElementById(i).style.zIndex = parseInt(document.getElementById(i).style.zIndex) * -1;
                }
                if (obj1_onTopOf_obj2 == true || obj2_onTopOf_obj1 == true)
                {
                    if (parseInt(document.getElementById(i).style.padding) == 0)
                    {
                        document.getElementById(i).style.padding = "1px";
                    }
                    else
                    {
                        document.getElementById(i).style.padding = "0px";
                    }
                }
            }
            var sign;
            if (parseInt(document.getElementById(i).style.padding) == 0)
            {
                sign = -1;
            }
            else
            {
                sign = 1;
            }

            document.getElementById(i).style.transform = "rotate(" + (parseInt(document.getElementById(i).style.columnCount) * Math.PI / 180 * (parseInt(document.getElementById(i).style.fontWeight) - 1)) + "rad)";
            document.getElementById(i).style.columnCount = parseInt((((Math.atan2(parseInt(document.getElementById(i).style.fontSize) * sign * -1, parseInt(document.getElementById(i).style.zIndex)) - (Math.PI / 2)) * -1)) * 180 / Math.PI);
            if (parseInt((((Math.atan2(parseInt(document.getElementById(i).style.fontSize) * sign * -1, parseInt(document.getElementById(i).style.zIndex)) - (Math.PI / 2)) * -1)) * 180 / Math.PI) < 0)
            {
                document.getElementById(i).style.fontWeight = 0;
            }
            else
            {
                document.getElementById(i).style.fontWeight = 2;
            }
            
            if (parseInt(window.getComputedStyle(document.getElementById(i)).marginLeft) + parseInt(document.getElementById(i).style.zIndex) < 1150)
            {
                document.getElementById(i).style.marginLeft = parseInt(window.getComputedStyle(document.getElementById(i)).marginLeft) + parseInt(document.getElementById(i).style.zIndex) + "px";
            }
            else
            {
                document.getElementById(i).style.marginLeft = "1150px";
            }
            if (parseInt(window.getComputedStyle(document.getElementById(i)).marginTop) + (parseInt(document.getElementById(i).style.fontSize) * sign) < 450)
            {
                document.getElementById(i).style.marginTop = parseInt(window.getComputedStyle(document.getElementById(i)).marginTop) + (parseInt(document.getElementById(i).style.fontSize)) * sign + "px";
            }
            else
            {
                document.getElementById(i).style.marginTop = "450px";
            }
            if (parseInt(window.getComputedStyle(document.getElementById(i)).marginLeft) < 0)
            {
                document.getElementById(i).style.marginLeft = "0px";
            }
            if (parseInt(window.getComputedStyle(document.getElementById(i)).marginTop) < 0)
            {
                document.getElementById(i).style.marginTop = "0px";
            }

            if (refreshCount % 100 == 0)
            {
                createProjectile("red", "false", i);
            }
        }
    }
    for (var i = 100; i < projectileCount; i++)
    {
        if (JSON.stringify(document.getElementById(i)) != "null")
        {
            checkIfProjectileIsTouchingBarrier(i);
            var sign;
            if (parseInt(document.getElementById(i).style.padding) == 0)
            {
                sign = -1;
            }
            else
            {
                sign = 1;
            }
            if (0 < parseInt(window.getComputedStyle(document.getElementById(i)).marginLeft) + parseInt(document.getElementById(i).style.zIndex) && parseInt(window.getComputedStyle(document.getElementById(i)).marginLeft) + parseInt(document.getElementById(i).style.zIndex) < 1192)
            {
                document.getElementById(i).style.marginLeft = parseInt(window.getComputedStyle(document.getElementById(i)).marginLeft) + parseInt(document.getElementById(i).style.zIndex) + "px";
            }
            else
            {
                document.getElementById(i).style.zIndex = parseInt(document.getElementById(i).style.zIndex) * -1;
                document.getElementById(i).style.tabSize = parseInt(document.getElementById(i).style.tabSize) + 1; // stores collision count
            }
            if (0 < parseInt(window.getComputedStyle(document.getElementById(i)).marginTop) + ((parseInt(document.getElementById(i).style.fontSize)) * sign) && parseInt(window.getComputedStyle(document.getElementById(i)).marginTop) + ((parseInt(document.getElementById(i).style.fontSize)) * sign) < 492)
            {
                document.getElementById(i).style.marginTop = parseInt(window.getComputedStyle(document.getElementById(i)).marginTop) + ((parseInt(document.getElementById(i).style.fontSize)) * sign) + "px";
            }
            else
            {
                if (parseInt(document.getElementById(i).style.padding) == 0)
                {
                    document.getElementById(i).style.padding = "1px";
                }
                else
                {
                    document.getElementById(i).style.padding = "0px";
                }
                document.getElementById(i).style.tabSize = parseInt(document.getElementById(i).style.tabSize) + 1;
            }
            if (window.getComputedStyle(document.getElementById(i)).backgroundColor === 'rgb(0, 0, 0)')
            {
                checkForKills(i);
            }
            else
            {
                checkForLivesLost(i);
            }
            if (JSON.stringify(document.getElementById(i)) != "null")
            {
                if (parseInt(document.getElementById(i).style.tabSize) > 3)
                {
                    document.getElementById(i).remove();
                }
            }
        }
    }
    document.getElementById("user").style.transform = "rotate(" + rotationAngle + "rad)";

    refreshCount++;

    if (parseInt(document.getElementById("kills").innerHTML) == enemyCount && endless == false)
    {
        terminate = true;
        document.getElementById("endOfLevelBox").style.display = "block";
        document.getElementById("messageBox").innerHTML = "Victory";
        document.getElementById("score").innerHTML = Math.floor(parseInt(document.getElementById("kills").innerHTML) * 20 * (parseInt(document.getElementById("lives").innerHTML) + 1) / Math.log(parseInt(document.getElementById("shotsFired").innerHTML)));
    }
    else
    {
        if (parseInt(document.getElementById("lives").innerHTML) < 1)
        {
            terminate = true;
            document.getElementById("endOfLevelBox").style.display = "block";
            document.getElementById("messageBox").innerHTML = "Defeat";
            for (var i = 0; i < enemyCount; i++)
            {
                if (JSON.stringify(document.getElementById(i)) != "null")
                {
                    document.getElementById(i).remove();
                }
            }
            if (parseInt(document.getElementById("lives").innerHTML) < 0)
            {
                document.getElementById("score").innerHTML = Math.floor(parseInt(document.getElementById("kills").innerHTML) * 20 / Math.log(parseInt(document.getElementById("shotsFired").innerHTML)));
            }
            else
            {
                document.getElementById("score").innerHTML = Math.floor(parseInt(document.getElementById("kills").innerHTML) * 20 * (parseInt(document.getElementById("lives").innerHTML) + 1) / Math.log(parseInt(document.getElementById("shotsFired").innerHTML)));
            }
        }
    }
    
    if (terminate == false)
    {
        requestAnimationFrame(updatePositions);
    }
}

function loadGame()
{
    updatePositions();
}


document.addEventListener('keydown', (event)=> {
    if (event.key == '2') {
        enter2d();
    }
    else if (event.key == '3') {
        enter3d();
    }
});

function enter2d()
{
    d2 = true;
    d3 = false;
    document.addEventListener('keydown', (event)=>
    {
        if (event.key == 'w')
        {
            w = true;
        }
        if (event.key == 's')
        {
            s = true;
        }
        if (event.key == 'a')
        {
            a = true;
        }
        if (event.key == 'd')
        {
            d = true;
        }
    });
    document.addEventListener('keyup', (event)=>
    {
        if (event.key == 'w')
        {
            w = false;
        }
        if (event.key == 's')
        {
            s = false;
        }
        if (event.key == 'a')
        {
            a = false;
        }
        if (event.key == 'd')
        {
            d = false;
        }
    });

}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms)); // chatgpt
}

function enter3d()
{
    d2 = false;
    d3 = true;
    document.addEventListener('keydown', (event)=> 
    {
        if (event.key == 'w') 
        {
            w = true;
        }
        if (event.key == 's') 
        {
            s = true;
        }
        if (event.key == 'a') 
        {
            a = true;
        }
        if (event.key == 'd') 
        {
            d = true;
        }
    });
    document.addEventListener('keyup', (event)=> 
    {
        if (event.key == 'w') 
        {
            w = false;
        }
        if (event.key == 's') 
        {
            s = false;
        }
        if (event.key == 'a') 
        {
            a = false;
        }
        if (event.key == 'd') 
        {
            d = false;
        }
    });
    document.addEventListener('mousedown', async (event) =>
    {
        click = true;

        
    });
    document.addEventListener('mouseup', (event) =>
    {
        click = false;
    });
}

function createEnemy(num)
{
    var div = document.createElement("div");
    div.setAttribute("id", num);
    div.style.height = "50px";
    div.style.width = "50px";
    div.style.position = "absolute";
    div.style.backgroundImage = "url(enemyTonk.png)";
    div.style.columnCount = 0;
    div.style.fontWeight = 2;
    document.getElementById("container").appendChild(div);
    setCpuSpawn(num);
}

function setCpuSpawn(id)
{
    document.getElementById(id).style.marginLeft = Math.floor(Math.random() * 301) + 600 + "px"
    document.getElementById(id).style.marginTop = Math.floor(Math.random() * 201) + 125 + "px"
    for (var i = -1; i >= barrierCount; i = i - 1)
    {
        checkIfTouching(document.getElementById(id), document.getElementById(i));
        if (obj1_onLeftOf_obj2 == true || obj1_onRightOf_obj2 == true || obj1_onTopOf_obj2 == true || obj2_onTopOf_obj1 == true)
        {
            setCpuSpawn(id);
        }
    }
}

const obj = {getCursorPosition: function(event)
    {
        x = event.clientX - parseInt(window.getComputedStyle(document.getElementById("container")).marginLeft) - 108;
        y = event.clientY - 108;
    }
}

function createProjectile(color, user, cpuId)
{
    var div = document.createElement("div");
    div.setAttribute("id", projectileCount);
    div.style.height = "8px";
    div.style.width = "8px";
    div.style.borderRadius = "100%";
    div.style.backgroundColor = color;
    div.style.position = "absolute";
    div.style.tabSize = 0;
    document.getElementById("container").appendChild(div);
    if (user == "true")
    {
        div.style.marginTop = parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) + 25 + "px";
        div.style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) + 25 + "px";

        div.style.zIndex = parseInt(15 * Math.cos(Math.atan2(y - parseInt(window.getComputedStyle(document.getElementById("user")).marginTop), x - parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft))));
        div.style.fontSize = Math.abs(15 * Math.sin(Math.atan2(y - parseInt(window.getComputedStyle(document.getElementById("user")).marginTop), x - parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft)))) + "px";
        if (15 * Math.sin(Math.atan2(y - parseInt(window.getComputedStyle(document.getElementById("user")).marginTop), x - parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft))) < 0)
        {
            div.style.padding = 0 + "px";
        }
        else
        {
            div.style.padding = "1px";
        }
        document.getElementById("shotsFired").innerHTML = parseInt(document.getElementById("shotsFired").innerHTML) + 1;
    }
    else
    {
        div.style.marginTop = parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginTop) + 25 + "px";
        div.style.marginLeft = parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginLeft) + 25 + "px";

        div.style.zIndex = parseInt(8 * Math.cos(Math.atan2(parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginTop), parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginLeft))));
        div.style.fontSize = Math.abs(parseInt(8 * Math.sin(Math.atan2(parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginTop), parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginLeft))))) + "px";
        if (parseInt(15 * Math.sin(Math.atan2(parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginTop), parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginLeft)))) < 0)
        {
            div.style.padding = 0 + "px";
        }
        else
        {
            div.style.padding = "1px";
        }
        document.getElementById(cpuId).style.columnCount = (450 - Math.atan2(userPosition[1] - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginTop), userPosition[0] - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginLeft)) + (Math.PI / 2)) * 1;
        if ((450 - Math.atan2(userPosition[1] - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginTop), userPosition[0] - parseInt(window.getComputedStyle(document.getElementById(cpuId)).marginLeft)) + (Math.PI / 2)) * 1 < 0)
        {
            document.getElementById(cpuId).style.fontWeight = 0;
        }
        else
        {
            document.getElementById(cpuId).style.fontWeight = 2;
        }
    }
    rotationAngle = (Math.atan2(y - parseInt(window.getComputedStyle(document.getElementById("user")).marginTop), x - parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft)) + (Math.PI / 2)) * 1;
    projectileCount++;
}

function checkIfTouching(object1, object2)
{
    obj1_onLeftOf_obj2 = false;
    obj1_onRightOf_obj2 = false;
    obj1_onTopOf_obj2 = false;
    obj2_onTopOf_obj1 = false;
    const obj1 = object1.getBoundingClientRect();
    const obj2 = object2.getBoundingClientRect();

    if ((obj1.left - obj2.right <= 0 && obj1.left - obj2.right >= -10) && (obj1.right - obj2.right >= 0 && obj1.right - obj2.right <= 10) && ((obj1.top > obj2.top && obj1.top < obj2.bottom) || (obj1.bottom > obj2.top && obj1.bottom < obj2.bottom) || (obj2.top > obj1.top && obj2.top < obj1.bottom) || (obj2.bottom > obj1.top && obj2.bottom < obj1.bottom)))
    {
        obj1_onRightOf_obj2 = true;
    }
    if (obj2.left - obj1.right <= 0 && obj2.left - obj1.right >= -10 && (obj2.right - obj1.right >= 0) && obj2.right - obj1.right <= 10 && ((obj1.top > obj2.top && obj1.top < obj2.bottom) || (obj1.bottom > obj2.top && obj1.bottom < obj2.bottom) || (obj2.top > obj1.top && obj2.top < obj1.bottom) || (obj2.bottom > obj1.top && obj2.bottom < obj1.bottom)))
    {
        obj1_onLeftOf_obj2 = true;
    }
    if ((obj1.top - obj2.bottom <= 0) && obj1.top - obj2.bottom >= -10 && (obj1.bottom - obj2.bottom >= 0) && obj1.bottom - obj2.bottom <= 10 &&((obj1.left > obj2.left && obj1.left < obj2.right) || (obj1.right > obj2.left && obj1.right < obj2.right) || (obj2.left > obj1.left && obj2.left < obj1.right) || (obj2.right > obj1.left && obj2.right < obj1.right)))
    {
        obj2_onTopOf_obj1 = true;
    }
    if ((obj2.top - obj1.bottom <= 0) && obj2.top - obj1.bottom >= -10 && (obj2.bottom - obj1.bottom >= 0) && obj2.bottom - obj1.bottom <= 10 && ((obj1.left > obj2.left && obj1.left < obj2.right) || (obj1.right > obj2.left && obj1.right < obj2.right) || (obj2.left > obj1.left && obj2.left < obj1.right) || (obj2.right > obj1.left && obj2.right < obj1.right)))
    {
        obj1_onTopOf_obj2 = true;
    }
}

async function checkForKills(id)
{
    if (window.getComputedStyle(document.getElementById(id)).backgroundColor === 'rgb(0, 0, 0)')
    {
        for (var j = 0; j < enemyCount; j++)
        {
            if (JSON.stringify(document.getElementById(j)) != "null")
            {
                checkIfTouching(document.getElementById(id), document.getElementById(j));
                if (obj1_onTopOf_obj2 == true || obj2_onTopOf_obj1 == true || obj1_onLeftOf_obj2 == true || obj1_onRightOf_obj2 == true)
                {
                    document.getElementById(id).remove();
                    document.getElementById(j).remove();
                    document.getElementById("kills").innerHTML = parseInt(document.getElementById("kills").innerHTML) + 1;
                    break;
                }
            }
        }
    }
}

async function checkForLivesLost(id)
{
    if (window.getComputedStyle(document.getElementById(id)).backgroundColor === 'rgb(255, 0, 0)')
    {
        checkIfTouching(document.getElementById(id), document.getElementById("user"));
        if (obj1_onTopOf_obj2 == true || obj2_onTopOf_obj1 == true || obj1_onLeftOf_obj2 == true || obj1_onRightOf_obj2 == true)
        {
            document.getElementById(id).remove();
            document.getElementById("lives").innerHTML = parseInt(document.getElementById("lives").innerHTML) - 1;
            document.getElementById("lives2").innerHTML = "Lives: " + (parseInt(document.getElementById("lives").innerHTML));
        }
    }
}

function createBarrier(num)
{
    var div = document.createElement("div");
    div.setAttribute("id", num);
    div.style.backgroundColor = "black";
    div.style.height = Math.floor(Math.random() * 201) + "px";
    div.style.width = "10px";
    div.style.transform = "rotate(" + Math.floor(Math.random() * 2) * (Math.PI / 2) + "rad)";
    div.style.position = "absolute";
    div.style.display = "none";
    document.getElementById("container").appendChild(div);
    ensureInsideContainer(num);
}

function ensureInsideContainer(num)
{
    document.getElementById(num).style.marginLeft = Math.floor(Math.random() * 1200) + "px";
    document.getElementById(num).style.marginTop = Math.floor(Math.random() * 500) + "px";
    if (parseInt(window.getComputedStyle(document.getElementById(num)).height) + parseInt(window.getComputedStyle(document.getElementById(num)).marginLeft) > 1200 || (parseInt(window.getComputedStyle(document.getElementById(num)).height) * -1) + parseInt(window.getComputedStyle(document.getElementById(num)).marginLeft) < 0)
    {
        ensureInsideContainer(num);
    }
    if (parseInt(window.getComputedStyle(document.getElementById(num)).height) + parseInt(window.getComputedStyle(document.getElementById(num)).marginTop) > 500 || (parseInt(window.getComputedStyle(document.getElementById(num)).height) * -1) + parseInt(window.getComputedStyle(document.getElementById(num)).marginTop) < 0)
    {
        ensureInsideContainer(num);
    }
    document.getElementById(num).style.display = "block";
}

async function checkIfProjectileIsTouchingBarrier(id)
{
    for (var i = -1; i >= barrierCount; i = i - 1)
    {
        checkIfTouching(document.getElementById(id), document.getElementById(i))
        {
            if (obj1_onLeftOf_obj2 == true || obj1_onRightOf_obj2 == true)
            {
                document.getElementById(id).style.zIndex = parseInt(document.getElementById(id).style.zIndex) * -1;
                debugger;
            }
            if (obj1_onTopOf_obj2 == true || obj2_onTopOf_obj1 == true)
            {
                if (parseInt(document.getElementById(id).style.padding) == 0)
                {
                    document.getElementById(id).style.padding = "1px";
                    debugger;
                }
                else
                {
                    document.getElementById(id).style.padding = "0px";
                    debugger;
                }
            }
            if (obj1_onTopOf_obj2 == true || obj1_onRightOf_obj2 == true || obj1_onLeftOf_obj2 == true || obj2_onTopOf_obj1 == true)
            {
                document.getElementById(id).style.tabSize = parseInt(document.getElementById(id).style.tabSize) + 1;
            }
        }
    }
}