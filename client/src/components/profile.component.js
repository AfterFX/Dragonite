import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import AutosizeInput from 'react-input-autosize';
import UserService from "../services/user.service";
import notification from "./Notification.component";



export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { nickname: "" },
      nickname: '',
      originalNickname: '',
      editMode: false,
      requiredValidate: false,
      nicknameValidate: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      nickname: currentUser.nickname,
      originalNickname: currentUser.nickname
    })
  }

  // Enable form
  toggleEditMode = () => {
    this.setState( prevState => ({
      editMode: !prevState.editMode,
    }));
  };

  // setState for new name
  save = (e) => {
    e.preventDefault();
    const newName = e.target.nickname.value;
    const data = {
      nickname: e.target.nickname.value
    };
    if(newName !== this.state.originalNickname) {
      UserService.changeNickname(data).then(response => {
        this.setState({
          nickname: newName,
          originalNickname: newName,
          editMode: false,
          nicknameValidate: false,
          requiredValidate: false
        });
        return notification.universal(response.data.message, response.data.type);
      }).catch(e => {
        return notification.universal(e.response.data.message, e.response.data.type);
      });
    }else{
      this.setState({
        editMode: false
      });
    }
  };

  cancelEdit = (originalNickname) => {
    this.setState({
      nickname: originalNickname,
      editMode: false,
      nicknameValidate: false,
      requiredValidate: false
    });
  };


  nicknameValidate(value) {
    if (value.length < 3 || value.length > 20) {
        this.setState({
          nicknameValidate: true
        });
      }else{
        this.setState({
          nicknameValidate: false
        });
      }
  };
  requiredValidate(value) {
    if(!value){
      this.setState({
        requiredValidate: true
      });
    }else{
      this.setState({
        requiredValidate: false
      });
    }

  };
  onNicknameChange(value){
    this.requiredValidate(value);
    this.nicknameValidate(value);
    this.setState({
      nickname: value.replace(/[^\w\s]/gi, "")
    });
  }

  iconError(){
    return (
        <svg className="bi bi-alert-triangle text-danger tex-danger-profile" width="24" height="24" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.938 4.016a.146.146 0 00-.054.057L3.027 15.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L10.12 4.073a.146.146 0 00-.054-.057.13.13 0 00-.063-.016.13.13 0 00-.064.016zm1.043-.45a1.13 1.13 0 00-1.96 0L2.166 15.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L10.982 3.566z"></path><rect width="2" height="2" x="9.002" y="13" rx="1"></rect><path d="M9.1 7.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 7.995z"></path></svg>
    )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }


    const { currentUser } = this.state;

    let saveBtn = null;
    let cancelBtn = null;
    // If editMode is enabled display the save and cancel btns
    if (this.state.editMode) {
      saveBtn = (
          <button
              type="submit" value="Submit"
              className='btn btn-success'
              disabled={this.state.requiredValidate ? 'disabled': this.state.nicknameValidate ? 'disabled': ''}
          >Save</button>
      );
      cancelBtn = (
          <button
              type="reset"
              className='btn btn-danger'
              onClick={() => this.cancelEdit(this.state.originalNickname)}>Cancel</button>
      );
    }



    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.nickname}</strong> Profile
          </h3>
        </header>


          <div className="nickname-form">
            <strong>Nickname:</strong>{" "}
            <form className="nicknameForm" onSubmit={this.save}>
              <div className="form-group button-inline">
                <AutosizeInput
                    className={this.state.editMode ? '':'nicknameInput'}
                    type="text"
                    name="nickname"
                    value={this.state.nickname}
                    onChange={(e)=>{ this.onNicknameChange(e.target.value);}}
                    disabled={this.state.editMode ? '':'disabled'}
                    inputStyle={this.state.editMode ? {}:{border: "none", color: "#212529", background: "none"}}
                />




              </div>
              {saveBtn}
              {cancelBtn}
            </form>
            {!this.state.editMode && (
                <svg onClick={this.toggleEditMode} width="1em" height="1em" viewBox="0 0 16 16"  className="bi bi-pencil-fill nickname-form-edit" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
            )}
            {this.state.requiredValidate ? (
                <div className="callout callout-danger">
                  {this.iconError()}This field is required!
                </div>
            ): (this.state.nicknameValidate ? (
                    <div className="callout callout-danger">
                      {this.iconError()} The nickname must be between 3 and 20 characters.
                    </div>
                ): ''
            )
            }
          </div>

        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <p>
          <strong>Last activity:</strong>{" "}
          {currentUser.lastActivity}
        </p>
      </div>: null}
      </div>
    );
  }
}
