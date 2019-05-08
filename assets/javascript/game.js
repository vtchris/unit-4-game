//TODO 
//Output damages at the end of each round
//Music?
//Add css around gameBoard? Boarder etc...
//Cleanup and comment code
//Check mobile and modify accordingly
//link to portfolio

//Create Variables
var arrHeros = [];
var arrVillains = [];

var gameStatus = 0
var wins = 0

var $instructions = $(".js_instructions")
var $btnAttack = $("#btnAttack")
var $btnReset = $("#btnReset")

var wolverine 
var storm 
var rogue 
var magneto 
var mystique 
var pyro 
var challenger

$("#btnReset").on("click", function(){    
    resetGame()
})



function createCard(character,panel,position){
    //debugger;
    newCard =  $("<div>")
    newCard.addClass("card bg-dark text-light text-center js_char_card_1")
    newCardBody =  $("<div>")
    newCardBody.addClass("card-body")
    newCardHeader = $("<div>")
    newCardHeader.appendTo(newCard)
    newCardBody.appendTo(newCard)
    //debugger;
    newCardHeader
        .addClass("card-header bg-info")
        .text(character.name.toUpperCase())

        if (panel=="defender"){
            newCard.addClass("js_defender")

            let newCardFooter = $("<div>")
            newCardFooter
                .addClass("card-footer bg-success js_defenderHealth p-1")  
            newCardFooter.text("Health: " + character.healthPoints)          
            newCardFooter.appendTo(newCard)  

        }else if (panel=="challenger"){
            newCard.addClass("js_challenger")
            newBadge = $("<div>")
            newBadge.addClass("badge")
            newBadge.appendTo(newCardHeader)
            let newCardFooter = $("<div>")
            newCardFooter
                .addClass("card-footer bg-success js_challengerHealth p-1")  
            newCardFooter.text("Health: " + character.healthPoints)          
            newCardFooter.appendTo(newCard)    

        }
        
        
        
    
    
    newCard.appendTo(position)
    newImage = $("<img>")
    newImage.attr("src",character.imagePath)
    newImage.appendTo(newCardBody)
//debugger;
    if(panel == "character"){
        $(position).on("click", function () {   
            let arrDefenders = []
debugger;
            switch (character.name) {                
                case "Rogue":
                case "Storm":
                case "Wolverine":
                    arrDefenders = arrVillains
                    break;
                case "Magneto":
                case "Mystique":
                case "Pyro":
                    arrDefenders = arrHeros
                    break;

            }
           
            challenger = selectCharacter(character.name)
            createCard(challenger,"challenger","#challenger")
            //debugger;
            populateDefenders(arrDefenders)
             $(".js_character").remove();
         })

         
    }else if (panel=="defenders"){
         //debugger;
        $instructions.text("Choose opponent to fight!")

        $(position).on("click", function () { 
            $(".js_defender").remove()
            $instructions.text("Click Attack button to fight!")
            defender = selectCharacter(character.name)
            createCard(defender,"defender","#defender")           
            $(this).empty();
            $btnAttack.removeClass("invisible");
        })
            
    }

    

}


resetGame()
//Character Prototype
function Character(name, imagePath, attackPower,counterAttackPower){
    this.name = name;
    this.imagePath = imagePath;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
    this.healthPoints = 100;
    this.experience = 1;
}

