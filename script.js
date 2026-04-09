//cmm + s ALWAYS SAVE 
let pokes = [];

const bulb_endpoint = "./bulbasaur.json";
const ditto_endpoint = "./ditto.json"
const char_endpoint = "./charizard.json"
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
fetchData()


async function fetchData(){
    
    try{
        const response = await fetch(char_endpoint)

        if(!response.ok){
            throw new Error("could not fetch this resource");
        }

        const data = await response.json();
        
        const charImg = data.sprites.back_default;
        
        const imgElement = document.getElementById("char")
        console.log(imgElement)
        
        //setting this imgs url to the src in the html file to 
        imgElement.src = charImg;
        
        // imgElement.style.display = "block";

        //char health
        let charHeath = data.stats[0].base_stat
        let healthElement = document.getElementById("percent")
        healthElement.innerHTML = charHeath + "/" + charHeath
        console.log(charHeath)

        // const player_name = `<span class="hud-name">${player.forms[0].name}</span>`;
        //     document.querySelector("#player-hud").innerHTML = player_name;

    }
    catch(error){
        console.error(error);
    }
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
