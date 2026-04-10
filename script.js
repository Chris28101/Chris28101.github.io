//cmm + s ALWAYS SAVE 
let pokes = [];

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
fetchPlayerData(bulb_endpoint)
fetchEnemyData(bulb_endpoint)


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
        let healthElement = document.getElementById("percent")
        healthElement.innerHTML = playerPokeHeath + "/" + playerPokeHeath
        console.log(playerPokeHeath)
        

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
        let healthElement = document.getElementById("enemyHP")
        healthElement.innerHTML = enemyHealth + "/" + enemyHealth
        console.log(enemyHealth)
}
// playerMoves(charmander_endpoint)
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
    


    document.querySelector("#FIGHT").innerHTML = playerMove1;
    document.querySelector("#RUN").innerHTML = playerMove2;
    document.querySelector("#BAG").innerHTML = playerMove3;
    document.querySelector("#POKEMON").innerHTML = playerMove4;
    // console.log(document.querySelector("#FIGHT").innerHTML)
}





// function render() {
//     //enemy
//     const enemy = pokes[0];
//     const name = `<span class="hud-name">${enemy.forms[0].name}</span>`;
    
    
//     // const hp = `<span class="hud-hp">${enemy.stats[0].base_stat}</span>`
//     const maxhp = enemy.stats[0].base_stat;
//     const currenthp = enemy.currHp;
//     const hp = `<div id="progress">
//                     <span class="outer"><span class="inner" style="width:${(currenthp/maxhp)*100}%"></span></span>
//                 </div>`
//     document.querySelector("#enemy-hud").innerHTML = name + " " + hp;
//     // document.getElementsByClassName("percent").innerHTML = enemy.currenthp + "/" + maxhp
//     //player           --
//     let player = pokes[1];
//     const player_name = `<span class="hud-name">${player.forms[0].name}</span>`;
//     document.querySelector("#player-hud").innerHTML = player_name;

//     const player_img = `<span class = "img-hud">${data.sprites.back_default.img}</span>`
//     document.querySelector("#ditto-img").innerHTML = player_img
//     console.log(player_img)


    
// }

// let bulbasaur_hp = hp;
// document.getElementById("progress").innerHTML.value

// function damage() {
//     pokes[0].currHp-=10;
//     render
// }
