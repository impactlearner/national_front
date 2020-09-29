import React from "react";
import { Link } from "react-router-dom";

class NewPark extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        image: "",
        location: "",
        description: ""
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }
  
    stripHtmlEntities(str) {
      return String(str)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  
    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    onSubmit(event) {
        // when the form is submitted, make a fetch request to a url on the backend + send data with request
      event.preventDefault();
      // the url is determined by what is set up on the backend, which routes you can make requests to
      const url = "http://localhost:3000/api/v1/parks/create";
      const { name, image, location, description } = this.state;
  
      if (name.length == 0 || location.length == 0 || description.length == 0)
        return;
  
      const body = {
        name,
        image,
        location,
        description: description.replace(/\n/g, "<br> <br>")
      };

      fetch(url, {
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
        .then(response => this.props.history.push(`/park/${response.id}`))
        .catch(error => console.log(error.message));
    }
  
    render() {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Add a new national park to our collection.
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="parkName">Park name</label>
                  <input
                    type="text"
                    name="name"
                    id="parkName"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="parkImage">Park image</label>
                  <input
                    type="text"
                    name="image"
                    id="parkImage"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                  </div>
                <div className="form-group">
                  <label htmlFor="parkLocation">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="parkLocation"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                  <small id="locationHelp" className="form-text text-muted">
                    Separate each address line with a comma.
                  </small>
                </div>
                <label htmlFor="description">Park Descriptions</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="5"
                  required
                  onChange={this.onChange}
                />
                <button type="submit" className="btn custom-button mt-3">
                  Create Park
                </button>
                <Link to="/parks" className="btn btn-link mt-3">
                  Back to parks
                </Link>
              </form>
            </div>
          </div>
        </div>
      );
    }
  
  }
  
  export default NewPark;