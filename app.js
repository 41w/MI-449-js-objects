// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey]['setup'] + '</p> <p>' + jokes[requestedJokeKey]['punchline'] + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  retrievelocalStorge()
  updateJokesMenu()
  updateDisplayedJoke()
}

// remember this joke
var newJoke = document.getElementById('rememberJoke')
var newName = document.getElementById('name')
var newSetup = document.getElementById('setup')
var newPunchline = document.getElementById('punchline')
var addJoke = function () {
  jokes[newName.value] = { 'setup': newSetup.value, 'punchline': newPunchline.value }
  savelocalStorage()
  updateJokesMenu()
}

// delete this joke
var forgetName = document.getElementById('forgetName')
var forgetJoke = document.getElementById('forgetJoke')
var deleteJoke = function () {
  if (jokes[forgetName.value]) {
    delete jokes[forgetName.value]
    savelocalStorage()
    updateJokesMenu()
  } else {
    window.alert('No matching joke found.')
  }
}

// save to localStorage
var savelocalStorage = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

// retrieve from localStorage
var retrievelocalStorge = function () {
  var oldJokes = JSON.parse(window.localStorage.getItem('jokes'))
  if (oldJokes === null) {
    oldJokes = jokes
    savelocalStorage()
  } else {
    jokes = oldJokes
  }
}
// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
newJoke.addEventListener('click', addJoke)
forgetJoke.addEventListener('click', deleteJoke)
