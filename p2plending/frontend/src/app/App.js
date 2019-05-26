/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TitlesResults from "./titles/TitlesResults";
import TitleIndividual from "./titles/TitleIndividual";
import About from "./about/About";
import Landing from "./landing/Landing";
import Footer from "./Footer";
import Header from "./Header";

import NotFound from "../components/NotFound";
import ScrollToTop from "../components/ScrollToTop";

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <div className="App d-flex flex-column justify-content-between text-left">
          <Header />
          <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
            <Route path="/" component={ScrollToTop} />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/search/:searchTerm?" component={TitlesResults} />
              <Route exact path="/language/:languageID" component={TitlesResults} />
              <Route exact path="/titles/:titleID" exact component={TitleIndividual} />
              <Route exact path="/about" component={About} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
