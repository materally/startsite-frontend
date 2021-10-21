import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state) => state.auth);

  return <div className="">HOME, hello {currentUser.displayName} - </div>;
}

export default Home;
