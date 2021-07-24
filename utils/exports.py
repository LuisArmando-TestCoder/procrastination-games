import os

def getIndexExportContent(directories, additional):
    importPrefix = ''
    exportSuffix = 'export {\n'

    for directory in directories:
        importPrefix += f'import {additional} {directory} from \'./{directory}\'\n'
        exportSuffix += f'   {directory},\n'

    exportSuffix += '}\n'

    content = f'{importPrefix}\n{exportSuffix}'

    return content

def createIndexExportFile(folderPath, additional):
    for _, directories, _ in os.walk(folderPath):
        if len(directories) > 0:

            file = open(f'{folderPath}/index.ts',"w+")

            file.write(getIndexExportContent(directories, additional))

            file.close()
        break

def setFolderExports(folderNames, additional = ''):
    print('Automatic export defaults: ', folderNames)

    for folderName in folderNames:
        folderPath = f'../src/{folderName}'

        createIndexExportFile(folderPath, additional)

setFolderExports([
    '',
    'easy',
    'medium',
    'hard',
    'veryHard',
], '* as')