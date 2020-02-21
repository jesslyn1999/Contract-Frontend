import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Log in</h3>

                        <div className="form-group">
                            <label>Nomor Pegawai</label>
                            <input className="form-control" placeholder="Input nomor pegawai" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Input password"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            Masuk
                        </button>
                        <p className="forgot-password text-right">
                            Lupa <a href="/login">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
