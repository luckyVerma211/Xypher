import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

const Card = ({ name, address, imgaddr, balance, pathroute }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[28rem] bg-zinc-900 text-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <img src={imgaddr} alt={name} className="w-12 h-12 rounded-full bg-white p-1" />
        <h2 className="text-lg font-semibold">{name}: <span className="font-normal">({balance})</span></h2>
      </div>
      <p className="text-sm break-all mb-4">
        Your {name} address: <br />
        <span className="text-gray-300">{address}</span>
      </p>
      <button
        onClick={() => navigate(pathroute)}
        className="btn btn-primary w-full"
        aria-label={`Send ${name}`}
      >
        Send {name}
      </button>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  imgaddr: PropTypes.string,
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pathroute: PropTypes.string.isRequired,
};

export default Card;
