function Footer() {
  const footerYear = new Date().getFullYear()
  return (
    <footer className="p-6 text-center bg-gray-700 text-primary-content">
      <p>
        Copyright &copy; {footerYear}. Made by{' '}
        <a className="underline " href="https://ioanzaharia.com" target="blank">
          Ioan Zaharia
        </a>
      </p>
    </footer>
  )
}

export default Footer
