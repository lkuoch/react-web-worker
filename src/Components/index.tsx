import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { actions } from "@Core/App/redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initApp());
  }, []);

  return (
    <div id="app">
      {CONFIG.features.header.enabled && (
        <h3 className="ui block center aligned header">
          {CONFIG.translation.appTitle}
        </h3>
      )}
    </div>
  );
}
