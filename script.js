//cmm + s ALWAYS SAVE 
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
        pokes={playerPokeHeath,mega_punch,imgElement,playerMaxHealth}
         
        
        
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
         

         
        console.log(enemyHealth)
        enemyPokes={enemyHealth, enemyMaxhp};
}

// playerMoves(charmander_endpoint)
function render() {

    let enemyHealthElement = document.getElementById("enemyHP")
    enemyHealthElement.innerHTML = enemyPokes.enemyHealth + "/" + enemyPokes.enemyMaxhp

    let playerHealthElement = document.getElementById("percent")
    playerHealthElement.innerHTML = pokes.playerPokeHeath + "/" + pokes.playerMaxHealth

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

    //render move damage
    const move1Damage = data.moves[0].damage.hit_point
     
    //fight btn works 
    const fightBtn = document.querySelector("#FIGHT");
    // added in damage for mega punch in json just fix it 
    fightBtn.innerHTML = playerMove1;
    fightBtn.addEventListener('click', (event)=>{
        console.log("Fight!");
        //change to work with pokes dmg instead of health 
        enemyPokes.enemyHealth = enemyPokes.enemyHealth - pokes.mega_punch
        render()
        const hp = 
        `<div id="progress">
            <span class="outer"><span class="inner" style="width:${(enemyPokes.enemyHealth/enemyPokes.maxhp)*100}%"></span></span>
        </div>`
    })
    

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

//render function doesnt use async u use the rray that has alll your pokemons data 




// let bulbasaur_hp = hp;
// document.getElementById("progress").innerHTML.value

// function damage() {
//     pokes[0].currHp-=10;
//     render
// }

//render function code 
//
//render function
// let bulbasaur_hp = hp;
// document.getElementById("progress").innerHTML.value

// function damage() {
//     pokes[0].currHp-=10;
//     render
// }


//enemy
// const enemy = pokes[0];
// const name = `<span class="hud-name">${enemy.forms[0].name}</span>`;


// // const hp = `<span class="hud-hp">${enemy.stats[0].base_stat}</span>`


// document.querySelector("#enemy-hud").innerHTML = name + " " + hp;
// // document.getElementsByClassName("percent").innerHTML = enemy.currenthp + "/" + maxhp
// //player           --
// let player = pokes[1];
// const player_name = `<span class="hud-name">${player.forms[0].name}</span>`;
// document.querySelector("#player-hud").innerHTML = player_name;

// const player_img = `<span class = "img-hud">${data.sprites.back_default.img}</span>`
// document.querySelector("#ditto-img").innerHTML = player_img
// console.log(player_img)
