# Files Parser App
<p align="center">
  <img src="https://gdurl.com/7Uun">
</p>
<p align="center">
  <b><a href="https://sergvolynkin.github.io/FilesParser/">See This Application Live</a></b>
</p>

This is a test challenge for an interview

It is a React app that parses text files and outputs a histogram of the word frequency in files
```text
Note:
— App fetches data from nested folders
— App can parse *.txt files
— *.txt files also can be extracted from *.zip archives automatically
— *.txt files can be mixed with other files, app will ignore them
— *.zip files can be nested in each other
```

## How to run

1. Clone the project
```shell
git clone https://github.com/SergVolynkin/FilesParser.git 
cd FilesParser
```

2. Install dependencies
```shell
npm install
```

3. Run
```shell
npm start
```

## How to use

1. Select Directory (some browsers only provide possibility to select multiple files instead of the directory)
2. View the report based on passed files 
   - Hover on histogram's bar to see detailed information — tooltip will appear
   - Click arrows in right bottom corner to change pages of data
3. Click "CREATE ANOTHER REPORT" to go back to the files uploading

## Tests

To run all tests
```shell
npm test
```

## Browser support

All modern browsers are supported (including IE11)

## About tech stack

Implementing this application I used:
* **create-react-app** to bootstrap application
* **material-ui** for UI
* **core-js** for legacy browsers support
* **jszip** for working with *.zip files
* **recharts** for histogram implementation