function populateCharacterArrays(){
    arrHeros = []
    arrHeros.push(wolverine = new Character("Wolverine", "/assets/images/characters/wolverine.jpg", 32, 20))
    arrHeros.push(storm = new Character("Storm", "/assets/images/characters/storm.jpg", 33, 30))
    arrHeros.push(rogue = new Character("Rogue", "/assets/images/characters/rogue.jpg", 34, 75))

    arrVillains = []
    arrVillains.push(magneto = new Character("Magneto", "/assets/images/characters/magneto.jpg", 34, 75))
    arrVillains.push(mystique = new Character("Mystique", "/assets/images/characters/mystique.jpg", 32, 20))
    arrVillains.push(pyro = new Character("Pyro", "/assets/images/characters/pyro.jpg", 33, 30))
}
function populateDefenders(arrDefenders) {

    //Randomly Arrange Defenders
    for (var i = 1; i <= 3; i++) {
        let charIdx = Math.floor(Math.random() * arrDefenders.length)
        let character = arrDefenders[charIdx]
        createCard(character, "defenders", ".js_defender" + i)

        //Remove from array so duplicate won't be selected
        arrDefenders.splice(charIdx, 1)
    }
}
function resetGame() {

    gameStatus=0
    wins=0
    $btnReset.addClass("invisible");
        
    //let $challenger = $("")
    //let $defender = $("")
    
    //$("#defender").empty()
    $(".js_defenders").empty()
    $(".js_challenger").remove()
    $(".js_defender").remove()
   


    let $challengers = $("#challengers")
    $challengers.empty()

    for(var i = 1; i < 5;i++){
        $newSection = $("<section>")
        $newSection
            .attr("id", "character" + i)
            .addClass("col col-md-3 js_character")
        $newSection.appendTo($challengers)
    }
    
    populateCharacterArrays()
   
    $instructions.addClass("text-center text-light mt-4 p-4 bg-dark")
    $instructions.text("Choose your Champion!")

    //Randomly Select 2 Heros
    for (var i = 1; i < 3; i++) {
        charIdx = Math.floor(Math.random() * arrHeros.length)
        var character = arrHeros[charIdx]
        // $("#character" + i)
        //     .attr("src", character.imagePath)
        //     .attr("alt", character.name)
        createCard(character,"character","#character" + i)
        arrHeros.splice(charIdx, 1)
    }

    //Randomly Select 2 Villains
    for (var i = 3; i < 5; i++) {
        let charIdx = Math.floor(Math.random() * arrVillains.length)
        var character = arrVillains[charIdx]
        // $("#character" + i)
        //     .attr("src", character.imagePath)
        //     .attr("alt", character.name)
        //     .attr("data-value", arrVillains[charIdx].name.toLowerCase())
        createCard(character,"character","#character" + i)
        arrVillains.splice(charIdx, 1)
    }

    //Repopulate Charcter Arrays For Later Use
    populateCharacterArrays()
  
}

//Select Character When User Selects Image
function selectCharacter(characterName) {

    //var defenders = []

    switch (characterName) {
        case "Rogue":
            character = rogue
            defenders = arrVillains
            break;
        case "Storm":
            character = storm
            defenders = arrVillains
            break;
        case "Wolverine":
            character = wolverine
            defenders = arrVillains
            break;
        case "Magneto":
            character = magneto
            defenders = arrHeros
            break;
        case "Mystique":
            character = mystique
            defenders = arrHeros
            break;
        case "Pyro":
            character = pyro
            defenders = arrHeros
            break;
    }

    //Create image of Challenger and Defender on gameBoard
    // var newImg = $("<img>");
    // newImg.attr("src", character.imagePath);

    // if (position == "challenger") {
    //     newImg.attr("id", "challenger")
    // } else if (position == "defender") {
    //     newImg.attr("id", "defender")
    // }
    // newImg.appendTo($("#gameBoard"));
    // $(".js_choose_role").remove()

    // if (position == "challenger") {
    //     populateDefenders(defenders)
    // }

    return character
}



$("#btnAttack").on("click",function(){
    console.log("Challenger: " + challenger.imagePath)


    battle(challenger,defender)
})






//createCard(wolverine)





