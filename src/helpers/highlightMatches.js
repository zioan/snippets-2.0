// another solution to highlight the search query in the code snippets must be found
// this one is too expensive in the DOM
// also it must happen dinamically, while the user is typing
export function highlightMatches(searchQuery) {
  const codeSections = document.querySelectorAll('.code-highlight')

  codeSections &&
    codeSections.forEach((codeSection) => {
      if (searchQuery.length < 3) return
      const regex = new RegExp(searchQuery, 'gi')

      codeSection.innerHTML = codeSection.innerHTML.replace(
        regex,
        '<span style="background-color: yellow">$&</span>',
      )
    })
}
