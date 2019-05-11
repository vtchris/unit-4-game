//TODO 
//Check mobile and modify accordingly
//link to portfolio

//Create Variables
var arrHeros = [];
var arrVillains = [];

var gameStatus = 0
var wins = 0

var $btnAttack = $("#btnAttack")
var $btnReset = $("#btnReset")
var $challengers = $("#challengers")
var $defendersHeaderRow = $("#defendersHeaderRow")
var $gameBoard = $("#gameBoard")
var $instructions = $(".js_instructions")
var $report1 = $("#report1")
var $report2 = $("#report2")

var wolverine 
var storm 
var rogue 
var magneto 
var mystique 
var pyro 
var challenger

$("#btnAttack").on("click",function(){
   
    battle(challenger,defender);
    
})

$("#btnReset").on("click", function(){    

    //resetGame();
    populateCharacterArrays();
    resetGame(arrHeros.slice(0),arrVillains.slice(0))

})

populateCharacterArrays();
resetGame(arrHeros.slice(0),arrVillains.slice(0))
//resetGame()

function battle(challenger, defender){
    //  console.log("START")
    //  console.log(challenger)
    //  console.log(defender)
    
    //Determine Strength and Power of Attacker
    let playerStrength = (challenger.healthPoints * .01)
    let playerPower = challenger.attackPower
    let playerAttack = Math.floor(challenger.experience * playerPower * playerStrength) 
    $report1.text("You attacked " + defender.name + " for " + playerAttack + " points of damage.")

    //Apply Damage to Defender
    defender.healthPoints -= playerAttack
    let $defenderHeathDisplay = $(".js_defenderHealth")
    $defenderHeathDisplay.text("Health: " + defender.healthPoints)
    

    if(defender.healthPoints > 0){

        if (defender.healthPoints < 80) {
            $defenderHeathDisplay.removeClass("bg-success")
            $defenderHeathDisplay.addClass("bg-warning text-dark")
        }

        //Apply Counter Attack
        let defenderStrength =  (defender.healthPoints * .01)
        let defenderAttack = Math.floor(defender.counterAttackPower * defenderStrength) 
     
        challenger.healthPoints -= defenderAttack

        let challengerHeathDisplay = $(".js_challengerHealth")
        challengerHeathDisplay.text("Health: " + challenger.healthPoints)
        $report2.text(defender.name + " attacked you back for " + defenderAttack + " points of damage.")

        if (challenger.healthPoints <= 0) {
            //Player Defeated
            //console.log("GAME OVER!")
    
            gameStatus = 1
            challengerHeathDisplay.removeClass("bg-success bg-warning")
            challengerHeathDisplay.addClass("bg-danger")
            challengerHeathDisplay.text("Health: 0")
                      
            $(".js_challenger").addClass("challenger-defeated")
            $instructions.text(challenger.name.toUpperCase() + " was defeated by " + defender.name.toUpperCase())
                                  
            $btnAttack.addClass("display_none");
            $btnReset.removeClass("display_none");

        } else {
            //Increment Player Power for next round
            playerPower = playerPower + 5
            challenger.attackPower = playerPower
            if (challenger.healthPoints < 80 && challenger.healthPoints > 0){
                challengerHeathDisplay.removeClass("bg-success")
                challengerHeathDisplay.addClass("bg-warning text-dark")
            }        
        }  
    }else{
        //console.log("YOU WIN!")

        //Increment Wins
        wins = ++wins  
        var $badge =  $(".badge")
        $badge.html("<strong>" + wins + "</strong>");
        $report2.empty();
        
        
        //Clear Defender and Remove Attack button
        $("#defender").empty()
        $btnAttack.addClass("display_none");

        if(wins < 3 && challenger.healthPoints > 0){
            //Increment Player Power for next round
            playerPower = playerPower + 5
            challenger.attackPower = playerPower
            challenger.experience = challenger.experience + .25
            $instructions.text(challenger.name.toUpperCase() + " WINS! Choose next opponent!")
                      
        }else{
            $btnReset.removeClass("display_none");
         
            $instructions.text(challenger.name.toUpperCase() + " UNDEFEATED CHAMPION!")
        }

    }
         
    //  console.log(challenger)
    //  console.log(defender)
    //  console.log(playerPower)
    //  console.log("END")
}

//Character Prototype
function Character(name, imagePath, attackPower,counterAttackPower){
    this.name = name;
    this.imagePath = imagePath;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
    this.healthPoints = 100;
    this.experience = 1;
}

