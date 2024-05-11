import { useState } from "react";
import { Outlet } from "react-router-dom";
import { STATUS } from "../../utils/request_status";
import { Link } from "react-router-dom";

export default function DashboardLayout() {
  const [status, setStatus] = useState(STATUS.IDLE);

  return (
    <div className="flex flex-col items-center gap-4 justify-center ">
      <div className="flex justify-between ">
        <div>
          <ul className="flex gap-2 justify-center">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/transfer"}>Transfer</Link>
            </li>

            <li>
              <Link to={"/payment"}>Payment Collection</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
      <h2>Footer</h2>
    </div>
  );
}
