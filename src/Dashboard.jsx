import React from "react";
import { Link } from "react-router-dom";
import Park from "./Park"

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          parks: []
        };
      }

    componentDidMount() {
      // whenever Dashboard is visited, a fresh request to selections is made
        const url = "http://localhost:3000/selections";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ parks: response }))
          .catch((Error) => console.log(Error));
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
                No parks yet on dashboard. Why not <Link to="/new_park">add a park</Link>
              </h4>
            </div>
          );
        // return <h1>Dashboard</h1>

        return (
            <>
              <section className="jumbotron jumbotron-fluid text-center">
                <div className="container py-5">
                  <h1 className="display-4">Dashboard</h1>
                  <p className="lead text-muted">
                    Here are your selections.
                  </p>
                </div>
              </section>
              <div className="py-5">
                <main className="container">
                
                  <div className="row">
                    {parks.length > 0 ? allParks : noPark}
                  </div>
                  
                  <Link to="/parks" className="btn btn-lg custom-button" role="button">
                    View Parks
                    </Link>
                  
                  <Link to="/" className="btn btn-link">
                    Home
                  </Link>

                </main>
              </div>
            </>
          );

        }

}

export default Dashboard;

//using class in order to use componentDidMount (using function would require hooks to achieve this functionality)