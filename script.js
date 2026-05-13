//cmm + s ALWAYS SAVE 
// let gameLoop = true;
// while(gameLoop){
    
// }

let pokes = {};
let enemyPokes = {};
let enemyMovesNames = {}
let enemyHitPoint = {}
//array of whole pokes moves object
let enemyMovesDmg = []

let pokesMoveNames = {}
let pokesHitpoint = {}
let isPlayerMove = true
let isEnemyMove = false
const bulb_endpoint = "./bulbasaur.json";
const ditto_endpoint = "./ditto.json"
const char_endpoint = "./charizard.json"
const charmander_endpoint = "./charmander.json"


fetchPlayerData(charmander_endpoint)
fetchEnemyData(bulb_endpoint)
// ask big L what to do since there isnt endpoints here 
function closeWindow(){
    closeBtn = document.querySelector("#RUN")
    closeBtn.addEventListener('click',(event)=>{
        alert("Closing the window now")
        window.close()
    })
}
closeWindow()
async function fetchPlayerData(endpoint){
    
    try{
        const response = await fetch(endpoint)


        if(!response.ok){
            throw new Error("could not fetch this resource");
        }

        const data = await response.json();
        
        const pokeImg = data.sprites.back_default;
        
        const imgElement = document.getElementById("pPoke")
        console.log(imgElement)
        
        //setting this imgs url to the src in the html file to 
        imgElement.src = pokeImg;
        
        // imgElement.style.display = "block";

        //char health
        let playerPokeHeath = data.stats[0].base_stat
        const playerMaxHealth = playerPokeHeath
        
        console.log(playerPokeHeath)
        //player move name 
        const playerMove1 = data.moves[0].move.name
        const playerMove2 = data.moves[1].move.name
        const playerMove3 = data.moves[2].move.name
        const playerMove4 = data.moves[3].move.name
        console.log(playerMove1)
        console.log(playerMove2)
        console.log(playerMove3)
        console.log(playerMove4)
        //player move hitpoint 

        let playerDmg1 = data.moves[0].damage.hit_point
        let playerDmg2 = data.moves[1].damage.hit_point
        let playerDmg3 = data.moves[2].damage.hit_point
        let playerDmg4 = data.moves[3].damage.hit_point
        
        //percentage
        let playerPercentageHealth = (playerPokeHeath / playerMaxHealth)*100; 
        pokes={playerPokeHeath ,imgElement,playerMaxHealth ,playerPercentageHealth}
        pokesMoveNames = {playerMove1,playerMove2,playerMove3,playerMove4}
        pokesHitpoint = {playerDmg1,playerDmg2,playerDmg3,playerDmg4}
         
        
        
        // const player_name = `<span class="hud-name">${player.forms[0].name}</span>`;
        //     document.querySelector("#player-hud").innerHTML = player_name;

    }
    catch(error){
        console.error(error);
    }
}

async function fetchEnemyData(endpoint) {
    const response = await fetch(endpoint)


        if(!response.ok){
            throw new Error("could not fetch this resource");
        }

        const data = await response.json();

        const enemyImg = data.sprites.front_default
        const imgElement = document.getElementById("ePoke")
        imgElement.src = enemyImg;

        let enemyHealth = data.stats[0].base_stat
        const enemyMaxhp = enemyHealth
        let percentageHealth = (enemyHealth / enemyMaxhp)*100;
         

         
        console.log(enemyHealth)
        enemyPokes={enemyHealth, enemyMaxhp, percentageHealth};
        
        //enemys move names
        const enemyMove1 = data.moves[0].move.name
        const enemyMove2 = data.moves[1].move.name
        const enemyMove3 = data.moves[2].move.name
        const enemyMove4 = data.moves[3].move.name
        enemyMovesNames = {enemyMove1,enemyMove2,enemyMove3,enemyMove4}
        //enemy move dmgs 
        let enemyDmg1 = data.moves[0].damage.hit_point
        let enemyDmg2 = data.moves[1].damage.hit_point
        let enemyDmg3 = data.moves[2].damage.hit_point
        let enemyDmg4 = data.moves[3].damage.hit_point
        enemyHitPoint = {enemyDmg1,enemyDmg2,enemyDmg3,enemyDmg4}

        enemyMovesDmg = [
            {name: enemyMove1 , damage: enemyDmg1},
            {name: enemyMove2 , damage: enemyDmg2},
            {name: enemyMove3 , damage: enemyDmg3},
            {name: enemyMove4 , damage: enemyDmg4},
        ]
        console.log("array right after assignment:", enemyMovesDmg) // add this
 
}

// playerMoves(charmander_endpoint)
function render() {
    // 1. If data hasn't loaded yet, don't run the math
    if (!enemyPokes.enemyMaxhp || !pokes.playerMaxHealth) return;

    // --- Enemy HUD ---
    const enemyHealthElement = document.getElementById("enemyHP");
    const enemyHPBar = document.getElementById("enemyHPBar");
    
    const currentEnemyHP = Math.max(0, enemyPokes.enemyHealth);
    const enemyPercent = (currentEnemyHP / enemyPokes.enemyMaxhp) * 100;

    enemyHealthElement.innerHTML = `${currentEnemyHP} / ${enemyPokes.enemyMaxhp}`;
    //safty check for bar
    if (enemyHPBar) {
        enemyHPBar.style.width = enemyPercent + "%";
    }

    // --- Player HUD ---
    const playerHealthElement = document.getElementById("percent");
    const playerHPBar = document.getElementById("playerHPBar");
    
    const currentPlayerHP = Math.max(0, pokes.playerPokeHeath);
    const playerPercent = (currentPlayerHP / pokes.playerMaxHealth) * 100;

    playerHealthElement.innerHTML = `${currentPlayerHP} / ${pokes.playerMaxHealth}`;
    playerHPBar.style.width = playerPercent + "%"
    if (playerHPBar) {
        playerHPBar.style.width = playerPercent + "%";
    }

    // --- Win/Loss Check ---
    if (enemyPokes.enemyHealth <= 0) {
        alert("Enemy fainted! You win!");
        location.reload();
    } else if (pokes.playerPokeHeath <= 0) {
        alert("You fainted... Game Over.");
        location.reload();
    }

}

