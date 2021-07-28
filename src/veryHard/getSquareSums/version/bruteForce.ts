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

function populateBranches({
    paths,
    branches,
    branchIndices = []
}: {
    paths: number[][]
    branches: number[][]
    branchIndices?: number[]
}) {
    let indices: number[] = branchIndices

    if (indices.length === 0) {
        indices = [...branches.keys()]
    }

    indices.forEach(branchIndex => {
        const branch = branches[branchIndex]

        if (branch) {
            const lastItem = branch[branch.length - 1]
            const path = paths[lastItem - 1]

            for (const item of path) {
                if (!branch.includes(item)) {
                    branches.push([...branch, item])
        
                    populateBranches({
                        paths,
                        branches,
                        branchIndices: [branches.length - 1]
                    })
                }
            }            
        }
    })
}

export default (n: number): number[] | false => {
    const paths = getRootsPaths(n)
    const branches = getInitialBranches(paths)

    populateBranches({
        paths,
        branches
    })

    const validSquareSumsRows = branches.filter(branch => (
        getHavingValidSquareSums(branch) && branch.length === n
    ))
    const [squareSumsRow] = validSquareSumsRows

    console.log(
        "valid rows", validSquareSumsRows,
        "right answers amount", validSquareSumsRows.length,
    )

    return squareSumsRow?.length === n && squareSumsRow
}