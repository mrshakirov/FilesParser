import JsZip from 'jszip'

export const parseZipFile = async (file) => {
  let textFiles = []

  const zipFile = await new JsZip().loadAsync(file)
  const fileNames = Object.keys(zipFile.files)

  for (let i = 0; i < fileNames.length; i++) {
    if (fileNames[i].split('.').pop() === 'zip') {
      // Inner .zip files are not parsed in this version of the app
      continue
    } else if (fileNames[i].split('.').pop() !== 'txt') {
      // Non .txt files are not parsed in this version of the app
      continue
    }

    const textFileContent = await zipFile.file(fileNames[i]).async('string')
    textFiles.push({name: fileNames[i], content: textFileContent})
  }

  return textFiles
}

export const parseTextFile = (file) => {
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result)
    }
    temporaryFileReader.readAsText(file)
  })
}

export const countWords = (text) => {
  return text.content.replace(/^\s+|\s+$/g,"").split(/\s+/).length
}
