import React from "react";
import { Link } from "react-router-dom";
import Dashboard from './Dashboard';

class Park extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      park: { location: "" },
      user: {id: 7, username: "Time"},
      dashboard: []
   };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
     
    // this.onClick = this.onClick.bind(this);
      // binds "this" to the deletePark method
  }

  componentDidMount() {
    const id = this.props.match.params.id
    const url = `http://localhost:3000/api/v1/show/${id}`;
        // set fetch address as reference to backend with point to the ids of each respective park

    fetch(url)
        // GET fetch request to url
      .then(response => {
        if (response.ok) {
          return response.json();
        // upon return of response, return response in JSON format if there are no issues with returned data
        }
        throw new Error("Network response was not ok.");
        // if returned data has issues, return an error message
      })
      .then(response => {
        //   console.log(response)
      this.setState({ park: response })})
        // if response is satisfactory, set state to "park: w/ response"
      .catch((Error) => console.log(Error));
        // if response has issues, show an error message

  
}

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
        // the addHtmlEntities method, which takes a string and replaces all escaped opening and 
        // closing brackets with their HTML entities. This will help convert whatever escaped character was saved in the park description
        
          deletePark = (event) => {
              //This is the reference to the park id
            const id = this.props.match.params.id
            // 3000 is the backend
            const url = `http://localhost:3000/api/v1/destroy/${id}`;
            fetch(url,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
              },
              
            })
            .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Network response was not ok.");
              })
              .then(() => this.props.history.push("/parks"))
              .catch(error => console.log(error.message));

            };

            addToDashboard = (park) => {
              // fetch to localhost:3000/selection, sent park_id and user_id; it will be a POST method
              // Move fetch for User to Park.jsx AND set the state for User in Park.jsx
              // Then, import Dashboard.jsx to Park.jsx file AND send this addToDashboard fn to Dashboard as prop to handle addToDashboard click
               const body = {
                user_id: this.state.user.id,
                park_id: this.props.match.params.id
              }
                const id = this.props.match.params.id
                const url = `http://localhost:3000/selections`;
                fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(body)
                  
                })
                .then(response => {
                    if (response.ok) {
                      return response.json();
                    }
                    throw new Error("Network response was not ok.");
                  })
                  .then(() => this.props.history.push("/dashboard"))
    
                  // create fetch to push the park to the dashboard as PROPS
    
                  .catch(error => console.log(error.message));
                };


  render() {
    const { park } = this.state;
        // sets the state of the current component to the variable of the park in play
    let locationList = "No parks available";
        // console.log(this.state)
    if (park.location.length > 0) {

      locationList = park.location
        .split(",")
      
        .map((locations, index) => (
        // VERIFY: map through the location string for the park and set list item equal to key of index with each location
          <li key={index} className="list-group-item">
            {locations}
          </li>
        ));
    }
    
    const parkDescription = this.addHtmlEntities(park.description);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={park.image}
            alt={`${park.name} image`}
            className="img-fluid"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {park.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Location</h5>
                {locationList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Park Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${parkDescription}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
                
              <button type="button" className="btn btn-danger" onClick={this.deletePark}>
                Delete Park
              </button>
                
              <button type="button" className="btn btn-danger" onClick={this.addToDashboard}>
                Add to Dashboard
              </button>
            </div>
            
          </div>
          <Link to="/parks" className="btn btn-link">
            Back to parks
          </Link>
        </div>
      </div>
    );
  }

}

export default Park;