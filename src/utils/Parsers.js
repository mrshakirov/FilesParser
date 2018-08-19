import JsZip from 'jszip'
import union from 'lodash/union'

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

export const getWordFrequency = async (convertedFiles) => {
  let parsedDictionaries = []
  let parsedKeys = []

  /**
   *  Asynchronously counting word frequency in parsedFiles
   */
  await Promise.all(
    convertedFiles.map(async file => {
      const wordFrequency = new WordFrequencyManager()
      wordFrequency.process(file.content)
      parsedDictionaries.push(wordFrequency.dict)
      parsedKeys.push(wordFrequency.keys)
    })
  )

  /**
   *  Combining all results into one and sorting by descending order
   */
  const wordFrequency = new WordFrequencyManager()
  wordFrequency.dict = sumObjectsByKey(...parsedDictionaries)
  wordFrequency.keys = union(...parsedKeys)

  wordFrequency.sortByCount()

  /**
   *  Structure data
   */
  let structuredData = []
  wordFrequency.keys.forEach(key => {
    structuredData.push(
      {
        word: key,
        occurrences: wordFrequency.dict[key]
      }
    )
  })

  /**
   *  return example: [ {word: 'cat', occurrences: 50}, {word: 'dog', occurrences: 40} … ]
   */
  return structuredData
}

class WordFrequencyManager {
  constructor() {
    this.dict = {};
    this.keys = [];
  }


  // Splitting up the text
  split(text) {
    return text.split(/\W+/);
  }

  // Validate a token
  validate(token) {
    return /\w{2,}/.test(token);
  }

  // Process new text
  process(data) {
    const tokens = this.split(data);
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].toLowerCase();

      if (this.validate(token)) {
        this.increment(token);
      }
    }
  }

  // An array of keys
  getKeys() {
    return this.keys;
  }

  // Get the count for a word
  getCount(word) {
    return this.dict[word];
  }

  // Increment the count for a word
  increment(word) {
    if (!this.dict[word]) {
      this.dict[word] = 1;
      this.keys.push(word);
    } else {
      this.dict[word]++;
    }
  }

  // Sort array of keys by counts
  sortByCount() {
    const concordance = this;

    function sorter(a, b) {
      return concordance.getCount(b) - concordance.getCount(a);
    }

    this.keys.sort(sorter);
  }

}

const sumObjectsByKey = (...objs) => {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k))
        a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}

