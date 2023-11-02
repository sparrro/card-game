const pointsEl = document.querySelector('.points')
const attemptsEl = document.querySelector('.attempts')
const cardEl = document.querySelector('.card')
const cardsLeftEl = document.querySelector('.cards-left')
const buttonEls = document.querySelectorAll('button')
let points = 0
let attempts = 3
let currentCard
let deck = []

for (i = 0; i<4; i++) {
    for (j = 2; j<15; j++) {
        let card = {}
        switch (i) {
            case 0:
                card.suite = '&hearts;'
                break;
            case 1:
                card.suite = '&clubs;'
                break;
            case 2:
                card.suite = '&diams;'
                break;
            case 3:
                card.suite = '&spades;'
        }
        card.value = j
        if (j<11) {
            card.valeur = j
        } else switch (j) {
            case 11:
                card.valeur = 'Kn'
                break;
            case 12:
                card.valeur = 'D'
                break;
            case 13:
                card.valeur = 'K'
                break;
            case 14:
                card.valeur = 'A'
        }
        deck.push(card)
    }
}

function shuffle(array) {
    let currentIndex = array.length
    let randomIndex
    while (currentIndex>0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
}
shuffle(deck)
deck.unshift({suite: 'win', value: '', valeur: 'you cannot'})

function setCardEl(card) {
    cardEl.innerHTML = `
        <div class="corner">
            <p>${card.suite}</p>
            <p>${card.valeur}</p>
        </div>
        <p>${card.suite}</p>
        <div class="corner">
            <p>${card.suite}</p>
            <p>${card.valeur}</p>
        </div>
    `
    if (card.suite == '&hearts;' || card.suite == '&diams;') {
        cardEl.querySelectorAll('.corner>p:first-child, .card>p:nth-child(2)').forEach(el => {
            el.classList.add('red')
        })
    }
    cardsLeftEl.innerHTML = `${deck.length} kort kvar`
}

function draw() {
    currentCard = deck[0]
    deck.shift()
}

draw()
setCardEl(currentCard)
let nextCard = deck[0]
deck.shift()

buttonEls[0].addEventListener('click', ()=> {
    if (nextCard.value<currentCard.value) {
        points++
        pointsEl.innerText = `${points}`
    } else {
        attempts--
        attemptsEl.innerText = `${attempts}`
    }
    setCardEl(nextCard)
    draw()
    nextCard = deck[0]
    if (attempts<1) {
        window.open('https://www.youtube.com/watch?v=BXB3VgWQGv8')
        location.reload()
    }
})

buttonEls[1].addEventListener('click', ()=> {
    if (nextCard.value==currentCard.value) {
        points++
        pointsEl.innerText = `${points}`
    } else {
        attempts--
        attemptsEl.innerText = `${attempts}`
    }
    setCardEl(nextCard)
    draw()
    nextCard = deck[0]
    if (attempts<1) {
        window.open('https://www.youtube.com/watch?v=BXB3VgWQGv8')
        location.reload()
    }
})

buttonEls[2].addEventListener('click', ()=> {
    if (nextCard.value>currentCard.value) {
        points++
        pointsEl.innerText = `${points}`
    } else {
        attempts--
        attemptsEl.innerText = `${attempts}`
    }
    setCardEl(nextCard)
    draw()
    nextCard = deck[0]
    if (attempts<1) {
        window.open('https://www.youtube.com/watch?v=BXB3VgWQGv8')
        location.reload()
    }
})