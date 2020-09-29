import React from "react";
import { Link } from "react-router-dom";

class Park extends React.Component {
    // VERIFY class of Park is established with React functionality
  constructor(props) {
      // ASK Instructor to validate researched constructor with props as the 'parameter'
    super(props);
      // ASK Instructor to verify "super" with 'parameter' of props
    this.state = { park: { location: "" } };
      // RESEARCH and ARTICULATE and ASK- the state of the current component is set to park with component of location
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
      // ASK - adds "addHtmlEntities" to the current component;
    this.onClick = this.onClick.bind(this);
      // binds "this" to the deleteRecipe method
  }

  componentDidMount() {
      // VERIFY: ensure completion of component activation with a variable defined as the park in play using the park.id
    // const {
        // define the variable as a constant; match params gives you access to each park id through REACT ROUTER
    //   match: {
        // define/signify a correlation
        // params: { id }
        // params of the array instance defined as the park.id
    //   }
    // } = this.props;

    const id = this.props.match.params.id

        // VERIFY: current component activated with prop(erties) of each consecutive park in the array

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
        onChange(event) {
            this.setState({ [event.target.name]: event.target.value });
          }
        
          onClick(event) {
              //This is the reference to the park id
            const id = this.props.match.params.id

              // when the button is clicked, make a notification to back end to delete this park
            event.preventDefault();
            // the url is determined by what is set up on the backend, which routes you can make requests to
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

            // componentDidMount() {
                // VERIFY w/instructor, "componentDidMount" - verifies execution of component
            //   const url = "http://localhost:3000/api/v1/parks/index";
              // perform a fetch, GET request to backend
            //   fetch(url)
              // fetch request to localhost:3000; upon receipt of response, verify, if ok, return response in json format; 
              // throw an error if response is not correct
                // .then(response => {
                //   if (response.ok) {
                //     return response.json();
                //   }
                //   throw new Error("Network response was not ok.");
                // })
                // .then(response => this.setState({ parks: response }))
                // then, response sets component state to above array of "parks" with response from fetch populating the array
                // .catch((Error) => console.log(Error));
                // if there is an error, respond with "Error"
        //   }


  render() {
        // VERIFY: render the  park 
    const { park } = this.state;
        // set the state of the current component to the variable of the park in play
    let locationList = "No parks available";
        // console.log(this.state)
    if (park.location.length > 0) {
      locationList = park.location
        .split(",")
        // locationList is set equal to the location provided for the park
        // an array is created for each part of the location address and mapped over 
        // a "," splits each part of the location into lines
        // if there is no location info, "No parks available" is rendered
        .map((locations, index) => (
        // VERIFY: map through the location string for the park and set list item equal to key of index with each location
          <li key={index} className="list-group-item">
            {locations}
          </li>
        ));
    }
    // RESEARCH and VERIFY: {locations}
    const parkDescription = this.addHtmlEntities(park.description);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={park.image}
            alt={`${park.name} image`}
            className="img-fluid position-absolute"
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
                
              <button type="button" className="btn btn-danger" onClick={this.onClick}>
                Delete Park
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