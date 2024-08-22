import React, { useContext, useEffect, useState, useRef } from "react";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";
import { icons } from "lucide-react";
import html2canvas from "html2canvas";

function LogoPreview({ downloadIcon, setDownloadIcon }) {
  const [storageValue, setStorageValue] = useState();
  const { updateStorage } = useContext(UpdateStorageContext);
  const initialRender = useRef(true); // Track the initial render

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false; // Skip the first render
    } else if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv");

    html2canvas(downloadLogoDiv, {
      backgroundColor: storageValue?.bgColor || null, // Ensure background color is captured
      useCORS: true, // Ensure images and fonts are loaded
    }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = "soumyakants_Logo.png";
      downloadLink.click();
      setDownloadIcon(null); // Reset the downloadIcon state after download
    });
  };

  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return null;
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
        style={{
          padding: storageValue?.bgPadding,
        }}
      >
        <div
          id="downloadLogoDiv"
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
        >
          <Icon
            name={storageValue?.icon}
            color={storageValue?.iconColor}
            size={storageValue?.iconSize}
            rotate={storageValue?.iconRotate}
          />
        </div>
      </div>
    </div>
  );
}

export default LogoPreview;
