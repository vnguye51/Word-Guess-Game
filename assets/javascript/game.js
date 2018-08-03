
var game = 
{   //Maybe retrieve names and images from databases later on
    difficulty: null,
    completed: [],
    nameList: null,
    imageList: null,
    easyList:  ['Kenshin Himura', 'Chihiro Ogino','Tohru Honda','Vash the Stampede','Yusuke Urameshi'],
    easyImageList:  ['Kenshin.png', 'Chihiro.jpg','Tohru.jpg','Vash.jpg','Yusuke.png'],
    mediumList: ['Hamtaro','Taiga Aisaka', "L Lawliet", 'Satou Kazuma','Zatch Bell'],
    mediumImageList: ['Hamtaro.png','Taiga.jpg','L.jpg','Kazuma.jpg','Zatch.jpg'],
    hardList: ['Megumi Shimizu','Vanilla Ice',  'Ozen the Immovable', 'Ayumu Aikawa','Himari Takakura'],
    hardImageList: ['Megumi.jpg','Vanilla.png','Ozen.png','Ayumu.png','Himari.png'],
    index: 0,
    name: '',
    nameSoFar: [],
    subScore: 0,
    score: 0,
    possibleScore: 0,
    targetscore: 0,
    previousGuesses: [],
    guessesLeft: 10,
    gameIntermission: false,


    start: function(difficulty)
    {   
        this.score = 0
        this.possibleScore = 0
        //Choose difficulty
        if (difficulty == 'hard')
        {
            this.difficulty = difficulty
            this.nameList = this.hardList.slice()
            this.imageList = this.hardImageList.slice()
        }
        else if (difficulty == 'medium')
        {
            this.difficulty = difficulty
            this.nameList = this.mediumList.slice()
            this.imageList = this.mediumImageList.slice()
        }
        else
        {
            this.difficulty = difficulty
            this.nameList = this.easyList.slice()
            this.imageList = this.easyImageList.slice()
        }

        //Initialize HTML to show selected boxes
        document.getElementById("Score").textContent = 'Score: ' + this.score + '|' + this.possibleScore
        document.getElementById('Guesses').removeAttribute("hidden")
        document.getElementById('SubScore').removeAttribute("hidden")
        document.getElementById('Tries').removeAttribute("hidden")
        document.getElementById('AnimePic').removeAttribute("hidden")
        document.getElementById('Characters').removeAttribute("hidden")
        document.getElementById('Score').removeAttribute('hidden')
        document.getElementById("EasyButton").setAttribute("hidden",true)
        document.getElementById("MediumButton").setAttribute("hidden",true)
        document.getElementById("HardButton").setAttribute("hidden",true)
        this.playAgain()
    },

    playAgain: function() 
    {
         //Reinitialize values
        this.possibleScore += 1
        this.gameIntermission = false
        this.previousGuesses = []
        this.nameSoFar = []
        this.subScore = 0;
        this.guessesLeft = 10;
        this.index = (Math.floor(Math.random()*(this.nameList.length)));
        this.name = (this.nameList[this.index]);

        document.getElementById('AnimePic').src = 'assets/images/' + this.imageList[this.index]

        //Loop through the name. Populate the nameSoFar(the correct letters so far) and also remove whitespace from counting towards the target score.
        this.targetscore = this.name.length
        for (var i = 0; i < this.name.length; i++)
        {
            this.nameSoFar.push('_');
            if (this.name[i] == ' ')
            {
                this.targetscore -= 1
                this.nameSoFar[i] = ' '
            }
        }

        // Remove index from possible choices
        this.nameList.splice(this.index,1)
        this.imageList.splice(this.index,1)   

        document.getElementById("Characters").textContent = 'Characters Left: ' + this.nameList.length
        document.getElementById("Win").setAttribute("hidden",true)
        document.getElementById("Lose").setAttribute("hidden",true);
        document.getElementById("Guesses").innerHTML = "Your guesses: " + this.previousGuesses.join('')
        document.getElementById("Tries").innerHTML = "Tries Left: " + this.guessesLeft
        document.getElementById("SubScore").innerHTML = this.nameSoFar.join('')
        document.getElementById("AgainButton").setAttribute("hidden",true)

    },


    // Function that loops through the name to see how many times the guess shows up
    checkGuess: function(c)
    {   var count = 0
        c = c.toLowerCase()
        for (var i = 0; i < this.name.length; i++)
        {  
            if (this.name[i].toLowerCase() === c)
            {
                count += 1;
                if ((i == 0) || ( this.name[i-1] == ' ')) //If the character is the first one or is after a space capitalize it
                {
                    this.nameSoFar[i] = c.toUpperCase()
                }
                else //Otherwise just output it normally
                {
                    this.nameSoFar[i] = c;
                }
                
            }
        }
        return count;
    },



    //Is called whenever a key is pressed. Contains win/loss logic.
    guess: function(c) 
    {
        if (!(this.previousGuesses.includes(c)))
        {
            this.previousGuesses.push(c);
            document.getElementById("Guesses").innerHTML = "Your guesses: " + this.previousGuesses.join('')

            //Grab how many times a guess appears using checkGuess
            var count = this.checkGuess(c)


            //If there is an instance of the guess, increment the score(# of characters matched)
            if (count != 0)
            {
                this.subScore += count;
                document.getElementById("SubScore").innerHTML = this.nameSoFar.join('')
                //If all characters have been matched: You win!
                if (this.subScore === this.targetscore)
                {
                    this.score += 1

                    if (this.nameList.length === 0) //If the array is empty offer to start a new difficulty
                    {
                        if (this.score === this.possibleScore)
                        {
                            this.completed.push(this.difficulty)
                        }
                        this.remainingDiff()
                    }
                    else
                    {
                        document.getElementById("AgainButton").removeAttribute("hidden")
                    }
                    
                
                    document.getElementById("Win").removeAttribute("hidden");
                    document.getElementById("Score").textContent = 'Score: ' + this.score + '|' + this.possibleScore
                    game.gameIntermission = true //{Pause key inputs until player clicks another button 
                }
            }

            //If there is not an instance of the guess, decrement guessesLeft
            else
            {
                this.guessesLeft -= 1;
                document.getElementById("Tries").innerHTML = "Tries Left: " + this.guessesLeft
                
                //If you run out of guesses you lose!
                if (this.guessesLeft === 0)
                {
                    if (this.nameList.length === 0)  //If the array is empty offer to start a new difficulty
                    {
                        
                        this.remainingDiff()
                    }
                    else
                    {
                        document.getElementById("AgainButton").removeAttribute("hidden")
                    }
                    document.getElementById("SubScore").textContent = this.name
                    document.getElementById("Lose").removeAttribute("hidden");
                    document.getElementById("Score").textContent = 'Score: ' + this.score + '|' + this.possibleScore
                    game.gameIntermission = true //Pause key inputs
                    
                    
                }
            }
        }
    },
    remainingDiff: function()
    {
        if (!(this.completed.includes('easy')))
        {
            document.getElementById("EasyButton").removeAttribute("hidden")
        }
        if (!(this.completed.includes('medium')))
        {
            document.getElementById("MediumButton").removeAttribute("hidden")
        }
        if (!(this.completed.includes('hard')))
        {
            document.getElementById("HardButton").removeAttribute("hidden")
        }
        if (this.completed.length === 3)
        {
            document.getElementById("Done").removeAttribute("hidden")
        }
    }
}


//Call the guess function on key input
document.onkeypress = function(event) {
    if (game.gameIntermission == false)
    {
        var c = event.key
        if ((c.charCodeAt(0) >= 97) && (c.charCodeAt(0) <= 122)) //Only allow a-z characters
        {
            game.guess(c)
        }
    }   

}

document.getElementById('EasyButton').onclick = function() {
    game.start('easy')
}

document.getElementById('MediumButton').onclick = function() {
    game.start('medium')
}
document.getElementById('HardButton').onclick = function() {
    game.start('hard')
}
