import React from "react";
import { Sheet } from "./Sheet";
import { Radio } from "./RadioGroup";
import { Label } from "./Label";
import Browser from "../icons/Browser";
import { Browser as K, useBrowser } from "../../../stores/browser";

const Header: React.FC = () => {
  const { browser, setBrowser } = useBrowser();

  const handleUpdateBrowser = (value: string) => {
    const browsers = ["chromium", "google-chrome", "google-chrome-unstable", "Firefox"];
    if (browsers.includes(value)) {
      setBrowser(value as K);
      return;
    }
    return;
  };

  return (
    <header className="px-6 py-4 fixed top-0 backdrop:blur-sm backdrop-blur-sm bg-white/30 shadow-md h-16 w-full flex justify-between">
      <h1 className="font-bold text-xl">Breview</h1>
      <Sheet.Root>
        <Sheet.Trigger className="flex">
          <Browser /> <span className="pl-1 text-base">Browser</span>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Settings your default browser</Sheet.Title>
            <Sheet.Description>Please, select your default browser to open your bookmarks here.</Sheet.Description>
          </Sheet.Header>
          <section className="pt-5">
            <Radio.Group defaultValue={browser} onValueChange={handleUpdateBrowser}>
              <div className="flex items-center py-1 space-x-2">
                <Radio.Item value="chromium" id="Chromium" />
                <Label htmlFor="Chromium">Google Chromium</Label>
              </div>
              <div className="flex items-center py-1 space-x-2">
                <Radio.Item value="google-chrome" id="Chrome" />
                <Label htmlFor="Chrome">Google Chrome</Label>
              </div>
              <div className="flex items-center py-1 space-x-2">
                <Radio.Item value="google-chrome-unstable" id="ChromeSnstable" />
                <Label htmlFor="ChromeSnstable">Google Chrome Snstable</Label>
              </div>
              <div className="flex items-center py-1 space-x-2">
                <Radio.Item value="Firefox" id="Firefox" />
                <Label htmlFor="Firefox">Firefox</Label>
              </div>
            </Radio.Group>
          </section>
        </Sheet.Content>
      </Sheet.Root>
    </header>
  );
};

export default Header;
