function About() {
  return (
    <section>
      <section className=' max-w-[600px] text-xl'>
        <p>
          <span className=' text-2xl'>Snippets </span>
          is a web application designed to store code snippets.
        </p>
        <br />
        <p>
          It features search functionality and sorting by tags, smart features
          like syntax highlighting, closing modals with "Escape" key, warnings,
          messages and tooltips designed to improve user experience.
        </p>
        <br />
        <p>
          <span className=' text-xl'>Snippets </span> is fully responsive but
          designed mainly for large screens.{' '}
        </p>
        <br />
        <h2 className=' text-3xl'>
          Proudly made by{' '}
          <a
            className='underline'
            href='https://ioanzaharia.com'
            target='blank'
          >
            Ioan Zaharia
          </a>
          .
        </h2>
      </section>
    </section>
  );
}

export default About;
