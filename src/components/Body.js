import React from 'react';
import axios from 'axios';


const CardList = (props) => (
    <div>
        { props.profiles.map(profile => <Card key={profile.id} {...profile}/>) }
    </div>
);

class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img src={profile.avatar_url} alt=""/>
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="location">{profile.location}</div>
                    <div className="website">{profile.blog}</div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    state = { userName: '' };

    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(response.data);
        this.setState({ userName: '' });
    };

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input
                    type="text"
                    value={ this.state.userName }
                    onChange={ event => this.setState({ userName: event.target.value }) }
                    placeholder="GitHub username"
                    required
                />
                <button>Add card</button>
            </form>
        );
    }
}

class Body extends React.Component {
    state = {
        profiles: [],
    };

    addNewProfile = (profileData) => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData],
        }));
    };

    render() {
        return (
            <div className="body">
                <div>
                    <Form onSubmit={ this.addNewProfile }  />
                    <CardList profiles={ this.state.profiles } />
                </div>
            </div>
        );
    }
}

export default Body;
