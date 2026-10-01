function updateNewsArray() {
    newsArray = [
        [()=>"Hello, World!",true,"a1"],
        [()=>"How are you dawg?",Math.random()<1/3,"a2"],
        [()=>"🤨",true,"a3"],
        [()=>"<img src='images/pog.jfif'></img>",true,"a4"],
        [()=>`Hello everybody, my name is Markiplier and welcome to Five Nights at Freddy's, an indie horror game that you guys suggested, en masse, and I saw that Yamimash played it and he said it was really really good... So I'm very eager to see what is up. And that is a terrifying animatronic bear! 'Family pizzeria looking for security guard to work the nightshift.' Oh... 12 a.m. The first night. If I didn't wanna stay the first night, why would I stay any more than... five... Why I stay any more than two- hello? Okay...`,Math.random()<1/10,"a5"],
        [()=>"5 hours? more like 5 years",true,"a6"],
        [()=>"I HAVE PLAYED THIS GAME BEFORE!!!!!!!!!!!",true,"a7"],
        [()=>"<b>Current Endgame NG+:</b> About Reach 1.00^9,450 Stones",Math.random()<1/0.5,"a8"],
        [()=>"You Unlock Next Prestige Layer 3rd I Need Reach Broken 9.99e999 Cobblestones",true,"a9"],
        [()=>"IMR v0.7.1.6 NG+ In You Got Reach e3e38,874,561 Mass!        Me?",true,"a10"],
        [()=>"Epic Lucky Block New Update In Пять Hour / See Russian Me",true,"a11"],
        [()=>"Steve Slain By Solar System Mob, Bruh That You Planet Mob Enemies Impossible!, 0.000000001% Win Rate",true,"a12"],
        [()=>"<img src='images/HK_MTR_logo.svg.webp'></img> x <img src='images/minecraft-logo-online-game-dirt-block-illustrations-concept-design-isolated-186775550.webp'></img> Oh no You Enough Mods But... ftrtyyujnbvc we dɛn kin yuz fɔ mek pipul dɛn",true,"a13"],
        [()=>"Stone-emental NG+ Next Update In 5.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001 Hour / Really Loooong Time",Math.random()<1/2,"a14"],
        [()=>"You Need Reach Pickaxe's Tier 1,352 To Destory The Command Block",true,"a15"],

        [()=>"HOLY COW!! IS THAT A MINECRAFT REFERENCE???",player.t_stone.unl,"b1"],
        [()=>"Eating a Stone in Ancient Greece be like...",player.t_stone.max >= 2,"b2"],
        [()=>"Ok, and?",player.t_stone.max >= 3,"b3"],
        [()=>"How did you make 196,246,121,957,436,124,526,772 yoctogramm of uranium?",player.t_stone.max >= 6,"b4"],
        [()=>"IronStone? More like FeStone :D",player.t_stone.max >= 7,"b5"],
        [()=>"BREAKING THE DIAMOND??? WTFFFFF",player.t_stone.max >= 14,"b6"],
        [()=>"Finally, it made of bedrock...",player.t_stone.max >= 15,"b7"],
        [()=>"Nevermind, bedrock...",player.t_stone.max >= 20,"b8"],
        [()=>"That Impossible, Super Bedrock...",player.t_stone.max >= 40,"b9"],

        [()=>"Gold made in [Au]stralia!",player.gold.unl,"c1"],
        [()=>"Richer than Trillionaire",player.gold.total.gte(1e6),"c2"],

        [()=>"I finally took 268,078 years to break the first stone...",player.break.unl,"d1"],
        [()=>"Coems 🤑🤑🤑🤑🤑",player.break.money.gte(1e6),"d2"],
        [()=>"Money 1e33 Huh? Yes The Give You Reach Googol Money",player.break.money.gte(1e33),"d3"],
        [()=>"Money 1e100 HUH?! How Did Get This? Fine You Get Reach 1e308 Money! Gold Luck!",player.break.money.gte(1e100),"d4"],

        [()=>"How The Get Stronger Pickaxe Lvl.40?!! How Get This Minecraft Hypixel Skyblock? How Get Fast Level Up Pickaxe? Nah",tmp.pickaxe_tier.gte(40),"e1"],
        [()=>"You Reached Infinity Stone But So Not Infinity Mass",player.stone.gte(1.797e308),"e2"],
    ]
}

document.addEventListener("visibilitychange", function() {if (!document.hidden) {scrollNextMessage();}}, false);
var scrollTimeouts = [];
var nextMsgIndex;

function scrollNextMessage() {
    //don't run if hidden to save performance
    if (typeof (player) == "undefined") return
    var s = document.getElementById('news');
    updateNewsArray();
    tmp.blankedOut = false
    
    //select a message at random
    try {
            do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!eval(newsArray[nextMsgIndex][1]))
    } catch(e) {
            console.log("Newsarray doesn't work at idx " + nextMsgIndex)
    }
    scrollTimeouts.forEach(function(v) {clearTimeout(v);});
    scrollTimeouts = [];
    
    //set the text
    var m = newsArray[nextMsgIndex][0]();
    s.innerHTML = m
    
    //get the parent width so we can start the message beyond it
    let parentWidth = s.parentElement.clientWidth;
    
    //set the transition to blank so the move happens immediately
    s.style.transition = '';
    //move div_text to the right, beyond the edge of the div_container
    s.style.transform = 'translateX('+parentWidth+'px)';
    
    //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
    scrollTimeouts.push(setTimeout( function() {
            //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
            //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
            let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
            let rate = 100; //change this value to change the scroll speed
            let transformDuration = dist / rate;


            //set the transition duration
            s.style.transition = 'transform '+transformDuration+'s linear';
            let textWidth = s.clientWidth;
            //we need to move it to -(width+parent padding) before it won't be visible
            s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
            //automatically start the next message scrolling after this one finishes
            //you could add more time to this timeout if you wanted to have some time between messages
            scrollTimeouts.push(setTimeout(function() {
            scrollNextMessage()
            }, Math.ceil(transformDuration * 1000)));
    }, 100));
}