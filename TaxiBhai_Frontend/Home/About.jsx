import about from "../../public/images/3.jpg"
const About = () => {
    return (
        <div className="mb-12 mt-8 p-12  ">
            {/* Main div */}
            <div className="flex p-2  flex-col-reverse md:flex-row-reverse lg:flex-row-reverse justify-center items-center gap-0">
                {/* TextContent */}
                <div className="">
                    <h1 className=" text-3xl md:text-4xl lg:text-5xl ml-4  font-sans font-bold uppercase">Taxi Vai</h1>
                    <p className="mr-2 p-4  text-gray-600 text-xl"> Welcome to Taxi Vai, your trusted taxi service in Dhaka. Offering the best deals for all your<br></br> transportation needs. Reliable, safe, and affordable rides <br></br>across the city. Book now for a hassle-free experience!
                    </p>
                  
                </div>
                {/* image content */}
                <div className=" w-[200px] h-[200px]  md:w-[200px] md:h-[200px] lg:w-[500px] lg:h-[500px]">
                    <img src={about}></img>
                </div>
            </div>
        </div>
    );
};

export default About;