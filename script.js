//cmm + s ALWAYS SAVE 
// let gameLoop = true;
// while(gameLoop){
    
// }
let pokes = {};
let enemyPokes = {};

const bulb_endpoint = "./bulbasaur.json";
const ditto_endpoint = "./ditto.json"
const char_endpoint = "./charizard.json"
const charmander_endpoint = "./charmander.json"
// fetch(e_endpoint).then(
//     response => response.json().then(data=>{
//         data.currHp = data.stats[0].base_stat
//         pokes.push(data);
        
//         // render();
//     })

// ).then( _ => {
//     fetch(p_endpoint).then(
//         response => response.json().then(data=>{
//             data.name = data.forms[0].name

//             data.img = data.sprites.back_default.img



//             pokes.push(data)
//             render()
            
//         })
//     )
// })

// fetch(e_endpoint)
//     .then(response => {
//         if(!response.ok){
//             throw new Error("Could not fetch resource")
//         }
//         return response.json();
//     })
//     .then(data => console.log(data.name))
//     .catch(error => console.log(error));

fetchPlayerData(charmander_endpoint)
fetchEnemyData(bulb_endpoint)
// ask big L what to do since there isnt endpoints here 

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
        //char move dmg 
        let mega_punch = data.moves[0].damage.hit_point
        let fire_punch = data.moves[1].damage.hit_point
        let thunder_punch = data.moves[2].damage.hit_point
        let scratch = data.moves[3].damage.hit_point
        pokes={playerPokeHeath,mega_punch,imgElement,playerMaxHealth,fire_punch,thunder_punch,scratch}
         
        
        
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
}

// playerMoves(charmander_endpoint)
function render() {

    let enemyHealthElement = document.getElementById("enemyHP")
    let enemyHPBar = document.getElementById("enemyHPBar")
    enemyHealthElement.innerHTML = enemyPokes.enemyHealth + "/" + enemyPokes.enemyMaxhp
    enemyHPBar.style=`width:${enemyPokes.percentageHealth}%;`

    let playerHealthElement = document.getElementById("percent")
    playerHealthElement.innerHTML = pokes.playerPokeHeath + "/" + pokes.playerMaxHealth
//     const enemyHpBar = `<div id="progress">
//     <span class="outer"><span class="inner" style="width:${(enemyPokes.enemyHealth/enemyPokes.enemyMaxhp)*100}%"></span></span>
// </div>`

}

async function playerMoves(endpoint){
    const response = await fetch(endpoint)
    if(!response.ok){
        throw new Error("could not fetch this resource");
    }
    const data = await response.json();
    const playerMove1 = data.moves[0].move.name
    const playerMove2 = data.moves[1].move.name
    const playerMove3 = data.moves[2].move.name
    const playerMove4 = data.moves[3].move.name
    console.log(playerMove1)
    console.log(playerMove2)
    console.log(playerMove3)
    console.log(playerMove4)

    
    
    //render move damage
    const move1Damage = pokes.mega_punch
    const move2Damage = pokes.fire_punch
    const move3Damage = pokes.thunder_punch
    const move4Damage = pokes.scratch
    console.log(move4Damage)
    // move choice displayed
    // let moveDisplay = document.querySelector("#fight-ui")
    
    // console.log(moveDisplay)
    //grabs the id fir the buttons and save it 
    const fightBtn = document.querySelector("#FIGHT");
    const runBtn = document.querySelector("#RUN");
    const bagBtn = document.querySelector("#BAG");
    const pokeBtn = document.querySelector("#POKEMON");
    // grabs inner html for button
    fightBtn.innerHTML = playerMove1;
    runBtn.innerHTML = playerMove4;
    bagBtn.innerHTML = playerMove2;
    pokeBtn.innerHTML = playerMove3
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
        enemyPokes.enemyHealth -= pokes.mega_punch;
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ playerMove1 + " and did " + move1Damage + " damage")
        render();
    });
    newRunBtn.addEventListener('click', (event) => {
        enemyPokes.enemyHealth -= pokes.fire_punch;
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ playerMove2 + " and did " + move2Damage + " damage")
        console.log(pokes.fire_punch)
        render();
    });
    newBagBtn.addEventListener('click', (event) => {
        enemyPokes.enemyHealth -= pokes.thunder_punch
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ playerMove3 + " and did " + move3Damage + " damage")
        console.log(pokes.thunder_punch)
        render()
    })
    newPokeBtn.addEventListener('click',(event) => {
        enemyPokes.enemyHealth -= pokes.scratch
        enemyPokes.percentageHealth = (enemyPokes.enemyHealth / enemyPokes.enemyMaxhp)*100;
        document.getElementById("fight-ui").textContent =("You used "+ playerMove4 + " and did " + move4Damage + " damage")
        render()
    } )
   //simplifed bigL version 
    // function changeHealth(p, hp) {
    //     p.health += hp;
    //     p.percentageHealth = (p.health / p.maxHealth)*100;

    // }
    
    
    

    document.querySelector("#RUN").innerHTML = playerMove2;
    document.querySelector("#BAG").innerHTML = playerMove3;
    document.querySelector("#POKEMON").innerHTML = playerMove4;

    
    // console.log(document.querySelector("#FIGHT").innerHTML)
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

 
     
 