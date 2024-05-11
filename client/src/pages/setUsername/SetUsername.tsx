export default function SetUsername() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4">
        <h3 className="text-center font-bold text-lg mb-5">
          Pick or set username
        </h3>
        <textarea
          placeholder="username"
          className="p-2 border rounded-md focus:outline-none focus:border-customGreen w-full  resize-none overflow-auto "
          cols={4}
        ></textarea>
      </div>
    </div>
  );
}
