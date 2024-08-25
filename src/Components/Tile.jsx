import "../Style/Tile.css";
import { TileType } from "../TileTypeEnum.ts";
import SingleNumber from "./SingleNumber";
import MakeChart from "./MakeChart.jsx";
import Error from "../Utils/Error.jsx";
import Loader from "../Utils/Loader.jsx";

export default function Tile({ type, title, param, error, isLoading, filter }) {
  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  if (type === TileType.SINGLE) {
    return (
      <section className="singleTile">
        <h2>{title}</h2>
        {isLoading ? <Loader /> : <SingleNumber count={param} />}
      </section>
    );
  }

  if (type === TileType.MAKE) {
    return (
      <section className="singleTile">
        <h2>{title}</h2>
        {isLoading ? <Loader /> : <MakeChart make={param} filter={filter} />}
      </section>
    );
  }
}
