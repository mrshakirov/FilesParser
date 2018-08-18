import JsZip from 'jszip'

export const parseZipFile = async (file) => {
  let textFiles = []
  let innerZips = []
  const fileData = file.data ? file.data : file

  const zipFile = await new JsZip().loadAsync(fileData)
  const fileNames = Object.keys(zipFile.files)

  for (let i = 0; i < fileNames.length; i++) {
    let fileName = fileNames[i]
    const fileExtension = fileName.split('.').pop()

    if (fileName.includes('__MACOSX')) {
      // Ignore Mac OS resource forks
      continue
    }

    if (fileExtension === 'txt') {
      const textFileContent = await zipFile.file(fileName).async('string')

      // Get only file name, without path
      if (fileName.includes('/')) {
        fileName = fileName.split('/').pop()
      }

      textFiles.push({name: fileName, content: textFileContent})
    } else if (fileExtension === 'zip') {
      const data = await zipFile.file(fileName).async('blob')
      innerZips.push({data})
    }
  }

  return {textFiles, innerZips}
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

