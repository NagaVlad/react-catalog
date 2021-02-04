import React from 'react';

export default class Registration extends React.Component {

   onNameChange = this.onNameChange.bind(this);
   onSurnameChange = this.onSurnameChange.bind(this);
   onPasswordChange = this.onPasswordChange.bind(this);
   onPasswordChange2 = this.onPasswordChange2.bind(this);

   state = {
      name: 'name',
      validName: 'false',
      surname: 'surname',
      validSurname: 'false',
      password: '',
      validPassword: 'false',
      password2: '',
      validPassword2: 'false',
   };

   onNameChange(e) {
      var val = e.target.value;
      console.log(val);
      if (val.length > 4) {
         this.setState({ name: val, validName: 'true' });
      } else {
         this.setState({ validName: 'false' });
      }
      console.log(this.state.validName);
   }

   onSurnameChange(e) {
      var val = e.target.value;
      console.log(val);
      if (val.length > 4) {
         this.setState({ surname: val, validSurname: 'true' });
      } else {
         this.setState({ validSurname: 'false' });
      }
      console.log(this.state.validSurname);
   }

   onPasswordChange(e) {
      var val = e.target.value;
      console.log(val);
      if (val.length > 4) {
         this.setState({ password: val, validPassword: 'true' });
      } else {
         this.setState({ validPassword: 'false' });
      }
   }

   onPasswordChange2(e) {
      var val = e.target.value;
      console.log(val);
      if (val.length > 4) {
         this.setState({ password2: val, validPassword2: 'true' });
      } else {
         this.setState({ validPassword2: 'false' });
      }
   }

   render() {
      return (
         <div className="modal_wrap__reg">
            <div className="modal_window">
               <h1>Регистрация</h1>
               <i className="material-icons modal_close" onClick={this.props.close}>close</i>
               <div className="row">
                  <form className="col s12">
                     <div className="row">
                        <div className="input-field col s6">
                           {/* <input onChange={this.onNameChange} placeholder="Имя" id="first_name" type="text" value={this.state.name}  /> */}
                           {this.state.validName === 'true' ? <p style={{ color: 'green' }}>Успешно<i className="material-icons">check</i></p> : <p><i className="material-icons">block</i></p>}
                           <input onChange={this.onNameChange} placeholder="Имя" id="first_name" type="text" />
                           {/* <label for="first_name">First Name</label> */}
                        </div>
                        <div className="input-field col s6">
                           {this.state.validSurname === 'true' ? <p style={{ color: 'green' }}>Успешно<i className="material-icons">check</i></p> : <p><i className="material-icons">block</i></p>}
                           <input onChange={this.onSurnameChange} placeholder="Фамилия" id="last_name" type="text" />
                           {/* <label for="last_name">Last Name</label> */}
                        </div>
                     </div>

                     <div className="row">
                        <div className="input-field col s12">
                           <input type="date" className="datepicker" id="pickdate" />
                           {/* <label for="pickdate">Дата рождения</label> */}
                        </div>
                     </div>

                     <div className="row">
                        <div className="input-field col s12">
                           {this.state.validPassword === 'true' ? <p style={{ color: 'green' }}>Успешно<i className="material-icons">check</i></p> : <p><i className="material-icons">block</i></p>}
                           <input onChange={this.onPasswordChange} placeholder="Введите пароль" id="password" type="password" />
                           {/* <label for="password">Password</label> */}
                        </div>
                     </div>

                     <div className="row">
                        <div className="input-field col s12">
                           {this.state.validPassword2 === 'true' ? <p style={{ color: 'green' }}>Успешно<i className="material-icons">check</i></p> : <p><i className="material-icons">block</i></p>}
                           <input onChange={this.onPasswordChange2} placeholder="Повторите пароль" id="password2" type="password" />
                           {/* <label for="password">Password</label> */}
                        </div>

                        {this.state.password === this.state.password2 && this.state.password > 5 && this.state.password2 > 5 ? <p style={{ color: 'green' }}>Пароли совпадаю</p> : <p style={{ color: 'red' }}>Пароли не совпадаю</p>}
                     </div>

                     <div className="row">
                        <div className="input-field col s12">
                           <input placeholder="Email" id="email" type="email" className="validate" />
                           {/* <label for="email">Email</label> */}
                        </div>
                     </div>

                     {this.state.validName === 'true' && this.state.validSurname === 'true' && this.state.validPassword === 'true' && this.state.validPassword2 === 'true'
                        ? <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                        </button>
                        : <h4 style={{ color: 'red' }}>Заполните все поля, чтобы отправить форму</h4>}
                  </form>
               </div>
            </div>
         </div>
      )
   }
}
