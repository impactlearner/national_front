import React from "react";
import { Link } from "react-router-dom"; // VERIFY Understanding of "Link"

class Parks extends React.Component {
    //sets class component with React functionality
  constructor(props) {
      //CLARIFY "constructor" and "props"
    super(props);
    // CLARIFY "super" and SOLIDIFY "props"
    this.state = {
        // sets state of component as an empty array of parks to be populated by fetch
      parks: []
    };
  }
  componentDidMount() {
      // VERIFY w/instructor, "componentDidMount" - verifies execution of component
    const url = "http://localhost:3000/api/v1/parks/index";
    // perform a fetch, GET request to backend
    fetch(url)
    // fetch request to localhost:3000; upon receipt of response, verify, if ok, return response in json format; 
    // throw an error if response is not correct
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ parks: response }))
      // then, response sets component state to above array of "parks" with response from fetch populating the array
      .catch((Error) => console.log(Error));
      // if there is an error, respond with "Error"
}
render() {
    const { parks } = this.state;
    // console.log(parks)
    // VERIFY activated variable of parks is set equal to the state of current component
    const allParks = parks.map((park, index) => (
        // VERIFY variable allParks is set equal to function of mapping through parks array and pulling values of park and index
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={park.image}
            // src is set equal to the image componet of the park instance pulled from the array
            className="card-img-top"
            alt={`${park.name} image`}
            // VERIFY if card image is not available, render name of park with the word "image" appended
          />
          <div className="card-body">
            <h5 className="card-title">{park.name}</h5>
            <Link to={`/park/${park.id}`} className="btn custom-button">
              View Park
            </Link>
          </div>
        </div>
      </div>
    ));
    const noPark = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No parks yet. Why not <Link to="/new_park">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Parks for Everyone</h1>
            <p className="lead text-muted">
              We’ve curated America's most-visited parks, monumental attractions, and breath-taking views!
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/park" className="btn custom-button">
                Add New Park
              </Link>
            </div>
            <div className="row">
              {parks.length > 0 ? allParks : noPark}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }

}
export default Parks;