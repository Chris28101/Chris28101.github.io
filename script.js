let pokes = [];

const e_endpoint = "./bulbasaur.json";
const p_endpoint = "./ditto.json"
fetch(e_endpoint).then(
    response => response.json().then(data=>{
        data.currHp = data.stats[0].base_stat
        pokes.push(data);
        
        // render();
    })

).then( _ => {
    fetch(p_endpoint).then(
        response => response.json().then(data=>{
            data.name = data.forms[0].name
            pokes.push(data)
            render()
        })
    )
})

function render() {
    //enemy
    const enemy = pokes[0];
    const name = `<span class="hud-name">${enemy.forms[0].name}</span>`;
    
    
    // const hp = `<span class="hud-hp">${enemy.stats[0].base_stat}</span>`
    const maxhp = enemy.stats[0].base_stat;
    const currenthp = enemy.currHp;
    const hp = `<div id="progress">
                    <span class="outer"><span class="inner" style="width:${(currenthp/maxhp)*100}%"></span></span>
                </div>`
    document.querySelector("#enemy-hud").innerHTML = name + " " + hp;
    // document.getElementsByClassName("percent").innerHTML = enemy.currenthp + "/" + maxhp
    //player
    let player = pokes[1];
    const player_name = `<span class="hud-name">${player.forms[0].name}</span>`;
    document.querySelector("#player-hud").innerHTML = player_name;

    
}

// let bulbasaur_hp = hp;
// document.getElementById("progress").innerHTML.value

// function damage() {
//     pokes[0].currHp-=10;
//     render
// }
