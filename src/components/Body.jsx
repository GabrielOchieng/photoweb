import happybrowsing from "/happybrowsing.jpeg";
import googleplay from "/googleplay.jpg";
import appstore from "/appstore.png";
const Body = () => {
  return (
    <div className=" flex flex-col">
      <div className="flex flex-col md:flex-row h-[550px] md:h-[600px] items-start md:items-center gap-10 px-3 py-5 bg-slate-200">
        <div className="w-full md:w-1/2 pl-0 md:pl-10 flex flex-col gap-6  justify-center items-start">
          {" "}
          <h1 className="font-bold text-3xl md:text-6xl text-teal-700">
            VIEW PHOTO ALBUMS FREELY
          </h1>
          <hr className="border border-teal-700 w-32 md:w-48 h-2 bg-teal-700 ml-[-20px]" />
          <p className="md:text-xl text-gray-500">
            Find free online photo albums. Keep each other happy and invite
            family and friends. Share memories together!
          </p>
          <div className="flex gap-2">
            <img src={appstore} alt="appstore" className="cursor-pointer" />
            <img src={googleplay} alt="googletore" className="cursor-pointer" />
          </div>
        </div>
        <div>
          <img
            src={happybrowsing}
            alt="photo"
            className=" h-72 w-96 rounded object-cover"
          />
        </div>
      </div>
      <hr className="border-1 border-slate-500 w-[95%] bg-slate-500 mx-auto mt-20 sm:mt-10 md:mt-0 mb-7 md:mb-20" />
    </div>
  );
};

export default Body;
