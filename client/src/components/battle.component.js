import React, { Component } from "react";
import RenderBattleResult from "../services/battle.service";
// import { Link } from "react-router-dom";
// import notification from './Notification.component'
import '../battle.scss';
import battle from "../war/battle";


export default class Battle extends Component {
  constructor(props) {
    super(props);
      this.retrieveBattle = this.retrieveBattle.bind(this);


    this.state = {
      battle: [],
      retrieveError: false,
      retrieveBattleData: false,
        error: false,
        player: false,
        enemy: false
    };
  }

    componentDidMount() {
        this.retrieveBattle();
    }


    retrieveBattle() {
        RenderBattleResult.loadBattle()
            .then(response => {
                this.setState({
                    battle: response.data,
                    retrieveBattleData: true,
                    player: response.data.player,
                    enemy: response.data.enemy
                });
                window.player = response.data.player;
                window.enemy = response.data.enemy;
            })
            .catch(e => {
                this.setState({
                    content:
                        (e.response &&
                            e.response.data &&
                            e.response.data.message) ||
                        e.message ||
                        e.toString(),
                    retrieveError: true
                });
            });
    }


    attack(skill){
        const data = {
            skill: {
                type: skill,
            }
        };
        RenderBattleResult.attack(data)
            .then(response => {
                this.setState({
                    error: false
                });
                battle.click(response.data, skill)
            })
            .catch(e => {
                this.setState({
                    content:
                        (e.response &&
                            e.response.data &&
                            e.response.data.message) ||
                        e.message ||
                        e.toString(),
                    error: true
                });
            });
    }

  render() {
      const { retrieveError, retrieveBattleData } = this.state;
      return (
          <div>
              {retrieveError && (
                  <div className="container">
                      <header className="jumbotron">
                          <h3>{this.state.content}</h3>
                      </header>
                  </div>
              )}
              {retrieveBattleData && (
                  <div>
                      <div className="battle-field">
                          <div className="player" id={this.state.player.name} data-wep="frozenLance">
                              <div className="health-bar">
                                  <div className="health"/>
                              </div>
                              <img src="http://ifanzine.com/wp-content/uploads/2011/12/CT1.jpg" alt=""/>
                          </div>
                          <div className="enemy" id={this.state.enemy.name} data-wep="damascusRapier">
                              <div className="health-bar">
                                  <div className="health"/>
                              </div>
                              <img
    src="http://img3.wikia.nocookie.net/__cb20130101130113/villains/images/thumb/c/c3/Villain_Ozzie_drawn_ChronoTrigger.png/100px-32,274,0,241-Villain_Ozzie_drawn_ChronoTrigger.png" alt=""/>
                          </div>
                      </div>
                      <ul className="controls">
                          <li
                            className="attack"
                            onClick={() => this.attack("primaryAttack")}
                          />
                          <li
                              className="frost-nova"
                              onClick={() => this.attack("frost-nova")}
                          />
                          <li
                              className="ice-shield"
                              onClick={() => this.attack("ice-shield")}
                          />
                      </ul>



                  </div>
              )}
          </div>

      );
  }
}
