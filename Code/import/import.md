<h1>Import Subalias<img align="right" src="../../Data/images/main.png" width="100px"></h1>

Allows users (requires administrative privileges) to import custom made decks from generated JSONs to SVAR

## Deck Import
[Deck of Whatever You Want Generator](https://shadow-draconic-development.github.io/Avrae-Deck-of-Whatever-You-Want/) is where you go to generate custom decks.

- `Add Magic Deck`: Allows you to create a magic deck
    - `(Permanent Cards) Add Card`: Adds card that will shuffle back into the deck
    - `(Temporary Cards) Add Card`: Adds card that will not shuffle back into the deck
    - `(Deck) Add Deck`: Creates deck that will be generated when players use `!deckofcards add [deck name]`
        - `Weight`: Sets the weight of how often this particular deck will be generated (e.g. if you have a deck that is weighted 25 and another 75, the 25 weight deck will appear 25% of the time (25/(25 + 75) = 25%) (weight/total weight of all decks = chance of occuring)) 
        - `Add Card`: Adds card that will appear in this particular deck
- `Copy to Clipboard`: Copies JSON string to clipboard 

## Usage
`!deckofcards import [JSON string]`
- `JSON string`
    - Required
    - Simply paste the output of the JSON provided from generator

## Subalias Markdown
- `DoMT14`: [DoMT14](https://github.com/Shadow-Draconic-Development/Avrae-Deck-of-Whatever-You-Want/tree/main/Code/import/DoMT14/DoMT14.md)
- `DoMT24`: [DoMT24](https://github.com/Shadow-Draconic-Development/Avrae-Deck-of-Whatever-You-Want/tree/main/Code/import/DoMT24/DoMT24.md)
- `remove`: [remove](https://github.com/Shadow-Draconic-Development/Avrae-Deck-of-Whatever-You-Want/tree/main/Code/import/remove/remove.md)