//Create Character Bootstrap Cards
//panel = row/area; position = position within area
function createCard(character, panel, position) {
    
    newCard = $("<div>")
    newCard.addClass("card bg-dark text-light text-center mb-2")
    newCardHeader = $("<div>")
    newCardHeader.appendTo(newCard)
    newCardBody = $("<div>")
    newCardBody.addClass("card-body")   
    newCardBody.appendTo(newCard)
    newImage = $("<img>")
    newImage.attr("src", character.imagePath)
    newImage.appendTo(newCardBody)
   
    newCardHeader
        .addClass("card-header bg-info")
        .text(character.name.toUpperCase())

    if (panel == "defender") {
        
        newCard.addClass("js_defender")

        let newCardFooter = $("<div>")
        newCardFooter
            .addClass("card-footer bg-success js_defenderHealth p-1")
            .text("Health: " + character.healthPoints)        
        newCardFooter.appendTo(newCard)

    } else if (panel == "challenger") {
        newCard.addClass("js_challenger")
        newBadge = $("<div>")
        newBadge.addClass("badge")
        newBadge.appendTo(newCardHeader)
        let newCardFooter = $("<div>")
        newCardFooter
            .addClass("card-footer bg-success js_challengerHealth p-1")
            .text("Health: " + character.healthPoints)
        newCardFooter.appendTo(newCard)
    }

    newCard.appendTo(position)
     
    if (panel == "character") {
        
        $(position).on("click", function () {
            let arrDefenders = []

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

            $defendersHeaderRow.removeClass("display_none")
            challenger = selectCharacter(character.name)
            createCard(challenger, "challenger", "#challenger")
            
            $(".js_character").remove();
            
            for (var i = 1; i < 4; i++) {
                $newSection = $("<section>")
                $newSection
                    .attr("id", "defender" + i)
                    .addClass("col col-md-3 js_defender")

                $newSection.appendTo($challengers)

            }

            $gameBoard.removeClass("display_none");           
            populateDefenders(arrDefenders.slice(0));

        })

    } else if (panel == "defenders") {

        $instructions.text("Choose opponent to fight!")
       
        $(position).on("click", function () {
            

            if ($(".js_defenderHealth")[0]){
                $instructions.text("Oponent selected; please click ATTACK button.")
                
            }else{
                $instructions.text("Click Attack button to fight!")
                defender = selectCharacter(character.name)
                createCard(defender, "defender", "#defender")
                $(this).empty();
                $btnAttack.removeClass("display_none");
                $report1.empty();
                $report2.empty();
                $(window).scrollTop($("#top").offset().top);
                if(wins=="2"){
                    $defendersHeaderRow.addClass("display_none")
                }
               
            }
          
            
            
        })

    }

}


function populateCharacterArrays(){
    arrHeros = []
    arrHeros.push(wolverine = new Character("Wolverine", "assets/images/characters/wolverine.jpg", 32, 20))
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
        createCard(character, "defenders", "#defender" + i)
       
        arrDefenders.splice(charIdx, 1)
    }
}
function resetGame(Heros,Villains) {

    gameStatus=0
    wins=0
    $btnReset.addClass("display_none");
            
    $(".js_defenders").empty()
    $(".js_challenger").remove()
    $(".js_defender").remove()
    $report1.empty();
    $report2.empty();
   $gameBoard.addClass("display_none")
   $btnAttack.addClass("display_none")
   $btnReset.addClass("display_none")
    
    var audio = new Audio("assets/sound/welcomeprof.wav");
    audio.play();
    
    $challengers.empty()
    
    for(var i = 1; i < 5;i++){
        $newSection = $("<section>")
        $newSection
            .attr("id", "character" + i)
            .addClass("col col-md-3 js_character")
        $newSection.appendTo($challengers)
    }
    
    //populateCharacterArrays()
   
    $instructions.addClass("text-center text-light mt-4 p-4 bg-dark")
    $instructions.text("Choose your Champion!")

    //Randomly Select 2 Heros
    for (var i = 1; i < 3; i++) {
        charIdx = Math.floor(Math.random() * Heros.length)
        var character = Heros[charIdx]
        createCard(character,"character","#character" + i)
        Heros.splice(charIdx, 1)
    }

    //Randomly Select 2 Villains
    for (var i = 3; i < 5; i++) {
        let charIdx = Math.floor(Math.random() * Villains.length)
        var character = Villains[charIdx]
        createCard(character,"character","#character" + i)
        Villains.splice(charIdx, 1)
    }
       
    //Repopulate Charcter Arrays For Later Use
    //populateCharacterArrays()
 
}

//Select Character When User Selects Image
function selectCharacter(characterName) {

    switch (characterName) {
        case "Rogue":
            character = rogue 
            break;
        case "Storm":
            character = storm
            break;
        case "Wolverine":
            character = wolverine
            break;
        case "Magneto":
            character = magneto         
            break;
        case "Mystique":
            character = mystique          
            break;
        case "Pyro":
            character = pyro            
            break;
    }
  
    return character
}










//TESTING PURPOSES ONLY BELOW

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
// gameStatus=0
// wins=0  
// testSimulator(magneto,storm,wolverine, rogue)
// console.log("--------------------------------------------------------------------")
// resetGame()
// gameStatus=0
// wins=0  
// testSimulator(magneto,wolverine,storm, rogue)
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
