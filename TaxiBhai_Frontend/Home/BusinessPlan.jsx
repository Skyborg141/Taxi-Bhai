

import about from "../../public/images/2.jpg"
const BusinessPlan = () => {
    return (
        <div className="flex p-2  flex-col-reverse md:flex-row lg:flex-row justify-evenly items-center gap-0">
        {/* TextContent */}
        <div className="space-y-2">
            <h1 className=" text-3xl md:text-4xl lg:text-5xl ml-4  font-sans font-bold uppercase">Join Our owner Plan</h1>
            <p className="mr-2 p-4 text-wrap text-gray-600 text-xl">Get Registered with your cars document and rent the car Non-Stop! <br></br> Take services from us and Grow Your Business !
            </p>
            <btn className="btn text-2xl bg-yellow-600  w-3/4   text-center  font-bold">Join Now</btn>
        </div>
        {/* image content */}
        <div className=" w-[200px] h-[200px]  md:w-[200px] md:h-[200px] lg:w-[500px] lg:h-[500px]">
            <img src={about}></img>
        </div>
    </div>
    );
};

export default BusinessPlan;