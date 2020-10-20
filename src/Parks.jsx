import React from "react";
import { Link } from "react-router-dom";

class Parks extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      parks: [],
      user: {},
      dashboard: []
    };
  }
  
  componentDidMount() {
    const url = "http://localhost:3000/api/v1/parks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ parks: response }))
      .catch((Error) => console.log(Error));

      fetch(`http://localhost:3000/users`)
      .then(response => response.json())
      .then(userArr => {
        let userObj = userArr[0]
        this.setState({user: userObj})
      })
}


render() {
    const { parks } = this.state;
     console.log(this.state.user)
    const allParks = parks.map((park, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={park.image}
            className="card-img-top"
            alt={`${park.name} image`}
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
            <div className="text-right mb-4">
              <Link to="/dashboard" className="btn custom-button">
                Dashboard
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