function playerMoves(){
 
    
    
    
    //render move damage
    // const move1Damage = pokes.mega_punch
    // const move2Damage = pokes.fire_punch
    // const move3Damage = pokes.thunder_punch
    // const move4Damage = pokes.scratch
    // console.log(move4Damage)
    // move choice displayed
    // let moveDisplay = document.querySelector("#fight-ui")
    
    // console.log(moveDisplay)
    //grabs the id fir the buttons and save it 
    const fightBtn = document.querySelector("#FIGHT");
    const runBtn = document.querySelector("#RUN");
    const bagBtn = document.querySelector("#BAG");
    const pokeBtn = document.querySelector("#POKEMON");
    // grabs inner html for button
    fightBtn.innerHTML = pokesMoveNames.playerMove1;
    runBtn.innerHTML = pokesMoveNames.playerMove2;
    bagBtn.innerHTML = pokesMoveNames.playerMove3;
    pokeBtn.innerHTML = pokesMoveNames.playerMove4;
    //fight button move one button 
    const newFightBtn = fightBtn.cloneNode(true);
    fightBtn.parentNode.replaceChild(newFightBtn, fightBtn);
    
    //run button move "2" button 
    const newRunBtn = runBtn.cloneNode(true)
    runBtn.parentNode.replaceChild(newRunBtn,runBtn)

    const newBagBtn = bagBtn.cloneNode(true)
    bagBtn.parentNode.replaceChild(newBagBtn,bagBtn)

    const newPokeBtn = pokeBtn.cloneNode(true)
    pokeBtn.parentNode.replaceChild(newPokeBtn,pokeBtn)
    // Now add the listener to the "clean" button
 
    newFightBtn.addEventListener('click', (event) => {
        
        if(!isPlayerMove ){
            return
        }
             
        isPlayerMove = false

        enemyPokes.enemyHealth -= pokesHitpoint.playerDmg1;
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ pokesMoveNames.playerMove1 + " and did " + pokesHitpoint.playerDmg1 + " damage")
        
        render();
        
    if(enemyPokes.enemyHealth > 0){
        isPlayerMove = false
        enemyTurns()
    }
    });

    newRunBtn.addEventListener('click', (event) => {
        //stops you fron battleing not ur turn
        if(!isPlayerMove ){
            return
        }
             
        isPlayerMove = false

        enemyPokes.enemyHealth -= pokesHitpoint.playerDmg2;
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ pokesMoveNames.playerMove2 + " and did " + pokesHitpoint.playerDmg2 + " damage")

 
        render();

        if(enemyPokes.enemyHealth > 0){
            isPlayerMove = false
            enemyTurns()
        }
    });
    newBagBtn.addEventListener('click', (event) => {
        //stops you fron battleing not ur turn
        if(!isPlayerMove ){
            return
        }
                     
        isPlayerMove = false
        enemyPokes.enemyHealth -= pokesHitpoint.playerDmg3;
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ pokesMoveNames.playerMove3 + " and did " + pokesHitpoint.playerDmg3 + " damage")
        render();
        if(enemyPokes.enemyHealth > 0){
            isPlayerMove = false
            enemyTurns()
        }
    })
    newPokeBtn.addEventListener('click',(event) => {
        //stops you fron battleing not ur turn
        if(!isPlayerMove ){
            return
        }
                     
        isPlayerMove = false

        enemyPokes.enemyHealth -= pokesHitpoint.playerDmg4;
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ pokesMoveNames.playerMove4 + " and did " + pokesHitpoint.playerDmg4 + " damage")
        render();
        if(enemyPokes.enemyHealth > 0){
            isPlayerMove = false
            enemyTurns()
        }
    } )
   //simplifed bigL version 
    // function changeHealth(p, hp) {
    //     p.health += hp;
    //     p.percentageHealth = (p.health / p.maxHealth)*100;

    // }
    
    
    

    // document.querySelector("#RUN").innerHTML = playerMove2;
    // document.querySelector("#BAG").innerHTML = playerMove3;
    // document.querySelector("#POKEMON").innerHTML = playerMove4;

    
    // console.log(document.querySelector("#FIGHT").innerHTML)
}

function enemyTurns(){
    setTimeout(()=>{
        //random move
        randMove = enemyMovesDmg[Math.floor(Math.random() * enemyMovesDmg.length)]
        console.log(randMove.name, randMove.damage)

        pokes.playerPokeHeath -= randMove.damage
        //resets players hpbar to when u did dmg to it 
        pokes.playerPercentageHealth = (pokes.playerPokeHeath / pokes.playerMaxHealth)*100;
        document.getElementById("fight-ui").textContent = `Enemey used ${randMove.name } and did ${randMove.damage} damage`
        render()
        
        if(pokes.playerPokeHeath > 0){
            setTimeout(()=>{
                isPlayerMove = true
                document.getElementById("fight-ui").textContent = "What will you do?";
            },1000)
        }
    },1500)
    

}
async function startGame() {
    await fetchPlayerData(charmander_endpoint);
    await fetchEnemyData(bulb_endpoint);
     
    
    // Now that all the data is definitely here, we can render safely!
    render(); 
}

// Kick off the game!
startGame();


//might have to make a battle function for player turnbased ask big L for guidence 

 
     
 