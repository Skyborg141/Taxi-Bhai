
import bannar from "../../public/images/1.jpg"
const Bannar = () => {
    return (
        <div className="flex items-center justify-center mt-20">
        {/* <img className="w-[1500px] h-[890px]" src={bannar}></img> */}
        <div className="hero min-h-screen " style={{ backgroundImage: `url(${bannar})` }}>
            <div className="hero-overlay bg-opacity-80">
                <div className="hero-content mt-4 p-14 md:p-14 lg:p-20 mx-auto text-center text-neutral-content">
                    <div className="max-w-max ">
                        <p className="mt-4 md:mb-3 lg:mb-5 font-bold text-2xl md:text-3xl lg:text-4xl">Introducing </p>
                        <h1 className="mt-4 md:mb-3 lg:mb-5 text-2xl md:text-3xl lg:text-7xl text-yellow-600 font-bold">Taxi Vai</h1>
                        <p className="text-lg md:text-xl lg:text-6xl font-bold mb-3">We are providing easy movement in the city with best pricing</p>
                        <p className=" mb-2 md:mb-3 lg:mb-5 text-xl md:text-3xl lg:text-4xl mt-5 font-bold">Follow <span className="text-2xl  btn-sm btn-circle p-2 bg-yellow-600">3</span> Steps!</p>
                        <div className="flex gap-3 items-center justify-center p-2">
                            <input type="checkbox" checked="checked" className="checkbox checkbox-accent" />
                            <p className="text-xl md:text-2xl lg:text-2xl font-bold">Select Trip</p>
                        </div>
                        <div className="flex gap-3 items-center justify-center p-2">
                            <input type="checkbox" checked="checked" className="checkbox checkbox-accent" />
                            <p className="text-xl md:text-2xl lg:text-2xl font-bold">Book Trip</p>
                        </div>
                        <div className="flex gap-3 items-center justify-center p-2">
                            <input type="checkbox" checked="checked" className="checkbox checkbox-accent" />
                            <p className="text-xl md:text-2xl lg:text-2xl font-bold">Go </p>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Bannar;