function duplicateCount(text) {
  // Normalize the input
  text = String(text).toLocaleLowerCase()

  const countTracker = {}

  // Iterate over text
  text.split("").forEach(character => {
    // Store characters and their count in an object
    countTracker[character] = countTracker[character] ? ++countTracker[character] : 1
  })
  console.log(countTracker)
  // Loop through the object values and count how many are above 1
  Object.values(countTracker).map(value => console.log(value))

  // Return the result
  console.log(text)
}

duplicateCount("tes2T")
