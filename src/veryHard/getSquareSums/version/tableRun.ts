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

function getRootsPaths(n: number): number[][] {
    const rootPaths: number[][] = []

    for (let i = 1; i <= n; i++) {
        rootPaths.push([])

        for (let j = 1; j <= n; j++) {
            if (i === j) continue

            if (getHavingSquareRoot(i + j)) {
                rootPaths[i - 1].push(j)
            }
        }
    }

    return rootPaths
}

function getInitialBranches(paths: number[][]): number[][] {
    const pathBranches: number[][] = []
    // tomar el path más ´pequenño y su index + 1
    for (let index = 0; index < paths.length; index++) {
        const path = paths[index]
        const pathNode = index + 1
        const setInitialBranches = () => {
            pathBranches.splice(0)            
            path.forEach((branch, index) => {
                pathBranches[index] = []
                pathBranches[index][0] = pathNode
                pathBranches[index][1] = branch
            })
        }

        if (!pathBranches[0]) {
            setInitialBranches()
        }

        if (pathBranches.some(pathBranch => (
            pathBranch?.length > path.length
        ))) {
            setInitialBranches()
        }

        if (path.length === 1) {
            break
        }
    }

    return pathBranches
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

        // spin <<paths.length - 2>> times
        for (let _ = 2; _ < paths.length; _++) {
            // take the last element of each path
            // ... that is not present in branches
            for (let j = getCarryPath().length - 1; j >= 0; j--) {
                if (!branches[index].includes(
                    getCarryPath()[j]
                )) {
                    branches[index].push(getCarryPath()[j])

                    break
                }
            }
        }
    })

    return branches
}

export default (n: number): number[] | false => {
    const paths = getRootsPaths(n)
    const branches = getBranches(paths)

    const validSquareSumsRows = branches.filter(branch => (
        getHavingValidSquareSums(branch) && branch.length === n
    ))
    const [squareSumsRow] = validSquareSumsRows

    console.log(
        "paths", paths,
        "\nbranches", branches
    )

    return squareSumsRow || false
}