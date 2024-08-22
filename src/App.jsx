import React, { useState } from "react";
import Header from "./components/custom/Header";
import SideNav from "./components/custom/SideNav";
import IconController from "./components/custom/IconController";
import BackgroundController from "./components/custom/BackgroundController";
import LogoPreview from "./components/custom/LogoPreview";
import { UpdateStorageContext } from "./context/UpdateStorageContext";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setDownloadIcon] = useState(null);

  return (
    <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <div>
        <Header DownloadIcon={setDownloadIcon} />
        <div className="w-64 fixed">
          <SideNav selectedIndex={(value) => setSelectedIndex(value)} />
        </div>
        <div className="ml-64 grid grid-cols-1 md:grid-cols-6 gap-12 fixed">
          <div className="md:col-span-3 border h-screen shadow-sm p-5 overflow-auto">
            {selectedIndex === 0 ? <IconController /> : <BackgroundController />}
          </div>
          <div className="md:col-span-3">
            <LogoPreview downloadIcon={downloadIcon} setDownloadIcon={setDownloadIcon} />
          </div>
        </div>
      </div>
    </UpdateStorageContext.Provider>
  );
}

export default App;
