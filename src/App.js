import React, { Component } from "react";
import { Tabs } from "antd";
import { Offline, Online } from "react-detect-offline";

import TMDBservice from "./services/TMDBservice";
import TMDBContext from "./services/TMDBContext";

import SearchTab from "./components/SearchTab/SearchTab";
import RatedTab from "./components/RatedTab/RatedTab";
import Error from "./components/Error/Error";

import "./App.css";

export default class App extends Component {
  moviesService = new TMDBservice();

  render() {
    const searchTab = <SearchTab />;
    const ratedTab = <RatedTab />;
    return (
      <main className="main">
        <Offline>
          <Error description="Check internet connection" type="error" />
        </Offline>

        <Online>
          <TMDBContext.Provider value={this.moviesService}>
            <Tabs
              tabBarStyle={{ marginInline: "auto" }}
              items={[
                {
                  label: "Search",
                  key: "1",
                  children: searchTab,
                },
                {
                  label: "Rated",
                  key: "2",
                  children: ratedTab,
                  destroyInactiveTabPane: true,
                },
              ]}
            />
          </TMDBContext.Provider>
        </Online>
      </main>
    );
  }
}
