for (
    /**
     * This "for" allows controlling index
     * jumps, while traveling the array
     */
    let index = 0, item = array[index];

    index < array.length;

    item = array[++index]
) {
    console.log(item)

    const nextMeal = array[index + 1]

    if (nextMeal === 'someFoodIDontLike') {
        // skip that food
        index++
    }
}