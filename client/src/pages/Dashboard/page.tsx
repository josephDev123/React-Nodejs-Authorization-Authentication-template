import { axiosDefault } from "../../axios/axiosInstance";
import { useState } from "react";

const DashboardPage = () => {
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");

  const handleTesting = async () => {
    try {
      setStatus("loading");
      const testReq = await axiosDefault({
        method: "POST",
        url: "auth/middleware-testing",
      });
      const result = testReq.data;

      setStatus("success");
      setData(result.message);
    } catch (error) {
      setStatus("error");
      setData("error" + error);
    }
  };

  return (
    <section className="flex flex-col space-y-3">
      <h2>Dashboard Page</h2>
      <button onClick={handleTesting} className="rounded-md p-2 bg-green-400">
        Get the middleware
      </button>
      {status === "loading"
        ? "Loading..."
        : status === "error"
        ? "something went wrong"
        : data}
    </section>
  );
};

export default DashboardPage;
