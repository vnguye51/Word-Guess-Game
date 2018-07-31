
var game = 
{
    nameList: ['Genkai','Hamtaro','Inuyasha','Killua','Kirito','Krillin','Taiga Aisaka','Yusuke Urameshi'],
    imageList: ['Genkai.jpg','Hamtaro.png','Inuyasha.jpg','Killua.png','Kirito.png','Krillin.png','Taiga.jpg','Tohru.jpg','Yusuke.png'],
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
        console.log('assets/images/' + this.imageList[this.index])

        document.getElementById("Win").setAttribute("hidden",true)
        document.getElementById("StartButton").setAttribute("hidden",true)
        document.getElementById("Lose").setAttribute("hidden",true);
        document.getElementById("Guesses").innerHTML = "Your guesses: " + this.previousGuesses.join()
        document.getElementById("Tries").innerHTML = "Tries Left: " + this.guessesLeft
        document.getElementById("Score").innerHTML = this.nameSoFar
    },

    checkGuess: function(c)
    {   var count = 0
        c = c.toLowerCase()
        console.log(c)
        console.log(this.name)
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

    guess: function(character) 
    {
        var x = character.key;
        if (!(this.previousGuesses.includes(x)))
        {
            this.previousGuesses.push(x);
            document.getElementById("Guesses").innerHTML = "Your guesses: " + this.previousGuesses.join()

            var count = this.checkGuess(x)

            if (count != 0)
            {
                this.score += count;
                document.getElementById("Score").innerHTML = this.nameSoFar
                if (this.score === this.name.length)
                {
                    document.getElementById("Win").removeAttribute("hidden");
                    document.getElementById("StartButton").removeAttribute("hidden")
                }
            }

            else
            {
                this.guessesLeft -= 1;
                document.getElementById("Tries").innerHTML = "Tries Left: " + this.guessesLeft
                if (this.guessesLeft === 0)
                {
                    document.getElementById("Lose").removeAttribute("hidden");
                    document.getElementById("StartButton").removeAttribute("hidden")

                }
            }
        }
    }

}

game.start()

