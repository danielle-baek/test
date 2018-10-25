const blah = require('/.blah')
const fs = require('fs')
const path = require('path')
const server = require('../server')
const cheerio = require('cheerio')

test('Is test file working?', () => {
  expect(true).toBeTruthy()
})

// test if file contains text using readFile.
test('test ***', (done) => {
  // Arrange
  const fileName = path.join(__dir, '**file')
  const expected = '***'

  // Act
  fs.readFile(fileName, 'utf8', readFileFunc)

  // Assert
  const readFileFunc = (err, actual) => {
    expect(err).toBeNull()
    expect(actual).toContain(expected)

    done()
  }
})

test('Root route works', (done) => {
  request(server)
    .get('/')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      expect(err).toBeNull()
      const $ = cheerio.load(res.text)
      const actual = $('ul li').length
      expect(actual).toBe(4)
      done()
    })
})

test('/someone route works', (done) => {
  request(server)
    .get('/someone')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
      expect(err).toBeNull()
      const $ = cheerio.load(res.text)
      expect($('h1.welcome').text()).toMatch('Turing')
      done()
    })
})

// SEND a request to the route
// WAIT for a response
// WHEN the response comes,
// COMPARE it what with we expected it to be