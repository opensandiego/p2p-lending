import React, { Component } from "react";

import * as api from "../app/backendCalls"
import LanguageItem from "./LanguageItem";



class BrowseByLanguage extends Component {
    state = { languages: [] };

    componentDidMount() {
        this.fetchLanguages();
    }

    fetchLanguages = () => {
    
        // no ties to backend
        this.setState({ languages: api.fetchAllLanguages() })

        // an actual API backend call
        // api
        //   .fetchAllLanguages()
        //   .then(response => this.setState({ languages: response.data }))
        //   .catch(error => console.error(error));
      };
    
    render() {
    const { languages } = this.state;
      return (
        <div className="container">
          <div className="row d-flex align-item-center position-relative pt-3 mx-auto" style={{ maxWidth:"350px" }}>
            <div className="col-xs-6">
              <h4>Browse By Language:</h4>
                <div className="border rounded mx-auto" style={{ maxWidth:"350px" }}>
                    <div className="container container--full px-2 my-1">
                        <div className="d-flex align-items-center justify-content-between mb-1" />
                            {languages.length > 0 ? (
                                <div className="row">
                                    {languages.map(item => (
                                        <LanguageItem 
                                          key={item.id}
                                          name={item.name}
                                          number={item.number}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="blankslate py-5 my-2">
                                    <h1 className="m-0">No Languages Found</h1>
                                    <p>Please check your internet connection </p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default BrowseByLanguage;