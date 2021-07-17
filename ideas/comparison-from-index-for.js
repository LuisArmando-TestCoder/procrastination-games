/**
 * array = [23,34,45,56]
 * 
 * 23 34
 * 23 45
 * 23 56
 * 
 * 34 45
 * 34 56
 * 
 * 45 56
 */

for (const [index, item] of array.entries()) {
    for (
        const comparison of array.slice(index + 1)
    ) {
        console.log(item, comparison)
    }
}