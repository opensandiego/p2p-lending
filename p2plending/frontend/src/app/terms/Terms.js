import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const config = require("../../../config/index");
const title = config.title;

class Terms extends Component {
  goBack = () => {
    // eslint-disable-next-line react/prop-types
    this.props.history.goBack();
  };

  render() {
    return (
      <div id="container p-4 my-2 mx-auto">
        <div className="text-center rounded p-4 text-white bg-info" >
          <button
            className="btn btn-outline-dark m-2 position-absolute " style={{ top: 70, left: 10 }}
            onClick={() => {
              this.goBack();
            }}
          >
            <i className="fa fa-arrow-circle-left mr-1"></i>
            {''} Back
          </button>
          <span role="img" aria-label="Globex emoji" style={{ fontSize: 50 }}>
            🌎
          </span>
          <h2 className="m-0">Terms</h2>
          <div className="mx-auto" style={{ maxWidth: "500px" }}>
            <span>
              {title} is a Peer to Peer Book Exchange! Share and explore the books within your local community.{" "}
              <span role="img" aria-label="Globex emoji">
                📖
              </span>
            </span>
          </div>
        </div>
        <div className="container">
          <div className="p-4 rounded mx-auto" >
            <h2>Terms</h2>
             <p>
              By downloading or using the app, these terms will
              automatically apply to you - you should make sure therefore
              that you read them carefully before using the app. 
            </p> 
            <p>
              Open San Diego is committed to ensuring that the app
              is as useful and efficient as possible. For that reason, we
              reserve the right to make changes to the app at any time and for any reason.
            </p> 
            <p>
              { title } stores and processes personal data
              that you have provided to us, in order to provide
              our Service. It's your responsibility to keep your
              phone and access to the app secure. We therefore recommend
              that you do not jailbreak or root your phone, which is the
              process of removing software restrictions and limitations
              imposed by the official operating system of your device. It
              could make your phone vulnerable to
              malware/viruses/malicious programs, compromise your phone's
              security features and it could mean that { title } 
              won't work properly or at all.
            </p> 
            <p>
              You should be aware that there are certain things that
              Open San Diego will not take responsibility for.
              Certain functions of the app will require the app to have an
              active internet connection. The connection can be Wi-Fi, or
              provided by your mobile network provider, but
              Open San Diego cannot take responsibility for the
              app not working at full functionality if you don't have
              access to Wi-Fi, and you don't have any of your data
              allowance left.
            </p> 
            <p></p> 
            <p>
              If you're using the app outside of an area with Wi-Fi, you
              should remember that your terms of the agreement with your
              mobile network provider will still apply. As a result, you
              may be charged by your mobile provider for the cost of data
              for the duration of the connection while accessing the app,
              or other third party charges. In using the app, you're
              accepting responsibility for any such charges, including
              roaming data charges if you use the app outside of your home
              territory (i.e. region or country) without turning off data
              roaming. If you are not the bill payer for the device on
              which you're using the app, please be aware that we assume
              that you have received permission from the bill payer for
              using the app.
            </p> 
            <p>
              Along the same lines, Open San Diego cannot always
              take responsibility for the way you use the app i.e. You
              need to make sure that your device stays charged and if it
              runs out of battery and you can't turn it on to avail the
              Service, Open San Diego cannot accept
              responsibility.
            </p> 
            <p>
              With respect to Open San Diego's responsibility for
              your use of the app, when you're using the app, it's
              important to bear in mind that although we endeavour to
              ensure that it is updated and correct at all times, we may
              rely on third parties to provide information to us so that
              we can make it available to you.
              Open San Diego accepts no liability for any loss,
              direct or indirect, you experience as a result of relying
              wholly on this functionality of the app.
            </p> 
            <p>
              At some point, we may wish to update the app.
              Open San Diego does not promise that
              it will always update the app so that it is relevant to
              and/or works with your current hardware and software. 
              However, you promise to always
              accept updates to the application when offered to you, We
              may also wish to stop providing the app, and may terminate
              use of it at any time without giving notice of termination
              to you. Unless we tell you otherwise, upon any termination,
              (a) the rights and licenses granted to you in these terms
              will end; (b) you must stop using the app, and (if needed)
              delete it from your device.
            </p> 
            <p><strong>Changes to This Terms and Conditions</strong></p> <p>
              We may update our Terms and Conditions
              from time to time. Thus, you are advised to review this page
              periodically for any changes. We will
              notify you of any changes by posting the new Terms and
              Conditions on this page. These changes are effective
              immediately after they are posted on this page.
            </p> 
            <p><strong>Contact Us</strong></p> <p>
              If you have any questions or suggestions about
              our Terms and Conditions, do not hesitate to
              contact us at <a href="https://opensandiego.org/">Open San Diego</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Terms);