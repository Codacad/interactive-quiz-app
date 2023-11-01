import "../css/Spinner.css";
const Spiner = () => {
  return (
    <>
      <div className="spinner absolute z-20 top-0 left-0 w-full h-full bg-transparent">
        <div className="circle absolute z-30 w-16 h-16 rounded-full border-[5px] border-green-600 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
      </div>
    </>
  );
};

export default Spiner;
