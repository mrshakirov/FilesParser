import {getWordFrequency} from '../Parsers'
import {convertedFilesSample} from './TestData'
import {parsedFilesSample} from './TestData'

test('Converted files parsing correctly', () => {
  return expect(getWordFrequency(convertedFilesSample)).resolves.toEqual(parsedFilesSample)
})