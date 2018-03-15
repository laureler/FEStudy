var test: string = 'test', //String,
    calories: number = 300,  //numberic
    caloriesString: LongRange = 300,  //long
    task: Boolean = true

/**
 *
 * @param {string} food
 * @param {number} energy
 * @return {boolean}
 */
function speak(food: string, energy: number): boolean {
    if (food != null) {
        console.log(`our ${food} has ${energy} calories`)
        return true
    }
}
speak(test, <number>caloriesString)