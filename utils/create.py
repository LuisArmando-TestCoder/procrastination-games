import os

def createFile(difficulty, name, file, content = ""):
    path = f"../src/{difficulty}/{name}"

    os.mkdir(path)

    file = open(f"{path}/{file}", "w")

    file.write(content)
    file.close()

difficulty = input("Difficulty: ").strip()
name = input("cammelCaseChallengeName: ").strip()

createFile(difficulty, name, "challenge.md")
createFile(difficulty, name, "index.ts", "export default () => 0")
createFile(
    difficulty,
    name,
    "index.test.ts",
    f"import {name} from '.'\n\nexpect('', () => null)"
)
createFile(difficulty, name, "solution.md")