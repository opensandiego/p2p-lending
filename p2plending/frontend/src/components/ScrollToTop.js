import { Component } from "react";
import PropTypes from "prop-types";


class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.any.isRequired,
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return null;
  }
}

export default ScrollToTop;
