import spinner from '../assets/spinner.gif'

function Spinner() {
  return (
    <img
      className=' w-20 mx-auto mb-16 block'
      src={spinner}
      alt='Loading data...'
    />
  )
}

export default Spinner
