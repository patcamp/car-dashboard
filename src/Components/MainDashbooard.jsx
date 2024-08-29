import { useCallback, useEffect, useState } from "react";
import Tile from "./Tile";
import Error from "../Utils/Error.jsx";
import { fetchAllData, fetchAllMake } from "../http.js";
import { TileType } from "../TileTypeEnum.ts";

export default function MainDashbooard() {
  const [cars, setCars] = useState([]);
  const [numCars, setNumCars] = useState(-1);
  const [makes, setMakes] = useState({});

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  let filterItem;

  useEffect(() => {
    async function fetchAllCarData() {
      setIsFetching(true);
      try {
        const respAll = await fetchAllData();
        setNumCars(respAll.count);
        setCars(respAll.data);

        const respMakes = await fetchAllMake();
        setMakes(respMakes.data);
      } catch (error) {
        setError({
          message:
            error.message ||
            "Could not fetch all data, please try again later.",
        });
      }
      setIsFetching(false);
    }

    function filterItems (value){

    }

    fetchAllCarData();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <div>
      <h3>Main Dashboard</h3>
      <div className="tiles">
        <Tile
          type={TileType.SINGLE}
          title={"Number Cars"}
          param={numCars}
          isLoading={isFetching}
          filter={filterItem}
        />
        <Tile
          type={TileType.MAKE}
          title={"Number of Makes"}
          param={makes}
          isLoading={isFetching}
          filter={filterItem}
        />
      </div>
    </div>
  );
}
