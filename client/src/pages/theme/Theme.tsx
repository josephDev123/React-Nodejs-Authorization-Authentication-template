export default function Theme() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center ">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4 h-80 flex flex-col items-center justify-center">
        <h3 className="text-center font-bold text-lg mb-5">Pick Theme</h3>
        <div className={`flex justify-center gap-5 w-full`}>
          <div className="rounded-md flex items-center justify-center border w-20 h-16">
            <input
              name="radio"
              type="radio"
              className="p-2 rounded-md border cursor-pointer"
            />
          </div>

          <div className="rounded-md flex items-center justify-center border w-20 h-16 bg-black">
            <input
              name="radio"
              type="radio"
              className="p-2 rounded-md border cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
