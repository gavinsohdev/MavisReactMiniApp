import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import clsx from "clsx";
import { useInitData, useWebApp, useShowPopup } from "@vkruglikov/react-telegram-web-app";

export type AppProps = {
  className?: string;
};

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

export const App: React.FC<AppProps> = ({ className }) => {
  const showPopup = useShowPopup();
  // const WebApp = useWebApp();
  const [initData, setInitData] = useState<string>("");
  // const [initDataUnsafe, initData2] = useInitData();

  useEffect(() => {
    let tg = window.Telegram.WebApp;
    tg.ready();
    // setInitData(tg.initDataUnsafe?.user?.first_name);
    setInitData(JSON.stringify(tg));

    tg.onEvent("mainButtonClicked", function() {
      const dataToSend = { status: "clicked", timestamp: Date.now() };
      tg.sendData(JSON.stringify(dataToSend));
      tg.close();
    });
  }, []);

  const showPopupOnClick = async () => {
    const message =
      "Thanks for using react-mini-app! I hope it helps you to create awesome Telegram Mini apps!";
    await showPopup({ title: "Hey!", message: message });
  };

  const mainButtonClickHandler = () => {
    let tg = window.Telegram.WebApp;
    tg.MainButton.show();
    tg.MainButton.setText("Click Me!");
  };

  return (
    <div className={clsx(styles.App, className)}>
      <div className={styles.container}>
        <a
          href="https://github.com/usernein/react-mini-app"
          target="_blank"
          className={styles.githubLink}
        >
          <h1 className={styles.title}>react-mini-app</h1>
        </a>

        <button onClick={showPopupOnClick} className={styles.clickMe}>
          Show popup!
        </button>

        <button onClick={mainButtonClickHandler} className={styles.clickMe}>
          Show Telegram Main Button
        </button>

        <div className={styles.initData}>
          <h2>Init Data:</h2>
          <p style={{maxWidth: '50vh'}}>{initData}</p> {/* Display the initData */}
        </div>
      </div>
    </div>
  );
};