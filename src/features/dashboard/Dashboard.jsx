import Globe from "../globe/Globe";

const Dashboard = () => {
  return (
    <main>
      <form action="submit">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter location name or latitude and longitude"
        />
        <Globe />
      </form>
    </main>
  );
};

export default Dashboard;
