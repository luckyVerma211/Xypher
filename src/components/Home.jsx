import {useNavigate} from 'react-router';


const Home=()=>{
  const navigate=useNavigate();
  return(
    <div>
      {/* Hero Section */}
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div>
              <h1 className="text-5xl font-bold">Your Keys, Your Crypto.</h1>
                <p className="py-6">The most secure and user-friendly wallet for all your digital assets. Take full control of your finances in the world of Web3.</p>
                <button onClick={()=> navigate("/create")} className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
    </div>
  )
};

export default Home;