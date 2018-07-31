
var game = 
{
    nameList: ['Chihiro','Genkai','Hamtaro','Ichigo','Inuyasha','Killua','Kirito','Krillin','Luffy','Renji','Sasuke','Taiga Aisaka','Tohru Honda','Vash the Stampede','Yamcha.jpg','Yusuke Urameshi'].sort(),
    imageList: ['Chihiro.jpg','Genkai.jpg','Hamtaro.png','Ichigo.png','Inuyasha.jpg','Killua.png','Kirito.png','Krillin.png','Luffy.png','Renji.png','Sasuke.jpg','Taiga.jpg','Tohru.jpg','Vash.jpg','Yamcha.jpg','Yusuke.png'].sort(),
    index: 0,
    name: '',
    nameSoFar: [],
    score: 0,
    previousGuesses: [],
    guessesLeft: 10,

    start: function() 
    {
        this.previousGuesses = []
        this.nameSoFar = []
        this.score = 0;
        this.guessesLeft = 10;
        this.index = (Math.floor(Math.random()*(this.nameList.length)));
        this.name = (this.nameList[this.index]).toLowerCase();
        document.getElementById('AnimePic').src = 'assets/images/' + this.imageList[this.index]
        console.log('1');

        console.log(this.name);
        console.log(this.name.length);
        for (var i = 0; i < this.name.length; i++)
        {
            this.nameSoFar.push('_');
        }
        console.log('2')

        

        // Remove index from possible choices
        this.nameList.splice(this.index,1)
        this.imageList.splice(this.index,1)

       
       

        document.getElementById("Win").setAttribute("hidden",true)
        document.getElementById("StartButton").setAttribute("hidden",true)
        document.getElementById("Lose").setAttribute("hidden",true);
        document.getElementById("Guesses").innerHTML = "Your guesses: " + this.previousGuesses.join('')
        document.getElementById("Tries").innerHTML = "Tries Left: " + this.guessesLeft
        document.getElementById("Score").innerHTML = this.nameSoFar.join('')
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
                this.nameSoFar[i] = c
            }
        }
        return count;
    },


    //Is called whenever a key is pressed. Contains win/loss logic.
    guess: function(event) 
    {
        var c = event.key;
        if (!(this.previousGuesses.includes(c)))
        {
            this.previousGuesses.push(c);
            document.getElementById("Guesses").innerHTML = "Your guesses: " + this.previousGuesses.join('')

            //Grab how many times a guess appears using checkGuess
            var count = this.checkGuess(c)


            //If there is an instance of the guess, increment the score(# of characters matched)
            if (count != 0)
            {
                this.score += count;
                document.getElementById("Score").innerHTML = this.nameSoFar.join('')
                //If all characters have been matched: You win!
                if (this.score === this.name.length)
                {
                    document.getElementById("Win").removeAttribute("hidden");
                    document.getElementById("StartButton").removeAttribute("hidden")
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
                    document.getElementById("StartButton").removeAttribute("hidden")

                }
            }
        }
    }
}


//Initialize the values on page load
game.start()


//Call the guess function on key input
document.onkeyup = function(event) {
    if ((event.key.charCodeAt(0) >= 97) && (event.key.charCodeAt(0) <= 122) || (event.key.charCodeAt(0) === 32)) //Only allow a-z characters
    {
        game.guess(event)
    }
    

}


