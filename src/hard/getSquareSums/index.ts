export function getHavingSquareRoot(number: number): boolean {
    return !!(Math.sqrt(number) % 1 === 0)
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

function getInitialBranch(paths: number[][]): number[][] {
    const pathBranches: number[][] = []

    for (let index = 0; index < paths.length; index++) {
        const path = paths[index]
        const [firstBranch] = path 

        if (path.length === 1) {
            const pathNode = index + 1

            pathBranches.push([pathNode, firstBranch])

            break
        }
    }

    return pathBranches
}

function populateBranches({
    paths,
    branches,
    branchIndex = 0
}: {
    paths: number[][]
    branches: number[][]
    branchIndex?: number
}) {
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
                    branchIndex: branches.length - 1
                })
            }
        }            
    }
}

export default (n: number): number[] | false => {
    const paths = getRootsPaths(n)
    const branches = getInitialBranch(paths)

    populateBranches({ paths, branches })

    const squareSumsRow = branches.find(branch => branch.length === n)

    return squareSumsRow || !!squareSumsRow
}