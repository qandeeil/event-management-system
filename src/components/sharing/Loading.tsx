import React from "react";
import "@/styles/sharing/loading.scss";

type Props = {
  isLoading: boolean;
};

const Loading = ({ isLoading }: Props) => {
  if (isLoading) {
    return (
      <div
        style={{
          background: "#00000060",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 999999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mainLoader"></div>
      </div>
    );
  }
};

export default Loading;
