import { useNavigate } from "react-router";

const CreateWallet = () => {
    const navigate = useNavigate();
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-2 text-purple-400">Xypher</h1>
                    <p className="text-gray-300 text-center mb-8">
                        To get started, create a new wallet or import an existing one.
                    </p>

                    <div className="space-y-4">
                        <button onClick={()=>navigate("/set-password")} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                            Create a new wallet
                        </button>

                        <button onClick={()=>navigate("/login")} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                            Already have a wallet ?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWallet