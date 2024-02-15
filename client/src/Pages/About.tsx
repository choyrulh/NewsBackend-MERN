import useUserLogin from "../hooks/useUserLogin";

function About() {
  const { user } = useUserLogin();
  console.log(user);

  return <h1 className="text-3xl text-black ">{user?.name}</h1>;
}

export default About;
