import React, { Component } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';


import Loading from "./Components/Loading";
import NewGame from "./Components/NewGame";
import Header from "./Components/Header";
import PlayGame from './Components/PlayGame';
import { ROOT_API } from './statics';
import './App.css';

class App extends Component {
  state = {
    showImg: true,
    message: "Hello world",
    num: 0,
    game: null,
    loading: true
  }

  componentWillMount() {
    console.log("Will mount");
  }

  componentDidMount() {
    if(window.location.pathname) {
      const pathParams = window.location.pathname.slice(1).split("/");
      if(pathParams[1] && pathParams[0] === "game") {
        const questionId = pathParams[1];

        axios({
          url: `${ROOT_API}/api/game/${questionId}`,
          method: "GET"
        }).then(response => {
          console.log(response.data);
          if(response.data.success) {
            setTimeout(() => {
              this.setState({ game: response.data.game, loading: false });
            }, 1500);
          }
        }).catch(error => {
          this.setState({ game: null, loading: false });
          console.log(error)
        });
      } else {
        this.setState({ loading: false, game: null });
      }
    }
  }

  addNewRow = () =>{
    const {game} = this.state;
    game.scores = game.scores.map( score =>[...score,0])

    axios({
      method: "put",
      url: `${ROOT_API}/api/game`,
      data: {
        gameId: game._id,
        scores: game.scores
      }
    }).then(response => {
      this.setState({loading: false, game})
      console.log(response);
    }).catch(err =>{
      this.setState({loading: false})
      console.log(err)
    })
      
    
    this.setState({game});
  }

  updateScore = (score, playerIndex, rowIndex) => {
    const {game} = this.state;
    game.scores[playerIndex][rowIndex] = score;

    axios({
      method: "put",
      url: `${ROOT_API}/api/game`,
      data: {
        gameId: game._id,
        scores: game.scores
      }
    }).then(response => {
      this.setState({loading: false, game})
      console.log(response);
    }).catch(err =>{
      this.setState({loading: false})
      console.log(err)
    })
      
    
    this.setState({game});
  }

  render() {
    const { game, loading } = this.state;

    return (
      <Container className="App">
        <Header />
        { loading ? <div className="text-center"><Loading /></div>
          : game ? <PlayGame game={game} addNewRow = {this.addNewRow} updateScore= {this.updateScore}/>
                : <NewGame toggleLoading={(loading) => { this.setState({loading: loading}) }} />
        }
        {/* <header className="App-header">
          {this.state.showImg ? <img src={logo} className="App-logo" alt="logo" /> : "Hidden"}
          <div>
            <Message message={this.state.message} />
            Edit <code>src/App.js</code> and save to reload.
          </div>
          <div>
            <p>Click: {this.state.num}</p>
            <Button handleClick={() => { this.setState({ num: this.state.num + 1 }) }} />
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </Container>
    );
  }
}

export default App;