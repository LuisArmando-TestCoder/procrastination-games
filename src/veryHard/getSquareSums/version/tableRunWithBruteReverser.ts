export function getHavingSquareRoot(number: number): boolean {
    return !!(Math.sqrt(number) % 1 === 0)
}

export function getHavingValidSquareSums(sequence: number[] | false) {
    let havingValidSquareSums = false
    
    if (Array.isArray(sequence)) {
        let [carry] = sequence

        for (const item of sequence.slice(1)) {
            havingValidSquareSums = getHavingSquareRoot(carry + item)
            carry = item

            if (!havingValidSquareSums) break
        }
    }

    return havingValidSquareSums
}

function getNRoots(number: number): number[] {
    const max = Math.floor(Math.sqrt(number + (number - 1)))

    return [...new Array(max - 1).keys()].map(
        index => (index + 2) ** 2
    )
}

function getRootsPaths(number: number): number[][] {
    const nRoots = getNRoots(number)
    const rootPaths: number[][] = []

    for (let index = 1; index <= number; index++) {
        rootPaths.push([
            ...nRoots
            .map(root => Math.abs(index - root))
            .filter(element => (
                element
             && element <= number
             && index !== element
             && getHavingSquareRoot(index + element)
            ))
        ])
    }

    return rootPaths
}

function getBranches(paths: number[][]) {
    const branches: number[][]  = []

    Object.keys(paths).forEach((pathKey: string) => {
        const index = Number(pathKey)
        const pathNode = index + 1
        const path = paths[index]

        branches.push([
            pathNode,
            path[path.length - 1]
        ])

        const getCarryPath = () => paths[
            branches[index][
                branches[index].length - 1
            ] - 1
        ]
        const setCarryPath = (j: number): boolean => {
            const canBreak = !branches[index].includes(
                getCarryPath()[j]
            )

            if (canBreak) {
                branches[index].push(getCarryPath()[j])
            }

            return canBreak
        }

        // spin <<paths.length - 2>> times
        for (let pathIndex = 2; pathIndex < paths.length; pathIndex++) {
            if (pathIndex < paths.length / 2) {
                // pick upper half
                for (let j = getCarryPath().length - 1; j >= 0; j--) {
                // take the last element of each path
                // ... that is not present in branches
                    if (setCarryPath(j)) break
                }
            } else if (pathIndex >= Math.floor(paths.length / 2)) {
                // pick lower half
                for (let j = 0; j < getCarryPath().length; j++) {
                    // take the first element of each path
                    // ... that is not present in branches
                    if (setCarryPath(j)) break
                }
            }            
        }
    })

    return branches
}

function getPossibilities({
    path,
    branch,
}: {
    path: number[]
    branch: number[]
}): number[] {
    return path.filter(possibility => (
        !branch.includes(possibility)
    ))
}

// get correct version of the given branch
function getReverseBranches(paths: number[][], branch: number[]) {
    const newBranches = []

    for (const number of [...branch].reverse()) {
        const index = branch.indexOf(number)
        const path = paths[number - 1]
        const possibilities = getPossibilities({
            path, branch: branch.slice(0, index)
        })

        if (possibilities.length > 1) {
            const branches = getBranchesFromBranch(
                branch.slice(0, index),
                paths
            )
            const validBranches = getValidBranches(branches, number)

            if (validBranches.length) {
                newBranches.push(...validBranches)
            }
        }
    }

    return newBranches
}

function getBranchesFromBranch(
    branch: number[],
    paths: number[][],
    branches: number[][] = []
): number[][] {
    const path = paths[
        branch[
            branch.length - 1
        ] - 1
    ]
    const possibilities = getPossibilities({
        path, branch: branch.slice(0, branch.length - 1)
    })
    const canReturnBranches = branch.length === paths.length

    if (canReturnBranches) {
        return branches
    }

    branches.push(
        ...possibilities.map(possibility =>
            (
                [...branch, possibility]
            )
        )
    )

    console.log(branches)

    return getBranchesFromBranch(
        branch,
        paths,
        branches
    )
}

function getValidBranches(branches: number[][], number: number): number[][] {
    return branches.filter(branch => (
        getHavingValidSquareSums(branch) && branch.length === number
    ))
}

export default (number: number): number[] | false => {
    const paths = getRootsPaths(number)
    const branches = getBranches(paths)
    const reverseBranches = [branches.filter(
        branch => (
            branch.length >= number * .9 // why .9
        )
    )[0]].map(branch =>
        getValidBranches(
            getReverseBranches(
                paths,
                branch
            ),
            number
        )
    )

    console.log(
        "\reverseBranches\n", reverseBranches
    )

    const [validBranch] = getValidBranches(branches, number)

    return validBranch || false
}