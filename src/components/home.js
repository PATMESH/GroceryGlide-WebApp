import { Navbar } from "./Navbar";
import { Products } from "./Home-products/Products";

export const Home = ({ user }) => {
  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Products />
    </div>
  );
};
