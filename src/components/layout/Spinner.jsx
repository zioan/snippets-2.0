import spinner from "../assets/spinner.gif";

function Spinner({ classes = "" }) {
  return (
    <img
      className={`w-20 mx-auto mb-16 block ${classes}`}
      // className='block w-20 mx-auto mb-16 '
      src={spinner}
      alt="Loading data..."
    />
  );
}

export default Spinner;
