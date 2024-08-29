import { BarChart } from "@mui/x-charts/BarChart";
import Modal from '../Utils/Modal.jsx'
import Button from "../Utils/Button.jsx";
import { useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { TileType } from "../TileTypeEnum.ts";
import Filter from "../Utils/Filter.jsx";

const chartSetting = {
  xAxis: [
    {
      label: "Number of Makes",
    },
  ],
  width: 280,
  height: 500,
};

const valueFormatter = (value) => `${value}`;

export default function MakeChart({ make, filter }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [displayCount, setDisplayCount] = useState(make.length)

  const handleSliderChange = (value) => {
    setDisplayCount(Number(value));
  };

  return (
    <div>
      <Button onClick={openModal}>
        <HiAdjustmentsHorizontal />
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}> 
        <Filter tileType={TileType.MAKE} 
        value={displayCount}
        onChange={handleSliderChange}
        min={1}
        max={make.length}/>
      </Modal>
      {
      make.length ? (
        <BarChart
          dataset={make}
          yAxis={[{ scaleType: "band", dataKey: "Make" }]}
          series={[{ dataKey: "Count", valueFormatter }]}
          layout="horizontal"
          grid={{ vertical: true }}
          {...chartSetting}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
