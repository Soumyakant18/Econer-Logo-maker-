import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

function Header({ DownloadIcon }) {
  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <img src="/wepik.svg" alt="Logo" className="h-12 w-12" />
      <Button className="flex gap-2 items-center" onClick={() => DownloadIcon(Date.now())}>
        <Download className="h-4 w-4 " /> Download
      </Button>
    </div>
  );
}

export default Header;
