import { Link, Outlet } from "react-router-dom";
import { getCredential } from "../../utils/getCredential";

export default function HomeLayout({}: {}) {
  const { userData } = getCredential();
  console.log(userData);
  return (
    <div className="flex  flex-col px-10">
      <div className="flex justify-between ">
        <div>
          <ul className="flex gap-2 justify-center">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link to={"#"}>Transfer</Link>
            </li>

            <li>
              <Link to={"#"}>Payment Collection</Link>
            </li>
          </ul>
        </div>
        <span className="flex gap-2">
          {!(userData?.user?.confirm_otp || userData?.user?.email) ? (
            <>
              <Link to={"/register"}>Register</Link>
              <Link to={"/login"}>Login</Link>
            </>
          ) : (
            <Link to={"/dashboard"}>Dashboard</Link>
          )}
        </span>
      </div>
      <Outlet />
    </div>
  );
}
