import os

def createFile(path, file, content = ""):
    file = open(f"{path}/{file}", "w")

    file.write(content)
    file.close()

difficulty = input("Difficulty: ").strip()
name = input("cammelCaseChallengeName: ").strip()
path = f"../src/{difficulty}/{name}"

os.mkdir(path)

createFile(path, "challenge.md")
createFile(path, "index.ts", "export default () => 0")
createFile(
    path,
    "index.test.ts",
    f"import {name} from '.'\n\ntest('', () => null)"
)