function testSimulator(attacker, defender1, defender2, defender3){

    while(gameStatus==0 && wins==0){
        battle(attacker,defender1)
        //debugger;

    }
    while(gameStatus==0 && wins==1){
        battle(attacker,defender2)
        //debugger;

    }
    while(gameStatus==0 && wins==2){
        battle(attacker,defender3)
        //debugger;

    }



}
//Magneto Attacks
//  gameStatus=0
//  wins=0  
//  testSimulator(magneto,storm,wolverine, rogue)
//  console.log("--------------------------------------------------------------------")
//  resetGame()
//  gameStatus=0
//  wins=0  
//  testSimulator(magneto,wolverine,storm, rogue)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(magneto,rogue,wolverine, storm)
// console.log("--------------------------------------------------------------------")
//Wolverine Attacks
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(wolverine,magneto,mystique, pyro)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(wolverine,mystique,pyro, magneto)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(wolverine,pyro,mystique, magneto)
// //Mystique Attacks
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(mystique,storm,wolverine, rogue)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(mystique,wolverine,storm, rogue)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(mystique,rogue,wolverine, storm)
// console.log("--------------------------------------------------------------------")

//Mystique Attacks
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(pyro,storm,wolverine, rogue)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(pyro,wolverine,storm, rogue)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(pyro,rogue,wolverine, storm)
// console.log("--------------------------------------------------------------------")



function battle(attacker, defender){
    console.log("START")
    console.log( attacker)
    console.log(defender)
    
    var playerStrength = (attacker.healthPoints * .01)
    var attackerPower = attacker.attackPower
    var playerAttack = Math.floor(attacker.experience * attacker.attackPower * playerStrength) 

    defender.healthPoints -= playerAttack

    

    attackerPower = attackerPower + 5
    attacker.attackPower = attackerPower

    let defenderHeathDisplay = $(".js_defenderHealth")
    //debugger;
    defenderHeathDisplay.text("Health: " + defender.healthPoints)

    if (defender.healthPoints < 80 && defender.healthPoints > 0) {
        defenderHeathDisplay.removeClass("bg-success")
        defenderHeathDisplay.addClass("bg-warning text-dark")
    }
    

    if(defender.healthPoints > 0){

        var defenderStrength =  (defender.healthPoints * .01)
        var defenderAttack = Math.floor(defender.counterAttackPower * defenderStrength) 
      
        attacker.healthPoints -= defenderAttack

        let challengerHeathDisplay = $(".js_challengerHealth")
        challengerHeathDisplay.text("Health: " + challenger.healthPoints)

        if (challenger.healthPoints < 80 && challenger.healthPoints > 0){
            challengerHeathDisplay.removeClass("bg-success")
            challengerHeathDisplay.addClass("bg-warning text-dark")
        }else if (challenger.healthPoints <=0){
            challengerHeathDisplay.removeClass("bg-success bg-warning")
            challengerHeathDisplay.addClass("bg-danger")
            challengerHeathDisplay.text("Health: 0")
            $btnAttack.addClass("invisible");
            $btnReset.removeClass("invisible");
        }

        

    }else{

        var $badge =  $(".badge")
        console.log("YOU WIN!")

        attacker.experience = attacker.experience + .25
        //battleStatus = 1
        wins = ++wins  
        debugger;
        $badge.html("<strong>" + wins + "</strong>");

        $(".js_defender").remove()
        $btnAttack.addClass("invisible");

        if(wins < 3 && attacker.healthPoints > 0){
            $instructions.text(attacker.name.toUpperCase() + " WINS! Choose next opponent!")
            
        }else{
            $btnReset.removeClass("invisible");
         
            $instructions.text(attacker.name.toUpperCase() + " UNDEFEATED CHAMPION!")
        }

    }
    
    console.log(attackerPower)
    //debugger;
    console.log("END")
    console.log(attacker)
    console.log(defender)

    
    if(attacker.healthPoints<=0){

        $(".js_challenger").addClass("challenger-defeated")
        $instructions.text(attacker.name.toUpperCase() + " was defeated by " + defender.name.toUpperCase())
        console.log("GAME OVER!")
        gameStatus = 1
    }


    
    
}
