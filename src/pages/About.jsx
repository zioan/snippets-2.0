function About() {
  return (
    <section className=" max-w-[600px] text-xl  mt-[150px]">
      <p>
        <span className="text-2xl ">Snippets </span>
        is a web application designed to store code snippets.
      </p>
      <br />
      <p>
        It features search functionality and sorting by tags, syntax
        highlighting, warnings, notifications, and tooltips designed to improve
        user experience.
      </p>
      <br />
      <p>
        This project is in continuous development. New features and changes are
        made almost daily. Small screen style may be removed entirely due to the
        nature of this application.
      </p>
      <br />
      <p>
        I have a big ambition to develop this application and bring it to a
        higher level. New features like a bug tracking section following current
        trends and integration with ChatGPT are coming soon.
      </p>
      <br />
      <br />
      <h2 className="text-2xl ">
        Proudly made by{' '}
        <a className="underline" href="https://ioanzaharia.com" target="blank">
          Ioan Zaharia
        </a>
        .
      </h2>
    </section>
  )
}

export default About
