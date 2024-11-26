function About() {
  return (
    <section className="max-w-[800px] text-xl mt-[150px] space-y-8">
      {/* Introduction */}
      <div className="space-y-4">
        <h1 className="mb-6 text-3xl font-bold">
          About <span className="text-accent">Snippets</span>
        </h1>
        <p>
          Snippets is your personal code library - a modern web application designed to help developers organize, manage, and share code snippets
          efficiently. Create a searchable collection of your most-used code blocks, complete with syntax highlighting and smart tagging for quick
          retrieval. Optimized for desktop use, this tool focuses on providing the best code management experience on larger screens where developers
          do most of their work.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Core Features</h2>
        <ul className="space-y-2 list-none">
          <li className="flex items-start">
            <span className="mr-2 text-accent">→</span>
            <span>Powerful search functionality across snippet titles and code content</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-accent">→</span>
            <span>Smart tag organization system with custom categories</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-accent">→</span>
            <span>Professional code editor with syntax highlighting</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-accent">→</span>
            <span>Instant snippet sharing with secure links</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-accent">→</span>
            <span>Dark/Light theme support for comfortable coding</span>
          </li>
        </ul>
      </div>

      {/* Development Status */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Development Status</h2>
        <p>Snippets is actively maintained with regular updates and improvements.</p>
      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-base-300">
        <h2 className="text-2xl">
          Crafted with passion by{" "}
          <a className="transition-all text-accent hover:underline" href="https://ioanzaharia.com" target="_blank" rel="noopener noreferrer">
            Ioan Zaharia
          </a>
        </h2>
      </div>
    </section>
  );
}

export default About;
