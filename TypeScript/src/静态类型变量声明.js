var test = 'test', //String,
calories = 300, //numberic
caloriesString = 300, //long
task = true;
/**
 *
 * @param {string} food
 * @param {number} energy
 * @return {boolean}
 */
function speak(food, energy) {
    if (food != null) {
        console.log("our " + food + " has " + energy + " calories");
        return true;
    }
}
speak(test, caloriesString);
