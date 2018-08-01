
var game = 
{   //Maybe retrieve names and images from databases later on
    nameList: ['Rurouni Kenshin','Gary Oak','Joey Wheeler','Alphonse Elric', 'Chihiro','Genkai','Hamtaro','Ichigo Kurosaki','Inuyasha','Killua','Kirito','Krillin','Luffy','Renji','Sasuke Uchiha','Taiga Aisaka','Tohru Honda','Vash the Stampede','Yusuke Urameshi'],
    imageList: ['Kenshin.png','Gary.jpg','Joey.jpg', 'Alphonse.jpg','Chihiro.jpg','Genkai.jpg','Hamtaro.png','Ichigo.png','Inuyasha.jpg','Killua.png','Kirito.png','Krillin.png','Luffy.png','Renji.png','Sasuke.jpg','Taiga.jpg','Tohru.jpg','Vash.jpg','Yusuke.png'],
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


    start: function()
    {
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
        this.name = (this.nameList[this.index]).toLowerCase();

        document.getElementById('AnimePic').src = 'assets/images/' + this.imageList[this.index]
        document.getElementById("Characters").textContent = 'Characters Left: ' + this.nameList.length

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
            if (this.name[i] === c)
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
                    document.getElementById("Win").removeAttribute("hidden");
                    document.getElementById("AgainButton").removeAttribute("hidden")
                    document.getElementById("Score").textContent = 'Score: ' + this.score + '|' + this.possibleScore
                    game.gameIntermission = true

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
                    document.getElementById("Lose").removeAttribute("hidden");
                    document.getElementById("AgainButton").removeAttribute("hidden")
                    document.getElementById("Score").textContent = 'Score: ' + this.score + '|' + this.possibleScore
                    game.gameIntermission = true

                }
            }
        }
    }
}


//Call the guess function on key input
document.onkeypress = function(event) {
    if (game.gameIntermission == false)
    {
        var c = event.key.toLowerCase()
        if ((c.charCodeAt(0) >= 97) && (c.charCodeAt(0) <= 122)) //Only allow a-z characters
        {
            game.guess(c)
        }
    }   

}
